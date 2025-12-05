import { Suspense } from 'react';
import { MyTripsPageClient } from '@/components/my-trips/MyTripsPageClient';

export default function MyTripsPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <MyTripsPageClient />
    </Suspense>
  );
}
