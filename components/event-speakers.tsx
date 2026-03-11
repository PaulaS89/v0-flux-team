"use client";

import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

interface Speaker {
  id?: string; // Unique identifier from Contentful
  name: string;
  role: string;
  topic?: string;
  bio?: string;
  photo?: string | null;
  image?: string | null; // Alternative field name from Contentful
}

// Default fallback speakers
const defaultSpeakers: Speaker[] = [
  {
    name: "Dr. Anna Weber",
    role: "CEO, TechVision GmbH",
    topic: "Die Zukunft der KI im Unternehmen",
  },
  {
    name: "Marcus Schmidt",
    role: "Lead Developer, CloudScale",
    topic: "Skalierbare Architekturen",
  },
  {
    name: "Lisa Hoffmann",
    role: "CTO, StartupLab",
    topic: "Von 0 auf 1 Million Nutzer",
  },
  {
    name: "Thomas Mueller",
    role: "VP Engineering, DataFlow",
    topic: "Datengetriebene Entscheidungen",
  },
  {
    name: "Sarah Klein",
    role: "Founder, DevOps Academy",
    topic: "CI/CD Best Practices",
  },
  {
    name: "Michael Braun",
    role: "Principal Architect, Enterprise Co",
    topic: "Microservices in der Praxis",
  },
];

interface EventSpeakersProps {
  speakers?: Speaker[];
}

export function EventSpeakers({ speakers }: EventSpeakersProps) {
  const speakersList = speakers && speakers.length > 0 ? speakers : defaultSpeakers;

  return (
    <section id="speaker" className="bg-background px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <h2 className="mb-16 text-3xl font-light tracking-tight md:text-4xl">
          Speaker
        </h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {speakersList.map((speaker, index) => (
            <Card
              key={speaker.id || `${speaker.name}-${index}`}
              className="group cursor-pointer border-border bg-secondary transition-colors hover:border-foreground/50"
            >
              <CardContent className="p-6">
                <div className="mb-8 h-48 w-full bg-muted relative overflow-hidden">
                  {(speaker.photo || speaker.image) ? (
                    <Image
                      src={speaker.photo || speaker.image || ""}
                      alt={speaker.name}
                      fill
                      className="object-cover"
                    />
                  ) : null}
                </div>
                <h3 className="mb-1 text-lg font-medium">{speaker.name}</h3>
                <p className="mb-3 text-sm text-muted-foreground">
                  {speaker.role}
                </p>
                {(speaker.topic || speaker.bio) && (
                  <p className="text-sm text-foreground/80">{speaker.topic || speaker.bio}</p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
