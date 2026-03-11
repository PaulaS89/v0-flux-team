import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { ContentfulThemeProvider } from '@/components/contentful-theme-provider'
import { getActiveTheme } from '@/lib/contentful'
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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const theme = await getActiveTheme();

  return (
    <html lang="en" className="dark">
      <body className="font-sans antialiased bg-background text-foreground">
        <ContentfulThemeProvider theme={theme}>
          {children}
        </ContentfulThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
