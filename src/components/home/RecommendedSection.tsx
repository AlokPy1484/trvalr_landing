'use client';

import React from 'react';
import { Card } from '@/components/ui/card';
import { Star, Heart, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export interface RecommendedItem {
  id: string | number;
  title: string;
  rating?: number;
  price?: string;
  image: string;
  hint?: string;
  location?: string;
  category?: string;
  href?: string;
}

interface RecommendedSectionProps {
  title?: string;
  items: RecommendedItem[];
  category?: 'stays' | 'activities' | 'restaurants' | 'flights';
  viewAllLink?: string;
}

const RecommendedCard = ({ item, category }: { item: RecommendedItem; category?: string }) => (
  <Link href={item.href || `/${category}/${item.id}`} className="block">
    <Card className="group relative overflow-hidden rounded-xl sm:rounded-2xl shadow-md transition-all duration-300 hover:shadow-xl cursor-pointer h-full">
      <div className="relative aspect-square w-full overflow-hidden">
        <Image 
          src={item.image} 
          alt={item.title} 
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105" 
          data-ai-hint={item.hint || item.title}
          unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
        <div className="absolute top-1.5 right-1.5 sm:top-2 sm:right-2 flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity z-10">
          <Button 
            size="icon" 
            variant="secondary" 
            className="h-7 w-7 sm:h-8 sm:w-8 rounded-full bg-white/20 text-white backdrop-blur-sm hover:bg-white/30"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
          >
            <Heart className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
          </Button>
          <Button 
            size="icon" 
            variant="secondary" 
            className="h-7 w-7 sm:h-8 sm:w-8 rounded-full bg-white/20 text-white backdrop-blur-sm hover:bg-white/30"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
          >
            <Plus className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
          </Button>
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-3 md:p-4 text-white">
          <h4 className="font-semibold text-sm sm:text-base line-clamp-1">{item.title}</h4>
          <div className="flex items-center gap-2 mt-0.5 sm:mt-1">
            {item.rating && (
              <>
                <Star className="h-3 w-3 sm:h-4 sm:w-4 text-yellow-400 fill-yellow-400" />
                <span className="text-xs sm:text-sm">{item.rating}</span>
              </>
            )}
            {item.location && (
              <>
                {item.rating && <span className="text-xs sm:text-sm">•</span>}
                <span className="text-xs sm:text-sm truncate">{item.location}</span>
              </>
            )}
            {item.price && (
              <>
                {(item.rating || item.location) && <span className="text-xs sm:text-sm">•</span>}
                <span className="text-xs sm:text-sm truncate">{item.price}</span>
              </>
            )}
          </div>
        </div>
      </div>
    </Card>
  </Link>
);

export function RecommendedSection({ 
  title = 'Recommended for you',
  items,
  category,
  viewAllLink
}: RecommendedSectionProps) {
  if (!items || items.length === 0) return null;

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
            </Link>
          )}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
          {items.slice(0, 4).map((item) => (
            <RecommendedCard key={item.id} item={item} category={category} />
          ))}
        </div>
      </div>
    </section>
  );
}

