'use client';

import React, { useRef, useEffect } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface Profile {
  id: string;
  nameKey: string;
  nameFallback: string;
  descriptionKey: string;
  descriptionFallback: string;
  imageUrl: string;
  aiHint: string;
  profilePath?: string;
}

const profiles: Profile[] = [
  {
    id: 'john',
    nameKey: 'profileJohnDoeName',
    nameFallback: 'John Doe',
    descriptionKey: 'profileJohnDoeDesc',
    descriptionFallback: 'Superhost with 5 years experience hosting travelers',
    imageUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=400&h=500&fit=crop',
    aiHint: 'man travel',
  },
  {
    id: 'emily',
    nameKey: 'profileEmilySmithName',
    nameFallback: 'Emily Smith',
    descriptionKey: 'profileEmilySmithDesc',
    descriptionFallback: 'Frequent traveler exploring the globe and making new connections',
    imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400&h=500&fit=crop',
    aiHint: 'woman adventure',
    profilePath: '/profile/emily-smith',
  },
  {
    id: 'tomi',
    nameKey: 'profileTomWilsonName',
    nameFallback: 'Tomi Wilson',
    descriptionKey: 'profileTomWilsonDesc',
    descriptionFallback: 'Dedicated host and experienced traveler ready to share local tips',
    imageUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400&h=500&fit=crop',
    aiHint: 'woman city',
  },
];



const ProfileCard = ({ profile, getTranslation, handleViewProfile }: { profile: Profile; getTranslation: Function; handleViewProfile: Function; }) => {
  return (
    
    // simple scale effect on hover.
    <div
      className="group relative w-[320px] h-[420px] flex-shrink-0 transition-transform duration-300 ease-in-out hover:scale-105"
    >
      <div className="relative w-full h-full bg-card rounded-2xl shadow-2xl overflow-hidden">
        <Image
          src={profile.imageUrl}
          alt={getTranslation(profile.nameKey, profile.nameFallback)}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent flex flex-col justify-end p-6 text-left">
          <h3 className="font-headline text-3xl font-semibold text-white">
            {getTranslation(profile.nameKey, profile.nameFallback)}
          </h3>
          <div className="transition-all duration-300 ease-in-out opacity-0 max-h-0 group-hover:max-h-40 group-hover:opacity-100 group-hover:pt-2">
            <p className="text-white/80 text-sm mb-4">
              {getTranslation(profile.descriptionKey, profile.descriptionFallback)}
            </p>
            <Button
              variant="outline"
              className="w-full rounded-full bg-white/10 border-white/40 text-white hover:bg-white/20 backdrop-blur-sm"
              onClick={() => handleViewProfile(profile.profilePath)}
            >
              {getTranslation('viewProfileButton', 'View Profile')}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};


export function DriftinHostsTravelersSection() {
  const { getTranslation } = useLanguage();
  const router = useRouter();

  const handleViewProfile = (path?: string) => {
    if (path) router.push(path);
  };

  return (
    <section className="py-12 md:py-20 bg-background overflow-hidden">
      <div className="container mx-auto px-4 text-center">
        <p className="text-sm text-primary font-semibold mb-2 uppercase tracking-wider">
          {getTranslation('driftinExperiencesLabel', 'Driftin Experiences')}
        </p>
        <h2 className="font-headline text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
          {getTranslation('driftinHostsTravelersTitle', 'Hosts & Travelers')}
        </h2>
        <p className="text-muted-foreground text-lg md:text-xl mb-16 max-w-2xl mx-auto">
          {getTranslation('driftinHostsTravelersSubtitle', 'Meet our talented hosts and adventurous travelers who make our community vibrant.')}
        </p>

        <div className="flex justify-center items-center gap-8">
          {profiles.map((profile) => (
            <ProfileCard 
              key={profile.id}
              profile={profile}
              getTranslation={getTranslation}
              handleViewProfile={handleViewProfile}
            />
          ))}
        </div>
      </div>
    </section>
  );
}