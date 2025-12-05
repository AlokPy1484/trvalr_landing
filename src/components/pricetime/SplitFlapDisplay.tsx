
'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

interface FlapProps {
  targetChar: string;
  isAnimating: boolean;
  index: number;
}

const Flap: React.FC<FlapProps> = ({ targetChar, isAnimating, index }) => {
  const [displayChar, setDisplayChar] = useState(' ');

  useEffect(() => {
    if (isAnimating) {
      let animationFrame: number;
      let count = 0;
      const animate = () => {
        setDisplayChar(CHARS[Math.floor(Math.random() * CHARS.length)]);
        // More flips for a longer, more dramatic effect
        if (count < 20 + Math.random() * 15) {
          count++;
          animationFrame = requestAnimationFrame(animate);
        } else {
          setDisplayChar(targetChar);
        }
      };
      
      const startDelay = setTimeout(() => {
        animate();
      }, Math.random() * 2000); // Increased delay range up to 2s

      return () => {
        clearTimeout(startDelay);
        cancelAnimationFrame(animationFrame);
      };
    } else {
        setDisplayChar(targetChar);
    }
  }, [isAnimating, targetChar, index]);
  
  return (
    <div className="relative w-10 h-14 md:w-12 md:h-16 perspective-[500px]">
       <AnimatePresence>
        <motion.div
            key={displayChar}
            initial={{ rotateX: 90, y: '-50%' }}
            animate={{ rotateX: 0, y: '0%' }}
            exit={{ rotateX: -90, y: '50%' }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="absolute inset-0 flex items-center justify-center bg-card/10 dark:bg-stone-900/10 rounded-lg border border-border/30 dark:border-stone-500/30 shadow-lg backdrop-blur-sm"
            style={{ transformOrigin: 'center' }}
        >
             <div className="absolute w-full h-[2px] bg-black/10 dark:bg-black/20 top-1/2 -translate-y-1/2 z-10" />
            <span className="font-headline text-3xl md:text-4xl font-bold text-foreground/50 tracking-wider">
              {displayChar}
            </span>
        </motion.div>
       </AnimatePresence>
    </div>
  );
};


interface SplitFlapDisplayProps {
  text: string;
}

export const SplitFlapDisplay: React.FC<SplitFlapDisplayProps> = ({ text }) => {
    const [isAnimating, setIsAnimating] = useState(true);

    useEffect(() => {
        // Ensure animation runs long enough for all random delays to fire
        const timer = setTimeout(() => setIsAnimating(false), 3500);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="flex justify-center gap-1 md:gap-2 mb-8">
        {text.split('').map((char, index) => (
            <Flap key={index} targetChar={char} isAnimating={isAnimating} index={index} />
        ))}
        </div>
    );
};
