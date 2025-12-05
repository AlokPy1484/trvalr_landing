'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { ListChecks, ShieldCheck, Sparkles } from 'lucide-react';

export function CompanionsGroupAdventuresSection() {
  const { getTranslation } = useLanguage();

  const benefits = [
    {
      icon: ListChecks,
      subtitleKey: 'companionsGroupSubtitleCustom',
      fallbackSubtitle: 'Custom Itineraries',
      textKey: 'companionsGroupBenefitCustom',
      fallback: 'Customized itineraries for diverse group interests.'
    },
    {
      icon: ShieldCheck,
      subtitleKey: 'companionsGroupSubtitleLogistics',
      fallbackSubtitle: 'Smooth Logistics',
      textKey: 'companionsGroupBenefitLogistics',
      fallback: 'Smooth logistics and coordination for hassle-free travel.'
    },
    {
      icon: Sparkles,
      subtitleKey: 'companionsGroupSubtitleShared',
      fallbackSubtitle: 'Memorable Experiences',
      textKey: 'companionsGroupBenefitShared',
      fallback: 'Shared memorable experiences and deeper cultural connections.'
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-background text-foreground">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-12 gap-y-10 items-center">

          {/* Left - Title & List */}
          <div className="lg:col-span-6 flex flex-col space-y-10">
            {/* Title */}
            <h2 className="font-headline text-4xl sm:text-5xl font-bold">
              <span className="block">{getTranslation('companionsGroupTitle1', 'Travel Together,')}</span>
              <span className="block">{getTranslation('companionsGroupTitle2', 'Explore Deeper')}</span>
            </h2>

            {/* List */}
            <div className="relative">
              {/* Connecting Line */}
              <div className="absolute left-5 top-5 bottom-5 w-0.5 bg-border -translate-x-1/2" aria-hidden="true"></div>

              {benefits.map((benefit, index) => {
                const Icon = benefit.icon;
                return (
                  <div key={index} className="relative flex items-start pl-12 mb-8 last:mb-0">
                    {/* icon background */}
                    <div className="absolute left-5 top-0 -translate-x-1/2 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-background shadow-lg shadow-primary/40">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    {/* Text */}
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-1 text-foreground">
                        {getTranslation(benefit.subtitleKey, benefit.fallbackSubtitle)}
                      </h3>
                      <p className="text-muted-foreground text-sm">
                        {getTranslation(benefit.textKey, benefit.fallback)}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Button */}
            <div className="pt-2 pl-12">
              <Button
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-md w-full max-w-xs transition-all shadow-lg shadow-primary/20 hover:shadow-primary/40"
                asChild
              >
                <Link href="/connect">
                  {getTranslation('companionsGroupButtonHire', 'Hire Companions')}
                </Link>
              </Button>
            </div>
          </div>

          {/*  Right Column */}
          <div className="lg:col-span-6 flex flex-col space-y-8">
            {/* Text */}
            <p className="text-muted-foreground text-base md:text-lg">
              {getTranslation('companionsGroupDescription', 'Planning a trip for your family, friends, or colleagues? Our local companions specialize in creating unforgettable group experiences. From coordinating logistics to crafting personalized tours that cater to everyone\'s interests, they ensure your group adventure is seamless, engaging, and truly local.')}
            </p>

            {/* Image */}
            <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden group">
              <Image
                src="https://images.unsplash.com/photo-1631801753372-589f27049c4d?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDM4fHx8ZW58MHx8fHx8"
                alt={getTranslation('companionsGroupImageAlt', 'A group of friends hiking through a forest trail together')}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                data-ai-hint="group travel hiking mountains"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}