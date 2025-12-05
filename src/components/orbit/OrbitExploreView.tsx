
'use client';

import Image from 'next/image';
import { cn } from '@/lib/utils';
import { PlayCircle, FileText, Camera } from 'lucide-react';

const exploreItems = [
  { id: 1, src: 'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?q=80&w=800&h=1000&fit=crop', alt: 'Misty mountains', aiHint: 'misty mountains', type: 'image', className: 'md:col-span-2 md:row-span-2' },
  { id: 2, src: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=400&h=500&fit=crop', alt: 'Woman with dog', aiHint: 'woman dog', type: 'image', className: '' },
  { id: 3, src: 'https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?q=80&w=400&h=500&fit=crop', alt: 'Venice canals', aiHint: 'venice canals', type: 'post', className: '' },
  { id: 4, src: 'https://images.unsplash.com/photo-1551537482-f2075a1d41f2?q=80&w=800&h=600&fit=crop', alt: 'Iceberg in greenland', aiHint: 'iceberg greenland', type: 'video', className: 'md:col-span-2' },
  { id: 5, src: 'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?q=80&w=800&h=600&fit=crop', alt: 'Kyoto temple', aiHint: 'kyoto temple', type: 'image', className: 'md:col-span-2' },
  { id: 6, src: 'https://images.unsplash.com/photo-1587330979470-3595ac045ab0?q=80&w=400&h=500&fit=crop', alt: 'Machu Picchu', aiHint: 'machu picchu', type: 'image', className: '' },
  { id: 7, src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&h=500&fit=crop', alt: 'Man portrait', aiHint: 'man portrait', type: 'post', className: '' },
];

const typeIcons = {
  image: <Camera className="h-6 w-6 text-white" />,
  video: <PlayCircle className="h-6 w-6 text-white" />,
  post: <FileText className="h-6 w-6 text-white" />,
};

export function OrbitExploreView() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[200px] gap-2 md:gap-4">
      {exploreItems.map(item => (
        <div
          key={item.id}
          className={cn(
            'group relative rounded-xl overflow-hidden shadow-lg cursor-pointer',
            item.className
          )}
        >
          <Image
            src={item.src}
            alt={item.alt}
            fill
            className="object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
            data-ai-hint={item.aiHint}
            sizes="(max-width: 768px) 50vw, 25vw"
          />
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            {typeIcons[item.type as keyof typeof typeIcons]}
          </div>
        </div>
      ))}
    </div>
  );
}
