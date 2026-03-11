import { NextRequest, NextResponse } from "next/server"
import { sql } from "@/lib/db"

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const eventId = parseInt(id, 10)

    if (isNaN(eventId)) {
      return NextResponse.json(
        { error: "Invalid event ID" },
        { status: 400 }
      )
    }

    const events = await sql`
      SELECT id, name, description, location, venue, event_date, event_time, ticket_price, vip_price, virtual_price, image_url, is_featured, max_attendees, created_at
      FROM events
      WHERE id = ${eventId}
    `

    if (events.length === 0) {
      return NextResponse.json(
        { error: "Event not found" },
        { status: 404 }
      )
    }

    return NextResponse.json({ event: events[0] })
  } catch (error) {
    console.error("Fetch event error:", error)
    return NextResponse.json(
      { error: "Failed to fetch event" },
      { status: 500 }
    )
  }
}
