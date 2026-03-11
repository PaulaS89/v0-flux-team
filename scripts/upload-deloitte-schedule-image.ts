import contentful from "contentful-management";

const spaceId = process.env.CONTENTFUL_SPACE_ID;
const accessToken = process.env.CONTENTFUL_MANAGEMENT_TOKEN;

// Using a public circle motif image URL
const IMAGE_URL = "https://images.unsplash.com/photo-1557682250-33bd709cbe85?w=400&h=400&fit=crop&q=80";

async function uploadDeloitteScheduleImage() {
  if (!spaceId || !accessToken) {
    throw new Error("Missing CONTENTFUL_SPACE_ID or CONTENTFUL_MANAGEMENT_TOKEN");
  }
  
  const client = contentful.createClient({ accessToken });
  const space = await client.getSpace(spaceId);
  const environment = await space.getEnvironment("master");

  // Create the asset from URL
  console.log("Creating asset in Contentful...");
  const asset = await environment.createAsset({
    fields: {
      title: { "en-US": "Deloitte Schedule Circle Motif" },
      description: { "en-US": "Circle motif header image for the Deloitte theme schedule section" },
      file: {
        "en-US": {
          contentType: "image/jpeg",
          fileName: "deloitte-circle-motif.jpg",
          upload: IMAGE_URL,
        },
      },
    },
  });

  // Process and publish the asset
  console.log("Processing asset...");
  const processedAsset = await asset.processForAllLocales();
  await new Promise((resolve) => setTimeout(resolve, 5000)); // Wait for processing
  
  const fetchedAsset = await environment.getAsset(processedAsset.sys.id);
  const publishedAsset = await fetchedAsset.publish();
  console.log("Asset uploaded and published:", publishedAsset.sys.id);

  // Find the Deloitte theme entry
  const entries = await environment.getEntries({
    content_type: "theme",
    "fields.name": "Deloitte",
  });

  if (entries.items.length === 0) {
    console.log("Deloitte theme not found. Please create it first.");
    return;
  }

  const deloitteTheme = entries.items[0];
  console.log("Found Deloitte theme:", deloitteTheme.sys.id);

  // Update the theme with the schedule header image
  deloitteTheme.fields.scheduleHeaderImage = {
    "en-US": {
      sys: { type: "Link", linkType: "Asset", id: publishedAsset.sys.id },
    },
  };

  const updatedTheme = await deloitteTheme.update();
  await updatedTheme.publish();
  console.log("Deloitte theme updated with schedule header image!");
}

uploadDeloitteScheduleImage().catch(console.error);
