import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    id: 1,
    question: "How do I book a trip?",
    answer: "Booking is simple! Browse our destinations, select your preferred location, choose your dates, and fill in the booking form. You'll be redirected to our secure payment page to complete your reservation.",
  },
  {
    id: 2,
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards (Visa, MasterCard, American Express) and PayPal. All transactions are processed through our secure payment gateway to ensure your financial information is protected.",
  },
  {
    id: 3,
    question: "Can I cancel or modify my booking?",
    answer: "Yes! You can cancel your booking up to 7 days before your departure date for a full refund. Modifications are allowed based on availability. Contact our support team for assistance with any changes.",
  },
  {
    id: 4,
    question: "Do you offer travel insurance?",
    answer: "Yes, we highly recommend purchasing travel insurance for your peace of mind. We offer comprehensive travel insurance packages that cover trip cancellations, medical emergencies, and baggage protection.",
  },
  {
    id: 5,
    question: "What's included in the travel packages?",
    answer: "Our holiday packages typically include flights, accommodation, transfers, breakfast, and guided tours. Exact inclusions vary by package - check the detailed description for each destination to see what's included.",
  },
  {
    id: 6,
    question: "How do I contact customer support?",
    answer: "You can reach our 24/7 customer support via email at support@travelwise.com, phone at +1 (555) 123-4567, or through the live chat on our website. We're here to help with any questions or concerns!",
  },
];

const FAQSection = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-muted-foreground">
              Everything you need to know about booking with TravelWise
            </p>
          </div>

          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqs.map((faq) => (
              <AccordionItem
                key={faq.id}
                value={`item-${faq.id}`}
                className="border rounded-lg px-4 bg-card"
              >
                <AccordionTrigger className="text-left font-semibold">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;

