import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

const CONTENTFUL_SPACE_ID = process.env.CONTENTFUL_SPACE_ID!;
const CONTENTFUL_MANAGEMENT_TOKEN = process.env.CONTENTFUL_MANAGEMENT_TOKEN!;
const CONTENTFUL_ENVIRONMENT = "master";

async function getEntry(entryId: string) {
  const response = await fetch(
    `https://api.contentful.com/spaces/${CONTENTFUL_SPACE_ID}/environments/${CONTENTFUL_ENVIRONMENT}/entries/${entryId}`,
    {
      headers: {
        Authorization: `Bearer ${CONTENTFUL_MANAGEMENT_TOKEN}`,
        "Content-Type": "application/json",
      },
    }
  );
  return response.json();
}

async function updateEntry(entryId: string, version: number, fields: Record<string, unknown>) {
  const response = await fetch(
    `https://api.contentful.com/spaces/${CONTENTFUL_SPACE_ID}/environments/${CONTENTFUL_ENVIRONMENT}/entries/${entryId}`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${CONTENTFUL_MANAGEMENT_TOKEN}`,
        "Content-Type": "application/json",
        "X-Contentful-Version": version.toString(),
      },
      body: JSON.stringify({ fields }),
    }
  );
  return response.json();
}

async function publishEntry(entryId: string, version: number) {
  const response = await fetch(
    `https://api.contentful.com/spaces/${CONTENTFUL_SPACE_ID}/environments/${CONTENTFUL_ENVIRONMENT}/entries/${entryId}/published`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${CONTENTFUL_MANAGEMENT_TOKEN}`,
        "X-Contentful-Version": version.toString(),
      },
    }
  );
  return response.json();
}

async function getAllThemes() {
  const response = await fetch(
    `https://api.contentful.com/spaces/${CONTENTFUL_SPACE_ID}/environments/${CONTENTFUL_ENVIRONMENT}/entries?content_type=theme`,
    {
      headers: {
        Authorization: `Bearer ${CONTENTFUL_MANAGEMENT_TOKEN}`,
      },
    }
  );
  return response.json();
}

async function updateAndPublishEntry(entryId: string, newIsActive: boolean, maxRetries = 5) {
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    // Add delay between retries (exponential backoff) - wait longer for rate limits
    if (attempt > 0) {
      const delayMs = 2000 * attempt; // 2s, 4s, 6s, 8s
      console.log(`Retry ${attempt + 1}, waiting ${delayMs}ms...`);
      await new Promise(resolve => setTimeout(resolve, delayMs));
    }
    
    // Always fetch the latest version before updating
    const latestEntry = await getEntry(entryId);
    
    // Check for rate limiting or other errors
    if (latestEntry.sys?.type === "Error") {
      console.log(`Error fetching entry on attempt ${attempt + 1}:`, latestEntry.sys.id);
      if (latestEntry.sys.id === "RateLimitExceeded") {
        await new Promise(resolve => setTimeout(resolve, 3000)); // Extra wait for rate limit
      }
      continue;
    }
    
    if (!latestEntry.sys?.version) {
      console.error("Failed to get entry version:", latestEntry);
      continue;
    }

    const updatedFields = {
      ...latestEntry.fields,
      isActive: { "en-US": newIsActive },
    };

    // Delay before update
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const updated = await updateEntry(entryId, latestEntry.sys.version, updatedFields);
    
    // Check for errors
    if (updated.sys?.type === "Error") {
      console.log(`Update error on attempt ${attempt + 1}:`, updated.sys.id);
      if (updated.sys.id === "RateLimitExceeded") {
        await new Promise(resolve => setTimeout(resolve, 3000));
      }
      continue;
    }
    
    // Check if update was successful
    if (updated.sys?.version) {
      // Delay before publish
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const published = await publishEntry(entryId, updated.sys.version);
      if (published.sys?.type === "Error") {
        console.log(`Publish error on attempt ${attempt + 1}:`, published.sys.id);
        if (published.sys.id === "RateLimitExceeded") {
          await new Promise(resolve => setTimeout(resolve, 3000));
        }
        continue;
      }
      return true;
    } else {
      console.error("Failed to update theme entry:", updated);
    }
  }
  return false;
}

export async function POST(request: NextRequest) {
  try {
    const { themeId } = await request.json();

    if (!themeId) {
      return NextResponse.json({ error: "themeId is required" }, { status: 400 });
    }

    // Get all themes
    const themesResponse = await getAllThemes();
    const themes = themesResponse.items || [];

    // Deactivate all themes and activate the selected one
    let isFirst = true;
    for (const theme of themes) {
      const isTarget = theme.sys.id === themeId;
      const currentIsActive = theme.fields.isActive?.["en-US"] === true;

      // Only update if the state needs to change
      if ((isTarget && !currentIsActive) || (!isTarget && currentIsActive)) {
        // Add delay between theme updates to avoid rate limiting
        if (!isFirst) {
          await new Promise(resolve => setTimeout(resolve, 2000));
        }
        isFirst = false;
        await updateAndPublishEntry(theme.sys.id, isTarget);
      }
    }

    // Revalidate the cache
    revalidateTag("contentful-themes", "max");
    revalidateTag("contentful-active-theme", "max");

    return NextResponse.json({
      success: true,
      activeThemeId: themeId,
    });
  } catch (error) {
    console.error("Error activating theme:", error);
    return NextResponse.json(
      { error: "Failed to activate theme", details: String(error) },
      { status: 500 }
    );
  }
}
