"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

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
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/95 backdrop-blur-sm">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-6">
        <nav className="hidden md:flex items-center gap-8">
          <Link
            href="#schedule"
            className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-foreground"
          >
            Schedule
          </Link>
          <Link
            href="#speakers"
            className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-foreground"
          >
            Speakers
          </Link>
          <Link
            href="#faq"
            className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-foreground"
          >
            FAQ
          </Link>
        </nav>

        <Link href="/" className="absolute left-1/2 -translate-x-1/2">
          <span className="text-lg font-semibold tracking-tight">
            {eventName}{" "}
            <span className="inline-flex items-center justify-center border border-foreground px-1.5 py-0.5 text-[10px] font-medium">
              {eventYear}
            </span>
          </span>
        </Link>

        <div className="flex items-center gap-6">
          <Link
            href="#signup"
            className="hidden md:block text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-foreground"
          >
            Sign Up
          </Link>
          <Link
            href="#login"
            className="hidden md:block text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-foreground"
          >
            Login
          </Link>
          <Button
            size="sm"
            className="group hidden lg:flex items-center gap-2 bg-foreground px-4 text-background hover:bg-foreground/90"
          >
            <span className="text-xs font-medium uppercase tracking-[0.15em]">
              Get Tickets
            </span>
            <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
          </Button>
        </div>
      </div>
    </header>
  );
}
