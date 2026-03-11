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
    title: "Registrierung & Kaffee",
    speaker: "",
    type: "break",
  },
  {
    time: "09:00",
    title: "Keynote: Die Zukunft der Technologie",
    speaker: "Dr. Anna Weber",
    type: "keynote",
  },
  {
    time: "10:00",
    title: "Skalierbare Architekturen fur moderne Apps",
    speaker: "Marcus Schmidt",
    type: "talk",
  },
  {
    time: "11:00",
    title: "Kaffeepause & Networking",
    speaker: "",
    type: "break",
  },
  {
    time: "11:30",
    title: "Von 0 auf 1 Million Nutzer",
    speaker: "Lisa Hoffmann",
    type: "talk",
  },
  {
    time: "12:30",
    title: "Mittagspause",
    speaker: "",
    type: "break",
  },
  {
    time: "14:00",
    title: "Datengetriebene Entscheidungen treffen",
    speaker: "Thomas Mueller",
    type: "talk",
  },
  {
    time: "15:00",
    title: "CI/CD Best Practices",
    speaker: "Sarah Klein",
    type: "talk",
  },
  {
    time: "16:00",
    title: "Kaffeepause",
    speaker: "",
    type: "break",
  },
  {
    time: "16:30",
    title: "Microservices in der Praxis",
    speaker: "Michael Braun",
    type: "talk",
  },
  {
    time: "17:30",
    title: "Closing & Networking",
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
          Programm
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
