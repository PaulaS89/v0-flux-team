"use client"

import { useState, useEffect, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, Check, AlertCircle, Calendar, MapPin } from "lucide-react"

interface UserData {
  id: number
  name: string
  email: string
}

interface EventData {
  id: number
  name: string
  description: string
  location: string
  venue: string
  event_date: string
  event_time: string | null
  ticket_price: number
  vip_price: number
  virtual_price: number
  image_url: string | null
}

type TicketType = "standard" | "vip" | "virtual"

function TicketsContent() {
  const searchParams = useSearchParams()
  const eventIdParam = searchParams.get("event")

  const [user, setUser] = useState<UserData | null>(null)
  const [event, setEvent] = useState<EventData | null>(null)
  const [events, setEvents] = useState<EventData[]>([])
  const [selectedEventId, setSelectedEventId] = useState<number | null>(
    eventIdParam ? parseInt(eventIdParam) : null
  )
  const [isLoadingUser, setIsLoadingUser] = useState(true)
  const [isLoadingEvent, setIsLoadingEvent] = useState(true)

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [ticketType, setTicketType] = useState<TicketType>("standard")
  const [dietaryRequirements, setDietaryRequirements] = useState("")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Fetch user session
  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await fetch("/api/auth/session")
        const data = await response.json()
        if (data.user) {
          setUser(data.user)
          setName(data.user.name)
          setEmail(data.user.email)
        }
      } catch (error) {
        console.error("Failed to fetch session:", error)
      } finally {
        setIsLoadingUser(false)
      }
    }
    fetchUser()
  }, [])

  // Fetch events list
  useEffect(() => {
    async function fetchEvents() {
      try {
        const response = await fetch("/api/events")
        const data = await response.json()
        if (data.events) {
          setEvents(data.events)
          // If no event selected and we have events, select the first one
          if (!selectedEventId && data.events.length > 0) {
            setSelectedEventId(data.events[0].id)
          }
        }
      } catch (error) {
        console.error("Failed to fetch events:", error)
      }
    }
    fetchEvents()
  }, [selectedEventId])

  // Fetch specific event details
  useEffect(() => {
    async function fetchEvent() {
      if (!selectedEventId) {
        setIsLoadingEvent(false)
        return
      }

      setIsLoadingEvent(true)
      try {
        const response = await fetch(`/api/events/${selectedEventId}`)
        const data = await response.json()
        if (data.event) {
          setEvent(data.event)
        }
      } catch (error) {
        console.error("Failed to fetch event:", error)
      } finally {
        setIsLoadingEvent(false)
      }
    }
    fetchEvent()
  }, [selectedEventId])

  function getTicketPrice(): number {
    if (!event) return 0
    switch (ticketType) {
      case "vip":
        return event.vip_price
      case "virtual":
        return event.virtual_price
      default:
        return event.ticket_price
    }
  }

  function formatPrice(price: number): string {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price)
  }

  function formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError("")
    setIsSubmitting(true)

    if (!selectedEventId || !event) {
      setError("Please select an event")
      setIsSubmitting(false)
      return
    }

    try {
      const response = await fetch("/api/tickets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          eventId: selectedEventId,
          name,
          email,
          ticketType,
          dietaryRequirements: dietaryRequirements || null,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.error || "Failed to purchase ticket")
        return
      }

      setSuccess(true)
    } catch {
      setError("An error occurred. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (success) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <div className="p-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
        </div>

        <div className="flex-1 flex items-center justify-center px-6 pb-20">
          <div className="w-full max-w-md text-center">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/20">
              <Check className="h-8 w-8 text-green-600 dark:text-green-400" />
            </div>
            <h1 className="text-2xl font-semibold tracking-tight mb-2">
              Ticket Purchased!
            </h1>
            <p className="text-muted-foreground mb-2">
              You&apos;re all set for {event?.name}
            </p>
            <p className="text-sm text-muted-foreground mb-6">
              A confirmation email has been sent to {email}
            </p>
            <div className="flex flex-col gap-3">
              {user && (
                <Button asChild className="w-full bg-foreground text-background hover:bg-foreground/90">
                  <Link href="/profile">View My Tickets</Link>
                </Button>
              )}
              <Button variant="outline" asChild className="w-full">
                <Link href="/events">Browse More Events</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="p-6">
        <Link
          href={eventIdParam ? `/events` : "/"}
          className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Link>
      </div>

      <div className="flex-1 px-6 pb-20">
        <div className="mx-auto max-w-4xl">
          <div className="mb-8 text-center">
            <h1 className="text-2xl font-semibold tracking-tight mb-2">
              Get Your Tickets
            </h1>
            <p className="text-sm text-muted-foreground">
              Secure your spot at an upcoming event
            </p>
          </div>

          {/* Event Selection */}
          {!eventIdParam && events.length > 1 && (
            <div className="mb-8">
              <Label className="text-sm font-medium mb-3 block">Select Event</Label>
              <div className="grid gap-3 sm:grid-cols-2">
                {events.map((evt) => (
                  <button
                    key={evt.id}
                    type="button"
                    onClick={() => setSelectedEventId(evt.id)}
                    className={`p-4 rounded-lg border text-left transition-all ${
                      selectedEventId === evt.id
                        ? "border-foreground bg-muted"
                        : "border-border hover:border-muted-foreground"
                    }`}
                  >
                    <h3 className="font-medium mb-1">{evt.name}</h3>
                    <p className="text-sm text-muted-foreground">{evt.location}</p>
                    <p className="text-sm text-muted-foreground">{formatDate(evt.event_date)}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Event Details */}
          {isLoadingEvent ? (
            <div className="mb-8 p-6 rounded-lg border border-border animate-pulse">
              <div className="h-6 bg-muted rounded w-1/3 mb-2"></div>
              <div className="h-4 bg-muted rounded w-1/2"></div>
            </div>
          ) : event ? (
            <div className="mb-8 p-6 rounded-lg border border-border bg-muted/30">
              <h2 className="text-xl font-semibold mb-2">{event.name}</h2>
              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {formatDate(event.event_date)}
                  {event.event_time && ` at ${event.event_time}`}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  {event.venue}, {event.location}
                </span>
              </div>
            </div>
          ) : (
            <div className="mb-8 p-6 rounded-lg border border-dashed border-border text-center">
              <p className="text-muted-foreground">No events available at this time.</p>
              <Button asChild variant="outline" className="mt-4">
                <Link href="/events">Browse All Events</Link>
              </Button>
            </div>
          )}

          {event && (
            <div className="grid gap-8 lg:grid-cols-2">
              {/* Ticket Type Selection */}
              <div>
                <Label className="text-sm font-medium mb-3 block">
                  Select Ticket Type
                </Label>
                <div className="space-y-3">
                  <button
                    type="button"
                    onClick={() => setTicketType("standard")}
                    className={`w-full p-4 rounded-lg border text-left transition-all ${
                      ticketType === "standard"
                        ? "border-foreground bg-muted"
                        : "border-border hover:border-muted-foreground"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Standard</h3>
                        <p className="text-sm text-muted-foreground">
                          Full conference access
                        </p>
                      </div>
                      <span className="text-lg font-semibold">
                        {formatPrice(event.ticket_price)}
                      </span>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setTicketType("vip")}
                    className={`w-full p-4 rounded-lg border text-left transition-all ${
                      ticketType === "vip"
                        ? "border-foreground bg-muted"
                        : "border-border hover:border-muted-foreground"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">VIP</h3>
                        <p className="text-sm text-muted-foreground">
                          Premium access + exclusive networking
                        </p>
                      </div>
                      <span className="text-lg font-semibold">
                        {formatPrice(event.vip_price)}
                      </span>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setTicketType("virtual")}
                    className={`w-full p-4 rounded-lg border text-left transition-all ${
                      ticketType === "virtual"
                        ? "border-foreground bg-muted"
                        : "border-border hover:border-muted-foreground"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Virtual</h3>
                        <p className="text-sm text-muted-foreground">
                          Livestream access from anywhere
                        </p>
                      </div>
                      <span className="text-lg font-semibold">
                        {formatPrice(event.virtual_price)}
                      </span>
                    </div>
                  </button>
                </div>
              </div>

              {/* Attendee Form */}
              <div>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <h3 className="text-sm font-medium mb-3">Attendee Information</h3>

                  {error && (
                    <div className="p-3 text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-md flex items-start gap-2">
                      <AlertCircle className="h-4 w-4 mt-0.5 shrink-0" />
                      <span>{error}</span>
                    </div>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="Your full name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      disabled={isSubmitting}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      disabled={isSubmitting}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="dietary">
                      Dietary Requirements{" "}
                      <span className="text-muted-foreground">(optional)</span>
                    </Label>
                    <Textarea
                      id="dietary"
                      placeholder="Any dietary restrictions or allergies"
                      value={dietaryRequirements}
                      onChange={(e) => setDietaryRequirements(e.target.value)}
                      disabled={isSubmitting}
                      rows={3}
                    />
                  </div>

                  {!isLoadingUser && !user && (
                    <p className="text-sm text-muted-foreground">
                      <Link href="/login" className="underline underline-offset-4 hover:text-foreground">
                        Log in
                      </Link>{" "}
                      to save this ticket to your profile.
                    </p>
                  )}

                  <div className="pt-4 border-t border-border">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-muted-foreground">Total</span>
                      <span className="text-2xl font-semibold">
                        {formatPrice(getTicketPrice())}
                      </span>
                    </div>
                    <Button
                      type="submit"
                      className="w-full bg-foreground text-background hover:bg-foreground/90"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Processing..." : "Purchase Ticket"}
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default function TicketsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="h-8 w-8 border-2 border-foreground border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <TicketsContent />
    </Suspense>
  )
}
