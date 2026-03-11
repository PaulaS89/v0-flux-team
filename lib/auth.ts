import { cookies } from 'next/headers'
import { sql } from './db'

export async function getSession() {
  const cookieStore = await cookies()
  const sessionToken = cookieStore.get('session_token')?.value

  if (!sessionToken) {
    return null
  }

  const sessions = await sql`
    SELECT s.*, u.name, u.email 
    FROM sessions s
    JOIN users u ON s.user_id = u.id
    WHERE s.session_token = ${sessionToken}
    AND s.expires_at > NOW()
  `

  if (sessions.length === 0) {
    return null
  }

  return {
    userId: sessions[0].user_id,
    name: sessions[0].name,
    email: sessions[0].email,
    expiresAt: sessions[0].expires_at,
  }
}

export function generateSessionToken(): string {
  const array = new Uint8Array(32)
  crypto.getRandomValues(array)
  return Array.from(array, (byte) => byte.toString(16).padStart(2, '0')).join('')
}
