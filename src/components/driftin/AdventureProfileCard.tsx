'use client';

import Image from 'next/image';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useLanguage } from '@/contexts/LanguageContext';

export interface AdventureProfileCardProps {
  id: string;
  mainImageUrl: string;
  mainImageAltKey: string;
  mainImageAltFallback: string;
  mainImageAiHint: string;
  avatarImageUrl: string;
  avatarImageAltKey: string;
  avatarImageAltFallback: string;
  avatarAiHint: string;
  nameKey: string;
  nameFallback: string;
  labelKey: string;
  labelFallback: string;
  locationKey: string;
  locationFallback: string;
  isMain?: boolean; // This prop controls the card's appearance
}

export function AdventureProfileCard({
  mainImageUrl,
  mainImageAltKey,
  mainImageAltFallback,
  avatarImageUrl,
  avatarImageAltKey,
  avatarImageAltFallback,
  nameKey,
  nameFallback,
  labelKey,
  labelFallback,
  isMain,
}: AdventureProfileCardProps) {
  const { getTranslation } = useLanguage();

  return (
    <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-lg cursor-pointer group">
      <Image
        src={mainImageUrl}
        alt={getTranslation(mainImageAltKey, mainImageAltFallback)}
        fill
        className="object-cover transition-transform duration-300 group-hover:scale-110"
        priority // Helps with loading performance
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
      
      <div className={`absolute bottom-0 left-0 right-0 text-left transition-all duration-300 ${isMain ? 'p-6' : 'p-3'}`}>
        <div className="flex items-center gap-3">
            <Avatar className={`${isMain ? 'h-10 w-10' : 'h-6 w-6'} border-2 border-white`}>
              <AvatarImage src={avatarImageUrl} alt={getTranslation(avatarImageAltKey, avatarImageAltFallback)} />
              <AvatarFallback>{getTranslation(nameKey, nameFallback).substring(0, 1)}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className={`font-semibold text-white ${isMain ? 'text-lg' : 'text-sm leading-tight'}`}>{getTranslation(nameKey, nameFallback)}</h3>
              {isMain && (
                <p className="text-sm text-white/80">{getTranslation(labelKey, labelFallback)}</p>
              )}
            </div>
        </div>
      </div>
    </div>
  );
}