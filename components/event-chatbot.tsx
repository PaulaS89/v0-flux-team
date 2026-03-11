'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { MessageCircle, X, Send, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
}

interface ThemeData {
  name: string
  id: string
  backgroundColor?: string
  primaryColor?: string
  accentColor?: string
  foregroundColor?: string
  borderColor?: string
}

export function EventChatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // Check for theme switch commands in assistant messages
  const checkForThemeSwitch = useCallback((text: string) => {
    const match = text.match(/\[SWITCH_THEME:(\w+)\]/i)
    if (match) {
      const themeName = match[1]
      handleThemeSwitch(themeName)
      // Return text without the command
      return text.replace(/\[SWITCH_THEME:\w+\]/gi, '').trim()
    }
    return text
  }, [])

  const handleThemeSwitch = async (themeName: string) => {
    try {
      // First, get the list of themes to find the correct theme ID
      const themesResponse = await fetch('/api/themes')
      const data = await themesResponse.json()
      const themes = data.themes || data
      
      // Find the theme that matches the name (case-insensitive partial match)
      const targetTheme = themes.find((t: ThemeData) => 
        t.name.toLowerCase().includes(themeName.toLowerCase())
      ) as ThemeData | undefined

      if (targetTheme) {
        // Activate the theme on the server (for persistence)
        await fetch('/api/themes/activate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ themeId: targetTheme.id }),
        })
        
        // Apply theme CSS variables directly without page reload
        const root = document.documentElement
        
        // Helper to adjust lightness for color variations
        const adjustLightness = (color: string, amount: number): string => {
          const oklchMatch = color.match(/oklch\(([0-9.]+)\s+([0-9.]+)\s+([0-9.]+)\)/)
          if (oklchMatch) {
            const l = parseFloat(oklchMatch[1])
            const newL = Math.min(1, Math.max(0, l + amount))
            return `oklch(${newL.toFixed(3)} ${oklchMatch[2]} ${oklchMatch[3]})`
          }
          if (color.startsWith('#')) {
            const hex = color.slice(1)
            const r = parseInt(hex.slice(0, 2), 16) / 255
            const g = parseInt(hex.slice(2, 4), 16) / 255
            const b = parseInt(hex.slice(4, 6), 16) / 255
            const factor = 1 + amount * 2
            const newR = Math.min(255, Math.max(0, Math.round(r * factor * 255)))
            const newG = Math.min(255, Math.max(0, Math.round(g * factor * 255)))
            const newB = Math.min(255, Math.max(0, Math.round(b * factor * 255)))
            return `#${newR.toString(16).padStart(2, '0')}${newG.toString(16).padStart(2, '0')}${newB.toString(16).padStart(2, '0')}`
          }
          return color
        }

        // Apply background colors
        if (targetTheme.backgroundColor) {
          root.style.setProperty("--background", targetTheme.backgroundColor)
          root.style.setProperty("--card", adjustLightness(targetTheme.backgroundColor, 0.04))
          root.style.setProperty("--popover", adjustLightness(targetTheme.backgroundColor, 0.04))
          root.style.setProperty("--muted", adjustLightness(targetTheme.backgroundColor, 0.09))
          root.style.setProperty("--secondary", adjustLightness(targetTheme.backgroundColor, 0.1))
        }
        
        // Apply primary color
        if (targetTheme.primaryColor) {
          root.style.setProperty("--primary", targetTheme.primaryColor)
          root.style.setProperty("--ring", targetTheme.primaryColor)
        }
        
        // Apply accent color
        if (targetTheme.accentColor) {
          root.style.setProperty("--accent", targetTheme.accentColor)
        }
        
        // Apply foreground colors
        if (targetTheme.foregroundColor) {
          root.style.setProperty("--foreground", targetTheme.foregroundColor)
          root.style.setProperty("--card-foreground", targetTheme.foregroundColor)
          root.style.setProperty("--popover-foreground", targetTheme.foregroundColor)
          root.style.setProperty("--muted-foreground", "#D4D4D4")
          root.style.setProperty("--primary-foreground", targetTheme.backgroundColor || '#0A0A0A')
        }
        
        // Apply border colors
        if (targetTheme.borderColor) {
          root.style.setProperty("--border", targetTheme.borderColor)
          root.style.setProperty("--input", targetTheme.borderColor)
        }
      }
    } catch (err) {
      console.error('Error switching theme:', err)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return
    
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim(),
    }
    
    setMessages((prev) => [...prev, userMessage])
    setInput('')
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMessage].map((m) => ({
            id: m.id,
            role: m.role,
            parts: [{ type: 'text', text: m.content }],
          })),
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to get response')
      }

      const reader = response.body?.getReader()
      if (!reader) throw new Error('No response body')

      const decoder = new TextDecoder()
      let assistantContent = ''
      const assistantId = (Date.now() + 1).toString()

      // Add empty assistant message that we'll update
      setMessages((prev) => [...prev, { id: assistantId, role: 'assistant', content: '' }])

      let buffer = ''
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
            if (data === '[DONE]') continue
            try {
              const parsed = JSON.parse(data)
              if (parsed.type === 'text-delta' && parsed.delta) {
                assistantContent += parsed.delta
                // Check for theme switch and clean the content
                const cleanedContent = checkForThemeSwitch(assistantContent)
                setMessages((prev) =>
                  prev.map((m) =>
                    m.id === assistantId ? { ...m, content: cleanedContent } : m
                  )
                )
              }
            } catch {
              // Skip invalid JSON
            }
          }
        }
      }
    } catch (err) {
      console.error('[v0] Chat error:', err)
      setError('Unable to connect to the assistant. Please try again later.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      {/* Floating Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-all hover:scale-105 hover:shadow-xl"
        aria-label={isOpen ? 'Close chat' : 'Open chat'}
      >
        {isOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <MessageCircle className="h-6 w-6" />
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 flex h-[500px] w-[380px] flex-col rounded-2xl border border-border bg-card shadow-2xl">
          {/* Header */}
          <div className="flex items-center gap-3 border-b border-border px-4 py-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
              <MessageCircle className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="font-medium text-foreground">FLUX Assistant</h3>
              <p className="text-xs text-muted-foreground">Ask me about the event</p>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4">
            {messages.length === 0 && (
              <div className="flex h-full flex-col items-center justify-center text-center">
                <MessageCircle className="mb-3 h-12 w-12 text-muted-foreground/30" />
                <p className="text-sm text-muted-foreground">
                  Hi! I can help you with information about FLUX 2026.
                </p>
                <p className="mt-1 text-xs text-muted-foreground/70">
                  Ask about the schedule, speakers, pricing, or say &quot;switch to ocean theme&quot;
                </p>
              </div>
            )}
            
            {messages.map((message) => (
              <div
                key={message.id}
                className={`mb-4 flex ${
                  message.role === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-2 ${
                    message.role === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-foreground'
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap">
                    {message.content || (message.role === 'assistant' && isLoading ? '' : '')}
                  </p>
                </div>
              </div>
            ))}
            
            {isLoading && messages[messages.length - 1]?.role === 'user' && (
              <div className="mb-4 flex justify-start">
                <div className="rounded-2xl bg-muted px-4 py-2">
                  <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
                </div>
              </div>
            )}

            {error && (
              <div className="mb-4 flex justify-start">
                <div className="max-w-[85%] rounded-2xl bg-destructive/10 px-4 py-2 text-sm text-destructive">
                  {error}
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form onSubmit={handleSubmit} className="border-t border-border p-4">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about FLUX 2026..."
                className="flex-1 rounded-full border border-border bg-background px-4 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                disabled={isLoading}
              />
              <Button
                type="submit"
                size="icon"
                className="h-10 w-10 rounded-full"
                disabled={!input.trim() || isLoading}
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </form>
        </div>
      )}
    </>
  )
}
