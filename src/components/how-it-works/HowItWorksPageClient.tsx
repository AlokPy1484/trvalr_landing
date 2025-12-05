'use client';

import React from 'react';
import { Header } from '@/components/layout/Header';
import { SubtleFooter } from '@/components/layout/SubtleFooter';
import { Wand2, Edit, CheckCircle, SendHorizontal, Sparkles } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '../ui/button';
import Link from 'next/link';

export function HowItWorksPageClient() {
  const { getTranslation } = useLanguage();
  const [searchQuery, setSearchQuery] = React.useState('');
  const [isScrolled, setIsScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const steps = [
    {
      icon: SendHorizontal,
      titleKey: "howItWorksStep1Title", titleFallback: "1. Tell Us Your Dream Trip",
      descKey: "howItWorksStep1Desc", descFallback: "Start with a simple prompt in your own words. The more detail you provide, the better. For example, 'A 10-day romantic trip to Italy focusing on food and history' or 'A budget-friendly solo backpacking adventure through Southeast Asia for a month'."
    },
    {
      icon: Wand2,
      titleKey: "howItWorksStep2Title", titleFallback: "2. Review Your AI-Crafted Itinerary",
      descKey: "howItWorksStep2Desc", descFallback: "In seconds, Journi's AI analyzes your request and generates a complete, day-by-day itinerary. This includes recommendations for flights, hotels, restaurants, and activities, all tailored to your preferences."
    },
    {
      icon: Edit,
      titleKey: "howItWorksStep3Title", titleFallback: "3. Customize and Refine",
      descKey: "howItWorksStep3Desc", descFallback: "Your journey, your rules. The AI-generated plan is a flexible starting point. Easily swap hotels, change activities, adjust timings, or ask the AI for alternative suggestions until the plan is perfect for you."
    },
    {
      icon: CheckCircle,
      titleKey: "howItWorksStep4Title", titleFallback: "4. Book With Confidence",
      descKey: "howItWorksStep4Desc", descFallback: "Once you are happy with your personalized itinerary, you can proceed to book your flights, accommodations, and activities directly through our trusted partners, all in one seamless experience."
    },
    {
      icon: Sparkles,
      titleKey: "howItWorksStep5Title", titleFallback: "5. Enjoy More, Plan Less",
      descKey: "howItWorksStep5Desc", descFallback: "No more hassle spending hours building the perfect itinerary. With Journi, that time is saved. Spend it where it matters most — at your desired destination, creating unforgettable memories."
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
            <h1 className="font-headline text-4xl sm:text-5xl font-bold mb-4">
              {getTranslation('howItWorksPageTitle', 'How Journi works')}
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              {getTranslation('howItWorksPageSubtitle', 'Transforming your travel ideas into reality in just a few simple steps.')}
            </p>
          </section>

          <div className="space-y-12">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={index} className="flex flex-col md:flex-row items-center gap-8">
                  <div className={`flex-shrink-0 bg-card/50 backdrop-blur-lg border border-border/20 rounded-2xl p-6 text-primary md:order-${index % 2 === 0 ? '1' : '2'}`}>
                    <Icon className="h-12 w-12" />
                  </div>
                  <div className={`md:order-${index % 2 === 0 ? '2' : '1'}`}>
                    <h2 className="font-headline text-2xl font-semibold mb-3">
                      {getTranslation(step.titleKey, step.titleFallback)}
                    </h2>
                    <p className="text-muted-foreground leading-relaxed">
                      {getTranslation(step.descKey, step.descFallback)}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <section className="text-center py-16">
            <h2 className="font-headline text-3xl font-bold mb-4">
                {getTranslation('howItWorksReadyTitle', 'Ready to Plan Your Adventure?')}
            </h2>
            <p className="text-muted-foreground mb-8">
                {getTranslation('howItWorksReadySubtitle', 'Let Journi take the stress out of travel planning.')}
            </p>
            <Button size="lg" asChild>
                <Link href="/">{getTranslation('startPlanningButton', 'Start Planning Now')}</Link>
            </Button>
          </section>

        </div>
      </main>
      <SubtleFooter />
    </div>
  );
}
