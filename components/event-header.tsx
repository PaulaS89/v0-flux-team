"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowRight, LogOut, User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface SiteSettings {
  eventName: string;
  eventYear: string;
  tagline?: string;
}

interface EventHeaderProps {
  siteSettings?: SiteSettings | null;
}

interface UserData {
  id: number;
  name: string;
  email: string;
}

export function EventHeader({ siteSettings }: EventHeaderProps) {
  const router = useRouter();
  const eventName = siteSettings?.eventName || "FLUX";
  const eventYear = siteSettings?.eventYear || "26";
  const [user, setUser] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchSession() {
      try {
        const response = await fetch("/api/auth/session");
        const data = await response.json();
        console.log("[v0] Session response:", data);
        setUser(data.user);
      } catch (error) {
        console.error("[v0] Failed to fetch session:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchSession();
  }, []);

  async function handleLogout() {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      setUser(null);
      router.refresh();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/95 backdrop-blur-sm">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-6">
        <nav className="hidden md:flex items-center gap-8">
          <Link
            href="#schedule"
            className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-foreground"
          >
            Agenda
          </Link>
          <Link
            href="#speakers"
            className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-foreground"
          >
            Speakers
          </Link>
          <Link
            href="#faq"
            className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-foreground"
          >
            FAQ
          </Link>
        </nav>

        <Link href="/" className="absolute left-1/2 -translate-x-1/2">
          <span className="text-lg font-semibold tracking-tight">
            {eventName}{" "}
            <span className="inline-flex items-center justify-center border border-foreground px-1.5 py-0.5 text-[10px] font-medium">
              {eventYear}
            </span>
          </span>
        </Link>

        <div className="flex items-center gap-6">
          {isLoading ? (
            <div className="h-4 w-20 bg-muted animate-pulse rounded" />
          ) : user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="hidden md:flex items-center gap-2 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-foreground">
                  <User className="h-4 w-4" />
                  {user.name}
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link href="/profile">
                    <User className="mr-2 h-4 w-4" />
                    My Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Link
                href="/signup"
                className="hidden md:block text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-foreground"
              >
                Sign Up
              </Link>
              <Link
                href="/login"
                className="hidden md:block text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-foreground"
              >
                Login
              </Link>
            </>
          )}
          <Link
            href="/tickets"
            className="group hidden lg:flex items-center gap-2 border border-foreground bg-foreground px-4 py-2 text-background transition-all hover:bg-transparent hover:text-foreground"
          >
            <span className="text-xs font-medium uppercase tracking-[0.15em]">
              Get Tickets
            </span>
            <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </header>
  );
}
