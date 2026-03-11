"use client";

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

function getTagStyle(type: ScheduleItem["type"]) {
  switch (type) {
    case "keynote":
      return "bg-amber-500/20 text-amber-300 border-amber-500/30";
    case "talk":
      return "bg-cyan-500/20 text-cyan-300 border-cyan-500/30";
    case "break":
      return "bg-emerald-500/20 text-emerald-300 border-emerald-500/30";
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
    default:
      return type;
  }
}

export function EventSchedule({ items }: EventScheduleProps) {
  const schedule = items && items.length > 0 ? items : defaultSchedule;

  return (
    <section id="schedule" className="relative bg-background px-6 py-24 overflow-hidden">
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-950/5 to-transparent pointer-events-none" />
      
      <div className="relative mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-4xl font-light tracking-tight md:text-5xl text-foreground">
            Agenda
          </h2>
          <p className="text-muted-foreground text-lg">
            Explore the schedule for the day
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical timeline line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-border to-transparent md:-translate-x-px" />

          {/* Schedule Items */}
          <div className="space-y-8">
            {schedule.map((item, index) => {
              const isEven = index % 2 === 0;
              
              return (
                <div
                  key={index}
                  className={`relative flex items-start gap-8 ${
                    isEven ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  {/* Timeline dot */}
                  <div className="absolute left-4 md:left-1/2 md:-translate-x-1/2 z-10">
                    <div className="group relative">
                      <div className="w-3 h-3 rounded-full bg-border transition-all duration-300 group-hover:bg-cyan-400 group-hover:shadow-[0_0_12px_rgba(34,211,238,0.5)]" />
                    </div>
                  </div>

                  {/* Spacer for mobile */}
                  <div className="w-8 md:hidden shrink-0" />

                  {/* Card */}
                  <div
                    className={`flex-1 md:w-[calc(50%-2rem)] ${
                      isEven ? "md:pr-12" : "md:pl-12"
                    }`}
                  >
                    <div className="group relative">
                      {/* Glassmorphism card */}
                      <div className="relative rounded-2xl border border-border/50 bg-card/40 backdrop-blur-md p-6 transition-all duration-300 hover:-translate-y-1 hover:border-border hover:shadow-lg hover:shadow-cyan-950/20">
                        {/* Time badge */}
                        <div className="mb-3 flex items-center justify-between gap-3">
                          <span className="font-mono text-sm text-cyan-400">
                            {item.time}
                          </span>
                          <span
                            className={`rounded-full border px-3 py-1 text-[10px] font-medium uppercase tracking-wider ${getTagStyle(
                              item.type
                            )}`}
                          >
                            {getTagLabel(item.type)}
                          </span>
                        </div>

                        {/* Title */}
                        <h3 className="mb-2 text-lg font-medium text-foreground leading-snug">
                          {item.title}
                        </h3>

                        {/* Speaker */}
                        {item.speaker && (
                          <p className="text-sm text-muted-foreground">
                            {item.speaker}
                          </p>
                        )}

                        {/* Subtle glow on hover */}
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-500/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 pointer-events-none" />
                      </div>
                    </div>
                  </div>

                  {/* Empty space for alternating layout on desktop */}
                  <div className="hidden md:block flex-1 md:w-[calc(50%-2rem)]" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
