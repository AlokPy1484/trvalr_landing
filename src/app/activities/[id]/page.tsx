'use client';

import React from 'react';
import { ActivityDetailPage } from '@/components/activities/ActivityDetailPage';

export default function ActivityPage({ params }: { params: { id: string } }) {
  return <ActivityDetailPage activityId={params.id} />;
}

