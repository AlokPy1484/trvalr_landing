
'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Lock, Unlock, ShieldCheck, Timer } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SmartLockCardProps {
  currentPrice: number;
}

export function SmartLockCard({ currentPrice }: SmartLockCardProps) {
  const [isLocked, setIsLocked] = useState(false);
  const [lockDuration, setLockDuration] = useState(24); // 24 or 48 hours
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isLocked && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prevTime => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsLocked(false);
    }
    return () => clearInterval(timer);
  }, [isLocked, timeLeft]);

  const handleLockFare = () => {
    setIsLocked(true);
    setTimeLeft(lockDuration * 3600); // Convert hours to seconds
  };
  
  const handleUnlock = () => {
      setIsLocked(false);
      setTimeLeft(0);
  };

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600).toString().padStart(2, '0');
    const m = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${h}:${m}:${s}`;
  };

  return (
    <Card className="bg-card/50 border-border/80 backdrop-blur-lg flex flex-col">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-foreground">
          <ShieldCheck className="text-primary" />
          Smart Price Lock
        </CardTitle>
        <CardDescription>Lock in the current fare for a small fee, and book if the price goes up.</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col justify-between">
        {isLocked ? (
          <motion.div key="locked" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center flex-grow flex flex-col items-center justify-center">
             <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
                <Lock className="h-5 w-5"/>
                <p className="font-semibold">Fare Locked!</p>
             </div>
             <p className="text-4xl font-bold text-foreground my-2">₹{currentPrice.toLocaleString()}</p>
             <p className="text-sm text-muted-foreground">This price is yours for</p>
             <p className="text-2xl font-mono text-primary my-2"><Timer className="inline h-6 w-6 mr-2" />{formatTime(timeLeft)}</p>
             <div className="flex items-center gap-4 mt-4">
                 <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold">Confirm Booking</Button>
                 <Button variant="outline" className="hover:bg-muted" onClick={handleUnlock}>Unlock Early</Button>
             </div>
          </motion.div>
        ) : (
          <motion.div key="unlocked" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center flex-grow flex flex-col items-center justify-center">
            <div className="flex items-center gap-2 text-muted-foreground">
                <Unlock className="h-5 w-5"/>
                <p className="font-semibold">Current Fare</p>
            </div>
            <p className="text-4xl font-bold text-foreground my-2">₹{currentPrice.toLocaleString()}</p>
            
            <div className="flex items-center space-x-2 my-4">
              <span className={cn("text-sm", lockDuration === 24 ? "text-foreground" : "text-muted-foreground")}>24H</span>
              <Switch checked={lockDuration === 48} onCheckedChange={(checked) => setLockDuration(checked ? 48 : 24)} />
              <span className={cn("text-sm", lockDuration === 48 ? "text-foreground" : "text-muted-foreground")}>48H</span>
            </div>

            <Button onClick={handleLockFare} className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold w-full">
              Lock Fare for ₹550
            </Button>
            <p className="text-xs text-muted-foreground mt-2">Fully refundable if you don't book.</p>
          </motion.div>
        )}
      </CardContent>
    </Card>
  );
}
