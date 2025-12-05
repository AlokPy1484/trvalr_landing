'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { SubNav } from '@/components/layout/SubNav';
import { TravelersHeroSection } from './TravelersHeroSection';
import { TravelersJourneySteps } from './TravelersJourneySteps';
import { TravelersUserStories } from './TravelersUserStories';
import { TravelersPeaceOfMind } from './TravelersPeaceOfMind';
import { TravelersTopOfMonth } from './TravelersTopOfMonth';

const SCROLL_THRESHOLD = 50;

export function TravelersPageClient() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleHeaderSearchSubmit = () => {
    console.log('Header search submitted on Travelers page:', searchQuery);
  };

  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY;
    setIsScrolled(currentScrollY > SCROLL_THRESHOLD);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-primary/10 via-background to-accent/10">
      <Header
        isScrolled={isScrolled}
        searchQuery={searchQuery}
        onSearchQueryChange={setSearchQuery}
        onSearchSubmit={handleHeaderSearchSubmit}
        showCurrencySelector={false}
      />
      <main className="flex-grow">
        <TravelersHeroSection />
        <SubNav />
        <TravelersUserStories />
        <TravelersJourneySteps />
        <TravelersPeaceOfMind />
        <TravelersTopOfMonth />
      </main>
      <Footer />
    </div>
  );
}