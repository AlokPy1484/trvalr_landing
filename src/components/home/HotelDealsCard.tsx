'use client';

import Image from 'next/image';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink, Star, Wifi, Waves, Coffee } from 'lucide-react';


export const HotelDealsCard: React.FC = () => {
  return (
    <Card 
      className="overflow-hidden rounded-xl w-full bg-card flex flex-col h-full border-none"
    >
      <CardHeader className="p-0 flex-shrink-0">
        <div className="aspect-[18/10] relative w-full">
          <Image
            src="https://images.unsplash.com/photo-1518684079-3c830dcef090?q=80&w=1200&auto=format&fit=crop"
            alt="Dubai skyline with Burj Khalifa"
            fill
            className="object-cover"
            data-ai-hint="dubai skyline"
          />
        </div>
      </CardHeader>
      <CardContent className="p-5 bg-card flex-grow flex flex-col">
         <div className="flex justify-between items-start">
            <div>
                <div className="flex items-center mb-1">
                    {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 text-amber-400 fill-amber-400" />)}
                </div>
                <h3 className="font-headline text-xl font-semibold text-foreground">
                    al Burj Arab
                </h3>
            </div>
            <Badge variant="outline" className="bg-green-100 dark:bg-green-900/50 border-green-300 dark:border-green-700 text-green-800 dark:text-green-300">9.2</Badge>
        </div>
        
        <p className="text-sm text-muted-foreground mt-2 mb-3">
            An iconic sail-shaped silhouette, a symbol of modern Dubai.
        </p>

        <div className="flex items-center space-x-4 text-muted-foreground my-3">
            <div className="flex items-center gap-1.5 text-xs"><Wifi className="h-4 w-4" /> Wi-Fi</div>
            <div className="flex items-center gap-1.5 text-xs"><Waves className="h-4 w-4" /> Pool</div>
            <div className="flex items-center gap-1.5 text-xs"><Coffee className="h-4 w-4" /> Breakfast</div>
        </div>

        <div className="flex-grow"></div> 

        <div className="mt-auto pt-3 border-t border-border/50">
            <div className="flex justify-between items-center mb-3">
                <p className="text-sm text-muted-foreground">8 nights, 2 adults</p>
                <p className="text-xl font-bold text-foreground">$2,112</p>
            </div>
            <Button variant="outline" className="w-full">
                View Details
                <ExternalLink className="ml-2 h-4 w-4" />
            </Button>
        </div>
      </CardContent>
    </Card>
  );
};
