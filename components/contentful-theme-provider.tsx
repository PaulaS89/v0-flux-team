"use client";

import { useEffect } from "react";
import type { Theme } from "@/lib/contentful";

interface ContentfulThemeProviderProps {
  children: React.ReactNode;
  theme: Theme | null;
}

// Helper function to adjust lightness for both OKLCH and HEX colors
function adjustLightness(color: string, amount: number): string {
  // Handle OKLCH colors
  const oklchMatch = color.match(/oklch\(([0-9.]+)\s+([0-9.]+)\s+([0-9.]+)\)/);
  if (oklchMatch) {
    const l = parseFloat(oklchMatch[1]);
    const c = oklchMatch[2];
    const h = oklchMatch[3];
    const newL = Math.min(1, Math.max(0, l + amount));
    return `oklch(${newL.toFixed(3)} ${c} ${h})`;
  }
  
  // Handle HEX colors
  if (color.startsWith('#')) {
    const hex = color.slice(1);
    const r = parseInt(hex.slice(0, 2), 16) / 255;
    const g = parseInt(hex.slice(2, 4), 16) / 255;
    const b = parseInt(hex.slice(4, 6), 16) / 255;
    
    const factor = 1 + amount * 2;
    const newR = Math.min(255, Math.max(0, Math.round(r * factor * 255)));
    const newG = Math.min(255, Math.max(0, Math.round(g * factor * 255)));
    const newB = Math.min(255, Math.max(0, Math.round(b * factor * 255)));
    
    return `#${newR.toString(16).padStart(2, '0')}${newG.toString(16).padStart(2, '0')}${newB.toString(16).padStart(2, '0')}`;
  }
  
  return color;
}

export function ContentfulThemeProvider({ children, theme }: ContentfulThemeProviderProps) {
  useEffect(() => {
    if (!theme) return;

    const root = document.documentElement;

    // Apply background colors
    if (theme.backgroundColor) {
      root.style.setProperty("--background", theme.backgroundColor);
      root.style.setProperty("--card", adjustLightness(theme.backgroundColor, 0.04));
      root.style.setProperty("--popover", adjustLightness(theme.backgroundColor, 0.04));
      root.style.setProperty("--sidebar", adjustLightness(theme.backgroundColor, 0.02));
      root.style.setProperty("--muted", adjustLightness(theme.backgroundColor, 0.09));
      root.style.setProperty("--secondary", adjustLightness(theme.backgroundColor, 0.1));
    }
    
    // Apply primary color
    if (theme.primaryColor) {
      root.style.setProperty("--primary", theme.primaryColor);
      root.style.setProperty("--ring", theme.primaryColor);
      root.style.setProperty("--sidebar-primary", theme.primaryColor);
    }
    
    // Apply accent color
    if (theme.accentColor) {
      root.style.setProperty("--accent", theme.accentColor);
      root.style.setProperty("--sidebar-accent", theme.accentColor);
    }
    
    // Apply foreground colors
    if (theme.foregroundColor) {
      root.style.setProperty("--foreground", theme.foregroundColor);
      root.style.setProperty("--card-foreground", theme.foregroundColor);
      root.style.setProperty("--popover-foreground", theme.foregroundColor);
      root.style.setProperty("--sidebar-foreground", theme.foregroundColor);
      root.style.setProperty("--secondary-foreground", theme.foregroundColor);
      root.style.setProperty("--accent-foreground", theme.foregroundColor);
      root.style.setProperty("--sidebar-accent-foreground", theme.foregroundColor);
      root.style.setProperty("--muted-foreground", adjustLightness(theme.foregroundColor, -0.4));
      // Primary foreground should contrast with primary (usually dark on light primary)
      root.style.setProperty("--primary-foreground", theme.backgroundColor || '#0A0A0A');
    }
    
    // Apply border colors
    if (theme.borderColor) {
      root.style.setProperty("--border", theme.borderColor);
      root.style.setProperty("--input", theme.borderColor);
      root.style.setProperty("--sidebar-border", theme.borderColor);
    }

    return () => {
      // Cleanup when unmounting
      const props = [
        "--background", "--primary", "--accent", "--foreground", "--border",
        "--ring", "--card", "--popover", "--sidebar", "--muted", "--secondary",
        "--sidebar-primary", "--card-foreground", "--popover-foreground",
        "--sidebar-foreground", "--input", "--sidebar-border", "--primary-foreground",
        "--secondary-foreground", "--muted-foreground", "--accent-foreground",
        "--sidebar-accent", "--sidebar-accent-foreground"
      ];
      props.forEach(prop => root.style.removeProperty(prop));
    };
  }, [theme]);

  return <>{children}</>;
}
