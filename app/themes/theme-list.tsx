"use client";

import { Theme } from "@/lib/contentful";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface ThemeListProps {
  initialThemes: Theme[];
}

export function ThemeList({ initialThemes }: ThemeListProps) {
  const [activating, setActivating] = useState<string | null>(null);
  const router = useRouter();

  const handleActivate = async (themeId: string) => {
    setActivating(themeId);
    try {
      const response = await fetch("/api/themes/activate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ themeId }),
      });
      
      if (response.ok) {
        router.refresh();
      } else {
        const data = await response.json();
        alert(`Error: ${data.error || "Failed to activate theme"}`);
      }
    } catch (error) {
      alert(`Error: ${error}`);
    } finally {
      setActivating(null);
    }
  };

  if (initialThemes.length === 0) {
    return (
      <Card>
        <CardContent className="py-8 text-center text-muted-foreground">
          No themes found in Contentful. Create one using the button above!
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid gap-4">
      {initialThemes.map((theme) => (
        <Card key={theme.id}>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">{theme.name}</CardTitle>
              <div className="flex items-center gap-2">
                {theme.isActive ? (
                  <Badge variant="default">Active</Badge>
                ) : (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleActivate(theme.id)}
                    disabled={activating === theme.id}
                  >
                    {activating === theme.id ? "Activating..." : "Activate"}
                  </Button>
                )}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              <ColorSwatch label="Background" color={theme.backgroundColor} />
              <ColorSwatch label="Primary" color={theme.primaryColor} />
              {theme.accentColor && (
                <ColorSwatch label="Accent" color={theme.accentColor} />
              )}
              {theme.foregroundColor && (
                <ColorSwatch label="Foreground" color={theme.foregroundColor} />
              )}
              {theme.borderColor && (
                <ColorSwatch label="Border" color={theme.borderColor} />
              )}
            </div>
            <p className="text-xs text-muted-foreground mt-3">
              ID: {theme.id}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

function ColorSwatch({ label, color }: { label: string; color: string }) {
  return (
    <div className="space-y-1">
      <div 
        className="h-8 rounded border border-border"
        style={{ backgroundColor: color }}
      />
      <p className="text-xs text-muted-foreground">{label}</p>
    </div>
  );
}
