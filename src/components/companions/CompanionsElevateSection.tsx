'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { CheckCircle, MapPin, Users, ShieldCheck } from 'lucide-react';

export function CompanionsElevateSection() {
  const { getTranslation } = useLanguage();

  const benefits = [
    {
      icon: Users,
      subtitleKey: 'companionsElevateSubtitleLanguage',
      fallbackSubtitle: 'Multilingual Support',
      textKey: 'companionsBenefitLanguage',
      fallback: 'Overcome language barriers effortlessly.',
    },
    {
      icon: MapPin,
      subtitleKey: 'companionsElevateSubtitleGems',
      fallbackSubtitle: 'Hidden Gems Uncovered',
      textKey: 'companionsBenefitLocalGems',
      fallback: 'Discover places only locals know.',
    },
    {
      icon: ShieldCheck,
      subtitleKey: 'companionsElevateSubtitleSafety',
      fallbackSubtitle: 'Safety & Scam-Proofing',
      textKey: 'companionsBenefitSafety',
      fallback: 'Navigate new places with confidence.',
    },
    {
      icon: CheckCircle,
      subtitleKey: 'companionsElevateSubtitleCulture',
      fallbackSubtitle: 'Cultural Immersion',
      textKey: 'companionsBenefitCulture',
      fallback: 'Understand customs and traditions deeply.',
    },
  ];

  return (
    <section className="bg-background text-foreground py-16 md:py-24">
      <div className="container mx-auto px-4">
        {/* main grid --> two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-12 gap-y-10 items-center">
          
          {/* Left ---> Image and Text */}
          <div className="lg:col-span-6 flex flex-col space-y-8 order-last lg:order-first">
            <p className="text-muted-foreground text-base md:text-lg">
              {getTranslation('companionsElevateDescription', 'Dive into the heart of each destination with our Companions. From hidden gems to insider tips, our local experts will help you navigate with confidence and uncover the true spirit of the places you visit. Experience cultural immersion like never before.')}
            </p>
            <div className="group relative w-full aspect-[16/9] overflow-hidden rounded-2xl">
              <Image
                src="https://images.unsplash.com/photo-1595917513241-e9d7a9d8f0a0?q=80&w=1991&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt={getTranslation('companionsElevateImageAlt', 'Traveler joyfully interacting with a local companion in a scenic European town')}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
          </div>

          {/* Right ---> Title & List */}
          <div className="lg:col-span-6 flex flex-col space-y-10">
            {/* Title */}
            <div>
              <p className="text-primary font-semibold text-sm uppercase tracking-wide mb-3">
                {getTranslation('companionsElevateSubtitle', 'TRAVEL COMPANIONS & EXPERIENCES')}
              </p>
              <h2 className="font-headline text-4xl sm:text-5xl font-bold">
                {getTranslation('companionsElevateTitle', 'Elevate Your Destination')}
              </h2>
            </div>

            {/* Feature List Wrapper */}
            <div className="relative">
              
              {/* Connecting Line */}
              <div
                aria-hidden="true"
                className="absolute left-5 top-5 bottom-5 w-0.5 bg-border -translate-x-1/2"
              ></div>
              
              {/* List Items Container */}
              <div className="flex flex-col gap-8">
                {benefits.map((benefit) => {
                  const Icon = benefit.icon;
                  return (
                    <div key={benefit.subtitleKey} className="relative flex items-start pl-12">
                      {/* Icon BG */}
                      <div className="absolute left-5 top-0 flex h-10 w-10 -translate-x-1/2 items-center justify-center rounded-full bg-background shadow-lg shadow-primary/20 z-10">
                        <Icon className="h-5 w-5 text-primary" />
                      </div>
                      
                      {/* Text Content */}
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg mb-1 text-foreground">
                          {getTranslation(benefit.subtitleKey, benefit.fallbackSubtitle)}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {getTranslation(benefit.textKey, benefit.fallback)}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pl-12 pt-2">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-md transition-all shadow-lg shadow-primary/20 hover:shadow-primary/40" asChild>
                <Link href="/connect">
                  {getTranslation('companionsElevateButtonFindCompanion', 'Find a Companion')}
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/10 rounded-md transition-all">
                {getTranslation('companionsElevateButtonHowItWorks', 'How It Works')}
              </Button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}