import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { ContentfulThemeProvider } from '@/components/contentful-theme-provider'
import { getActiveTheme, Theme } from '@/lib/contentful'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'Future of Digital Experiences | Deloitte Executive Briefing',
  description: 'A Deloitte Executive Briefing exploring hyper-personalization, AI-driven interfaces, and connected ecosystems. Frankfurt, 16 April 2026.',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

// Helper function to adjust lightness for derived colors
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
  
  // Handle HEX colors - convert to OKLCH-like adjustments
  if (color.startsWith('#')) {
    const hex = color.slice(1);
    const r = parseInt(hex.slice(0, 2), 16) / 255;
    const g = parseInt(hex.slice(2, 4), 16) / 255;
    const b = parseInt(hex.slice(4, 6), 16) / 255;
    
    // Simple lightness adjustment for hex colors
    const factor = 1 + amount * 2;
    const newR = Math.min(255, Math.max(0, Math.round(r * factor * 255)));
    const newG = Math.min(255, Math.max(0, Math.round(g * factor * 255)));
    const newB = Math.min(255, Math.max(0, Math.round(b * factor * 255)));
    
    return `#${newR.toString(16).padStart(2, '0')}${newG.toString(16).padStart(2, '0')}${newB.toString(16).padStart(2, '0')}`;
  }
  
  return color;
}

// Generate CSS custom properties from theme
function generateThemeStyles(theme: Theme): string {
  const styles: string[] = [];
  
  if (theme.backgroundColor) {
    styles.push(`--background: ${theme.backgroundColor}`);
    styles.push(`--card: ${adjustLightness(theme.backgroundColor, 0.04)}`);
    styles.push(`--popover: ${adjustLightness(theme.backgroundColor, 0.04)}`);
    styles.push(`--sidebar: ${adjustLightness(theme.backgroundColor, 0.02)}`);
    styles.push(`--muted: ${adjustLightness(theme.backgroundColor, 0.09)}`);
    styles.push(`--secondary: ${adjustLightness(theme.backgroundColor, 0.1)}`);
  }
  
  if (theme.primaryColor) {
    styles.push(`--primary: ${theme.primaryColor}`);
    styles.push(`--ring: ${theme.primaryColor}`);
    styles.push(`--sidebar-primary: ${theme.primaryColor}`);
  }
  
  if (theme.accentColor) {
    styles.push(`--accent: ${theme.accentColor}`);
    styles.push(`--sidebar-accent: ${theme.accentColor}`);
  }
  
  if (theme.foregroundColor) {
    styles.push(`--foreground: ${theme.foregroundColor}`);
    styles.push(`--card-foreground: ${theme.foregroundColor}`);
    styles.push(`--popover-foreground: ${theme.foregroundColor}`);
    styles.push(`--sidebar-foreground: ${theme.foregroundColor}`);
    styles.push(`--primary-foreground: ${theme.backgroundColor || '#0A0A0A'}`);
    styles.push(`--secondary-foreground: ${theme.foregroundColor}`);
    styles.push(`--accent-foreground: ${theme.foregroundColor}`);
    styles.push(`--sidebar-accent-foreground: ${theme.foregroundColor}`);
  }
  
  // Always ensure muted-foreground is accessible on dark backgrounds (WCAG AA compliant)
  // #D4D4D4 provides ~10:1 contrast ratio on black
  styles.push(`--muted-foreground: #D4D4D4`);
  
  if (theme.borderColor) {
    styles.push(`--border: ${theme.borderColor}`);
    styles.push(`--input: ${theme.borderColor}`);
    styles.push(`--sidebar-border: ${theme.borderColor}`);
  }
  
  return styles.join('; ');
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const theme = await getActiveTheme();
  const themeStyles = theme ? generateThemeStyles(theme) : '';

  return (
    <html lang="en">
      <head>
        <style dangerouslySetInnerHTML={{ __html: `:root { --muted-foreground: #D4D4D4; ${themeStyles} }` }} />
      </head>
      <body className="font-sans antialiased">
        <ContentfulThemeProvider theme={theme}>
          {children}
        </ContentfulThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
