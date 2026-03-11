const contentful = require("contentful-management");

const SPACE_ID = process.env.CONTENTFUL_SPACE_ID || "1bkq4170d8hb";
const MANAGEMENT_TOKEN = process.env.CONTENTFUL_MANAGEMENT_TOKEN;

async function populateContentful() {
  if (!MANAGEMENT_TOKEN) {
    console.error("CONTENTFUL_MANAGEMENT_TOKEN is required");
    process.exit(1);
  }

  const client = contentful.createClient({
    accessToken: MANAGEMENT_TOKEN,
  });

  const space = await client.getSpace(SPACE_ID);
  const environment = await space.getEnvironment("master");

  console.log("Connected to Contentful space:", SPACE_ID);

  // Create Hero entry
  console.log("\nCreating Hero entry...");
  try {
    const hero = await environment.createEntry("hero", {
      fields: {
        title: { "en-US": "FLUX" },
        location: { "en-US": "Berlin" },
        locationSubtext: { "en-US": "and Online" },
        eventDate: { "en-US": "May 15, 2026" },
        venue: { "en-US": "Kulturbrauerei" },
        onlinePrice: { "en-US": "Free" },
        earlyBirdLabel: { "en-US": "Early Bird" },
        earlyBirdOriginalPrice: { "en-US": "€299" },
        earlyBirdPrice: { "en-US": "€199" },
        ctaButtonText: { "en-US": "Get Tickets" },
        ctaButtonLink: { "en-US": "#tickets" },
      },
    });
    await hero.publish();
    console.log("Hero entry created and published");
  } catch (error) {
    console.log("Hero entry may already exist:", error.message);
  }

  // Create Speaker entries
  const speakers = [
    {
      name: "Sarah Chen",
      role: "AI Research Lead at OpenAI",
      bio: "Leading research on large language models and their applications in creative industries.",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
    },
    {
      name: "Marcus Weber",
      role: "CTO at TechVentures",
      bio: "Building the next generation of developer tools and infrastructure.",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop",
    },
    {
      name: "Elena Rodriguez",
      role: "Product Design Director at Figma",
      bio: "Pioneering new approaches to collaborative design systems.",
      image: "https://images.unsplash.com/photo-1598550874175-4d0ef436c909?w=400&h=400&fit=crop",
    },
    {
      name: "James Liu",
      role: "Engineering Manager at Vercel",
      bio: "Scaling frontend infrastructure for millions of developers worldwide.",
      image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop",
    },
    {
      name: "Anna Kowalski",
      role: "VP of Engineering at Stripe",
      bio: "Building reliable payment systems that power the internet economy.",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop",
    },
    {
      name: "David Park",
      role: "Founder & CEO at DataFlow",
      bio: "Creating real-time data pipelines for modern applications.",
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop",
    },
  ];

  console.log("\nCreating Speaker entries...");
  for (const speaker of speakers) {
    try {
      const entry = await environment.createEntry("speaker", {
        fields: {
          name: { "en-US": speaker.name },
          role: { "en-US": speaker.role },
          bio: { "en-US": speaker.bio },
          image: { "en-US": speaker.image },
        },
      });
      await entry.publish();
      console.log("Speaker created:", speaker.name);
    } catch (error) {
      console.log("Speaker " + speaker.name + " may already exist:", error.message);
    }
  }

  // Create Schedule entries
  const scheduleItems = [
    { time: "09:00", title: "Registration & Coffee", speaker: "", type: "break" },
    { time: "10:00", title: "Opening Keynote: The Future of AI", speaker: "Sarah Chen", type: "keynote" },
    { time: "11:00", title: "Building Scalable Developer Tools", speaker: "Marcus Weber", type: "talk" },
    { time: "12:00", title: "Lunch Break", speaker: "", type: "break" },
    { time: "13:30", title: "Design Systems at Scale", speaker: "Elena Rodriguez", type: "talk" },
    { time: "14:30", title: "Frontend Infrastructure Deep Dive", speaker: "James Liu", type: "talk" },
    { time: "15:30", title: "Coffee Break", speaker: "", type: "break" },
    { time: "16:00", title: "Reliable Payment Systems", speaker: "Anna Kowalski", type: "talk" },
    { time: "17:00", title: "Real-time Data Pipelines", speaker: "David Park", type: "talk" },
    { time: "18:00", title: "Closing Remarks & Networking", speaker: "", type: "break" },
  ];

  console.log("\nCreating Schedule entries...");
  for (const item of scheduleItems) {
    try {
      const entry = await environment.createEntry("scheduleItem", {
        fields: {
          time: { "en-US": item.time },
          title: { "en-US": item.title },
          speaker: { "en-US": item.speaker },
          type: { "en-US": item.type },
        },
      });
      await entry.publish();
      console.log("Schedule item created:", item.time + " - " + item.title);
    } catch (error) {
      console.log("Schedule item " + item.title + " may already exist:", error.message);
    }
  }

  // Create FAQ entries
  const faqItems = [
    {
      question: "What is FLUX?",
      answer: "FLUX is a premier technology conference bringing together industry leaders, innovators, and developers to explore the latest trends in AI, web development, and design systems.",
    },
    {
      question: "Where is the event located?",
      answer: "FLUX 2026 will be held at Kulturbrauerei in Berlin, Germany. We also offer a full virtual experience for remote attendees.",
    },
    {
      question: "What is included in the ticket price?",
      answer: "Your ticket includes access to all talks and workshops, lunch and refreshments, networking sessions, and exclusive swag. Virtual tickets include full livestream access and recordings.",
    },
    {
      question: "Is there a refund policy?",
      answer: "Yes, we offer full refunds up to 30 days before the event. After that, tickets can be transferred to another attendee or converted to virtual attendance.",
    },
    {
      question: "Will talks be recorded?",
      answer: "Yes, all main stage talks will be recorded and made available to ticket holders within 48 hours of the event.",
    },
    {
      question: "How can I become a sponsor?",
      answer: "We offer various sponsorship packages. Please contact our partnerships team at sponsors@flux.events for more information.",
    },
  ];

  console.log("\nCreating FAQ entries...");
  for (const faq of faqItems) {
    try {
      const entry = await environment.createEntry("faqItem", {
        fields: {
          question: { "en-US": faq.question },
          answer: { "en-US": faq.answer },
        },
      });
      await entry.publish();
      console.log("FAQ created:", faq.question);
    } catch (error) {
      console.log("FAQ " + faq.question + " may already exist:", error.message);
    }
  }

  // Create Site Settings entry
  console.log("\nCreating Site Settings entry...");
  try {
    const settings = await environment.createEntry("siteSettings", {
      fields: {
        eventName: { "en-US": "FLUX" },
        eventYear: { "en-US": "2026" },
        tagline: { "en-US": "Where Technology Meets Innovation" },
      },
    });
    await settings.publish();
    console.log("Site Settings entry created and published");
  } catch (error) {
    console.log("Site Settings entry may already exist:", error.message);
  }

  console.log("\nContentful population complete!");
}

populateContentful().catch(console.error);
