import {
  convertToModelMessages,
  streamText,
  UIMessage,
  tool,
} from 'ai'
import { createOpenAI } from '@ai-sdk/openai'
import { z } from 'zod'

export const maxDuration = 30

// Use OpenAI-compatible client to connect directly to Groq (bypassing AI Gateway)
const groq = createOpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: 'https://api.groq.com/openai/v1',
})

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

Users can ask to switch between these themes.
`

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json()

  const result = streamText({
    model: groq.chat('llama-3.3-70b-versatile'),
    system: `You are a helpful assistant for FLUX 2026, Deloitte's premier digital experience conference. 
You help attendees and interested visitors learn about the event, answer questions about the schedule, speakers, pricing, and venue.
You can also help users switch the website theme when they ask.

${eventContext}

Guidelines:
- Be friendly, professional, and concise
- When users ask about themes or want to change the visual style, use the switchTheme tool
- For the "Deloitte" or "FLUX" theme, use themeName: "deloitte"
- For the "Ocean" or "Ocean Blue" theme, use themeName: "ocean"
- Provide accurate information about the event
- If you don't know something specific, suggest they check the website or contact the organizers`,
    messages: await convertToModelMessages(messages),
    tools: {
      switchTheme: tool({
        description: 'Switch the website theme to a different visual style. Available themes are "deloitte" (green/dark) and "ocean" (blue ocean theme).',
        inputSchema: z.object({
          themeName: z.enum(['deloitte', 'ocean']).describe('The name of the theme to switch to'),
        }),
        execute: async ({ themeName }) => {
          return { 
            action: 'switch_theme', 
            themeName,
            message: `Switching to the ${themeName === 'deloitte' ? 'Deloitte FLUX' : 'Ocean Blue'} theme...`
          }
        },
      }),
    },
    abortSignal: req.signal,
  })

  return result.toUIMessageStreamResponse()
}
