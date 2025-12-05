
'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { MyTripsLayout } from './MyTripsLayout';
import { MyTripsSidebar, type TripCategory } from './MyTripsSidebar';
import { MyTripsTopBar } from './MyTripsTopBar';
import { TripCard, type TripCardProps } from './TripCard';
import { SoulLogsSection } from './SoulLogsSection';
import { Header } from '@/components/layout/Header';
import { useLanguage } from '@/contexts/LanguageContext';
import { useToast } from '@/hooks/use-toast';
import { Plane, Edit3, Map, Tag, Flag, BookOpen, Waves, Mountain } from 'lucide-react';
import { MyTripsFooter } from './MyTripsFooter';
import { getSavedTrips, deleteSavedTrip, shareSavedTripPublicly, isTripPublic, type SavedTrip } from '@/lib/utils';
import { formatDate, daysBetween } from '@/lib/utils';

const upcomingTripsData: TripCardProps[] = [
  {
    id: 'trip1',
    heroImageUrl: 'https://images.unsplash.com/photo-1502602898657-3e91760c0337?q=80&w=600&h=400&fit=crop',
    heroImageAlt: 'Paris Eiffel Tower',
    aiHint: 'paris eiffel tower',
    destination: 'Parisian Dream',
    location: 'Paris, France',
    date: 'Oct 20 - Oct 28, 2024',
    duration: '8 days',
    statusBadge: 'Upcoming',
    statusColor: 'bg-cyan-500/20 text-cyan-300 border-cyan-400/30',
    tagline: 'Chasing art and croissants',
    weather: '15°C, Sunny',
    tripIcon: Plane,
  },
  {
    id: 'trip2',
    heroImageUrl: 'https://images.unsplash.com/photo-1524413840807-0c3cb6fa808d?q=80&w=600&h=400&fit=crop',
    heroImageAlt: 'Kyoto Temple',
    aiHint: 'kyoto temple autumn',
    destination: 'Kyoto Serenity',
    location: 'Kyoto, Japan',
    date: 'Nov 05 - Nov 12, 2024',
    duration: '7 days',
    statusBadge: 'Confirmed',
    statusColor: 'bg-green-500/20 text-green-300 border-green-400/30',
    tagline: 'Autumn leaves and ancient temples',
    weather: '18°C, Cloudy',
    tripIcon: Plane,
  },
];

// Helper function to convert SavedTrip to TripCardProps
function convertSavedTripToCardProps(savedTrip: SavedTrip): TripCardProps {
  const startDate = formatDate(savedTrip.startDate);
  const endDate = formatDate(savedTrip.endDate);
  const dateRange = `${startDate.slice(0, -5)} - ${endDate.slice(0, -5)}`;
  const duration = savedTrip.duration > 0 ? `${savedTrip.duration} ${savedTrip.duration === 1 ? 'day' : 'days'}` : '';
  
  return {
    id: savedTrip.id,
    heroImageUrl: savedTrip.heroImageUrl || 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=600&h=400&fit=crop',
    heroImageAlt: `${savedTrip.destination} trip`,
    aiHint: savedTrip.destination.toLowerCase(),
    destination: savedTrip.title,
    location: savedTrip.destination,
    date: dateRange,
    duration: duration,
    statusBadge: savedTrip.isPublic ? 'Shared' : 'Saved',
    statusColor: savedTrip.isPublic 
      ? 'bg-green-500/20 text-green-600 dark:text-green-400 border-green-400/30' 
      : 'bg-primary/20 text-primary border-primary/30',
    tagline: savedTrip.itineraryData?.description?.substring(0, 50) + '...' || 'Your saved trip',
    weather: 'TBD',
    tripIcon: Map,
    isPublic: savedTrip.isPublic || false,
  };
}

const vibeTaggedTripsData: TripCardProps[] = [
  {
    id: 'vibe1',
    heroImageUrl: 'https://images.unsplash.com/photo-1507525428034-b723a9ce6890?q=80&w=600&h=400&fit=crop',
    heroImageAlt: 'Relaxing on a beach in Maldives',
    aiHint: 'maldives beach relaxing',
    destination: 'Maldives Relaxation',
    location: 'Maldives',
    date: 'Tagged: Anytime',
    statusBadge: 'Relaxing',
    statusColor: 'bg-blue-500/20 text-blue-300 border-blue-400/30',
    tagline: 'Pure bliss and turquoise waters',
    tripIcon: Waves,
  },
  {
    id: 'vibe2',
    heroImageUrl: 'https://images.unsplash.com/photo-1551632811-561732d1e306?q=80&w=600&h=400&fit=crop',
    heroImageAlt: 'Hiking in the mountains',
    aiHint: 'mountain hiking adventure',
    destination: 'Mountain Adventure',
    location: 'Patagonia, Argentina',
    date: 'Tagged: Summer',
    statusBadge: 'Adventure',
    statusColor: 'bg-orange-500/20 text-orange-300 border-orange-400/30',
    tagline: 'Conquering peaks and finding thrills',
    tripIcon: Mountain,
  },
  {
    id: 'vibe3',
    heroImageUrl: 'https://images.unsplash.com/photo-1519677100203-a0e668c97489?q=80&w=600&h=400&fit=crop',
    heroImageAlt: 'Night market in Thailand',
    aiHint: 'thailand night market food',
    destination: 'Foodie Exploration',
    location: 'Bangkok, Thailand',
    date: 'Tagged: Culinary',
    statusBadge: 'Foodie',
    statusColor: 'bg-rose-500/20 text-rose-300 border-rose-400/30',
    tagline: 'A journey for the taste buds',
    tripIcon: Plane,
  },
];

const milesBehindTripsData: TripCardProps[] = [
  {
    id: 'past1',
    heroImageUrl: 'https://images.unsplash.com/photo-1526481280643-33c94628b67c?q=80&w=600&h=400&fit=crop',
    heroImageAlt: 'Senso-ji Temple in Tokyo',
    aiHint: 'tokyo temple night',
    destination: 'Tokyo Neon & Tradition',
    location: 'Tokyo, Japan',
    date: 'May 10 - May 18, 2023',
    duration: '8 days',
    statusBadge: 'Completed',
    statusColor: 'bg-neutral-500/20 text-neutral-300 border-neutral-400/30',
    tagline: 'Lost in translation and city lights',
    tripIcon: Plane,
  },
  {
    id: 'past2',
    heroImageUrl: 'https://images.unsplash.com/photo-1531572753322-ad063cecc140?q=80&w=600&h=400&fit=crop',
    heroImageAlt: 'The Trevi Fountain in Rome',
    aiHint: 'rome trevi fountain',
    destination: 'Roman Holiday',
    location: 'Rome, Italy',
    date: 'Sep 02 - Sep 08, 2022',
    duration: '6 days',
    statusBadge: 'Completed',
    statusColor: 'bg-neutral-500/20 text-neutral-300 border-neutral-400/30',
    tagline: 'Walking through history\'s pages',
    tripIcon: Plane,
  },
  {
    id: 'past3',
    heroImageUrl: 'https://images.unsplash.com/photo-1549977810-37e06b23a5a2?q=80&w=600&h=400&fit=crop',
    heroImageAlt: 'Santorini, Greece',
    aiHint: 'santorini greece',
    destination: 'Grecian Getaway',
    location: 'Santorini, Greece',
    date: 'Jun 15 - Jun 22, 2021',
    duration: '7 days',
    statusBadge: 'Completed',
    statusColor: 'bg-neutral-500/20 text-neutral-300 border-neutral-400/30',
    tagline: 'Sunsets and seascapes',
    tripIcon: Plane,
  },
  {
    id: 'past4',
    heroImageUrl: 'https://images.unsplash.com/photo-1505832073689-114b06d36509?q=80&w=600&h=400&fit=crop',
    heroImageAlt: 'Northern lights over Iceland',
    aiHint: 'iceland aurora borealis',
    destination: 'Icelandic Wonders',
    location: 'Reykjavík, Iceland',
    date: 'Dec 01 - Dec 07, 2022',
    duration: '7 days',
    statusBadge: 'Completed',
    statusColor: 'bg-neutral-500/20 text-neutral-300 border-neutral-400/30',
    tagline: 'Chasing auroras and frozen waterfalls',
    tripIcon: Plane,
  },
];


const SCROLL_THRESHOLD = 50;

export function MyTripsPageClient() {
  const { getTranslation } = useLanguage();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();
  const [activeCategory, setActiveCategory] = useState<TripCategory>('trailboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [isHeaderScrolled, setIsHeaderScrolled] = useState(false);
  const [savedTrips, setSavedTrips] = useState<TripCardProps[]>([]);

  // Check for category query parameter on mount
  useEffect(() => {
    const categoryParam = searchParams.get('category');
    if (categoryParam && ['takeoffLane', 'trailboard', 'vibeTagged', 'milesBehind', 'soulLogs'].includes(categoryParam)) {
      setActiveCategory(categoryParam as TripCategory);
    }
    // If no category param, the default state ('trailboard') will be used
  }, [searchParams]);


  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY;
    setIsHeaderScrolled(currentScrollY > SCROLL_THRESHOLD);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    handleScroll(); 
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  // Load saved trips from localStorage
  const loadSavedTrips = useCallback(() => {
    const saved = getSavedTrips();
    const convertedTrips = saved.map(convertSavedTripToCardProps);
    setSavedTrips(convertedTrips);
  }, []);

  useEffect(() => {
    loadSavedTrips();
    
    // Listen for storage changes (in case trip is saved from another tab)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'savedTrips') {
        loadSavedTrips();
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [loadSavedTrips]);

  // Refresh saved trips when switching to trailboard category
  useEffect(() => {
    if (activeCategory === 'trailboard') {
      loadSavedTrips();
    }
  }, [activeCategory, loadSavedTrips]);


  const handleHeaderSearchSubmit = () => {
    console.log('Header search submitted on MyTrips page:', searchQuery);
  };

  // Handle trip card click - navigate to trip details
  const handleTripClick = (tripId: string) => {
    if (activeCategory === 'trailboard') {
      // For saved trips, load the trip data and navigate
      const savedTripsList = getSavedTrips();
      const savedTrip = savedTripsList.find(trip => trip.id === tripId);
      
      if (savedTrip) {
        // Store the itinerary data in localStorage for trip-details page
        localStorage.setItem('itineraryData', JSON.stringify(savedTrip.itineraryData));
        if (savedTrip.promptInput) {
          localStorage.setItem('promptInput', savedTrip.promptInput);
        }
        router.push('/trip-details');
      }
    } else {
      // For other categories, handle as needed
      console.log('Trip clicked:', tripId);
    }
  };

  // Handle delete saved trip
  const handleDeleteTrip = useCallback((tripId: string) => {
    const success = deleteSavedTrip(tripId);
    if (success) {
      loadSavedTrips();
    }
  }, [loadSavedTrips]);

  // Handle share saved trip publicly
  const handleShareTrip = useCallback((tripId: string) => {
    const success = shareSavedTripPublicly(tripId);
    if (success) {
      loadSavedTrips(); // Reload to update the UI with the new public status
      toast({
        title: "Trip Shared!",
        description: "Your itinerary has been shared publicly.",
        variant: "default",
      });
    } else {
      toast({
        title: "Error",
        description: "Failed to share the trip. Please try again.",
        variant: "destructive",
      });
    }
  }, [loadSavedTrips, toast]);

  const renderContent = () => {
    switch (activeCategory) {
      case 'takeoffLane':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
            {upcomingTripsData.map(trip => <TripCard key={trip.id} {...trip} />)}
          </div>
        );
      case 'trailboard':
         return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
            {savedTrips.length > 0 ? (
              savedTrips.map(trip => (
                <div 
                  key={trip.id} 
                  onClick={() => handleTripClick(trip.id)}
                  className="cursor-pointer"
                >
                  <TripCard 
                    {...trip} 
                    onDelete={handleDeleteTrip}
                    onShare={handleShareTrip}
                    isPublic={trip.isPublic || isTripPublic(trip.id)}
                  />
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-12 text-muted-foreground">
                <Map className="h-12 w-12 mx-auto mb-4 text-muted-foreground/50" />
                <p className="text-lg font-medium mb-2 text-foreground">No saved trips yet</p>
                <p className="text-sm text-muted-foreground">Save trips from the trip details page to see them here.</p>
              </div>
            )}
          </div>
        );
      case 'vibeTagged':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
            {vibeTaggedTripsData.map(trip => <TripCard key={trip.id} {...trip} />)}
          </div>
        );
      case 'milesBehind':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
            {milesBehindTripsData.map(trip => <TripCard key={trip.id} {...trip} />)}
          </div>
        );
      case 'soulLogs':
        return <SoulLogsSection />;
      default:
        return <div className="p-6 text-center text-muted-foreground">{getTranslation('myTripsSelectCategory', 'Select a category to see your trips.')}</div>;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
       <Header
        isScrolled={isHeaderScrolled}
        searchQuery={searchQuery}
        onSearchQueryChange={setSearchQuery}
        onSearchSubmit={handleHeaderSearchSubmit}
        showCurrencySelector={false}
      />
      <MyTripsLayout
        sidebar={<MyTripsSidebar activeCategory={activeCategory} onSelectCategory={setActiveCategory} />}
        topBar={<MyTripsTopBar onSearch={() => {}} />}
      >
        <main className="flex-1 overflow-y-auto">
          {renderContent()}
        </main>
      </MyTripsLayout>
      <MyTripsFooter />
    </div>
  );
}
