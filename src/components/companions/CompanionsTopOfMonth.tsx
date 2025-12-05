'use client';

import React, { useState, useLayoutEffect, useRef } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { AdventureProfileCard, type AdventureProfileCardProps } from '../driftin/AdventureProfileCard';
import { CheckBadgeIcon } from '@heroicons/react/24/solid';

const initialProfiles: AdventureProfileCardProps[] = [
  {
    id: 'companion-1',
    mainImageUrl: 'https://images.unsplash.com/photo-1521119989659-a83eee488004?q=80&w=800&h=1000&fit=crop',
    mainImageAltKey: 'topCompanion1Alt',
    mainImageAltFallback: 'Woman with a friendly expression',
    mainImageAiHint: 'woman portrait friendly',
    avatarImageUrl: 'https://images.unsplash.com/photo-1521119989659-a83eee488004?q=80&w=40&h=40&fit=crop',
    avatarImageAltKey: 'topCompanionAvatar1Alt',
    avatarImageAltFallback: 'Sofia C.',
    avatarAiHint: 'woman face smiling',
    nameKey: 'topCompanion1Name',
    nameFallback: 'Sofia C.',
    labelKey: 'topCompanion1Label',
    labelFallback: 'Top Companion',
    locationKey: 'topCompanion1Location',
    locationFallback: 'Barcelona Food Expert',
  },
  {
    id: 'companion-2',
    mainImageUrl: 'https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?q=80&w=800&h=1000&fit=crop',
    mainImageAltKey: 'topCompanion2Alt',
    mainImageAltFallback: 'Man smiling in a city setting',
    mainImageAiHint: 'man portrait urban happy',
    avatarImageUrl: 'https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?q=80&w=40&h=40&fit=crop',
    avatarImageAltKey: 'topCompanionAvatar2Alt',
    avatarImageAltFallback: 'Daniel P.',
    avatarAiHint: 'man face city',
    nameKey: 'topCompanion2Name',
    nameFallback: 'Daniel P.',
    labelKey: 'topCompanion2Label',
    labelFallback: 'Top Companion',
    locationKey: 'topCompanion2Location',
    locationFallback: 'Tokyo Nightlife Guide',
  },
  {
    id: 'companion-3',
    mainImageUrl: 'https://images.unsplash.com/photo-1531123414780-f74242c2b052?q=80&w=800&h=1000&fit=crop',
    mainImageAltKey: 'topCompanion3Alt',
    mainImageAltFallback: 'Woman in a professional setting, looking thoughtful',
    mainImageAiHint: 'woman portrait professional',
    avatarImageUrl: 'https://images.unsplash.com/photo-1531123414780-f74242c2b052?q=80&w=40&h=40&fit=crop',
    avatarImageAltKey: 'topCompanionAvatar3Alt',
    avatarImageAltFallback: 'Chloe M.',
    avatarAiHint: 'woman face thoughtful',
    nameKey: 'topCompanion3Name',
    nameFallback: 'Chloe M.',
    labelKey: 'topCompanion3Label',
    labelFallback: 'Top Companion',
    locationKey: 'topCompanion3Location',
    locationFallback: 'Paris Art Historian',
  },
  {
    id: 'companion-4',
    mainImageUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=800&h=1000&fit=crop',
    mainImageAltKey: 'topCompanion4Alt',
    mainImageAltFallback: 'Man in a suit looking confident',
    mainImageAiHint: 'man portrait confident suit',
    avatarImageUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=40&h=40&fit=crop',
    avatarImageAltKey: 'topCompanionAvatar4Alt',
    avatarImageAltFallback: 'Ben T.',
    nameKey: 'topCompanion4Name',
    nameFallback: 'Ben T.',
    avatarAiHint: 'man face business',
    labelKey: 'topCompanion4Label',
    labelFallback: 'Top Companion',
    locationKey: 'topCompanion4Location',
    locationFallback: 'Andes Hiking Pro',
  },
];

export function CompanionsTopOfMonth() {
  const { getTranslation } = useLanguage();
  const [profiles, setProfiles] = useState(initialProfiles);

  const positions = useRef<Map<string, DOMRect>>(new Map()).current;
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!containerRef.current) return;
    const elements = Array.from(containerRef.current.querySelectorAll('[data-id]'));
    elements.forEach(el => {
      const id = el.getAttribute('data-id');
      if (id) {
        positions.set(id, el.getBoundingClientRect());
      }
    });
  }, [profiles]);

  const handleImageClick = (clickedId: string) => {
    if (!containerRef.current) return;
    const mainProfile = profiles[0];
    const clickedProfile = profiles.find(p => p.id === clickedId);
    const clickedIndex = profiles.findIndex(p => p.id === clickedId);
    
    if (!clickedProfile || clickedIndex === 0) return;

    const newProfiles = [...profiles];
    newProfiles[0] = clickedProfile;
    newProfiles[clickedIndex] = mainProfile;
    setProfiles(newProfiles);
    
    const elements = Array.from(containerRef.current.querySelectorAll('[data-id]'));
    elements.forEach(el => {
      const id = el.getAttribute('data-id');
      if (!id) return;
      
      const oldPos = positions.get(id);
      const newPos = el.getBoundingClientRect();
      
      if (!oldPos) return;

      const invertX = oldPos.left - newPos.left;
      const invertY = oldPos.top - newPos.top;
      const invertScaleX = oldPos.width / newPos.width;
      const invertScaleY = oldPos.height / newPos.height;

      el.animate([
        { transform: `translate(${invertX}px, ${invertY}px) scale(${invertScaleX}, ${invertScaleY})` },
        { transform: 'translate(0, 0) scale(1, 1)' }
      ], {
        duration: 600,
        easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
      });
    });
  };

  const mainProfile = profiles[0];
  const thumbnailProfiles = profiles.slice(1);

  return (
    <section className="py-12 md:py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          <div ref={containerRef} className="w-full h-[600px] flex gap-4">
            <div data-id={mainProfile.id} className="w-2/3 h-full">
              <AdventureProfileCard {...mainProfile} isMain />
            </div>
            
            <div className="w-1/3 h-full flex flex-col gap-4">
              {thumbnailProfiles.map(profile => (
                 <div 
                    data-id={profile.id}
                    key={profile.id}
                    onClick={() => handleImageClick(profile.id)}
                    className="w-full h-1/3 cursor-pointer"
                  >
                   <AdventureProfileCard {...profile} isMain={false} />
                 </div>
              ))}
            </div>
          </div>

          <div className="text-left">
            <h2 className="font-headline text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
              {getTranslation('discoverMonthlyTitle', "Meet This Month's Top Companions")}
            </h2>
            <p className="text-muted-foreground text-lg md:text-xl leading-relaxed mb-8">
              {getTranslation('discoverMonthlySubtitle', 'Discover our most celebrated companions, local experts who are dedicated to making your travel experiences authentic and unforgettable.')}
            </p>
            <div className="space-y-4">
              {initialProfiles.map(profile => (
                <div key={`list-${profile.id}`} className="flex items-center gap-3">
                  <CheckBadgeIcon className="h-6 w-6 text-primary flex-shrink-0" />
                  <div>
                    <span className="font-semibold text-foreground">{getTranslation(profile.nameKey, profile.nameFallback)}</span>
                    <span className="text-muted-foreground"> – {getTranslation(profile.labelKey, profile.labelFallback)}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}