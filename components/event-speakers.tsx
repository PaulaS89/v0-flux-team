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

// Fallback images for speakers (3 women, 3 men - used when Contentful doesn't provide unique images)
const fallbackImages = [
  "/speakers/speaker-woman-1.jpg",
  "/speakers/speaker-man-1.jpg",
  "/speakers/speaker-woman-2.jpg",
  "/speakers/speaker-man-2.jpg",
  "/speakers/speaker-woman-3.jpg",
  "/speakers/speaker-man-3.jpg",
];

// Get a fallback image based on speaker index
function getFallbackImage(index: number): string {
  return fallbackImages[index % fallbackImages.length];
}

// Default fallback speakers (3 women, 3 men)
const defaultSpeakers: Speaker[] = [
  {
    name: "Sarah Chen",
    role: "CEO, TechVision Inc",
    topic: "The Future of AI in Enterprise",
    image: "/speakers/speaker-woman-1.jpg",
  },
  {
    name: "Marcus Johnson",
    role: "Lead Developer, CloudScale",
    topic: "Scalable Architectures",
    image: "/speakers/speaker-man-1.jpg",
  },
  {
    name: "Amara Williams",
    role: "CTO, StartupLab",
    topic: "From 0 to 1 Million Users",
    image: "/speakers/speaker-woman-2.jpg",
  },
  {
    name: "Raj Patel",
    role: "VP Engineering, DataFlow",
    topic: "Data-Driven Decisions",
    image: "/speakers/speaker-man-2.jpg",
  },
  {
    name: "Christine Weber",
    role: "Founder, DevOps Academy",
    topic: "CI/CD Best Practices",
    image: "/speakers/speaker-woman-3.jpg",
  },
  {
    name: "David Thompson",
    role: "Principal Architect, Enterprise Co",
    topic: "Microservices in Practice",
    image: "/speakers/speaker-man-3.jpg",
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
        <h2 className="mb-16 text-3xl font-light tracking-tight md:text-4xl">
          Speakers
        </h2>
        <div className="grid gap-1 md:grid-cols-2 lg:grid-cols-3">
          {speakersList.map((speaker, index) => {
            // Use speaker's image/photo if available, otherwise use a fallback based on index
            const speakerImage = speaker.photo || speaker.image || getFallbackImage(index);
            
            return (
            <Card
              key={speaker.id || `${speaker.name}-${index}`}
              className="group cursor-pointer border-0 bg-transparent"
            >
              <CardContent className="p-6">
                <div className="mb-6 aspect-[4/3] w-full relative overflow-hidden rounded-lg bg-muted/50">
                  <Image
                    src={speakerImage}
                    alt={speaker.name}
                    fill
                    className="object-cover transition-all duration-700 ease-in-out group-hover:scale-105 group-hover:grayscale group-hover:contrast-125"
                  />
                  {/* Halftone dot pattern overlay - gradual fade */}
                  <div 
                    className="absolute inset-0 opacity-0 transition-opacity duration-700 ease-in-out group-hover:opacity-50 pointer-events-none"
                    style={{
                      backgroundImage: `radial-gradient(circle at center, #000 0.5px, transparent 0.5px)`,
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
