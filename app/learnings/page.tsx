import { LearningsChart } from "./learnings-chart"

export const metadata = {
  title: "Learnings | Project Development Journey",
  description: "Visualisierung der Learnings bei der Entwicklung mit v0, Contentful, Figma und GitHub",
}

export default function LearningsPage() {
  return (
    <main className="min-h-screen bg-background px-4 py-4 md:px-6 md:py-6">
      <div className="w-full">
        <header className="mb-12 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground text-balance">
            Project Learnings
          </h1>
        </header>

        <LearningsChart />
      </div>
    </main>
  )
}
