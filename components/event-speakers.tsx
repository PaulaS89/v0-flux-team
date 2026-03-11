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

// Default fallback speakers
const defaultSpeakers: Speaker[] = [
  {
    name: "Sarah Chen",
    role: "CEO, TechVision Inc",
    topic: "The Future of AI in Enterprise",
  },
  {
    name: "Marcus Johnson",
    role: "Lead Developer, CloudScale",
    topic: "Scalable Architectures",
  },
  {
    name: "Lisa Park",
    role: "CTO, StartupLab",
    topic: "From 0 to 1 Million Users",
  },
  {
    name: "Thomas Miller",
    role: "VP Engineering, DataFlow",
    topic: "Data-Driven Decisions",
  },
  {
    name: "Sarah Klein",
    role: "Founder, DevOps Academy",
    topic: "CI/CD Best Practices",
  },
  {
    name: "Michael Brown",
    role: "Principal Architect, Enterprise Co",
    topic: "Microservices in Practice",
  },
];

interface EventSpeakersProps {
  speakers?: Speaker[];
}

export function EventSpeakers({ speakers }: EventSpeakersProps) {
  const speakersList = speakers && speakers.length > 0 ? speakers : defaultSpeakers;

  return (
    <section id="speakers" className="bg-card px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <h2 className="mb-16 text-3xl font-light tracking-tight md:text-4xl">
          Speakers
        </h2>
        <div className="grid gap-1 md:grid-cols-2 lg:grid-cols-3">
          {speakersList.map((speaker, index) => (
            <Card
              key={speaker.id || `${speaker.name}-${index}`}
              className="group cursor-pointer border-0 bg-transparent transition-all hover:bg-secondary/50"
            >
              <CardContent className="p-6">
                <div className="mb-6 aspect-[4/3] w-full bg-muted/50 relative overflow-hidden rounded-lg">
                  {(speaker.photo || speaker.image) ? (
                    <Image
                      src={speaker.photo || speaker.image || ""}
                      alt={speaker.name}
                      fill
                      className="object-cover grayscale transition-all duration-500 ease-out group-hover:grayscale-0 group-hover:scale-110"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center transition-transform duration-500 ease-out group-hover:scale-110">
                      <div className="h-20 w-20 rounded-full bg-muted" />
                    </div>
                  )}
                  {/* Overlay that fades out on hover */}
                  <div className="absolute inset-0 bg-background/20 transition-opacity duration-500 group-hover:opacity-0" />
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
          ))}
        </div>
      </div>
    </section>
  );
}
