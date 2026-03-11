"use client";

import { useState } from "react";
import { Plus } from "lucide-react";

interface FaqItem {
  question: string;
  answer: string;
}

// Default fallback FAQs - limited to 6
const defaultFaqs: FaqItem[] = [
  {
    question: "Who should attend FLUX?",
    answer:
      "FLUX is designed for executives, digital leaders, product owners, CX/UX professionals, and transformation managers looking to understand how AI is reshaping design and user experience.",
  },
  {
    question: "What language are the sessions in?",
    answer:
      "The main sessions and keynotes are conducted in English. Select breakout sessions and workshops offer both English and German options.",
  },
  {
    question: "Will I receive session recordings?",
    answer:
      "Yes, all registered participants receive access to slides, session summaries, and full video recordings within 48 hours of the event.",
  },
  {
    question: "What is included in the ticket price?",
    answer:
      "Your ticket includes full conference access, breakfast, networking lunch, coffee breaks, all materials, and post-event session recordings.",
  },
  {
    question: "Can I transfer or cancel my ticket?",
    answer:
      "Tickets are transferable to a colleague up to 48 hours before the event. Cancellations are accepted up to 14 days before for a full refund.",
  },
  {
    question: "Is there parking available?",
    answer:
      "Yes, the venue offers underground parking. We also recommend public transport - the venue is a 5-minute walk from the main station.",
  },
];

interface EventFAQProps {
  items?: FaqItem[];
}

export function EventFAQ({ items }: EventFAQProps) {
  // Use provided items or defaults, limit to 6
  const allFaqs = items && items.length > 0 ? items : defaultFaqs;
  const faqs = allFaqs.slice(0, 6);
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="bg-background px-8 md:px-16 lg:px-24 py-16">
      <div className="mx-auto max-w-6xl">
        {/* Header - matching site style */}
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl md:text-4xl font-medium tracking-[0.02em] text-foreground">
            FREQUENTLY ASKED QUESTIONS
          </h2>
          <p className="text-muted-foreground text-sm md:text-base tracking-wide">
            Everything you need to know about attending FLUX.
          </p>
        </div>

        {/* Questions - styled as bordered cards like the rest of the site */}
        <div className="grid gap-3 md:grid-cols-2">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div 
                key={index} 
                className="rounded-xl border border-muted-foreground/20 bg-card/40 backdrop-blur-md transition-all duration-300 hover:border-muted-foreground/40"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="flex w-full items-center justify-between p-5 text-left group"
                >
                  <h3 className="text-sm font-medium pr-4 text-foreground group-hover:text-muted-foreground transition-colors">
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
                    isOpen ? "max-h-48 pb-5" : "max-h-0"
                  }`}
                >
                  <p className="text-xs text-muted-foreground leading-relaxed px-5">
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
