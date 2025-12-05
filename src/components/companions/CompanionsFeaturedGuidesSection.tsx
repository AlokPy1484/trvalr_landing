
'use client';

import { CompanionProfileCard, type CompanionProfileCardProps } from './CompanionProfileCard';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import React, { useRef } from 'react';

const featuredCompanionsData: CompanionProfileCardProps[] = [
  {
    id: 'companion1',
    nameKey: 'companionsCompanionNatalieName',
    nameFallback: 'Natalie',
    imageUrl: 'https://images.unsplash.com/photo-1554151228-14d9def656e4?q=80&w=300&h=400&fit=crop',
    imageAltKey: 'companionsCompanionNatalieAlt',
    imageAltFallback: 'Natalie, a local companion smiling',
    aiHint: 'woman companion smiling',
    languagesKey: 'companionsCompanionNatalieLanguages',
    languagesFallback: 'English, Spanish',
    locationKey: 'companionsCompanionNatalieLocation',
    locationFallback: 'Barcelona, Spain',
    rating: 4.9,
    bioKey: 'companionsCompanionNatalieBio',
    bioFallback: "I'll show you Barcelona's hidden tapas bars and Gaudi's lesser-known masterpieces.",
    profilePath: '/profile/natalie-b',
  },
  {
    id: 'companion2',
    nameKey: 'companionsCompanionEmmaName',
    nameFallback: 'Isabella',
    imageUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=300&h=400&fit=crop',
    imageAltKey: 'companionsCompanionEmmaAlt',
    imageAltFallback: 'Isabella, a host in Tuscany',
    aiHint: 'woman dog',
    languagesKey: 'companionsCompanionEmmaLanguages',
    languagesFallback: 'Italian, English',
    locationKey: 'companionsCompanionEmmaLocation',
    locationFallback: 'Tuscany, Italy',
    rating: 4.9,
    bioKey: 'companionsCompanionEmmaBio',
    bioFallback: 'Share my family\'s vineyard and farmhouse.',
    profilePath: '/profile/isabella-r',
  },
  {
    id: 'companion3',
    nameKey: 'companionsCompanionLiamName',
    nameFallback: 'Liam',
    imageUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=300&h=400&fit=crop',
    imageAltKey: 'companionsCompanionLiamAlt',
    imageAltFallback: 'Liam, a local companion with a hat',
    aiHint: 'man city street',
    languagesKey: 'companionsCompanionLiamLanguages',
    languagesFallback: 'Japanese, English',
    locationKey: 'companionsCompanionLiamLocation',
    locationFallback: 'Kyoto, Japan',
    rating: 4.8,
    bioKey: 'companionsCompanionLiamBio',
    bioFallback: 'Your guide to tranquil temples and gardens.',
    profilePath: '/profile/liam-k',
  },
   {
    id: 'companion4',
    nameKey: 'companionsCompanionAyeshaName',
    nameFallback: 'Ayesha',
    imageUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=300&h=400&fit=crop',
    imageAltKey: 'companionsCompanionAyeshaAlt',
    imageAltFallback: 'Ayesha, a local companion in India',
    aiHint: 'girl portrait',
    languagesKey: 'companionsCompanionAyeshaLanguages',
    languagesFallback: 'Hindi, English',
    locationKey: 'companionsCompanionAyeshaLocation',
    locationFallback: 'Jaipur, India',
    rating: 5.0,
    bioKey: 'companionsCompanionAyeshaBio',
    bioFallback: 'I’ll take you through the pink streets, palace tales, and street food that locals swear by.',
  },
];

export function CompanionsFeaturedGuidesSection() {
  const { getTranslation } = useLanguage();
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -300 : 300; // Adjust scroll amount as needed
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-12 md:py-20">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8 md:mb-12">
          <div>
            <h2 className="font-headline text-3xl sm:text-4xl font-bold text-foreground">
              {getTranslation('companionsFeaturedCompanionsTitle', 'Explore Our Companions')}
            </h2>
            <p className="text-muted-foreground mt-2 text-base md:text-lg max-w-xl">
              {getTranslation('companionsFeaturedCompanionsSubtitle', 'Discover the world through the eyes of our local companions. With insider knowledge and personalized recommendations.')}
            </p>
          </div>
          <div className="hidden sm:flex space-x-2">
            <Button variant="outline" size="icon" onClick={() => scroll('left')} aria-label="Scroll left">
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button variant="outline" size="icon" onClick={() => scroll('right')} aria-label="Scroll right">
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>

        <div className="relative">
          <div
            ref={scrollContainerRef}
            className="flex overflow-x-auto space-x-4 sm:space-x-6 pb-4 scrollbar-hide"
            style={{ scrollSnapType: 'x mandatory' }}
          >
            {featuredCompanionsData.map((companion) => (
              <div key={companion.id} className="flex-shrink-0 w-[280px] sm:w-[320px]" style={{ scrollSnapAlign: 'start' }}>
                <CompanionProfileCard {...companion} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}