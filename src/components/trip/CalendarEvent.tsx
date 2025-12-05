'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import type { Activity } from './ActivityCard';
import { Car, Hotel, MapPin as AttractionIcon, Sailboat, Utensils, Coffee, Sunrise, Sun, Sunset, Moon, MapPin } from 'lucide-react';

interface CalendarEventProps {
  event: Activity & { 
    location?: string;
    description?: string;
  };
  day: number;
}

const typeInfo: { [key: string]: { icon: React.ElementType; color: string } } = {
  'All-day': { 
    icon: MapPin, 
    color: 'bg-primary/10 border-primary/20 text-foreground'
  },
  Morning: { 
    icon: Sunrise, 
    color: 'bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20 border-amber-200/50 dark:border-amber-800/30 text-foreground'
  },
  Afternoon: { 
    icon: Sun, 
    color: 'bg-gradient-to-br from-yellow-50 to-amber-50 dark:from-yellow-950/20 dark:to-amber-950/20 border-yellow-200/50 dark:border-yellow-800/30 text-foreground'
  },
  Evening: { 
    icon: Sunset, 
    color: 'bg-gradient-to-br from-orange-50 to-rose-50 dark:from-orange-950/20 dark:to-rose-950/20 border-orange-200/50 dark:border-orange-800/30 text-foreground'
  },
  Night: { 
    icon: Moon, 
    color: 'bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950/20 dark:to-purple-950/20 border-indigo-200/50 dark:border-indigo-800/30 text-foreground'
  },
  Travel: { 
    icon: Car, 
    color: 'bg-accent/10 border-accent/20 text-foreground'
  },
  Accommodation: { 
    icon: Hotel, 
    color: 'bg-accent/10 border-accent/20 text-foreground'
  },
  Attraction: { 
    icon: AttractionIcon, 
    color: 'bg-primary/10 border-primary/20 text-foreground'
  },
  Activity: { 
    icon: Sailboat, 
    color: 'bg-primary/10 border-primary/20 text-foreground'
  },
  Food: { 
    icon: Utensils, 
    color: 'bg-accent/10 border-accent/20 text-foreground'
  },
  Break: { 
    icon: Coffee, 
    color: 'bg-muted border-border text-foreground'
  },
  default: { 
    icon: AttractionIcon, 
    color: 'bg-muted border-border text-foreground'
  },
};

// Helper to convert time string (e.g., "9:30 AM") to a grid row number
const timeToRow = (time?: string): number => {
  if (!time) return -1; // Return -1 if no time (won't render)

  const timeParts = time.split(' ');
  const modifier = timeParts.length > 1 ? timeParts[1].toUpperCase() : 'AM';
  let [hours, minutes] = timeParts[0].split(':').map(Number);
  
  if (isNaN(hours)) return -1;

  if (hours === 12) {
    hours = modifier === 'AM' ? 0 : 12;
  } else if (modifier === 'PM') {
    hours += 12;
  }

  const totalMinutesFromMidnight = hours * 60 + (minutes || 0);
  const startMinutes = 7 * 60; // Grid starts at 7:00 AM

  if (totalMinutesFromMidnight < startMinutes) return -1; 
  
  // Grid starts at row 2 (after headers), 5 rows per hour (12-minute intervals)
  return Math.floor((totalMinutesFromMidnight - startMinutes) / 12) + 2;
};

// Helper to parse duration string (e.g., "1.5h", "30min") to row span
const parseDurationToRows = (duration?: string): number => {
  if (!duration) return 5; // Default to 1 hour (5 rows)
  
  let totalMinutes = 0;
  const hourMatch = duration.match(/(\d+\.?\d*)\s*h/);
  const minMatch = duration.match(/(\d+)\s*min/);

  if (hourMatch) {
    totalMinutes += parseFloat(hourMatch[1]) * 60;
  }
  if (minMatch) {
    totalMinutes += parseInt(minMatch[1], 10);
  }
  
  if (totalMinutes === 0) return 5;
  if (totalMinutes < 30) return 3;

  // 5 rows per hour (12 mins per row)
  return Math.max(1, Math.ceil(totalMinutes / 12));
};


export function CalendarEvent({ event, day }: CalendarEventProps) {
  const startRow = timeToRow(event.time);
  const rowSpan = parseDurationToRows(event.duration);
  
  const { icon: Icon, color } = typeInfo[event.type] || typeInfo.default;

  // Don't render if no valid time
  if (startRow === -1) return null;

  const style: React.CSSProperties = {
    gridColumnStart: day + 1,
    gridRow: `${startRow} / span ${rowSpan}`,
    zIndex: 10,
  };

  return (
    <div
      style={style}
      className={cn(
        'm-0.5 p-2 rounded-md border text-xs overflow-hidden flex flex-col',
        color
      )}
    >
      <div className="flex items-start gap-1.5">
        <Icon className="h-3.5 w-3.5 mt-0.5 flex-shrink-0" />
        <div className="flex-grow min-w-0">
          <p className="font-semibold leading-tight line-clamp-2">{event.title}</p>
          {event.time && (
            <p className="text-muted-foreground leading-tight mt-1 text-[10px]">{event.time}</p>
          )}
        </div>
      </div>
    </div>
  );
}
