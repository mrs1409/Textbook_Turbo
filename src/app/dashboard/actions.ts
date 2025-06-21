'use server';

import { summarizePdf, type SummarizePdfOutput } from '@/ai/flows/summarize-pdf';

export async function processPdf(
  pdfText: string
): Promise<SummarizePdfOutput> {
  try {
    const result = await summarizePdf({ pdfText });
    return result;
  } catch (error) {
    console.error('Error processing PDF:', error);
    throw new Error('Failed to summarize the document. Please try again.');
  }
}
