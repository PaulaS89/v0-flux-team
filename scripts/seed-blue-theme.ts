// Script to create the Blue Theme in Contentful
// Run with: npx tsx scripts/seed-blue-theme.ts

import { createClient } from "contentful-management";

const BLUE_THEME = {
  name: "Blue Ocean",
  backgroundColor: "oklch(0.15 0.05 230)",      // Deep blue background
  primaryColor: "oklch(0.65 0.2 230)",          // Vibrant blue primary
  accentColor: "oklch(0.7 0.15 200)",           // Cyan accent
  foregroundColor: "oklch(0.95 0 0)",           // Light text
  borderColor: "oklch(0.3 0.05 230)",           // Blue-tinted border
  isActive: true,
};

async function seedBlueTheme() {
  console.log("Creating Blue Theme in Contentful...");

  if (!process.env.CONTENTFUL_MANAGEMENT_TOKEN || !process.env.CONTENTFUL_SPACE_ID) {
    console.error("Missing CONTENTFUL_MANAGEMENT_TOKEN or CONTENTFUL_SPACE_ID environment variables");
    process.exit(1);
  }

  try {
    const client = createClient({
      accessToken: process.env.CONTENTFUL_MANAGEMENT_TOKEN,
    });

    const space = await client.getSpace(process.env.CONTENTFUL_SPACE_ID);
    const environment = await space.getEnvironment("master");

    // Check if theme content type exists
    try {
      await environment.getContentType("theme");
      console.log("Theme content type found!");
    } catch {
      console.error("Theme content type not found. Please create it in Contentful first.");
      console.log("\nRequired fields:");
      console.log("- name (Short text, required)");
      console.log("- backgroundColor (Short text, required)");
      console.log("- primaryColor (Short text, required)");
      console.log("- accentColor (Short text)");
      console.log("- foregroundColor (Short text)");
      console.log("- borderColor (Short text)");
      console.log("- isActive (Boolean)");
      process.exit(1);
    }

    // Create the blue theme entry
    console.log("Creating Blue Ocean theme entry...");
    
    const entry = await environment.createEntry("theme", {
      fields: {
        name: { "en-US": BLUE_THEME.name },
        backgroundColor: { "en-US": BLUE_THEME.backgroundColor },
        primaryColor: { "en-US": BLUE_THEME.primaryColor },
        accentColor: { "en-US": BLUE_THEME.accentColor },
        foregroundColor: { "en-US": BLUE_THEME.foregroundColor },
        borderColor: { "en-US": BLUE_THEME.borderColor },
        isActive: { "en-US": BLUE_THEME.isActive },
      },
    });

    console.log(`Entry created with ID: ${entry.sys.id}`);

    // Publish the entry
    console.log("Publishing entry...");
    await entry.publish();

    console.log("\n✅ Blue Ocean theme created and published successfully!");
    console.log(`\nTheme ID: ${entry.sys.id}`);
    console.log("\nColors:");
    console.log(`  Background: ${BLUE_THEME.backgroundColor}`);
    console.log(`  Primary: ${BLUE_THEME.primaryColor}`);
    console.log(`  Accent: ${BLUE_THEME.accentColor}`);
    console.log(`  Foreground: ${BLUE_THEME.foregroundColor}`);
    console.log(`  Border: ${BLUE_THEME.borderColor}`);

  } catch (error) {
    console.error("Error creating theme:", error);
    process.exit(1);
  }
}

seedBlueTheme();
