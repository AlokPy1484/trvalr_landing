'use client';

import React, { useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ChevronLeft, ChevronRight, Building2, ChevronRight as ChevronRightIcon } from 'lucide-react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export interface Promotion {
  id: string;
  title: string;
  offer: string;
  cta: string;
  image: string;
  country: string;
  countryFlag?: string;
  brand?: string;
  overlayColor?: string;
  textColor?: 'light' | 'dark';
}

interface PromotionsSectionProps {
  title?: string;
  promotions: Promotion[];
  viewAllLink?: string;
  category?: 'accommodation' | 'activities' | 'restaurants' | 'flights';
}

export function PromotionsSection({ 
  title = 'Accommodation Promotions',
  promotions,
  viewAllLink = '/stays',
  category = 'accommodation'
}: PromotionsSectionProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScrollability = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -400 : 400;
      scrollContainerRef.current.scrollBy({
        left: scrollAmount,
        behavior: 'smooth',
      });
      setTimeout(checkScrollability, 300);
    }
  };

  React.useEffect(() => {
    checkScrollability();
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', checkScrollability);
      return () => container.removeEventListener('scroll', checkScrollability);
    }
  }, []);

  if (!promotions || promotions.length === 0) return null;

  return (
    <section className="w-full py-12 md:py-16 lg:py-20 overflow-x-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl w-full">
        {/* Header */}
        <div className="flex justify-between items-center mb-6 md:mb-8">
          <h2 className="font-headline text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-foreground">
            {title}
          </h2>
          {viewAllLink && (
            <Link 
              href={viewAllLink}
              className="hidden sm:flex items-center gap-1 text-primary hover:text-primary/80 transition-colors text-sm md:text-base font-medium"
            >
              View all
              <ChevronRightIcon className="h-4 w-4" />
            </Link>
          )}
        </div>

        {/* Carousel */}
        <div className="relative">
          {/* Navigation Arrows */}
          <Button
            variant="outline"
            size="icon"
            onClick={() => scroll('left')}
            disabled={!canScrollLeft}
            className={cn(
              "absolute left-0 top-1/2 -translate-y-1/2 z-10 h-10 w-10 rounded-full bg-white hover:bg-gray-100 shadow-lg border-gray-200",
              "hidden md:flex",
              !canScrollLeft && "opacity-50 cursor-not-allowed"
            )}
          >
            <ChevronLeft className="h-5 w-5 text-gray-700" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => scroll('right')}
            disabled={!canScrollRight}
            className={cn(
              "absolute right-0 top-1/2 -translate-y-1/2 z-10 h-10 w-10 rounded-full bg-white hover:bg-gray-100 shadow-lg border-gray-200",
              "hidden md:flex",
              !canScrollRight && "opacity-50 cursor-not-allowed"
            )}
          >
            <ChevronRight className="h-5 w-5 text-gray-700" />
          </Button>

          {/* Scrollable Container */}
          <div
            ref={scrollContainerRef}
            className="flex gap-4 md:gap-6 overflow-x-auto pb-4 -mb-4 scrollbar-hide snap-x snap-mandatory"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
            }}
          >
            {promotions.map((promo) => (
              <PromotionCard key={promo.id} promotion={promo} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function PromotionCard({ promotion }: { promotion: Promotion }) {
  const {
    title,
    offer,
    cta,
    image,
    country,
    countryFlag,
    brand,
    overlayColor,
    textColor = 'light',
  } = promotion;

  const isLightText = textColor === 'light';
  const textClass = isLightText ? 'text-white' : 'text-black';
  const overlayClass = overlayColor || (isLightText ? 'bg-black/40' : 'bg-white/90');

  return (
    <Card className="relative flex-shrink-0 w-[320px] sm:w-[380px] md:w-[450px] h-[180px] sm:h-[200px] md:h-[220px] overflow-hidden cursor-pointer group hover:shadow-xl transition-all duration-300 snap-start">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-500"
          unoptimized
        />
      </div>

      {/* Top Left Icon */}
      <div className="absolute top-2 left-2 sm:top-3 sm:left-3 z-10">
        <div className="bg-red-500 rounded-full p-1.5 sm:p-2">
          <Building2 className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-white" />
        </div>
      </div>

      {/* Top Right Country Badge */}
      <div className="absolute top-2 right-2 sm:top-3 sm:right-3 z-10">
        <div className="bg-black/60 backdrop-blur-sm rounded-full px-2 py-1 sm:px-2.5 sm:py-1.5 flex items-center gap-1">
          {countryFlag && (
            <span className="text-xs sm:text-sm">{countryFlag}</span>
          )}
          <span className="text-white text-[10px] sm:text-xs font-medium">{country}</span>
        </div>
      </div>

      {/* Overlay with Content */}
      <div className={cn(
        "absolute inset-0 flex flex-col justify-end p-3 sm:p-4 md:p-5",
        overlayClass
      )}>
        {/* Brand/Title */}
        {brand && (
          <div className={cn("mb-1", textClass)}>
            <div className="flex items-center gap-2">
              {brand.includes('Travel Fest') ? (
                <>
                  <span className="text-sm sm:text-base md:text-lg font-bold">Travel Fest</span>
                  <span className="text-[10px] sm:text-xs bg-yellow-400 text-black px-1.5 py-0.5 rounded font-semibold">+</span>
                </>
              ) : (
                <span className="text-sm sm:text-base md:text-lg font-bold">{brand}</span>
              )}
            </div>
          </div>
        )}

        {/* Main Offer */}
        <div className={cn("mb-1", textClass)}>
          <p className="text-xl sm:text-2xl md:text-3xl font-bold leading-tight">
            {offer}
          </p>
        </div>

        {/* CTA Text */}
        <div className={cn("mb-2", textClass)}>
          <p className="text-xs sm:text-sm font-medium">
            {cta}
          </p>
        </div>

        {/* T&Cs */}
        <div className={cn("text-[9px] sm:text-[10px] opacity-80", textClass)}>
          T&Cs apply
        </div>
      </div>
    </Card>
  );
}

