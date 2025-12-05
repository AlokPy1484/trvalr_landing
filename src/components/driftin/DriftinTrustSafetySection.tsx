'use client';

import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { ShieldCheck, Lock, Headset } from 'lucide-react';

// Data for our three pillars of trust
const trustPillars = [
  {
    icon: ShieldCheck,
    titleKey: 'trustPillarVerificationTitle',
    titleFallback: 'Verified Profiles',
    descriptionKey: 'trustPillarVerificationDesc',
    descriptionFallback: 'Our comprehensive verification process ensures that every member of our community is authentic and trustworthy.'
  },
  {
    icon: Lock,
    titleKey: 'trustPillarPaymentsTitle',
    titleFallback: 'Secure Payments',
    descriptionKey: 'trustPillarPaymentsDesc',
    descriptionFallback: 'We use industry-leading encryption to protect your financial information on every single transaction.'
  },
  {
    icon: Headset,
    titleKey: 'trustPillarSupportTitle',
    titleFallback: '24/7 Responsive Support',
    descriptionKey: 'trustPillarSupportDesc',
    descriptionFallback: 'Our dedicated global support team is always available to assist you with any questions or concerns.'
  }
];

export function DriftinTrustSafetySection() {
  const { getTranslation } = useLanguage();

  return (
    <section className="py-12 md:py-20 bg-background">
      <div className="container mx-auto px-4 text-center">
        <p className="text-sm text-primary font-semibold mb-2 uppercase tracking-wider">
          {getTranslation('driftinWhyChooseLabel', 'Why Choose Driftin?')}
        </p>
        <h2 className="font-headline text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-16">
          {getTranslation('driftinTrustSafetyTitle', 'Trust & Safety')}
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
            {getTranslation('driftinJoinNowButton', 'Join Now')}
          </Button>
        </div>
      </div>
    </section>
  );
}