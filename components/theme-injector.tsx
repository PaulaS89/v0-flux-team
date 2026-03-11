"use client"

import { useEffect } from "react"

interface ThemeInjectorProps {
  cssVars: Record<string, string>
}

export function ThemeInjector({ cssVars }: ThemeInjectorProps) {
  useEffect(() => {
    if (!cssVars || Object.keys(cssVars).length === 0) return

    const root = document.documentElement

    // Apply CSS variables to :root
    Object.entries(cssVars).forEach(([key, value]) => {
      root.style.setProperty(key, value)
    })

    // Cleanup on unmount
    return () => {
      Object.keys(cssVars).forEach((key) => {
        root.style.removeProperty(key)
      })
    }
  }, [cssVars])

  return null
}
