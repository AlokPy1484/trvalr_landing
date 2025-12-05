'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Star, MessageSquare } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
// Added the CheckBadgeIcon import
import { CheckBadgeIcon } from '@heroicons/react/24/solid'; 

export interface CompanionProfileCardProps {
  id: string;
  nameKey: string;
  nameFallback: string;
  imageUrl: string;
  imageAltKey: string;
  imageAltFallback: string;
  aiHint: string;
  languagesKey: string;
  languagesFallback: string;
  locationKey: string;
  locationFallback: string;
  rating: number;
  bioKey: string;
  bioFallback: string;
  profilePath?: string;
}

export function CompanionProfileCard({
  nameKey,
  nameFallback,
  imageUrl,
  imageAltKey,
  imageAltFallback,
  aiHint,
  languagesKey,
  languagesFallback,
  locationKey,
  locationFallback,
  rating,
  bioKey,
  bioFallback,
  profilePath,
}: CompanionProfileCardProps) {
  const { getTranslation } = useLanguage();

  const name = getTranslation(nameKey, nameFallback);
  const imageAlt = getTranslation(imageAltKey, imageAltFallback);
  const languages = getTranslation(languagesKey, languagesFallback);
  const location = getTranslation(locationKey, locationFallback);
  const bio = getTranslation(bioKey, bioFallback);

  const cardContent = (
      <Card className="overflow-hidden rounded-xl shadow-lg w-full h-full flex flex-col group hover:shadow-2xl transition-shadow duration-300">
        <div className="relative aspect-[3/4] w-full">
          <Image
            src={imageUrl}
            alt={imageAlt}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            data-ai-hint={aiHint}
            sizes="(max-width: 640px) 280px, 320px"
          />
          <div className="absolute top-3 right-3 bg-black/40 backdrop-blur-sm text-white px-2 py-1 rounded-md text-xs font-medium flex items-center">
            <Star className="h-3.5 w-3.5 mr-1 text-yellow-400 fill-yellow-400" />
            {rating.toFixed(1)}
          </div>
        </div>
        <CardContent className="p-5 flex flex-col flex-grow">
         
          <div className="flex items-center gap-1.5 mb-1"> 
            <h3 className="font-headline text-xl font-semibold text-foreground">{name}</h3>
            <CheckBadgeIcon className="h-5 w-5 text-blue-500" /> {/* Verification icon */}
          </div>
          <p className="text-xs text-muted-foreground mb-1">{location}</p>
          <p className="text-sm text-primary mb-3 font-medium">{languages}</p>
          <p className="text-xs text-muted-foreground mb-4 line-clamp-3 flex-grow">{bio}</p>
          <Button
            variant="outline"
            className="w-full mt-auto border-primary text-primary hover:bg-primary/10"
            onClick={(e) => { 
                if (profilePath) e.stopPropagation(); 
                console.log(`Meet ${name}`) 
            }}
          >
            <MessageSquare className="mr-2 h-4 w-4" />
            {getTranslation('companionsMeetButton', 'Meet')} {name.split(' ')[0]}
          </Button>
        </CardContent>
      </Card>
  );

  if (profilePath) {
    return <Link href={profilePath} className="block h-full">{cardContent}</Link>;
  }

  return cardContent;
}