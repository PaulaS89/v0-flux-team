import contentful from "contentful-management";

const SPACE_ID = "1bkq4170d8hb";
const ACCESS_TOKEN = "CFPAT-JGW3m0NFyjoDodaW0R3otydlz5eSkISXRIsoVwYSjbA";

async function createBlueTheme() {
  console.log("Creating Blue Theme entry...\n");

  const client = contentful.createClient({
    accessToken: ACCESS_TOKEN,
  });

  const space = await client.getSpace(SPACE_ID);
  const environment = await space.getEnvironment("master");

  // Create the Blue Theme entry
  const entry = await environment.createEntry("theme", {
    fields: {
      name: { "en-US": "Ocean Blue" },
      backgroundColor: { "en-US": "oklch(0.15 0.05 230)" },
      primaryColor: { "en-US": "oklch(0.65 0.2 230)" },
      accentColor: { "en-US": "oklch(0.7 0.15 200)" },
      foregroundColor: { "en-US": "oklch(0.95 0 0)" },
      borderColor: { "en-US": "oklch(0.3 0.03 230)" },
      isActive: { "en-US": true },
    },
  });

  console.log("Entry created with ID:", entry.sys.id);

  // Publish the entry
  const publishedEntry = await entry.publish();
  console.log("Blue Theme published successfully!");
  console.log("\nTheme Details:");
  console.log("- Name: Ocean Blue");
  console.log("- Background: oklch(0.15 0.05 230) (Dark Blue)");
  console.log("- Primary: oklch(0.65 0.2 230) (Bright Blue)");
  console.log("- Accent: oklch(0.7 0.15 200) (Cyan)");
  console.log("- Foreground: oklch(0.95 0 0) (White)");
  console.log("- Border: oklch(0.3 0.03 230) (Blue-Gray)");
  console.log("\nYou can now see the theme in Contentful under Content > Theme!");
}

createBlueTheme().catch(console.error);
