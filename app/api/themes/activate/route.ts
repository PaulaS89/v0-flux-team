import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

const CONTENTFUL_SPACE_ID = process.env.CONTENTFUL_SPACE_ID!;
const CONTENTFUL_MANAGEMENT_TOKEN = process.env.CONTENTFUL_MANAGEMENT_TOKEN!;
const CONTENTFUL_ENVIRONMENT = "master";

// Helper to wait
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Wrapper for API calls with rate limit retry
async function withRateLimitRetry<T>(
  fn: () => Promise<T>,
  maxRetries = 3,
  baseDelay = 2000
): Promise<T> {
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    const result = await fn();
    // Check if it's a rate limit error
    if ((result as { sys?: { type?: string; id?: string } })?.sys?.id === "RateLimitExceeded") {
      if (attempt < maxRetries - 1) {
        const waitTime = baseDelay * (attempt + 1);
        await delay(waitTime);
        continue;
      }
    }
    return result;
  }
  return fn(); // Final attempt
}

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



export async function POST(request: NextRequest) {
  try {
    const { themeId } = await request.json();

    if (!themeId) {
      return NextResponse.json({ error: "themeId is required" }, { status: 400 });
    }

    // Get all themes with retry
    const themesResponse = await withRateLimitRetry(() => getAllThemes());
    const themes = themesResponse.items || [];

    // Deactivate all themes and activate the selected one
    for (const theme of themes) {
      const isTarget = theme.sys.id === themeId;
      const currentIsActive = theme.fields.isActive?.["en-US"] === true;

      // Only update if the state needs to change
      if ((isTarget && !currentIsActive) || (!isTarget && currentIsActive)) {
        // Get fresh version to avoid version mismatch
        const freshEntry = await withRateLimitRetry(() => getEntry(theme.sys.id));
        
        if (!freshEntry.sys?.version) {
          console.error("Failed to get entry version:", freshEntry);
          continue;
        }

        const updatedFields = {
          ...freshEntry.fields,
          isActive: { "en-US": isTarget },
        };

        // Small delay before update to avoid rate limits
        await delay(300);
        
        const updated = await withRateLimitRetry(() => 
          updateEntry(theme.sys.id, freshEntry.sys.version, updatedFields)
        );
        
        if (updated.sys?.version) {
          await delay(300);
          await withRateLimitRetry(() => publishEntry(theme.sys.id, updated.sys.version));
        }
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
