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
  const tagline = siteSettings?.tagline || "Die Konferenz fur Entwickler und Business-Leader";

  return (
    <footer className="border-t border-border bg-background px-6 py-12">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 md:flex-row md:items-center md:justify-between">
        <div>
          <span className="text-lg font-bold tracking-tight">
            {eventName}{" "}
            <span className="rounded border border-border px-1.5 py-0.5 text-xs">
              {eventYear}
            </span>
          </span>
          <p className="mt-2 text-sm text-muted-foreground">
            {tagline}
          </p>
        </div>
        <nav className="flex flex-wrap gap-6">
          <Link
            href="#"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            Impressum
          </Link>
          <Link
            href="#"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            Datenschutz
          </Link>
          <Link
            href="#"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            Kontakt
          </Link>
          <Link
            href="#"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            Twitter
          </Link>
          <Link
            href="#"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            LinkedIn
          </Link>
        </nav>
      </div>
      <div className="mx-auto mt-8 max-w-7xl">
        <p className="text-xs text-muted-foreground">
          2026 {eventName}. Alle Rechte vorbehalten.
        </p>
      </div>
    </footer>
  );
}
