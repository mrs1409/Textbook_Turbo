'use server';

/**
 * @fileOverview This file defines a Genkit flow to find relevant YouTube video links based on the content of an uploaded textbook.
 *
 * - findRelevantVideos - A function that takes textbook content as input and returns a list of relevant YouTube video URLs.
 * - FindRelevantVideosInput - The input type for the findRelevantVideos function.
 * - FindRelevantVideosOutput - The return type for the findRelevantVideos function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const FindRelevantVideosInputSchema = z.object({
  textbookContent: z.string().describe('The content of the uploaded textbook.'),
});
export type FindRelevantVideosInput = z.infer<typeof FindRelevantVideosInputSchema>;

const FindRelevantVideosOutputSchema = z.object({
  videoUrls: z.array(z.string()).min(3).max(5).describe('A list of 3-5 relevant YouTube video URLs. Each URL should be a string.'),
});
export type FindRelevantVideosOutput = z.infer<typeof FindRelevantVideosOutputSchema>;

export async function findRelevantVideos(input: FindRelevantVideosInput): Promise<FindRelevantVideosOutput> {
  return findRelevantVideosFlow(input);
}

const prompt = ai.definePrompt({
  name: 'findRelevantVideosPrompt',
  input: {schema: FindRelevantVideosInputSchema},
  output: {schema: FindRelevantVideosOutputSchema},
  prompt: `You are an AI assistant designed to find relevant YouTube videos for students.

  Given the content of a textbook, you will identify and return a list of 3 to 5 YouTube video URLs that are most relevant to the content.

  Textbook Content: {{{textbookContent}}}

  Return the video URLs in a JSON format.
  `,
});

const findRelevantVideosFlow = ai.defineFlow(
  {
    name: 'findRelevantVideosFlow',
    inputSchema: FindRelevantVideosInputSchema,
    outputSchema: FindRelevantVideosOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
