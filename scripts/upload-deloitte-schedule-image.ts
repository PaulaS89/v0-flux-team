import contentful from "contentful-management";
import * as fs from "fs";
import * as path from "path";

const spaceId = process.env.CONTENTFUL_SPACE_ID!;
const accessToken = process.env.CONTENTFUL_MANAGEMENT_TOKEN!;

async function uploadDeloitteScheduleImage() {
  const client = contentful.createClient({ accessToken });
  const space = await client.getSpace(spaceId);
  const environment = await space.getEnvironment("master");

  // Read the image file
  const imagePath = path.join(process.cwd(), "public/images/deloitte-circle-motif.jpg");
  const imageBuffer = fs.readFileSync(imagePath);

  // Upload the image as an asset
  console.log("Uploading image to Contentful...");
  const upload = await environment.createUpload({ file: imageBuffer });

  // Create the asset
  const asset = await environment.createAsset({
    fields: {
      title: { "en-US": "Deloitte Schedule Circle Motif" },
      description: { "en-US": "Circle motif header image for the Deloitte theme schedule section" },
      file: {
        "en-US": {
          contentType: "image/jpeg",
          fileName: "deloitte-circle-motif.jpg",
          uploadFrom: {
            sys: { type: "Link", linkType: "Upload", id: upload.sys.id },
          },
        },
      },
    },
  });

  // Process and publish the asset
  const processedAsset = await asset.processForAllLocales();
  await new Promise((resolve) => setTimeout(resolve, 3000)); // Wait for processing
  const publishedAsset = await (await environment.getAsset(processedAsset.sys.id)).publish();
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
