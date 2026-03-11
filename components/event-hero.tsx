"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface HeroData {
  title: string;
  subtitle?: string;
  location: string;
  locationSubtext?: string;
  eventDate: string;
  venue: string;
  onlineLabel?: string;
  onlinePrice: string;
  earlyBirdLabel?: string;
  earlyBirdOriginalPrice?: string;
  earlyBirdPrice: string;
  ctaButtonText: string;
  ctaButtonLink?: string;
}

// Default fallback content
const defaultHeroData: HeroData = {
  title: "Die eintaegige Konferenz\nfur Entwickler\nund Business-Leader",
  location: "Berlin",
  locationSubtext: "und Online",
  eventDate: "15. Mai 2026",
  venue: "Kulturbrauerei",
  onlineLabel: "Online",
  onlinePrice: "Kostenlos",
  earlyBirdLabel: "Early Bird Tickets",
  earlyBirdOriginalPrice: "€600",
  earlyBirdPrice: "€350",
  ctaButtonText: "Tickets kaufen",
};

interface EventHeroProps {
  data?: HeroData | null;
}

export function EventHero({ data }: EventHeroProps) {
  const heroData = data || defaultHeroData;
  
  // Parse title for line breaks (from Contentful or fallback)
  const titleLines = heroData.title.split("\n");

  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 pt-14">
      {/* Abstract 3D Shape */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="relative h-[400px] w-[400px] md:h-[500px] md:w-[500px]">
          <svg
            viewBox="0 0 400 400"
            className="h-full w-full"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="shapeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="rgba(255,255,255,0.15)" />
                <stop offset="50%" stopColor="rgba(255,255,255,0.05)" />
                <stop offset="100%" stopColor="rgba(255,255,255,0.2)" />
              </linearGradient>
            </defs>
            <path
              d="M200 50 C280 50 350 120 350 200 C350 280 280 350 200 350 C120 350 50 280 50 200 C50 120 120 50 200 50"
              stroke="url(#shapeGradient)"
              strokeWidth="40"
              strokeLinecap="round"
              fill="none"
              className="animate-pulse"
              style={{ animationDuration: "4s" }}
            />
            <path
              d="M200 80 L320 260 L80 260 Z"
              stroke="rgba(255,255,255,0.1)"
              strokeWidth="30"
              strokeLinejoin="round"
              fill="none"
            />
          </svg>
        </div>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 mt-24 max-w-4xl text-center md:mt-0 md:text-left md:self-start md:ml-[10%]">
        <h1 className="text-4xl font-light leading-tight tracking-tight text-foreground md:text-5xl lg:text-6xl text-balance">
          {titleLines.map((line, index) => (
            <span key={index}>
              {index === 0 ? line : <span className="font-normal">{line}</span>}
              {index < titleLines.length - 1 && <br />}
            </span>
          ))}
        </h1>
      </div>

      {/* Event Details Footer */}
      <div className="absolute bottom-8 left-0 right-0 px-6">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="flex flex-col gap-4 md:flex-row md:gap-12">
            <div>
              <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
                {heroData.location}
              </p>
              {heroData.locationSubtext && (
                <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
                  {heroData.locationSubtext}
                </p>
              )}
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
                {heroData.eventDate}
              </p>
              <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
                {heroData.venue}
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-4 md:flex-row md:items-center md:gap-8">
            <div className="flex gap-8">
              <div>
                <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
                  {heroData.onlineLabel || "Online"}
                </p>
                <p className="text-xs font-medium uppercase tracking-widest text-foreground">
                  {heroData.onlinePrice}
                </p>
              </div>
              <div>
                <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
                  {heroData.earlyBirdLabel || "Early Bird Tickets"}
                </p>
                <p className="text-xs font-medium uppercase tracking-widest text-foreground">
                  {heroData.earlyBirdOriginalPrice && (
                    <span className="text-muted-foreground line-through mr-2">
                      {heroData.earlyBirdOriginalPrice}
                    </span>
                  )}
                  {heroData.earlyBirdPrice}
                </p>
              </div>
            </div>
            <Button
              size="lg"
              className="group"
              asChild={!!heroData.ctaButtonLink}
            >
              {heroData.ctaButtonLink ? (
                <a href={heroData.ctaButtonLink}>
                  <span className="text-sm font-medium uppercase tracking-widest">
                    {heroData.ctaButtonText}
                  </span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
              ) : (
                <>
                  <span className="text-sm font-medium uppercase tracking-widest">
                    {heroData.ctaButtonText}
                  </span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
