'use client';

import React, { Suspense } from 'react';
import { ActivitySearchResults } from '@/components/activities/ActivitySearchResults';

function ActivitiesPageContent() {
  return <ActivitySearchResults />;
}

export default function ActivitiesPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading activities...</p>
        </div>
      </div>
    }>
      <ActivitiesPageContent />
    </Suspense>
  );
}

