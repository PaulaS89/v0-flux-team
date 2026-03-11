"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Ticket, Calendar, LogOut } from "lucide-react";

interface UserData {
  id: number;
  name: string;
  email: string;
}

interface TicketData {
  id: number;
  attendee_name: string;
  attendee_email: string;
  ticket_type: string;
  event_name: string;
  event_date: string;
  created_at: string;
}

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<UserData | null>(null);
  const [tickets, setTickets] = useState<TicketData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch user session
        const sessionResponse = await fetch("/api/auth/session");
        const sessionData = await sessionResponse.json();

        if (!sessionData.user) {
          router.push("/login");
          return;
        }

        setUser(sessionData.user);

        // Fetch user's tickets
        const ticketsResponse = await fetch("/api/tickets");
        const ticketsData = await ticketsResponse.json();

        if (ticketsData.tickets) {
          // If no tickets, redirect to events page
          if (ticketsData.tickets.length === 0) {
            router.push("/events");
            return;
          }
          setTickets(ticketsData.tickets);
        }
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, [router]);

  async function handleLogout() {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      router.push("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  }

  function formatDate(dateString: string) {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }

  function getTicketTypeLabel(type: string) {
    const types: Record<string, string> = {
      standard: "Standard",
      vip: "VIP",
      virtual: "Virtual",
    };
    return types[type] || type;
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="h-8 w-8 border-2 border-foreground border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-4xl px-6 py-16">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to home
        </Link>

        <div className="mb-8">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-2xl font-semibold tracking-tight mb-1">
                My Tickets
              </h1>
              <p className="text-muted-foreground">
                Welcome back, {user.name}
              </p>
            </div>
            <Button variant="outline" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Log out
            </Button>
          </div>
        </div>

        <div>
          <div className="grid gap-4">
            {tickets.map((ticket) => (
              <div
                key={ticket.id}
                className="rounded-lg border border-border p-6 hover:border-muted-foreground transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-lg font-semibold">
                        {ticket.event_name}
                      </h3>
                      <span className="inline-flex items-center rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium">
                        {getTicketTypeLabel(ticket.ticket_type)}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Registered as {ticket.attendee_name}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      {formatDate(ticket.event_date)}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Button asChild variant="outline">
              <Link href="/events">
                <Ticket className="h-4 w-4 mr-2" />
                Browse More Events
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
