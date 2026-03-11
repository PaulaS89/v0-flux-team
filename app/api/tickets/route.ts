import { NextRequest, NextResponse } from "next/server"
import { sql } from "@/lib/db"
import { getSession } from "@/lib/auth"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, ticketType, dietaryRequirements, eventName, company, jobTitle } = body

    // Validate required fields
    if (!name || !email || !ticketType || !eventName) {
      return NextResponse.json(
        { error: "Name, email, ticket type, and event name are required" },
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

    // Check if user is logged in
    const session = await getSession()
    const userId = session?.userId || null

    // Create event date (use current date as default)
    const eventDate = new Date().toISOString().split('T')[0]

    // Create the ticket using correct column names from database schema
    const result = await sql`
      INSERT INTO tickets (user_id, attendee_name, attendee_email, ticket_type, dietary_requirements, event_name, event_date, company, job_title)
      VALUES (${userId}, ${name}, ${email}, ${ticketType}, ${dietaryRequirements || null}, ${eventName}, ${eventDate}, ${company || null}, ${jobTitle || null})
      RETURNING id, attendee_name, attendee_email, ticket_type, event_name, event_date, created_at
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
      SELECT id, attendee_name, attendee_email, ticket_type, event_name, event_date, created_at
      FROM tickets
      WHERE user_id = ${session.userId}
      ORDER BY created_at DESC
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
