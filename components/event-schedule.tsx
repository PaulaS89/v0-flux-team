"use client";

import { useState } from "react";

interface ScheduleItem {
  time: string;
  title: string;
  speaker: string;
  type: "keynote" | "talk" | "break";
}

// Default fallback schedule
const defaultSchedule: ScheduleItem[] = [
  {
    time: "08:30",
    title: "Registration & Networking Breakfast",
    speaker: "",
    type: "break",
  },
  {
    time: "09:00",
    title: "Welcome & Opening Remarks",
    speaker: "",
    type: "break",
  },
  {
    time: "09:15",
    title: "Keynote: The Future of Digital Experiences",
    speaker: "Dr. Lena Hoffmann",
    type: "keynote",
  },
  {
    time: "10:00",
    title: "Panel Discussion: AI, Personalization & Trust",
    speaker: "Markus Stein, Sofia Alvarez, Prof. Dr. Adrian Keller",
    type: "talk",
  },
  {
    time: "10:45",
    title: "Coffee Break",
    speaker: "",
    type: "break",
  },
  {
    time: "11:00",
    title: "Deep Dive: Designing Human-Centered Digital Journeys",
    speaker: "Sofia Alvarez",
    type: "talk",
  },
  {
    time: "11:45",
    title: "Case Studies: Transformations Across Industries",
    speaker: "Julia Brandt",
    type: "talk",
  },
  {
    time: "12:30",
    title: "Networking Lunch",
    speaker: "",
    type: "break",
  },
  {
    time: "13:30",
    title: "Breakout Sessions",
    speaker: "Experience Platforms / AR & VR / Responsible AI",
    type: "talk",
  },
  {
    time: "14:15",
    title: "Closing Insights & Q&A",
    speaker: "Dr. Lena Hoffmann",
    type: "keynote",
  },
  {
    time: "15:00",
    title: "Informal Networking",
    speaker: "",
    type: "break",
  },
];

interface EventScheduleProps {
  items?: ScheduleItem[];
}

export function EventSchedule({ items }: EventScheduleProps) {
  const schedule = items && items.length > 0 ? items : defaultSchedule;
  const [activeTab, setActiveTab] = useState<"sessions" | "workshops">("sessions");

  return (
    <section id="schedule" className="bg-background px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <h2 className="mb-16 text-3xl font-light tracking-tight md:text-4xl">
          Agenda
        </h2>
        
        {/* Tabs */}
        <div className="mb-8 flex gap-2">
          <button
            onClick={() => setActiveTab("sessions")}
            className={`px-6 py-3 text-xs font-medium uppercase tracking-[0.15em] transition-colors ${
              activeTab === "sessions"
                ? "bg-secondary text-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Sessions
          </button>
          <button
            onClick={() => setActiveTab("workshops")}
            className={`px-6 py-3 text-xs font-medium uppercase tracking-[0.15em] transition-colors ${
              activeTab === "workshops"
                ? "bg-secondary text-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Workshops
          </button>
        </div>

        {/* Table Header */}
        <div className="hidden md:grid grid-cols-12 gap-4 border-b border-border py-4 text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
          <div className="col-span-3">Time (EST)</div>
          <div className="col-span-6">Title</div>
          <div className="col-span-3">Speakers</div>
        </div>

        {/* Schedule Items */}
        <div className="divide-y divide-border">
          {schedule.map((item, index) => (
            <div
              key={index}
              className={`group grid md:grid-cols-12 gap-2 md:gap-4 py-6 transition-colors ${
                item.type === "break" ? "bg-secondary/50" : "hover:bg-secondary/30"
              }`}
            >
              <div className="md:col-span-3">
                <span className="text-sm text-muted-foreground font-mono">
                  {item.time}
                </span>
              </div>
              <div className="md:col-span-6">
                <h3
                  className={`text-base md:text-lg font-medium uppercase tracking-wide ${
                    item.type === "break"
                      ? "text-muted-foreground"
                      : "text-foreground"
                  }`}
                >
                  {item.title}
                </h3>
              </div>
              <div className="md:col-span-3">
                {item.speaker && (
                  <p className="text-sm text-muted-foreground">
                    {item.speaker}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
