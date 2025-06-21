import { Icons } from "./icons";

export function FloatingElements() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      <Icons.book className="floating absolute -bottom-10 -left-10 h-32 w-32 text-primary/10" style={{ animationDelay: '0s' }} />
      <Icons.book className="floating absolute -top-20 right-1/4 h-48 w-48 text-primary/5" style={{ animationDelay: '1s' }} />
      <Icons.book className="floating absolute bottom-1/4 right-1/2 h-24 w-24 text-primary/10" style={{ animationDelay: '2s' }} />
      <Icons.book className="floating absolute top-1/2 -right-10 h-28 w-28 text-primary/10" style={{ animationDelay: '3s' }} />
      <Icons.book className="floating absolute top-10 left-1/4 h-16 w-16 text-primary/20" style={{ animationDelay: '4s' }} />
      <Icons.book className="floating absolute bottom-0 left-1/2 h-20 w-20 text-primary/10" style={{ animationDelay: '5s' }} />
    </div>
  );
}
