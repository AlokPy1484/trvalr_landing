'use client';

import React, { useState, useLayoutEffect, useRef } from 'react';
import { AdventureProfileCard, type AdventureProfileCardProps } from '../driftin/AdventureProfileCard'; 
import { CheckBadgeIcon } from '@heroicons/react/24/solid';

const initialProfiles: AdventureProfileCardProps[] = [
  {
    id: 'traveler-1',
    mainImageUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=800&h=1000&fit=crop',
    mainImageAltKey: 'topTraveler1Alt',
    mainImageAltFallback: 'Man smiling in an urban environment',
    mainImageAiHint: 'man portrait happy street',
    avatarImageUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=40&h=40&fit=crop',
    avatarImageAltKey: 'topTravelerAvatar1Alt',
    avatarImageAltFallback: 'Marco B.',
    avatarAiHint: 'man face outdoor',
    nameKey: 'topTraveler1Name',
    nameFallback: 'Marco B.',
    labelKey: 'topTraveler1Label',
    labelFallback: 'Globetrotter Gold',
    locationKey: 'topTraveler1Location',
    locationFallback: '3 Continents Visited',
  },
  {
    id: 'traveler-2',
    mainImageUrl: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?q=80&w=800&h=1000&fit=crop',
    mainImageAltKey: 'topTraveler2Alt',
    mainImageAltFallback: 'Woman in a stylish jacket',
    mainImageAiHint: 'woman portrait fashion city',
    avatarImageUrl: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?q=80&w=40&h=40&fit=crop',
    avatarImageAltKey: 'topTravelerAvatar2Alt',
    avatarImageAltFallback: 'Elena S.',
    avatarAiHint: 'woman face confident',
    nameKey: 'topTraveler2Name',
    nameFallback: 'Elena S.',
    labelKey: 'topTraveler2Label',
    labelFallback: 'Top Explorer',
    locationKey: 'topTraveler2Location',
    locationFallback: 'Southeast Asia Expert',
  },
  {
    id: 'traveler-3',
    mainImageUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=800&h=1000&fit=crop',
    mainImageAltKey: 'topTraveler3Alt',
    mainImageAltFallback: 'Woman smiling with a dog',
    mainImageAiHint: 'woman portrait happy dog',
    avatarImageUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=40&h=40&fit=crop',
    avatarImageAltKey: 'topTravelerAvatar3Alt',
    avatarImageAltFallback: 'Jasmine K.',
    avatarAiHint: 'woman face smiling',
    nameKey: 'topTraveler3Name',
    nameFallback: 'Jasmine K.',
    labelKey: 'topTraveler3Label',
    labelFallback: 'Community Pillar',
    locationKey: 'topTraveler3Location',
    locationFallback: '20+ Reviews Written',
  },
  {
    id: 'traveler-4',
    mainImageUrl: 'https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?q=80&w=800&h=1000&fit=crop',
    mainImageAltKey: 'topTraveler4Alt',
    mainImageAltFallback: 'Man looking out over a landscape',
    mainImageAiHint: 'man portrait thoughtful nature',
    avatarImageUrl: 'https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?q=80&w=40&h=40&fit=crop',
    avatarImageAltKey: 'topTravelerAvatar4Alt',
    avatarImageAltFallback: 'Leo G.',
    nameKey: 'topTraveler4Name',
    nameFallback: 'Leo G.',
    avatarAiHint: 'man face travel',
    labelKey: 'topTraveler4Label',
    labelFallback: 'Adventure Seeker',
    locationKey: 'topTraveler4Location',
    locationFallback: 'South America Specialist',
  },
];

export function TravelersTopOfMonth() {
  const getTranslation = (key: string, fallback: string) => fallback;
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
              {getTranslation('topTravelersTitle', "Meet This Month's Top Travelers")}
            </h2>
            <p className="text-muted-foreground text-lg md:text-xl leading-relaxed mb-8">
              {getTranslation('topTravelersSubtitle', 'Get inspired by our most active and celebrated travelers. These are the community members setting the bar for adventure and discovery.')}
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