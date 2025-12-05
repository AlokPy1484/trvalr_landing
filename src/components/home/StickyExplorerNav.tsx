
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Bed, Utensils, MapPin, Sparkles, Plane } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ExplorerFilters } from './ExplorerFilters';
import { cn } from '@/lib/utils';

type Category = 'stays' | 'restaurants' | 'activities' | 'flights';

const categories: { id: Category; label: string; icon: React.ElementType }[] = [
  { id: 'stays', label: 'Stays', icon: Bed },
  { id: 'restaurants', label: 'Restaurants', icon: Utensils },
  { id: 'activities', label: 'Activities', icon: Sparkles },
  { id: 'flights', label: 'Flights', icon: Plane },
];

export function StickyExplorerNav() {
  const [activeCategory, setActiveCategory] = React.useState<Category>('stays');

  return (
    <motion.div
      initial={{ y: '-100%', opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: '-100%', opacity: 0 }}
      transition={{ duration: 0.35, ease: [0.32, 0.72, 0, 1] }} // Smoother cubic-bezier easing
      className="fixed top-16 left-0 right-0 z-30 bg-background/90 backdrop-blur-lg border-b border-border shadow-md"
    >
      <div className="container mx-auto px-4 py-3">
        {/* Category Pills */}
        <div className="flex justify-center mb-3">
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
                  onClick={() => setActiveCategory(cat.id)}
                >
                  <Icon className="mr-2 h-5 w-5" />
                  {cat.label}
                </Button>
              );
            })}
          </div>
        </div>

        {/* Filter Bar */}
        <ExplorerFilters />
      </div>
    </motion.div>
  );
}
