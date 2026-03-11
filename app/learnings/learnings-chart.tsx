"use client"

import { useState, useRef, useCallback } from "react"

interface Task {
  id: string
  title: string
  description: string
  time: number // 0-100 (percentage on x-axis)
  difficulty: number // 0-100 (percentage on y-axis)
  category: "v0" | "contentful" | "figma" | "github"
}

const initialTasks: Task[] = [
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

const categoryBorderColors: Record<Task["category"], string> = {
  v0: "border-chart-1",
  contentful: "border-chart-2",
  figma: "border-chart-3",
  github: "border-chart-4",
}

interface LabelPosition {
  x: number
  y: number
}

export function LearningsChart() {
  const [hoveredTask, setHoveredTask] = useState<string | null>(null)
  const [tasks, setTasks] = useState<Task[]>(initialTasks)
  const [draggingTask, setDraggingTask] = useState<string | null>(null)
  const [draggingLabel, setDraggingLabel] = useState<string | null>(null)
  
  const [complexityLabelPos, setComplexityLabelPos] = useState<LabelPosition>({ x: 0, y: 0 })
  const [timeLabelPos, setTimeLabelPos] = useState<LabelPosition>({ x: 0, y: 0 })
  
  const chartRef = useRef<HTMLDivElement>(null)

  const handleTaskDragStart = useCallback((e: React.MouseEvent | React.TouchEvent, taskId: string) => {
    e.preventDefault()
    setDraggingTask(taskId)
    setHoveredTask(null)
  }, [])

  const handleTaskDrag = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    if (!draggingTask || !chartRef.current) return

    const rect = chartRef.current.getBoundingClientRect()
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY
    
    const x = Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100))
    const y = Math.max(0, Math.min(100, ((rect.bottom - clientY) / rect.height) * 100))

    setTasks(prev => prev.map(task => 
      task.id === draggingTask 
        ? { ...task, time: x, difficulty: y }
        : task
    ))
  }, [draggingTask])

  const handleDragEnd = useCallback(() => {
    setDraggingTask(null)
    setDraggingLabel(null)
  }, [])

  const handleLabelDragStart = useCallback((e: React.MouseEvent | React.TouchEvent, label: string) => {
    e.preventDefault()
    setDraggingLabel(label)
  }, [])

  const handleLabelDrag = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    if (!draggingLabel) return

    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY

    if (draggingLabel === 'complexity') {
      setComplexityLabelPos(prev => ({
        x: prev.x + (clientX - (window.innerWidth / 2)),
        y: clientY
      }))
    } else if (draggingLabel === 'time') {
      setTimeLabelPos(prev => ({
        x: clientX,
        y: prev.y + (clientY - (window.innerHeight / 2))
      }))
    }
  }, [draggingLabel])

  return (
    <div 
      className="relative w-full h-[calc(100vh-120px)] min-h-[500px]"
      onMouseMove={(e) => {
        handleTaskDrag(e)
        handleLabelDrag(e)
      }}
      onMouseUp={handleDragEnd}
      onMouseLeave={handleDragEnd}
      onTouchMove={(e) => {
        handleTaskDrag(e)
        handleLabelDrag(e)
      }}
      onTouchEnd={handleDragEnd}
    >
      {/* Y-Axis - Vertical line from origin going up */}
      <div className="absolute left-8 md:left-12 bottom-12 md:bottom-16 h-[calc(100%-80px)] md:h-[calc(100%-100px)]">
        <div className="relative h-full flex flex-col items-center">
          {/* Y-Axis Line */}
          <div className="w-0.5 h-full bg-foreground relative">
            {/* Arrow at top */}
            <svg
              className="absolute -top-2 left-1/2 -translate-x-1/2 w-3 h-3 text-foreground"
              viewBox="0 0 12 12"
              fill="currentColor"
            >
              <path d="M6 0L12 8H0L6 0Z" />
            </svg>
          </div>
          {/* Y-Axis Label - Draggable */}
          <div 
            className="absolute -top-6 left-1/2 -translate-x-1/2 -rotate-90 whitespace-nowrap origin-center cursor-grab active:cursor-grabbing select-none"
            style={{ 
              transform: `translate(calc(-50% + ${complexityLabelPos.x}px), ${complexityLabelPos.y}px) rotate(-90deg)` 
            }}
            onMouseDown={(e) => handleLabelDragStart(e, 'complexity')}
            onTouchStart={(e) => handleLabelDragStart(e, 'complexity')}
          >
            <span className="text-xs md:text-sm font-semibold text-foreground">
              Complexity
            </span>
          </div>
          {/* Y-Axis Values */}
          {[100, 75, 50, 25].map((value) => (
            <div
              key={value}
              className="absolute -left-2 text-[10px] md:text-xs text-muted-foreground -translate-x-full"
              style={{ bottom: `${value}%`, transform: "translateY(50%) translateX(-8px)" }}
            >
              {value}%
            </div>
          ))}
        </div>
      </div>

      {/* X-Axis - Horizontal line from origin going right */}
      <div className="absolute left-8 md:left-12 bottom-12 md:bottom-16 w-[calc(100%-48px)] md:w-[calc(100%-64px)]">
        <div className="relative w-full flex items-center">
          {/* X-Axis Line */}
          <div className="h-0.5 w-full bg-foreground relative">
            {/* Arrow at right */}
            <svg
              className="absolute -right-2 top-1/2 -translate-y-1/2 w-3 h-3 text-foreground rotate-90"
              viewBox="0 0 12 12"
              fill="currentColor"
            >
              <path d="M6 0L12 8H0L6 0Z" />
            </svg>
          </div>
          {/* X-Axis Label - Draggable */}
          <div 
            className="absolute top-3 right-6 whitespace-nowrap cursor-grab active:cursor-grabbing select-none"
            style={{ 
              transform: `translate(${timeLabelPos.x}px, ${timeLabelPos.y}px)` 
            }}
            onMouseDown={(e) => handleLabelDragStart(e, 'time')}
            onTouchStart={(e) => handleLabelDragStart(e, 'time')}
          >
            <span className="text-xs md:text-sm font-semibold text-foreground">
              Time
            </span>
          </div>
          {/* X-Axis Values */}
          {[25, 50, 75, 100].map((value) => (
            <div
              key={value}
              className="absolute top-3 text-[10px] md:text-xs text-muted-foreground -translate-x-1/2"
              style={{ left: `${value}%` }}
            >
              {value === 100 ? "Ende" : `${value}%`}
            </div>
          ))}
        </div>
      </div>

      {/* Chart Area */}
      <div 
        ref={chartRef}
        className="absolute left-8 md:left-12 bottom-12 md:bottom-16 right-4 top-4"
        style={{ paddingLeft: '0px' }}
      >
        <div className="relative w-full h-full">
          {/* Grid Lines */}
          <div className="absolute inset-0">
            {/* Horizontal Grid Lines */}
            {[25, 50, 75, 100].map((value) => (
              <div
                key={`h-${value}`}
                className="absolute left-0 right-0 border-t border-border/20"
                style={{ bottom: `${value}%` }}
              />
            ))}
            {/* Vertical Grid Lines */}
            {[25, 50, 75, 100].map((value) => (
              <div
                key={`v-${value}`}
                className="absolute top-0 bottom-0 border-l border-border/20"
                style={{ left: `${value}%` }}
              />
            ))}
          </div>

          {/* Task Points */}
          {tasks.map((task) => (
            <div
              key={task.id}
              className={`absolute transform -translate-x-1/2 translate-y-1/2 z-10 ${draggingTask === task.id ? 'cursor-grabbing' : 'cursor-grab'}`}
              style={{
                left: `${task.time}%`,
                bottom: `${task.difficulty}%`,
              }}
              onMouseEnter={() => !draggingTask && setHoveredTask(task.id)}
              onMouseLeave={() => setHoveredTask(null)}
              onMouseDown={(e) => handleTaskDragStart(e, task.id)}
              onTouchStart={(e) => handleTaskDragStart(e, task.id)}
            >
              {/* Task Card */}
              <div
                className={`
                  relative transition-all duration-200
                  ${hoveredTask === task.id ? "scale-110 z-20" : "scale-100"}
                  ${draggingTask === task.id ? "scale-110 z-30 opacity-80" : ""}
                `}
              >
                {/* Title Box */}
                <div
                  className={`
                    absolute left-1/2 -translate-x-1/2 bottom-full mb-1
                    px-4 py-2 md:px-5 md:py-2.5 rounded-lg
                    bg-card border-2 ${categoryBorderColors[task.category]}
                    shadow-xl
                    whitespace-nowrap
                    transition-all duration-200
                    select-none
                    ${hoveredTask === task.id ? "opacity-100" : "opacity-90"}
                  `}
                >
                  <span className="text-sm md:text-base font-semibold text-card-foreground">
                    {task.title}
                  </span>
                </div>

                {/* Expanded Description on Hover */}
                {hoveredTask === task.id && !draggingTask && (
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
                      <span>Zeit: {Math.round(task.time)}%</span>
                      <span>Schwierigkeit: {Math.round(task.difficulty)}%</span>
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
