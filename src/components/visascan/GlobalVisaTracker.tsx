
'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowUpRight } from 'lucide-react';

const trendingRoutes = [
  { from: '🇮🇳 India', to: '🇦🇪 UAE', status: 'E-Visa' },
  { from: '🇺🇸 USA', to: '🇮🇹 Italy', status: 'Schengen' },
  { from: '🇬🇧 UK', to: '🇹🇷 Turkey', status: 'E-Visa' },
];

const newsItems = [
    { title: "Schengen area expands with new members.", date: "2d ago" },
    { title: "Thailand extends visa exemption for tourists.", date: "1w ago" },
];

export function GlobalVisaTracker() {
  return (
    <Card className="bg-card/50 backdrop-blur-lg border border-border/20 shadow-xl">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-foreground">Global Visa Tracker</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-2">Trending Visa-Free Routes</h4>
            <div className="space-y-2">
              {trendingRoutes.map((route, i) => (
                <div key={i} className="flex justify-between items-center text-sm p-2 bg-muted/50 rounded-md">
                  <span>{route.from} → {route.to}</span>
                  <span className="text-xs font-medium text-green-500">{route.status}</span>
                </div>
              ))}
            </div>
          </div>
           <div>
            <h4 className="text-sm font-semibold text-foreground mb-2">Latest Policy News</h4>
            <div className="space-y-2">
                {newsItems.map((item, i) => (
                    <div key={i} className="flex justify-between items-center text-sm text-foreground">
                        <p className="truncate pr-2">{item.title}</p>
                        <span className="text-xs text-muted-foreground whitespace-nowrap">{item.date}</span>
                    </div>
                ))}
            </div>
          </div>
          <Button variant="outline" className="w-full">
            Explore Global Trends <ArrowUpRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
