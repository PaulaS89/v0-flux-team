import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })

export const metadata: Metadata = {
  title: "FLUX Team Learnings",
  description: "Unsere Learnings aus dem Zusammenspiel von v0, Contentful, Figma und GitHub",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="de">
      <body className={`${inter.variable} font-sans antialiased`}>{children}</body>
    </html>
  )
}
