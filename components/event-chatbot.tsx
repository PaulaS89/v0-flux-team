'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
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
}

export function EventChatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

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
        const activateResponse = await fetch('/api/themes/activate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ themeId: targetTheme.id }),
        })
        
        if (activateResponse.ok) {
          // Full page refresh to load all new content (colors, images, text) at once
          router.refresh()
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
        className="fixed bottom-6 right-6 md:right-12 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-all hover:scale-105 hover:shadow-xl"
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
        <div className="fixed bottom-24 right-6 md:right-12 z-50 flex h-[500px] w-[380px] flex-col rounded-2xl border border-border bg-card shadow-2xl">
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
