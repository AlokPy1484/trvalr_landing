'use client';

import React from 'react';
import { ActivityConfirmationPage } from '@/components/activities/ActivityConfirmationPage';

export default function ConfirmationPage({ params }: { params: { id: string } }) {
  return <ActivityConfirmationPage activityId={params.id} />;
}

