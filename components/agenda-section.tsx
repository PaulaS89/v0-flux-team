"use client"

import { useState } from "react"

interface AgendaItem {
  time: string
  title: string
  speaker?: string
  description: string
  tag: "Talk" | "Workshop" | "Break" | "Networking"
}

const agendaItems: AgendaItem[] = [
  {
    time: "09:00",
    title: "Opening & Welcome",
    description: "Welcome address and opening remarks setting the stage for an inspiring day of innovation.",
    tag: "Talk",
  },
  {
    time: "10:00",
    title: "The Future of AI",
    speaker: "Sarah Johnson",
    description: "Exploring how artificial intelligence is reshaping industries and creating new possibilities for human-machine collaboration.",
    tag: "Talk",
  },
  {
    time: "11:30",
    title: "Coffee Break",
    description: "Network with fellow attendees and enjoy refreshments in our networking lounge.",
    tag: "Break",
  },
  {
    time: "12:00",
    title: "Building Modern Web Apps",
    speaker: "Alex Chen",
    description: "Deep dive into cutting-edge frameworks and architectures powering the next generation of web applications.",
    tag: "Talk",
  },
  {
    time: "14:00",
    title: "Workshop: AI for Developers",
    speaker: "Maya Rodriguez",
    description: "Hands-on session learning to integrate AI capabilities into your applications using modern APIs and tools.",
    tag: "Workshop",
  },
  {
    time: "16:00",
    title: "Networking Session",
    description: "Connect with speakers, sponsors, and fellow attendees. Build lasting professional relationships.",
    tag: "Networking",
  },
]

const tagStyles: Record<AgendaItem["tag"], string> = {
  Talk: "bg-foreground/10 text-foreground border-foreground/20",
  Workshop: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  Break: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  Networking: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
}

export function AgendaSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/30 to-background" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-foreground/[0.02] via-transparent to-transparent" />
      
      <div className="relative mx-auto max-w-4xl px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight mb-4 text-balance">
            Agenda
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto text-pretty">
            Explore the schedule for the day
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Central timeline line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-border to-transparent md:-translate-x-px" />

          {/* Agenda items */}
          <div className="space-y-8">
            {agendaItems.map((item, index) => {
              const isLeft = index % 2 === 0
              const isHovered = hoveredIndex === index

              return (
                <div
                  key={index}
                  className={`relative flex items-start gap-8 md:gap-0 ${
                    isLeft ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  {/* Timeline dot */}
                  <div className="absolute left-8 md:left-1/2 top-8 -translate-x-1/2 z-10">
                    <div
                      className={`
                        relative h-4 w-4 rounded-full border-2 border-border bg-background
                        transition-all duration-300 ease-out
                        ${isHovered ? "scale-150 border-foreground bg-foreground" : ""}
                      `}
                    >
                      {/* Glow effect on hover */}
                      {isHovered && (
                        <div className="absolute inset-0 rounded-full bg-foreground/20 blur-md animate-pulse" />
                      )}
                    </div>
                  </div>

                  {/* Time (mobile: inline, desktop: separate column) */}
                  <div
                    className={`hidden md:flex md:w-1/2 ${
                      isLeft ? "justify-end pr-12" : "justify-start pl-12"
                    }`}
                  >
                    <span
                      className={`
                        font-mono text-sm text-muted-foreground mt-8
                        transition-colors duration-300
                        ${isHovered ? "text-foreground" : ""}
                      `}
                    >
                      {item.time}
                    </span>
                  </div>

                  {/* Card */}
                  <div
                    className={`
                      ml-16 md:ml-0 md:w-1/2 
                      ${isLeft ? "md:pl-12" : "md:pr-12"}
                    `}
                  >
                    <div
                      className={`
                        group relative p-6 rounded-2xl
                        bg-card/50 backdrop-blur-xl
                        border border-border/50
                        transition-all duration-300 ease-out
                        ${isHovered 
                          ? "bg-card/80 border-foreground/20 -translate-y-1 shadow-lg shadow-foreground/[0.03]" 
                          : "hover:bg-card/60"
                        }
                      `}
                    >
                      {/* Subtle glow on hover */}
                      {isHovered && (
                        <div className="absolute -inset-px rounded-2xl bg-gradient-to-b from-foreground/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      )}

                      <div className="relative">
                        {/* Mobile time */}
                        <span className="md:hidden font-mono text-xs text-muted-foreground mb-2 block">
                          {item.time}
                        </span>

                        {/* Tag */}
                        <span
                          className={`
                            inline-block text-xs font-medium px-2.5 py-1 rounded-full border mb-3
                            ${tagStyles[item.tag]}
                          `}
                        >
                          {item.tag}
                        </span>

                        {/* Title */}
                        <h3 className="text-lg font-semibold mb-1 text-foreground">
                          {item.title}
                        </h3>

                        {/* Speaker */}
                        {item.speaker && (
                          <p className="text-sm text-muted-foreground mb-2">
                            {item.speaker}
                          </p>
                        )}

                        {/* Description */}
                        <p className="text-sm text-muted-foreground/80 leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
