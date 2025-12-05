'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { CalendarCheck, BadgeCheck, MessageCircle } from 'lucide-react';

const trustPillars = [
  {
    icon: CalendarCheck,
    titleKey: 'peaceOfMind1Title',
    titleFallback: 'Booking Guarantee',
    descriptionKey: 'peaceOfMind1Desc',
    descriptionFallback: 'Travel without worry. In the unlikely event a host cancels, we’ll help you find a comparable stay or provide a full refund.'
  },
  {
    icon: BadgeCheck,
    titleKey: 'peaceOfMind2Title',
    titleFallback: 'Verified Listings',
    descriptionKey: 'peaceOfMind2Desc',
    descriptionFallback: 'What you see is what you get. Our team verifies photos and reviews to ensure every listing meets our high standards for quality and authenticity.'
  },
  {
    icon: MessageCircle,
    titleKey: 'peaceOfMind3Title',
    titleFallback: 'Secure Communication',
    descriptionKey: 'peaceOfMind3Desc',
    descriptionFallback: 'Chat with hosts and companions confidently. Our secure platform protects your personal contact details until a booking is confirmed.'
  }
];

export function TravelersPeaceOfMind() {
  const { getTranslation } = useLanguage();

  return (
    <section className="py-12 md:py-20 bg-background">
      <div className="container mx-auto px-4 text-center">
        <p className="text-sm text-primary font-semibold mb-2 uppercase tracking-wider">
          {getTranslation('peaceOfMindLabel', 'Your Safety is Our Priority')}
        </p>
        <h2 className="font-headline text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-16">
          {getTranslation('peaceOfMindTitle', 'Travel with Total Confidence')}
        </h2>

        {/* horizontal grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 max-w-6xl mx-auto">
          {trustPillars.map((pillar, index) => {
            const Icon = pillar.icon;
            return (
              <div key={index} className="flex flex-col items-center text-center">
                {/* Glowing Icon */}
                <div className="relative mb-4">
                  <div className="absolute inset-0 bg-primary/30 rounded-full blur-xl animate-pulse"></div>
                  <div className="relative h-16 w-16 flex items-center justify-center rounded-full bg-primary/10 border border-primary/20">
                    <Icon className="h-8 w-8 text-primary" />
                  </div>
                </div>
                {/* Text Content */}
                <div>
                  <h3 className="font-headline text-2xl font-semibold text-foreground mb-2">
                    {getTranslation(pillar.titleKey, pillar.titleFallback)}
                  </h3>
                  <p className="text-muted-foreground">
                    {getTranslation(pillar.descriptionKey, pillar.descriptionFallback)}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-16">
          <Button
            size="lg"
            className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-3 text-lg rounded-lg transition-all shadow-lg shadow-primary/20 hover:shadow-primary/40"
          >
            <Link href="/connect">
              {getTranslation('peaceOfMindButton', 'Stay Connected')}
            </Link>
            
          </Button>
        </div>
      </div>
    </section>
  );
}