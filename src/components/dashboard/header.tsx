import { GitGptLogo } from '@/components/icons/logo';

export function Header() {
  return (
    <header className="py-4 px-4 md:px-6 border-b">
      <div className="container mx-auto flex items-center gap-3">
        <GitGptLogo className="h-8 w-8 text-primary" />
        <h1 className="text-2xl font-bold text-foreground font-headline">
          GitGPT
        </h1>
      </div>
    </header>
  );
}
