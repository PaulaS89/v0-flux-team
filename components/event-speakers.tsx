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
    <section id="speakers" className="bg-card px-6 py-24">
      {/* SVG filter for halftone effect */}
      <svg className="absolute w-0 h-0" aria-hidden="true">
        <defs>
          <filter id="halftone" x="0" y="0" width="100%" height="100%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="0.5" result="blur" />
            <feComponentTransfer in="blur" result="contrast">
              <feFuncR type="linear" slope="1.5" intercept="-0.2" />
              <feFuncG type="linear" slope="1.5" intercept="-0.2" />
              <feFuncB type="linear" slope="1.5" intercept="-0.2" />
            </feComponentTransfer>
          </filter>
        </defs>
      </svg>
      
      <div className="mx-auto max-w-7xl">
        <h2 className="mb-8 ml-6 text-3xl font-light tracking-tight md:text-4xl">
          Speakers
        </h2>
        <div className="grid gap-1 md:grid-cols-2 lg:grid-cols-3">
          {speakersList.map((speaker, index) => {
            // Get speaker image: prioritize Contentful image, then name-based, then index-based fallback
            const speakerImage = getSpeakerImage(speaker.name, index, speaker.photo || speaker.image);
            
            return (
            <Card
              key={speaker.id || `${speaker.name}-${index}`}
              className="cursor-pointer border-0 bg-transparent"
            >
              <CardContent className="p-6 pt-0">
                <div className="group mb-6 aspect-[4/3] w-full relative overflow-hidden rounded-lg bg-muted/50">
                  <Image
                    src={speakerImage}
                    alt={speaker.name}
                    fill
                    className="object-cover grayscale contrast-125 transition-all duration-700 ease-in-out group-hover:scale-105 group-hover:grayscale-0 group-hover:contrast-100"
                  />
                  {/* Halftone dot pattern overlay - visible by default, fades on hover */}
                  <div 
                    className="absolute inset-0 opacity-50 transition-opacity duration-700 ease-in-out group-hover:opacity-0 pointer-events-none"
                    style={{
                      backgroundImage: `radial-gradient(circle at center, #888 0.5px, transparent 0.5px)`,
                      backgroundSize: '3px 3px',
                      mixBlendMode: 'multiply',
                    }}
                  />
                </div>
                <h3 className="mb-1 text-lg font-medium tracking-tight">{speaker.name}</h3>
                <p className="mb-3 text-sm text-muted-foreground">
                  {speaker.role}
                </p>
                {(speaker.topic || speaker.bio) && (
                  <p className="text-sm text-muted-foreground/80">{speaker.topic || speaker.bio}</p>
                )}
              </CardContent>
            </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
