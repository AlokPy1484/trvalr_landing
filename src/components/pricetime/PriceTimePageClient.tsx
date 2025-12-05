
'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Header } from '@/components/layout/Header';
import { PriceTimeFooter } from './PriceTimeFooter';
import { PriceTimeHero } from './PriceTimeHero';
import { PriceTimeSmartSearch } from './PriceTimeSmartSearch';
import { PriceTimeForecast, type ForecastData } from './PriceTimeForecast';

const SCROLL_THRESHOLD = 50;

// Mock data to simulate AI forecast results
const mockForecastData: ForecastData = {
  prediction: "Your flight to Tokyo is expected to drop ₹2,300 in 4 days.",
  confidence: 85,
  recommendation: "Wait",
  pastTrend: [
    { day: -30, price: 48000 }, { day: -25, price: 47500 }, { day: -20, price: 49000 },
    { day: -15, price: 48500 }, { day: -10, price: 47000 }, { day: -5, price: 46500 },
    { day: 0, price: 46000 },
  ],
  futureTrend: [
    { day: 0, price: 46000 }, { day: 2, price: 45000 }, { day: 4, price: 43700, best: true },
    { day: 6, price: 44500 }, { day: 8, price: 45500 }, { day: 10, price: 47000 },
  ],
  currentPrice: 46000
};


export function PriceTimePageClient() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const [view, setView] = useState<'hero' | 'search' | 'forecast'>('hero');
  const [forecastData, setForecastData] = useState<ForecastData | null>(null);

  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY;
    setIsScrolled(currentScrollY > SCROLL_THRESHOLD);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const handleHeaderSearchSubmit = () => {
    console.log('Header search submitted on PriceTime page:', searchQuery);
  };
  
  const handleAnalyzeRoute = () => {
    setView('search');
  };
  
  const handlePredictFare = () => {
    console.log("Predicting fare...");
    // Simulate fetching data
    setTimeout(() => {
        setForecastData(mockForecastData);
        setView('forecast');
    }, 1000);
  };


  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-primary/10 via-background to-accent/10 text-foreground font-sans">
      <Header
        isScrolled={isScrolled}
        searchQuery={searchQuery}
        onSearchQueryChange={setSearchQuery}
        onSearchSubmit={handleHeaderSearchSubmit}
        showCurrencySelector={false}
      />
      <main className="flex-grow flex flex-col items-center justify-center">
        <AnimatePresence mode="wait">
          {view === 'hero' && (
            <motion.div
              key="hero"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="w-full"
            >
              <PriceTimeHero onAnalyzeRoute={handleAnalyzeRoute}/>
            </motion.div>
          )}

          {view === 'search' && (
            <motion.div
              key="search"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5 }}
              className="w-full"
            >
              <PriceTimeSmartSearch onPredict={handlePredictFare} />
            </motion.div>
          )}

          {view === 'forecast' && forecastData && (
             <motion.div
              key="forecast"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="w-full"
            >
              <PriceTimeForecast data={forecastData} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
      <PriceTimeFooter />
    </div>
  );
}
