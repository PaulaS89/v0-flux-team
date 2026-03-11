"use client";

import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

interface Speaker {
  id?: string;
  name: string;
  role: string;
  topic?: string;
  bio?: string;
  photo?: string | null;
  image?: string | null;
}

// Specific speaker images by name
const speakerImagesByName: Record<string, string> = {
  "James Lui": "/speakers/james-lui.jpg",
};

// Fallback images for speakers (3 women, 3 men - used when Contentful doesn't provide unique images)
const fallbackImages = [
  "/speakers/speaker-woman-1.jpg",
  "/speakers/speaker-man-1.jpg",
  "/speakers/speaker-woman-2.jpg",
  "/speakers/speaker-man-2.jpg",
  "/speakers/speaker-woman-3.jpg",
  "/speakers/speaker-man-3.jpg",
];

// Get image for a speaker - first use Contentful image, then check by name, then use fallback based on index
function getSpeakerImage(name: string, index: number, contentfulImage?: string | null): string {
  // First priority: use image from Contentful if available
  if (contentfulImage && contentfulImage.trim() !== "") {
    return contentfulImage;
  }
  // Second priority: use name-based mapping for specific speakers
  if (speakerImagesByName[name]) {
    return speakerImagesByName[name];
  }
  // Third priority: use index-based fallback
  return fallbackImages[index % fallbackImages.length];
}

// Default fallback speakers (6 total for 3x2 grid)
const defaultSpeakers: Speaker[] = [
  {
    name: "Sarah Chen",
    role: "AI Research Lead",
    topic: "OpenAI",
    image: "/speakers/speaker-woman-1.jpg",
  },
  {
    name: "James Liu",
    role: "Principal Designer",
    topic: "Vercel",
    image: "/speakers/speaker-man-1.jpg",
  },
  {
    name: "Elena Rodriguez",
    role: "UX Director",
    topic: "Figma",
    image: "/speakers/speaker-woman-2.jpg",
  },
  {
    name: "Marcus Weber",
    role: "Design Systems Lead",
    topic: "Stripe",
    image: "/speakers/speaker-man-2.jpg",
  },
  {
    name: "Nina Patel",
    role: "Product Design Manager",
    topic: "Anthropic",
    image: "/speakers/speaker-woman-3.jpg",
  },
  {
    name: "David Kim",
    role: "Creative Director",
    topic: "Linear",
    image: "/speakers/speaker-man-3.jpg",
  },
];

interface EventSpeakersProps {
  speakers?: Speaker[];
}

// Background colors for speaker images
const speakerColors = [
  "bg-amber-500/80",
  "bg-rose-400/80", 
  "bg-sky-400/80",
  "bg-lime-400/80",
  "bg-violet-400/80",
  "bg-cyan-400/80",
];

export function EventSpeakers({ speakers }: EventSpeakersProps) {
  const speakersList = speakers && speakers.length > 0 ? speakers : defaultSpeakers;

  return (
    <section id="speakers" className="bg-background px-8 md:px-16 lg:px-24 py-16">
      <div className="mx-auto max-w-6xl">
        {/* Header matching agenda style */}
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl md:text-4xl font-medium tracking-[0.02em] text-foreground">
            SPEAKERS
          </h2>
          <p className="text-muted-foreground text-sm md:text-base tracking-wide">
            Industry leaders shaping the future of AI-driven design.
          </p>
        </div>
        
        {/* 3x2 grid with bordered cards */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {speakersList.map((speaker, index) => {
            const speakerImage = getSpeakerImage(speaker.name, index, speaker.photo || speaker.image);
            const bgColor = speakerColors[index % speakerColors.length];
            
            return (
              <div
                key={speaker.id || `${speaker.name}-${index}`}
                className="group rounded-2xl border border-muted-foreground/20 p-6 text-center transition-all duration-300 hover:border-muted-foreground/40"
              >
                {/* Square image with colored background */}
                <div className={`mx-auto mb-5 w-28 h-28 relative overflow-hidden rounded-xl ${bgColor}`}>
                  <Image
                    src={speakerImage}
                    alt={speaker.name}
                    fill
                    className="object-cover transition-all duration-500 group-hover:scale-105"
                  />
                </div>
                
                {/* Speaker info - centered */}
                <h3 className="text-lg font-semibold text-foreground mb-1">{speaker.name}</h3>
                <p className="text-sm text-muted-foreground mb-1">
                  {speaker.role}
                </p>
                {(speaker.topic || speaker.bio) && (
                  <p className="text-sm font-medium text-foreground">{speaker.topic || speaker.bio}</p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
