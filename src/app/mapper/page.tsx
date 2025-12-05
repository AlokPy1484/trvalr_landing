
import dynamic from 'next/dynamic';

const MapperPageClient = dynamic(
  () => import('@/components/mapper/MapperPageClient').then(mod => mod.MapperPageClient),
  { 
    ssr: false,
    loading: () => <div className="w-full h-full flex items-center justify-center bg-background"><p>Loading Map...</p></div>
  }
);

export default function MapperPage() {
  return <MapperPageClient />;
}
