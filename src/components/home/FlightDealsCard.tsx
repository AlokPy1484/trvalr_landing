'use client';

import Image from 'next/image';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Plane, ExternalLink, Building2 } from 'lucide-react';

interface FlightDealProps {
  fromCity: string;
  fromCode: string;
  toCity: string;
  toCode: string;
  airline: string;
  airlineLogoUrl: string;
  price: string;
  duration: string;
}

const FlightDealRow: React.FC<FlightDealProps> = ({ fromCity, fromCode, toCity, toCode, airline, airlineLogoUrl, price, duration }) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

  return (
    <div className="group hover:bg-muted/30 transition-colors duration-200 rounded-lg p-3 sm:p-4 border border-transparent hover:border-border/50">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
        {/* Airline Logo */}
        <div className="flex-shrink-0">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-background border border-border/50 p-1.5 sm:p-2 flex items-center justify-center group-hover:border-primary/30 transition-colors relative overflow-hidden">
            {!imageError ? (
              <>
                <Image 
                  src={airlineLogoUrl} 
                  alt={`${airline} logo`} 
                  width={32} 
                  height={32} 
                  className={`object-contain transition-opacity duration-200 ${imageLoading ? 'opacity-0 absolute' : 'opacity-100'}`}
                  style={{ maxWidth: '100%', maxHeight: '100%' }}
                  data-ai-hint={`${airline.toLowerCase()} logo`}
                  unoptimized
                  onError={() => {
                    setImageError(true);
                    setImageLoading(false);
                  }}
                  onLoad={() => setImageLoading(false)}
                />
                {imageLoading && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-4 h-4 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
                  </div>
                )}
              </>
            ) : (
              <Building2 className="w-5 h-5 sm:w-6 sm:h-6 text-muted-foreground flex-shrink-0" />
            )}
          </div>
        </div>

        {/* Flight Route - Desktop View */}
        <div className="flex-grow hidden sm:flex items-center gap-4 min-w-0">
          <div className="flex-shrink-0 text-left min-w-[80px]">
            <div className="font-bold text-base sm:text-lg text-foreground">{fromCode}</div>
            <div className="text-xs text-muted-foreground truncate">{fromCity}</div>
          </div>
          
          <div className="flex-grow flex items-center gap-2 min-w-0">
            <div className="flex-grow relative h-px bg-border">
              <Plane className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-muted-foreground bg-card absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-1" />
            </div>
            <div className="flex-shrink-0 text-center min-w-[100px]">
              <div className="text-xs text-muted-foreground font-medium">{duration}</div>
              <div className="text-xs text-primary font-medium mt-0.5 truncate">{airline}</div>
            </div>
            <div className="flex-grow relative h-px bg-border">
              <Plane className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-muted-foreground bg-card absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-1" />
            </div>
          </div>
          
          <div className="flex-shrink-0 text-right min-w-[80px]">
            <div className="font-bold text-base sm:text-lg text-foreground">{toCode}</div>
            <div className="text-xs text-muted-foreground truncate">{toCity}</div>
          </div>
        </div>

        {/* Flight Route - Mobile View */}
        <div className="flex-grow sm:hidden w-full">
          <div className="flex items-center justify-between mb-2">
            <div className="text-left">
              <div className="font-bold text-base text-foreground">{fromCode}</div>
              <div className="text-xs text-muted-foreground truncate max-w-[100px]">{fromCity}</div>
            </div>
            <div className="flex items-center gap-2 px-2">
              <div className="flex-grow relative h-px bg-border max-w-[60px]">
                <Plane className="h-3 w-3 text-muted-foreground bg-card absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-0.5" />
              </div>
              <div className="text-center min-w-[60px]">
                <div className="text-[10px] text-muted-foreground font-medium">{duration}</div>
                <div className="text-[10px] text-primary font-medium mt-0.5 truncate">{airline}</div>
              </div>
              <div className="flex-grow relative h-px bg-border max-w-[60px]">
                <Plane className="h-3 w-3 text-muted-foreground bg-card absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-0.5" />
              </div>
            </div>
            <div className="text-right">
              <div className="font-bold text-base text-foreground">{toCode}</div>
              <div className="text-xs text-muted-foreground truncate max-w-[100px]">{toCity}</div>
            </div>
          </div>
        </div>

        {/* Price */}
        <div className="flex-shrink-0 text-left sm:text-right w-full sm:w-auto sm:min-w-[100px]">
          <div className="font-bold text-lg sm:text-xl text-primary">{price}</div>
          <div className="text-xs text-muted-foreground">Round trip</div>
        </div>
      </div>
    </div>
  );
}

const flightDealsData: FlightDealProps[] = [
    {
        fromCity: 'Berlin', fromCode: 'BER', toCity: 'Majorca', toCode: 'PMI', duration: '2h 45m', price: '$125', airline: 'Ryanair', airlineLogoUrl: 'https://logos-world.net/wp-content/uploads/2020/10/Ryanair-Logo.png'
    },
    {
        fromCity: 'New York', fromCode: 'JFK', toCity: 'London', toCode: 'LHR', duration: '7h 15m', price: '$450', airline: 'British Airways', airlineLogoUrl: 'https://logos-world.net/wp-content/uploads/2020/03/British-Airways-Logo.png'
    },
    {
        fromCity: 'Tokyo', fromCode: 'HND', toCity: 'Seoul', toCode: 'ICN', duration: '2h 20m', price: '$180', airline: 'Korean Air', airlineLogoUrl: 'https://logos-world.net/wp-content/uploads/2021/04/Korean-Air-Logo.png'
    },
    {
        fromCity: 'Los Angeles', fromCode: 'LAX', toCity: 'Sydney', toCode: 'SYD', duration: '15h 5m', price: '$950', airline: 'Qantas', airlineLogoUrl: 'https://logos-world.net/wp-content/uploads/2020/03/Qantas-Logo-1984-2007.png'
    },
    {
        fromCity: 'Dubai', fromCode: 'DXB', toCity: 'Istanbul', toCode: 'IST', duration: '4h 30m', price: '$320', airline: 'Emirates', airlineLogoUrl: 'https://logos-world.net/wp-content/uploads/2020/03/Emirates-Logo.png'
    },
    {
        fromCity: 'Singapore', fromCode: 'SIN', toCity: 'Bali', toCode: 'DPS', duration: '2h 40m', price: '$150', airline: 'Singapore Airlines', airlineLogoUrl: 'https://logos-world.net/wp-content/uploads/2020/07/Singapore-Airlines-Logo.png'
    },
];


export const FlightDealsCard: React.FC = () => {
  return (
    <Card 
      className="overflow-hidden rounded-xl w-full p-0 bg-card h-full flex flex-col border border-border/30 shadow-lg"
    >
      <CardHeader className="p-4 sm:p-5 pb-3 sm:pb-4 border-b border-border/50">
        <CardTitle className="text-xl sm:text-2xl font-semibold text-foreground">Top Flight Deals</CardTitle>
        <CardDescription className="text-xs sm:text-sm text-muted-foreground mt-1">Based on your preferences</CardDescription>
      </CardHeader>
      <CardContent className="p-3 sm:p-4 sm:p-5 pt-3 sm:pt-4 flex-grow flex flex-col overflow-y-auto">
        <div className="flex-grow space-y-1 sm:space-y-2">
          {flightDealsData.map((deal, index) => (
            <FlightDealRow key={index} {...deal} />
          ))}
        </div>
        <div className="mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-border/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0">
          <p className="text-xs text-muted-foreground">Powered by Skyscanner</p>
          <Button variant="outline" size="sm" className="h-8 sm:h-9 text-xs sm:text-sm w-full sm:w-auto">
            View All Deals <ExternalLink className="ml-2 h-3 w-3 sm:h-3.5 sm:w-3.5" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
