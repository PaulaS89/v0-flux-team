import * as contentful from "contentful-management";

const SPACE_ID = "1bkq4170d8hb";
const MANAGEMENT_TOKEN = "CFPAT-JGW3m0NFyjoDodaW0R3otydlz5eSkISXRIsoVwYSjbA";

async function activateDeloitteTheme() {
  const client = contentful.createClient({
    accessToken: MANAGEMENT_TOKEN,
  });

  const space = await client.getSpace(SPACE_ID);
  const environment = await space.getEnvironment("master");

  // Get all theme entries
  const entries = await environment.getEntries({
    content_type: "theme",
  });

  console.log(`Found ${entries.items.length} themes`);

  // Deactivate all themes and activate Deloitte
  for (const entry of entries.items) {
    const name = entry.fields.name?.["en-US"];
    const isDeloitte = name === "Deloitte";
    
    console.log(`Processing: ${name}, setting isActive to ${isDeloitte}`);
    
    entry.fields.isActive = { "en-US": isDeloitte };
    const updatedEntry = await entry.update();
    await updatedEntry.publish();
    
    console.log(`${name}: isActive set to ${isDeloitte}`);
  }

  console.log("Deloitte theme is now active!");
}

activateDeloitteTheme().catch(console.error);
