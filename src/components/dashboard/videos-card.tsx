import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { getYouTubeVideoId } from '@/lib/utils';
import { Youtube } from 'lucide-react';

interface VideosCardProps {
  isLoading: boolean;
  videos?: string[];
}

export function VideosCard({ isLoading, videos }: VideosCardProps) {
  return (
    <Card className="h-full transition-all duration-300 hover:shadow-lg animate-in fade-in-50 slide-in-from-bottom-5" style={{ animationDelay: '200ms' }}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 font-headline">
          <Youtube className="h-6 w-6 text-primary" />
          Watch on YouTube
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-4">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="space-y-2">
                <Skeleton className="h-24 w-full rounded-lg" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            ))}
          </div>
        ) : videos && videos.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
            {videos.slice(0, 4).map((video, index) => {
              const videoId = getYouTubeVideoId(video);
              if (!videoId) return null;
              return (
                <div key={index} className="group">
                  <div className="aspect-video overflow-hidden rounded-lg border">
                    <iframe
                      src={`https://www.youtube.com/embed/${videoId}`}
                      title="YouTube video player"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full"
                    ></iframe>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground text-center py-10">
            Related videos will appear here.
          </p>
        )}
      </CardContent>
    </Card>
  );
}
