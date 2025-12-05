'use client';

import { Suspense } from "react";
import { BookingClient } from "@/components/booking/BookingClient";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";

export default function BookingPage() {
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
        <Suspense fallback={<div>Loading booking...</div>}>
          <BookingClient />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
