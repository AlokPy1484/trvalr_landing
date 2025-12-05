'use client';

import { Button } from '@/components/ui/button';

export function TravelersHeroSection() {
  const handleStartPlanning = () => {
    console.log('Start Planning clicked');
  };

  const imageUrl = "https://images.unsplash.com/photo-1526675849333-144a81e4670d?q=80&w=1675&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

  const getTranslation = (key: string, fallback : string) => fallback;

  return (
    <section className="relative w-full h-[calc(100vh-7rem)] flex items-center justify-center text-center text-white overflow-hidden">
      {/* Entry animation */}
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

      {/* Layer 1: background image */}
      <img
        src={imageUrl}
        alt={getTranslation('travelersHeroAlt', 'A traveler looking at a map with a vast landscape ahead')}
        className="absolute inset-0 w-full h-full object-cover"
      />
      
      {/* Layer 2: dark overlay */}
      <div 
        className="absolute inset-0 bg-black/60 animate-fade-in"
        style={{ animationDelay: '0.2s' }}
      />

      {/* Layer 3: content */}
      <div className="relative z-10 p-4 md:p-8 max-w-3xl">
        <h1 
          className="font-headline text-4xl sm:text-5xl md:text-6xl font-bold mb-4 bg-cover bg-center bg-clip-text text-transparent animate-fade-in-up"
          style={{ 
            backgroundImage: `url(${imageUrl})`,
            animationDelay: '0.5s',
            opacity: 0, 
            animationFillMode: 'forwards',
          }}
        >
          {getTranslation('travelersHeroTitle', 'Unleash Your Wanderlust')}
        </h1>

        <p 
          className="text-lg sm:text-xl md:text-2xl mb-8 font-body text-neutral-200 animate-fade-in-up"
          style={{ 
            animationDelay: '0.8s',
            opacity: 0,
            animationFillMode: 'forwards',
          }}
        >
          {getTranslation('travelersHeroSubtitle', 'From inspiration to itinerary, our smart tools and global community give you everything you need to build the trip of a lifetime. Discover, plan, and connect with confidence.')}
        </p>
        
        <div
          className="animate-fade-in-up"
          style={{ 
            animationDelay: '1.1s',
            opacity: 0,
            animationFillMode: 'forwards',
          }}
        >
          <Button
            className="bg-white/10 backdrop-blur-md border border-white/100 text-white hover:bg-white/20 rounded-lg transition-all px-8 py-3 text-lg"
            onClick={handleStartPlanning}
          >
            {getTranslation('travelersHeroButton', 'Start Planning')}
          </Button>
        </div>
      </div>
    </section>
  );
}