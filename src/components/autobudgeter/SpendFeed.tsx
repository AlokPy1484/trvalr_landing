
'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Bed, Utensils, Plane, Sparkles, CheckCircle, XCircle, TrendingUp } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';

export interface SpendItem {
  id: string;
  category: 'Flights' | 'Stays' | 'Food' | 'Activities';
  description: string;
  amount: number;
  status: 'within' | 'over' | 'saved';
}

interface SpendFeedProps {
  items: SpendItem[];
}

const categoryInfo = {
  Flights: { icon: Plane, color: 'text-blue-500' },
  Stays: { icon: Bed, color: 'text-primary' },
  Food: { icon: Utensils, color: 'text-accent' },
  Activities: { icon: Sparkles, color: 'text-pink-500' },
};

const statusInfo = {
  within: { icon: CheckCircle, color: 'text-green-500' },
  over: { icon: XCircle, color: 'text-destructive' },
  saved: { icon: TrendingUp, color: 'text-green-500' },
};

export function SpendFeed({ items }: SpendFeedProps) {
  return (
    <Card className="bg-card/50 border border-border text-foreground h-full">
      <CardHeader>
        <CardTitle>Live Spend Feed</CardTitle>
        <CardDescription className="text-muted-foreground">Your recent transactions.</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-64 pr-4">
          <div className="space-y-4">
            {items.map(item => {
              const CategoryIcon = categoryInfo[item.category].icon;
              const StatusIcon = statusInfo[item.status].icon;
              const amountColor = item.status === 'over' ? 'text-destructive' : 'text-green-500';

              return (
                <div key={item.id} className="flex items-center gap-4">
                  <div className={cn("p-2 rounded-full bg-muted", categoryInfo[item.category].color)}>
                    <CategoryIcon className="h-5 w-5" />
                  </div>
                  <div className="flex-grow">
                    <p className="font-medium text-sm">{item.description}</p>
                    <p className="text-xs text-muted-foreground">{item.category}</p>
                  </div>
                  <div className="text-right">
                     <p className={cn("font-semibold text-sm", amountColor)}>
                        {item.status === 'over' ? '+' : ''}
                        {item.status === 'saved' ? '' : ''}
                        ₹{Math.abs(item.amount).toLocaleString()}
                     </p>
                    <div className={cn("flex items-center justify-end gap-1 text-xs", statusInfo[item.status].color)}>
                      <StatusIcon className="h-3 w-3" />
                      <span>{item.status}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
