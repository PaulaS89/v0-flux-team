"use client";

import { useState } from "react";
import { Plus, X } from "lucide-react";

interface FaqItem {
  question: string;
  answer: string;
}

// Default fallback FAQs
const defaultFaqs: FaqItem[] = [
  {
    question: "Who should attend?",
    answer:
      "Executives, digital leaders, product owners, CX/UX professionals, and transformation managers.",
  },
  {
    question: "Is the event in English or German?",
    answer:
      "The main sessions are in English; breakout sessions offer English and German options.",
  },
  {
    question: "Will materials be shared afterward?",
    answer:
      "Yes, all registered participants receive slides, summaries, and session recordings.",
  },
  {
    question: "Is there a dress code?",
    answer:
      "Business casual.",
  },
  {
    question: "Can I transfer my ticket?",
    answer:
      "Yes, tickets are transferable up to 48 hours before the event.",
  },
  {
    question: "What is included in the ticket price?",
    answer:
      "Price includes breakfast, lunch, materials, and access to session recordings.",
  },
];

interface EventFAQProps {
  items?: FaqItem[];
}

export function EventFAQ({ items }: EventFAQProps) {
  const faqs = items && items.length > 0 ? items : defaultFaqs;
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="bg-background px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="grid md:grid-cols-12 gap-12">
          {/* Left side - Title */}
          <div className="md:col-span-3">
            <h2 className="text-4xl md:text-5xl font-normal tracking-tight sticky top-24">
              FAQ
            </h2>
          </div>

          {/* Right side - Questions */}
          <div className="md:col-span-9">
            {openIndex === 0 && (
              <div className="mb-8 pb-8 border-b border-border">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-2xl md:text-3xl font-normal mb-4 tracking-tight">
                      {faqs[0].question}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed max-w-2xl">
                      {faqs[0].answer}
                    </p>
                  </div>
                  <button
                    onClick={() => setOpenIndex(null)}
                    className="shrink-0 p-2 text-muted-foreground hover:text-foreground transition-colors"
                    aria-label="Close"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </div>
            )}

            <div className="space-y-0">
              {faqs.slice(openIndex === 0 ? 1 : 0).map((faq, i) => {
                const actualIndex = openIndex === 0 ? i + 1 : i;
                const isOpen = openIndex === actualIndex;

                return (
                  <div key={actualIndex} className="border-b border-border">
                    <button
                      onClick={() => setOpenIndex(isOpen ? null : actualIndex)}
                      className="flex w-full items-center justify-between py-6 text-left group"
                    >
                      <h3 className="text-lg md:text-xl font-normal pr-8 group-hover:text-muted-foreground transition-colors">
                        {faq.question}
                      </h3>
                      <Plus
                        className={`h-5 w-5 shrink-0 text-muted-foreground transition-transform ${
                          isOpen ? "rotate-45" : ""
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="pb-6">
                        <p className="text-muted-foreground leading-relaxed max-w-2xl">
                          {faq.answer}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
