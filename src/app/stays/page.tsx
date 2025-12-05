'use client';

import React, { useState, useEffect } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { StaysSearchResultsClient } from '@/components/stays/StaysSearchResultsClient';

export default function StaysPage() {
  const [searchQuery, setSearchQuery] = useState('Paris, France');
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearchSubmit = () => {
    console.log('Search submitted:', searchQuery);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-primary/10 via-background to-accent/10">
      <Header
        isScrolled={isScrolled}
        searchQuery={searchQuery}
        onSearchQueryChange={setSearchQuery}
        onSearchSubmit={handleSearchSubmit}
        showCurrencySelector={true}
      />

      <main className="flex-grow">
        <StaysSearchResultsClient />
      </main>

      <Footer />
    </div>
  );
}
