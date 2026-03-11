import { NextResponse } from "next/server"
import { sql } from "@/lib/db"

export async function GET() {
  try {
    const events = await sql`
      SELECT id, name, description, location, venue, event_date, end_date, price, image_url, is_featured, created_at
      FROM events
      WHERE event_date >= CURRENT_DATE
      ORDER BY event_date ASC
    `

    return NextResponse.json({ events })
  } catch (error) {
    console.error("Fetch events error:", error)
    return NextResponse.json(
      { error: "Failed to fetch events" },
      { status: 500 }
    )
  }
}
