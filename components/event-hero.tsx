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
  title: "Future of Digital\nExperiences",
  subtitle: "A Deloitte Executive Briefing",
  location: "Frankfurt",
  locationSubtext: "In Person",
  eventDate: "16 April 2026",
  venue: "Deloitte Frankfurt Office",
  onlineLabel: "Deloitte Clients",
  onlinePrice: "€149",
  earlyBirdLabel: "Standard Admission",
  earlyBirdOriginalPrice: "",
  earlyBirdPrice: "€249",
  ctaButtonText: "Register Now",
};

interface EventHeroProps {
  data?: HeroData | null;
}

export function EventHero({ data }: EventHeroProps) {
  const heroData = data || defaultHeroData;
  
  // Parse title for line breaks (from Contentful or fallback)
  const titleLines = heroData.title.split("\n");

  return (
    <section className="relative flex min-h-screen flex-col overflow-hidden px-6 pt-14">
      {/* Abstract 3D Shape */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="relative h-[350px] w-[350px] md:h-[450px] md:w-[450px] lg:h-[500px] lg:w-[500px]">
          <svg
            viewBox="0 0 400 400"
            className="h-full w-full opacity-80"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="triangleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="rgba(255,255,255,0.4)" />
                <stop offset="40%" stopColor="rgba(255,255,255,0.1)" />
                <stop offset="60%" stopColor="rgba(255,255,255,0.05)" />
                <stop offset="100%" stopColor="rgba(255,255,255,0.3)" />
              </linearGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
            {/* Outer organic triangle shape */}
            <path
              d="M200 60 
                 Q 240 60, 280 120
                 Q 340 200, 320 280
                 Q 300 340, 240 340
                 L 160 340
                 Q 100 340, 80 280
                 Q 60 200, 120 120
                 Q 160 60, 200 60"
              stroke="url(#triangleGradient)"
              strokeWidth="35"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              filter="url(#glow)"
            />
            {/* Inner highlight */}
            <path
              d="M200 100 
                 Q 230 100, 260 150
                 Q 300 210, 285 260
                 Q 270 300, 230 300
                 L 170 300
                 Q 130 300, 115 260
                 Q 100 210, 140 150
                 Q 170 100, 200 100"
              stroke="rgba(255,255,255,0.08)"
              strokeWidth="20"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          </svg>
        </div>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 mt-auto mb-auto flex flex-col justify-center min-h-[60vh]">
        <div className="max-w-3xl md:ml-[5%] lg:ml-[8%]">
          <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-normal leading-[1.1] tracking-tight text-foreground">
            {titleLines.map((line, index) => (
              <span key={index} className="block">
                {line}
              </span>
            ))}
          </h1>
        </div>
      </div>

      {/* Event Details Footer */}
      <div className="relative z-10 pb-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="flex flex-col gap-4 md:flex-row md:gap-16">
            <div>
              <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
                {heroData.location}
              </p>
              {heroData.locationSubtext && (
                <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
                  {heroData.locationSubtext}
                </p>
              )}
            </div>
            <div>
              <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
                {heroData.eventDate}
              </p>
              <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
                {heroData.venue}
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-4 md:flex-row md:items-center md:gap-10">
            <div className="flex gap-10">
              <div>
                <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
                  {heroData.onlineLabel || "Online"}
                </p>
                <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-foreground">
                  {heroData.onlinePrice}
                </p>
              </div>
              <a href="/tickets" className="group/early cursor-pointer hover:opacity-80 transition-opacity">
                <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground group-hover/early:text-foreground transition-colors">
                  {heroData.earlyBirdLabel || "Early Bird Tickets"}
                </p>
                <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-foreground">
                  {heroData.earlyBirdOriginalPrice && (
                    <span className="text-muted-foreground line-through mr-2">
                      {heroData.earlyBirdOriginalPrice}
                    </span>
                  )}
                  {heroData.earlyBirdPrice}
                </p>
              </a>
            </div>
            <Button
              size="lg"
              className="group flex items-center gap-2 border border-foreground bg-foreground px-6 py-3 text-background hover:bg-transparent hover:text-foreground transition-all"
              asChild
            >
              <a href={heroData.ctaButtonLink || "/tickets"}>
                <span className="text-xs font-medium uppercase tracking-[0.15em]">
                  {heroData.ctaButtonText}
                </span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
