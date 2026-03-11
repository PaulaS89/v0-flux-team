'use client'

import { useState, useRef, useEffect } from 'react'
import { useChat } from '@ai-sdk/react'
import { DefaultChatTransport } from 'ai'
import { MessageCircle, X, Send, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

export function EventChatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [input, setInput] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({ api: '/api/chat' }),
  })

  const isLoading = status === 'streaming' || status === 'submitted'

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // Handle theme switching from tool calls
  useEffect(() => {
    const lastMessage = messages[messages.length - 1]
    if (lastMessage?.role === 'assistant') {
      for (const part of lastMessage.parts || []) {
        if (part.type === 'tool-invocation' && part.toolInvocation.toolName === 'switchTheme') {
          const state = part.toolInvocation.state
          if (state === 'output-available') {
            const output = part.toolInvocation.output as { action: string; themeName: string }
            if (output?.action === 'switch_theme') {
              handleThemeSwitch(output.themeName)
            }
          }
        }
      }
    }
  }, [messages])

  const handleThemeSwitch = async (themeName: string) => {
    try {
      // First, get the list of themes to find the correct theme ID
      const themesResponse = await fetch('/api/themes')
      const data = await themesResponse.json()
      const themes = data.themes || data
      
      // Find the theme that matches the name (case-insensitive partial match)
      const targetTheme = themes.find((t: { name: string; id: string }) => 
        t.name.toLowerCase().includes(themeName.toLowerCase())
      )

      if (targetTheme) {
        // Activate the theme
        await fetch('/api/themes/activate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ themeId: targetTheme.id }),
        })
        
        // Refresh the page to apply the new theme
        router.refresh()
      }
    } catch (error) {
      console.error('Error switching theme:', error)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return
    sendMessage({ text: input })
    setInput('')
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
                  {message.parts?.map((part, index) => {
                    if (part.type === 'text') {
                      return (
                        <p key={index} className="text-sm whitespace-pre-wrap">
                          {part.text}
                        </p>
                      )
                    }
                    if (part.type === 'tool-invocation') {
                      const state = part.toolInvocation.state
                      if (state === 'output-available') {
                        const output = part.toolInvocation.output as { message?: string }
                        return (
                          <p key={index} className="text-sm italic text-primary">
                            {output?.message || 'Theme changed!'}
                          </p>
                        )
                      }
                      if (state === 'input-available' || state === 'input-streaming') {
                        return (
                          <p key={index} className="text-sm italic text-muted-foreground">
                            Changing theme...
                          </p>
                        )
                      }
                    }
                    return null
                  })}
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
