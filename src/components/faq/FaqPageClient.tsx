'use client';

import React from 'react';
import { Header } from '@/components/layout/Header';
import { SubtleFooter } from '@/components/layout/SubtleFooter';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { HelpCircle } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import Link from 'next/link';

export function FaqPageClient() {
  const { getTranslation } = useLanguage();
  const [searchQuery, setSearchQuery] = React.useState('');
  const [isScrolled, setIsScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const faqItems = [
    {
      qKey: "faqQ1", qFallback: "What is trvalr?",
      aKey: "faqA1", aFallback: "trvalr is a next-generation travel platform that uses artificial intelligence to help you plan, book, and experience your perfect trip. Simply tell us what you're looking for in natural language, and our AI will create a personalized itinerary complete with flights, accommodations, and activities."
    },
    {
      qKey: "faqQ2", qFallback: "How does the AI itinerary generation work?",
      aKey: "faqA2", aFallback: "You provide a natural language prompt (e.g., 'a 5-day foodie trip to Tokyo for two'). Our AI analyzes your request, understands your intent, and searches through millions of data points to build a customized itinerary that matches your style, budget, and interests."
    },
    {
      qKey: "faqQ3", qFallback: "Can I customize the generated itinerary?",
      aKey: "faqA3", aFallback: "Absolutely! The AI-generated plan is just a starting point. You have full control to edit every aspect of your trip, from swapping hotels and activities to adjusting your daily schedule. You can collaborate with the AI to refine your plan until it's perfect."
    },
    {
      qKey: "faqQ4", qFallback: "Is trvalr free to use?",
      aKey: "faqA4", aFallback: "trvalr offers a free plan that allows you to generate a limited number of trip plans per month. For unlimited planning, advanced AI features, and exclusive deals, we offer a Pro subscription. You can learn more on our subscription page."
    },
    {
      qKey: "faqQ5", qFallback: "How is my data handled?",
      aKey: "faqA5", aFallback: "We take your privacy very seriously. All your personal information and travel plans are securely stored. We only use your data to personalize your experience and improve our services. For more details, please read our full Privacy Policy."
    }
  ];

  return (
    <div className="flex flex-col min-h-screen w-full bg-gradient-to-br from-primary/10 via-background to-accent/10 text-foreground">
      <Header
        isScrolled={isScrolled}
        searchQuery={searchQuery}
        onSearchQueryChange={setSearchQuery}
        onSearchSubmit={() => {}}
        showCurrencySelector={false}
      />
      <main className="flex-grow p-4 sm:p-6 lg:p-8 z-10">
        <div className="container mx-auto max-w-4xl">
          <section className="text-center py-12">
            <HelpCircle className="h-16 w-16 text-primary mx-auto mb-4" />
            <h1 className="font-headline text-4xl sm:text-5xl font-bold mb-4">
              {getTranslation('faqPageTitle', 'Frequently Asked Questions')}
            </h1>
            <p className="text-muted-foreground text-lg">
              {getTranslation('faqPageSubtitle', 'Have questions? We have answers. Find everything you need to know about trvalr.')}
            </p>
          </section>

          <div className="bg-card/30 backdrop-blur-lg border border-border/20 rounded-2xl shadow-xl p-6 sm:p-10">
            <Accordion type="single" collapsible className="w-full">
              {faqItems.map((item, index) => (
                <AccordionItem key={index} value={`item-${index + 1}`}>
                  <AccordionTrigger className="text-lg font-semibold text-left hover:no-underline">
                    {getTranslation(item.qKey, item.qFallback)}
                  </AccordionTrigger>
                  <AccordionContent className="text-base text-muted-foreground leading-relaxed">
                    {item.qKey === 'faqQ5' ? (
                       <>
                         {getTranslation(item.aKey, item.aFallback)} <Link href="/privacy" className="text-primary hover:underline">{getTranslation('privacyPolicy', 'Privacy Policy')}</Link>.
                       </>
                    ) : (
                      getTranslation(item.aKey, item.aFallback)
                    )}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </main>
      <SubtleFooter />
    </div>
  );
}
