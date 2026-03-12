"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

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
  backgroundImageUrl?: string;
  themeName?: string;
}

// Default fallback content
const defaultHeroData: HeroData = {
  title: "Future of Digital\nExperiences",
  subtitle: "A Deloitte Executive Briefing",
  location: "Düsseldorf",
  locationSubtext: "And Online",
  eventDate: "May 15, 2026",
  venue: "Deloitte Heinrich Campus",
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
  
  // Check if Deloitte theme is active
  const isDeloitteTheme = heroData.themeName?.toLowerCase().includes('deloitte');
  
  // Check if Ocean Blue theme is active
  const isOceanBlueTheme = heroData.themeName?.toLowerCase().includes('ocean');
  
  // Theme-specific taglines
  const tagline = isOceanBlueTheme ? "Future · Live · Underwater" : "Future · LLMs · UX";
  const subtitle = isOceanBlueTheme ? "Exploring Underwater Ecosystems" : "Designing for the Age of AI";
  
  // Parse title for line breaks (from Contentful or fallback)
  const titleLines = heroData.title.split("\n");

  return (
    <section className="relative flex min-h-screen flex-col overflow-hidden px-8 md:px-16 lg:px-24 pt-14 bg-background">
      {/* Background Image from Contentful - centered with morphing animation for Deloitte theme */}
      {heroData.backgroundImageUrl && (
        <div className="pointer-events-none absolute inset-0 w-full flex items-center justify-center dark:opacity-100 opacity-90 dark:invert-0 invert dark:mix-blend-normal mix-blend-multiply">
          <div className={`relative h-[600px] w-[600px] md:h-[750px] md:w-[750px] lg:h-[900px] lg:w-[900px] ${isDeloitteTheme ? 'animate-morph' : ''}`}>
            <Image
              src={heroData.backgroundImageUrl}
              alt=""
              fill
              className="object-contain"
              priority
              quality={100}
              sizes="(max-width: 768px) 600px, (max-width: 1024px) 750px, 900px"
            />
          </div>
        </div>
      )}

      {/* Morphing animation styles - for Deloitte theme */}
      <style jsx>{`
        @keyframes morph {
          0%, 100% {
            filter: hue-rotate(0deg) saturate(1) brightness(0.95) contrast(1);
            transform: rotate(0deg);
          }
          15% {
            filter: hue-rotate(12deg) saturate(1.15) brightness(0.92) contrast(1.02);
            transform: rotate(2deg);
          }
          30% {
            filter: hue-rotate(-8deg) saturate(0.95) brightness(0.88) contrast(1.05);
            transform: rotate(-1.5deg);
          }
          45% {
            filter: hue-rotate(15deg) saturate(1.2) brightness(0.9) contrast(0.98);
            transform: rotate(3deg);
          }
          60% {
            filter: hue-rotate(-12deg) saturate(1.1) brightness(0.85) contrast(1.03);
            transform: rotate(-2deg);
          }
          75% {
            filter: hue-rotate(8deg) saturate(0.98) brightness(0.92) contrast(1.05);
            transform: rotate(1.5deg);
          }
          90% {
            filter: hue-rotate(-5deg) saturate(1.1) brightness(0.9) contrast(1);
            transform: rotate(-1deg);
          }
        }
        .animate-morph {
          animation: morph 15s ease-in-out infinite;
        }
      `}</style>

      {/* Hero Content */}
      <div className="relative z-10 flex-1 flex items-center w-full">
        <div className="max-w-xl">
          {heroData.themeName && (
            <p className="text-[10px] font-medium uppercase tracking-[0.35em] text-primary mb-3" style={{ marginLeft: '4px' }}>
              {heroData.themeName}
            </p>
          )}
          <h1 className="leading-none">
            <span 
              className="block text-5xl md:text-6xl lg:text-7xl xl:text-[7rem] font-bold tracking-[0.02em] bg-gradient-to-r from-foreground via-foreground to-primary bg-clip-text text-transparent"
              style={{
                backgroundSize: '200% 100%',
                backgroundPosition: '0% 0%',
              }}
            >
              FLUX
            </span>
          </h1>
          <div className="mt-6" style={{ marginLeft: '4px' }}>
            <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-muted-foreground/70 mb-1">
              {tagline}
            </p>
            <p className="text-sm md:text-base font-light tracking-wide text-muted-foreground">
              {subtitle}
            </p>
          </div>
        </div>
      </div>

      {/* Event Details Footer */}
      <div className="relative z-10 pb-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          {/* Left side: Location & Date info */}
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
          
          {/* Right side: Early Bird + CTA (chatbot will sit to the right via fixed positioning) */}
          <div className="flex items-center gap-6">
            <div>
              <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
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
            </div>
            <Button
              size="lg"
              className="group relative z-20 flex items-center gap-2 border border-foreground bg-foreground px-6 py-3 text-background hover:bg-transparent hover:text-foreground transition-all cursor-pointer"
              asChild
            >
              <a href="/tickets">
                <span className="text-xs font-medium uppercase tracking-[0.15em]">
                  {heroData.ctaButtonText}
                </span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
            </Button>
          </div>
        </div>
      </div>
      
      {/* Full-width separator line - positioned below the section */}
      <div className="absolute -bottom-8 left-0 right-0 h-px bg-foreground/20" />
    </section>
  );
}
