'use server';

/**
 * @fileOverview An AI agent that summarizes a PDF document.
 *
 * - summarizePdf - A function that handles the PDF summarization process.
 * - SummarizePdfInput - The input type for the summarizePdf function.
 * - SummarizePdfOutput - The return type for the summarizePdf function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizePdfInputSchema = z.object({
  pdfText: z.string().describe('The text content extracted from the PDF file.'),
});
export type SummarizePdfInput = z.infer<typeof SummarizePdfInputSchema>;

const SummarizePdfOutputSchema = z.object({
  summary: z
    .array(z.string())
    .min(5)
    .max(8)
    .describe('A concise 5-8 bullet point summary of the PDF content.'),
  webLinks: z
    .array(z.string().url())
    .length(5)
    .describe('A list of 5 reputable external site URLs for deeper reading.'),
  videoLinks: z
    .array(z.string().url())
    .length(5)
    .describe('A list of 5 relevant YouTube video URLs.'),
});
export type SummarizePdfOutput = z.infer<typeof SummarizePdfOutputSchema>;

export async function summarizePdf(input: SummarizePdfInput): Promise<SummarizePdfOutput> {
  return summarizePdfFlow(input);
}

const summarizePdfPrompt = ai.definePrompt({
  name: 'summarizePdfPrompt',
  input: {schema: SummarizePdfInputSchema},
  output: {schema: SummarizePdfOutputSchema},
  prompt: `You are an AI assistant helping students understand textbooks quickly.

  Please provide the following information based on the provided textbook content:

  1.  A concise 5-8 bullet point summary of the PDF content, written in simple, student-friendly language. This should be a JSON array of strings.
  2.  A list of 5 reputable external site URLs for deeper reading on the topics covered in the textbook.
  3.  A list of 5 relevant YouTube video URLs that explain the concepts discussed in the textbook.

  Textbook Content: {{{pdfText}}}`,
});

const summarizePdfFlow = ai.defineFlow(
  {
    name: 'summarizePdfFlow',
    inputSchema: SummarizePdfInputSchema,
    outputSchema: SummarizePdfOutputSchema,
  },
  async input => {
    const {output} = await summarizePdfPrompt(input);
    return output!;
  }
);
