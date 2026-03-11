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
    talkTime: "09:30 · Keynote",
    bio: "As AI systems evolve from tools to collaborators, how do we design experiences that feel less like commanding a machine and more like thinking alongside one? Sarah will explore the shift from prompt-based interfaces to ambient AI - systems that understand context, anticipate needs, and adapt in real-time. Drawing from her work at OpenAI, she'll share research on multimodal interactions and the emerging patterns that will define the next decade of human-computer interaction.",
    image: "/speakers/speaker-woman-1.jpg",
  },
  {
    name: "James Liu",
    role: "Principal Designer",
    topic: "Vercel",
    talkTitle: "Beyond the Prompt: Crafting Intuitive LLM Interfaces",
    talkTime: "10:30 · Panel",
    bio: "The humble text input is holding back AI's potential. In this session, James will break down why prompt-based interfaces often fail users and introduce alternative interaction patterns: inline suggestions, contextual AI assists, and progressive disclosure of AI capabilities. He'll share real examples from Vercel's v0 and demonstrate how small UX decisions dramatically impact user confidence and success rates with AI tools.",
    image: "/speakers/speaker-man-1.jpg",
  },
  {
    name: "Elena Rodriguez",
    role: "UX Director",
    topic: "Figma",
    talkTitle: "The Empathy Algorithm: Human-Centered AI Design",
    talkTime: "13:30 · Talk",
    bio: "AI doesn't understand humans - yet. Elena will present Figma's framework for designing AI features that respect human emotion, context, and cognitive load. Learn how to conduct AI-specific user research, identify where AI creates anxiety vs. delight, and design feedback loops that build trust over time. She'll share case studies from Figma AI's development, including the failures that taught her team the most.",
    image: "/speakers/speaker-woman-2.jpg",
  },
  {
    name: "Marcus Weber",
    role: "Design Systems Lead",
    topic: "Stripe",
    talkTitle: "Hands-On: Prototyping Conversational Experiences",
    talkTime: "14:30 · Workshop",
    bio: "Stop wireframing chatbots - start prototyping conversations. This interactive workshop will walk you through Stripe's rapid prototyping toolkit for conversational AI. You'll learn techniques for scripting realistic dialogue flows, testing edge cases before writing code, and using AI itself to stress-test your designs. Bring your laptop and leave with a functional prototype of your own conversational interface.",
    image: "/speakers/speaker-man-2.jpg",
  },
  {
    name: "Nina Patel",
    role: "Product Design Manager",
    topic: "Anthropic",
    talkTitle: "Beyond the Prompt: Crafting Intuitive LLM Interfaces",
    talkTime: "10:30 · Panel",
    bio: "How do you design trust into AI systems? Nina will share Anthropic's approach to 'Constitutional AI' from a UX perspective - creating interfaces that are transparent about limitations, give users meaningful control, and gracefully handle uncertainty. She'll cover practical patterns for communicating AI confidence levels, designing for AI errors, and building user mental models that set appropriate expectations.",
    image: "/speakers/speaker-woman-3.jpg",
  },
  {
    name: "David Kim",
    role: "Creative Director",
    topic: "Linear",
    talkTitle: "Beyond the Prompt: Crafting Intuitive LLM Interfaces",
    talkTime: "10:30 · Panel",
    bio: "Linear is embedding AI throughout the product - not as a chatbot, but as an invisible collaborator. David will reveal the design philosophy behind Linear's AI features: predicting issue priority, auto-generating project updates, and drafting responses. Learn why they chose subtle AI integration over flashy features, and how this approach has shaped user adoption and workflow improvements.",
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
                className="group relative h-[340px] perspective-1000"
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
                    
                    {/* Talk description - scrollable if needed */}
                    <p className="text-xs text-muted-foreground leading-relaxed flex-1 overflow-y-auto">
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
