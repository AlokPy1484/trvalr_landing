'use client';

import { Suspense } from "react";
import { FlightSearchResults } from "@/components/flights/FlightSearchResults";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";

export default function FlightsPage() {
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
        <Suspense fallback={
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-muted-foreground">Loading flights...</p>
            </div>
          </div>
        }>
          <FlightSearchResults />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}

