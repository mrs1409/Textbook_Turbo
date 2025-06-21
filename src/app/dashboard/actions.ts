'use server';

import { summarizePdf } from '@/ai/flows/summarize-pdf';
import { findRelevantLinks } from '@/ai/flows/find-relevant-links';
import { findRelevantVideos } from '@/ai/flows/find-relevant-videos';

export interface ProcessedPdfOutput {
  summary: string[];
  webLinks: string[];
  videoLinks: string[];
}

export async function processPdf(
  pdfText: string
): Promise<ProcessedPdfOutput> {
  try {
    const [summaryResult, linksResult, videosResult] = await Promise.all([
      summarizePdf({ pdfText }),
      findRelevantLinks({ textbookContent: pdfText }),
      findRelevantVideos({ textbookContent: pdfText }),
    ]);

    return {
      summary: summaryResult.summary,
      webLinks: linksResult.relevantLinks,
      videoLinks: videosResult.videoUrls,
    };
  } catch (error) {
    console.error('Error processing PDF:', error);
    throw new Error('Failed to process the document. Please try again.');
  }
}
