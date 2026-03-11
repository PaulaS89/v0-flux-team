import { NextResponse } from 'next/server'
import { getSession } from '@/lib/auth'

export async function GET() {
  try {
    const session = await getSession()
    console.log("[v0] getSession result:", session)

    if (!session) {
      console.log("[v0] No session found, returning null user")
      return NextResponse.json({ user: null })
    }

    console.log("[v0] Session found, returning user:", session.name)
    return NextResponse.json({
      user: {
        id: session.userId,
        name: session.name,
        email: session.email,
      },
    })
  } catch (error) {
    console.error('[v0] Session error:', error)
    return NextResponse.json({ user: null })
  }
}
