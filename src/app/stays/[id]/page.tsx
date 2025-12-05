'use client';

import React from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { StayDetailsClient } from '@/components/stays/StayDetailsClient';

interface StayDetailsPageProps {
  params: {
    id: string;
  };
}

export default function StayDetailsPage({ params }: StayDetailsPageProps) {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-primary/10 via-background to-accent/10">
      <Header
        isScrolled={false}
        searchQuery=""
        onSearchQueryChange={() => {}}
        onSearchSubmit={() => {}}
        showCurrencySelector={true}
      />

      <main className="flex-grow">
        <StayDetailsClient stayId={params.id} />
      </main>

      <Footer />
    </div>
  );
}
