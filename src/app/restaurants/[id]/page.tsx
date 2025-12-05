'use client';

import React, { Suspense } from 'react';
import { RestaurantDetailPage } from '@/components/restaurants/RestaurantDetailPage';

function RestaurantDetailPageContent({ params }: { params: { id: string } }) {
  return <RestaurantDetailPage restaurantId={params.id} />;
}

export default function RestaurantPage({ params }: { params: { id: string } }) {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading restaurant details...</p>
        </div>
      </div>
    }>
      <RestaurantDetailPageContent params={params} />
    </Suspense>
  );
}

