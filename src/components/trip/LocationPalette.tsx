'use client';

import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Search, MapPin, X, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Location {
  id: string;
  name: string;
  address?: string;
  category?: string;
}

interface LocationPaletteProps {
  isVisible: boolean;
  onLocationSelect: (location: Location) => void;
  onClose: () => void;
  onSave: () => void;
  onCancel: () => void;
}

// Mock locations - in production, this would come from an API
const mockLocations: Location[] = [
  { id: '1', name: 'Promenade des Anglais', address: 'Nice, France', category: 'Attraction' },
  { id: '2', name: 'Old Town (Vieux Nice)', address: 'Nice, France', category: 'Attraction' },
  { id: '3', name: 'Castle Hill', address: 'Nice, France', category: 'Attraction' },
  { id: '4', name: 'Cours Saleya Market', address: 'Nice, France', category: 'Market' },
  { id: '5', name: 'Musée Matisse', address: 'Nice, France', category: 'Museum' },
  { id: '6', name: 'Villa Ephrussi de Rothschild', address: 'Saint-Jean-Cap-Ferrat, France', category: 'Museum' },
  { id: '7', name: 'Monaco', address: 'Monaco', category: 'City' },
  { id: '8', name: 'Cannes', address: 'Cannes, France', category: 'City' },
  { id: '9', name: 'Antibes', address: 'Antibes, France', category: 'City' },
  { id: '10', name: 'Eze Village', address: 'Èze, France', category: 'Village' },
  { id: '11', name: 'Le Chantecler', address: 'Nice, France', category: 'Restaurant' },
  { id: '12', name: 'La Merenda', address: 'Nice, France', category: 'Restaurant' },
];

export function LocationPalette({ isVisible, onLocationSelect, onClose, onSave, onCancel }: LocationPaletteProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [draggedLocation, setDraggedLocation] = useState<Location | null>(null);

  const filteredLocations = mockLocations.filter(location =>
    location.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    location.address?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDragStart = (e: React.DragEvent, location: Location) => {
    setDraggedLocation(location);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('application/json', JSON.stringify(location));
    e.dataTransfer.setData('text/plain', location.id);
  };

  const handleDragEnd = () => {
    setDraggedLocation(null);
  };

  if (!isVisible) return null;

  return (
    <Card className="border border-border/50 shadow-lg">
      <CardHeader className="p-4 pb-3 border-b border-border/50">
        <div className="flex items-center justify-between mb-3">
          <CardTitle className="text-base sm:text-lg font-semibold text-foreground">
            Change Location
          </CardTitle>
          <div className="flex items-center gap-2">
            <Button
              variant="default"
              size="icon"
              className="h-8 w-8 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground"
              onClick={(e) => {
                e.stopPropagation(); // Prevent any event bubbling that might collapse accordion
                onSave();
              }}
              aria-label="Save changes"
            >
              <Check className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 rounded-full border-border hover:bg-muted"
              onClick={(e) => {
                e.stopPropagation(); // Prevent any event bubbling that might collapse accordion
                onCancel();
              }}
              aria-label="Cancel changes"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <div className="mt-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search locations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 h-9 text-sm"
            />
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <div className="space-y-2 max-h-[400px] overflow-y-auto custom-scrollbar">
          {filteredLocations.length === 0 ? (
            <div className="text-center py-8 text-sm text-muted-foreground">
              No locations found
            </div>
          ) : (
            filteredLocations.map((location) => (
              <div
                key={location.id}
                draggable
                onDragStart={(e) => handleDragStart(e, location)}
                onDragEnd={handleDragEnd}
                onClick={() => onLocationSelect(location)}
                className={cn(
                  "flex items-center gap-3 p-3 rounded-lg border border-border/50 bg-card hover:bg-muted/50 hover:border-primary/50 cursor-move transition-all group",
                  draggedLocation?.id === location.id && "opacity-50"
                )}
              >
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <MapPin className="h-4 w-4 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-sm text-foreground truncate">
                    {location.name}
                  </div>
                  {location.address && (
                    <div className="text-xs text-muted-foreground truncate">
                      {location.address}
                    </div>
                  )}
                </div>
                {location.category && (
                  <div className="flex-shrink-0">
                    <span className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
                      {location.category}
                    </span>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
        <div className="mt-4 pt-4 border-t border-border/50 text-xs text-muted-foreground text-center">
          Drag and drop locations to update your itinerary
        </div>
      </CardContent>
    </Card>
  );
}

