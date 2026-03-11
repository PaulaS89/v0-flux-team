import { createClient } from "contentful-management";
import { getThemes, Theme } from "@/lib/contentful";
import { NextResponse } from "next/server";

// GET - Fetch all themes from Contentful
export async function GET() {
  try {
    const themes = await getThemes();
    return NextResponse.json({ themes });
  } catch (error) {
    console.error("Error fetching themes:", error);
    return NextResponse.json(
      { error: "Failed to fetch themes" },
      { status: 500 }
    );
  }
}

// POST - Create a new theme in Contentful
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, backgroundColor, primaryColor, accentColor, foregroundColor, borderColor, isActive } = body;

    if (!name || !backgroundColor || !primaryColor) {
      return NextResponse.json(
        { error: "Missing required fields: name, backgroundColor, primaryColor" },
        { status: 400 }
      );
    }

    // Create Contentful Management client
    const client = createClient({
      accessToken: process.env.CONTENTFUL_MANAGEMENT_TOKEN!,
    });

    const space = await client.getSpace(process.env.CONTENTFUL_SPACE_ID!);
    const environment = await space.getEnvironment("master");

    // Create the theme entry
    const entry = await environment.createEntry("theme", {
      fields: {
        name: { "en-US": name },
        backgroundColor: { "en-US": backgroundColor },
        primaryColor: { "en-US": primaryColor },
        accentColor: accentColor ? { "en-US": accentColor } : undefined,
        foregroundColor: foregroundColor ? { "en-US": foregroundColor } : undefined,
        borderColor: borderColor ? { "en-US": borderColor } : undefined,
        isActive: { "en-US": isActive ?? false },
      },
    });

    // Publish the entry
    await entry.publish();

    const theme: Theme = {
      id: entry.sys.id,
      name,
      backgroundColor,
      primaryColor,
      accentColor,
      foregroundColor,
      borderColor,
      isActive,
    };

    return NextResponse.json({ 
      success: true, 
      message: "Theme created and published successfully",
      theme 
    });
  } catch (error) {
    console.error("Error creating theme:", error);
    return NextResponse.json(
      { error: "Failed to create theme", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}
