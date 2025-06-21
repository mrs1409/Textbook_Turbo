import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Link as LinkIcon, ExternalLink } from 'lucide-react';
import Link from 'next/link';

interface LinksCardProps {
  isLoading: boolean;
  links?: string[];
}

export function LinksCard({ isLoading, links }: LinksCardProps) {
  return (
    <Card className="h-full transition-all duration-300 hover:shadow-lg animate-in fade-in-50 slide-in-from-bottom-5" style={{ animationDelay: '100ms' }}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 font-headline">
          <LinkIcon className="h-6 w-6 text-primary" />
          Learn More
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex items-center space-x-3">
                <Skeleton className="h-8 w-8 rounded-md" />
                <Skeleton className="h-4 flex-1" />
              </div>
            ))}
          </div>
        ) : links && links.length > 0 ? (
          <ul className="space-y-2">
            {links.map((link, index) => (
              <li key={index}>
                <Link
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-2 -m-2 rounded-md transition-colors hover:bg-accent/20 group"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-md bg-muted">
                        <LinkIcon className="h-4 w-4 text-muted-foreground"/>
                    </div>
                    <span className="text-sm font-medium truncate group-hover:text-primary">
                      {new URL(link).hostname}
                    </span>
                  </div>
                  <ExternalLink className="h-4 w-4 text-muted-foreground transition-opacity opacity-0 group-hover:opacity-100"/>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-muted-foreground text-center py-10">
            Helpful web links will appear here.
          </p>
        )}
      </CardContent>
    </Card>
  );
}
