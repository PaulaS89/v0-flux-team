import { NextRequest, NextResponse } from "next/server"
import { sql } from "@/lib/db"
import { getSession } from "@/lib/auth"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { eventId, name, email, ticketType, dietaryRequirements } = body

    // Validate required fields
    if (!eventId || !name || !email || !ticketType) {
      return NextResponse.json(
        { error: "Event, name, email, and ticket type are required" },
        { status: 400 }
      )
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address" },
        { status: 400 }
      )
    }

    // Fetch event details
    const events = await sql`
      SELECT id, name, event_date FROM events WHERE id = ${eventId}
    `

    if (events.length === 0) {
      return NextResponse.json(
        { error: "Event not found" },
        { status: 404 }
      )
    }

    const event = events[0]

    // Check if user is logged in
    const session = await getSession()
    const userId = session?.userId || null

    // Create the ticket linked to the event
    const result = await sql`
      INSERT INTO tickets (user_id, event_id, attendee_name, attendee_email, ticket_type, dietary_requirements, event_name, event_date)
      VALUES (${userId}, ${eventId}, ${name}, ${email}, ${ticketType}, ${dietaryRequirements || null}, ${event.name}, ${event.event_date})
      RETURNING id, event_id, attendee_name, attendee_email, ticket_type, event_name, event_date, created_at
    `

    return NextResponse.json({
      success: true,
      ticket: result[0],
      message: "Ticket purchased successfully!"
    })
  } catch (error) {
    console.error("Ticket creation error:", error)
    return NextResponse.json(
      { error: "Failed to create ticket" },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const session = await getSession()
    
    if (!session) {
      return NextResponse.json(
        { error: "You must be logged in to view your tickets" },
        { status: 401 }
      )
    }

    const tickets = await sql`
      SELECT id, event_id, attendee_name, attendee_email, ticket_type, event_name, event_date, created_at
      FROM tickets
      WHERE user_id = ${session.userId}
      ORDER BY event_date DESC
    `

    return NextResponse.json({ tickets })
  } catch (error) {
    console.error("Fetch tickets error:", error)
    return NextResponse.json(
      { error: "Failed to fetch tickets" },
      { status: 500 }
    )
  }
}
