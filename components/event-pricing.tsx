import { Button } from "@/components/ui/button";
import { PricingTier } from "@/lib/contentful";
import { ArrowRight, Check } from "lucide-react";

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
    <section id="pricing" className="relative bg-card px-6 pt-4 pb-24 overflow-hidden">
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent pointer-events-none" />
      
      <div className="relative mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-16 ml-6">
          <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground mb-3">
            Tickets
          </p>
          <h2 className="text-4xl font-light tracking-tight md:text-5xl text-foreground mb-4">
            Pricing
          </h2>
          <p className="text-muted-foreground max-w-xl">
            Price includes breakfast, lunch, materials, and access to session recordings.
          </p>
        </div>

        {/* Pricing Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mx-6">
          {pricingTiers.map((tier) => (
            <div
              key={tier.id}
              className={`group relative flex flex-col h-full rounded-2xl border border-border/50 bg-background/40 backdrop-blur-sm p-6 transition-all duration-300 hover:border-border hover:shadow-lg ${
                tier.isHighlighted ? "border-primary/50 bg-primary/5" : ""
              }`}
            >
              {/* Highlighted badge */}
              {tier.isHighlighted && (
                <div className="absolute -top-3 left-6">
                  <span className="rounded-full bg-primary px-3 py-1 text-[10px] font-medium uppercase tracking-wider text-primary-foreground">
                    Recommended
                  </span>
                </div>
              )}

              {/* Tier name */}
              <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground mb-4">
                {tier.name}
              </p>

              {/* Price */}
              <div className="mb-4">
                <span className="text-4xl font-light text-foreground">{tier.price}</span>
              </div>

              {/* Description */}
              {tier.description && (
                <p className="text-sm text-muted-foreground mb-6 min-h-[40px]">
                  {tier.description}
                </p>
              )}

              {/* Features */}
              {tier.features && tier.features.length > 0 && (
                <ul className="flex-grow space-y-2 mb-8">
                  {tier.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <Check className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              )}

              {/* CTA Button - always at bottom */}
              <div className="mt-auto">
                <Button 
                  className={`w-full group/btn flex items-center justify-center gap-2 border transition-all ${
                    tier.isHighlighted 
                      ? "border-foreground bg-foreground text-background hover:bg-transparent hover:text-foreground" 
                      : "border-border bg-transparent text-foreground hover:border-foreground hover:bg-foreground hover:text-background"
                  }`}
                  asChild
                >
                  <a href="/tickets">
                    <span className="text-xs font-medium uppercase tracking-[0.15em]">
                      {tier.ctaText || "Register"}
                    </span>
                    <ArrowRight className="h-3 w-3 transition-transform group-hover/btn:translate-x-0.5" />
                  </a>
                </Button>
              </div>

              {/* Subtle glow on hover */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 pointer-events-none" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
