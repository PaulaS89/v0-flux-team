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
    question: "What is FLUX?",
    answer:
      "FLUX brings together developers, community members, business leaders, and partners for a day of learning, connection, and inspiration. Hear what's new at FLUX, learn from real-world customer stories, and explore the latest innovations shaping the web.",
  },
  {
    question: "What's the difference between the in-person and virtual experience?",
    answer:
      "The in-person experience includes access to all talks, networking events, lunch, and exclusive swag. Virtual attendees can watch all sessions live, participate in Q&A, and access recordings afterward.",
  },
  {
    question: "When will the full agenda be announced?",
    answer:
      "The full agenda will be announced approximately 4 weeks before the event. Early bird ticket holders will receive early access to the schedule.",
  },
  {
    question: "Can I participate as a sponsor of the event?",
    answer:
      "Yes! We offer various sponsorship packages. Please reach out to our partnerships team at sponsors@flux.dev for more information.",
  },
  {
    question: "What's the refund and cancellation policy?",
    answer:
      "Full refunds are available up to 14 days before the event. After that, tickets can be transferred to another attendee. Contact support@flux.dev for assistance.",
  },
  {
    question: "Can I request an accommodation to attend the event?",
    answer:
      "Absolutely. We're committed to making FLUX accessible to everyone. Please reach out to accessibility@flux.dev with your specific needs and we'll work with you.",
  },
  {
    question: "I have additional questions that weren't covered here, who can I contact?",
    answer:
      "For any other questions, please email hello@flux.dev and our team will get back to you within 24-48 hours.",
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
