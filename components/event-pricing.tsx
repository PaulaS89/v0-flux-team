"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface PricingTier {
  name: string;
  price: string;
  description?: string;
  featured?: boolean;
}

const defaultPricing: PricingTier[] = [
  {
    name: "Standard Admission",
    price: "€249",
    description: "Full access to all sessions",
  },
  {
    name: "Deloitte Clients",
    price: "€149",
    description: "Exclusive client pricing",
    featured: true,
  },
  {
    name: "Startups & Non-profits",
    price: "€99",
    description: "Special rate for qualifying organizations",
  },
  {
    name: "Deloitte Alumni",
    price: "Complimentary",
    description: "Limited seats available",
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
          {pricingTiers.map((tier, index) => (
            <Card
              key={index}
              className={`border-border bg-secondary transition-colors hover:border-foreground/50 ${
                tier.featured ? "ring-2 ring-primary" : ""
              }`}
            >
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-medium">{tier.name}</CardTitle>
                  {tier.featured && (
                    <Badge variant="default" className="text-xs">
                      Popular
                    </Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <p className="mb-2 text-3xl font-bold text-primary">{tier.price}</p>
                {tier.description && (
                  <p className="text-sm text-muted-foreground">{tier.description}</p>
                )}
                <Button className="mt-6 w-full" variant={tier.featured ? "default" : "outline"}>
                  Register
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
