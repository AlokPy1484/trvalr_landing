
'use client';

import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { Compass, Utensils, Footprints, Coffee } from 'lucide-react';
import type { ScheduleItem } from './SmartTrailsPageClient';

interface ScheduleTimelineProps {
  schedule: ScheduleItem[];
}

const typeIcons: Record<ScheduleItem['type'], React.ElementType> = {
  Activity: Compass,
  Food: Utensils,
  Travel: Footprints,
  Break: Coffee,
};

const typeColors: Record<ScheduleItem['type'], string> = {
  Activity: 'border-l-primary',
  Food: 'border-l-accent',
  Travel: 'border-l-blue-500',
  Break: 'border-l-border',
};

export function ScheduleTimeline({ schedule }: ScheduleTimelineProps) {
  if (!schedule || schedule.length === 0) {
    return (
      <div className="bg-card/30 backdrop-blur-lg border border-border rounded-2xl p-6 h-full flex flex-col items-center justify-center text-center">
        <Compass className="h-12 w-12 text-muted-foreground mb-4" />
        <h3 className="font-semibold text-lg text-foreground">Your Itinerary</h3>
        <p className="text-sm text-muted-foreground">Your generated schedule will appear here.</p>
      </div>
    );
  }

  return (
    <div className="bg-card/30 backdrop-blur-lg border border-border rounded-2xl p-4 h-full flex flex-col">
      <h3 className="font-semibold text-lg text-foreground mb-4 px-2">Daily Schedule</h3>
      <ScrollArea className="flex-grow pr-3">
        <div className="relative pl-6">
          <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-border" />
          {schedule.map((item, index) => {
            const Icon = typeIcons[item.type] || Compass;
            const colorClass = typeColors[item.type] || 'border-l-border';
            return (
              <div key={index} className="relative mb-6">
                <div className="absolute -left-[30px] top-1 h-6 w-6 rounded-full bg-muted border-2 border-background flex items-center justify-center">
                  <Icon className="h-3.5 w-3.5 text-muted-foreground" />
                </div>
                <div className={cn("ml-4 p-3 rounded-lg bg-background/50 border-l-4", colorClass)}>
                  <p className="text-xs font-bold text-muted-foreground">{item.time}</p>
                  <p className="text-sm font-medium text-foreground mt-1">{item.activity}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{item.duration}</p>
                </div>
              </div>
            );
          })}
        </div>
      </ScrollArea>
    </div>
  );
}
