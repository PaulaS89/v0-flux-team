import contentful from "contentful-management";

const SPACE_ID = "1bkq4170d8hb";
const MANAGEMENT_TOKEN = "CFPAT-JGW3m0NFyjoDodaW0R3otydlz5eSkISXRIsoVwYSjbA";

async function createDeloitteTheme() {
  const client = contentful.createClient({
    accessToken: MANAGEMENT_TOKEN,
  });

  const space = await client.getSpace(SPACE_ID);
  const environment = await space.getEnvironment("master");

  // Deloitte brand colors combined with the provided JSON values
  // Using Deloitte Green (#86BC25) as primary color
  // Background and other colors from the JSON (dark mode values)
  const themeData = {
    fields: {
      name: { "en-US": "Deloitte" },
      // From JSON: background-dark #0A0A0A
      backgroundColor: { "en-US": "#0A0A0A" },
      // Deloitte Green - official brand color
      primaryColor: { "en-US": "#86BC25" },
      // From JSON: accent-dark #404040
      accentColor: { "en-US": "#404040" },
      // From JSON: foreground-dark #FAFAFA
      foregroundColor: { "en-US": "#FAFAFA" },
      // From JSON: border-dark is white with 10% alpha, using #262626 (muted-dark) for solid border
      borderColor: { "en-US": "#262626" },
      isActive: { "en-US": false },
    },
  };

  console.log("Creating Deloitte theme entry...");

  const entry = await environment.createEntry("theme", themeData);
  console.log("Entry created:", entry.sys.id);

  await entry.publish();
  console.log("Deloitte theme published successfully!");

  return entry;
}

createDeloitteTheme().catch(console.error);
