
'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Trash2 } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn, daysBetween, formatDate } from '@/lib/utils';
import type { Currency } from '@/contexts/CurrencyContext';
import { HotelRecommendation } from '../trip/hotel-recommendation-types';
import { useEffect, useState } from 'react';


interface HotelCardProps {
  hotel: HotelRecommendation;
  onReserve?: () => void;
  onDelete?: () => void;
}

const typeBadgeColors: { [key: string]: string } = {
  Luxury: 'bg-purple-100 text-purple-700 border-purple-300',
  Boutique: 'bg-pink-100 text-pink-700 border-pink-300',
  'Mid-range': 'bg-blue-100 text-blue-700 border-blue-300',
  Resort: 'bg-green-100 text-green-700 border-green-300',
  Budget: 'bg-yellow-100 text-yellow-700 border-yellow-300',
  default: 'bg-muted text-muted-foreground border-border',
};

export function OrderItemCard({ hotel, onReserve, onDelete }: HotelCardProps) {
  const { getTranslation } = useLanguage();
const [hotelDetails,setHotelDetails]=useState<HotelRecommendation | "">()
  // // Hotel fields
  // const title = hotel?.hotel_name;
  const badgeText = hotel.hotel_category || 'Accommodation';
  const badgeColorClass = typeBadgeColors[badgeText] || typeBadgeColors.default;
  // const itemDetails = `${hotel.hotel_location.city}, ${hotel.hotel_location.country}`;
  // const displayPrice = new Intl.NumberFormat('en-IN', {
  //   style: 'currency',
  //   currency: hotel.currency || 'INR',
  //   minimumFractionDigits: hotel.currency === 'JPY' ? 0 : 2,
  // }).format(hotel.price_per_night);
useEffect(()=>{
  if(hotel){
    setHotelDetails(hotel)
  }
  console.log(hotelDetails)
},[hotel])
  return (
    <div className="flex flex-col sm:flex-row items-start gap-4 p-4 border border-border rounded-lg bg-card shadow-sm">
      {/* Image placeholder */}
      <div className="flex-shrink-0 w-full sm:w-24 h-20 sm:h-auto relative rounded-md overflow-hidden bg-gray-200">
        {/* <Image
          src="/hotel-placeholder.jpg" // replace with hotel image when available
          alt={hotelDetails?.hotel_name}
          fill
          className="object-cover"
          data-ai-hint={hotel.why_recommended}
        /> */}
      </div>

      {/* Hotel details */}
      <div className="flex-grow">
        <h3 className="font-semibold text-md text-foreground mb-1">{hotelDetails?.hotel_name}</h3>
        <p className="text-xs text-muted-foreground mb-1">
          {/* {hotelDetails?.hotel_location?.street_name}, {hotelDetails?.hotel_location.city} */}
          {`${formatDate(hotelDetails?.start_date)} - ${formatDate(hotelDetails?.end_date)}`}
        
        </p>
        <Badge variant="outline" className={cn("text-xs py-0.5 px-1.5 font-normal", badgeColorClass)}>
          Accomodation
        </Badge>
      </div>

      {/* Price + Actions */}
      <div className="flex flex-col items-start sm:items-end sm:text-right mt-2 sm:mt-0 ml-auto flex-shrink-0">
        <p className="text-xs text-muted-foreground mb-0.5">{`1 rooms, ${hotelDetails?.travellers} people`}</p>
        <p className="text-lg font-semibold text-foreground mb-2">{hotelDetails?.currency} {hotelDetails?.price_per_night*daysBetween(hotelDetails?.start_date,hotelDetails?.end_date)}</p>
        <div className="flex items-center gap-2">
          <Button
            variant="default"
            size="sm"
            className="h-9 bg-primary text-primary-foreground hover:bg-primary/90"
            onClick={onReserve}
          >
            {getTranslation('reserveButton', 'Reserve')} <ExternalLink className="ml-1.5 h-3.5 w-3.5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9 hover:bg-muted/30 group"
            onClick={onDelete}
            aria-label={getTranslation('deleteItem', 'Delete item')}
          >
            <Trash2 className="h-4 w-4 text-muted-foreground group-hover:text-destructive" />
          </Button>
        </div> 
      </div>
    </div>
  );
}
