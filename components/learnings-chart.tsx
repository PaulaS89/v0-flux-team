interface Learning {
  id: number
  task: string
  description: string
  timeHours: number
  complexity: number // 1-10, higher = more complex (whiter)
}

const learnings: Learning[] = [
  {
    id: 1,
    task: "Connect to GitHub",
    description: "Repository-Verbindung und Branch-Management einrichten",
    timeHours: 2,
    complexity: 3,
  },
  {
    id: 2,
    task: "Contentful Integration",
    description: "Content Model erstellen und API-Anbindung konfigurieren",
    timeHours: 8,
    complexity: 8,
  },
  {
    id: 3,
    task: "Figma Design Tokens",
    description: "Design Tokens exportieren und in Code umwandeln",
    timeHours: 5,
    complexity: 6,
  },
  {
    id: 4,
    task: "v0 Component Generation",
    description: "UI-Komponenten mit v0 generieren und anpassen",
    timeHours: 3,
    complexity: 2,
  },
  {
    id: 5,
    task: "Deployment Pipeline",
    description: "Automatisiertes Deployment über Vercel einrichten",
    timeHours: 6,
    complexity: 9,
  },
]

const maxTime = Math.max(...learnings.map((l) => l.timeHours))

function getBarColor(complexity: number): string {
  // complexity 1-10 maps to gray (neutral-700) to white
  if (complexity <= 2) return "bg-neutral-700"
  if (complexity <= 4) return "bg-neutral-500"
  if (complexity <= 6) return "bg-neutral-400"
  if (complexity <= 8) return "bg-neutral-200"
  return "bg-white"
}

function getBarWidth(timeHours: number): string {
  const percentage = (timeHours / maxTime) * 100
  return `${percentage}%`
}

export function LearningsChart() {
  return (
    <div className="space-y-8">
      {learnings.map((learning) => (
        <div key={learning.id} className="group">
          <div className="mb-2 flex items-baseline justify-between">
            <h3 className="text-lg font-semibold text-white">{learning.task}</h3>
            <span className="text-sm text-neutral-500">{learning.timeHours}h</span>
          </div>
          
          <div
            className={`h-12 rounded-sm transition-all duration-300 ${getBarColor(learning.complexity)}`}
            style={{ width: getBarWidth(learning.timeHours) }}
          />
          
          <p className="mt-2 text-sm text-neutral-500 opacity-0 transition-opacity group-hover:opacity-100">
            {learning.description}
          </p>
        </div>
      ))}
    </div>
  )
}
