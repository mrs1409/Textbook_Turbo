'use server';

/**
 * @fileOverview AI agent that returns a list of reputable external website links related to the uploaded textbook content.
 *
 * - findRelevantLinks - A function that handles the process of finding relevant links.
 * - FindRelevantLinksInput - The input type for the findRelevantLinks function.
 * - FindRelevantLinksOutput - The return type for the findRelevantLinks function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const FindRelevantLinksInputSchema = z.object({
  textbookContent: z.string().describe('The content of the textbook.'),
});
export type FindRelevantLinksInput = z.infer<typeof FindRelevantLinksInputSchema>;

const FindRelevantLinksOutputSchema = z.object({
  relevantLinks: z
    .array(z.string().url())
    .length(5)
    .describe('A list of 5 reputable external website URLs for deeper reading.'),
});
export type FindRelevantLinksOutput = z.infer<typeof FindRelevantLinksOutputSchema>;

export async function findRelevantLinks(input: FindRelevantLinksInput): Promise<FindRelevantLinksOutput> {
  return findRelevantLinksFlow(input);
}

const prompt = ai.definePrompt({
  name: 'findRelevantLinksPrompt',
  input: {schema: FindRelevantLinksInputSchema},
  output: {schema: FindRelevantLinksOutputSchema},
  prompt: `You are an AI assistant helping students learn from textbooks.
  Given the following textbook content, find 5 reputable external website URLs that would be helpful for a student to explore the topics in more detail and broaden their understanding.
  Return a JSON array of the URLs.

  Textbook Content: {{{textbookContent}}}
  `,
});

const findRelevantLinksFlow = ai.defineFlow(
  {
    name: 'findRelevantLinksFlow',
    inputSchema: FindRelevantLinksInputSchema,
    outputSchema: FindRelevantLinksOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
