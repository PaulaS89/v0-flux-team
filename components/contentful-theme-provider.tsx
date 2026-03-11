"use client";

import { useEffect } from "react";
import type { Theme } from "@/lib/contentful";

interface ContentfulThemeProviderProps {
  children: React.ReactNode;
  theme: Theme | null;
}

export function ContentfulThemeProvider({ children, theme }: ContentfulThemeProviderProps) {
  useEffect(() => {
    if (!theme) return;

    const root = document.documentElement;

    // Apply theme colors as CSS custom properties
    if (theme.backgroundColor) {
      root.style.setProperty("--background", theme.backgroundColor);
    }
    if (theme.primaryColor) {
      root.style.setProperty("--primary", theme.primaryColor);
      root.style.setProperty("--ring", theme.primaryColor);
      root.style.setProperty("--sidebar-primary", theme.primaryColor);
    }
    if (theme.accentColor) {
      root.style.setProperty("--accent", theme.accentColor);
    }
    if (theme.foregroundColor) {
      root.style.setProperty("--foreground", theme.foregroundColor);
      root.style.setProperty("--card-foreground", theme.foregroundColor);
      root.style.setProperty("--popover-foreground", theme.foregroundColor);
      root.style.setProperty("--sidebar-foreground", theme.foregroundColor);
    }
    if (theme.borderColor) {
      root.style.setProperty("--border", theme.borderColor);
      root.style.setProperty("--input", theme.borderColor);
      root.style.setProperty("--sidebar-border", theme.borderColor);
    }

    // Derive additional colors from the theme
    if (theme.backgroundColor) {
      root.style.setProperty("--card", adjustLightness(theme.backgroundColor, 0.04));
      root.style.setProperty("--popover", adjustLightness(theme.backgroundColor, 0.04));
      root.style.setProperty("--sidebar", adjustLightness(theme.backgroundColor, 0.02));
      root.style.setProperty("--muted", adjustLightness(theme.backgroundColor, 0.09));
      root.style.setProperty("--secondary", adjustLightness(theme.backgroundColor, 0.1));
    }

    return () => {
      // Cleanup when unmounting
      const props = [
        "--background", "--primary", "--accent", "--foreground", "--border",
        "--ring", "--card", "--popover", "--sidebar", "--muted", "--secondary",
        "--sidebar-primary", "--card-foreground", "--popover-foreground",
        "--sidebar-foreground", "--input", "--sidebar-border"
      ];
      props.forEach(prop => root.style.removeProperty(prop));
    };
  }, [theme]);

  return <>{children}</>;
}

// Helper function to adjust lightness in OKLCH color
function adjustLightness(oklchColor: string, amount: number): string {
  const match = oklchColor.match(/oklch\(([0-9.]+)\s+([0-9.]+)\s+([0-9.]+)\)/);
  if (!match) return oklchColor;

  const l = parseFloat(match[1]);
  const c = match[2];
  const h = match[3];
  const newL = Math.min(1, Math.max(0, l + amount));

  return `oklch(${newL.toFixed(2)} ${c} ${h})`;
}
