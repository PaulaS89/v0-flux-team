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

// Default fallback speakers (matching Contentful speaker names)
const defaultSpeakers: Speaker[] = [
  {
    name: "Sarah Chen",
    role: "Keynote Speaker",
    topic: "The Future of Digital Experiences",
    image: "/speakers/speaker-woman-1.jpg",
  },
  {
    name: "James Liu",
    role: "Panelist",
    topic: "AI, Personalization & Trust",
    image: "/speakers/speaker-man-1.jpg",
  },
  {
    name: "Elena Rodriguez",
    role: "UX Director",
    topic: "Designing Human-Centered Digital Journeys",
    image: "/speakers/speaker-woman-2.jpg",
  },
  {
    name: "Marcus Weber",
    role: "Panelist",
    topic: "AI, Personalization & Trust",
    image: "/speakers/speaker-man-2.jpg",
  },
];

interface EventSpeakersProps {
  speakers?: Speaker[];
}

export function EventSpeakers({ speakers }: EventSpeakersProps) {
  const speakersList = speakers && speakers.length > 0 ? speakers : defaultSpeakers;

  return (
    <section id="speakers" className="bg-background px-8 md:px-16 lg:px-24 py-16">
      <div className="mx-auto max-w-6xl">
        {/* Header matching agenda style - left aligned */}
        <div className="mb-12">
          <h2 className="mb-4 text-3xl md:text-4xl font-medium tracking-[0.02em] text-foreground">
            SPEAKERS
          </h2>
          <p className="text-muted-foreground text-sm md:text-base tracking-wide">
            Industry leaders shaping the future of AI-driven design.
          </p>
        </div>
        
        {/* Speakers in 2x2 grid with horizontal cards */}
        <div className="grid gap-6 md:grid-cols-2">
          {speakersList.map((speaker, index) => {
            const speakerImage = getSpeakerImage(speaker.name, index, speaker.photo || speaker.image);
            
            return (
              <div
                key={speaker.id || `${speaker.name}-${index}`}
                className="group flex items-start gap-5"
              >
                {/* Square image with subtle rounded corners */}
                <div className="w-24 h-24 md:w-28 md:h-28 relative overflow-hidden rounded-lg bg-muted/30 shrink-0">
                  <Image
                    src={speakerImage}
                    alt={speaker.name}
                    fill
                    className="object-cover grayscale contrast-110 transition-all duration-500 group-hover:grayscale-0 group-hover:contrast-100"
                  />
                </div>
                
                {/* Speaker info - left aligned */}
                <div className="pt-1">
                  <h3 className="text-base font-medium text-foreground mb-1">{speaker.name}</h3>
                  <p className="text-sm text-primary mb-2">
                    {speaker.role}
                  </p>
                  {(speaker.topic || speaker.bio) && (
                    <p className="text-sm text-muted-foreground leading-relaxed">{speaker.topic || speaker.bio}</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
