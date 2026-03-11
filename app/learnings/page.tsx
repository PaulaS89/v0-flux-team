import { LearningsChart } from "./learnings-chart"

export const metadata = {
  title: "Learnings | Project Development Journey",
  description: "Visualisierung der Learnings bei der Entwicklung mit v0, Contentful, Figma und GitHub",
}

export default function LearningsPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <header className="mb-12 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
            Project Learnings
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto text-pretty">
            Visualisierung der Learnings bei der Erstellung dieser Seite mit v0, Contentful, Figma und GitHub
          </p>
        </header>

        <LearningsChart />

        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-chart-1" />
            <span className="text-sm text-muted-foreground">v0</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-chart-2" />
            <span className="text-sm text-muted-foreground">Contentful</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-chart-3" />
            <span className="text-sm text-muted-foreground">Figma</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-chart-4" />
            <span className="text-sm text-muted-foreground">GitHub</span>
          </div>
        </div>
      </div>
    </main>
  )
}
