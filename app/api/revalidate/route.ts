import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

// Secret token to verify webhook requests from Contentful
const REVALIDATION_SECRET = process.env.REVALIDATION_SECRET;

export async function POST(request: NextRequest) {
  try {
    // Verify the request is from Contentful (optional but recommended)
    const secret = request.headers.get("x-revalidation-secret");
    
    if (REVALIDATION_SECRET && secret !== REVALIDATION_SECRET) {
      return NextResponse.json(
        { message: "Invalid secret" },
        { status: 401 }
      );
    }

    const body = await request.json();
    
    // Get the content type from Contentful webhook payload
    const contentType = body?.sys?.contentType?.sys?.id;
    
    // Revalidate based on content type
    if (contentType === "theme") {
      revalidateTag("contentful-themes", "max");
      revalidateTag("contentful-active-theme", "max");
      console.log("Revalidated theme cache");
    }
    
    // Also revalidate for other content types
    if (contentType === "hero") {
      revalidateTag("contentful-hero", "max");
    }
    if (contentType === "speaker") {
      revalidateTag("contentful-speakers", "max");
    }
    
    // Generic revalidation for all Contentful content
    revalidateTag("contentful", "max");

    return NextResponse.json({
      revalidated: true,
      contentType,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Revalidation error:", error);
    return NextResponse.json(
      { message: "Error revalidating", error: String(error) },
      { status: 500 }
    );
  }
}

// Allow GET for manual revalidation (useful for testing)
export async function GET(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get("secret");
  const tag = request.nextUrl.searchParams.get("tag") || "contentful-themes";
  
  if (REVALIDATION_SECRET && secret !== REVALIDATION_SECRET) {
    return NextResponse.json(
      { message: "Invalid secret" },
      { status: 401 }
    );
  }

  revalidateTag(tag, "max");
  
  return NextResponse.json({
    revalidated: true,
    tag,
    timestamp: new Date().toISOString(),
  });
}
