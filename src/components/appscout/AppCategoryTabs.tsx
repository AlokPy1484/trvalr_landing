
'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Plane, Utensils, Train, DollarSign, Ticket } from 'lucide-react';
import type { AppCategory } from './types';

interface AppCategoryTabsProps {
  activeCategory: AppCategory;
  onSelectCategory: (category: AppCategory) => void;
}

const categories: { id: AppCategory; label: string; icon: React.ElementType }[] = [
  { id: 'rideHailing', label: 'Ride-hailing', icon: Plane },
  { id: 'foodDelivery', label: 'Food Delivery', icon: Utensils },
  { id: 'publicTransit', label: 'Public Transit', icon: Train },
  { id: 'payments', label: 'Payments', icon: DollarSign },
  { id: 'events', label: 'Events', icon: Ticket },
];

export function AppCategoryTabs({ activeCategory, onSelectCategory }: AppCategoryTabsProps) {
  return (
    <div className="flex justify-center mb-3 overflow-x-auto scrollbar-hide">
      <div className="flex w-max space-x-2 rounded-full bg-muted p-1">
        {categories.map((cat) => {
          const Icon = cat.icon;
          return (
            <Button
              key={cat.id}
              variant={activeCategory === cat.id ? 'default' : 'ghost'}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-medium transition-all h-auto",
                activeCategory === cat.id ? 'bg-primary text-primary-foreground shadow-md' : 'text-muted-foreground'
              )}
              onClick={() => onSelectCategory(cat.id)}
            >
              <Icon className="mr-2 h-5 w-5" />
              {cat.label}
            </Button>
          );
        })}
      </div>
    </div>
  );
}
