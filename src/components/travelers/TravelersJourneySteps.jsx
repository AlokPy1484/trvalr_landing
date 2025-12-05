'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { Compass, Users, Plane } from 'lucide-react';

export function TravelersJourneySteps() {
  const { getTranslation } = useLanguage();

  const benefits = [
    {
      icon: Compass,
      subtitleKey: 'journeyStep1Title',
      fallbackSubtitle: '1. Discover & Plan',
      textKey: 'journeyStep1Desc',
      fallback: 'Use smart tools and community guides to craft your perfect, personalized itinerary.',
    },
    {
      icon: Users,
      subtitleKey: 'journeyStep2Title',
      fallbackSubtitle: '2. Connect & Book',
      textKey: 'journeyStep2Desc',
      fallback: 'Find and connect with trusted local hosts and travel companions for an authentic experience.',
    },
    {
      icon: Plane,
      subtitleKey: 'journeyStep3Title',
      fallbackSubtitle: '3. Travel & Share',
      textKey: 'journeyStep3Desc',
      fallback: 'Embark on your adventure with confidence and share your story to inspire others.',
    },
  ];

  return (
    <section className="bg-background text-foreground py-16 md:py-24">
      <div className="container mx-auto px-4">
        {/* main grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-12 gap-y-10 items-center">
          
          {/* Left : Image and Text */}
          <div className="lg:col-span-6 flex flex-col space-y-8 order-last lg:order-first">
            <p className="text-muted-foreground text-base md:text-lg">
              {getTranslation('journeyDescription', 'From the first spark of an idea to your final destination, our platform is designed to make travel planning intuitive, safe, and inspiring. We provide the tools and community to turn your travel dreams into reality.')}
            </p>
            <div className="group relative w-full aspect-[16/9] overflow-hidden rounded-2xl">
              <Image
                src="https://images.unsplash.com/photo-1504609773096-104ff2c73ba4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt={getTranslation('journeyImageAlt', 'Travel planning essentials like a notepad, pen, and coffee on a table.')}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
          </div>

          {/* Right : Title & List */}
          <div className="lg:col-span-6 flex flex-col space-y-10">
            {/* Title */}
            <div>
              <p className="text-primary font-semibold text-sm uppercase tracking-wide mb-3">
                {getTranslation('journeySubtitle', 'HOW IT WORKS')}
              </p>
              <h2 className="font-headline text-4xl sm:text-5xl font-bold">
                {getTranslation('journeyTitle', 'Your Adventure, Simplified')}
              </h2>
            </div>

            {/*  List  */}
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
                <Link href="/smart-trails">
                  {getTranslation('journeyButtonStartPlanning', 'Start Planning')}
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/10 rounded-md transition-all" asChild>
                <Link href="/travelers">
                  {getTranslation('journeyButtonExplore', 'Explore Stories')}
                </Link>
              </Button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}