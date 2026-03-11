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

export function EventSchedule({ items }: EventScheduleProps) {
  const schedule = items && items.length > 0 ? items : defaultSchedule;

  return (
    <section id="programm" className="bg-background px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <h2 className="mb-16 text-3xl font-light tracking-tight md:text-4xl">
          Agenda
        </h2>
        <div className="space-y-0">
          {schedule.map((item, index) => (
            <div
              key={index}
              className="group flex border-t border-border py-6 transition-colors hover:bg-muted/30"
            >
              <div className="w-24 shrink-0">
                <span className="text-sm font-medium text-muted-foreground">
                  {item.time}
                </span>
              </div>
              <div className="flex-1">
                <h3
                  className={`text-lg ${
                    item.type === "break"
                      ? "text-muted-foreground"
                      : "text-foreground"
                  }`}
                >
                  {item.title}
                </h3>
                {item.speaker && (
                  <p className="mt-1 text-sm text-muted-foreground">
                    {item.speaker}
                  </p>
                )}
              </div>
              {item.type === "keynote" && (
                <span className="shrink-0 rounded border border-foreground/20 px-2 py-1 text-xs uppercase tracking-wider text-muted-foreground">
                  Keynote
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
