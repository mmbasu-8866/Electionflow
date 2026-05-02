
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
  image: z.string().optional().describe('Optional base64 encoded image for analysis.'),
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
  prompt: [
    {
      text: `You are ElectionFlow Assistant, an expert in global and local election processes.
  
  User Question: {{query}}
  Current Mode: {{mode}}
  Location: {{#if location}}{{location}}{{else}}General{{/if}}

  INSTRUCTIONS:
  1. If an image is provided, analyze it in the context of the user's question. It might be a ballot, a registration document, or an election-related photo.
  2. If mode is "eli10", use simple analogies. Avoid jargon.
  3. If mode is "prediction", analyze trends and provide a "predictionProbability" (0-100).
  4. If location is provided, tailor registration and constituency advice.
  5. Always remain neutral and objective.`
    },
    { media: { url: '{{image}}', contentType: 'image/jpeg' } },
  ],
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
