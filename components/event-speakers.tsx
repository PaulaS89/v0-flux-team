"use client";

import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

interface Speaker {
  id?: string;
  name: string;
  role: string;
  topic?: string;
  talkTitle?: string;
  talkTime?: string;
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

// Default fallback speakers (6 total for 3x2 grid) - aligned with agenda
const defaultSpeakers: Speaker[] = [
  {
    name: "Sarah Chen",
    role: "AI Research Lead",
    topic: "OpenAI",
    talkTitle: "When Machines Dream: Reimagining UX for the AI Era",
    talkTime: "09:30",
    bio: "What happens when AI systems start anticipating our needs before we express them? Sarah explores the paradigm shift in UX design as we move from reactive to predictive interfaces.",
    image: "/speakers/speaker-woman-1.jpg",
  },
  {
    name: "James Liu",
    role: "Principal Designer",
    topic: "Vercel",
    talkTitle: "Beyond the Prompt: Crafting Intuitive LLM Interfaces",
    talkTime: "10:30",
    bio: "The text box is just the beginning. James reveals design patterns for LLM interactions that feel natural, forgiving, and surprisingly delightful.",
    image: "/speakers/speaker-man-1.jpg",
  },
  {
    name: "Elena Rodriguez",
    role: "UX Director",
    topic: "Figma",
    talkTitle: "The Empathy Algorithm: Human-Centered AI Design",
    talkTime: "13:30",
    bio: "How do we design AI that truly understands human context and emotion? Elena shares frameworks for building empathetic AI experiences at scale.",
    image: "/speakers/speaker-woman-2.jpg",
  },
  {
    name: "Marcus Weber",
    role: "Design Systems Lead",
    topic: "Stripe",
    talkTitle: "Hands-On: Prototyping Conversational Experiences",
    talkTime: "14:30",
    bio: "A practical workshop on rapid prototyping techniques for conversational UIs - from quick paper sketches to functional AI-powered prototypes.",
    image: "/speakers/speaker-man-2.jpg",
  },
  {
    name: "Nina Patel",
    role: "Product Design Manager",
    topic: "Anthropic",
    talkTitle: "Beyond the Prompt: Crafting Intuitive LLM Interfaces",
    talkTime: "10:30",
    bio: "Nina brings the safety perspective to LLM interface design - how do we build trust through transparency and give users meaningful control?",
    image: "/speakers/speaker-woman-3.jpg",
  },
  {
    name: "David Kim",
    role: "Creative Director",
    topic: "Linear",
    talkTitle: "Beyond the Prompt: Crafting Intuitive LLM Interfaces",
    talkTime: "10:30",
    bio: "David shares how Linear is rethinking issue tracking with AI - creating interfaces that predict what you need before you ask.",
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
                className="group relative h-[280px] perspective-1000"
              >
                {/* Card container with flip animation */}
                <div className="relative w-full h-full transition-transform duration-500 transform-style-3d group-hover:rotate-y-180">
                  
                  {/* Front of card */}
                  <div className="absolute inset-0 backface-hidden rounded-2xl border border-muted-foreground/20 p-6 text-center bg-background">
                    {/* Square image with colored background */}
                    <div className={`mx-auto mb-5 w-28 h-28 relative overflow-hidden rounded-xl ${bgColor}`}>
                      <Image
                        src={speakerImage}
                        alt={speaker.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    
                    {/* Speaker info - centered */}
                    <h3 className="text-lg font-semibold text-foreground mb-1">{speaker.name}</h3>
                    <p className="text-sm text-muted-foreground mb-1">
                      {speaker.role}
                    </p>
                    <p className="text-sm font-medium text-foreground">{speaker.topic}</p>
                  </div>
                  
                  {/* Back of card - shows talk details */}
                  <div className="absolute inset-0 backface-hidden rotate-y-180 rounded-2xl border border-muted-foreground/20 p-5 bg-background flex flex-col">
                    {/* Talk time badge */}
                    {speaker.talkTime && (
                      <span className="inline-block self-start font-mono text-xs text-primary mb-2">
                        {speaker.talkTime}
                      </span>
                    )}
                    
                    {/* Talk title */}
                    <h4 className="text-base font-semibold text-foreground mb-3 leading-tight">
                      {speaker.talkTitle || speaker.topic}
                    </h4>
                    
                    {/* Talk description */}
                    <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                      {speaker.bio}
                    </p>
                    
                    {/* Speaker attribution */}
                    <div className="flex items-center gap-3 mt-4 pt-3 border-t border-muted-foreground/10">
                      <div className={`w-8 h-8 relative overflow-hidden rounded-full ${bgColor}`}>
                        <Image
                          src={speakerImage}
                          alt={speaker.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">{speaker.name}</p>
                        <p className="text-xs text-muted-foreground">{speaker.topic}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
