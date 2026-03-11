import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PricingTier } from "@/lib/contentful";

const defaultPricing: PricingTier[] = [
  {
    id: "1",
    name: "Standard Admission",
    price: "€249",
    description: "Full access to all sessions",
    features: ["Full day access", "Breakfast & lunch", "Session recordings", "Networking"],
    isHighlighted: false,
    ctaText: "Register",
    order: 1,
  },
  {
    id: "2",
    name: "Deloitte Clients",
    price: "€149",
    description: "Exclusive client pricing",
    features: ["Full day access", "Breakfast & lunch", "Session recordings", "Priority seating", "Executive networking"],
    isHighlighted: true,
    ctaText: "Register",
    order: 2,
  },
  {
    id: "3",
    name: "Startups & Scaleups",
    price: "€99",
    description: "Special rate for qualifying organizations",
    features: ["Full day access", "Breakfast & lunch", "Session recordings"],
    isHighlighted: false,
    ctaText: "Apply",
    order: 3,
  },
  {
    id: "4",
    name: "Deloitte Alumni",
    price: "€179",
    description: "Alumni network pricing",
    features: ["Full day access", "Breakfast & lunch", "Session recordings", "Alumni networking"],
    isHighlighted: false,
    ctaText: "Register",
    order: 4,
  },
];

interface EventPricingProps {
  pricing?: PricingTier[];
}

export function EventPricing({ pricing }: EventPricingProps) {
  const pricingTiers = pricing && pricing.length > 0 ? pricing : defaultPricing;

  return (
    <section id="pricing" className="bg-background px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <h2 className="mb-4 text-3xl font-light tracking-tight md:text-4xl">
          Pricing
        </h2>
        <p className="mb-16 text-muted-foreground">
          Price includes breakfast, lunch, materials, and access to session recordings.
        </p>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {pricingTiers.map((tier) => (
            <Card
              key={tier.id}
              className={`border-border bg-secondary transition-colors hover:border-foreground/50 ${
                tier.isHighlighted ? "ring-2 ring-primary" : ""
              }`}
            >
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-medium">{tier.name}</CardTitle>
                  {tier.isHighlighted && (
                    <Badge variant="default" className="text-xs">
                      Popular
                    </Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <p className="mb-2 text-3xl font-bold text-primary">{tier.price}</p>
                {tier.description && (
                  <p className="mb-4 text-sm text-muted-foreground">{tier.description}</p>
                )}
                {tier.features && tier.features.length > 0 && (
                  <ul className="mb-4 space-y-1 text-xs text-muted-foreground">
                    {tier.features.map((feature, idx) => (
                      <li key={idx}>• {feature}</li>
                    ))}
                  </ul>
                )}
                <Button className="mt-2 w-full" variant={tier.isHighlighted ? "default" : "outline"}>
                  {tier.ctaText || "Register"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
