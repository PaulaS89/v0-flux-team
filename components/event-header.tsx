"use client";

import Link from "next/link";

interface SiteSettings {
  eventName: string;
  eventYear: string;
  tagline?: string;
}

interface EventHeaderProps {
  siteSettings?: SiteSettings | null;
}

export function EventHeader({ siteSettings }: EventHeaderProps) {
  const eventName = siteSettings?.eventName || "FLUX";
  const eventYear = siteSettings?.eventYear || "26";

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-6">
        <nav className="flex items-center gap-8">
          <Link
            href="#programm"
            className="text-sm font-medium uppercase tracking-widest text-muted-foreground transition-colors hover:text-foreground"
          >
            Programm
          </Link>
          <Link
            href="#speaker"
            className="text-sm font-medium uppercase tracking-widest text-muted-foreground transition-colors hover:text-foreground"
          >
            Speaker
          </Link>
          <Link
            href="#faq"
            className="text-sm font-medium uppercase tracking-widest text-muted-foreground transition-colors hover:text-foreground"
          >
            FAQ
          </Link>
        </nav>

        <Link href="/" className="absolute left-1/2 -translate-x-1/2">
          <span className="text-lg font-bold tracking-tight">
            {eventName}{" "}
            <span className="rounded border border-border px-1.5 py-0.5 text-xs">
              {eventYear}
            </span>
          </span>
        </Link>

        <div className="flex items-center gap-4">
          <Link
            href="#anmelden"
            className="text-sm font-medium uppercase tracking-widest text-muted-foreground transition-colors hover:text-foreground"
          >
            Anmelden
          </Link>
          <Link
            href="#login"
            className="text-sm font-medium uppercase tracking-widest text-muted-foreground transition-colors hover:text-foreground"
          >
            Login
          </Link>
        </div>
      </div>
    </header>
  );
}
