import { LearningsChart } from "@/components/learnings-chart"

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">
      <div className="mx-auto max-w-5xl px-6 py-16">
        <header className="mb-16">
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
            FLUX Team Learnings
          </h1>
          <p className="mt-4 text-lg text-neutral-400">
            Unsere Erkenntnisse aus dem Zusammenspiel von v0, Contentful, Figma und GitHub
          </p>
        </header>

        <div className="mb-12">
          <div className="flex items-center gap-8 text-sm text-neutral-500">
            <div className="flex items-center gap-2">
              <span className="inline-block h-3 w-12 bg-neutral-700" />
              <span>Balkenlänge = Zeit</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex gap-1">
                <span className="inline-block h-3 w-3 bg-neutral-700" />
                <span className="inline-block h-3 w-3 bg-neutral-500" />
                <span className="inline-block h-3 w-3 bg-neutral-300" />
                <span className="inline-block h-3 w-3 bg-white" />
              </div>
              <span>Farbintensität = Komplexität</span>
            </div>
          </div>
        </div>

        <LearningsChart />
      </div>
    </main>
  )
}
