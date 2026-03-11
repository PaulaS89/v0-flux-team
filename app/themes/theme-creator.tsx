"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/navigation";

const BLUE_THEME = {
  name: "Blue Ocean",
  backgroundColor: "oklch(0.15 0.05 230)",
  primaryColor: "oklch(0.65 0.2 230)",
  accentColor: "oklch(0.7 0.15 200)",
  foregroundColor: "oklch(0.95 0 0)",
  borderColor: "oklch(0.3 0.05 230)",
  isActive: true,
};

export function ThemeCreator() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<{ success: boolean; message: string } | null>(null);
  const router = useRouter();

  const createBlueTheme = async () => {
    setIsLoading(true);
    setResult(null);

    try {
      const response = await fetch("/api/themes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(BLUE_THEME),
      });

      const data = await response.json();

      if (response.ok) {
        setResult({ success: true, message: "Blue Ocean theme created successfully!" });
        router.refresh();
      } else {
        setResult({ success: false, message: data.error || "Failed to create theme" });
      }
    } catch (error) {
      setResult({ success: false, message: "Network error: " + (error instanceof Error ? error.message : "Unknown error") });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Blue Ocean Theme</CardTitle>
        <CardDescription>
          A deep blue theme with cyan accents
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <ColorPreview label="Background" color={BLUE_THEME.backgroundColor} />
          <ColorPreview label="Primary" color={BLUE_THEME.primaryColor} />
          <ColorPreview label="Accent" color={BLUE_THEME.accentColor} />
          <ColorPreview label="Foreground" color={BLUE_THEME.foregroundColor} />
          <ColorPreview label="Border" color={BLUE_THEME.borderColor} />
        </div>

        <Button 
          onClick={createBlueTheme} 
          disabled={isLoading}
          className="w-full"
        >
          {isLoading ? "Creating..." : "Create Blue Theme in Contentful"}
        </Button>

        {result && (
          <div className={`p-3 rounded-md ${result.success ? "bg-green-500/10 text-green-500" : "bg-red-500/10 text-red-500"}`}>
            {result.message}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function ColorPreview({ label, color }: { label: string; color: string }) {
  return (
    <div className="space-y-1">
      <div 
        className="h-12 rounded-md border border-border"
        style={{ backgroundColor: color }}
      />
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="text-xs font-mono truncate">{color}</p>
    </div>
  );
}
