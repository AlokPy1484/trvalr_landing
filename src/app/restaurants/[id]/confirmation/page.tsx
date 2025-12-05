'use client';

import React, { Suspense } from 'react';
import { RestaurantConfirmationPage } from '@/components/restaurants/RestaurantConfirmationPage';

function RestaurantConfirmationPageContent({ params }: { params: { id: string } }) {
  return <RestaurantConfirmationPage restaurantId={params.id} />;
}

export default function ConfirmationPage({ params }: { params: { id: string } }) {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading confirmation...</p>
        </div>
      </div>
    }>
      <RestaurantConfirmationPageContent params={params} />
    </Suspense>
  );
}

