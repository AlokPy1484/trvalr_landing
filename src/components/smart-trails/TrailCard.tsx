
'use client';

import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Star, MapPin, Lightbulb } from 'lucide-react';
import type { TrailStop } from './SmartTrailsPageClient';

const typeColors: Record<TrailStop['type'], string> = {
  Landmark: 'bg-primary/10 text-primary border-primary/20',
  Food: 'bg-accent/10 text-accent-foreground dark:text-accent border-accent/20',
  Activity: 'bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/20',
  HiddenGem: 'bg-purple-500/10 text-purple-700 dark:text-purple-400 border-purple-500/20',
};

export function TrailCard({ stop }: { stop: TrailStop }) {
  return (
    <div className="w-64 flex-shrink-0 bg-card/50 backdrop-blur-lg border border-border rounded-2xl p-3 space-y-3 transition-all duration-300 hover:border-primary/50 hover:scale-105">
      <div className="relative aspect-video w-full rounded-lg overflow-hidden">
        <Image src={stop.photoUrl} alt={stop.name} fill className="object-cover" data-ai-hint={stop.photoAiHint} sizes="256px" />
      </div>
      <div>
        <div className="flex justify-between items-start">
          <h4 className="font-semibold text-foreground text-sm pr-2">{stop.name}</h4>
          <Badge variant="outline" className={`text-[10px] px-1.5 py-0.5 whitespace-nowrap ${typeColors[stop.type]}`}>
            {stop.type}
          </Badge>
        </div>
        <div className="flex items-center text-xs text-muted-foreground mt-1.5 gap-3">
          <div className="flex items-center gap-1">
            <Star className="h-3 w-3 text-amber-400" />
            <span>{stop.rating.toFixed(1)}</span>
          </div>
          <div className="flex items-center gap-1">
            <MapPin className="h-3 w-3 text-primary" />
            <span>{stop.timeToSpend}</span>
          </div>
        </div>
        <div className="flex items-start text-xs text-muted-foreground mt-2 gap-1.5 border-t border-border pt-2">
          <Lightbulb className="h-3 w-3 mt-0.5 text-muted-foreground/80 flex-shrink-0" />
          <p className="italic">{stop.funFact}</p>
        </div>
      </div>
    </div>
  );
}
