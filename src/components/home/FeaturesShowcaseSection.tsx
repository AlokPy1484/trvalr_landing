
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Map, Users, Globe, Wand2, ArrowRight, DollarSign, FileCheck, Rocket, ListChecks } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import React from 'react';
import { cn } from '@/lib/utils';

interface FeatureCardProps {
  icon: React.ElementType;
  titleKey: string;
  titleFallback: string;
  descriptionKey: string;
  descriptionFallback: string;
  href: string;
  className?: string;
  shadowColor?: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon: Icon, titleKey, titleFallback, descriptionKey, descriptionFallback, href, className, shadowColor }) => {
  const { getTranslation } = useLanguage();

  return (
    <Link href={href} passHref>
      <div className={cn(
          "group relative h-full rounded-2xl p-[1px] transition-all duration-300",
          "bg-border/20 hover:bg-transparent", // Subtle border by default, transparent for gradient on hover
          className, // This will apply the hover:bg-gradient-to-br
          shadowColor
      )}>
        <div className="bg-card text-card-foreground h-full rounded-[15px] p-4 sm:p-5 md:p-6 transition-all duration-300 group-hover:bg-card/80 group-hover:backdrop-blur-sm">
            <div className="relative z-10 flex flex-col flex-grow h-full">
              <div className="mb-3 sm:mb-4">
                <Icon className="h-7 w-7 sm:h-8 sm:w-8 md:h-10 md:w-10 text-primary" />
              </div>
              <h3 className="font-headline text-lg sm:text-xl md:text-2xl font-semibold text-foreground mb-2 sm:mb-3">{getTranslation(titleKey, titleFallback)}</h3>
              <p className="text-xs sm:text-sm text-muted-foreground mb-4 sm:mb-6 flex-grow">{getTranslation(descriptionKey, descriptionFallback)}</p>
              <div className="mt-auto">
                <Button variant="link" className="p-0 text-primary group-hover:underline text-xs sm:text-sm">
                  {getTranslation('learnMore', 'Learn More')}
                  <ArrowRight className="ml-1.5 sm:ml-2 h-3.5 w-3.5 sm:h-4 sm:w-4 transform transition-transform group-hover:translate-x-1" />
                </Button>
              </div>
            </div>
        </div>
      </div>
    </Link>
  );
};

export function FeaturesShowcaseSection() {
  const { getTranslation } = useLanguage();

  const features = [
    {
      icon: Map,
      titleKey: 'featureMapperTitle',
      titleFallback: 'Mapper',
      descriptionKey: 'featureMapperDesc',
      descriptionFallback: 'Bring your journeys to life with our interactive 3D map. Visualize routes, animate flights, and explore your next destination from every angle.',
      href: '/mapper',
      className: 'hover:bg-gradient-to-br from-primary to-accent',
      shadowColor: 'hover:shadow-[0_0_20px_0px_hsl(var(--primary))]'
    },
    {
      icon: Users,
      titleKey: 'featureConnectTitle',
      titleFallback: 'Connect',
      descriptionKey: 'featureConnectDesc',
      descriptionFallback: 'Find your people. Connect with fellow travelers, local hosts, and friendly companions to enrich your journey and share experiences.',
      href: '/connect',
      className: 'hover:bg-gradient-to-br from-accent to-blue-500',
      shadowColor: 'hover:shadow-[0_0_20px_0px_hsl(var(--accent))]'
    },
    {
      icon: Globe,
      titleKey: 'featureOrbitTitle',
      titleFallback: 'Orbit',
      descriptionKey: 'featureOrbitDesc',
      descriptionFallback: 'Join our social hub, Orbit. Share your travel stories, discover inspiration from others, and build your global network of friends.',
      href: '/orbit',
       className: 'hover:bg-gradient-to-br from-secondary to-rose-500',
       shadowColor: 'hover:shadow-[0_0_20px_0px_hsl(var(--secondary))]'
    },
    {
      icon: Wand2,
      titleKey: 'featureSmartTrailsTitle',
      titleFallback: 'SmartTrails',
      descriptionKey: 'featureSmartTrailsDesc',
      descriptionFallback: 'Let our AI craft the perfect one-day itinerary for any city. Discover top landmarks, hidden gems, and the best food spots, all optimized for you.',
      href: '/smart-trails',
       className: 'hover:bg-gradient-to-br from-blue-500 to-purple-500',
       shadowColor: 'hover:shadow-[0_0_20px_0px_#60a5fa]'
    },
    {
      icon: DollarSign,
      titleKey: 'featurePriceTimeTitle',
      titleFallback: 'PriceTime',
      descriptionKey: 'featurePriceTimeDesc',
      descriptionFallback: 'Time your trip like a stock trader. Our AI forecasts flight fares, so you can lock in the best price and never overpay.',
      href: '/pricetime',
      className: 'hover:bg-gradient-to-br from-green-500 to-primary',
      shadowColor: 'hover:shadow-[0_0_20px_0px_#22c55e]'
    },
    {
      icon: FileCheck,
      titleKey: 'featureVisaScanTitle',
      titleFallback: 'VisaScan',
      descriptionKey: 'featureVisaScanDesc',
      descriptionFallback: 'Instantly view personalized visa rules and requirements. Upload your passport for an AI-powered check to ensure you’re travel-ready.',
      href: '/visascan',
      className: 'hover:bg-gradient-to-br from-red-500 to-accent',
      shadowColor: 'hover:shadow-[0_0_20px_0px_#ef4444]'
    },
    {
      icon: Rocket,
      titleKey: 'featureAppScoutTitle',
      titleFallback: 'AppScout',
      descriptionKey: 'featureAppScoutDesc',
      descriptionFallback: 'Land like a local. Get must-have apps for your destination—ride-hailing, food delivery, transit, and more—before you even board.',
      href: '/appscout',
      className: 'hover:bg-gradient-to-br from-purple-500 to-pink-500',
      shadowColor: 'hover:shadow-[0_0_20px_0px_#a855f7]'
    },
    {
      icon: ListChecks,
      titleKey: 'featureTripSyncTitle',
      titleFallback: 'TripSync',
      descriptionKey: 'featureTripSyncDesc',
      descriptionFallback: 'Plan together, perfectly. Collaborate on flights, stays, and activities with your travel buddies in a shared, synchronized board.',
      href: '/trip-sync',
      className: 'hover:bg-gradient-to-br from-orange-500 to-amber-500',
      shadowColor: 'hover:shadow-[0_0_20px_0px_#f97316]'
    },
  ];

  return (
    <section className="w-full py-12 sm:py-16 md:py-20 lg:py-24 overflow-x-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl w-full">
        <div className="text-center mb-8 sm:mb-10 md:mb-16">
          <h2 className="font-headline text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-foreground mb-2 sm:mb-3">
            {getTranslation('featuresSectionMainTitle', 'Everything You Need for Your Next Adventure')}
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base md:text-lg lg:text-xl max-w-3xl mx-auto px-2">
            {getTranslation('featuresSectionSubtitle', 'From 3D maps to AI-powered itineraries, trvalr is your ultimate travel co-pilot. Discover our suite of tools designed to make your travel seamless and unforgettable.')}
          </p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              titleKey={feature.titleKey}
              titleFallback={feature.titleFallback}
              descriptionKey={feature.descriptionKey}
              descriptionFallback={feature.descriptionFallback}
              href={feature.href}
              className={feature.className}
              shadowColor={feature.shadowColor}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
