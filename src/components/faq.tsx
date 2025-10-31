"use client";

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import type { Dictionary } from "@/get-dictionary";
  
  
export default function Faq({ dictionary }: { dictionary: Dictionary }) {
    return (
        <section className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-8">
            <h2 className="text-3xl font-bold text-center mb-6">{dictionary.faq_title}</h2>
            <Accordion type="single" collapsible className="w-full">
                {dictionary.faq.map((item, index) => (
                <AccordionItem value={`item-${index}`} key={index}>
                    <AccordionTrigger className="text-lg text-left">{item.question}</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                    {item.answer}
                    </AccordionContent>
                </AccordionItem>
                ))}
            </Accordion>
        </section>
    );
}
