import pkg from "contentful-management";
const { createClient } = pkg;

const SPACE_ID = "1bkq4170d8hb";
const MANAGEMENT_TOKEN = "CFPAT-JGW3m0NFyjoDodaW0R3otydlz5eSkISXRIsoVwYSjbA";

async function createExperimentalTheme() {
  const client = createClient({
    accessToken: MANAGEMENT_TOKEN,
  });

  const space = await client.getSpace(SPACE_ID);
  const environment = await space.getEnvironment("master");

  // Experimental Theme: Futuristic & Tech
  // - Lime Green primary with monochromatic palette
  // - Dark gray background
  // - Glowing accent effects (achieved through color choices)
  const themeData = {
    fields: {
      name: { "en-US": "Experimental" },
      // Dark gray background - softer than pure black
      backgroundColor: { "en-US": "#0D0D0D" },
      // Electric Lime Green - futuristic, tech-forward
      primaryColor: { "en-US": "#ADFF2F" },
      // Brighter neon green for glow effect - monochromatic
      accentColor: { "en-US": "#39FF14" },
      // Slight green tint to foreground for cohesion
      foregroundColor: { "en-US": "#E8FFE8" },
      // Green-tinted dark border for monochromatic feel
      borderColor: { "en-US": "#1A3A1A" },
      isActive: { "en-US": false },
    },
  };

  console.log("Creating 'Experimental' theme in Contentful...");

  const entry = await environment.createEntry("theme", themeData);
  console.log("Entry created with ID:", entry.sys.id);

  await entry.publish();
  console.log("Theme 'Experimental' published successfully!");

  console.log("\nTheme Details:");
  console.log("- Name: Experimental");
  console.log("- Background: #0D0D0D (Dark Gray)");
  console.log("- Primary: #ADFF2F (Electric Lime Green)");
  console.log("- Accent: #39FF14 (Neon Green - Glow)");
  console.log("- Foreground: #E8FFE8 (Green-tinted White)");
  console.log("- Border: #1A3A1A (Dark Green)");
}

createExperimentalTheme().catch(console.error);
