import { getThemes } from "@/lib/contentful";
import { ThemeCreator } from "./theme-creator";
import { ThemeList } from "./theme-list";

export default async function ThemesPage() {
  const themes = await getThemes();

  return (
    <main className="min-h-screen bg-background text-foreground p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <header>
          <h1 className="text-3xl font-bold mb-2">Theme Manager</h1>
          <p className="text-muted-foreground">
            Create and manage themes stored in Contentful
          </p>
        </header>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Create Blue Theme</h2>
          <ThemeCreator />
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Existing Themes ({themes.length})</h2>
          <ThemeList initialThemes={themes} />
        </section>
      </div>
    </main>
  );
}
