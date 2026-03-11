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
    question: "Wo findet das Event statt?",
    answer:
      "FLUX 26 findet in der Kulturbrauerei in Berlin statt. Die genaue Adresse ist Schoenhauser Allee 36, 10435 Berlin. Es gibt auch eine Online-Teilnahmemoeglichkeit.",
  },
  {
    question: "Gibt es eine Moeglichkeit online teilzunehmen?",
    answer:
      "Ja! Wir bieten einen kostenlosen Online-Stream an. Sie koennen alle Vortraege live verfolgen und an Q&A-Sessions teilnehmen.",
  },
  {
    question: "Was ist im Ticketpreis enthalten?",
    answer:
      "Das Ticket beinhaltet Zugang zu allen Vortraegen, Mittagessen, Kaffeepausen, Networking-Events und Zugang zu den Aufzeichnungen nach dem Event.",
  },
  {
    question: "Kann ich mein Ticket stornieren?",
    answer:
      "Tickets koennen bis 14 Tage vor dem Event vollstaendig erstattet werden. Danach ist eine Uebertragung auf eine andere Person moeglich.",
  },
  {
    question: "Gibt es einen Dresscode?",
    answer:
      "Nein, es gibt keinen Dresscode. Kommen Sie so, wie Sie sich wohlfuehlen - ob casual oder business.",
  },
  {
    question: "Werden die Vortraege aufgezeichnet?",
    answer:
      "Ja, alle Vortraege werden aufgezeichnet und sind nach dem Event fuer Ticketinhaber 12 Monate lang verfuegbar.",
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
          Haeufig gestellte Fragen
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
