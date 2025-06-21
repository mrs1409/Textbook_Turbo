'use client';

import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { UploadCloud, File, X, Loader2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

interface PdfUploaderProps {
  onFileUpload: (file: File) => void;
  isLoading: boolean;
  progress: number;
}

export function PdfUploader({ onFileUpload, isLoading, progress }: PdfUploaderProps) {
  const [file, setFile] = useState<File | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      const pdfFile = acceptedFiles[0];
      if (pdfFile.type === 'application/pdf') {
        setFile(pdfFile);
        onFileUpload(pdfFile);
      } else {
        alert('Please upload a PDF file.');
      }
    }
  }, [onFileUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'application/pdf': ['.pdf'] },
    multiple: false,
    disabled: isLoading,
  });
  
  const handleRemoveFile = () => {
    setFile(null);
  };

  return (
    <Card className="h-full transition-shadow duration-300 hover:shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 font-headline">
          <UploadCloud className="h-6 w-6 text-primary" />
          Upload Textbook
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading || file ? (
          <div className="space-y-4">
            <div className="flex items-center space-x-4 rounded-md border p-4">
              <File className="h-8 w-8 text-primary" />
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium leading-none truncate">{file?.name}</p>
                <p className="text-sm text-muted-foreground">
                  {file && `${(file.size / 1024 / 1024).toFixed(2)} MB`}
                </p>
              </div>
              {!isLoading && (
                 <Button variant="ghost" size="icon" onClick={handleRemoveFile}>
                    <X className="h-4 w-4" />
                 </Button>
              )}
            </div>
            {isLoading && (
              <div className='space-y-2'>
                <Progress value={progress} className="w-full" />
                <p className='text-sm text-muted-foreground text-center animate-pulse'>AI is analyzing your document...</p>
              </div>
            )}
          </div>
        ) : (
          <div
            {...getRootProps()}
            className={`flex flex-col items-center justify-center p-8 border-2 border-dashed rounded-md cursor-pointer transition-colors ${
              isDragActive ? 'border-primary bg-primary/10' : 'border-border hover:border-primary/50'
            }`}
          >
            <input {...getInputProps()} />
            <UploadCloud className="h-12 w-12 text-muted-foreground" />
            <p className="mt-4 text-center text-muted-foreground">
              {isDragActive ? 'Drop the PDF here...' : "Drag 'n' drop a PDF here, or click to select"}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
