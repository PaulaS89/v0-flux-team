"use client";

import { useEffect, useState } from "react";
import type { Theme } from "@/lib/contentful";

interface ContentfulThemeProviderProps {
  children: React.ReactNode;
  theme: Theme | null;
}

// Light mode colors (default - purple highlight)
const lightModeColors = {
  background: "oklch(0.98 0 0)",
  foreground: "oklch(0.12 0 0)",
  card: "oklch(0.96 0 0)",
  muted: "oklch(0.92 0 0)",
  mutedForeground: "#525252",
  border: "oklch(0.85 0 0)",
  primary: "oklch(0.55 0.25 300)", // Purple highlight color
  primaryForeground: "oklch(0.98 0 0)",
};

// Light mode colors for Ocean Blue theme (red highlight from brand)
const lightModeColorsOceanBlue = {
  ...lightModeColors,
  primary: "#8B2942", // Burgundy red
  primaryForeground: "oklch(0.98 0 0)",
};

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
  const [isLightMode, setIsLightMode] = useState(false);

  // Listen for light/dark mode changes
  useEffect(() => {
    const root = document.documentElement;
    
    const checkMode = () => {
      const hasLight = root.classList.contains("light");
      const hasDark = root.classList.contains("dark");
      setIsLightMode(hasLight && !hasDark);
    };
    
    // Check initial state
    checkMode();
    
    // Watch for class changes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === "class") {
          checkMode();
        }
      });
    });
    
    observer.observe(root, { attributes: true, attributeFilter: ["class"] });
    
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    
    // If light mode, apply light colors
    if (isLightMode) {
      // Check if ocean blue theme is active
      const isOceanBlue = theme?.name?.toLowerCase().includes('ocean');
      const colors = isOceanBlue ? lightModeColorsOceanBlue : lightModeColors;
      
      root.style.setProperty("--background", colors.background);
      root.style.setProperty("--foreground", colors.foreground);
      root.style.setProperty("--card", colors.card);
      root.style.setProperty("--card-foreground", colors.foreground);
      root.style.setProperty("--popover", colors.background);
      root.style.setProperty("--popover-foreground", colors.foreground);
      root.style.setProperty("--muted", colors.muted);
      root.style.setProperty("--muted-foreground", colors.mutedForeground);
      root.style.setProperty("--border", colors.border);
      root.style.setProperty("--input", colors.muted);
      root.style.setProperty("--primary", colors.primary);
      root.style.setProperty("--primary-foreground", colors.primaryForeground);
      root.style.setProperty("--secondary", colors.muted);
      root.style.setProperty("--secondary-foreground", colors.foreground);
      root.style.setProperty("--accent", colors.muted);
      root.style.setProperty("--accent-foreground", colors.foreground);
      root.style.setProperty("--sidebar", colors.card);
      root.style.setProperty("--sidebar-foreground", colors.foreground);
      root.style.setProperty("--sidebar-border", colors.border);
      root.style.setProperty("--sidebar-primary", colors.primary);
      root.style.setProperty("--sidebar-primary-foreground", colors.primaryForeground);
      root.style.setProperty("--sidebar-accent", colors.muted);
      root.style.setProperty("--sidebar-accent-foreground", colors.foreground);
      root.style.setProperty("--ring", colors.border);
      return;
    }
    
    // Dark mode with Contentful theme
    if (!theme) return;

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
      // Use #D4D4D4 for muted-foreground - accessible on dark backgrounds (WCAG AA)
      root.style.setProperty("--muted-foreground", "#D4D4D4");
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
  }, [theme, isLightMode]);

  return <>{children}</>;
}
