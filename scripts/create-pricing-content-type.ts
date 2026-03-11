import pkg from "contentful-management";
const { createClient } = pkg;

const SPACE_ID = "1bkq4170d8hb";
const MANAGEMENT_TOKEN = "CFPAT-JGW3m0NFyjoDodaW0R3otydlz5eSkISXRIsoVwYSjbA";

async function createPricingContentType() {
  const client = createClient({ accessToken: MANAGEMENT_TOKEN });
  const space = await client.getSpace(SPACE_ID);
  const environment = await space.getEnvironment("master");

  console.log("Creating Pricing content type...");

  const contentType = await environment.createContentTypeWithId("pricing", {
    name: "Pricing",
    description: "Event pricing tiers and packages",
    displayField: "name",
    fields: [
      {
        id: "name",
        name: "Name",
        type: "Symbol",
        required: true,
      },
      {
        id: "price",
        name: "Price",
        type: "Symbol",
        required: true,
      },
      {
        id: "description",
        name: "Description",
        type: "Text",
        required: false,
      },
      {
        id: "features",
        name: "Features",
        type: "Array",
        items: { type: "Symbol" },
        required: false,
      },
      {
        id: "isHighlighted",
        name: "Is Highlighted",
        type: "Boolean",
        required: false,
      },
      {
        id: "ctaText",
        name: "CTA Button Text",
        type: "Symbol",
        required: false,
      },
      {
        id: "order",
        name: "Display Order",
        type: "Integer",
        required: false,
      },
    ],
  });

  await contentType.publish();
  console.log("Pricing content type created and published!");

  // Create pricing entries
  const pricingTiers = [
    {
      name: "Standard Admission",
      price: "€249",
      description: "Full access for professionals",
      features: ["All sessions & keynotes", "Networking lunch & coffee", "Materials & recordings", "Certificate of attendance"],
      isHighlighted: true,
      ctaText: "Register Now",
      order: 1,
    },
    {
      name: "Deloitte Clients",
      price: "€149",
      description: "Exclusive rate for existing clients",
      features: ["All sessions & keynotes", "Networking lunch & coffee", "Materials & recordings", "Priority seating"],
      isHighlighted: false,
      ctaText: "Register as Client",
      order: 2,
    },
    {
      name: "Startups & Scaleups",
      price: "€99",
      description: "For companies under 50 employees",
      features: ["All sessions & keynotes", "Networking lunch & coffee", "Materials & recordings"],
      isHighlighted: false,
      ctaText: "Apply Now",
      order: 3,
    },
    {
      name: "Deloitte Alumni",
      price: "€179",
      description: "For former Deloitte employees",
      features: ["All sessions & keynotes", "Networking lunch & coffee", "Materials & recordings", "Alumni networking session"],
      isHighlighted: false,
      ctaText: "Register as Alumni",
      order: 4,
    },
  ];

  for (const tier of pricingTiers) {
    const entry = await environment.createEntry("pricing", {
      fields: {
        name: { "en-US": tier.name },
        price: { "en-US": tier.price },
        description: { "en-US": tier.description },
        features: { "en-US": tier.features },
        isHighlighted: { "en-US": tier.isHighlighted },
        ctaText: { "en-US": tier.ctaText },
        order: { "en-US": tier.order },
      },
    });
    await entry.publish();
    console.log(`Created pricing tier: ${tier.name}`);
  }

  console.log("All pricing tiers created!");
}

createPricingContentType().catch(console.error);
