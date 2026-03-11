"use client";

import { useState } from "react";
import { Plus } from "lucide-react";

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
    <section id="faq" className="bg-card px-6 py-16">
      <div className="mx-auto max-w-7xl">
        {/* Title - aligned with speakers/pricing */}
        <h2 className="mb-8 ml-6 text-3xl font-light tracking-tight md:text-4xl">
          FAQ
        </h2>

        {/* Questions grid - with matching margins */}
        <div className="mx-6 grid gap-0 md:grid-cols-2">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div 
                key={index} 
                className={`border-b border-border ${index % 2 === 0 ? 'md:border-r md:pr-8' : 'md:pl-8'}`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="flex w-full items-center justify-between py-6 text-left group"
                >
                  <h3 className="text-base md:text-lg font-normal pr-4 group-hover:text-muted-foreground transition-colors">
                    {faq.question}
                  </h3>
                  <Plus
                    className={`h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200 ${
                      isOpen ? "rotate-45" : ""
                    }`}
                  />
                </button>
                <div 
                  className={`overflow-hidden transition-all duration-300 ${
                    isOpen ? "max-h-40 pb-6" : "max-h-0"
                  }`}
                >
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
