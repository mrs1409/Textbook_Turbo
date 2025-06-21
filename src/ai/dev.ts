import { config } from 'dotenv';
config();

import '@/ai/flows/summarize-pdf.ts';
import '@/ai/flows/find-relevant-links.ts';
import '@/ai/flows/find-relevant-videos.ts';