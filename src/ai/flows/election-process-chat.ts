
'use server';
/**
 * @fileOverview Enhanced AI chatbot for ElectionFlow.
 * Includes "Explain Like I'm 10" (ELI10) mode and real-time query support.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ElectionProcessChatInputSchema = z.object({
  query: z.string().describe('The user\'s question.'),
  location: z.string().optional().describe('User location for personalization.'),
  mode: z.enum(['standard', 'eli10', 'prediction']).default('standard').describe('The style of response.'),
});
export type ElectionProcessChatInput = z.infer<typeof ElectionProcessChatInputSchema>;

const ElectionProcessChatOutputSchema = z.object({
  answer: z.string().describe('The AI response.'),
  predictionProbability: z.number().optional().describe('Likelihood if query is prediction-related.'),
});
export type ElectionProcessChatOutput = z.infer<typeof ElectionProcessChatOutputSchema>;

const prompt = ai.definePrompt({
  name: 'electionFlowAssistantPrompt',
  model: 'googleai/gemini-1.5-flash',
  input: {schema: ElectionProcessChatInputSchema},
  output: {schema: ElectionProcessChatOutputSchema},
  prompt: `You are ElectionFlow Assistant, an expert in global and local election processes.
  
  User Question: {{{query}}}
  Current Mode: {{{mode}}}
  Location: {{#if location}}{{{location}}}{{else}}General{{/if}}

  INSTRUCTIONS:
  1. If mode is "eli10", use simple analogies (e.g., "Elections are like picking a class leader"). Avoid jargon.
  2. If mode is "prediction", analyze general trends and provide a "predictionProbability" (0-100) based on historical mock data patterns.
  3. If location is provided, tailor registration and constituency advice to that area.
  4. Always remain neutral and objective.`,
});

export const electionProcessChat = ai.defineFlow(
  {
    name: 'electionProcessChat',
    inputSchema: ElectionProcessChatInputSchema,
    outputSchema: ElectionProcessChatOutputSchema,
  },
  async (input) => {
    const {output} = await prompt(input);
    return output!;
  }
);
