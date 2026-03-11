// Script to create Theme content type in Contentful
// Run with: npx tsx scripts/create-theme-content-type.ts

const SPACE_ID = "1bkq4170d8hb";
const MANAGEMENT_TOKEN = "CFPAT-JGW3m0NFyjoDodaW0R3otydlz5eSkISXRIsoVwYSjbA";

async function createThemeContentType() {
  const environmentId = "master";
  
  // First, get the environment to create content type
  const contentTypeData = {
    name: "Theme",
    description: "Design system theme with colors",
    displayField: "name",
    fields: [
      {
        id: "name",
        name: "Name",
        type: "Symbol",
        required: true,
        localized: false,
      },
      {
        id: "backgroundColor",
        name: "Background Color",
        type: "Symbol",
        required: true,
        localized: false,
      },
      {
        id: "primaryColor",
        name: "Primary Color",
        type: "Symbol",
        required: true,
        localized: false,
      },
      {
        id: "accentColor",
        name: "Accent Color",
        type: "Symbol",
        required: false,
        localized: false,
      },
      {
        id: "foregroundColor",
        name: "Foreground Color",
        type: "Symbol",
        required: false,
        localized: false,
      },
      {
        id: "borderColor",
        name: "Border Color",
        type: "Symbol",
        required: false,
        localized: false,
      },
      {
        id: "isActive",
        name: "Is Active",
        type: "Boolean",
        required: false,
        localized: false,
      },
    ],
  };

  try {
    // Create the content type
    console.log("Creating Theme content type...");
    
    const createResponse = await fetch(
      `https://api.contentful.com/spaces/${SPACE_ID}/environments/${environmentId}/content_types/theme`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${MANAGEMENT_TOKEN}`,
          "Content-Type": "application/vnd.contentful.management.v1+json",
        },
        body: JSON.stringify(contentTypeData),
      }
    );

    if (!createResponse.ok) {
      const error = await createResponse.json();
      console.error("Failed to create content type:", JSON.stringify(error, null, 2));
      return;
    }

    const contentType = await createResponse.json();
    console.log("Content type created successfully!");
    console.log("Version:", contentType.sys.version);

    // Publish the content type
    console.log("Publishing content type...");
    
    const publishResponse = await fetch(
      `https://api.contentful.com/spaces/${SPACE_ID}/environments/${environmentId}/content_types/theme/published`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${MANAGEMENT_TOKEN}`,
          "X-Contentful-Version": String(contentType.sys.version),
        },
      }
    );

    if (!publishResponse.ok) {
      const error = await publishResponse.json();
      console.error("Failed to publish content type:", JSON.stringify(error, null, 2));
      return;
    }

    console.log("Theme content type published successfully!");
    console.log("\nNow you can create theme entries in Contentful!");

  } catch (error) {
    console.error("Error:", error);
  }
}

createThemeContentType();
