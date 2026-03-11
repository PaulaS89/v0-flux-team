"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

interface ScheduleItem {
  time: string;
  title: string;
  speaker: string;
  type: "keynote" | "talk" | "break" | "intro" | "afterparty";
}

// Default fallback schedule
const defaultSchedule: ScheduleItem[] = [
  {
    time: "09:00",
    title: "Welcome to FLUX",
    speaker: "",
    type: "intro",
  },
  {
    time: "09:30",
    title: "When Machines Dream: Reimagining UX for the AI Era",
    speaker: "Sarah Chen",
    type: "keynote",
  },
  {
    time: "10:30",
    title: "Beyond the Prompt: Crafting Intuitive LLM Interfaces",
    speaker: "James Liu, Elena Rodriguez, Marcus Weber",
    type: "talk",
  },
  {
    time: "12:00",
    title: "Networking Lunch",
    speaker: "",
    type: "break",
  },
  {
    time: "13:30",
    title: "The Empathy Algorithm: Human-Centered AI Design",
    speaker: "Elena Rodriguez",
    type: "talk",
  },
  {
    time: "14:30",
    title: "Hands-On: Prototyping Conversational Experiences",
    speaker: "Marcus Weber",
    type: "talk",
  },
  {
    time: "16:00",
    title: "What Comes After the Chatbot?",
    speaker: "Sarah Chen",
    type: "keynote",
  },
  {
    time: "17:00",
    title: "Drinks & Afterparty",
    speaker: "",
    type: "afterparty",
  },
];

// Ocean theme schedule content
const oceanSchedule: ScheduleItem[] = [
  {
    time: "09:00",
    title: "Welcome to FLUX",
    speaker: "",
    type: "intro",
  },
  {
    time: "09:30",
    title: "Navigating the AI Tide: UX in Uncharted Waters",
    speaker: "Sarah Chen",
    type: "keynote",
  },
  {
    time: "10:30",
    title: "Deep Currents: Designing LLM Flows That Feel Natural",
    speaker: "James Liu, Elena Rodriguez, Marcus Weber",
    type: "talk",
  },
  {
    time: "12:00",
    title: "Seaside Networking Lunch",
    speaker: "",
    type: "break",
  },
  {
    time: "13:30",
    title: "Surface Tension: Balancing AI Power with User Trust",
    speaker: "Elena Rodriguez",
    type: "talk",
  },
  {
    time: "14:30",
    title: "Hands-On: Building Adaptive AI Interfaces",
    speaker: "Marcus Weber",
    type: "talk",
  },
  {
    time: "16:00",
    title: "The Next Wave: Where AI UX Is Headed",
    speaker: "Sarah Chen",
    type: "keynote",
  },
  {
    time: "17:00",
    title: "Sunset Drinks & Afterparty",
    speaker: "",
    type: "afterparty",
  },
];

interface EventScheduleProps {
  items?: ScheduleItem[];
  headerImageUrl?: string;
  themeName?: string;
}

function getTagStyle(type: ScheduleItem["type"]) {
  switch (type) {
    case "keynote":
      return "bg-amber-500/20 text-amber-300 border-amber-500/30";
    case "talk":
      return "bg-cyan-500/20 text-cyan-300 border-cyan-500/30";
    case "break":
      return "bg-emerald-500/20 text-emerald-300 border-emerald-500/30";
    case "intro":
      return "bg-violet-500/20 text-violet-300 border-violet-500/30";
    case "afterparty":
      return "bg-pink-500/20 text-pink-300 border-pink-500/30";
    default:
      return "bg-muted text-muted-foreground border-border";
  }
}

function getTagLabel(type: ScheduleItem["type"]) {
  switch (type) {
    case "keynote":
      return "Keynote";
    case "talk":
      return "Talk";
    case "break":
      return "Break";
    case "intro":
      return "Intro";
    case "afterparty":
      return "Afterparty";
    default:
      return type;
  }
}

function ScheduleCard({ item, index, isEven }: { item: ScheduleItem; index: number; isEven: boolean }) {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Add a staggered delay based on index
          setTimeout(() => {
            setIsVisible(true);
          }, index * 100);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, [index]);

  return (
    <div
      ref={cardRef}
      className={`relative flex items-start gap-6 transition-all duration-700 ease-out ${
        isEven ? "md:flex-row" : "md:flex-row-reverse"
      } ${
        isVisible 
          ? "opacity-100 translate-y-0" 
          : "opacity-0 translate-y-8"
      }`}
      style={{ transitionDelay: `${index * 50}ms` }}
    >
      {/* Timeline dot */}
      <div className="absolute left-4 md:left-1/2 md:-translate-x-1/2 z-10 top-5">
        <div className={`w-2.5 h-2.5 rounded-full transition-all duration-500 ${
          isVisible ? "bg-primary scale-100" : "bg-muted-foreground/50 scale-0"
        }`} />
      </div>

      {/* Spacer for mobile */}
      <div className="w-6 md:hidden shrink-0" />

      {/* Card */}
      <div
        className={`flex-1 md:w-[calc(50%-2rem)] ${
          isEven ? "md:pr-8" : "md:pl-8"
        }`}
      >
        <div className="relative rounded-xl border border-muted-foreground/20 bg-card/40 backdrop-blur-md p-4 transition-all duration-300 hover:border-muted-foreground/40 hover:bg-card/60">
          {/* Time & Type */}
          <div className="flex items-center justify-between mb-2">
            <span className="font-mono text-sm text-primary">
              {item.time}
            </span>
            <span
              className={`rounded-full border px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-wider ${getTagStyle(
                item.type
              )}`}
            >
              {getTagLabel(item.type)}
            </span>
          </div>
          
          {/* Title */}
          <h3 className="text-base font-medium text-foreground mb-1" style={{ fontFamily: 'var(--font-display)' }}>
            {item.title}
          </h3>
          
          {/* Speaker */}
          {item.speaker && (
            <p className="text-sm text-muted-foreground">
              {item.speaker}
            </p>
          )}
        </div>
      </div>

      {/* Empty space for alternating layout on desktop */}
      <div className="hidden md:block flex-1 md:w-[calc(50%-2rem)]" />
    </div>
  );
}

export function EventSchedule({ items, headerImageUrl, themeName }: EventScheduleProps) {
  // Use ocean schedule when ocean theme is active (and no Contentful items provided)
  const isOceanTheme = themeName?.toLowerCase().includes("ocean");
  const fallbackSchedule = isOceanTheme ? oceanSchedule : defaultSchedule;
  const schedule = items && items.length > 0 ? items : fallbackSchedule;

  return (
    <section id="schedule" className="relative bg-background px-8 md:px-16 lg:px-24 py-16 overflow-hidden">
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent pointer-events-none" />
      
      <div className="relative mx-auto max-w-4xl">
        {/* Header with optional circle motif image */}
        <div className="mb-16 text-center">
          {headerImageUrl && (
            <div className="relative mx-auto mb-8 w-32 h-32 md:w-40 md:h-40">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/20 to-transparent blur-xl" />
              <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-primary/30 shadow-lg shadow-primary/10">
                <Image
                  src={headerImageUrl}
                  alt="Schedule section motif"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          )}
          <h2 className="mb-4 text-4xl md:text-6xl font-medium tracking-tight text-foreground" style={{ fontFamily: 'var(--font-display)' }}>
            Agenda
          </h2>
          <p className="text-muted-foreground text-lg italic">
            One day. Big ideas. The future of human-AI interaction.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical timeline line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-foreground/20 md:-translate-x-px" />

          {/* Schedule Items */}
          <div className="space-y-4">
            {schedule.map((item, index) => {
              const isEven = index % 2 === 0;
              
              return (
                <ScheduleCard 
                  key={index} 
                  item={item} 
                  index={index} 
                  isEven={isEven} 
                />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
