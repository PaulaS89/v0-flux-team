import Link from "next/link";

interface SiteSettings {
  eventName: string;
  eventYear: string;
  tagline?: string;
}

interface EventFooterProps {
  siteSettings?: SiteSettings | null;
}

export function EventFooter({ siteSettings }: EventFooterProps) {
  const eventName = siteSettings?.eventName || "FLUX";
  const eventYear = siteSettings?.eventYear || "26";
  const tagline = siteSettings?.tagline || "The conference for developers and business leaders";

  return (
    <footer className="border-t border-border bg-background px-6 py-16">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-12 md:flex-row md:items-start md:justify-between">
          <div>
            <span className="text-xl font-semibold tracking-tight">
              {eventName}{" "}
              <span className="inline-flex items-center justify-center border border-foreground px-1.5 py-0.5 text-[10px] font-medium">
                {eventYear}
              </span>
            </span>
            <p className="mt-3 text-sm text-muted-foreground max-w-xs">
              {tagline}
            </p>
          </div>
          
          <div className="flex flex-col md:flex-row gap-12">
            <div>
              <h4 className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground mb-4">
                Event
              </h4>
              <nav className="flex flex-col gap-3">
                <Link
                  href="#schedule"
                  className="text-sm text-foreground/80 transition-colors hover:text-foreground"
                >
                  Schedule
                </Link>
                <Link
                  href="#speakers"
                  className="text-sm text-foreground/80 transition-colors hover:text-foreground"
                >
                  Speakers
                </Link>
                <Link
                  href="#faq"
                  className="text-sm text-foreground/80 transition-colors hover:text-foreground"
                >
                  FAQ
                </Link>
              </nav>
            </div>
            
            <div>
              <h4 className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground mb-4">
                Legal
              </h4>
              <nav className="flex flex-col gap-3">
                <Link
                  href="#"
                  className="text-sm text-foreground/80 transition-colors hover:text-foreground"
                >
                  Privacy Policy
                </Link>
                <Link
                  href="#"
                  className="text-sm text-foreground/80 transition-colors hover:text-foreground"
                >
                  Terms of Service
                </Link>
                <Link
                  href="#"
                  className="text-sm text-foreground/80 transition-colors hover:text-foreground"
                >
                  Contact
                </Link>
              </nav>
            </div>
            
            <div>
              <h4 className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground mb-4">
                Social
              </h4>
              <nav className="flex flex-col gap-3">
                <Link
                  href="#"
                  className="text-sm text-foreground/80 transition-colors hover:text-foreground"
                >
                  Twitter
                </Link>
                <Link
                  href="#"
                  className="text-sm text-foreground/80 transition-colors hover:text-foreground"
                >
                  LinkedIn
                </Link>
                <Link
                  href="#"
                  className="text-sm text-foreground/80 transition-colors hover:text-foreground"
                >
                  YouTube
                </Link>
              </nav>
            </div>
          </div>
        </div>
        
        <div className="mt-16 pt-8 border-t border-border">
          <p className="text-xs text-muted-foreground">
            &copy; 2026 {eventName}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
