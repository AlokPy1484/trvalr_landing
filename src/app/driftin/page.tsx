
'use client';

import React, { useState, useEffect, useCallback } from 'react';
import dynamic from 'next/dynamic';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { SubNav } from '@/components/layout/SubNav';
import { DriftinHeroSection } from '@/components/driftin/DriftinHeroSection';
import { Skeleton } from '@/components/ui/skeleton';

// Lazy load sections below the fold
const DriftinHostsTravelersSection = dynamic(() =>
  import('@/components/driftin/DriftinHostsTravelersSection').then((mod) => mod.DriftinHostsTravelersSection),
  { loading: () => <Skeleton className="h-[400px] w-full" /> }
);
const DriftinTrustSafetySection = dynamic(() =>
  import('@/components/driftin/DriftinTrustSafetySection').then((mod) => mod.DriftinTrustSafetySection),
  { loading: () => <Skeleton className="h-[400px] w-full" /> }
);
const DriftinTrustedBrandsSection = dynamic(() =>
  import('@/components/driftin/DriftinTrustedBrandsSection').then((mod) => mod.DriftinTrustedBrandsSection),
  { loading: () => <Skeleton className="h-[300px] w-full" /> }
);
const DriftinDiscoverAdventureSection = dynamic(() =>
  import('@/components/driftin/DriftinDiscoverAdventureSection').then((mod) => mod.DriftinDiscoverAdventureSection),
  { loading: () => <Skeleton className="h-[500px] w-full" /> }
);
const DriftinStayInTouchSection = dynamic(() =>
  import('@/components/driftin/DriftinStayInTouchSection').then((mod) => mod.DriftinStayInTouchSection),
  { loading: () => <Skeleton className="h-[400px] w-full" /> }
);


const SCROLL_THRESHOLD = 50;

export default function DriftinPage() {
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
    console.log('Header search submitted on Driftin page:', searchQuery);
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
        <DriftinHeroSection />
        <SubNav />
        <DriftinHostsTravelersSection />
        <DriftinTrustSafetySection />
        <DriftinTrustedBrandsSection />
        <DriftinDiscoverAdventureSection />
        {/* <DriftinStayInTouchSection /> */}
      </main>
      <Footer />
    </div>
  );
}
