import contentful from "contentful-management";

const SPACE_ID = "1bkq4170d8hb";
const MANAGEMENT_TOKEN = "CFPAT-JGW3m0NFyjoDodaW0R3otydlz5eSkISXRIsoVwYSjbA";

async function addScheduleHeaderImageField() {
  const client = contentful.createClient({
    accessToken: MANAGEMENT_TOKEN,
  });

  const space = await client.getSpace(SPACE_ID);
  const environment = await space.getEnvironment("master");

  // Get the theme content type
  const contentType = await environment.getContentType("theme");

  // Check if field already exists
  const existingField = contentType.fields.find(
    (f) => f.id === "scheduleHeaderImage"
  );
  if (existingField) {
    console.log("scheduleHeaderImage field already exists");
    return;
  }

  // Add the new field
  contentType.fields.push({
    id: "scheduleHeaderImage",
    name: "Schedule Header Image",
    type: "Link",
    linkType: "Asset",
    required: false,
    localized: false,
    validations: [
      {
        linkMimetypeGroup: ["image"],
      },
    ],
  });

  // Save and publish the content type
  const updatedContentType = await contentType.update();
  await updatedContentType.publish();

  console.log("scheduleHeaderImage field added to theme content type!");
}

addScheduleHeaderImageField().catch(console.error);
