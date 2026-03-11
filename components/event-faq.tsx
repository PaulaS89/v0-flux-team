"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

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

  return (
    <section id="faq" className="bg-background px-6 py-24">
      <div className="mx-auto max-w-3xl">
        <h2 className="mb-16 text-3xl font-light tracking-tight md:text-4xl">
          Frequently Asked Questions
        </h2>
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left text-base">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
