
import dynamic from 'next/dynamic';

const TripSyncPageClient = dynamic(
  () => import('@/components/trip-sync/TripSyncPageClient').then(mod => mod.TripSyncPageClient),
  { ssr: false }
);

export default function TripSyncPage() {
  return <TripSyncPageClient />;
}
