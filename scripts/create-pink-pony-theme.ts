import contentful from "contentful-management";

const SPACE_ID = "1bkq4170d8hb";
const MANAGEMENT_TOKEN = "CFPAT-JGW3m0NFyjoDodaW0R3otydlz5eSkISXRIsoVwYSjbA";

async function createPinkPonyTheme() {
  const client = contentful.createClient({
    accessToken: MANAGEMENT_TOKEN,
  });

  const space = await client.getSpace(SPACE_ID);
  const environment = await space.getEnvironment("master");

  console.log("Creating Pink Pony theme entry...");

  const entry = await environment.createEntry("theme", {
    fields: {
      name: { "en-US": "Pink Pony" },
      backgroundColor: { "en-US": "oklch(0.12 0.04 330)" },      // Deep magenta-black
      primaryColor: { "en-US": "oklch(0.75 0.25 350)" },         // Vibrant pink
      accentColor: { "en-US": "oklch(0.8 0.18 320)" },           // Soft magenta
      foregroundColor: { "en-US": "oklch(0.97 0.02 350)" },      // Slightly pink white
      borderColor: { "en-US": "oklch(0.35 0.08 340)" },          // Muted pink-gray
      isActive: { "en-US": false },
    },
  });

  console.log("Pink Pony theme created with ID:", entry.sys.id);

  // Publish the entry
  const publishedEntry = await entry.publish();
  console.log("Pink Pony theme published successfully!");

  return publishedEntry;
}

createPinkPonyTheme().catch(console.error);
