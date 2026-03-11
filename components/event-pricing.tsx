import { Button } from "@/components/ui/button";
import { PricingTier } from "@/lib/contentful";
import { ArrowRight, Check, Sparkles } from "lucide-react";

const defaultPricing: PricingTier[] = [
  {
    id: "1",
    name: "Early Bird",
    price: "€149",
    description: "Limited availability - Book now and save €100 on your ticket",
    features: ["Full day conference access", "Breakfast & networking lunch", "All session recordings", "Conference materials", "Networking reception"],
    isHighlighted: true,
    ctaText: "Secure Your Spot",
    order: 1,
  },
  {
    id: "2",
    name: "Deloitte Clients",
    price: "€99",
    description: "Exclusive pricing for current Deloitte clients and partners",
    features: ["Full day conference access", "Breakfast & networking lunch", "All session recordings", "Conference materials", "Priority seating", "Executive networking lounge"],
    isHighlighted: false,
    ctaText: "Verify & Register",
    order: 2,
  },
  {
    id: "3",
    name: "Regular",
    price: "€249",
    description: "Standard admission after Early Bird period ends",
    features: ["Full day conference access", "Breakfast & networking lunch", "All session recordings", "Conference materials"],
    isHighlighted: false,
    ctaText: "Register",
    order: 3,
  },
  {
    id: "4",
    name: "VIP Experience",
    price: "€499",
    description: "The ultimate FLUX experience with exclusive perks",
    features: ["Full day conference access", "Breakfast & networking lunch", "All session recordings", "Conference materials", "Front row reserved seating", "Speaker meet & greet dinner", "1-on-1 consultation session", "Exclusive VIP gift bag"],
    isHighlighted: false,
    ctaText: "Go VIP",
    order: 4,
  },
];

interface EventPricingProps {
  pricing?: PricingTier[];
}

export function EventPricing({ pricing }: EventPricingProps) {
  const pricingTiers = pricing && pricing.length > 0 ? pricing : defaultPricing;

  return (
    <section id="pricing" className="relative bg-background px-8 md:px-16 lg:px-24 py-16 overflow-hidden">
      <div className="relative mx-auto max-w-6xl">
        {/* Header - matching agenda/speakers style */}
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl md:text-4xl font-medium tracking-[0.02em] text-foreground">
            TICKETS
          </h2>
          <p className="text-muted-foreground text-sm md:text-base tracking-wide">
            Secure your spot at FLUX. All tickets include breakfast, lunch, and session recordings.
          </p>
        </div>

        {/* Pricing Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {pricingTiers.map((tier, index) => {
            const isVIP = tier.name.toLowerCase().includes("vip");
            const isEarlyBird = tier.isHighlighted;
            
            return (
              <div
                key={tier.id}
                className={`group relative flex flex-col h-full rounded-xl border p-5 transition-all duration-300 ${
                  isEarlyBird 
                    ? "border-primary/50 bg-primary/5 hover:border-primary" 
                    : isVIP
                    ? "border-amber-500/30 bg-amber-500/5 hover:border-amber-500/50"
                    : "border-muted-foreground/20 bg-card/40 backdrop-blur-md hover:border-muted-foreground/40 hover:bg-card/60"
                }`}
              >
                {/* Badge */}
                {isEarlyBird && (
                  <div className="absolute -top-3 left-4">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-primary px-3 py-1 text-[10px] font-medium uppercase tracking-wider text-primary-foreground">
                      <Sparkles className="h-3 w-3" />
                      Recommended
                    </span>
                  </div>
                )}
                {isVIP && (
                  <div className="absolute -top-3 left-4">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500 px-3 py-1 text-[10px] font-medium uppercase tracking-wider text-background">
                      <Sparkles className="h-3 w-3" />
                      Premium
                    </span>
                  </div>
                )}

                {/* Tier name */}
                <h3 className={`text-sm font-medium uppercase tracking-wide mb-3 ${isEarlyBird ? "mt-2" : isVIP ? "mt-2" : ""} ${
                  isEarlyBird ? "text-primary" : isVIP ? "text-amber-400" : "text-foreground"
                }`}>
                  {tier.name}
                </h3>

                {/* Price */}
                <div className="mb-2">
                  <span className={`text-3xl font-semibold ${
                    isEarlyBird ? "text-primary" : isVIP ? "text-amber-400" : "text-foreground"
                  }`}>{tier.price}</span>
                </div>

                {/* Description */}
                {tier.description && (
                  <p className="text-xs text-muted-foreground mb-4 leading-relaxed">
                    {tier.description}
                  </p>
                )}

                {/* Features */}
                {tier.features && tier.features.length > 0 && (
                  <ul className="flex-grow space-y-2 mb-5">
                    {tier.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-muted-foreground">
                        <Check className={`h-3.5 w-3.5 mt-0.5 shrink-0 ${
                          isEarlyBird ? "text-primary" : isVIP ? "text-amber-400" : "text-primary"
                        }`} />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {/* CTA Button */}
                <div className="mt-auto">
                  <Button 
                    className={`w-full group/btn flex items-center justify-center gap-2 transition-all h-9 ${
                      isEarlyBird 
                        ? "bg-primary text-primary-foreground hover:bg-primary/90" 
                        : isVIP
                        ? "bg-amber-500 text-background hover:bg-amber-400 border-0"
                        : "border border-muted-foreground/30 bg-transparent text-foreground hover:border-foreground hover:bg-foreground hover:text-background"
                    }`}
                    asChild
                  >
                    <a href="/tickets">
                      <span className="text-xs font-medium tracking-wide">
                        {tier.ctaText || "Register"}
                      </span>
                      <ArrowRight className="h-3 w-3 transition-transform group-hover/btn:translate-x-0.5" />
                    </a>
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
