import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { FileText } from 'lucide-react';

interface SummaryCardProps {
  isLoading: boolean;
  summary?: string;
}

export function SummaryCard({ isLoading, summary }: SummaryCardProps) {
  const summaryPoints = summary?.split('\n').filter(p => p.trim().length > 0 && (p.trim().startsWith('*') || p.trim().startsWith('-')));

  return (
    <Card className="h-full transition-all duration-300 hover:shadow-lg animate-in fade-in-50 slide-in-from-bottom-5">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 font-headline">
          <FileText className="h-6 w-6 text-primary" />
          Summary
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-3">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="flex items-start space-x-2">
                <Skeleton className="h-3 w-3 mt-1 rounded-full" />
                <Skeleton className="h-4 w-full" />
              </div>
            ))}
          </div>
        ) : summaryPoints && summaryPoints.length > 0 ? (
          <ul className="space-y-3 text-sm list-disc list-inside text-foreground/90">
            {summaryPoints.map((point, index) => (
              <li key={index} className="leading-relaxed">{point.substring(1).trim()}</li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-muted-foreground text-center py-10">
            The summary of your document will appear here.
          </p>
        )}
      </CardContent>
    </Card>
  );
}
