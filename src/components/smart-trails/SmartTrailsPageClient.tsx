
'use client';

import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { RefreshCw, Download, Share2, Save, Mic, Loader2, Clock, Footprints, Euro, Wand2 } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Header } from '@/components/layout/Header';
import { SubtleFooter } from '@/components/layout/SubtleFooter';
import { ScheduleTimeline } from './ScheduleTimeline';
import { TrailCard } from './TrailCard';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';

// Types moved from the deleted flow file to here
export interface TrailStop {
    id: string;
    name: string;
    type: 'Landmark' | 'Food' | 'Activity' | 'Hidden Gem';
    timeToSpend: string;
    rating: number;
    funFact: string;
    photoUrl: string;
    photoAiHint: string;
}

export interface ScheduleItem {
    time: string;
    activity: string;
    type: 'Travel' | 'Activity' | 'Food' | 'Break';
    duration: string;
}

export interface GenerateSmartTrailOutput {
    trailName: string;
    description: string;
    mapImageUrl: string;
    mapImageAiHint: string;
    stops: TrailStop[];
    schedule: ScheduleItem[];
    totalTime: string;
    totalDistance: string;
    totalCost: string;
}

// Mock data to simulate AI response
const mockParisTrailData: GenerateSmartTrailOutput = {
  trailName: "Parisian Art & Appetite Trail",
  description: "A one-day whirlwind tour of Parisian culture, from classic art to delectable pastries.",
  mapImageUrl: "https://images.unsplash.com/photo-1502602898657-3e91760c0337?q=80&w=1200&h=600&fit=crop",
  mapImageAiHint: "paris aerial map",
  totalTime: "Approx. 9 hours",
  totalDistance: "4.5 km",
  totalCost: "€120 per person",
  stops: [
    { id: '1', name: 'Louvre Museum', type: 'Landmark', timeToSpend: '2-3 hours', rating: 4.8, funFact: 'The Louvre is so large that it would take you 200 days to see every piece of art for 30 seconds.', photoUrl: 'https://images.unsplash.com/photo-1500039436846-25ae2f11882e?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', photoAiHint: 'louvre museum' },
    { id: '2', name: 'Angelina', type: 'Food', timeToSpend: '1 hour', rating: 4.5, funFact: "Famous for its incredibly rich hot chocolate, L'Africain.", photoUrl: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=400&h=300&fit=crop', photoAiHint: 'paris cafe' },
    { id: '3', name: 'Musée d\'Orsay', type: 'Landmark', timeToSpend: '2 hours', rating: 4.7, funFact: 'The museum is housed in a former railway station, the Gare d\'Orsay.', photoUrl: 'https://images.unsplash.com/photo-162010883-8472a44a742f?q=80&w=400&h=300&fit=crop', photoAiHint: 'orsay museum' },
    { id: '4', name: 'Le Relais de l\'Entrecôte', type: 'Food', timeToSpend: '1.5 hours', rating: 4.6, funFact: 'This restaurant famously has only one main course: steak-frites.', photoUrl: 'https://images.unsplash.com/photo-1620364903259-2c35e953a9e3?q=80&w=400&h=300&fit=crop', photoAiHint: 'steak frites' },
  ],
  schedule: [
    { time: '9:00 AM', activity: 'Start at Louvre Museum', type: 'Activity', duration: '3 hours' },
    { time: '12:00 PM', activity: 'Walk to Angelina', type: 'Travel', duration: '15 min' },
    { time: '12:15 PM', activity: 'Hot Chocolate & Pastries', type: 'Food', duration: '1 hour' },
    { time: '1:15 PM', activity: 'Cross the Seine to Musée d\'Orsay', type: 'Travel', duration: '20 min' },
    { time: '1:35 PM', activity: 'Explore Impressionist Art', type: 'Activity', duration: '2 hours' },
    { time: '3:35 PM', activity: 'Stroll through Saint-Germain-des-Prés', type: 'Travel', duration: '1 hour' },
    { time: '4:35 PM', activity: 'Relaxing break at a café', type: 'Break', duration: '45 min' },
    { time: '5:20 PM', activity: 'Metro to L\'Entrecôte', type: 'Travel', duration: '25 min' },
    { time: '5:45 PM', activity: 'Dinner: Steak Frites', type: 'Food', duration: '1.5 hours' },
  ]
};

// Mock data for Kyoto
const mockKyotoTrailData: GenerateSmartTrailOutput = {
  trailName: "Kyoto's Path of Serenity",
  description: "A day of tranquil temples, serene gardens, and vibrant history in Japan's ancient capital.",
  mapImageUrl: "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?q=80&w=1200&h=600&fit=crop",
  mapImageAiHint: "kyoto aerial map",
  totalTime: "Approx. 8 hours",
  totalDistance: "5 km",
  totalCost: "¥8000 per person",
  stops: [
    { id: 'k1', name: 'Kinkaku-ji (Golden Pavilion)', type: 'Landmark', timeToSpend: '1.5 hours', rating: 4.7, funFact: 'The top two floors are completely covered in gold leaf.', photoUrl: 'https://images.unsplash.com/photo-1524413840807-0c3cb6fa808d?q=80&w=400&h=300&fit=crop', photoAiHint: 'kinkakuji temple' },
    { id: 'k2', name: 'Nishiki Market', type: 'Food', timeToSpend: '1 hour', rating: 4.5, funFact: "Known as 'Kyoto's Kitchen', it's a paradise for food lovers.", photoUrl: 'https://images.unsplash.com/photo-1598801931323-0174092b3234?q=80&w=400&h=300&fit=crop', photoAiHint: 'nishiki market food' },
  ],
  schedule: [
    { time: '10:00 AM', activity: 'Visit Kinkaku-ji', type: 'Activity', duration: '1.5 hours' },
    { time: '12:00 PM', activity: 'Lunch at Nishiki Market', type: 'Food', duration: '1.5 hours' },
    { time: '2:00 PM', activity: 'Stroll through Arashiyama Bamboo Grove', type: 'Activity', duration: '2 hours' },
  ]
};

// Mock data for NYC
const mockNycTrailData: GenerateSmartTrailOutput = {
  trailName: "NYC's Culinary Crawl",
  description: "A delicious journey through some of New York's most iconic food spots.",
  mapImageUrl: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?q=80&w=1200&h=600&fit=crop",
  mapImageAiHint: "nyc aerial map",
  totalTime: "Approx. 6 hours",
  totalDistance: "3 miles",
  totalCost: "$90 per person",
  stops: [
    { id: 'n1', name: 'Katz\'s Delicatessen', type: 'Food', timeToSpend: '1.5 hours', rating: 4.6, funFact: 'Famous for its pastrami on rye sandwich.', photoUrl: 'https://images.unsplash.com/photo-1552526881-721ce850937b?q=80&w=400&h=300&fit=crop', photoAiHint: 'new york deli' },
    { id: 'n2', name: 'Smorgasburg', type: 'Food', timeToSpend: '2 hours', rating: 4.8, funFact: "America's largest weekly open-air food market.", photoUrl: 'https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?q=80&w=400&h=300&fit=crop', photoAiHint: 'food market nyc' },
  ],
  schedule: [
    { time: '1:00 PM', activity: 'Lunch at Katz\'s Deli', type: 'Food', duration: '1.5 hours' },
    { time: '3:00 PM', activity: 'Explore Smorgasburg', type: 'Food', duration: '2 hours' },
    { time: '5:00 PM', activity: 'Walk across the Brooklyn Bridge', type: 'Travel', duration: '1 hour' },
  ]
};

// Mock data for London
const mockLondonTrailData: GenerateSmartTrailOutput = {
  trailName: "London's Royal & Historic Walk",
  description: "A journey through time, exploring London's royal landmarks and rich history.",
  mapImageUrl: "https://images.unsplash.com/photo-1505761671935-60b3a742750f?q=80&w=1200&h=600&fit=crop",
  mapImageAiHint: "london aerial map",
  totalTime: "Approx. 7 hours",
  totalDistance: "6 km",
  totalCost: "£50 per person",
  stops: [
    { id: 'l1', name: 'Tower of London', type: 'Landmark', timeToSpend: '3 hours', rating: 4.7, funFact: 'Home to the Crown Jewels of the United Kingdom.', photoUrl: 'https://images.unsplash.com/photo-1529655683826-1a3b12bb6b84?q=80&w=400&h=300&fit=crop', photoAiHint: 'tower of london' },
    { id: 'l2', name: 'Borough Market', type: 'Food', timeToSpend: '1.5 hours', rating: 4.6, funFact: 'One of the largest and oldest food markets in London.', photoUrl: 'https://images.unsplash.com/photo-1533900298318-6b8da08a523e?q=80&w=400&h=300&fit=crop', photoAiHint: 'borough market london' },
  ],
  schedule: [
    { time: '10:00 AM', activity: 'Explore Tower of London', type: 'Activity', duration: '3 hours' },
    { time: '1:30 PM', activity: 'Lunch at Borough Market', type: 'Food', duration: '1.5 hours' },
    { time: '3:00 PM', activity: 'Walk along South Bank', type: 'Travel', duration: '1 hour' },
  ]
};

export function SmartTrailsPageClient() {
  const { getTranslation } = useLanguage();
  const [searchQuery, setSearchQuery] = React.useState('');
  const [trailData, setTrailData] = React.useState<GenerateSmartTrailOutput | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const handleGenerateTrail = async (query: string) => {
    if (!query.trim()) return;
    setIsLoading(true);
    setError(null);
    setTrailData(null);
    
    // Simulate AI call and data fetching based on query
    setTimeout(() => {
        let dataToSet = mockParisTrailData; // Default to Paris
        if (query.toLowerCase().includes('kyoto')) {
            dataToSet = mockKyotoTrailData;
        } else if (query.toLowerCase().includes('nyc')) {
            dataToSet = mockNycTrailData;
        } else if (query.toLowerCase().includes('london')) {
            dataToSet = mockLondonTrailData;
        }
        setTrailData(dataToSet);
        setIsLoading(false);
    }, 1500);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setSearchQuery(suggestion);
    handleGenerateTrail(suggestion); 
  };
  
  const placeholders = [
    'Explore Paris in 1 day...',
    'A foodie tour of Tokyo',
    'Historical walk through Rome',
    'Show me the best of Delhi today',
  ];
  
  const [currentPlaceholder, setCurrentPlaceholder] = React.useState(placeholders[0]);
  
  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPlaceholder(p => {
        const nextIndex = (placeholders.indexOf(p) + 1) % placeholders.length;
        return placeholders[nextIndex];
      });
    }, 3000);
    return () => clearInterval(interval);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex flex-col min-h-screen w-full bg-gradient-to-br from-primary/10 via-background to-accent/10 text-foreground overflow-x-hidden">
      <Header
        isScrolled={true}
        searchQuery={""} // The page has its own search bar, so header search is not needed here
        onSearchQueryChange={() => {}}
        onSearchSubmit={() => {}}
        showCurrencySelector={false}
      />
      <main className="flex-grow p-4 md:p-6 lg:p-8 flex flex-col items-center">
        <section className="w-full max-w-4xl text-center mb-8">
          <Wand2 className="h-12 w-12 text-primary mx-auto mb-4" />
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-3">
            SmartTrails
          </h1>
          <p className="text-lg text-muted-foreground">Your AI-powered guide to the perfect day.</p>
        </section>

        <div className="w-full max-w-2xl mb-8">
          <div className="relative">
            <Input
              type="text"
              placeholder={currentPlaceholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleGenerateTrail(searchQuery)}
              className="w-full h-14 pl-5 pr-28 text-lg bg-background/70 text-foreground placeholder:text-muted-foreground rounded-full border-2 border-border focus:border-primary focus:ring-primary/50 shadow-lg"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
               <Button
                variant="ghost"
                size="icon"
                className="text-muted-foreground hover:text-primary hover:bg-muted/50 rounded-full h-9 w-9"
              >
                <Mic className="h-5 w-5" />
              </Button>
              <Button
                onClick={() => handleGenerateTrail(searchQuery)}
                disabled={isLoading}
                className="rounded-full bg-primary hover:bg-primary/90 text-primary-foreground h-9 px-4"
              >
                {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : 'Generate'}
              </Button>
            </div>
          </div>
          <div className="flex flex-wrap justify-center gap-2 mt-4">
             {['Parisian Art & Appetite Trail', 'Kyoto gems', 'NYC food tour', 'London history'].map(sugg => (
                 <Button key={sugg} size="sm" variant="outline" className="text-xs text-muted-foreground hover:bg-muted hover:text-foreground rounded-full" onClick={() => handleSuggestionClick(sugg)}>{sugg}</Button>
             ))}
          </div>
        </div>

        {error && (
            <div className="text-center my-8 p-4 bg-destructive/10 border border-destructive/50 rounded-lg max-w-xl">
                <p className="text-destructive">{error}</p>
            </div>
        )}

        {isLoading && (
            <div className="text-center my-8 animate-pulse">
                <p className="text-muted-foreground">Generating your perfect trail...</p>
            </div>
        )}

        {trailData && (
          <div className="w-full max-w-7xl flex flex-col lg:flex-row gap-6 animate-in fade-in duration-500">
            {/* Left: Map & Trail Cards */}
            <div className="flex-grow lg:w-2/3 space-y-6">
              <div className="relative aspect-video w-full rounded-2xl overflow-hidden shadow-2xl border border-border">
                <Image src={trailData.mapImageUrl} alt={trailData.trailName} fill className="object-cover" data-ai-hint={trailData.mapImageAiHint} sizes="(max-width: 1024px) 100vw, 66vw"/>
                <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/70 to-transparent">
                  <h2 className="text-2xl font-bold text-white">{trailData.trailName}</h2>
                  <p className="text-sm text-primary-foreground/90 mt-1">{trailData.description}</p>
                   <div className="flex items-center space-x-6 text-sm text-primary-foreground mt-3">
                      <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-primary" />
                          <span>{trailData.totalTime}</span>
                      </div>
                      <div className="flex items-center gap-2">
                          <Footprints className="h-4 w-4 text-primary" />
                          <span>{trailData.totalDistance}</span>
                      </div>
                      <div className="flex items-center gap-2">
                          <Euro className="h-4 w-4 text-primary" />
                          <span>{trailData.totalCost}</span>
                      </div>
                  </div>
                </div>
                <div className="absolute top-3 right-3 flex gap-2">
                    <Button variant="secondary" size="sm" className="bg-background/50 backdrop-blur-sm text-foreground hover:bg-muted h-8"><RefreshCw className="h-4 w-4 mr-2"/>Optimize</Button>
                    <Button variant="secondary" size="sm" className="bg-background/50 backdrop-blur-sm text-foreground hover:bg-muted h-8"><Download className="h-4 w-4 mr-2"/>Export</Button>
                    <Button variant="secondary" size="sm" className="bg-background/50 backdrop-blur-sm text-foreground hover:bg-muted h-8"><Share2 className="h-4 w-4 mr-2"/>Share</Button>
                    <Button variant="secondary" size="sm" className="bg-background/50 backdrop-blur-sm text-foreground hover:bg-muted h-8"><Save className="h-4 w-4 mr-2"/>Save</Button>
                </div>
              </div>

              <ScrollArea className="w-full">
                <div className="flex space-x-4 pb-4">
                  {trailData.stops.map(stop => <TrailCard key={stop.id} stop={stop} />)}
                </div>
                <ScrollBar orientation="horizontal" />
              </ScrollArea>
            </div>
            {/* Right: Timeline */}
            <div className="flex-shrink-0 lg:w-1/3 h-[70vh] lg:h-auto">
                <ScheduleTimeline schedule={trailData.schedule} />
            </div>
          </div>
        )}

      </main>
      <SubtleFooter />
    </div>
  );
}
