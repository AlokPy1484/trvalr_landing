
'use client';

import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import type { App } from './types';

interface AppCardProps {
  app: App;
  index: number;
}

const badgeColors: Record<string, string> = {
  'Safe to Use': 'border-green-300/50 bg-green-500/10 text-green-700 dark:text-green-300',
  'Offline Friendly': 'border-blue-300/50 bg-blue-500/10 text-blue-700 dark:text-blue-300',
  'Local Favorite': 'border-amber-300/50 bg-amber-500/10 text-amber-700 dark:text-amber-400',
  'Global Favorite': 'border-purple-300/50 bg-purple-500/10 text-purple-700 dark:text-purple-400',
  'Travel Hacks': 'border-rose-300/50 bg-rose-500/10 text-rose-700 dark:text-rose-400',
  'Highly Rated': 'border-amber-300/50 bg-amber-500/10 text-amber-700 dark:text-amber-400',
  'Available Everywhere': 'border-blue-300/50 bg-blue-500/10 text-blue-700 dark:text-blue-300',
};

const AppleIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
    <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
  </svg>
);

const GooglePlayIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
    <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
  </svg>
);

export function AppCard({ app, index }: AppCardProps) {
  const [isTruncated, setIsTruncated] = React.useState(false);
  const textRef = React.useRef<HTMLParagraphElement>(null);

  React.useEffect(() => {
    const element = textRef.current;
    if (element) {
      // Check if text is truncated by comparing scrollHeight with clientHeight
      setIsTruncated(element.scrollHeight > element.clientHeight);
    }
  }, [app.description]);

  const cardVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { delay: index * 0.05, duration: 0.4 } },
  };

  return (
    <TooltipProvider>
      <motion.div variants={cardVariants} whileHover={{ y: -5, transition: { duration: 0.2 } }}>
        <Card className="h-full flex flex-col bg-card/50 backdrop-blur-md border border-border/20 shadow-lg hover:shadow-xl hover:border-primary/20 transition-all duration-300">
          <CardHeader className="flex flex-row items-start gap-4 p-4">
            <div className="relative h-16 w-16 flex-shrink-0">
                <Image src={app.logoUrl} alt={`${app.name} logo`} fill className="object-contain rounded-lg" data-ai-hint={app.logoAiHint} sizes="64px"/>
            </div>
            <div className="flex-grow">
                <h3 className="font-semibold text-foreground text-lg">{app.name}</h3>
                <div className="flex items-center gap-1.5 mt-1">
                    <Star className="h-4 w-4 text-amber-400 fill-amber-400" />
                    <span className="text-sm font-medium text-muted-foreground">{app.rating}</span>
                </div>
            </div>
          </CardHeader>
          <CardContent className="p-4 pt-0 flex flex-col flex-grow">
            {isTruncated ? (
              <Tooltip>
                <TooltipTrigger asChild>
                  <p 
                    ref={textRef}
                    className="text-sm text-muted-foreground mb-4 line-clamp-2 min-h-[2.5rem]"
                  >
                    {app.description}
                  </p>
                </TooltipTrigger>
                <TooltipContent className="max-w-xs">
                  <p className="text-sm">{app.description}</p>
                </TooltipContent>
              </Tooltip>
            ) : (
              <p 
                ref={textRef}
                className="text-sm text-muted-foreground mb-4 line-clamp-2 min-h-[2.5rem]"
              >
                {app.description}
              </p>
            )}
            <div className="flex flex-wrap gap-2 mb-4 min-h-[2rem]">
              {app.badges.map(badge => (
                <Badge key={badge} variant="outline" className={`text-xs ${badgeColors[badge] || ''}`}>{badge}</Badge>
              ))}
            </div>
            <div className="mt-auto flex gap-2 justify-end">
                {app.androidUrl && (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        asChild
                        variant="outline"
                        size="icon"
                        className="h-9 w-9 hover:bg-primary/10 hover:text-primary"
                      >
                        <a href={app.androidUrl} target="_blank" rel="noopener noreferrer">
                          <GooglePlayIcon />
                        </a>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Get on Google Play</TooltipContent>
                  </Tooltip>
                )}
                {app.iosUrl && (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        asChild
                        variant="outline"
                        size="icon"
                        className="h-9 w-9 hover:bg-primary/10 hover:text-primary"
                      >
                        <a href={app.iosUrl} target="_blank" rel="noopener noreferrer">
                          <AppleIcon />
                        </a>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Get on App Store</TooltipContent>
                  </Tooltip>
                )}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </TooltipProvider>
  );
}
