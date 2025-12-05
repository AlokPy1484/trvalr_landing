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
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
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
  Sparkles,
  ChevronDown,
  Filter,
  X,
  Check,
  Ticket,
  Camera,
  Utensils,
  Mountain,
  Music,
  Zap,
  Info
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { useCurrency } from '@/contexts/CurrencyContext';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { ActivityFilters } from './ActivityFilters';

// Types
interface Activity {
  id: string;
  title: string;
  description: string;
  category: string;
  location: string;
  duration: string;
  priceInr: number;
  rating: number;
  reviewCount: number;
  images: string[];
  highlights: string[];
  included: string[];
  meetingPoint: string;
  minParticipants: number;
  maxParticipants: number;
  timeSlots: string[];
  instantConfirmation: boolean;
  freeCancellation: boolean;
  tags: string[];
  provider: string;
}

// Mock data - replace with API call in production
const mockActivities: Activity[] = [
  {
    id: 'act-1',
    title: 'Sunset Desert Safari with BBQ Dinner',
    description: 'Experience the thrill of dune bashing, camel riding, and traditional entertainment under the stars. Enjoy a delicious BBQ dinner in a Bedouin-style camp.',
    category: 'Adventure',
    location: 'Dubai Desert',
    duration: '6 hours',
    priceInr: 4500,
    rating: 4.8,
    reviewCount: 2847,
    images: [
      'https://images.unsplash.com/photo-1451337516015-6b6e9a44a8a3?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?w=800&h=600&fit=crop',
    ],
    highlights: [
      'Dune bashing in 4x4 vehicle',
      'Camel riding experience',
      'Traditional belly dance show',
      'BBQ dinner under the stars',
    ],
    included: ['Hotel pickup & drop-off', 'Dinner', 'Water', 'Professional guide'],
    meetingPoint: 'Hotel pickup available',
    minParticipants: 2,
    maxParticipants: 40,
    timeSlots: ['3:00 PM', '3:30 PM', '4:00 PM'],
    instantConfirmation: true,
    freeCancellation: true,
    tags: ['Bestseller', 'Adventure', 'Family Friendly'],
    provider: 'Desert Adventures LLC',
  },
  {
    id: 'act-2',
    title: 'Paris Food Walking Tour - Montmartre',
    description: 'Discover the culinary delights of Montmartre. Sample cheese, wine, pastries, and more while learning about Parisian food culture from a local guide.',
    category: 'Food & Drink',
    location: 'Montmartre, Paris',
    duration: '3 hours',
    priceInr: 7200,
    rating: 4.9,
    reviewCount: 1523,
    images: [
      'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&h=600&fit=crop',
    ],
    highlights: [
      '8+ food tastings included',
      'Visit local bakeries & cheese shops',
      'Wine tasting at traditional bistro',
      'Small group (max 12 people)',
    ],
    included: ['Food & drink tastings', 'Local guide', 'All taxes'],
    meetingPoint: 'Abbesses Metro Station',
    minParticipants: 4,
    maxParticipants: 12,
    timeSlots: ['10:00 AM', '2:00 PM'],
    instantConfirmation: true,
    freeCancellation: true,
    tags: ['Top Rated', 'Food Tour', 'Small Group'],
    provider: 'Paris Food Tours',
  },
  {
    id: 'act-3',
    title: 'Scuba Diving Experience - Coral Reefs',
    description: 'Dive into crystal-clear waters and explore vibrant coral reefs. Perfect for beginners and certified divers. All equipment and instruction included.',
    category: 'Adventure',
    location: 'Great Barrier Reef',
    duration: '4 hours',
    priceInr: 12500,
    rating: 4.7,
    reviewCount: 892,
    images: [
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=600&fit=crop',
    ],
    highlights: [
      'Certified PADI instructors',
      'All diving equipment included',
      'See tropical fish & coral',
      'Underwater photography available',
    ],
    included: ['Equipment rental', 'Professional guide', 'Insurance', 'Refreshments'],
    meetingPoint: 'Reef Dive Center',
    minParticipants: 2,
    maxParticipants: 8,
    timeSlots: ['8:00 AM', '12:00 PM'],
    instantConfirmation: false,
    freeCancellation: false,
    tags: ['Adventure', 'Water Sports', 'Nature'],
    provider: 'Reef Divers International',
  },
  {
    id: 'act-4',
    title: 'Vatican Museums & Sistine Chapel Skip-the-Line',
    description: 'Beat the crowds with priority access to the Vatican Museums and Sistine Chapel. Expert guide brings history to life with fascinating stories.',
    category: 'Cultural',
    location: 'Vatican City, Rome',
    duration: '3.5 hours',
    priceInr: 6800,
    rating: 4.8,
    reviewCount: 3421,
    images: [
      'https://images.unsplash.com/photo-1531572753322-ad063cecc140?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=800&h=600&fit=crop',
    ],
    highlights: [
      'Skip-the-line entrance',
      'Expert art historian guide',
      'See Sistine Chapel ceiling',
      'Raphael Rooms included',
    ],
    included: ['Skip-the-line tickets', 'Headsets for commentary', 'Expert guide'],
    meetingPoint: 'Vatican Museums Entrance',
    minParticipants: 1,
    maxParticipants: 25,
    timeSlots: ['9:00 AM', '11:00 AM', '2:00 PM'],
    instantConfirmation: true,
    freeCancellation: true,
    tags: ['Skip-the-Line', 'Cultural', 'Bestseller'],
    provider: 'Rome Cultural Tours',
  },
  {
    id: 'act-5',
    title: 'Hot Air Balloon Ride at Sunrise',
    description: 'Float above stunning landscapes as the sun rises. Includes champagne toast and breakfast. An unforgettable once-in-a-lifetime experience.',
    category: 'Adventure',
    location: 'Cappadocia, Turkey',
    duration: '3 hours',
    priceInr: 15000,
    rating: 5.0,
    reviewCount: 687,
    images: [
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=800&h=600&fit=crop',
    ],
    highlights: [
      '1-hour balloon flight',
      'Champagne toast included',
      'Breakfast after landing',
      'Flight certificate',
    ],
    included: ['Hotel pickup', 'Breakfast', 'Champagne', 'Flight certificate', 'Insurance'],
    meetingPoint: 'Hotel pickup included',
    minParticipants: 2,
    maxParticipants: 20,
    timeSlots: ['5:00 AM', '5:30 AM'],
    instantConfirmation: false,
    freeCancellation: false,
    tags: ['Romantic', 'Once in a Lifetime', 'Sunrise'],
    provider: 'Cappadocia Balloons',
  },
  {
    id: 'act-6',
    title: 'Traditional Cooking Class with Market Visit',
    description: 'Learn to cook authentic local dishes from a professional chef. Start with a market tour to select fresh ingredients, then cook and enjoy your meal.',
    category: 'Food & Drink',
    location: 'Bangkok, Thailand',
    duration: '5 hours',
    priceInr: 5500,
    rating: 4.9,
    reviewCount: 1245,
    images: [
      'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1576867757603-05b134ebc379?w=800&h=600&fit=crop',
    ],
    highlights: [
      'Visit local market with chef',
      'Learn 5 traditional dishes',
      'Small group (max 10)',
      'Take home recipe booklet',
    ],
    included: ['Market tour', 'Cooking class', 'Lunch/Dinner', 'Recipe book', 'Apron'],
    meetingPoint: 'Cooking School',
    minParticipants: 2,
    maxParticipants: 10,
    timeSlots: ['9:00 AM', '3:00 PM'],
    instantConfirmation: true,
    freeCancellation: true,
    tags: ['Cooking Class', 'Cultural', 'Small Group'],
    provider: 'Bangkok Cooking Academy',
  },
  {
    id: 'act-7',
    title: 'Wildlife Safari - Big Five Game Drive',
    description: 'Early morning or sunset game drive to spot lions, elephants, rhinos, leopards, and buffalo. Experienced ranger guides ensure amazing wildlife sightings.',
    category: 'Nature',
    location: 'Kruger National Park',
    duration: '4 hours',
    priceInr: 8900,
    rating: 4.8,
    reviewCount: 1567,
    images: [
      'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=800&h=600&fit=crop',
    ],
    highlights: [
      'Experienced ranger guide',
      'Open-top safari vehicle',
      'Binoculars provided',
      'Refreshments included',
    ],
    included: ['Safari vehicle', 'Professional guide', 'Park fees', 'Drinks & snacks'],
    meetingPoint: 'Park Gate',
    minParticipants: 4,
    maxParticipants: 16,
    timeSlots: ['5:30 AM', '4:00 PM'],
    instantConfirmation: true,
    freeCancellation: true,
    tags: ['Wildlife', 'Nature', 'Photography'],
    provider: 'Safari Adventures',
  },
  {
    id: 'act-8',
    title: 'Live Music & Flamenco Show with Tapas',
    description: 'Experience authentic Spanish flamenco in an intimate tablao. Passionate dancers, live guitar, and traditional tapas create an unforgettable evening.',
    category: 'Entertainment',
    location: 'Seville, Spain',
    duration: '2.5 hours',
    priceInr: 4200,
    rating: 4.7,
    reviewCount: 2156,
    images: [
      'https://images.unsplash.com/photo-1504609813442-a8924e83f76e?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=800&h=600&fit=crop',
    ],
    highlights: [
      'Professional flamenco dancers',
      'Live guitar & singing',
      'Tapas & 1 drink included',
      'Intimate venue (50 seats)',
    ],
    included: ['Show ticket', 'Tapas selection', '1 drink', 'Reserved seating'],
    meetingPoint: 'Tablao Flamenco Venue',
    minParticipants: 1,
    maxParticipants: 50,
    timeSlots: ['7:00 PM', '9:00 PM'],
    instantConfirmation: true,
    freeCancellation: true,
    tags: ['Entertainment', 'Cultural', 'Evening Show'],
    provider: 'Seville Nights',
  },
];

const categories = [
  { 
    value: 'all', 
    label: 'All Categories', 
    icon: Sparkles,
    image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400&h=400&fit=crop'
  },
  { 
    value: 'Adventure', 
    label: 'Adventure', 
    icon: Mountain,
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop'
  },
  { 
    value: 'Cultural', 
    label: 'Cultural', 
    icon: Camera,
    image: 'https://images.unsplash.com/photo-1531572753322-ad063cecc140?w=400&h=400&fit=crop'
  },
  { 
    value: 'Food & Drink', 
    label: 'Food & Drink', 
    icon: Utensils,
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&h=400&fit=crop'
  },
  { 
    value: 'Nature', 
    label: 'Nature', 
    icon: Mountain,
    image: 'https://images.unsplash.com/photo-1451337516015-6b6e9a44a8a3?w=400&h=400&fit=crop'
  },
  { 
    value: 'Entertainment', 
    label: 'Entertainment', 
    icon: Music,
    image: 'https://images.unsplash.com/photo-1504609813442-a8924e83f76e?w=400&h=400&fit=crop'
  },
];

const durations = [
  { value: 'all', label: 'Any Duration' },
  { value: 'short', label: 'Up to 4 hours' },
  { value: 'half', label: '4-8 hours' },
  { value: 'full', label: 'Full day (8+ hours)' },
];

const timeOfDay = [
  { value: 'all', label: 'Any Time' },
  { value: 'morning', label: 'Morning' },
  { value: 'afternoon', label: 'Afternoon' },
  { value: 'evening', label: 'Evening' },
];

export function ActivitySearchResults() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { getTranslation } = useLanguage();
  const { selectedCurrency, currencyRates, baseCurrencyCode } = useCurrency();

  // Search params
  const destination = searchParams.get('destination') || 'Dubai';
  const guests = searchParams.get('guests') || '2';

  // State
  const [searchQuery, setSearchQuery] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    searchParams.get('date') ? new Date(searchParams.get('date')!) : undefined
  );
  const [activities, setActivities] = useState<Activity[]>(mockActivities);
  const [filteredActivities, setFilteredActivities] = useState<Activity[]>(mockActivities);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDuration, setSelectedDuration] = useState('all');
  const [selectedTimeOfDay, setSelectedTimeOfDay] = useState('all');
  const [priceRange, setPriceRange] = useState([0, 20000]);
  const [minRating, setMinRating] = useState(0);
  const [sortBy, setSortBy] = useState('recommended');
  const [showFilters, setShowFilters] = useState(false);
  const [savedActivities, setSavedActivities] = useState<Set<string>>(new Set());
  const [selectedFeatures, setSelectedFeatures] = useState<Set<string>>(new Set());

  // Scroll handler
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Filter and sort activities
  useEffect(() => {
    let filtered = [...activities];

    // Category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(act => act.category === selectedCategory);
    }

    // Duration filter
    if (selectedDuration !== 'all') {
      filtered = filtered.filter(act => {
        const hours = parseInt(act.duration);
        if (selectedDuration === 'short') return hours <= 4;
        if (selectedDuration === 'half') return hours > 4 && hours <= 8;
        if (selectedDuration === 'full') return hours > 8;
        return true;
      });
    }

    // Time of day filter (simplified)
    if (selectedTimeOfDay !== 'all') {
      filtered = filtered.filter(act => {
        const firstSlot = act.timeSlots[0];
        const hour = parseInt(firstSlot.split(':')[0]);
        if (selectedTimeOfDay === 'morning') return hour < 12;
        if (selectedTimeOfDay === 'afternoon') return hour >= 12 && hour < 17;
        if (selectedTimeOfDay === 'evening') return hour >= 17;
        return true;
      });
    }

    // Price range filter
    filtered = filtered.filter(act => 
      act.priceInr >= priceRange[0] && act.priceInr <= priceRange[1]
    );

    // Rating filter
    if (minRating > 0) {
      filtered = filtered.filter(act => act.rating >= minRating);
    }

    // Feature filters
    if (selectedFeatures.has('instantConfirmation')) {
      filtered = filtered.filter(act => act.instantConfirmation);
    }
    if (selectedFeatures.has('freeCancellation')) {
      filtered = filtered.filter(act => act.freeCancellation);
    }

    // Sort
    if (sortBy === 'priceLow') {
      filtered.sort((a, b) => a.priceInr - b.priceInr);
    } else if (sortBy === 'priceHigh') {
      filtered.sort((a, b) => b.priceInr - a.priceInr);
    } else if (sortBy === 'rating') {
      filtered.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'duration') {
      filtered.sort((a, b) => parseInt(a.duration) - parseInt(b.duration));
    }

    setFilteredActivities(filtered);
  }, [activities, selectedCategory, selectedDuration, selectedTimeOfDay, priceRange, minRating, sortBy, selectedFeatures]);

  // Currency conversion
  const convertPrice = (priceInr: number): string => {
    const rate = currencyRates[selectedCurrency.code] || 1;
    const convertedPrice = priceInr * rate;
    return `${selectedCurrency.symbol}${convertedPrice.toFixed(0)}`;
  };

  // Toggle saved activity
  const toggleSaved = (activityId: string) => {
    setSavedActivities(prev => {
      const newSet = new Set(prev);
      if (newSet.has(activityId)) {
        newSet.delete(activityId);
      } else {
        newSet.add(activityId);
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
    setSelectedCategory('all');
    setSelectedDuration('all');
    setSelectedTimeOfDay('all');
    setPriceRange([0, 20000]);
    setMinRating(0);
    setSelectedFeatures(new Set());
  };

  // Active filter count
  const activeFilterCount = 
    (selectedCategory !== 'all' ? 1 : 0) +
    (selectedDuration !== 'all' ? 1 : 0) +
    (selectedTimeOfDay !== 'all' ? 1 : 0) +
    (priceRange[0] !== 0 || priceRange[1] !== 20000 ? 1 : 0) +
    (minRating > 0 ? 1 : 0) +
    selectedFeatures.size;

  // Render filters
  const renderFilters = () => (
    <div className="space-y-6">
      {/* Duration */}
      <div>
        <h3 className="font-semibold mb-3 text-foreground">Duration</h3>
        <div className="space-y-2">
          {durations.map((dur) => (
            <button
              key={dur.value}
              onClick={() => setSelectedDuration(dur.value)}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors",
                selectedDuration === dur.value
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted/30 hover:bg-muted/50 text-foreground"
              )}
            >
              <Clock className="h-4 w-4" />
              {dur.label}
            </button>
          ))}
        </div>
      </div>

      {/* Time of Day */}
      <div>
        <h3 className="font-semibold mb-3 text-foreground">Time of Day</h3>
        <div className="space-y-2">
          {timeOfDay.map((time) => (
            <button
              key={time.value}
              onClick={() => setSelectedTimeOfDay(time.value)}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors",
                selectedTimeOfDay === time.value
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted/30 hover:bg-muted/50 text-foreground"
              )}
            >
              {time.label}
            </button>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <h3 className="font-semibold mb-3 text-foreground">Price Range</h3>
        <div className="space-y-4">
          <Slider
            value={priceRange}
            onValueChange={setPriceRange}
            min={0}
            max={20000}
            step={500}
            className="w-full"
          />
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>{convertPrice(priceRange[0])}</span>
            <span>{convertPrice(priceRange[1])}</span>
          </div>
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
              id="instant"
              checked={selectedFeatures.has('instantConfirmation')}
              onCheckedChange={() => toggleFeature('instantConfirmation')}
            />
            <Label htmlFor="instant" className="text-sm cursor-pointer">
              Instant Confirmation
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="cancel"
              checked={selectedFeatures.has('freeCancellation')}
              onCheckedChange={() => toggleFeature('freeCancellation')}
            />
            <Label htmlFor="cancel" className="text-sm cursor-pointer">
              Free Cancellation
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

  return (
    <div className="min-h-screen bg-background">
      <Header
        isScrolled={isScrolled}
        searchQuery={searchQuery}
        onSearchQueryChange={setSearchQuery}
        onSearchSubmit={() => {}}
        showCurrencySelector={true}
      />

      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-primary/5 via-background to-accent/5 border-b border-border overflow-hidden">
        <div className="container mx-auto px-4 py-12 md:py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                Discover The Most{' '}
                <span className="text-primary">Amazing Experiences</span>{' '}
                In {destination}
              </h1>
              <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                Explore thrilling adventures, cultural tours, and unforgettable moments. Book with confidence and create memories that last a lifetime.
              </p>
              
              {/* Search Summary Cards */}
              <div className="flex items-center gap-4 flex-wrap">
                <div className="flex items-center gap-3 bg-card border border-border rounded-xl px-4 py-3 shadow-sm">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">Location</div>
                    <div className="font-semibold">{destination}</div>
                  </div>
                </div>
                
                <Popover>
                  <PopoverTrigger asChild>
                    <button className="flex items-center gap-3 bg-card border border-border rounded-xl px-4 py-3 shadow-sm hover:border-primary/50 transition-colors cursor-pointer">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <Calendar className="h-5 w-5 text-primary" />
                      </div>
                      <div className="text-left">
                        <div className="text-xs text-muted-foreground">Date</div>
                        <div className="font-semibold">
                          {selectedDate ? format(selectedDate, 'PPP') : 'Flexible'}
                        </div>
                      </div>
                    </button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <CalendarComponent
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                
                <div className="flex items-center gap-3 bg-card border border-border rounded-xl px-4 py-3 shadow-sm">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Users className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">Guests</div>
                    <div className="font-semibold">{guests} {parseInt(guests) === 1 ? 'Guest' : 'Guests'}</div>
                  </div>
                </div>
                
                <Button size="lg" className="shadow-lg hover:shadow-xl transition-shadow">
                  <SlidersHorizontal className="h-4 w-4 mr-2" />
                  Search
                </Button>
              </div>
            </motion.div>

            {/* Right Side - Image Collage */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative h-[400px] md:h-[500px] hidden lg:block"
            >
              {/* Creative image arrangement */}
              <div className="relative w-full h-full">
                {/* Large Image 1 - Top Left */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  className="absolute top-0 left-0 w-[45%] h-[45%] rounded-3xl overflow-hidden shadow-2xl z-10"
                >
                  <Image
                    src="https://images.unsplash.com/photo-1451337516015-6b6e9a44a8a3?w=600&h=400&fit=crop"
                    alt="Desert Safari"
                    fill
                    className="object-cover"
                  />
                </motion.div>

                {/* Large Image 2 - Top Right */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                  className="absolute top-0 right-0 w-[50%] h-[50%] rounded-3xl overflow-hidden shadow-2xl z-20"
                >
                  <Image
                    src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop"
                    alt="Hot Air Balloon"
                    fill
                    className="object-cover"
                  />
                </motion.div>

                {/* Medium Image - Bottom Left */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                  className="absolute bottom-0 left-0 w-[40%] h-[45%] rounded-3xl overflow-hidden shadow-2xl z-10"
                >
                  <Image
                    src="https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&h=400&fit=crop"
                    alt="Scuba Diving"
                    fill
                    className="object-cover"
                  />
                </motion.div>

                {/* Small Image - Center */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                  className="absolute bottom-[20%] right-[15%] w-[35%] h-[35%] rounded-3xl overflow-hidden shadow-2xl z-30 border-4 border-background"
                >
                  <Image
                    src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&h=400&fit=crop"
                    alt="Food Tour"
                    fill
                    className="object-cover"
                  />
                </motion.div>

                {/* Decorative Element */}
                <motion.div
                  initial={{ opacity: 0, rotate: -45 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  transition={{ delay: 0.7, duration: 0.8 }}
                  className="absolute bottom-[15%] left-[45%] z-40"
                >
                  <div className="w-16 h-16 rounded-full bg-primary/20 backdrop-blur-sm flex items-center justify-center">
                    <Sparkles className="h-8 w-8 text-primary" />
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Categories Section */}
      <div className="border-b border-border bg-card/30">
        <div className="container mx-auto px-4 py-10">
          <h2 className="text-3xl font-bold mb-8 text-center">Browse by Category</h2>
          <p className="text-muted-foreground text-center mb-8 max-w-2xl mx-auto">
            Find the perfect experience for your trip. From thrilling adventures to cultural discoveries.
          </p>
          <div className="flex items-center justify-center gap-8 flex-wrap">
            {categories.map((cat, index) => {
              const Icon = cat.icon;
              return (
                <motion.button
                  key={cat.value}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.08 }}
                  onClick={() => setSelectedCategory(cat.value)}
                  className="group flex flex-col items-center gap-3 transition-transform hover:scale-110"
                >
                  <div 
                    className={cn(
                      "relative w-28 h-28 rounded-full overflow-hidden border-4 transition-all shadow-lg",
                      selectedCategory === cat.value
                        ? "border-primary shadow-primary/30 ring-4 ring-primary/20"
                        : "border-white dark:border-gray-800 hover:border-primary/50 shadow-gray-300 dark:shadow-gray-900"
                    )}
                  >
                    {/* Background Image */}
                    <Image
                      src={cat.image}
                      alt={cat.label}
                      fill
                      className={cn(
                        "object-cover transition-all duration-300",
                        selectedCategory === cat.value
                          ? "scale-110 brightness-100"
                          : "scale-100 brightness-75 group-hover:brightness-90 group-hover:scale-110"
                      )}
                    />
                    
                    {/* Overlay */}
                    <div className={cn(
                      "absolute inset-0 bg-gradient-to-b transition-opacity",
                      selectedCategory === cat.value
                        ? "from-primary/30 via-primary/40 to-primary/60 opacity-70"
                        : "from-black/20 via-black/30 to-black/50 opacity-60 group-hover:opacity-40"
                    )} />
                    
                    {/* Icon */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Icon className={cn(
                        "h-12 w-12 transition-all drop-shadow-lg",
                        selectedCategory === cat.value 
                          ? "text-white/70 scale-110" 
                          : "text-white/50 group-hover:text-white/60 group-hover:scale-110"
                      )} />
                    </div>
                  </div>
                  <span className={cn(
                    "text-sm font-semibold transition-colors",
                    selectedCategory === cat.value ? "text-primary" : "text-foreground group-hover:text-primary"
                  )}>
                    {cat.label}
                  </span>
                </motion.button>
              );
            })}
          </div>
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
                {filteredActivities.length} {filteredActivities.length === 1 ? 'experience' : 'experiences'}
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
                  <SelectItem value="duration">Duration</SelectItem>
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

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <AnimatePresence mode="wait">
          {filteredActivities.length === 0 ? (
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
                No activities found
              </h3>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                We couldn't find any activities matching your filters. Try adjusting your search criteria.
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
              {/* Activity Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredActivities.map((activity, index) => (
                  <motion.div
                    key={activity.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.03 }}
                  >
                    <Card 
                      className="group overflow-hidden hover:shadow-2xl transition-all duration-300 cursor-pointer border-2 hover:border-primary/50 h-full flex flex-col"
                      onClick={() => router.push(`/activities/${activity.id}`)}
                    >
                      {/* Image */}
                      <div className="relative h-52 overflow-hidden">
                        <Image
                          src={activity.images[0]}
                          alt={activity.title}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        
                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                        
                        {/* Heart Icon */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleSaved(activity.id);
                          }}
                          className="absolute top-3 right-3 bg-white/95 dark:bg-black/70 backdrop-blur-sm p-2.5 rounded-full hover:scale-110 transition-transform shadow-lg z-10"
                        >
                          <Heart
                            className={cn(
                              "h-4 w-4",
                              savedActivities.has(activity.id)
                                ? "fill-red-500 text-red-500"
                                : "text-gray-700 dark:text-gray-300"
                            )}
                          />
                        </button>
                        
                        {/* Tag Badge */}
                        {activity.tags.length > 0 && (
                          <div className="absolute top-3 left-3 z-10">
                            <Badge className="bg-primary text-primary-foreground border-0 shadow-lg font-semibold">
                              {activity.tags[0]}
                            </Badge>
                          </div>
                        )}
                        
                        {/* Rating Badge */}
                        <div className="absolute bottom-3 right-3 flex items-center gap-1 bg-white/95 dark:bg-black/70 backdrop-blur-sm px-2.5 py-1.5 rounded-full shadow-lg">
                          <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                          <span className="text-sm font-bold text-foreground">{activity.rating}</span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-5 flex flex-col flex-grow">
                        {/* Category */}
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="secondary" className="text-xs font-medium">
                            {activity.category}
                          </Badge>
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Clock className="h-3 w-3" />
                            {activity.duration}
                          </div>
                        </div>

                        {/* Title */}
                        <h3 className="text-base font-bold text-foreground line-clamp-2 mb-3 group-hover:text-primary transition-colors leading-tight">
                          {activity.title}
                        </h3>

                        {/* Location */}
                        <div className="flex items-center gap-1.5 text-sm text-muted-foreground mb-3">
                          <MapPin className="h-3.5 w-3.5 flex-shrink-0 text-primary" />
                          <span className="truncate">{activity.location}</span>
                        </div>

                        {/* Features */}
                        <div className="flex flex-wrap gap-1.5 mb-4">
                          {activity.instantConfirmation && (
                            <Badge variant="outline" className="text-xs border-primary/40 text-primary font-medium">
                              <Zap className="h-3 w-3 mr-1 fill-primary" />
                              Instant
                            </Badge>
                          )}
                          {activity.freeCancellation && (
                            <Badge variant="outline" className="text-xs font-medium">
                              <Check className="h-3 w-3 mr-1" />
                              Free Cancel
                            </Badge>
                          )}
                        </div>

                        {/* Spacer */}
                        <div className="flex-grow" />

                        {/* Footer */}
                        <div className="flex items-end justify-between pt-4 border-t border-border/50 mt-auto">
                          <div>
                            <div className="text-xs text-muted-foreground mb-0.5">From</div>
                            <div className="text-2xl font-bold text-primary">
                              {convertPrice(activity.priceInr)}
                            </div>
                            <div className="text-xs text-muted-foreground">per person</div>
                          </div>
                          <Button 
                            size="sm" 
                            className="shadow-md hover:shadow-lg transition-shadow"
                            onClick={(e) => {
                              e.stopPropagation();
                              router.push(`/activities/${activity.id}`);
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

