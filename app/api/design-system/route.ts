import { NextResponse } from "next/server"
import { getDesignSystem, designSystemToCssVars } from "@/lib/contentful"

export async function GET() {
  try {
    const designSystem = await getDesignSystem()
    
    if (!designSystem) {
      return NextResponse.json({ cssVars: {}, raw: null })
    }

    const cssVars = designSystemToCssVars(designSystem)
    
    return NextResponse.json({
      cssVars,
      raw: {
        name: designSystem.fields.name,
        headingFont: designSystem.fields.headingFont,
        bodyFont: designSystem.fields.bodyFont,
        isDarkMode: designSystem.fields.isDarkMode,
      },
    })
  } catch (error) {
    console.error("Error fetching design system:", error)
    return NextResponse.json({ cssVars: {}, raw: null }, { status: 500 })
  }
}
