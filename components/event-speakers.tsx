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
  "Nathan Jones": "/speakers/nathan-jones.jpg",
};

// Name overrides for speakers (to correct Contentful data)
const speakerNameOverrides: Record<string, string> = {
  "Nora Jones": "Nathan Jones",
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
    talkTime: "09:30 - 10:30 · Opening Keynote",
    bio: "The era of command-line AI is ending. In this opening keynote, Sarah Chen draws from her pioneering work at OpenAI to unveil what comes next: AI systems that don't wait for prompts but anticipate, adapt, and collaborate in real-time.\n\nYou'll explore: How multimodal AI is dissolving the boundaries between text, voice, and gesture • Why the best AI interfaces will become invisible • Research findings on 'ambient intelligence' - AI that understands context without being told • The cognitive science behind interfaces that feel like thinking alongside a partner, not commanding a tool • Practical frameworks for designing AI experiences that enhance rather than replace human agency.\n\nSarah will demo unreleased interaction prototypes and share the design principles shaping OpenAI's next generation of consumer products.",
    image: "/speakers/speaker-woman-1.jpg",
  },
  {
    name: "James Liu",
    role: "Principal Designer",
    topic: "Vercel",
    talkTitle: "Beyond the Prompt: Crafting Intuitive LLM Interfaces",
    talkTime: "10:30 - 12:00 · Panel Discussion",
    bio: "The text box is a dead end. In this panel, James Liu joins fellow designers to dismantle the myth that prompts are the future of AI interaction and reveal what actually works.\n\nDrawing from his work on Vercel's v0, James will share: Why 73% of users abandon AI tools after their first failed prompt • The 'progressive disclosure' pattern that increased v0's success rate by 40% • How inline suggestions outperform chat interfaces for creative tasks • Real A/B test data comparing different AI interaction paradigms • The surprising role of constraints in making AI feel more capable.\n\nThe panel will include live critiques of popular AI interfaces and concrete recommendations you can implement immediately.",
    image: "/speakers/speaker-man-1.jpg",
  },
  {
    name: "Elena Rodriguez",
    role: "UX Director",
    topic: "Figma",
    talkTitle: "The Empathy Algorithm: Human-Centered AI Design",
    talkTime: "13:30 - 14:30 · Afternoon Talk",
    bio: "AI doesn't understand emotions - but your interface must. Elena Rodriguez reveals Figma's internal framework for designing AI features that respect human psychology, reduce anxiety, and build genuine trust over time.\n\nThis session covers: The 'Emotional Audit' - a method for mapping where AI creates stress vs. delight in user journeys • Why AI confidence indicators often backfire (and what to show instead) • Designing 'graceful degradation' - how AI should fail without breaking user trust • Case study: The Figma AI feature they killed after user research revealed unexpected harm • Building feedback loops that actually improve AI behavior • The 'Human Override Principle' and why every AI action needs an escape hatch.\n\nElena will share templates and frameworks you can adapt for your own AI feature development.",
    image: "/speakers/speaker-woman-2.jpg",
  },
  {
    name: "Marcus Weber",
    role: "Design Systems Lead",
    topic: "Stripe",
    talkTitle: "Hands-On: Prototyping Conversational Experiences",
    talkTime: "14:30 - 16:00 · Interactive Workshop",
    bio: "Stop wireframing chatbots. Start prototyping conversations. In this 90-minute hands-on workshop, Marcus Weber teaches Stripe's battle-tested methodology for rapidly designing and testing conversational AI interfaces.\n\nWhat you'll build: A functional conversational prototype using no-code tools • Realistic dialogue trees that handle edge cases gracefully • AI-powered stress tests that find breaking points before users do.\n\nWhat you'll learn: The 'Conversation Mapping' technique used by Stripe's AI team • How to prototype a week's worth of chatbot design in 2 hours • Testing scripts that reveal UX problems invisible in static mockups • Using Claude and GPT to roleplay difficult users and break your designs • The 3 conversation patterns that handle 80% of user intents.\n\nBring your laptop. Leave with a working prototype and a repeatable process.",
    image: "/speakers/speaker-man-2.jpg",
  },
  {
    name: "Nina Patel",
    role: "Product Design Manager",
    topic: "Anthropic",
    talkTitle: "Beyond the Prompt: Crafting Intuitive LLM Interfaces",
    talkTime: "10:30 - 12:00 · Panel Discussion",
    bio: "How do you design trust into systems that might be wrong? Nina Patel brings Anthropic's safety-first perspective to the panel, sharing hard-won lessons from building Claude's interface.\n\nHer contributions focus on: Why transparency about AI limitations increases user confidence (counterintuitively) • The 'Constitutional UX' framework - embedding values into interaction design • Designing for appropriate reliance - helping users know when to trust AI and when to verify • Visual patterns for communicating uncertainty without creating anxiety • Case study: How Claude's 'I'm not sure' responses were designed and iterated.\n\nNina will share Anthropic's internal guidelines for AI interface ethics and discuss the tension between capability and safety in consumer AI products.",
    image: "/speakers/speaker-woman-3.jpg",
  },
  {
    name: "David Kim",
    role: "Creative Director",
    topic: "Linear",
    talkTitle: "Beyond the Prompt: Crafting Intuitive LLM Interfaces",
    talkTime: "10:30 - 12:00 · Panel Discussion",
    bio: "The best AI is the AI you don't notice. David Kim shares Linear's contrarian approach: embedding intelligence throughout the product without ever showing a chatbot or prompt field.\n\nIn this panel, David reveals: Why Linear rejected the 'AI assistant' paradigm entirely • The 'Invisible AI' principle - intelligence that enhances existing workflows rather than creating new ones • How predictive issue prioritization reduced triage time by 60% • Auto-generated project updates that users actually read (and the 12 versions that failed) • The decision framework for choosing 'AI-enhanced' vs. 'AI-powered' features.\n\nDavid will share Linear's internal AI feature evaluation rubric and explain why saying 'no' to obvious AI features was their best product decision.",
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

// Talk details by speaker name - used to enrich Contentful speakers with detailed talk info
const talkDetailsByName: Record<string, { talkTitle: string; talkTime: string; talkDescription: string }> = {
  "Sarah Chen": {
    talkTitle: "When Machines Dream: Reimagining UX for the AI Era",
    talkTime: "09:30 · Keynote",
    talkDescription: "The era of command-line AI is ending. Sarah unveils what comes next: AI systems that anticipate, adapt, and collaborate in real-time. Explore how multimodal AI dissolves boundaries between text, voice, and gesture, and why the best AI interfaces will become invisible.",
  },
  "James Liu": {
    talkTitle: "Beyond the Prompt: Crafting Intuitive LLM Interfaces",
    talkTime: "10:30 · Panel",
    talkDescription: "The text box is a dead end. James dismantles the myth that prompts are the future of AI interaction. Learn why 73% of users abandon AI tools after their first failed prompt and discover the 'progressive disclosure' pattern that increased v0's success rate by 40%.",
  },
  "Elena Rodriguez": {
    talkTitle: "The Empathy Algorithm: Human-Centered AI Design",
    talkTime: "13:30 · Talk",
    talkDescription: "AI doesn't understand emotions - but your interface must. Elena reveals Figma's framework for designing AI features that respect human psychology and build genuine trust. Learn the 'Emotional Audit' method and the 'Human Override Principle'.",
  },
  "Marcus Weber": {
    talkTitle: "Hands-On: Prototyping Conversational Experiences",
    talkTime: "14:30 · Workshop",
    talkDescription: "Stop wireframing chatbots. Start prototyping conversations. In this hands-on workshop, learn Stripe's methodology for rapidly designing conversational AI. Build a functional prototype and learn the 3 conversation patterns that handle 80% of user intents.",
  },
  "Nina Patel": {
    talkTitle: "Beyond the Prompt: Crafting Intuitive LLM Interfaces",
    talkTime: "10:30 · Panel",
    talkDescription: "How do you design trust into systems that might be wrong? Nina shares Anthropic's safety-first perspective and the 'Constitutional UX' framework - embedding values into interaction design while helping users know when to trust AI.",
  },
  "David Kim": {
    talkTitle: "Beyond the Prompt: Crafting Intuitive LLM Interfaces",
    talkTime: "10:30 · Panel",
    talkDescription: "The best AI is the AI you don't notice. David shares Linear's contrarian approach: embedding intelligence throughout the product without ever showing a chatbot. Learn how predictive issue prioritization reduced triage time by 60%.",
  },
  "Jessica": {
    talkTitle: "Designing for AI Uncertainty",
    talkTime: "11:00 · Talk",
    talkDescription: "When AI doesn't know, how should it tell users? Jessica explores patterns for communicating uncertainty in AI systems - from confidence indicators to graceful fallbacks. Learn how to design interfaces that build trust even when the AI isn't 100% sure.",
  },
  "Nora": {
    talkTitle: "The Future of Creative AI Tools",
    talkTime: "15:00 · Talk",
    talkDescription: "AI is transforming creative workflows, but not always for the better. Nora examines the tension between AI assistance and creative autonomy, sharing frameworks for designing AI tools that amplify human creativity rather than replace it.",
  },
  "Jessica Schwabe": {
    talkTitle: "Designing for AI Uncertainty",
    talkTime: "11:00 · Talk",
    talkDescription: "When AI doesn't know, how should it tell users? Jessica explores patterns for communicating uncertainty in AI systems - from confidence indicators to graceful fallbacks. Learn how to design interfaces that build trust even when the AI isn't 100% sure.",
  },
  "Nora Schmidt": {
    talkTitle: "The Future of Creative AI Tools",
    talkTime: "15:00 · Talk",
    talkDescription: "AI is transforming creative workflows, but not always for the better. Nora examines the tension between AI assistance and creative autonomy, sharing frameworks for designing AI tools that amplify human creativity rather than replace it.",
  },
  "Jessica Belonda": {
    talkTitle: "AI-Driven Design Systems at Scale",
    talkTime: "14:00 · Talk",
    talkDescription: "How do you build design systems that evolve with AI? Jessica shares her pioneering approach to collaborative design systems that leverage machine learning for component suggestions, automated accessibility checks, and predictive design patterns.",
  },
  "Nora Abdelrahman": {
    talkTitle: "Conversational Design for Global Audiences",
    talkTime: "15:30 · Talk",
    talkDescription: "AI conversations don't translate - they transform. Nora explores the challenges of designing conversational interfaces for multilingual users, sharing frameworks for culturally-aware AI that adapts tone, formality, and interaction patterns.",
  },
  "Nora Jones": {
    talkTitle: "Voice Interfaces and the Future of Accessibility",
    talkTime: "16:00 · Talk",
    talkDescription: "Voice is the most natural interface, yet most AI voice experiences fall short. Nathan shares insights on designing accessible voice interfaces that work for everyone, from multimodal fallbacks to inclusive conversation design patterns.",
  },
  "Nathan Jones": {
    talkTitle: "Voice Interfaces and the Future of Accessibility",
    talkTime: "16:00 · Talk",
    talkDescription: "Voice is the most natural interface, yet most AI voice experiences fall short. Nathan shares insights on designing accessible voice interfaces that work for everyone, from multimodal fallbacks to inclusive conversation design patterns.",
  },
};

// Create a normalized lookup map for case-insensitive matching
const normalizedTalkDetails = Object.fromEntries(
  Object.entries(talkDetailsByName).map(([name, details]) => [name.toLowerCase().trim(), details])
);

// Function to enrich a speaker with talk details and apply name overrides
function enrichSpeakerWithTalkDetails(speaker: Speaker): Speaker {
  // Apply name override if exists
  const displayName = speakerNameOverrides[speaker.name] || speaker.name;
  const normalizedName = displayName.toLowerCase().trim();
  const talkDetails = normalizedTalkDetails[normalizedName];
  
  const enrichedSpeaker = {
    ...speaker,
    name: displayName, // Use overridden name
  };
  
  if (talkDetails) {
    return {
      ...enrichedSpeaker,
      talkTitle: speaker.talkTitle || talkDetails.talkTitle,
      talkTime: speaker.talkTime || talkDetails.talkTime,
      bio: talkDetails.talkDescription, // Always use the detailed description
    };
  }
  return enrichedSpeaker;
}

// Extract time from talkTime string (e.g., "09:30 · Keynote" -> 930)
function extractTimeValue(talkTime?: string): number {
  if (!talkTime) return 9999; // Put speakers without time at the end
  const timeMatch = talkTime.match(/(\d{1,2}):(\d{2})/);
  if (timeMatch) {
    const hours = parseInt(timeMatch[1], 10);
    const minutes = parseInt(timeMatch[2], 10);
    return hours * 100 + minutes;
  }
  return 9999;
}

export function EventSpeakers({ speakers }: EventSpeakersProps) {
  // Use Contentful speakers if available, otherwise use defaults
  const baseSpeakers = speakers && speakers.length > 0 ? speakers : defaultSpeakers;
  // Enrich all speakers with detailed talk info
  const enrichedSpeakers = baseSpeakers.map(enrichSpeakerWithTalkDetails);
  // Sort speakers by talk time (earliest first)
  const speakersList = [...enrichedSpeakers].sort((a, b) => {
    return extractTimeValue(a.talkTime) - extractTimeValue(b.talkTime);
  });

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
                className="group relative h-[280px] rounded-2xl border border-muted-foreground/20 bg-background overflow-hidden"
              >
                {/* Front content - always visible */}
                <div className="absolute inset-0 p-6 text-center flex flex-col items-center">
                  {/* Square image with colored background */}
                  <div className={`mb-5 w-28 h-28 relative overflow-hidden rounded-xl ${bgColor} shrink-0`}>
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
                
                {/* Sheet overlay - slides up from bottom on hover */}
                <div className="absolute inset-0 bg-background border-t border-muted-foreground/20 rounded-t-2xl p-4 flex flex-col translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out shadow-[0_-10px_40px_rgba(0,0,0,0.3)]">
                  {/* Talk time badge */}
                  {speaker.talkTime && (
                    <span className="inline-block self-start font-mono text-[10px] text-primary mb-1.5 shrink-0">
                      {speaker.talkTime}
                    </span>
                  )}
                  
                  {/* Talk title */}
                  <h4 className="text-sm font-semibold text-foreground mb-2 leading-snug shrink-0">
                    {speaker.talkTitle || speaker.topic}
                  </h4>
                  
                  {/* Talk description - scrollable */}
                  <div className="flex-1 overflow-y-auto min-h-0 pr-1">
                    <p className="text-[11px] text-muted-foreground leading-relaxed">
                      {speaker.bio}
                    </p>
                  </div>
                  
                  {/* Speaker attribution */}
                  <div className="flex items-center gap-2 mt-2 pt-2 border-t border-muted-foreground/10 shrink-0">
                    <div className={`w-6 h-6 relative overflow-hidden rounded-full ${bgColor}`}>
                      <Image
                        src={speakerImage}
                        alt={speaker.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <p className="text-xs font-medium text-foreground">{speaker.name}</p>
                      <p className="text-[10px] text-muted-foreground">{speaker.topic}</p>
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
