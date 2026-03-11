"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ArrowLeft, Ticket, Check } from "lucide-react";

interface UserData {
  id: number;
  name: string;
  email: string;
}

const ticketTypes = [
  {
    id: "standard",
    name: "Standard",
    price: "$299",
    description: "Access to all sessions and workshops",
  },
  {
    id: "vip",
    name: "VIP",
    price: "$599",
    description: "Priority seating, exclusive networking events, and swag bag",
  },
  {
    id: "virtual",
    name: "Virtual",
    price: "$99",
    description: "Full livestream access and recordings",
  },
];

export default function TicketsPage() {
  const router = useRouter();
  const [user, setUser] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    ticketType: "standard",
    dietaryRequirements: "",
  });

  useEffect(() => {
    async function fetchSession() {
      try {
        const response = await fetch("/api/auth/session");
        const data = await response.json();
        if (data.user) {
          setUser(data.user);
          setFormData((prev) => ({
            ...prev,
            name: data.user.name,
            email: data.user.email,
          }));
        }
      } catch (error) {
        console.error("Failed to fetch session:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchSession();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const response = await fetch("/api/tickets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          eventName: "FLUX",
          eventYear: "26",
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to purchase ticket");
      }

      setSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="h-8 w-8 border-2 border-foreground border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (success) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-6">
        <div className="w-full max-w-md text-center">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-foreground">
            <Check className="h-8 w-8 text-background" />
          </div>
          <h1 className="text-2xl font-semibold tracking-tight mb-2">
            Ticket Purchased!
          </h1>
          <p className="text-muted-foreground mb-8">
            Thank you for registering for FLUX 26. A confirmation email has been
            sent to {formData.email}.
          </p>
          <div className="flex flex-col gap-3">
            {user && (
              <Button asChild variant="default">
                <Link href="/profile">View My Events</Link>
              </Button>
            )}
            <Button asChild variant="outline">
              <Link href="/">Back to Home</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-2xl px-6 py-16">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to home
        </Link>

        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Ticket className="h-6 w-6" />
            <h1 className="text-3xl font-semibold tracking-tight">
              Get Your Tickets
            </h1>
          </div>
          <p className="text-muted-foreground">
            Join us at FLUX 26 - the premier tech conference of the year.
          </p>
        </div>

        {error && (
          <div className="mb-6 rounded-lg border border-destructive/50 bg-destructive/10 p-4 text-sm text-destructive">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="space-y-4">
            <h2 className="text-lg font-medium">Select Ticket Type</h2>
            <RadioGroup
              value={formData.ticketType}
              onValueChange={(value) =>
                setFormData({ ...formData, ticketType: value })
              }
              className="grid gap-4"
            >
              {ticketTypes.map((ticket) => (
                <label
                  key={ticket.id}
                  className={`relative flex cursor-pointer rounded-lg border p-4 transition-colors ${
                    formData.ticketType === ticket.id
                      ? "border-foreground bg-muted/50"
                      : "border-border hover:border-muted-foreground"
                  }`}
                >
                  <RadioGroupItem
                    value={ticket.id}
                    className="sr-only"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{ticket.name}</span>
                      <span className="text-lg font-semibold">
                        {ticket.price}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      {ticket.description}
                    </p>
                  </div>
                  {formData.ticketType === ticket.id && (
                    <div className="absolute right-4 top-4">
                      <Check className="h-5 w-5 text-foreground" />
                    </div>
                  )}
                </label>
              ))}
            </RadioGroup>
          </div>

          <div className="space-y-4">
            <h2 className="text-lg font-medium">Attendee Information</h2>
            <div className="grid gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="Enter your full name"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  placeholder="you@example.com"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number (Optional)</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  placeholder="+1 (555) 123-4567"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="dietary">
                  Dietary Requirements (Optional)
                </Label>
                <Textarea
                  id="dietary"
                  value={formData.dietaryRequirements}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      dietaryRequirements: e.target.value,
                    })
                  }
                  placeholder="Any allergies or dietary restrictions?"
                  rows={3}
                />
              </div>
            </div>
          </div>

          <Button
            type="submit"
            className="w-full"
            size="lg"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <span className="h-4 w-4 border-2 border-background border-t-transparent rounded-full animate-spin mr-2" />
                Processing...
              </>
            ) : (
              <>
                Purchase Ticket -{" "}
                {ticketTypes.find((t) => t.id === formData.ticketType)?.price}
              </>
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}
