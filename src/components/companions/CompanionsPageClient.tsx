'use client';

import React, { useState, useEffect, useCallback } from 'react';
import dynamic from 'next/dynamic';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { SubNav } from '@/components/layout/SubNav';
import { CompanionsHeroSection } from './CompanionsHeroSection';
import { Skeleton } from '@/components/ui/skeleton';

// Lazy loading sections
// This is our "Top Companions" component
const CompanionsTopOfMonth = dynamic(() => 
  import('./CompanionsTopOfMonth').then(mod => mod.CompanionsTopOfMonth), 
  { loading: () => <Skeleton className="h-[400px] w-full" /> } // Adjusted skeleton height
);
const CompanionsFeaturedGuidesSection = dynamic(() => 
  import('./CompanionsFeaturedGuidesSection').then(mod => mod.CompanionsFeaturedGuidesSection),
  { loading: () => <Skeleton className="h-[700px] w-full" /> } // Adjusted skeleton height
);

const CompanionsElevateSection = dynamic(() =>
  import('./CompanionsElevateSection').then(mod => mod.CompanionsElevateSection),
  { loading: () => <Skeleton className="h-[500px] w-full" /> }
);
const CompanionsGroupAdventuresSection = dynamic(() =>
  import('./CompanionsGroupAdventuresSection').then(mod => mod.CompanionsGroupAdventuresSection),
  { loading: () => <Skeleton className="h-[500px] w-full" /> }
);
const CompanionsCallToActionSection = dynamic(() =>
  import('./CompanionsCallToActionSection').then(mod => mod.CompanionsCallToActionSection),
  { loading: () => <Skeleton className="h-[300px] w-full" /> }
);

const SCROLL_THRESHOLD = 50;

export function CompanionsPageClient() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);

  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY;
    setIsScrolled(currentScrollY > SCROLL_THRESHOLD);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const handleHeaderSearchSubmit = () => {
    console.log('Header search submitted on Companions page:', searchQuery);
  };

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
        <CompanionsHeroSection />
        <SubNav />
        <CompanionsFeaturedGuidesSection />
        <CompanionsElevateSection />
        <CompanionsGroupAdventuresSection />
        <CompanionsCallToActionSection />
        <CompanionsTopOfMonth />
      </main>
      <Footer />
    </div>
  );
}