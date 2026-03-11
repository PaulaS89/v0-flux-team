import { UIMessage } from 'ai'

export const maxDuration = 30

// Event information for context
const eventContext = `
FLUX 2026 - Deloitte's Premier Digital Experience Conference

Event Details:
- Date: May 15, 2026
- Location: Düsseldorf, Germany (and Online)
- Venue: Deloitte Heinrich Campus, Toulouser Allee 25, 40211 Düsseldorf
- Theme: "Future · LLMs · UX - Designing for the Age of AI"

About the Event:
FLUX is Deloitte's flagship conference focused on the future of digital experiences, AI, and user experience design. The event brings together industry leaders, innovators, and practitioners to explore how artificial intelligence is reshaping the way we design and build digital products.

Key Topics:
- Future of Digital Experiences
- Large Language Models (LLMs) in UX
- AI-Powered Design Systems
- Human-Centered AI Design
- Digital Transformation

Pricing Tiers:
- Online: €149 - Virtual access to all sessions and recordings
- Early Bird: €349 (was €449) - Full in-person access, networking events
- VIP: €599 - Premium seating, exclusive workshops, speaker meet & greet

Schedule Highlights:
- 08:30: Registration & Networking Breakfast
- 09:15: Keynote on the Future of Digital Experiences
- 10:00: Panel Discussion on AI, Personalization & Trust
- 11:00: Deep Dive sessions
- 12:30: Networking Lunch
- 13:30: Breakout Sessions
- 14:15: Closing Insights
- 15:00: Informal Networking

Available Themes:
- "Deloitte" or "FLUX" theme: The default green/dark theme with the Deloitte branding
- "Ocean" or "Ocean Blue" theme: A calming blue ocean-inspired theme

Users can ask to switch between these themes. When they want to switch themes, respond with [SWITCH_THEME:deloitte] or [SWITCH_THEME:ocean] in your message.
`

const systemPrompt = `You are a helpful assistant for FLUX 2026, Deloitte's premier digital experience conference. 
You help attendees and interested visitors learn about the event, answer questions about the schedule, speakers, pricing, and venue.
You can also help users switch the website theme when they ask.

${eventContext}

Guidelines:
- Be friendly, professional, and concise
- When users ask about themes or want to change the visual style, include the command [SWITCH_THEME:themename] in your response
- For the "Deloitte" or "FLUX" theme, use [SWITCH_THEME:deloitte]
- For the "Ocean" or "Ocean Blue" theme, use [SWITCH_THEME:ocean]
- IMPORTANT: When switching themes, always mention that it might take a few seconds for all content (especially the hero image) to update. Say something like "Switching to the [theme name] theme now! The colors will change immediately, but the hero image and some content may take a few seconds to fully update."
- Provide accurate information about the event
- If you don't know something specific, suggest they check the website or contact the organizers`

function getMessageText(msg: UIMessage): string {
  if (!msg.parts || !Array.isArray(msg.parts)) return ''
  return msg.parts
    .filter((p): p is { type: 'text'; text: string } => p.type === 'text')
    .map((p) => p.text)
    .join('')
}

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json()

  // Convert UIMessages to Groq format
  const groqMessages = messages.map((msg) => ({
    role: msg.role as 'user' | 'assistant',
    content: getMessageText(msg),
  }))

  // Call Groq API directly
  const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'llama-3.3-70b-versatile',
      messages: [
        { role: 'system', content: systemPrompt },
        ...groqMessages,
      ],
      stream: true,
    }),
  })

  if (!response.ok) {
    const error = await response.text()
    console.error('[v0] Groq API error:', error)
    return new Response(JSON.stringify({ error: 'Failed to get response from AI' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  // Transform Groq's SSE stream to AI SDK format
  const encoder = new TextEncoder()
  const stream = new ReadableStream({
    async start(controller) {
      const reader = response.body?.getReader()
      if (!reader) {
        controller.close()
        return
      }

      const decoder = new TextDecoder()
      let buffer = ''

      try {
        while (true) {
          const { done, value } = await reader.read()
          if (done) break

          buffer += decoder.decode(value, { stream: true })
          const lines = buffer.split('\n')
          buffer = lines.pop() || ''

          for (const line of lines) {
            const trimmed = line.trim()
            if (trimmed.startsWith('data:')) {
              const data = trimmed.slice(5).trim()
              if (data === '[DONE]') {
                // Send finish message
                controller.enqueue(encoder.encode(`data: {"type":"finish","finishReason":"stop"}\n\n`))
                continue
              }
              try {
                const parsed = JSON.parse(data)
                const delta = parsed.choices?.[0]?.delta?.content
                if (delta) {
                  // Send as AI SDK UIMessage format
                  controller.enqueue(encoder.encode(`data: {"type":"text-delta","delta":"${delta.replace(/"/g, '\\"').replace(/\n/g, '\\n')}"}\n\n`))
                }
              } catch {
                // Skip invalid JSON
              }
            }
          }
        }
      } finally {
        reader.releaseLock()
        controller.close()
      }
    },
  })

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
    },
  })
}
