'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { SubtleFooter } from '@/components/layout/SubtleFooter';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { 
  MapPin, 
  Clock, 
  Users, 
  Star, 
  Heart,
  SlidersHorizontal,
  Calendar,
  TrendingUp,
  Utensils,
  ChefHat,
  DollarSign,
  Wifi,
  Car,
  Leaf,
  Music,
  Search,
  X,
  Check,
  Filter,
  ArrowRight,
  ShoppingCart,
  Phone,
  Mail,
  Menu,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCurrency } from '@/contexts/CurrencyContext';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { restaurantData } from './restaurantData';

// Types
interface Restaurant {
  id: string;
  name: string;
  description: string;
  cuisine: string;
  location: string;
  priceRange: '$' | '$$' | '$$$' | '$$$$';
  priceInr: number;
  rating: number;
  reviewCount: number;
  images: string[];
  features: string[];
  tags: string[];
  openTime: string;
  closeTime: string;
  reservationsAvailable: boolean;
  outdoorSeating: boolean;
  vegetarianOptions: boolean;
  address: string;
  phone: string;
}

// Convert shared data to Restaurant format
const mockRestaurants: Restaurant[] = Object.values(restaurantData).map((rest: any) => ({
  id: rest.id,
  name: rest.name,
  description: rest.description,
  cuisine: rest.cuisine,
  location: rest.location,
  priceRange: rest.priceRange,
  priceInr: rest.priceInr,
  rating: rest.rating,
  reviewCount: rest.reviewCount,
  images: rest.images,
  features: rest.features,
  tags: rest.tags,
  openTime: rest.openTime,
  closeTime: rest.closeTime,
  reservationsAvailable: rest.reservationsAvailable,
  outdoorSeating: rest.outdoorSeating,
  vegetarianOptions: rest.vegetarianOptions,
  address: rest.address,
  phone: rest.phone,
}));

const cuisines = [
  { value: 'all', label: 'All Cuisines', icon: Utensils, image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=400&fit=crop' },
  { value: 'French', label: 'French', icon: ChefHat, image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=400&fit=crop' },
  { value: 'Italian', label: 'Italian', icon: Utensils, image: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=400&h=400&fit=crop' },
  { value: 'Japanese', label: 'Japanese', icon: ChefHat, image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400&h=400&fit=crop' },
  { value: 'Indian', label: 'Indian', icon: Utensils, image: 'https://images.unsplash.com/photo-1551218808-94e220e084d2?w=400&h=400&fit=crop' },
  { value: 'Mediterranean', label: 'Mediterranean', icon: Leaf, image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=400&fit=crop' },
  { value: 'American', label: 'American', icon: Utensils, image: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?w=400&h=400&fit=crop' },
  { value: 'Thai', label: 'Thai', icon: ChefHat, image: 'https://images.unsplash.com/photo-1559314809-0d155014e29e?w=400&h=400&fit=crop' },
  { value: 'Chinese', label: 'Chinese', icon: Utensils, image: 'https://images.unsplash.com/photo-1525755662778-989d0524087e?w=400&h=400&fit=crop' },
  { value: 'Mexican', label: 'Mexican', icon: ChefHat, image: 'https://images.unsplash.com/photo-1599974579688-8dbdd335c77f?w=400&h=400&fit=crop' },
  { value: 'Korean', label: 'Korean', icon: Utensils, image: 'https://images.unsplash.com/photo-1580043017129-ae7a6e75ad79?w=400&h=400&fit=crop' },
  { value: 'Lebanese', label: 'Lebanese', icon: ChefHat, image: 'https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=400&h=400&fit=crop' },
  { value: 'Turkish', label: 'Turkish', icon: Utensils, image: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=400&h=400&fit=crop' },
  { value: 'Vietnamese', label: 'Vietnamese', icon: ChefHat, image: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?w=400&h=400&fit=crop' },
  { value: 'Spanish', label: 'Spanish', icon: Utensils, image: 'https://images.unsplash.com/photo-1534080564583-6be75777b70a?w=400&h=400&fit=crop' },
];

export function RestaurantSearchResults() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { selectedCurrency, currencyRates } = useCurrency();

  // Search params
  const location = searchParams.get('location') || 'Dubai';
  const guests = searchParams.get('guests') || '2';

  // State
  const [searchQuery, setSearchQuery] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const [restaurants, setRestaurants] = useState<Restaurant[]>(mockRestaurants);
  const [filteredRestaurants, setFilteredRestaurants] = useState<Restaurant[]>(mockRestaurants);
  const [selectedCuisine, setSelectedCuisine] = useState('all');
  const [priceRange, setPriceRange] = useState(['$', '$$$']);
  const [minRating, setMinRating] = useState(0);
  const [sortBy, setSortBy] = useState('recommended');
  const [showFilters, setShowFilters] = useState(false);
  const [savedRestaurants, setSavedRestaurants] = useState<Set<string>>(new Set());
  const [selectedFeatures, setSelectedFeatures] = useState<Set<string>>(new Set());
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    searchParams.get('date') ? new Date(searchParams.get('date')!) : undefined
  );
  const [heroImageIndex, setHeroImageIndex] = useState(0);

  // Scroll handler
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Filter and sort restaurants
  useEffect(() => {
    let filtered = [...restaurants];

    // Universal search query filter - searches across all relevant fields
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(rest =>
        rest.name.toLowerCase().includes(query) ||
        rest.cuisine.toLowerCase().includes(query) ||
        rest.description.toLowerCase().includes(query) ||
        rest.location.toLowerCase().includes(query) ||
        // Search in features (e.g., "wifi", "outdoor seating")
        rest.features.some(feature => feature.toLowerCase().includes(query))
      );
    }

    // Cuisine filter
    if (selectedCuisine !== 'all') {
      filtered = filtered.filter(rest => rest.cuisine === selectedCuisine);
    }

    // Price range filter
    const priceOrder = { '$': 1, '$$': 2, '$$$': 3, '$$$$': 4 };
    filtered = filtered.filter(rest => {
      const restPrice = priceOrder[rest.priceRange];
      const minPrice = priceOrder[priceRange[0] as keyof typeof priceOrder];
      const maxPrice = priceOrder[priceRange[1] as keyof typeof priceOrder];
      return restPrice >= minPrice && restPrice <= maxPrice;
    });

    // Rating filter
    if (minRating > 0) {
      filtered = filtered.filter(rest => rest.rating >= minRating);
    }

    // Feature filters
    if (selectedFeatures.has('reservations')) {
      filtered = filtered.filter(rest => rest.reservationsAvailable);
    }
    if (selectedFeatures.has('outdoor')) {
      filtered = filtered.filter(rest => rest.outdoorSeating);
    }
    if (selectedFeatures.has('vegetarian')) {
      filtered = filtered.filter(rest => rest.vegetarianOptions);
    }

    // Sort
    if (sortBy === 'priceLow') {
      filtered.sort((a, b) => a.priceInr - b.priceInr);
    } else if (sortBy === 'priceHigh') {
      filtered.sort((a, b) => b.priceInr - a.priceInr);
    } else if (sortBy === 'rating') {
      filtered.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'reviews') {
      filtered.sort((a, b) => b.reviewCount - a.reviewCount);
    }

    setFilteredRestaurants(filtered);
  }, [restaurants, searchQuery, selectedCuisine, priceRange, minRating, sortBy, selectedFeatures]);

  // Hero image carousel
  useEffect(() => {
    const heroImages = [
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&h=600&fit=crop',
      'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=1200&h=600&fit=crop',
      'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&h=600&fit=crop',
    ];
    const interval = setInterval(() => {
      setHeroImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Currency conversion
  const convertPrice = (priceInr: number): string => {
    const rate = currencyRates[selectedCurrency.code] || 1;
    const convertedPrice = priceInr * rate;
    return `${selectedCurrency.symbol}${convertedPrice.toFixed(0)}`;
  };

  // Toggle saved restaurant
  const toggleSaved = (restaurantId: string) => {
    setSavedRestaurants(prev => {
      const newSet = new Set(prev);
      if (newSet.has(restaurantId)) {
        newSet.delete(restaurantId);
      } else {
        newSet.add(restaurantId);
      }
      return newSet;
    });
  };

  // Toggle feature filter
  const toggleFeature = (feature: string) => {
    setSelectedFeatures(prev => {
      const newSet = new Set(prev);
      if (newSet.has(feature)) {
        newSet.delete(feature);
      } else {
        newSet.add(feature);
      }
      return newSet;
    });
  };

  // Clear all filters
  const clearFilters = () => {
    setSelectedCuisine('all');
    setPriceRange(['$', '$$$']);
    setMinRating(0);
    setSelectedFeatures(new Set());
  };

  // Active filter count
  const activeFilterCount = 
    (selectedCuisine !== 'all' ? 1 : 0) +
    (priceRange[0] !== '$' || priceRange[1] !== '$$$' ? 1 : 0) +
    (minRating > 0 ? 1 : 0) +
    selectedFeatures.size;

  // Render filters
  const renderFilters = () => (
    <div className="space-y-6">
      {/* Price Range */}
      <div>
        <h3 className="font-semibold mb-3 text-foreground">Price Range</h3>
        <div className="space-y-2">
          {[['$', 'Budget'], ['$$', 'Moderate'], ['$$$', 'Expensive'], ['$$$$', 'Very Expensive']].map(([value, label]) => (
            <button
              key={value}
              onClick={() => {
                const priceOrder = { '$': 1, '$$': 2, '$$$': 3, '$$$$': 4 };
                const currentMin = priceOrder[priceRange[0] as keyof typeof priceOrder];
                const currentMax = priceOrder[priceRange[1] as keyof typeof priceOrder];
                const newValue = priceOrder[value as keyof typeof priceOrder];
                
                if (priceRange[0] === priceRange[1]) {
                  setPriceRange([value as '$' | '$$' | '$$$' | '$$$$', value as '$' | '$$' | '$$$' | '$$$$']);
                } else {
                  if (newValue < currentMin) {
                    setPriceRange([value as '$' | '$$' | '$$$' | '$$$$', priceRange[1]]);
                  } else if (newValue > currentMax) {
                    setPriceRange([priceRange[0], value as '$' | '$$' | '$$$' | '$$$$']);
                  }
                }
              }}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors",
                priceRange.includes(value as '$' | '$$' | '$$$' | '$$$$')
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted/30 hover:bg-muted/50 text-foreground"
              )}
            >
              <DollarSign className="h-4 w-4" />
              {value} - {label}
            </button>
          ))}
        </div>
      </div>

      {/* Rating */}
      <div>
        <h3 className="font-semibold mb-3 text-foreground">Minimum Rating</h3>
        <div className="space-y-2">
          {[0, 4.0, 4.5, 4.7].map((rating) => (
            <button
              key={rating}
              onClick={() => setMinRating(rating)}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors",
                minRating === rating
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted/30 hover:bg-muted/50 text-foreground"
              )}
            >
              <Star className="h-4 w-4 fill-current" />
              {rating === 0 ? 'Any Rating' : `${rating}+ Stars`}
            </button>
          ))}
        </div>
      </div>

      {/* Features */}
      <div>
        <h3 className="font-semibold mb-3 text-foreground">Features</h3>
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="reservations"
              checked={selectedFeatures.has('reservations')}
              onCheckedChange={() => toggleFeature('reservations')}
            />
            <Label htmlFor="reservations" className="text-sm cursor-pointer">
              Reservations Available
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="outdoor"
              checked={selectedFeatures.has('outdoor')}
              onCheckedChange={() => toggleFeature('outdoor')}
            />
            <Label htmlFor="outdoor" className="text-sm cursor-pointer">
              Outdoor Seating
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="vegetarian"
              checked={selectedFeatures.has('vegetarian')}
              onCheckedChange={() => toggleFeature('vegetarian')}
            />
            <Label htmlFor="vegetarian" className="text-sm cursor-pointer">
              Vegetarian Options
            </Label>
          </div>
        </div>
      </div>

      {/* Clear Filters */}
      {activeFilterCount > 0 && (
        <Button
          variant="outline"
          className="w-full"
          onClick={clearFilters}
        >
          <X className="h-4 w-4 mr-2" />
          Clear All Filters
        </Button>
      )}
    </div>
  );

  const heroImages = [
    'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&h=600&fit=crop',
    'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=1200&h=600&fit=crop',
    'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&h=600&fit=crop',
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header
        isScrolled={isScrolled}
        searchQuery={searchQuery}
        onSearchQueryChange={setSearchQuery}
        onSearchSubmit={() => {}}
        showCurrencySelector={true}
      />

      {/* Top Promotional Bar */}
      <div className="bg-primary text-primary-foreground py-2">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center gap-2 text-sm">
            <span>🎉 GET 20% OFF ON ALL RESTAURANT RESERVATIONS THIS WEEK!</span>
            <Button variant="link" size="sm" className="text-primary-foreground hover:underline h-auto p-0">
              BOOK NOW
              <ArrowRight className="h-3 w-3 ml-1" />
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content Area - E-commerce Style Layout */}
      <div className="container mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-[280px_1fr_320px] gap-6">
          
          {/* Left Sidebar - Shop By Cuisines & Search */}
          <aside className="hidden lg:block space-y-4">
            {/* Browse By Cuisine */}
            <Card className="p-6 border-border/50 bg-card">
              <h3 className="font-semibold text-base mb-4 text-foreground">Browse By Cuisine</h3>
              <div className="max-h-[376px] overflow-y-auto pr-2 space-y-1 custom-scrollbar">
                {cuisines.filter(c => c.value !== 'all').map((cuisine) => {
                  const Icon = cuisine.icon;
                  return (
                    <button
                      key={cuisine.value}
                      onClick={() => setSelectedCuisine(cuisine.value)}
                      className={cn(
                        "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all text-left text-sm",
                        selectedCuisine === cuisine.value
                          ? "bg-primary/10 text-primary font-medium border border-primary/20"
                          : "hover:bg-muted/50 text-muted-foreground hover:text-foreground"
                      )}
                    >
                      <Icon className="h-4 w-4 flex-shrink-0" />
                      <span>{cuisine.label}</span>
                    </button>
                  );
                })}
              </div>
            </Card>

            {/* Search */}
            <Card className="p-6 border-border/50 bg-card sticky top-24">
              <div>
                <Label className="text-sm font-medium mb-2 block">Search</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Search by restaurant, area, city, cuisine..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                {searchQuery && (
                  <p className="text-xs text-muted-foreground mt-2">
                    {filteredRestaurants.length} restaurant{filteredRestaurants.length !== 1 ? 's' : ''} found
                  </p>
                )}
              </div>
            </Card>
          </aside>

          {/* Center - Hero Banner */}
          <div className="relative">
            <Card className="overflow-hidden border-0 shadow-xl">
              <div className="relative h-[500px] lg:h-[600px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={heroImageIndex}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={heroImages[heroImageIndex]}
                      alt="Restaurant Experience"
                      fill
                      className="object-cover"
                    />
                  </motion.div>
                </AnimatePresence>
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
                
                {/* Content Overlay */}
                <div className="absolute inset-0 flex items-center p-8 md:p-12">
                  <div className="max-w-lg">
                    <Badge className="mb-4 bg-primary/20 text-primary-foreground border-primary/30">
                      100% Authentic Dining
                    </Badge>
                    <h2 className="text-4xl md:text-6xl font-bold text-white mb-4 leading-tight">
                      Discover Amazing <br />
                      <span className="text-primary">Restaurants & Cafes</span>
                    </h2>
                    <p className="text-white/90 text-lg mb-6 leading-relaxed">
                      From fine dining to casual cafes. Find the perfect restaurant for any occasion and create memorable dining experiences.
                    </p>
                    <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                      Explore Restaurants
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </div>
                </div>

                {/* Carousel Indicators */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
                  {heroImages.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setHeroImageIndex(index)}
                      className={cn(
                        "h-2 rounded-full transition-all",
                        heroImageIndex === index ? "w-8 bg-primary" : "w-2 bg-white/50"
                      )}
                    />
                  ))}
                </div>
              </div>
            </Card>
          </div>

          {/* Right Sidebar - Special Offer Banner */}
          <aside className="hidden lg:block">
            <Card className="relative overflow-hidden border-0 shadow-xl h-[600px]">
              <div className="absolute top-0 right-0 bg-red-500 text-white px-4 py-1 text-xs font-bold rotate-12 translate-x-2 -translate-y-2 z-10">
                SPECIAL OFFER
              </div>
              <div className="relative h-full flex flex-col justify-between p-6 bg-gradient-to-br from-primary/10 to-accent/10">
                <div>
                  <Badge className="mb-4 bg-primary/20 text-primary">Limited Time</Badge>
                  <h3 className="text-2xl font-bold mb-2">Summer Sale</h3>
                  <h4 className="text-4xl font-bold text-primary mb-4">50% OFF</h4>
                  <p className="text-muted-foreground mb-6">All Weekend Brunch Reservations</p>
                </div>
                <div className="relative h-48 mb-6">
                  <Image
                    src="https://images.unsplash.com/photo-1559339352-11d035aa65de?w=400&h=300&fit=crop"
                    alt="Special Offer"
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>
                <Button className="w-full bg-primary hover:bg-primary/90">
                  Book Now
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </Card>
          </aside>
        </div>
      </div>


      {/* Filter & Sort Bar */}
      <div className="sticky top-16 z-40 bg-card/95 backdrop-blur-md border-b border-border shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Button
                variant={activeFilterCount > 0 ? "default" : "outline"}
                size="sm"
                onClick={() => setShowFilters(true)}
                className="relative"
              >
                <SlidersHorizontal className="h-4 w-4 mr-2" />
                Filters
                {activeFilterCount > 0 && (
                  <span className="ml-2 bg-primary-foreground text-primary text-xs rounded-full h-5 w-5 flex items-center justify-center font-semibold">
                    {activeFilterCount}
                  </span>
                )}
              </Button>
              
              {activeFilterCount > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearFilters}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <X className="h-4 w-4 mr-1" />
                  Clear all
                </Button>
              )}
            </div>

            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground hidden sm:block">
                {filteredRestaurants.length} {filteredRestaurants.length === 1 ? 'restaurant' : 'restaurants'} found
              </span>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recommended">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="h-4 w-4" />
                      Recommended
                    </div>
                  </SelectItem>
                  <SelectItem value="priceLow">Price: Low to High</SelectItem>
                  <SelectItem value="priceHigh">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                  <SelectItem value="reviews">Most Reviews</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>

      {/* Filters Drawer */}
      <Sheet open={showFilters} onOpenChange={setShowFilters}>
        <SheetContent side="left" className="w-[340px] overflow-y-auto">
          <div className="mb-6">
            <h2 className="text-xl font-bold">Filters</h2>
            {activeFilterCount > 0 && (
              <p className="text-sm text-muted-foreground mt-2">
                {activeFilterCount} filter{activeFilterCount > 1 ? 's' : ''} applied
              </p>
            )}
          </div>
          {renderFilters()}
        </SheetContent>
      </Sheet>

      {/* Restaurant Listings - Product Card Style */}
      <div className="container mx-auto px-4 py-8">
        <AnimatePresence mode="wait">
          {filteredRestaurants.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center py-20"
            >
              <div className="mb-6">
                <div className="w-20 h-20 rounded-full bg-muted/50 flex items-center justify-center mx-auto mb-4">
                  <Filter className="h-10 w-10 text-muted-foreground/50" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-2">
                No restaurants found
              </h3>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                We couldn't find any restaurants matching your filters. Try adjusting your search criteria.
              </p>
              <Button onClick={clearFilters} size="lg">
                <X className="h-4 w-4 mr-2" />
                Clear All Filters
              </Button>
            </motion.div>
          ) : (
            <motion.div
              key="content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {/* Restaurant Cards Grid - E-commerce Style */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredRestaurants.map((restaurant, index) => (
                  <motion.div
                    key={restaurant.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.03 }}
                  >
                    <Card 
                      className="group overflow-hidden hover:shadow-2xl transition-all duration-300 cursor-pointer border-2 hover:border-primary/50 h-full flex flex-col bg-card"
                      onClick={() => router.push(`/restaurants/${restaurant.id}`)}
                    >
                      {/* Image */}
                      <div className="relative h-48 overflow-hidden bg-muted">
                        <Image
                          src={restaurant.images[0]}
                          alt={restaurant.name}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        
                        {/* Heart Icon */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleSaved(restaurant.id);
                          }}
                          className="absolute top-3 right-3 bg-white/95 dark:bg-black/70 backdrop-blur-sm p-2 rounded-full hover:scale-110 transition-transform shadow-lg z-10"
                        >
                          <Heart
                            className={cn(
                              "h-4 w-4",
                              savedRestaurants.has(restaurant.id)
                                ? "fill-red-500 text-red-500"
                                : "text-gray-700 dark:text-gray-300"
                            )}
                          />
                        </button>
                        
                        {/* Tag Badge */}
                        {restaurant.tags.length > 0 && (
                          <div className="absolute top-3 left-3 z-10">
                            <Badge className="bg-primary text-primary-foreground border-0 shadow-lg font-semibold text-xs">
                              {restaurant.tags[0]}
                            </Badge>
                          </div>
                        )}
                      </div>

                      {/* Content */}
                      <div className="p-5 flex flex-col flex-grow">
                        {/* Cuisine & Rating */}
                        <div className="flex items-center justify-between mb-3">
                          <Badge variant="secondary" className="text-xs">
                            {restaurant.cuisine}
                          </Badge>
                          <div className="flex items-center gap-1">
                            <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                            <span className="text-sm font-bold">{restaurant.rating}</span>
                            <span className="text-xs text-muted-foreground">({restaurant.reviewCount})</span>
                          </div>
                        </div>

                        {/* Name */}
                        <h3 className="text-lg font-bold text-foreground line-clamp-1 mb-2 group-hover:text-primary transition-colors">
                          {restaurant.name}
                        </h3>

                        {/* Location */}
                        <div className="flex items-center gap-1.5 text-sm text-muted-foreground mb-3">
                          <MapPin className="h-3.5 w-3.5 flex-shrink-0 text-primary" />
                          <span className="truncate">{restaurant.location}</span>
                        </div>

                        {/* Features */}
                        <div className="flex flex-wrap gap-1.5 mb-4">
                          {restaurant.reservationsAvailable && (
                            <Badge variant="outline" className="text-xs border-primary/40 text-primary">
                              Reservations
                            </Badge>
                          )}
                          {restaurant.outdoorSeating && (
                            <Badge variant="outline" className="text-xs">
                              Outdoor
                            </Badge>
                          )}
                        </div>

                        {/* Spacer */}
                        <div className="flex-grow" />

                        {/* Footer - E-commerce Style */}
                        <div className="flex items-center justify-between pt-4 border-t border-border/50">
                          <div>
                            <div className="text-xs text-muted-foreground mb-0.5">Avg. per person</div>
                            <div className="text-2xl font-bold text-primary">
                              {convertPrice(restaurant.priceInr)}
                            </div>
                          </div>
                          <Button 
                            size="sm" 
                            className="shadow-md hover:shadow-lg transition-shadow"
                            onClick={(e) => {
                              e.stopPropagation();
                              router.push(`/restaurants/${restaurant.id}`);
                            }}
                          >
                            View Details
                          </Button>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <SubtleFooter />
    </div>
  );
}
