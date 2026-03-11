"use client"

import { useEffect, useState, useRef } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Calendar, MapPin, ChevronLeft, ChevronRight } from "lucide-react"

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
  is_featured: boolean
  max_attendees: number | null
}

export function EventsSlider() {
  const [events, setEvents] = useState<EventData[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    async function fetchEvents() {
      try {
        const response = await fetch("/api/events")
        const data = await response.json()
        setEvents(data.events || [])
      } catch (error) {
        console.error("Failed to fetch events:", error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchEvents()
  }, [])

  function formatDate(dateString: string) {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  function formatPrice(price: number) {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(price)
  }

  function scrollLeft() {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -350, behavior: "smooth" })
    }
  }

  function scrollRight() {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 350, behavior: "smooth" })
    }
  }

  if (isLoading) {
    return (
      <section className="py-24 bg-muted/30">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex items-end justify-between mb-12">
            <div>
              <div className="h-8 w-48 bg-muted rounded animate-pulse mb-2" />
              <div className="h-5 w-72 bg-muted rounded animate-pulse" />
            </div>
          </div>
          <div className="flex gap-6 overflow-hidden">
            {[1, 2, 3].map((i) => (
              <div key={i} className="min-w-[320px] rounded-lg border border-border bg-card p-5 animate-pulse">
                <div className="h-40 bg-muted rounded-md mb-4" />
                <div className="h-5 bg-muted rounded w-3/4 mb-2" />
                <div className="h-4 bg-muted rounded w-full" />
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  if (events.length === 0) {
    return null
  }

  return (
    <section id="events" className="py-24 bg-muted/30">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex items-end justify-between mb-12">
          <div>
            <h2 className="text-3xl font-semibold tracking-tight mb-2">
              Upcoming Events
            </h2>
            <p className="text-muted-foreground">
              Explore our upcoming conferences and events worldwide
            </p>
          </div>
          <div className="hidden md:flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={scrollLeft}
              className="h-10 w-10 rounded-full"
            >
              <ChevronLeft className="h-5 w-5" />
              <span className="sr-only">Scroll left</span>
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={scrollRight}
              className="h-10 w-10 rounded-full"
            >
              <ChevronRight className="h-5 w-5" />
              <span className="sr-only">Scroll right</span>
            </Button>
          </div>
        </div>

        <div
          ref={scrollContainerRef}
          className="flex gap-6 overflow-x-auto scrollbar-hide pb-4 -mx-6 px-6 snap-x snap-mandatory"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {events.map((event) => (
            <div
              key={event.id}
              className="min-w-[320px] max-w-[320px] flex-shrink-0 snap-start group rounded-lg border border-border bg-card overflow-hidden hover:border-foreground/20 transition-colors"
            >
              <div className="aspect-[16/10] bg-muted relative overflow-hidden">
                {event.image_url ? (
                  <img
                    src={event.image_url}
                    alt={event.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-muted to-muted/50">
                    <span className="text-3xl font-bold text-muted-foreground">
                      {event.name.charAt(0)}
                    </span>
                  </div>
                )}
                {event.is_featured && (
                  <span className="absolute top-3 left-3 bg-foreground text-background text-xs font-medium px-2 py-1 rounded">
                    Featured
                  </span>
                )}
              </div>
              <div className="p-5">
                <h3 className="text-lg font-semibold mb-1 group-hover:text-foreground/80 transition-colors line-clamp-1">
                  {event.name}
                </h3>
                <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                  {event.description}
                </p>
                <div className="space-y-1.5 mb-4">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Calendar className="h-3.5 w-3.5" />
                    <span>{formatDate(event.event_date)}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <MapPin className="h-3.5 w-3.5" />
                    <span className="line-clamp-1">{event.location}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-border">
                  <span className="font-semibold">
                    From {formatPrice(event.ticket_price)}
                  </span>
                  <Link
                    href={`/tickets?event=${event.id}`}
                    className="text-xs font-medium uppercase tracking-wider text-foreground hover:text-foreground/70 transition-colors inline-flex items-center gap-1"
                  >
                    Get Tickets
                    <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              </div>
            </div>
          ))}

          {/* View All Card */}
          <Link
            href="/events"
            className="min-w-[320px] max-w-[320px] flex-shrink-0 snap-start rounded-lg border border-dashed border-border bg-card/50 flex flex-col items-center justify-center p-8 hover:border-foreground/30 hover:bg-card transition-colors"
          >
            <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center mb-4">
              <ArrowRight className="h-5 w-5" />
            </div>
            <span className="text-lg font-semibold mb-1">View All Events</span>
            <span className="text-sm text-muted-foreground">
              See all upcoming conferences
            </span>
          </Link>
        </div>
      </div>
    </section>
  )
}
