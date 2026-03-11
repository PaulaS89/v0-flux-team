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
      <section className="bg-background px-8 md:px-16 lg:px-24 py-16">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <div className="h-8 w-48 bg-muted rounded animate-pulse mx-auto mb-4" />
            <div className="h-5 w-72 bg-muted rounded animate-pulse mx-auto" />
          </div>
          <div className="flex gap-4 overflow-hidden">
            {[1, 2, 3].map((i) => (
              <div key={i} className="min-w-[300px] rounded-xl border border-muted-foreground/20 bg-card/40 p-5 animate-pulse">
                <div className="h-36 bg-muted rounded-lg mb-4" />
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
    <section id="events" className="bg-background px-8 md:px-16 lg:px-24 py-16">
      <div className="mx-auto max-w-6xl">
        {/* Header - matching site style */}
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl md:text-4xl font-medium tracking-[0.02em] text-foreground">
            UPCOMING EVENTS
          </h2>
          <p className="text-muted-foreground text-sm md:text-base tracking-wide">
            Explore our upcoming conferences and events worldwide.
          </p>
        </div>

        {/* Navigation arrows */}
        <div className="hidden md:flex justify-end gap-2 mb-4">
          <Button
            variant="outline"
            size="icon"
            onClick={scrollLeft}
            className="h-9 w-9 rounded-full border-muted-foreground/30 hover:border-foreground hover:bg-foreground hover:text-background transition-all"
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Scroll left</span>
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={scrollRight}
            className="h-9 w-9 rounded-full border-muted-foreground/30 hover:border-foreground hover:bg-foreground hover:text-background transition-all"
          >
            <ChevronRight className="h-4 w-4" />
            <span className="sr-only">Scroll right</span>
          </Button>
        </div>

        <div
          ref={scrollContainerRef}
          className="flex gap-4 overflow-x-auto scrollbar-hide pb-4 snap-x snap-mandatory"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {events.map((event) => (
            <div
              key={event.id}
              className="min-w-[300px] max-w-[300px] flex-shrink-0 snap-start group rounded-xl border border-muted-foreground/20 bg-card/40 backdrop-blur-md overflow-hidden hover:border-muted-foreground/40 transition-all duration-300"
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
                  <span className="absolute top-3 left-3 bg-[#86BC25] text-background text-[10px] font-medium uppercase tracking-wider px-2 py-1 rounded-full">
                    Featured
                  </span>
                )}
              </div>
              <div className="p-4">
                <h3 className="text-sm font-medium mb-1 text-foreground group-hover:text-muted-foreground transition-colors line-clamp-1">
                  {event.name}
                </h3>
                <p className="text-xs text-muted-foreground mb-3 line-clamp-2 leading-relaxed">
                  {event.description}
                </p>
                <div className="space-y-1.5 mb-3">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Calendar className="h-3 w-3 text-[#86BC25]" />
                    <span>{formatDate(event.event_date)}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <MapPin className="h-3 w-3 text-[#86BC25]" />
                    <span className="line-clamp-1">{event.location}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-muted-foreground/10">
                  <span className="text-sm font-semibold text-foreground">
                    From {formatPrice(event.ticket_price)}
                  </span>
                  <Link
                    href={`/tickets?event=${event.id}`}
                    className="text-[10px] font-medium uppercase tracking-wider text-[#86BC25] hover:text-[#86BC25]/70 transition-colors inline-flex items-center gap-1"
                  >
                    Tickets
                    <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              </div>
            </div>
          ))}

          {/* View All Card */}
          <Link
            href="/events"
            className="min-w-[300px] max-w-[300px] flex-shrink-0 snap-start rounded-xl border border-dashed border-muted-foreground/20 bg-card/20 backdrop-blur-md flex flex-col items-center justify-center p-8 hover:border-muted-foreground/40 hover:bg-card/40 transition-all duration-300"
          >
            <div className="h-10 w-10 rounded-full border border-muted-foreground/30 flex items-center justify-center mb-4">
              <ArrowRight className="h-4 w-4 text-muted-foreground" />
            </div>
            <span className="text-sm font-medium text-foreground mb-1">View All Events</span>
            <span className="text-xs text-muted-foreground">
              See all upcoming conferences
            </span>
          </Link>
        </div>
      </div>
    </section>
  )
}
