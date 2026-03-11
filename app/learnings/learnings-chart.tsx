"use client"

import { useState } from "react"

interface Task {
  id: string
  title: string
  description: string
  time: number // 0-100 (percentage on x-axis)
  difficulty: number // 0-100 (percentage on y-axis)
  category: "v0" | "contentful" | "figma" | "github"
}

const tasks: Task[] = [
  {
    id: "1",
    title: "Integration Figma Designsystem",
    description: "Einbindung des Figma Design Systems in die Entwicklungsumgebung",
    time: 15,
    difficulty: 75,
    category: "figma",
  },
  {
    id: "2",
    title: "Contentful CMS Setup",
    description: "Konfiguration von Content Types und API-Integration",
    time: 35,
    difficulty: 60,
    category: "contentful",
  },
  {
    id: "3",
    title: "v0 Component Generation",
    description: "Generierung von UI-Komponenten mit v0 AI",
    time: 55,
    difficulty: 25,
    category: "v0",
  },
  {
    id: "4",
    title: "GitHub Workflow Automation",
    description: "CI/CD Pipeline und Branch-Management einrichten",
    time: 75,
    difficulty: 50,
    category: "github",
  },
  {
    id: "5",
    title: "Dynamic Theming",
    description: "Implementierung eines dynamischen Theme-Systems mit Contentful",
    time: 90,
    difficulty: 85,
    category: "contentful",
  },
]

const categoryColors: Record<Task["category"], string> = {
  v0: "bg-chart-1",
  contentful: "bg-chart-2",
  figma: "bg-chart-3",
  github: "bg-chart-4",
}

const categoryBorderColors: Record<Task["category"], string> = {
  v0: "border-chart-1",
  contentful: "border-chart-2",
  figma: "border-chart-3",
  github: "border-chart-4",
}

export function LearningsChart() {
  const [hoveredTask, setHoveredTask] = useState<string | null>(null)

  return (
    <div className="relative w-full h-[calc(100vh-200px)] min-h-[500px]">
      {/* Y-Axis - Sticky Left */}
      <div className="fixed left-2 md:left-4 top-1/2 -translate-y-1/2 z-20">
        <div className="flex flex-col items-center gap-4">
          <div className="-rotate-90 whitespace-nowrap">
            <span className="text-sm md:text-base font-semibold text-foreground">
              Schwierigkeit
            </span>
          </div>
          <div className="h-[60vh] w-0.5 bg-foreground relative">
            {/* Arrow at top */}
            <svg
              className="absolute -top-2 left-1/2 -translate-x-1/2 w-3 h-3 text-foreground"
              viewBox="0 0 12 12"
              fill="currentColor"
            >
              <path d="M6 0L12 8H0L6 0Z" />
            </svg>
            {/* Y-Axis Labels */}
            {[100, 75, 50, 25, 0].map((value, index) => (
              <div
                key={value}
                className="absolute left-4 text-xs md:text-sm text-muted-foreground"
                style={{ top: `${index * 25}%`, transform: "translateY(-50%)" }}
              >
                {value}%
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* X-Axis - Sticky Bottom */}
      <div className="fixed bottom-2 md:bottom-4 left-1/2 -translate-x-1/2 z-20">
        <div className="flex flex-col items-center gap-2">
          <div className="w-[80vw] h-0.5 bg-foreground relative">
            {/* Arrow at right */}
            <svg
              className="absolute -right-2 top-1/2 -translate-y-1/2 w-3 h-3 text-foreground rotate-90"
              viewBox="0 0 12 12"
              fill="currentColor"
            >
              <path d="M6 0L12 8H0L6 0Z" />
            </svg>
            {/* X-Axis Labels */}
            {[0, 25, 50, 75, 100].map((value) => (
              <div
                key={value}
                className="absolute top-4 text-xs md:text-sm text-muted-foreground"
                style={{ left: `${value}%`, transform: "translateX(-50%)" }}
              >
                {value === 0 ? "Start" : value === 100 ? "Ende" : `${value}%`}
              </div>
            ))}
          </div>
          <span className="text-sm md:text-base font-semibold text-foreground mt-6">
            Zeit
          </span>
        </div>
      </div>

      {/* Chart Area - Scrollable Content */}
      <div className="absolute left-16 md:left-24 right-4 top-0 bottom-16 md:bottom-20">
        <div className="relative w-full h-full">
          {/* Grid Lines */}
          <div className="absolute inset-0">
            {/* Horizontal Grid Lines */}
            {[0, 25, 50, 75, 100].map((value) => (
              <div
                key={`h-${value}`}
                className="absolute left-0 right-0 border-t border-border/30"
                style={{ bottom: `${value}%` }}
              />
            ))}
            {/* Vertical Grid Lines */}
            {[0, 25, 50, 75, 100].map((value) => (
              <div
                key={`v-${value}`}
                className="absolute top-0 bottom-0 border-l border-border/30"
                style={{ left: `${value}%` }}
              />
            ))}
          </div>

          {/* Task Points */}
          {tasks.map((task) => (
            <div
              key={task.id}
              className="absolute transform -translate-x-1/2 translate-y-1/2 z-10"
              style={{
                left: `${task.time}%`,
                bottom: `${task.difficulty}%`,
              }}
              onMouseEnter={() => setHoveredTask(task.id)}
              onMouseLeave={() => setHoveredTask(null)}
            >
              {/* Task Card */}
              <div
                className={`
                  relative cursor-pointer transition-all duration-200
                  ${hoveredTask === task.id ? "scale-110 z-20" : "scale-100"}
                `}
              >
                {/* Title Box */}
                <div
                  className={`
                    absolute left-1/2 -translate-x-1/2 bottom-full mb-3
                    px-4 py-2 md:px-5 md:py-2.5 rounded-lg
                    bg-card border-2 ${categoryBorderColors[task.category]}
                    shadow-xl
                    whitespace-nowrap
                    transition-all duration-200
                    ${hoveredTask === task.id ? "opacity-100" : "opacity-90"}
                  `}
                >
                  <span className="text-sm md:text-base font-semibold text-card-foreground">
                    {task.title}
                  </span>
                </div>

                {/* Expanded Description on Hover */}
                {hoveredTask === task.id && (
                  <div
                    className={`
                      absolute left-1/2 -translate-x-1/2 top-full mt-3
                      px-4 py-3 rounded-lg
                      bg-popover border-2 ${categoryBorderColors[task.category]}
                      shadow-xl
                      w-56 md:w-72
                      z-30
                    `}
                  >
                    <p className="text-sm md:text-base text-popover-foreground leading-relaxed">
                      {task.description}
                    </p>
                    <div className="mt-3 flex items-center justify-between text-xs md:text-sm text-muted-foreground">
                      <span>Zeit: {task.time}%</span>
                      <span>Schwierigkeit: {task.difficulty}%</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
