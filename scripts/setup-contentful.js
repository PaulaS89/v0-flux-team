import contentful from "contentful-management";

const SPACE_ID = process.env.CONTENTFUL_SPACE_ID || "1bkq4170d8hb";
const MANAGEMENT_TOKEN = process.env.CONTENTFUL_MANAGEMENT_TOKEN;

if (!MANAGEMENT_TOKEN) {
  console.error("CONTENTFUL_MANAGEMENT_TOKEN is required");
  process.exit(1);
}

const client = contentful.createClient({
  accessToken: MANAGEMENT_TOKEN,
});

async function setupContentTypes() {
  console.log("[v0] Connecting to Contentful space:", SPACE_ID);
  
  const space = await client.getSpace(SPACE_ID);
  const environment = await space.getEnvironment("master");

  // Content Type definitions
  const contentTypes = [
    {
      id: "hero",
      name: "Hero Section",
      fields: [
        { id: "title", name: "Title", type: "Symbol", required: true },
        { id: "location", name: "Location", type: "Symbol", required: true },
        { id: "locationSubtext", name: "Location Subtext", type: "Symbol" },
        { id: "eventDate", name: "Event Date", type: "Symbol", required: true },
        { id: "venue", name: "Venue", type: "Symbol" },
        { id: "onlinePrice", name: "Online Price", type: "Symbol" },
        { id: "earlyBirdLabel", name: "Early Bird Label", type: "Symbol" },
        { id: "earlyBirdOriginalPrice", name: "Early Bird Original Price", type: "Symbol" },
        { id: "earlyBirdPrice", name: "Early Bird Price", type: "Symbol" },
        { id: "ctaButtonText", name: "CTA Button Text", type: "Symbol" },
        { id: "ctaButtonLink", name: "CTA Button Link", type: "Symbol" },
      ],
    },
    {
      id: "speaker",
      name: "Speaker",
      fields: [
        { id: "name", name: "Name", type: "Symbol", required: true },
        { id: "role", name: "Role", type: "Symbol", required: true },
        { id: "topic", name: "Topic", type: "Symbol" },
        { id: "photo", name: "Photo", type: "Link", linkType: "Asset" },
        { id: "order", name: "Order", type: "Integer" },
      ],
    },
    {
      id: "scheduleItem",
      name: "Schedule Item",
      fields: [
        { id: "time", name: "Time", type: "Symbol", required: true },
        { id: "title", name: "Title", type: "Symbol", required: true },
        { id: "speaker", name: "Speaker", type: "Symbol" },
        { id: "type", name: "Type", type: "Symbol", validations: [{ in: ["keynote", "talk", "break"] }] },
        { id: "order", name: "Order", type: "Integer" },
      ],
    },
    {
      id: "faqItem",
      name: "FAQ Item",
      fields: [
        { id: "question", name: "Question", type: "Symbol", required: true },
        { id: "answer", name: "Answer", type: "Text", required: true },
        { id: "order", name: "Order", type: "Integer" },
      ],
    },
    {
      id: "siteSettings",
      name: "Site Settings",
      fields: [
        { id: "eventName", name: "Event Name", type: "Symbol", required: true },
        { id: "eventYear", name: "Event Year", type: "Symbol" },
        { id: "tagline", name: "Tagline", type: "Symbol" },
      ],
    },
    {
      id: "designSystem",
      name: "Design System",
      fields: [
        { id: "name", name: "Theme Name", type: "Symbol", required: true },
        { id: "primaryColor", name: "Primary Color", type: "Symbol", required: true },
        { id: "backgroundColor", name: "Background Color", type: "Symbol", required: true },
        { id: "foregroundColor", name: "Foreground Color", type: "Symbol", required: true },
        { id: "accentColor", name: "Accent Color", type: "Symbol" },
        { id: "mutedColor", name: "Muted Color", type: "Symbol" },
        { id: "mutedForegroundColor", name: "Muted Foreground Color", type: "Symbol" },
        { id: "borderColor", name: "Border Color", type: "Symbol" },
        { id: "cardColor", name: "Card Color", type: "Symbol" },
        { id: "destructiveColor", name: "Destructive Color", type: "Symbol" },
        { id: "headingFont", name: "Heading Font", type: "Symbol" },
        { id: "bodyFont", name: "Body Font", type: "Symbol" },
        { id: "borderRadius", name: "Border Radius", type: "Symbol" },
        { id: "isDarkMode", name: "Is Dark Mode", type: "Boolean" },
      ],
    },
  ];

  for (const ct of contentTypes) {
    console.log(`[v0] Creating content type: ${ct.name}`);
    
    try {
      // Check if content type already exists
      let contentType;
      try {
        contentType = await environment.getContentType(ct.id);
        console.log(`[v0] Content type "${ct.name}" already exists, updating...`);
        
        // Update fields
        contentType.name = ct.name;
        contentType.fields = ct.fields.map((field) => ({
          id: field.id,
          name: field.name,
          type: field.type,
          required: field.required || false,
          localized: false,
          ...(field.type === "Link" && { linkType: field.linkType }),
          ...(field.validations && { validations: field.validations }),
        }));
        
        contentType = await contentType.update();
      } catch (e) {
        // Content type doesn't exist, create it
        contentType = await environment.createContentTypeWithId(ct.id, {
          name: ct.name,
          fields: ct.fields.map((field) => ({
            id: field.id,
            name: field.name,
            type: field.type,
            required: field.required || false,
            localized: false,
            ...(field.type === "Link" && { linkType: field.linkType }),
            ...(field.validations && { validations: field.validations }),
          })),
        });
      }

      // Publish the content type
      await contentType.publish();
      console.log(`[v0] Published content type: ${ct.name}`);
    } catch (error) {
      console.error(`[v0] Error with content type "${ct.name}":`, error.message);
    }
  }

  console.log("[v0] Content types setup complete!");
  console.log("\n[v0] Next steps:");
  console.log("1. Go to Contentful and add content entries for each content type");
  console.log("2. Make sure to publish your entries");
  console.log("3. Your Next.js app will automatically fetch the content");
}

setupContentTypes().catch(console.error);
