import { createClient } from "contentful-management";
import { NextResponse } from "next/server";

const SPACE_ID = process.env.CONTENTFUL_SPACE_ID || "1bkq4170d8hb";
const MANAGEMENT_TOKEN = process.env.CONTENTFUL_MANAGEMENT_TOKEN;

export async function POST() {
  if (!MANAGEMENT_TOKEN) {
    return NextResponse.json(
      { error: "CONTENTFUL_MANAGEMENT_TOKEN is required" },
      { status: 500 }
    );
  }

  const results: string[] = [];

  try {
    const client = createClient({
      accessToken: MANAGEMENT_TOKEN,
    });

    const space = await client.getSpace(SPACE_ID);
    const environment = await space.getEnvironment("master");

    results.push(`Connected to Contentful space: ${SPACE_ID}`);

    // Create Hero entry
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
      results.push("Hero entry created and published");
    } catch (error: any) {
      results.push(`Hero: ${error.message}`);
    }

    // Create Speaker entries
    const speakers = [
      {
        name: "Sarah Chen",
        role: "AI Research Lead at OpenAI",
        bio: "Leading research on large language models and their applications in creative industries.",
        image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop",
      },
      {
        name: "Marcus Weber",
        role: "CTO at TechVentures",
        bio: "Building the next generation of developer tools and infrastructure.",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
      },
      {
        name: "Elena Rodriguez",
        role: "Product Design Director at Figma",
        bio: "Pioneering new approaches to collaborative design systems.",
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop",
      },
      {
        name: "James Liu",
        role: "Engineering Manager at Vercel",
        bio: "Scaling frontend infrastructure for millions of developers worldwide.",
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
      },
      {
        name: "Anna Kowalski",
        role: "VP of Engineering at Stripe",
        bio: "Building reliable payment systems that power the internet economy.",
        image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
      },
      {
        name: "David Park",
        role: "Founder & CEO at DataFlow",
        bio: "Creating real-time data pipelines for modern applications.",
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
      },
    ];

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
        results.push(`Speaker created: ${speaker.name}`);
      } catch (error: any) {
        results.push(`Speaker ${speaker.name}: ${error.message}`);
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
        results.push(`Schedule: ${item.time} - ${item.title}`);
      } catch (error: any) {
        results.push(`Schedule ${item.title}: ${error.message}`);
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

    for (const faq of faqItems) {
      try {
        const entry = await environment.createEntry("faqItem", {
          fields: {
            question: { "en-US": faq.question },
            answer: { "en-US": faq.answer },
          },
        });
        await entry.publish();
        results.push(`FAQ: ${faq.question}`);
      } catch (error: any) {
        results.push(`FAQ ${faq.question}: ${error.message}`);
      }
    }

    // Create Site Settings entry
    try {
      const settings = await environment.createEntry("siteSettings", {
        fields: {
          eventName: { "en-US": "FLUX" },
          eventYear: { "en-US": "2026" },
          tagline: { "en-US": "Where Technology Meets Innovation" },
        },
      });
      await settings.publish();
      results.push("Site Settings created and published");
    } catch (error: any) {
      results.push(`Site Settings: ${error.message}`);
    }

    // Create Design System entry
    try {
      const designSystem = await environment.createEntry("designSystem", {
        fields: {
          name: { "en-US": "FLUX Dark Theme" },
          primaryColor: { "en-US": "oklch(0.98 0 0)" },
          backgroundColor: { "en-US": "oklch(0.03 0 0)" },
          foregroundColor: { "en-US": "oklch(0.98 0 0)" },
          accentColor: { "en-US": "oklch(0.15 0 0)" },
          mutedColor: { "en-US": "oklch(0.12 0 0)" },
          mutedForegroundColor: { "en-US": "oklch(0.55 0 0)" },
          borderColor: { "en-US": "oklch(0.20 0 0)" },
          cardColor: { "en-US": "oklch(0.06 0 0)" },
          destructiveColor: { "en-US": "oklch(0.577 0.245 27.325)" },
          headingFont: { "en-US": "Geist" },
          bodyFont: { "en-US": "Geist" },
          borderRadius: { "en-US": "0rem" },
          isDarkMode: { "en-US": true },
        },
      });
      await designSystem.publish();
      results.push("Design System created and published");
    } catch (error: any) {
      results.push(`Design System: ${error.message}`);
    }

    return NextResponse.json({
      success: true,
      message: "Contentful population complete!",
      results,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message, results },
      { status: 500 }
    );
  }
}
