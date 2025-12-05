
'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { TrendingUp } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

interface PriceTimeHeroProps {
    onAnalyzeRoute: () => void;
}

// Mock data for the animated graph
const priceData = [
  { name: 'Day 1', price: 450 },
  { name: 'Day 2', price: 460 },
  { name: 'Day 3', price: 440 },
  { name: 'Day 4', price: 480 },
  { name: 'Day 5', price: 470 },
  { name: 'Day 6', price: 510 },
  { name: 'Day 7', price: 490 },
];

export function PriceTimeHero({ onAnalyzeRoute }: PriceTimeHeroProps) {

  return (
    <section className="relative h-[calc(100vh-80px)] min-h-[600px] w-full flex flex-col items-center justify-center text-center text-foreground overflow-hidden p-4">
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent z-10" />

      {/* Content */}
      <div className="relative z-20 flex flex-col items-center justify-center h-full max-w-4xl w-full mx-auto">
        <div className="w-20 h-20 mb-6 bg-card/50 border border-border rounded-full flex items-center justify-center backdrop-blur-sm">
          <TrendingUp className="h-10 w-10 text-primary" />
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-4 animate-fade-up font-headline" style={{ animationDelay: '0.2s' }}>
          Time your trip like a stock trader
        </h1>
        <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mb-8 animate-fade-up" style={{ animationDelay: '0.4s' }}>
          Our AI forecasts flight fares, so you can lock in the best price. Never overpay for a flight again.
        </p>

        <div className="w-full h-48 max-w-2xl mb-8 opacity-70" style={{ animationDelay: '0.6s' }}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={priceData}>
              <defs>
                <linearGradient id="priceGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <Tooltip
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--popover))', 
                  borderColor: 'hsl(var(--border))', 
                  borderRadius: '0.5rem',
                  color: 'hsl(var(--popover-foreground))'
                }}
                itemStyle={{ color: 'hsl(var(--primary))' }}
                cursor={{ stroke: 'hsl(var(--primary))', strokeWidth: 1, strokeDasharray: '3 3' }}
              />
              <Area 
                type="monotone" 
                dataKey="price" 
                stroke="hsl(var(--primary))" 
                strokeWidth={2}
                fill="url(#priceGradient)"
                dot={false}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <Button
          onClick={onAnalyzeRoute}
          size="lg"
          className="bg-primary text-primary-foreground font-semibold hover:bg-primary/90 rounded-lg px-8 py-3 text-base shadow-lg shadow-primary/20 transition-all duration-300 transform hover:scale-105"
          style={{ animationDelay: '0.8s' }}
        >
          Analyze My Route
        </Button>
      </div>
    </section>
  );
}
