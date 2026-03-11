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
    time: "9:00 AM - 10:30 AM",
    title: "Arrival, Breakfast, and Preshow",
    speaker: "",
    type: "break",
  },
  {
    time: "10:30 AM - 11:30 AM",
    title: "Opening Keynote",
    speaker: "Sarah Chen, FLUX",
    type: "keynote",
  },
  {
    time: "11:30 AM - 12:00 PM",
    title: "Customer Panel",
    speaker: "Michael Torres, FLUX",
    type: "talk",
  },
  {
    time: "12:00 PM - 1:15 PM",
    title: "Lunch",
    speaker: "",
    type: "break",
  },
  {
    time: "1:15 PM - 1:35 PM",
    title: "Customer Session I",
    speaker: "TBA",
    type: "talk",
  },
  {
    time: "1:35 PM - 1:55 PM",
    title: "Dynamic Content at Scale",
    speaker: "James Wilson, HelloFresh",
    type: "talk",
  },
  {
    time: "1:55 PM - 2:15 PM",
    title: "The SRE's Case for Modern Infrastructure",
    speaker: "Priya Sharma, Cisco",
    type: "talk",
  },
  {
    time: "2:35 PM - 3:05 PM",
    title: "Break",
    speaker: "",
    type: "break",
  },
  {
    time: "3:05 PM - 3:25 PM",
    title: "Understanding ISR",
    speaker: "David Kim, FLUX",
    type: "talk",
  },
  {
    time: "3:25 PM - 4:05 PM",
    title: "Customer Session II",
    speaker: "TBA",
    type: "talk",
  },
  {
    time: "4:05 PM - 4:25 PM",
    title: "Rebuilding an E-commerce Site",
    speaker: "Emma Johnson, Retail Co",
    type: "talk",
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
        <h2 className="mb-12 text-4xl md:text-5xl font-normal tracking-tight">
          Schedule
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
