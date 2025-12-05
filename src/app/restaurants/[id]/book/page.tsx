'use client';

import React, { Suspense } from 'react';
import { RestaurantBookingPage } from '@/components/restaurants/RestaurantBookingPage';

function RestaurantBookingPageContent({
  params,
  searchParams
}: {
  params: { id: string };
  searchParams: { date?: string; time?: string; guests?: string };
}) {
  return (
    <RestaurantBookingPage
      restaurantId={params.id}
      selectedDate={searchParams.date || ''}
      selectedTime={searchParams.time || ''}
      guests={parseInt(searchParams.guests || '2')}
    />
  );
}

export default function BookRestaurantPage({
  params,
  searchParams
}: {
  params: { id: string };
  searchParams: { date?: string; time?: string; guests?: string };
}) {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading booking...</p>
        </div>
      </div>
    }>
      <RestaurantBookingPageContent params={params} searchParams={searchParams} />
    </Suspense>
  );
}

