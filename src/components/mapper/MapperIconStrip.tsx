
'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Waypoints, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MapperIconStripProps {
  onRouteClick: () => void;
  onOptionsClick: () => void;
  activeSection: 'route' | 'options' | null;
}

export function MapperIconStrip({ onRouteClick, onOptionsClick, activeSection }: MapperIconStripProps) {
  return (
    <div className="w-16 h-full bg-sidebar flex flex-col items-center py-4 space-y-3 border-r border-sidebar-border">
      <Button
        variant="ghost"
        size="icon"
        className={cn(
          "h-10 w-10 rounded-lg text-sidebar-foreground hover:bg-sidebar-primary/20 hover:text-sidebar-primary",
          activeSection === 'route' && "bg-sidebar-primary text-sidebar-primary-foreground hover:bg-sidebar-primary/90 hover:text-sidebar-primary-foreground"
        )}
        onClick={onRouteClick}
        aria-label="Open route editor"
      >
        <Waypoints className="h-5 w-5" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className={cn(
          "h-10 w-10 rounded-lg text-sidebar-foreground hover:bg-sidebar-primary/20 hover:text-sidebar-primary",
          activeSection === 'options' && "bg-sidebar-primary text-sidebar-primary-foreground hover:bg-sidebar-primary/90 hover:text-sidebar-primary-foreground"
        )}
        onClick={onOptionsClick}
        aria-label="Open options"
      >
        <Settings className="h-5 w-5" />
      </Button>
    </div>
  );
}
