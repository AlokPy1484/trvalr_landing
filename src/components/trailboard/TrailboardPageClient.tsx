'use client';

import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Header } from '@/components/layout/Header';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Star, 
  MapPin, 
  Clock, 
  Eye, 
  User,
  Search,
  Sparkles,
  Mountain,
  Waves,
  Building2,
  Heart,
  ChevronLeft,
  ChevronRight,
  ArrowUpDown,
  Flame,
  Award,
  Zap,
  TrendingUp
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { 
  getPublicItinerariesSortedByPopularity, 
  ratePublicItinerary, 
  incrementItineraryViews,
  getUserRating,
  type PublicItinerary 
} from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

const SCROLL_THRESHOLD = 50;

// Category definitions with images and gradients
const categories = [
  { 
    id: 'all', 
    label: 'All Itineraries', 
    icon: Sparkles,
    image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=800&h=600&fit=crop',
    gradient: 'from-blue-600/80 via-cyan-500/70 to-teal-500/80'
  },
  { 
    id: 'adventure', 
    label: 'Adventure', 
    icon: Mountain,
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=800&h=600&fit=crop',
    gradient: 'from-emerald-600/80 via-green-500/70 to-lime-500/80'
  },
  { 
    id: 'beach', 
    label: 'Beach', 
    icon: Waves,
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=800&h=600&fit=crop',
    gradient: 'from-cyan-600/80 via-blue-500/70 to-indigo-500/80'
  },
  { 
    id: 'city', 
    label: 'City', 
    icon: Building2,
    image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?q=80&w=800&h=600&fit=crop',
    gradient: 'from-purple-600/80 via-pink-500/70 to-rose-500/80'
  },
  { 
    id: 'romantic', 
    label: 'Romantic', 
    icon: Heart,
    image: 'https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?q=80&w=800&h=600&fit=crop',
    gradient: 'from-rose-600/80 via-pink-500/70 to-fuchsia-500/80'
  },
];

// Sort options
const sortOptions = [
  { 
    id: 'popularity', 
    label: 'Most Popular', 
    icon: Flame,
    description: 'Sorted by views and ratings'
  },
  { 
    id: 'views', 
    label: 'Most Viewed', 
    icon: Eye,
    description: 'Highest view count first'
  },
  { 
    id: 'rating', 
    label: 'Top Rated', 
    icon: Award,
    description: 'Highest average rating'
  },
  { 
    id: 'newest', 
    label: 'Newest First', 
    icon: Zap,
    description: 'Recently added first'
  },
  { 
    id: 'duration', 
    label: 'By Duration', 
    icon: Clock,
    description: 'Shortest to longest trips'
  },
];

export function TrailboardPageClient() {
  const { getTranslation } = useLanguage();
  const router = useRouter();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const [publicItineraries, setPublicItineraries] = useState<PublicItinerary[]>([]);
  const [filteredItineraries, setFilteredItineraries] = useState<PublicItinerary[]>([]);
  const [hoveredRating, setHoveredRating] = useState<{ tripId: string; rating: number } | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedSort, setSelectedSort] = useState<string>('popularity');
  const [showSortMenu, setShowSortMenu] = useState(false);
  const categoryScrollRef = useRef<HTMLDivElement>(null);

  // Get current user ID (in a real app, this would come from auth context)
  const getCurrentUserId = () => {
    return localStorage.getItem('userId') || `user_${Date.now()}`;
  };

  const handleScroll = useCallback(() => {
    setIsScrolled(window.scrollY > SCROLL_THRESHOLD);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    const loadItineraries = () => {
      const itineraries = getPublicItinerariesSortedByPopularity();
      setPublicItineraries(itineraries);
    };
    
    loadItineraries();
    
    // Listen for storage changes
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'publicItineraries') {
        loadItineraries();
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Calculate category counts
  const categoryCounts = useMemo(() => {
    return categories.map(category => {
      let count = 0;
      if (category.id === 'all') {
        count = publicItineraries.length;
      } else {
        count = publicItineraries.filter(trip => {
          const categoryLower = category.label.toLowerCase();
          const titleLower = trip.title.toLowerCase();
          const destLower = trip.destination.toLowerCase();
          const descLower = trip.itineraryData?.description?.toLowerCase() || '';
          
          return titleLower.includes(categoryLower) || 
                 destLower.includes(categoryLower) || 
                 descLower.includes(categoryLower);
        }).length;
      }
      return { ...category, count };
    });
  }, [publicItineraries]);

  // Filter and sort itineraries
  useEffect(() => {
    let filtered = [...publicItineraries];

    // Apply category filter
    if (selectedCategory !== 'all') {
      const categoryLabel = categories.find(c => c.id === selectedCategory)?.label.toLowerCase() || '';
      filtered = filtered.filter(trip => {
        const titleLower = trip.title.toLowerCase();
        const destLower = trip.destination.toLowerCase();
        const descLower = trip.itineraryData?.description?.toLowerCase() || '';
        
        return titleLower.includes(categoryLabel) || 
               destLower.includes(categoryLabel) || 
               descLower.includes(categoryLabel);
      });
    }

    // Apply search filter
    if (searchQuery.trim()) {
    const query = searchQuery.toLowerCase();
      filtered = filtered.filter(trip => 
      trip.title.toLowerCase().includes(query) ||
      trip.destination.toLowerCase().includes(query) ||
        trip.itineraryData?.description?.toLowerCase().includes(query) ||
      trip.authorName?.toLowerCase().includes(query)
    );
    }

    // Apply sorting
    switch (selectedSort) {
      case 'popularity':
        filtered.sort((a, b) => {
          const scoreA = (a.views * 0.3) + (a.averageRating * a.totalRatings * 0.7);
          const scoreB = (b.views * 0.3) + (b.averageRating * b.totalRatings * 0.7);
          return scoreB - scoreA;
        });
        break;
      case 'views':
        filtered.sort((a, b) => b.views - a.views);
        break;
      case 'rating':
        filtered.sort((a, b) => {
          if (b.averageRating === a.averageRating) {
            return b.totalRatings - a.totalRatings;
          }
          return b.averageRating - a.averageRating;
        });
        break;
      case 'newest':
        filtered.sort((a, b) => {
          const dateA = new Date(a.startDate).getTime();
          const dateB = new Date(b.startDate).getTime();
          return dateB - dateA;
        });
        break;
      case 'duration':
        filtered.sort((a, b) => a.duration - b.duration);
        break;
    }

    setFilteredItineraries(filtered);
  }, [publicItineraries, selectedCategory, searchQuery, selectedSort]);

  const scrollCategories = (direction: 'left' | 'right') => {
    if (categoryScrollRef.current) {
      const scrollAmount = 300;
      const currentScroll = categoryScrollRef.current.scrollLeft;
      const newScroll = direction === 'left' 
        ? currentScroll - scrollAmount 
        : currentScroll + scrollAmount;
      
      categoryScrollRef.current.scrollTo({
        left: newScroll,
        behavior: 'smooth'
      });
    }
  };

  const handleHeaderSearchSubmit = () => {
    console.log('Header search submitted:', searchQuery);
  };

  const handleTripClick = (trip: PublicItinerary) => {
    incrementItineraryViews(trip.id);
    localStorage.setItem('itineraryData', JSON.stringify(trip.itineraryData));
    if (trip.promptInput) {
      localStorage.setItem('promptInput', trip.promptInput);
    }
    router.push('/trip-details');
  };

  const handleRatingClick = (tripId: string, rating: number, e: React.MouseEvent) => {
    e.stopPropagation();
    const userId = getCurrentUserId();
    const success = ratePublicItinerary(tripId, userId, rating);
    
    if (success) {
      const updated = getPublicItinerariesSortedByPopularity();
      setPublicItineraries(updated);
      
      toast({
        title: "Rating Submitted",
        description: `You rated this itinerary ${rating} star${rating > 1 ? 's' : ''}.`,
      });
    }
  };

  const renderStars = (trip: PublicItinerary, interactive: boolean = false) => {
    const userId = getCurrentUserId();
    const userRating = getUserRating(trip.id, userId);
    const displayRating = hoveredRating?.tripId === trip.id 
      ? hoveredRating.rating 
      : (userRating || trip.averageRating || 0);
    
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={interactive ? (e) => handleRatingClick(trip.id, star, e) : undefined}
            onMouseEnter={interactive ? () => setHoveredRating({ tripId: trip.id, rating: star }) : undefined}
            onMouseLeave={interactive ? () => setHoveredRating(null) : undefined}
            className={cn(
              interactive && "cursor-pointer hover:scale-110 transition-transform",
              !interactive && "cursor-default"
            )}
            disabled={!interactive}
          >
            <Star
              className={cn(
                "h-3.5 w-3.5",
                star <= displayRating
                  ? "fill-amber-400 text-amber-400"
                  : "fill-transparent text-gray-300"
              )}
            />
          </button>
        ))}
        {!interactive && (
          <span className="text-xs text-white font-medium ml-0.5">
            {trip.averageRating > 0 ? trip.averageRating.toFixed(1) : 'New'}
        </span>
        )}
      </div>
    );
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-primary/10 via-background to-accent/10">
      <Header
        isScrolled={isScrolled}
        searchQuery={searchQuery}
        onSearchQueryChange={setSearchQuery}
        onSearchSubmit={handleHeaderSearchSubmit}
        showCurrencySelector={false}
      />

      {/* Hero Section */}
      <section className="relative h-[70vh] min-h-[600px] w-full overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=2400&auto=format&fit=crop&ixlib=rb-4.0.3"
            alt="Explore amazing travel destinations"
            fill
            className="object-cover"
            priority
          />
          {/* Multi-layer gradient overlay for depth */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
        </div>
        
        <div className="relative z-10 h-full flex items-center px-4 sm:px-6 lg:px-8">
          <div className="container mx-auto max-w-7xl">
            <div className="max-w-3xl">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-2 mb-6">
                <Sparkles className="h-4 w-4 text-white" />
                <span className="text-sm font-medium text-white">Discover Amazing Itineraries</span>
              </div>

              {/* Headline */}
              <h1 className="font-headline text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
                Find Your Next
                <span className="block bg-gradient-to-r from-primary via-cyan-400 to-teal-400 bg-clip-text text-transparent">
                  Adventure
                </span>
              </h1>
              
              {/* Subtitle */}
              <p className="text-xl sm:text-2xl text-white/90 mb-10 leading-relaxed max-w-2xl">
                Explore handcrafted travel itineraries shared by travelers around the world
              </p>
              
              {/* Search Bar */}
              <div className="max-w-2xl">
                <div className="relative group">
                  <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground z-10" />
                  <Input
                    type="text"
                    placeholder="Search destinations, activities, or experiences..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleHeaderSearchSubmit()}
                    className="pl-14 pr-32 h-16 text-lg rounded-2xl bg-white/95 backdrop-blur-md border-0 shadow-2xl focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-transparent transition-all"
                  />
                  <Button
                    onClick={handleHeaderSearchSubmit}
                    className="absolute right-2 top-1/2 -translate-y-1/2 h-12 px-6 rounded-xl bg-primary hover:bg-primary/90 text-white shadow-lg"
                  >
                    Search
                  </Button>
                </div>
              </div>

              {/* Stats */}
              <div className="flex flex-wrap items-center gap-6 mt-8">
                <div className="flex items-center gap-2 text-white/90">
                  <div className="h-10 w-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">{publicItineraries.length}+</div>
                    <div className="text-sm text-white/70">Itineraries</div>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-white/90">
                  <div className="h-10 w-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
                    <User className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">500+</div>
                    <div className="text-sm text-white/70">Travelers</div>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-white/90">
                  <div className="h-10 w-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
                    <Heart className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">50+</div>
                    <div className="text-sm text-white/70">Countries</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
            </div>

        {/* Decorative Elements */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
      </section>

      <main className="flex-grow bg-gradient-to-br from-background via-background to-primary/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 2xl:px-12 max-w-[1600px] py-16">
          {/* Category Section */}
          <section className="mb-16 -mx-4 sm:mx-0">
            <div className="text-center mb-10 px-4 sm:px-0">
              <h2 className="font-headline text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
                What is your lifestyle?
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Discover trips that match your style. Select a category to filter experiences.
            </p>
          </div>

            <div className="relative group/scroll px-4 sm:px-0">
              {/* Navigation Buttons - Only show on desktop */}
              <div className="hidden lg:block">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => scrollCategories('left')}
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-20 rounded-full h-12 w-12 bg-white/95 backdrop-blur-md shadow-xl border border-border/50 opacity-0 group-hover/scroll:opacity-100 transition-opacity hover:bg-white"
                >
                  <ChevronLeft className="h-6 w-6" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => scrollCategories('right')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-20 rounded-full h-12 w-12 bg-white/95 backdrop-blur-md shadow-xl border border-border/50 opacity-0 group-hover/scroll:opacity-100 transition-opacity hover:bg-white"
                >
                  <ChevronRight className="h-6 w-6" />
                </Button>
                  </div>

              {/* Scrollable Categories */}
              <div className="relative overflow-hidden rounded-2xl">
                <div
                  ref={categoryScrollRef}
                  className="flex overflow-x-auto gap-5 py-4 px-6 scrollbar-hide scroll-smooth snap-x snap-mandatory"
                  style={{ 
                    scrollbarWidth: 'none', 
                    msOverflowStyle: 'none',
                    scrollPaddingLeft: '24px',
                    scrollPaddingRight: '24px'
                  }}
                >
                  {categoryCounts.map((category) => {
                    const Icon = category.icon;
                    const isActive = selectedCategory === category.id;
                    return (
                      <div
                        key={category.id}
                        onClick={() => setSelectedCategory(category.id)}
                        className={cn(
                          "relative flex-shrink-0 w-[260px] h-[180px] rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 snap-start group/card",
                          isActive
                            ? "ring-4 ring-primary shadow-2xl"
                            : "hover:shadow-xl hover:-translate-y-1"
                        )}
                      >
                        {/* Background Image */}
                        <Image
                          src={category.image}
                          alt={category.label}
                          fill
                          className="object-cover transition-transform duration-500 group-hover/card:scale-110"
                          priority={category.id === 'all'}
                        />
                        
                        {/* Gradient Overlay */}
                        <div className={cn(
                          "absolute inset-0 bg-gradient-to-br transition-all duration-300",
                          category.gradient,
                          isActive 
                            ? "opacity-75" 
                            : "opacity-65 hover:opacity-75"
                        )} />
                        
                        {/* Content */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-5">
                          <div className={cn(
                            "bg-white/20 backdrop-blur-sm rounded-xl p-3 mb-3 transition-all duration-300",
                            isActive && "bg-white/30 scale-110"
                          )}>
                            <Icon className="h-7 w-7 drop-shadow-lg" />
                </div>
                          <h3 className="font-headline text-xl font-bold text-center drop-shadow-lg mb-1">
                            {category.label}
                          </h3>
                          <p className="text-xs text-white/90 font-medium drop-shadow">
                            {category.count} {category.count === 1 ? 'Itinerary' : 'Itineraries'}
                    </p>
                  </div>

                        {/* Active Indicator */}
                        {isActive && (
                          <div className="absolute top-3 right-3">
                            <div className="bg-white rounded-full p-1.5 shadow-lg">
                              <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
                
                {/* Fade Edges - More subtle */}
                <div className="absolute top-0 left-0 bottom-0 w-16 bg-gradient-to-r from-background via-background/80 to-transparent pointer-events-none z-[5]" />
                <div className="absolute top-0 right-0 bottom-0 w-16 bg-gradient-to-l from-background via-background/80 to-transparent pointer-events-none z-[5]" />
              </div>
              
              {/* Scroll Indicator Dots */}
              <div className="flex justify-center gap-2 mt-6">
                {categoryCounts.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={cn(
                      "h-2 rounded-full transition-all duration-300",
                      selectedCategory === category.id
                        ? "w-8 bg-primary"
                        : "w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50"
                    )}
                    aria-label={`Select ${category.label}`}
                  />
                ))}
              </div>
                </div>
          </section>

          {/* Recommended Itineraries Section */}
          <section>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
                  <div>
                <h2 className="font-headline text-3xl font-bold text-foreground mb-2">
                  Recommended Itineraries
                </h2>
                <p className="text-muted-foreground">
                  {filteredItineraries.length} {filteredItineraries.length === 1 ? 'itinerary' : 'itineraries'} found
                    </p>
                  </div>

              {/* Sort Menu */}
              <div className="relative">
                <Button
                  variant="outline"
                  onClick={() => setShowSortMenu(!showSortMenu)}
                  className="gap-2 min-w-[200px] justify-between h-11 rounded-xl border-border/50 hover:border-primary/50 transition-all"
                >
                  <div className="flex items-center gap-2">
                    <ArrowUpDown className="h-4 w-4" />
                    <span className="font-medium">
                      {sortOptions.find(opt => opt.id === selectedSort)?.label}
                    </span>
                  </div>
                  <ChevronLeft className={cn(
                    "h-4 w-4 transition-transform",
                    showSortMenu && "-rotate-90"
                  )} />
                </Button>

                {showSortMenu && (
                  <div className="absolute right-0 top-full mt-2 w-72 bg-card/95 backdrop-blur-xl border border-border/50 rounded-xl shadow-2xl z-30 overflow-hidden">
                    <div className="p-2">
                      {sortOptions.map((option) => {
                        const Icon = option.icon;
                        const isActive = selectedSort === option.id;
                        return (
                          <button
                            key={option.id}
                            onClick={() => {
                              setSelectedSort(option.id);
                              setShowSortMenu(false);
                            }}
                            className={cn(
                              "w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200",
                              isActive
                                ? "bg-primary text-primary-foreground shadow-md"
                                : "hover:bg-muted/50 text-foreground"
                            )}
                          >
                            <Icon className={cn(
                              "h-5 w-5 flex-shrink-0",
                              isActive ? "text-primary-foreground" : "text-primary"
                            )} />
                            <div className="flex-1 text-left">
                              <div className="font-semibold text-sm">{option.label}</div>
                              <div className={cn(
                                "text-xs",
                                isActive ? "text-primary-foreground/80" : "text-muted-foreground"
                              )}>
                                {option.description}
                              </div>
                            </div>
                            {isActive && (
                              <div className="h-2 w-2 rounded-full bg-primary-foreground animate-pulse" />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
                </div>
          </div>

            {/* Close sort menu when clicking outside */}
            {showSortMenu && (
              <div 
                className="fixed inset-0 z-20" 
                onClick={() => setShowSortMenu(false)}
              />
            )}

          {/* Itineraries Grid */}
          {filteredItineraries.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
                {filteredItineraries.map((trip, index) => {
                  const isTopItinerary = index < 3;
                  const discount = trip.views > 100 ? 20 : trip.views > 50 ? 15 : 0;
                  
                  return (
                    <div
                  key={trip.id}
                      className="group relative bg-card/80 backdrop-blur-sm border border-border/50 rounded-xl overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 flex flex-col"
                  onClick={() => handleTripClick(trip)}
                >
                      {/* Image Container with Gradient Overlay */}
                      <div className="relative aspect-[5/4] w-full overflow-hidden">
                    <Image
                      src={trip.heroImageUrl || 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=600&h=400&fit=crop'}
                      alt={trip.title}
                      fill
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                        
                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300" />
                        
                        {/* Discount Badge */}
                        {discount > 0 && (
                          <div className="absolute top-2 right-2 z-10">
                            <Badge className="bg-red-500/95 backdrop-blur-sm text-white rounded-full px-2 py-1 text-xs font-semibold shadow-lg border-0">
                              {discount}% OFF
                            </Badge>
                          </div>
                        )}
                        
                        {/* Top Itinerary Badge */}
                        {isTopItinerary && (
                          <div className="absolute bottom-2 left-2 z-10">
                            <Badge className="bg-primary/95 backdrop-blur-sm text-white rounded-full px-2 py-1 text-xs font-semibold shadow-lg border-0">
                              <Sparkles className="h-3 w-3 mr-1" />
                              TOP
                      </Badge>
                          </div>
                        )}

                        {/* Rating Overlay on Image */}
                        <div className="absolute bottom-2 right-2 z-10 flex items-center gap-1 bg-black/60 backdrop-blur-sm px-2 py-1 rounded-full">
                          {renderStars(trip, false)}
                    </div>
                  </div>
                  
                      {/* Content */}
                      <div className="p-4 bg-gradient-to-b from-card to-card/95">
                        {/* Title - Fixed height for alignment */}
                        <h3 className="font-headline text-lg font-bold text-foreground mb-2.5 line-clamp-2 min-h-[3.5rem] group-hover:text-primary transition-colors">
                          {trip.title}
                        </h3>

                        {/* Details - Fixed structure */}
                        <div className="space-y-2 mb-2.5">
                          <div className="flex items-center gap-2 text-sm text-muted-foreground min-h-[1.25rem]">
                            <MapPin className="h-3.5 w-3.5 flex-shrink-0 text-primary/70" />
                            <span className="truncate font-medium">{trip.destination}</span>
                          </div>
                          <div className="flex items-center gap-3 text-sm text-muted-foreground min-h-[1.25rem]">
                            <div className="flex items-center gap-1.5 flex-shrink-0">
                              <Clock className="h-4 w-4 text-primary/70" />
                              <span>{trip.duration} {trip.duration === 1 ? 'Day' : 'Days'}</span>
                        </div>
                        </div>
                      </div>
                      
                        {/* Interactive Rating Section */}
                        <div 
                          className="pt-2.5 border-t border-border/50 mb-2.5"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <div className="flex items-center gap-1.5 w-full">
                        {renderStars(trip, true)}
                            <span className="text-xs text-muted-foreground ml-auto">
                              ({trip.totalRatings})
                            </span>
                          </div>
                      </div>
                      
                        {/* Footer */}
                        <div className="flex items-center justify-between pt-2.5 border-t border-border/50">
                          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                            <Eye className="h-3.5 w-3.5 text-primary/70 flex-shrink-0" />
                            <span className="whitespace-nowrap">{trip.views}</span>
                          </div>
                      {trip.authorName && (
                            <div className="flex items-center gap-1.5 text-xs text-muted-foreground ml-2">
                              <User className="h-3.5 w-3.5 text-primary/70 flex-shrink-0" />
                              <span className="truncate max-w-[100px] font-medium">{trip.authorName}</span>
                        </div>
                      )}
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          ) : (
            <div className="text-center py-16">
              <MapPin className="h-16 w-16 mx-auto mb-4 text-muted-foreground/50" />
              <h3 className="text-xl font-semibold mb-2">
                  {searchQuery || selectedCategory !== 'all' ? 'No itineraries found' : 'No public itineraries yet'}
              </h3>
              <p className="text-muted-foreground">
                  {searchQuery || selectedCategory !== 'all'
                    ? 'Try adjusting your search terms or filters.'
                  : 'Be the first to share an itinerary! Save a trip and make it public to appear here.'}
              </p>
            </div>
          )}
          </section>
        </div>
      </main>
    </div>
  );
}
