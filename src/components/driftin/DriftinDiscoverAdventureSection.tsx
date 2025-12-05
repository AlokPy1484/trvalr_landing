'use client';

import React, { useState, useLayoutEffect, useRef } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { AdventureProfileCard, type AdventureProfileCardProps } from './AdventureProfileCard';
import { CheckBadgeIcon } from '@heroicons/react/24/solid';

// --- CONTENT MODIFIED FOR HOSTS ---
const initialProfiles: AdventureProfileCardProps[] = [
  {
    id: 'adventure-1',
    mainImageUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=800&h=1000&fit=crop',
    mainImageAltKey: 'adventureProfile1Alt',
    mainImageAltFallback: 'Man smiling in a natural setting',
    mainImageAiHint: 'man portrait street',
    avatarImageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=40&h=40&fit=crop',
    avatarImageAltKey: 'adventureAvatar1Alt',
    avatarImageAltFallback: 'John S.',
    avatarAiHint: 'man face',
    nameKey: 'adventureProfile1Name',
    nameFallback: 'John S.',
    labelKey: 'adventureProfile1Label',
    labelFallback: 'Top Host',
    locationKey: 'adventureProfile1Location',
    locationFallback: 'Paris, France',
  },
  {
    id: 'adventure-2',
    mainImageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400&h=500&fit=crop',
    mainImageAltKey: 'adventureProfile2Alt',
    mainImageAltFallback: 'Woman relaxing on a couch',
    mainImageAiHint: 'woman portrait smiling',
    avatarImageUrl: 'https://images.unsplash.com/photo-1554151228-14d9def656e4?q=80&w=40&h=40&fit=crop',
    avatarImageAltKey: 'adventureAvatar2Alt',
    avatarImageAltFallback: 'Emily R.',
    avatarAiHint: 'woman face',
    nameKey: 'adventureProfile2Name',
    nameFallback: 'Emily R.',
    labelKey: 'adventureProfile2Label',
    labelFallback: 'Top Host',
    locationKey: 'adventureProfile2Location',
    locationFallback: 'Kyoto, Japan',
  },
  {
    id: 'adventure-3',
    mainImageUrl: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=400&h=500&fit=crop',
    mainImageAltKey: 'adventureProfile3Alt',
    mainImageAltFallback: 'Woman with a thoughtful expression',
    mainImageAiHint: 'woman portrait fashion',
    avatarImageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=40&h=40&fit=crop',
    avatarImageAltKey: 'adventureAvatar3Alt',
    avatarImageAltFallback: 'Sarah L.',
    avatarAiHint: 'woman face serene',
    nameKey: 'adventureProfile3Name',
    nameFallback: 'Sarah L.',
    labelKey: 'adventureProfile3Label',
    labelFallback: 'Top Host',
    locationKey: 'adventureProfile3Location',
    locationFallback: 'New York, USA',
  },
  {
    id: 'adventure-4',
    mainImageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&h=500&fit=crop',
    mainImageAltKey: 'adventureProfile4Alt',
    mainImageAltFallback: 'Man with a gentle smile',
    mainImageAiHint: 'man portrait gentle',
    avatarImageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=40&h=40&fit=crop',
    avatarImageAltKey: 'adventureAvatar4Alt',
    avatarImageAltFallback: 'Liam K.',
    nameKey: 'adventureProfile4Name',
    nameFallback: 'Liam K.',
    avatarAiHint: '',
    labelKey: 'adventureProfile4Label',
    labelFallback: 'Top Host',
    locationKey: 'adventureProfile4Location',
    locationFallback: 'Rome, Italy',
  },
];

export function DriftinDiscoverAdventureSection() {
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
                    className="w-full h-1/3"
                  >
                   <AdventureProfileCard {...profile} isMain={false} />
                 </div>
              ))}
            </div>
          </div>
          
          {/* --- CONTENT MODIFIED FOR HOSTS --- */}
          <div className="text-left">
            <h2 className="font-headline text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
              {getTranslation('discoverMonthlyTitle', "Meet This Month's Top Hosts")}
            </h2>
            <p className="text-muted-foreground text-lg md:text-xl leading-relaxed mb-8">
              {getTranslation('discoverMonthlySubtitle', 'Explore the profiles of our most celebrated hosts who are making the community vibrant by offering unforgettable stays.')}
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