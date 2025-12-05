'use client';

import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Car, Hotel, MapPin as AttractionIcon, Clock, Star, ChevronRight, Users, Sailboat } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Checkbox } from '../ui/checkbox';
import { useState } from 'react';
import { HotelRecommendation } from '@/app/trip-details/trips-types';

export interface Activity {
  // Required
  type: string; 
  title: string; 

  // Display-related
  duration?: string;   // e.g. "1h 30min" (used in CalendarEvent)
  persons?: string; 
  imageUrl?: string;
  imageAlt?: string;
  aiHint?: string;
  rating?: number;
  reviews?: string; 
  price?: string; 
  discount?: string;
  category?: string; 
  icon: 'Car' | 'Hotel' | 'Attraction' | 'Sailboat';
  distanceToNext?: string;
  isBookingView?: boolean;

  // Calendar + scheduling fields
  time?: string;        // e.g. "9:30 AM" (UI display in CalendarEvent)
  start_time?: string;  // ISO 8601, e.g. "2025-09-26T09:30:00"
  end_time?: string;    // ISO 8601, e.g. "2025-09-26T11:00:00"
  description?: string; // AI-generated description for itinerary
}



const iconComponents = {
  Car: Car,
  Hotel: Hotel,
  Attraction: AttractionIcon,
  Sailboat: Sailboat,
};

const badgeColors: { [key: string]: string } = {
  default: 'bg-gray-100 text-gray-700 border-gray-300',
  Travel: 'bg-sky-100 text-sky-700 border-sky-300',
  Accommodation: 'bg-indigo-100 text-indigo-700 border-indigo-300',
  Attraction: 'bg-amber-100 text-amber-700 border-amber-300',
  Activity: 'bg-rose-100 text-rose-700 border-rose-300',
};

export function ActivityCard({
  hotel_id,
  hotel_name,
  hotel_category,
  hotel_location,
  hotel_latitude,
  hotel_longitude,
  hotel_ratings,
  review_count,
  rating_source,
  amenities,
  price_per_night,
  currency,
  why_recommended,
   isSelected = false,
  onSelect,
  // imageUrl,
  // imageAlt = "Hotel image",
  // aiHint = "hotel placeholder",
  // discount,
  // icon,
  // isBookingView = false,
}: HotelRecommendation &{
   isSelected?: boolean;
  onSelect?: (checked: boolean) => void;
}) {
  const { getTranslation } = useLanguage();
 
  // const IconComponent = iconComponents[icon || "default"];
  const badgeColorClass = badgeColors["accommodation"] || badgeColors.default;

  const handleCardClick = () => {
    console.log(`HotelCard clicked: ${hotel_name}`);
  };

  return (
    
    <div

      className={cn(
        "p-4 rounded-lg border bg-card hover:shadow-md transition-shadow cursor-pointer relative group",
        // !isBookingView && "ml-4"
      )}
      onClick={handleCardClick}
    >
      <div className="flex items-start gap-4">
        {/* {imageUrl && (
          <div className="flex-shrink-0">
            <Image
              src={imageUrl}
              alt={imageAlt}
              width={80}
              height={80}
              className="rounded-md object-cover aspect-square"
              data-ai-hint={aiHint}
            />
          </div>
        )} */}
        <div className="flex-grow flex">
          <div className='w-fit mr-10'> <Checkbox checked={isSelected} onCheckedChange={(val)=>onSelect?.(!!val)}/></div>
          <div>
          <div className="flex justify-between items-start mb-1">
            <Badge
              variant="outline"
              className={`text-xs ${badgeColorClass} mb-1`}
            >
              {hotel_category}
            </Badge>
          </div>
          <h5 className="font-semibold text-foreground text-sm">
            {hotel_name}
          </h5>

          {/* Ratings */}
          {(hotel_ratings || review_count) && (
            <div className="flex items-center text-xs text-muted-foreground mt-1">
              {hotel_ratings && (
                <Badge
                  variant="secondary"
                  className="bg-green-600 text-white px-1.5 py-0.5 text-xs mr-1"
                >
                  {hotel_ratings.toFixed(1)}
                </Badge>
              )}
              {review_count && <span>{review_count} reviews</span>}
            </div>
          )}

          {/* Price + Discount */}
          <div className="flex items-center text-xs mt-0.5">
            {/* {discount && (
              <Badge
                variant="outline"
                className="text-xs bg-green-100 text-green-700 border-green-300 mr-2 px-1.5 py-0.5"
              >
                {discount}
              </Badge>
            )} */}
            {/* {price_per_night && (
              <span className="text-muted-foreground">
               <b> {currency} {price_per_night}/night</b>
              </span>
            )} */}
          </div>

          {/* Why recommended */}
          <p className="text-xs text-muted-foreground mt-1">
            {why_recommended}
          </p>
          </div>
          <div className='ml-auto'>
             {price_per_night && (
              <span className="text-muted-foreground text-white">
               <b> {currency} {price_per_night} / night</b>
              </span>
            )}
        
          </div>
        </div>

        {/* {isBookingView ? (
          <div className="flex flex-col items-end justify-center h-full ml-4">
            <Button variant="outline" size="sm" className="h-8">
              Manage
            </Button>
          </div>
        ) : (
          <ChevronRight className="h-5 w-5 text-muted-foreground absolute top-1/2 right-3 -translate-y-1/2 group-hover:text-primary" />
        )} */}
      </div>
    </div>
  );
}
