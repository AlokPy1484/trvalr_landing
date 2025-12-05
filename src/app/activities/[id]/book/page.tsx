'use client';

import React from 'react';
import { ActivityBookingPage } from '@/components/activities/ActivityBookingPage';

export default function BookActivityPage({ 
  params,
  searchParams 
}: { 
  params: { id: string };
  searchParams: { date?: string; time?: string; participants?: string };
}) {
  return (
    <ActivityBookingPage 
      activityId={params.id}
      selectedDate={searchParams.date || ''}
      selectedTime={searchParams.time || ''}
      participants={parseInt(searchParams.participants || '2')}
    />
  );
}

