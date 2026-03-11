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
  
  // Parse title for line breaks (from Contentful or fallback)
  const titleLines = heroData.title.split("\n");

  return (
    <section className="relative flex min-h-screen flex-col overflow-hidden pl-6 pr-6 md:pl-12 md:pr-12 pt-14">
      {/* Background Image from Contentful - with morphing animation only for Deloitte theme */}
      {heroData.backgroundImageUrl && (
        <div className="pointer-events-none absolute inset-0 w-full flex items-center justify-center">
          <div className={`relative h-[500px] w-[500px] md:h-[650px] md:w-[650px] lg:h-[800px] lg:w-[800px] mx-auto ${isDeloitteTheme ? 'animate-morph' : ''}`}>
            <Image
              src={heroData.backgroundImageUrl}
              alt=""
              fill
              className="object-contain"
              priority
              quality={100}
              sizes="(max-width: 768px) 500px, (max-width: 1024px) 650px, 800px"
            />
          </div>
        </div>
      )}

      {/* Morphing animation styles - only for Deloitte theme */}
      {isDeloitteTheme && (
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
      )}

      {/* Hero Content */}
      <div className="relative z-10 mt-auto mb-auto flex flex-col justify-center min-h-[60vh] w-full">
        <div className="max-w-3xl">
          {heroData.themeName && (
            <p className="text-xs font-medium uppercase tracking-[0.3em] text-primary mb-4 opacity-80">
              {heroData.themeName}
            </p>
          )}
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
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
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
    </section>
  );
}
