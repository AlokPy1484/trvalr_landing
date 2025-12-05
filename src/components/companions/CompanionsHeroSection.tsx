// src/components/companions/CompanionsHeroSection.tsx

'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { Compass } from 'lucide-react';

export function CompanionsHeroSection() {
  const { getTranslation } = useLanguage();

  // New URL
  const imageUrl = "https://images.unsplash.com/photo-1526675849333-144a81e4670d?q=80&w=1675&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

  return (
    <section className="relative w-full h-[calc(100vh-7rem)] flex items-center justify-center text-center text-white overflow-hidden">
      {/*  entry animation */}
      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes fade-in-up {
          from { 
            opacity: 0;
            transform: translateY(20px);
          }
          to { 
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }
      `}</style>

      {/* Layer 1: background image. */}
      <Image
        src={imageUrl}
        alt={getTranslation('companionsHeroAlt', 'Travelers with local companions exploring a vibrant market')}
        fill
        style={{ objectFit: 'cover' }}
        priority
      />
      
      {/* Layer 2: overlay that fades in. */}
      <div 
        className="absolute inset-0 bg-black/60 animate-fade-in"
        style={{ animationDelay: '0.2s' }}
      />

      {/* Layer 3: content that animates in. */}
      <div className="relative z-10 p-4 md:p-8 max-w-4xl">
        {/* headline with text matched to the background image */}
        <h1 
          className="font-headline text-4xl sm:text-5xl md:text-6xl font-bold mb-4 leading-tight bg-cover bg-center bg-clip-text text-transparent animate-fade-in-up"
          style={{ 
            backgroundImage: `url(${imageUrl})`,
            animationDelay: '0.5s',
            opacity: 0, 
            animationFillMode: 'forwards',
          }}
        >
          {getTranslation('companionsHeroTitle', 'Never Travel Alone — Meet the Locals Who Know It Best')}
        </h1>

        <p 
          className="text-lg sm:text-xl md:text-2xl mb-8 font-body text-neutral-200 animate-fade-in-up"
          style={{ 
            animationDelay: '0.8s',
            opacity: 0,
            animationFillMode: 'forwards',
          }}
        >
          {getTranslation('companionsHeroSubtitle', 'Hire verified, friendly local companions who speak the language, know the culture, and walk you through hidden gems, safe paths, and unforgettable stories.')}
        </p>
        
        <div
          className="animate-fade-in-up"
          style={{ 
            animationDelay: '1.1s',
            opacity: 0,
            animationFillMode: 'forwards',
          }}
        >
          {/* button effect */}
          <Button
            size="lg"
            className="bg-white/10 backdrop-blur-md border border-white/100 text-white rounded-lg transition-all hover:bg-white/20 px-8 py-3 text-lg"
            asChild
          >
            <Link href="/connect">
              <Compass className="mr-2 h-5 w-5" />
              {getTranslation('companionsHeroButton', 'Find a Companion Near Me')}
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}