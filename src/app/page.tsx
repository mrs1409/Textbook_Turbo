import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/icons';
import { FloatingElements } from '@/components/floating-elements';

export default function Home() {
  return (
    <div className="relative flex min-h-screen flex-col bg-background">
      <FloatingElements />
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 max-w-screen-2xl items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <Icons.logo className="h-8 w-8 text-primary" />
            <span className="font-headline text-xl font-bold">Textbook Turbo</span>
          </Link>
          <nav className="flex items-center space-x-2">
            <Button asChild variant="ghost">
              <Link href="/login">Login</Link>
            </Button>
            <Button asChild className="bg-accent hover:bg-accent/90">
              <Link href="/signup">Get Started</Link>
            </Button>
          </nav>
        </div>
      </header>
      <main className="flex-1">
        <div className="container relative flex h-[calc(100vh-3.5rem)] flex-col items-center justify-center space-y-6 text-center">
          <div className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent to-background/80"></div>
          <h1 className="font-headline text-5xl font-bold tracking-tighter sm:text-6xl md:text-7xl">
            Upload your textbook.
            <br />
            <span className="text-primary">Let AI do the rest.</span>
          </h1>
          <p className="max-w-[42rem] text-lg text-muted-foreground sm:text-xl">
            Instantly summarize complex topics, find relevant articles, and watch explanatory videos. 
            Supercharge your studies with the power of AI.
          </p>
          <div className="space-x-4">
            <Button asChild size="lg" className="bg-accent hover:bg-accent/90">
              <Link href="/signup">Start Learning for Free</Link>
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
