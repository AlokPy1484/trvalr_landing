
'use client';

import Image from 'next/image';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CalendarDays, MapPin, Clock, Sun, Edit3, Trash2, MoreHorizontal, Share2, ImageIcon, type LucideIcon } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';

export interface TripCardProps {
  id: string;
  heroImageUrl: string;
  heroImageAlt: string;
  aiHint: string;
  destination: string;
  location: string;
  date: string;
  duration?: string;
  statusBadge: string;
  statusColor?: string;
  tagline?: string;
  weather?: string;
  tripIcon?: LucideIcon;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  onAddToDiary?: (id: string) => void;
  onShare?: (id: string) => void;
  isPublic?: boolean;
}

export function TripCard({
  id,
  heroImageUrl,
  heroImageAlt,
  aiHint,
  destination,
  location,
  date,
  duration,
  statusBadge,
  statusColor = 'bg-stone-500/20 text-stone-300 border-stone-400/30',
  tagline,
  weather,
  tripIcon: TripIcon,
  onEdit,
  onDelete,
  onAddToDiary,
  onShare,
  isPublic = false,
}: TripCardProps) {
  const { getTranslation } = useLanguage();
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);
  
  // Fallback image URL
  const fallbackImage = 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=600&h=400&fit=crop';
  const displayImage = imageError ? fallbackImage : heroImageUrl;

  return (
    <div className="bg-card border border-border rounded-xl shadow-lg overflow-hidden flex flex-col group hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-1">
      <div className="relative aspect-[16/9] w-full bg-muted">
        {imageLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-muted animate-pulse">
            <ImageIcon className="h-12 w-12 text-muted-foreground/50" />
          </div>
        )}
        <Image
          src={displayImage}
          alt={heroImageAlt}
          fill
          className={cn(
            "object-cover group-hover:scale-105 transition-transform duration-300",
            imageLoading && "opacity-0"
          )}
          data-ai-hint={aiHint}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          onError={() => {
            setImageError(true);
            setImageLoading(false);
          }}
          onLoad={() => setImageLoading(false)}
          unoptimized
        />
        <div className="absolute top-3 right-3 flex gap-2">
          <Badge variant="outline" className={cn("text-xs backdrop-blur-sm bg-background/80", statusColor)}>
            {statusBadge}
          </Badge>
          {TripIcon && (
            <div className="p-1.5 bg-background/80 backdrop-blur-sm rounded-full shadow">
              <TripIcon className="h-4 w-4 text-foreground" />
            </div>
          )}
        </div>
      </div>

      <div className="p-5 flex flex-col flex-grow">
        <h3 className="font-headline text-xl font-bold text-foreground mb-1 truncate" title={destination}>
          {destination}
        </h3>
        <div className="flex items-center text-xs text-muted-foreground mb-2">
          <MapPin className="h-3.5 w-3.5 mr-1.5" />
          <span>{location}</span>
        </div>

        <div className="flex items-center text-xs text-muted-foreground mb-3 space-x-3">
          <div className="flex items-center">
            <CalendarDays className="h-3.5 w-3.5 mr-1.5" />
            <span>{date}</span>
          </div>
          {duration && (
            <div className="flex items-center">
              <Clock className="h-3.5 w-3.5 mr-1.5" />
              <span>{duration}</span>
            </div>
          )}
        </div>
        
        {tagline && (
          <p className="text-sm text-foreground/80 italic mb-3 flex-grow">
            &ldquo;{tagline}&rdquo;
          </p>
        )}
        
        <div className="flex items-center justify-between text-xs text-muted-foreground mt-auto pt-3 border-t border-border">
          {weather && (
            <div className="flex items-center">
              <Sun className="h-4 w-4 mr-1.5 text-primary" />
              <span>{weather}</span>
            </div>
          )}
          <div className="flex items-center gap-1 ml-auto">
            {onShare && (
              <Button
                variant="ghost"
                size="icon"
                className={`h-7 w-7 ${isPublic 
                  ? 'text-green-600 hover:text-green-700 hover:bg-green-500/10' 
                  : 'text-muted-foreground hover:text-primary hover:bg-primary/10'}`}
                onClick={(e) => {
                  e.stopPropagation();
                  onShare(id);
                }}
                title={isPublic ? 'Shared Publicly' : 'Share Publicly'}
              >
                <Share2 className={`h-4 w-4 ${isPublic ? 'fill-current' : ''}`} />
              </Button>
            )}
            {onDelete && (
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(id);
                }}
                title="Delete Trip"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            )}
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 text-muted-foreground hover:text-foreground hover:bg-muted"
              onClick={(e) => {
                e.stopPropagation();
                onAddToDiary && onAddToDiary(id);
              }}
              title={getTranslation('myTripsAddToDiary', 'Add to Diary')}
            >
              <Edit3 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
