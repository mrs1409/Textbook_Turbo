'use client';

import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { type ProcessedPdfOutput } from './actions';
import { processPdf } from './actions';
import Link from 'next/link';
import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { User } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

import { PdfUploader } from '@/components/dashboard/pdf-uploader';
import { SummaryCard } from '@/components/dashboard/summary-card';
import { LinksCard } from '@/components/dashboard/links-card';
import { VideosCard } from '@/components/dashboard/videos-card';

export default function DashboardPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<ProcessedPdfOutput | null>(null);
  const [progress, setProgress] = useState(0);
  const { toast } = useToast();

  const handleFileUpload = async (file: File) => {
    setIsLoading(true);
    setError(null);
    setResults(null);
    setProgress(10);

    const fileReader = new FileReader();
    fileReader.readAsArrayBuffer(file);
    
    fileReader.onload = async (event) => {
      if (!event.target?.result) {
        const err = new Error('Failed to read file.');
        setError(err.message);
        toast({ title: 'Error', description: err.message, variant: 'destructive' });
        setIsLoading(false);
        setProgress(0);
        return;
      }
      
      try {
        const pdfjs = await import('pdfjs-dist');
        // Use a stable CDN link with the library's version to ensure compatibility.
        pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

        setProgress(30);
        const typedarray = new Uint8Array(event.target.result as ArrayBuffer);
        const pdf = await pdfjs.getDocument(typedarray).promise;
        let pdfText = '';

        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const textContent = await page.getTextContent();
          pdfText += textContent.items.map(item => ('str' in item ? item.str : '')).join(' ');
        }
        
        setProgress(50);
        const aiResults = await processPdf(pdfText);
        setProgress(100);
        setResults(aiResults);

      } catch (e: any) {
        console.error(e);
        const errorMessage = e.message || 'An unexpected error occurred while processing the document.';
        setError(errorMessage);
        toast({
          title: 'Error',
          description: errorMessage,
          variant: 'destructive',
        });
      } finally {
        setIsLoading(false);
        setTimeout(() => setProgress(0), 1000);
      }
    };

    fileReader.onerror = () => {
      const err = new Error('There was an issue reading the file.');
      setError(err.message);
      toast({ title: 'Error', description: err.message, variant: 'destructive' });
      setIsLoading(false);
      setProgress(0);
    }
  };
  
  const hasResults = !isLoading && results;

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
       <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
          <Link href="/" className="flex items-center gap-2">
            <Icons.logo className="h-8 w-8 text-primary" />
            <span className="font-headline text-xl font-bold">Textbook Turbo</span>
          </Link>
          <div className="relative ml-auto flex-1 md:grow-0"></div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon" className="overflow-hidden rounded-full">
                <User className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild><Link href="/">Logout</Link></DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <div className="lg:col-span-1 xl:col-span-1">
            <PdfUploader onFileUpload={handleFileUpload} isLoading={isLoading} progress={progress} />
          </div>
          <div className="grid gap-4 lg:col-span-2 xl:col-span-3 lg:grid-cols-2 xl:grid-cols-3">
             <div className="xl:col-span-1">
                <SummaryCard isLoading={isLoading} summary={results?.summary} />
              </div>
              <div className="flex flex-col gap-4 xl:col-span-2">
                <LinksCard isLoading={isLoading} links={results?.webLinks} />
                <VideosCard isLoading={isLoading} videos={results?.videoLinks} />
              </div>
          </div>
        </div>

        {!isLoading && !results && !error && (
            <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm">
            <div className="flex flex-col items-center gap-1 text-center">
                <h3 className="text-2xl font-bold tracking-tight font-headline">Ready to learn?</h3>
                <p className="text-sm text-muted-foreground">
                Upload your textbook PDF to get started.
                </p>
            </div>
            </div>
        )}

      </main>
    </div>
  );
}
