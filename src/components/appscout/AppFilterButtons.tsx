
'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Check, Globe, DollarSign, Star } from 'lucide-react';
import React from 'react';

const filters = [
    { id: 'essentials', label: 'Essentials Only', icon: Check },
    { id: 'offline', label: 'Works Offline', icon: Globe },
    { id: 'free', label: 'Free Only', icon: DollarSign },
    { id: 'highly-rated', label: 'Highly Rated', icon: Star },
];

interface AppFilterButtonsProps {
  activeFilters: string[];
  onToggleFilter: (filterId: string) => void;
}

export function AppFilterButtons({ activeFilters, onToggleFilter }: AppFilterButtonsProps) {
  return (
    <div className="flex justify-center flex-wrap gap-2 mt-4">
      {filters.map(filter => {
        const isActive = activeFilters.includes(filter.id);
        const Icon = filter.icon;
        return (
          <Button
            key={filter.id}
            variant="outline"
            size="sm"
            className={cn(
              "rounded-full h-8 text-xs transition-all duration-200",
              isActive 
                ? 'bg-primary/10 border-primary text-primary' 
                : 'bg-background/70 border-border/70 hover:bg-muted'
            )}
            onClick={() => onToggleFilter(filter.id)}
          >
            <Icon className="h-4 w-4 mr-2" />
            {filter.label}
          </Button>
        );
      })}
    </div>
  );
}
