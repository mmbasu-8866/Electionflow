'use server';
/**
 * @fileOverview An AI chatbot flow for answering questions about election processes.
 *
 * - electionProcessChat - A function that handles user queries about election processes, voter registration, or key dates.
 * - ElectionProcessChatInput - The input type for the electionProcessChat function.
 * - ElectionProcessChatOutput - The return type for the electionProcessChat function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ElectionProcessChatInputSchema = z.object({
  query: z.string().describe('The user\'s question about election processes, voter registration, or key dates.'),
  location: z.string().optional().describe('An optional location provided by the user to personalize the answer.'),
});
export type ElectionProcessChatInput = z.infer<typeof ElectionProcessChatInputSchema>;

const ElectionProcessChatOutputSchema = z.object({
  answer: z.string().describe('The accurate, easy-to-understand answer to the user\'s query.'),
});
export type ElectionProcessChatOutput = z.infer<typeof ElectionProcessChatOutputSchema>;

export async function electionProcessChat(input: ElectionProcessChatInput): Promise<ElectionProcessChatOutput> {
  return electionProcessChatFlow(input);
}

const prompt = ai.definePrompt({
  name: 'electionProcessChatPrompt',
  input: {schema: ElectionProcessChatInputSchema},
  output: {schema: ElectionProcessChatOutputSchema},
  prompt: `You are an intelligent AI assistant named Electionflow, specializing in election processes, voter registration, and key election dates.
Your goal is to provide accurate, easy-to-understand answers to user questions.

User's Question: {{{query}}}

{{#if location}}
If possible, tailor your answer to the following location: {{{location}}}
{{else}}
Provide general information if no specific location is mentioned or if the query is not location-dependent.
{{/if}}

Ensure your response is clear, concise, and directly addresses the user's question.`,
});

const electionProcessChatFlow = ai.defineFlow(
  {
    name: 'electionProcessChatFlow',
    inputSchema: ElectionProcessChatInputSchema,
    outputSchema: ElectionProcessChatOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
