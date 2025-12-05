
'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export function PerfectTripSection() {
  const exampleQueries = [
    "Best budget hotels in Tokyo?",
    "Bali beach escape in a resort",
    "Best destination for my birthday",
    "Boutique hotels in Paris",
    "Spain with traditional activities",
    "Eco-friendly hotels in Thailand",
    "South of France itinerary planning",
    "Weekend getaway in Rome with historic sites",
    "Hotels near Times Square, NYC",
  ];

  const handlePillClick = (query: string) => {
    console.log(`PerfectTripSection - Pill button clicked: ${query}`);
    // Add navigation or query population logic here
  };

  const handleMainAskClick = () => {
    console.log('PerfectTripSection - Main Ask me anything button clicked');
    // Add navigation or open main search interface logic here
  };

  return (
    <section className="w-full py-16 md:py-20 lg:py-24">
      <div className="px-[60px]">
        <div className="grid md:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Left Column */}
          <div className="flex flex-col items-start text-left">
            <h2 className="font-headline text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-6 text-foreground">
              No more wasting endless hours searching for the perfect trip.
            </h2>
            <p className="text-muted-foreground text-base sm:text-lg mb-8">
              Ask me anything (about travel, not your ex)
            </p>
            <div className="flex items-center space-x-3">
              <div className="flex -space-x-2">
                <Avatar className="h-10 w-10 border-2 border-background">
                  <AvatarImage src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=40&h=40&fit=crop" alt="User 1" data-ai-hint="person face" />
                  <AvatarFallback>U1</AvatarFallback>
                </Avatar>
                <Avatar className="h-10 w-10 border-2 border-background">
                  <AvatarImage src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=40&h=40&fit=crop" alt="User 2" data-ai-hint="person face" />
                  <AvatarFallback>U2</AvatarFallback>
                </Avatar>
                <Avatar className="h-10 w-10 border-2 border-background">
                  <AvatarImage src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=40&h=40&fit=crop" alt="User 3" data-ai-hint="person face" />
                  <AvatarFallback>U3</AvatarFallback>
                </Avatar>
              </div>
              <p className="text-sm text-muted-foreground">Trusted by 10million+ travellers</p>
            </div>
          </div>

          {/* Right Column */}
          <div className="relative">
            <div className="absolute -top-16 -right-8 md:-top-20 md:right-0 transform rotate-[15deg] opacity-80 md:opacity-100 z-0">
              <Image
                src="https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=280&auto=format&fit=crop"
                alt="Luxury hotel infinity pool with a stunning view"
                width={280}
                height={180}
                className="rounded-xl shadow-xl"
                data-ai-hint="luxury hotel pool"
              />
            </div>

            <div className="relative z-10 flex flex-wrap gap-2 sm:gap-3 justify-center mb-6">
              {exampleQueries.map((query) => (
                <Button
                  key={query}
                  variant="outline"
                  size="sm"
                  className="rounded-full text-xs sm:text-sm border-border text-foreground hover:bg-muted/30 hover:text-primary hover:border-primary/70 transition-colors duration-150"
                  onClick={() => handlePillClick(query)}
                >
                  {query}
                </Button>
              ))}
            </div>

            <div className="relative z-10 text-center mb-10">
              <Button
                size="lg"
                className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-3 text-base"
                onClick={handleMainAskClick}
              >
                Ask me anything...
              </Button>
            </div>
            
            <div className="absolute -bottom-16 -left-8 md:-bottom-20 md:left-10 transform -rotate-[10deg] opacity-80 md:opacity-100 z-0">
              <Image
                src="https://images.unsplash.com/photo-1534430480872-3498386e7856?q=80&w=230&auto=format&fit=crop"
                alt="Safari vehicle parked under a tree at sunset"
                width={230}
                height={160}
                className="rounded-xl shadow-xl"
                data-ai-hint="safari vehicle sunset"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
