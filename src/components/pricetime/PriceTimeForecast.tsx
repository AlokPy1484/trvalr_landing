
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowDown, Clock, HelpCircle, TrendingUp, AlertTriangle } from 'lucide-react';
import { ConfidenceRing } from './ConfidenceRing';
import { ForecastChart } from './ForecastChart';
import { SmartLockCard } from './SmartLockCard';
import { AutoBookCard } from './AutoBookCard';

export interface ForecastData {
    prediction: string;
    confidence: number;
    recommendation: 'Wait' | 'Book Now' | 'Consider';
    pastTrend: { day: number; price: number }[];
    futureTrend: { day: number; price: number; best?: boolean }[];
    currentPrice: number;
}

interface PriceTimeForecastProps {
  data: ForecastData;
}

const recommendationStyles = {
    'Wait': 'bg-green-500/10 text-green-700 dark:text-green-300 border-green-500/30',
    'Book Now': 'bg-destructive/10 text-destructive border-destructive/30',
    'Consider': 'bg-yellow-500/10 text-yellow-600 dark:text-yellow-300 border-yellow-500/30',
};

export function PriceTimeForecast({ data }: PriceTimeForecastProps) {
  return (
    <div className="w-full max-w-7xl mx-auto p-4 md:p-8 space-y-8">
        {/* Main Prediction Card */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Card className="bg-card/50 border-border/80 backdrop-blur-lg overflow-hidden">
                <CardContent className="p-6 grid md:grid-cols-[1fr_auto_1fr] gap-6 items-center">
                    <div className="text-center md:text-left">
                        <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
                           <ArrowDown className="h-5 w-5 text-green-500" />
                           <p className="text-lg text-muted-foreground">AI Price Forecast</p>
                        </div>
                        <p className="text-2xl md:text-3xl font-bold text-foreground leading-tight">{data.prediction}</p>
                    </div>
                    
                    <div className="hidden md:block h-24 border-l border-border" />

                    <div className="flex flex-col items-center gap-4">
                        <ConfidenceRing value={data.confidence} />
                         <Badge variant="outline" className={`text-sm py-1 px-3 font-semibold ${recommendationStyles[data.recommendation]}`}>
                            {data.recommendation === 'Wait' && <Clock className="h-4 w-4 mr-2" />}
                            {data.recommendation === 'Book Now' && <AlertTriangle className="h-4 w-4 mr-2" />}
                            {data.recommendation === 'Consider' && <HelpCircle className="h-4 w-4 mr-2" />}
                            {data.recommendation}
                        </Badge>
                    </div>
                </CardContent>
            </Card>
        </motion.div>

        {/* Fare History and Forecast Charts */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.2 }}>
            <div className="grid md:grid-cols-2 gap-8">
                <Card className="bg-card/50 border-border/80 backdrop-blur-lg">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-foreground"><TrendingUp className="text-primary"/>Past 30 Days Fare History</CardTitle>
                        <CardDescription>How prices for this route have trended recently.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ForecastChart data={data.pastTrend} color="hsl(var(--primary))" />
                    </CardContent>
                </Card>
                <Card className="bg-card/50 border-border/80 backdrop-blur-lg">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-foreground"><TrendingUp className="text-accent"/>Next 10 Days Fare Forecast</CardTitle>
                         <CardDescription>AI-powered price predictions for the near future.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ForecastChart data={data.futureTrend} color="hsl(var(--accent))" showBestBuy />
                    </CardContent>
                </Card>
            </div>
        </motion.div>
        
        {/* Smart Lock and Auto-Book cards */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.4 }}>
            <div className="grid md:grid-cols-2 gap-8">
                <SmartLockCard currentPrice={data.currentPrice} />
                <AutoBookCard />
            </div>
        </motion.div>
    </div>
  );
}
