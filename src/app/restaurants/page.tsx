'use client';

import React, { Suspense } from 'react';
import { RestaurantSearchResults } from '@/components/restaurants/RestaurantSearchResults';

function RestaurantsPageContent() {
  return <RestaurantSearchResults />;
}

export default function RestaurantsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading restaurants...</p>
        </div>
      </div>
    }>
      <RestaurantsPageContent />
    </Suspense>
  );
}

