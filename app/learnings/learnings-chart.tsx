"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"

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
    <Card className="bg-card border-border">
      <CardContent className="p-6 md:p-8">
        {/* Chart Container */}
        <div className="relative w-full aspect-[16/10] md:aspect-[2/1]">
          {/* Y-Axis Label */}
          <div className="absolute -left-2 md:left-0 top-1/2 -translate-y-1/2 -rotate-90 origin-center">
            <span className="text-xs md:text-sm font-medium text-muted-foreground whitespace-nowrap">
              Schwierigkeit
            </span>
          </div>

          {/* X-Axis Label */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-8">
            <span className="text-xs md:text-sm font-medium text-muted-foreground">
              Zeit
            </span>
          </div>

          {/* Chart Area */}
          <div className="absolute inset-8 md:inset-12">
            {/* Grid Background */}
            <div className="absolute inset-0 border-l-2 border-b-2 border-border">
              {/* Horizontal Grid Lines */}
              {[0, 25, 50, 75, 100].map((value) => (
                <div
                  key={`h-${value}`}
                  className="absolute left-0 right-0 border-t border-border/40"
                  style={{ bottom: `${value}%` }}
                >
                  <span className="absolute -left-8 md:-left-10 -translate-y-1/2 text-[10px] md:text-xs text-muted-foreground">
                    {value}%
                  </span>
                </div>
              ))}

              {/* Vertical Grid Lines */}
              {[0, 25, 50, 75, 100].map((value) => (
                <div
                  key={`v-${value}`}
                  className="absolute top-0 bottom-0 border-l border-border/40"
                  style={{ left: `${value}%` }}
                >
                  <span className="absolute -bottom-6 -translate-x-1/2 text-[10px] md:text-xs text-muted-foreground">
                    {value === 0 ? "Start" : value === 100 ? "Ende" : `${value}%`}
                  </span>
                </div>
              ))}

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
                    {/* Dot */}
                    <div
                      className={`
                        w-2.5 h-2.5 md:w-3 md:h-3 rounded-full ${categoryColors[task.category]}
                        shadow-lg shadow-current/30
                        ring-1 ring-background
                      `}
                    />

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

          {/* Axis Arrows */}
          <div className="absolute left-8 md:left-12 top-8 md:top-12">
            <svg
              className="w-3 h-3 text-border -translate-x-1/2 -translate-y-full"
              viewBox="0 0 12 12"
              fill="currentColor"
            >
              <path d="M6 0L12 8H0L6 0Z" />
            </svg>
          </div>
          <div className="absolute right-0 bottom-8 md:bottom-12">
            <svg
              className="w-3 h-3 text-border translate-x-full translate-y-1/2 rotate-90"
              viewBox="0 0 12 12"
              fill="currentColor"
            >
              <path d="M6 0L12 8H0L6 0Z" />
            </svg>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
