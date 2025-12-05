'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { DatePickerWithRange } from '@/components/ui/date-picker-with-range';
import { Separator } from '@/components/ui/separator';
import type { DateRange } from 'react-day-picker';
import { format } from 'date-fns';
import {
  MapPin,
  Star,
  Wifi,
  Car,
  Utensils,
  Waves,
  Moon,
  Users,
  Briefcase,
  Heart,
  PartyPopper,
  Coffee,
  Gamepad2,
  Filter,
  Grid3X3,
  List,
  SortAsc,
  Search,
  Calendar,
  DollarSign,
  ChevronDown,
  ChevronUp,
  Play,
  Map,
  Trophy,
  Sparkles,
  Camera,
  Video,
  Plus,
  Minus,
  ChevronRight,
  Home
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

// Mock data for demonstration
const mockHotels = [
  {
    id: 1,
    name: "The Rooftop Paradise",
    location: "Montmartre, Paris",
    rating: 4.8,
    reviews: 1247,
    price: 285,
    originalPrice: 320,
    images: [
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400",
      "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=400"
    ],
    videoUrl: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4",
    amenities: ["Free WiFi", "Pool", "Restaurant", "Spa"],
    purposeTags: ["Nightlife", "Romantic"],
    moodFilters: ["💖 Romantic", "🎉 Party", "😌 Calm & Quiet"],
    guestLoved: ["Pool View", "Nightlife Access", "Breakfast"],
    description: "Stunning rooftop hotel with panoramic views of the Eiffel Tower. Perfect for couples and nightlife enthusiasts.",
    vibeSummary: "Quiet nights, neon-lit pool bar, best for friends' getaways and romantic evenings.",
    mapThumbnail: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=200&h=150&fit=crop",
    nearbyActivities: [
      { name: "Café Central", distance: "0.2 km", type: "cafe" },
      { name: "Club Zenith", distance: "0.5 km", type: "nightlife" },
      { name: "Louvre Museum", distance: "2.1 km", type: "museum" }
    ],
    workingHours: 8
  },
  {
    id: 2,
    name: "Seaside Boutique Hotel",
    location: "Nice, French Riviera",
    rating: 4.6,
    reviews: 892,
    price: 195,
    originalPrice: 220,
    images: [
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400",
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=400"
    ],
    videoUrl: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_2mb.mp4",
    amenities: ["Beach Access", "Free WiFi", "Breakfast", "Bar"],
    purposeTags: ["Beach Vibes", "Family Spot"],
    moodFilters: ["🏖 Beach Access", "👪 Family Fun", "😌 Calm & Quiet"],
    guestLoved: ["Beach Proximity", "Fresh Breakfast", "Ocean Views"],
    description: "Charming beachfront hotel with direct access to the Mediterranean. Family-friendly with excellent amenities.",
    vibeSummary: "Sunny mornings, gentle waves, perfect for families and relaxation seekers.",
    mapThumbnail: "https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?w=200&h=150&fit=crop",
    nearbyActivities: [
      { name: "Promenade des Anglais", distance: "0.1 km", type: "beach" },
      { name: "Old Town Market", distance: "1.2 km", type: "market" },
      { name: "Castle Hill", distance: "2.3 km", type: "attraction" }
    ],
    workingHours: 6
  },
  {
    id: 3,
    name: "Urban Tech Hub Hotel",
    location: "Silicon Valley, San Francisco",
    rating: 4.7,
    reviews: 2156,
    price: 340,
    originalPrice: 380,
    images: [
      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=400",
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=400"
    ],
    videoUrl: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_5mb.mp4",
    amenities: ["High-Speed WiFi", "Co-working Space", "Gym", "Business Center"],
    purposeTags: ["Work-friendly", "Nightlife"],
    moodFilters: ["💻 WFH + Strong WiFi", "🎉 Party", "💼 Business"],
    guestLoved: ["Fast Internet", "Work Spaces", "Modern Design"],
    description: "Modern hotel designed for digital nomads and business travelers. Exceptional WiFi and work facilities.",
    vibeSummary: "High-energy coworking spaces, rooftop networking events, ideal for innovators.",
    mapThumbnail: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=200&h=150&fit=crop",
    nearbyActivities: [
      { name: "Tech Startup Hub", distance: "0.3 km", type: "office" },
      { name: "Innovation Cafe", distance: "0.8 km", type: "cafe" },
      { name: "Golden Gate Park", distance: "3.2 km", type: "park" }
    ],
    workingHours: 10
  },
  {
    id: 4,
    name: "Mountain View Retreat",
    location: "Swiss Alps, Switzerland",
    rating: 4.9,
    reviews: 743,
    price: 420,
    originalPrice: 480,
    images: [
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400"
    ],
    videoUrl: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_10mb.mp4",
    amenities: ["Mountain Views", "Ski Storage", "Restaurant", "Spa"],
    purposeTags: ["Family Spot", "Romantic"],
    moodFilters: ["😌 Calm & Quiet", "💖 Romantic", "👪 Family Fun"],
    guestLoved: ["Alpine Views", "Ski Access", "Peaceful Atmosphere"],
    description: "Luxurious mountain retreat with breathtaking views. Perfect for skiing, hiking, and romantic getaways.",
    vibeSummary: "Fresh mountain air, crackling fireplaces, ultimate relaxation destination.",
    mapThumbnail: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=200&h=150&fit=crop",
    nearbyActivities: [
      { name: "Ski Resort", distance: "0.5 km", type: "ski" },
      { name: "Mountain Trail", distance: "1.0 km", type: "hiking" },
      { name: "Alpine Restaurant", distance: "0.8 km", type: "restaurant" }
    ],
    workingHours: 4
  }
];

// Filter options with counts
const dealsOptions = [
  { label: "All Deals", count: 0 }
];

const popularFilters = [
  { label: "Book without credit card", count: 33 },
  { label: "No prepayment", count: 36 },
  { label: "Swimming pool", count: 13 },
  { label: "Kitchen/Kitchenette", count: 1 },
  { label: "Free cancellation", count: 4 },
  { label: "Sea view", count: 18 },
  { label: "Air conditioning", count: 43 }
];

const mealsOptions = [
  { label: "Kitchen facilities", count: 1 },
  { label: "Breakfast included", count: 34 }
];

const facilitiesOptions = [
  { label: "Parking", count: 48 },
  { label: "24-hour front desk", count: 47 },
  { label: "Room service", count: 44 },
  { label: "Non-smoking rooms", count: 48 },
  { label: "Restaurant", count: 38 },
  { label: "Family rooms", count: 37 }
];

const propertyTypes = [
  { label: "Hotel", count: 48 },
  { label: "Entire homes & apartments", count: 2 },
  { label: "Aparthotels", count: 1 },
  { label: "Resorts", count: 1 }
];

const propertyRatings = [
  { label: "★ 1", count: 2 },
  { label: "★ 2", count: 1 },
  { label: "★ 3", count: 33 },
  { label: "★ 4", count: 3 },
  { label: "★ 5", count: 4 }
];

const bedPreferences = [
  { label: "Twin Bed", count: 22 },
  { label: "Double Bed", count: 51 }
];

// Counter Row Component for Guest Selection
  const CounterRow = ({
    title,
    subtitle,
    count,
    onDecrement,
    onIncrement,
    min = 0,
  }: {
    title: string;
    subtitle?: string;
    count: number;
    onDecrement: () => void;
    onIncrement: () => void;
    min?: number;
  }) => (
    <div className="flex items-center justify-between py-3">
      <div className="flex-1 min-w-0">
        <h5 className="font-medium text-foreground text-sm sm:text-base">{title}</h5>
        {subtitle && <p className="text-xs sm:text-sm text-muted-foreground">{subtitle}</p>}
      </div>
      <div className="flex items-center gap-2 sm:gap-3">
        <Button
          variant="outline"
          size="icon"
          className="h-7 w-7 sm:h-8 sm:w-8 rounded-full"
          onClick={onDecrement}
          disabled={count <= min}
        >
          <Minus className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
        </Button>
        <span className="w-6 text-center font-semibold text-sm sm:text-base">{count}</span>
        <Button
          variant="outline"
          size="icon"
          className="h-7 w-7 sm:h-8 sm:w-8 rounded-full"
          onClick={onIncrement}
        >
          <Plus className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
        </Button>
      </div>
    </div>
  );

export function StaysSearchResultsClient() {
  const [selectedDeals, setSelectedDeals] = useState<string[]>([]);
  const [selectedPopularFilters, setSelectedPopularFilters] = useState<string[]>([]);
  const [selectedMeals, setSelectedMeals] = useState<string[]>([]);
  const [selectedFacilities, setSelectedFacilities] = useState<string[]>([]);
  const [selectedPropertyTypes, setSelectedPropertyTypes] = useState<string[]>([]);
  const [selectedRatings, setSelectedRatings] = useState<string[]>([]);
  const [selectedBedTypes, setSelectedBedTypes] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState([100, 402]);
  const [sortBy, setSortBy] = useState('recommended');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
  const [showFilters, setShowFilters] = useState(true);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [expandedCard, setExpandedCard] = useState<number | null>(null);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  
  // Collapsible section states
  const [showDeals, setShowDeals] = useState(true);
  const [showPopular, setShowPopular] = useState(true);
  const [showMeals, setShowMeals] = useState(true);
  const [showFacilities, setShowFacilities] = useState(true);
  const [showPropertyType, setShowPropertyType] = useState(true);
  const [showRating, setShowRating] = useState(true);
  const [showBedPreference, setShowBedPreference] = useState(true);
  
  // Search parameters state
  const [location, setLocation] = useState('Paris, France');
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(2024, 11, 15),
    to: new Date(2024, 11, 20),
  });
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  
  // Popover states
  const [locationOpen, setLocationOpen] = useState(false);
  const [dateOpen, setDateOpen] = useState(false);
  const [guestsOpen, setGuestsOpen] = useState(false);
  
  // Format date display
  const dateDisplay = dateRange?.from
    ? dateRange.to
      ? `${format(dateRange.from, 'MMM dd')} - ${format(dateRange.to, 'MMM dd, yyyy')}`
      : format(dateRange.from, 'PPP')
    : 'Add dates';
    
  const guestsDisplay = `${adults} ${adults === 1 ? 'adult' : 'adults'} • ${children} ${children === 1 ? 'child' : 'children'}`;

  const toggleFilter = (filterArray: string[], setFilter: React.Dispatch<React.SetStateAction<string[]>>, value: string) => {
    setFilter(prev =>
      prev.includes(value)
        ? prev.filter(item => item !== value)
        : [...prev, value]
    );
  };

  const filteredHotels = mockHotels.filter(hotel => {
    const matchesPrice = hotel.price >= priceRange[0] && hotel.price <= priceRange[1];
    // Add more filter logic here as needed
    return matchesPrice;
  });

  const sortedHotels = [...filteredHotels].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      case 'recommended':
      default:
        return b.rating - a.rating; // Default to rating for demo
    }
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Hero-Style Search Header with City Background */}
      <div className="relative">
        {/* Background Image - Banner Style (16:5 aspect ratio) */}
        <div className="relative h-[200px] sm:h-[240px] md:h-[260px] lg:h-[280px] overflow-hidden bg-gradient-to-br from-primary/20 to-accent/20">
          <img
            src="https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=2400&h=750&q=85&auto=format&fit=crop&crop=edges"
            alt="Paris"
            className="w-full h-full object-cover object-center"
            loading="eager"
            style={{ imageRendering: '-webkit-optimize-contrast' }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/35 to-black/70" />
          
          {/* Content Overlay */}
          <div className="absolute inset-0 flex flex-col justify-between">
            {/* Top Section - City Name & Quote */}
            <div className="max-w-[1400px] mx-auto w-full px-3 sm:px-4 md:px-6 lg:px-8 pt-4 sm:pt-6">
              <div className="flex items-center gap-2 sm:gap-2.5 text-white mb-1 sm:mb-1.5">
                <MapPin className="h-5 w-5 sm:h-6 sm:w-6" />
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">Paris</h1>
              </div>
              <p className="text-white/95 text-sm sm:text-base mt-1 ml-[28px] sm:ml-[38px] font-medium">France</p>
              
              {/* Inspirational Quote */}
              <div className="mt-3 sm:mt-4 ml-[28px] sm:ml-[38px] max-w-2xl">
                <p className="text-white/90 text-xs sm:text-sm italic leading-relaxed">
                  "Paris is always a good idea. Discover the city of lights, where art, culture, and romance meet at every corner."
                </p>
              </div>
            </div>

            {/* Bottom Section - Interactive Search Bar */}
            <div className="max-w-[1400px] mx-auto w-full px-3 sm:px-4 md:px-6 lg:px-8 pb-3 sm:pb-5">
              <Card className="shadow-2xl border-0 backdrop-blur-sm bg-background/95">
                <CardContent className="p-3 sm:p-4">
                  <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 items-stretch">
                    {/* Location Input with Popover */}
                    <Popover open={locationOpen} onOpenChange={setLocationOpen}>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="flex-1 h-auto py-2.5 sm:py-3 px-3 sm:px-4 justify-start bg-background hover:bg-accent/5 border-border hover:border-primary transition-all min-w-0"
                        >
                          <MapPin className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-muted-foreground flex-shrink-0 mr-2 sm:mr-3" />
                          <div className="flex-1 min-w-0 text-left">
                            <div className="text-xs text-muted-foreground font-normal">Location</div>
                            <div className="font-semibold text-xs sm:text-sm truncate text-foreground">{location}</div>
                          </div>
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-80 max-w-[90vw]">
                        <div className="grid gap-4">
                          <h4 className="font-medium leading-none">Where to?</h4>
                          <Input
                            placeholder="Search destinations..."
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') setLocationOpen(false);
                            }}
                          />
                        </div>
                      </PopoverContent>
                    </Popover>

                    {/* Date Range Picker with Popover */}
                    <Popover open={dateOpen} onOpenChange={setDateOpen}>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="flex-1 h-auto py-2.5 sm:py-3 px-3 sm:px-4 justify-start bg-background hover:bg-accent/5 border-border hover:border-primary transition-all min-w-0"
                        >
                          <Calendar className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-muted-foreground flex-shrink-0 mr-2 sm:mr-3" />
                          <div className="flex-1 min-w-0 text-left">
                            <div className="text-xs text-muted-foreground font-normal">Dates</div>
                            <div className="font-semibold text-xs sm:text-sm text-foreground truncate">{dateDisplay}</div>
                          </div>
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0 max-w-[90vw]" align="start">
                        <DatePickerWithRange date={dateRange} onSelectDate={setDateRange} />
                      </PopoverContent>
                    </Popover>

                    {/* Guests Selector with Popover */}
                    <Popover open={guestsOpen} onOpenChange={setGuestsOpen}>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="flex-1 h-auto py-2.5 sm:py-3 px-3 sm:px-4 justify-start bg-background hover:bg-accent/5 border-border hover:border-primary transition-all min-w-0"
                        >
                          <Users className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-muted-foreground flex-shrink-0 mr-2 sm:mr-3" />
                          <div className="flex-1 min-w-0 text-left">
                            <div className="text-xs text-muted-foreground font-normal">Guests</div>
                            <div className="font-semibold text-xs sm:text-sm text-foreground truncate">{guestsDisplay}</div>
                          </div>
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-80 max-w-[90vw] p-0 rounded-xl" align="start">
                        <div className="p-4">
                          <CounterRow
                            title="Adults"
                            subtitle="Ages 13 or above"
                            count={adults}
                            onDecrement={() => setAdults(c => Math.max(1, c - 1))}
                            onIncrement={() => setAdults(c => c + 1)}
                            min={1}
                          />
                          <Separator className="my-2" />
                          <CounterRow
                            title="Children"
                            subtitle="Ages 0–12"
                            count={children}
                            onDecrement={() => setChildren(c => Math.max(0, c - 1))}
                            onIncrement={() => setChildren(c => c + 1)}
                          />
                        </div>
                        <div className="p-4 border-t border-border bg-muted/30">
                          <Button
                            onClick={() => setGuestsOpen(false)}
                            className="w-full"
                          >
                            Done
                          </Button>
                        </div>
                      </PopoverContent>
                    </Popover>

                    {/* Search Button */}
                    <Button
                      onClick={() => {
                        console.log('Searching...', { location, dateRange, adults, children });
                      }}
                      className="sm:w-auto w-full h-auto py-2.5 sm:py-3 px-6 sm:px-8 text-sm sm:text-base font-semibold shadow-lg hover:shadow-xl transition-shadow"
                    >
                      <Search className="h-4 w-4 sm:h-5 sm:w-5 mr-1.5 sm:mr-2" />
                      Search
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Breadcrumb Navigation Bar */}
      <div className="sticky top-16 z-30 bg-background/98 backdrop-blur-lg border-b border-border shadow-sm">
        <div className="max-w-[1400px] mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-2 sm:py-3">
          <div className="flex items-center justify-between">
            {/* Left: Breadcrumb */}
            <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm">
              <Link href="/" className="flex items-center gap-1 text-muted-foreground hover:text-primary transition-colors">
                <Home className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                <span className="hidden xs:inline">Home</span>
              </Link>
              <ChevronRight className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-muted-foreground" />
              <span className="font-medium text-foreground truncate">Paris</span>
            </div>
            
            {/* Right: Grid/List Toggle */}
            <div className="flex border border-border rounded-md overflow-hidden">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('grid')}
                className="rounded-none border-0 h-7 sm:h-8 px-2 sm:px-3"
              >
                <Grid3X3 className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('list')}
                className="rounded-none border-0 h-7 sm:h-8 px-2 sm:px-3"
              >
                <List className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Filters Dialog */}
      <Dialog open={showMobileFilters} onOpenChange={setShowMobileFilters}>
        <DialogContent className="max-w-[95vw] sm:max-w-md max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Filters</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            {/* Map Component - Hidden on mobile */}
            <Card className="border-border/50 shadow-sm overflow-hidden hidden">
              <div className="relative h-40 sm:h-48 bg-gradient-to-br from-primary/10 to-accent/10">
                <img
                  src="https://api.mapbox.com/styles/v1/mapbox/light-v11/static/2.3522,48.8566,11,0/280x192@2x?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw"
                  alt="Map of Paris"
                  className="w-full h-full object-cover"
                />
              </div>
            </Card>

            {/* Budget Card */}
            <Card className="border-border/50 shadow-sm">
              <CardHeader className="pb-3 cursor-pointer" onClick={() => setShowDeals(!showDeals)}>
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-base">Your budget (per night)</h3>
                  <ChevronDown className={cn("h-4 w-4 transition-transform", showDeals && "rotate-180")} />
                </div>
              </CardHeader>
              {showDeals && (
                <CardContent className="space-y-3">
                  <Slider
                    value={priceRange}
                    onValueChange={setPriceRange}
                    max={500}
                    min={50}
                    step={10}
                    className="mb-3"
                  />
                  <div className="flex justify-between text-sm font-medium">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                  </div>
                </CardContent>
              )}
            </Card>

            {/* Deals Card */}
            <Card className="border-border/50 shadow-sm">
              <CardHeader className="pb-3 cursor-pointer" onClick={() => setShowDeals(!showDeals)}>
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-base">Deals</h3>
                  <ChevronDown className={cn("h-4 w-4 transition-transform", showDeals && "rotate-180")} />
                </div>
              </CardHeader>
              {showDeals && (
                <CardContent className="space-y-2">
                  {dealsOptions.map((deal) => (
                    <div key={deal.label} className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id={`mobile-${deal.label}`}
                          checked={selectedDeals.includes(deal.label)}
                          onCheckedChange={() => toggleFilter(selectedDeals, setSelectedDeals, deal.label)}
                        />
                        <label htmlFor={`mobile-${deal.label}`} className="text-sm cursor-pointer">{deal.label}</label>
                      </div>
                    </div>
                  ))}
                </CardContent>
              )}
            </Card>

            {/* Popular Filters Card */}
            <Card className="border-border/50 shadow-sm">
              <CardHeader className="pb-3 cursor-pointer" onClick={() => setShowPopular(!showPopular)}>
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-base">Popular filters</h3>
                  <ChevronDown className={cn("h-4 w-4 transition-transform", showPopular && "rotate-180")} />
                </div>
              </CardHeader>
              {showPopular && (
                <CardContent className="space-y-2">
                  {popularFilters.map((filter) => (
                    <div key={filter.label} className="flex items-center justify-between">
                      <div className="flex items-center space-x-2 flex-1">
                        <Checkbox
                          id={`mobile-popular-${filter.label}`}
                          checked={selectedPopularFilters.includes(filter.label)}
                          onCheckedChange={() => toggleFilter(selectedPopularFilters, setSelectedPopularFilters, filter.label)}
                        />
                        <label htmlFor={`mobile-popular-${filter.label}`} className="text-sm cursor-pointer">{filter.label}</label>
                      </div>
                      <span className="text-sm text-muted-foreground">{filter.count}</span>
                    </div>
                  ))}
                </CardContent>
              )}
            </Card>

            {/* Meals Card */}
            <Card className="border-border/50 shadow-sm">
              <CardHeader className="pb-3 cursor-pointer" onClick={() => setShowMeals(!showMeals)}>
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-base">Meals</h3>
                  <ChevronDown className={cn("h-4 w-4 transition-transform", showMeals && "rotate-180")} />
                </div>
              </CardHeader>
              {showMeals && (
                <CardContent className="space-y-2">
                  {mealsOptions.map((meal) => (
                    <div key={meal.label} className="flex items-center justify-between">
                      <div className="flex items-center space-x-2 flex-1">
                        <Checkbox
                          id={`mobile-meal-${meal.label}`}
                          checked={selectedMeals.includes(meal.label)}
                          onCheckedChange={() => toggleFilter(selectedMeals, setSelectedMeals, meal.label)}
                        />
                        <label htmlFor={`mobile-meal-${meal.label}`} className="text-sm cursor-pointer">{meal.label}</label>
                      </div>
                      <span className="text-sm text-muted-foreground">{meal.count}</span>
                    </div>
                  ))}
                </CardContent>
              )}
            </Card>

            {/* Facilities Card */}
            <Card className="border-border/50 shadow-sm">
              <CardHeader className="pb-3 cursor-pointer" onClick={() => setShowFacilities(!showFacilities)}>
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-base">Facilities</h3>
                  <ChevronDown className={cn("h-4 w-4 transition-transform", showFacilities && "rotate-180")} />
                </div>
              </CardHeader>
              {showFacilities && (
                <CardContent className="space-y-2">
                  {facilitiesOptions.slice(0, 6).map((facility) => (
                    <div key={facility.label} className="flex items-center justify-between">
                      <div className="flex items-center space-x-2 flex-1">
                        <Checkbox
                          id={`mobile-facility-${facility.label}`}
                          checked={selectedFacilities.includes(facility.label)}
                          onCheckedChange={() => toggleFilter(selectedFacilities, setSelectedFacilities, facility.label)}
                        />
                        <label htmlFor={`mobile-facility-${facility.label}`} className="text-sm cursor-pointer">{facility.label}</label>
                      </div>
                      <span className="text-sm text-muted-foreground">{facility.count}</span>
                    </div>
                  ))}
                  <Button variant="link" className="text-primary p-0 h-auto text-sm">See All</Button>
                </CardContent>
              )}
            </Card>

            {/* Property Type Card */}
            <Card className="border-border/50 shadow-sm">
              <CardHeader className="pb-3 cursor-pointer" onClick={() => setShowPropertyType(!showPropertyType)}>
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-base">Property Type</h3>
                  <ChevronDown className={cn("h-4 w-4 transition-transform", showPropertyType && "rotate-180")} />
                </div>
              </CardHeader>
              {showPropertyType && (
                <CardContent className="space-y-2">
                  {propertyTypes.map((type) => (
                    <div key={type.label} className="flex items-center justify-between">
                      <div className="flex items-center space-x-2 flex-1">
                        <Checkbox
                          id={`mobile-type-${type.label}`}
                          checked={selectedPropertyTypes.includes(type.label)}
                          onCheckedChange={() => toggleFilter(selectedPropertyTypes, setSelectedPropertyTypes, type.label)}
                        />
                        <label htmlFor={`mobile-type-${type.label}`} className="text-sm cursor-pointer">{type.label}</label>
                      </div>
                      <span className="text-sm text-muted-foreground">{type.count}</span>
                    </div>
                  ))}
                </CardContent>
              )}
            </Card>

            {/* Property Rating Card */}
            <Card className="border-border/50 shadow-sm">
              <CardHeader className="pb-3 cursor-pointer" onClick={() => setShowRating(!showRating)}>
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-base">Property rating</h3>
                  <ChevronDown className={cn("h-4 w-4 transition-transform", showRating && "rotate-180")} />
                </div>
              </CardHeader>
              {showRating && (
                <CardContent className="space-y-2">
                  {propertyRatings.map((rating) => (
                    <div key={rating.label} className="flex items-center justify-between">
                      <div className="flex items-center space-x-2 flex-1">
                        <Checkbox
                          id={`mobile-rating-${rating.label}`}
                          checked={selectedRatings.includes(rating.label)}
                          onCheckedChange={() => toggleFilter(selectedRatings, setSelectedRatings, rating.label)}
                        />
                        <label htmlFor={`mobile-rating-${rating.label}`} className="text-sm cursor-pointer">{rating.label}</label>
                      </div>
                      <span className="text-sm text-muted-foreground">{rating.count}</span>
                    </div>
                  ))}
                </CardContent>
              )}
            </Card>

            {/* Bed Preference Card */}
            <Card className="border-border/50 shadow-sm">
              <CardHeader className="pb-3 cursor-pointer" onClick={() => setShowBedPreference(!showBedPreference)}>
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-base">Bed preference</h3>
                  <ChevronDown className={cn("h-4 w-4 transition-transform", showBedPreference && "rotate-180")} />
                </div>
              </CardHeader>
              {showBedPreference && (
                <CardContent className="space-y-2">
                  {bedPreferences.map((bed) => (
                    <div key={bed.label} className="flex items-center justify-between">
                      <div className="flex items-center space-x-2 flex-1">
                        <Checkbox
                          id={`mobile-bed-${bed.label}`}
                          checked={selectedBedTypes.includes(bed.label)}
                          onCheckedChange={() => toggleFilter(selectedBedTypes, setSelectedBedTypes, bed.label)}
                        />
                        <label htmlFor={`mobile-bed-${bed.label}`} className="text-sm cursor-pointer">{bed.label}</label>
                      </div>
                      <span className="text-sm text-muted-foreground">{bed.count}</span>
                    </div>
                  ))}
                </CardContent>
              )}
            </Card>
          </div>
          <div className="flex gap-2 mt-6 pt-4 border-t">
            <Button variant="outline" className="flex-1" onClick={() => setShowMobileFilters(false)}>
              Cancel
            </Button>
            <Button className="flex-1" onClick={() => setShowMobileFilters(false)}>
              Apply Filters
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <div className="max-w-[1400px] mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6">
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-6 items-start">
          {/* Left Filters Sidebar - Hidden on mobile */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: 280, opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="hidden lg:block flex-shrink-0 overflow-hidden w-full lg:w-auto"
              >
                <div className="w-full lg:w-[280px] space-y-4">
                  {/* Filters Header with Hide Button */}
                  <div className="flex items-center justify-start" style={{ marginBottom: '30px' }}>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowFilters(false)}
                      className="text-xs h-7 px-2"
                    >
                      <Filter className="h-3.5 w-3.5 mr-1.5" />
                      Hide Filters
                    </Button>
                  </div>
                  
                      <div className="lg:sticky lg:top-[120px] space-y-4">

                  {/* Map Component */}
                  <Card className="border-border/50 shadow-sm overflow-hidden">
                    <div className="relative h-40 sm:h-48 bg-gradient-to-br from-primary/10 to-accent/10">
                      <img
                        src="https://api.mapbox.com/styles/v1/mapbox/light-v11/static/2.3522,48.8566,11,0/280x192@2x?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw"
                        alt="Map of Paris"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent flex items-end p-3">
                        <div className="flex items-center gap-2 text-white">
                          <Map className="h-4 w-4" />
                          <span className="text-sm font-medium">View on map</span>
                        </div>
                      </div>
                      {/* Hotel markers overlay */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="bg-primary text-primary-foreground rounded-full px-3 py-1 text-xs font-semibold shadow-lg">
                          {sortedHotels.length} stays
                        </div>
                      </div>
                    </div>
                  </Card>

                  {/* Budget Card */}
                  <Card className="border-border/50 shadow-sm">
                    <CardHeader className="pb-3 cursor-pointer" onClick={() => setShowDeals(!showDeals)}>
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-base">Your budget (per night)</h3>
                        <ChevronDown className={cn("h-4 w-4 transition-transform", showDeals && "rotate-180")} />
                      </div>
                    </CardHeader>
                    {showDeals && (
                      <CardContent className="space-y-3">
                        <Slider
                          value={priceRange}
                          onValueChange={setPriceRange}
                          max={500}
                          min={50}
                          step={10}
                          className="mb-3"
                        />
                        <div className="flex justify-between text-sm font-medium">
                          <span>${priceRange[0]}</span>
                          <span>${priceRange[1]}</span>
                        </div>
                      </CardContent>
                    )}
                  </Card>

                  {/* Deals Card */}
                  <Card className="border-border/50 shadow-sm">
                    <CardHeader className="pb-3 cursor-pointer" onClick={() => setShowDeals(!showDeals)}>
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-base">Deals</h3>
                        <ChevronDown className={cn("h-4 w-4 transition-transform", showDeals && "rotate-180")} />
                      </div>
                    </CardHeader>
                    {showDeals && (
                      <CardContent className="space-y-2">
                        {dealsOptions.map((deal) => (
                          <div key={deal.label} className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <Checkbox
                                id={deal.label}
                                checked={selectedDeals.includes(deal.label)}
                                onCheckedChange={() => toggleFilter(selectedDeals, setSelectedDeals, deal.label)}
                              />
                              <label htmlFor={deal.label} className="text-sm cursor-pointer">{deal.label}</label>
                            </div>
                          </div>
                        ))}
                      </CardContent>
                    )}
                  </Card>

                  {/* Popular Filters Card */}
                  <Card className="border-border/50 shadow-sm">
                    <CardHeader className="pb-3 cursor-pointer" onClick={() => setShowPopular(!showPopular)}>
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-base">Popular filters</h3>
                        <ChevronDown className={cn("h-4 w-4 transition-transform", showPopular && "rotate-180")} />
                      </div>
                    </CardHeader>
                    {showPopular && (
                      <CardContent className="space-y-2">
                        {popularFilters.map((filter) => (
                          <div key={filter.label} className="flex items-center justify-between">
                            <div className="flex items-center space-x-2 flex-1">
                              <Checkbox
                                id={filter.label}
                                checked={selectedPopularFilters.includes(filter.label)}
                                onCheckedChange={() => toggleFilter(selectedPopularFilters, setSelectedPopularFilters, filter.label)}
                              />
                              <label htmlFor={filter.label} className="text-sm cursor-pointer">{filter.label}</label>
                            </div>
                            <span className="text-sm text-muted-foreground">{filter.count}</span>
                          </div>
                        ))}
                      </CardContent>
                    )}
                  </Card>

                  {/* Meals Card */}
                  <Card className="border-border/50 shadow-sm">
                    <CardHeader className="pb-3 cursor-pointer" onClick={() => setShowMeals(!showMeals)}>
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-base">Meals</h3>
                        <ChevronDown className={cn("h-4 w-4 transition-transform", showMeals && "rotate-180")} />
                      </div>
                    </CardHeader>
                    {showMeals && (
                      <CardContent className="space-y-2">
                        {mealsOptions.map((meal) => (
                          <div key={meal.label} className="flex items-center justify-between">
                            <div className="flex items-center space-x-2 flex-1">
                              <Checkbox
                                id={meal.label}
                                checked={selectedMeals.includes(meal.label)}
                                onCheckedChange={() => toggleFilter(selectedMeals, setSelectedMeals, meal.label)}
                              />
                              <label htmlFor={meal.label} className="text-sm cursor-pointer">{meal.label}</label>
                            </div>
                            <span className="text-sm text-muted-foreground">{meal.count}</span>
                          </div>
                        ))}
                      </CardContent>
                    )}
                  </Card>

                  {/* Facilities Card */}
                  <Card className="border-border/50 shadow-sm">
                    <CardHeader className="pb-3 cursor-pointer" onClick={() => setShowFacilities(!showFacilities)}>
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-base">Facilities</h3>
                        <ChevronDown className={cn("h-4 w-4 transition-transform", showFacilities && "rotate-180")} />
                      </div>
                    </CardHeader>
                    {showFacilities && (
                      <CardContent className="space-y-2">
                        {facilitiesOptions.slice(0, 6).map((facility) => (
                          <div key={facility.label} className="flex items-center justify-between">
                            <div className="flex items-center space-x-2 flex-1">
                              <Checkbox
                                id={facility.label}
                                checked={selectedFacilities.includes(facility.label)}
                                onCheckedChange={() => toggleFilter(selectedFacilities, setSelectedFacilities, facility.label)}
                              />
                              <label htmlFor={facility.label} className="text-sm cursor-pointer">{facility.label}</label>
                            </div>
                            <span className="text-sm text-muted-foreground">{facility.count}</span>
                          </div>
                        ))}
                        <Button variant="link" className="text-primary p-0 h-auto text-sm">See All</Button>
                      </CardContent>
                    )}
                  </Card>

                  {/* Property Type Card */}
                  <Card className="border-border/50 shadow-sm">
                    <CardHeader className="pb-3 cursor-pointer" onClick={() => setShowPropertyType(!showPropertyType)}>
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-base">Property Type</h3>
                        <ChevronDown className={cn("h-4 w-4 transition-transform", showPropertyType && "rotate-180")} />
                      </div>
                    </CardHeader>
                    {showPropertyType && (
                      <CardContent className="space-y-2">
                        {propertyTypes.map((type) => (
                          <div key={type.label} className="flex items-center justify-between">
                            <div className="flex items-center space-x-2 flex-1">
                              <Checkbox
                                id={type.label}
                                checked={selectedPropertyTypes.includes(type.label)}
                                onCheckedChange={() => toggleFilter(selectedPropertyTypes, setSelectedPropertyTypes, type.label)}
                              />
                              <label htmlFor={type.label} className="text-sm cursor-pointer">{type.label}</label>
                            </div>
                            <span className="text-sm text-muted-foreground">{type.count}</span>
                          </div>
                        ))}
                      </CardContent>
                    )}
                  </Card>

                  {/* Property Rating Card */}
                  <Card className="border-border/50 shadow-sm">
                    <CardHeader className="pb-3 cursor-pointer" onClick={() => setShowRating(!showRating)}>
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-base">Property rating</h3>
                        <ChevronDown className={cn("h-4 w-4 transition-transform", showRating && "rotate-180")} />
                      </div>
                    </CardHeader>
                    {showRating && (
                      <CardContent className="space-y-2">
                        {propertyRatings.map((rating) => (
                          <div key={rating.label} className="flex items-center justify-between">
                            <div className="flex items-center space-x-2 flex-1">
                              <Checkbox
                                id={rating.label}
                                checked={selectedRatings.includes(rating.label)}
                                onCheckedChange={() => toggleFilter(selectedRatings, setSelectedRatings, rating.label)}
                              />
                              <label htmlFor={rating.label} className="text-sm cursor-pointer">{rating.label}</label>
                            </div>
                            <span className="text-sm text-muted-foreground">{rating.count}</span>
                          </div>
                        ))}
                      </CardContent>
                    )}
                  </Card>

                  {/* Bed Preference Card */}
                  <Card className="border-border/50 shadow-sm">
                    <CardHeader className="pb-3 cursor-pointer" onClick={() => setShowBedPreference(!showBedPreference)}>
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-base">Bed preference</h3>
                        <ChevronDown className={cn("h-4 w-4 transition-transform", showBedPreference && "rotate-180")} />
                      </div>
                    </CardHeader>
                    {showBedPreference && (
                      <CardContent className="space-y-2">
                        {bedPreferences.map((bed) => (
                          <div key={bed.label} className="flex items-center justify-between">
                            <div className="flex items-center space-x-2 flex-1">
                              <Checkbox
                                id={bed.label}
                                checked={selectedBedTypes.includes(bed.label)}
                                onCheckedChange={() => toggleFilter(selectedBedTypes, setSelectedBedTypes, bed.label)}
                              />
                              <label htmlFor={bed.label} className="text-sm cursor-pointer">{bed.label}</label>
                            </div>
                            <span className="text-sm text-muted-foreground">{bed.count}</span>
                          </div>
                        ))}
                      </CardContent>
                    )}
                  </Card>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Main Content */}
          <div className="flex-1 min-w-0 w-full">
            {/* Controls Bar - Above Stays */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-0 mb-4 sm:mb-5">
              <div className="flex items-center gap-3">
                {/* Mobile Filter Button */}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowMobileFilters(true)}
                  className="lg:hidden text-xs font-medium h-8 sm:h-9"
                >
                  <Filter className="h-3.5 w-3.5 mr-1.5" />
                  Filters
                </Button>
                {/* Desktop Filter Button */}
                {!showFilters && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowFilters(true)}
                    className="hidden lg:flex text-xs font-medium h-8 sm:h-9"
                  >
                    <Filter className="h-3.5 w-3.5 mr-1.5" />
                    Show Filters
                  </Button>
                )}
                <span className="text-sm font-medium text-foreground">
                  {sortedHotels.length} {sortedHotels.length === 1 ? 'stay' : 'stays'} available
                </span>
              </div>
              
              <div className="flex items-center gap-3">
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-full sm:w-[180px] h-8 sm:h-9 text-sm">
                    <SortAsc className="h-3.5 w-3.5 mr-2" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="recommended">Recommended</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="rating">Highest Rated</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Hotel Cards - Fixed Grid & List Views */}
            <div className={cn(
              viewMode === 'grid'
                ? showFilters 
                  ? "grid grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3 gap-2 sm:gap-3 md:gap-4 lg:gap-5"
                  : "grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-2 sm:gap-3 md:gap-4 lg:gap-5"
                : "flex flex-col gap-3 sm:gap-4"
            )}>
              {sortedHotels.map((hotel, index) => (
                <motion.div
                  key={hotel.id}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: index * 0.05 }}
                  onHoverStart={() => setHoveredCard(hotel.id)}
                  onHoverEnd={() => setHoveredCard(null)}
                >
                  {viewMode === 'grid' ? (
                    // Grid View Card
                        <Card className="h-full overflow-hidden hover:shadow-xl transition-all duration-300 group border-border/50">
                          <div className="relative">
                            <div className="relative h-28 sm:h-36 md:h-44 lg:h-52 overflow-hidden">
                          <img
                            src={hotel.images[0]}
                            alt={hotel.name}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                          
                          {/* Vibe Summary on Hover */}
                          <AnimatePresence>
                            {hoveredCard === hotel.id && (
                              <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex items-end p-2 sm:p-3 md:p-4"
                              >
                                <div className="flex items-start gap-1 sm:gap-2 text-white">
                                  <Sparkles className="h-3 w-3 sm:h-3.5 sm:w-3.5 md:h-4 md:w-4 text-amber-400 flex-shrink-0 mt-0.5" />
                                  <span className="text-[10px] sm:text-xs md:text-sm font-medium leading-snug">{hotel.vibeSummary}</span>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      </div>

                          <CardContent className="p-2 sm:p-2.5 md:p-3 lg:p-4">
                            <div className="flex justify-between items-start mb-1 sm:mb-1.5 md:mb-2">
                              <div className="flex-1 min-w-0 pr-1">
                                <h3 className="font-semibold text-[11px] sm:text-xs md:text-sm lg:text-base mb-0.5 truncate leading-tight">{hotel.name}</h3>
                                <div className="flex flex-col gap-0.5 text-[9px] sm:text-[10px] md:text-xs text-muted-foreground">
                                  <div className="flex items-center gap-0.5">
                                    <MapPin className="h-2 w-2 sm:h-2.5 sm:w-2.5 md:h-3 md:w-3 flex-shrink-0" />
                                    <span className="truncate">{hotel.location}</span>
                                  </div>
                                </div>
                              </div>
                              <div className="flex items-center gap-0.5 flex-shrink-0">
                                <Star className="h-2.5 w-2.5 sm:h-3 sm:w-3 md:h-3.5 md:w-3.5 text-amber-400 fill-amber-400" />
                                <span className="font-semibold text-[10px] sm:text-xs md:text-sm">{hotel.rating}</span>
                              </div>
                            </div>

                        <div className="flex flex-wrap gap-0.5 mb-1.5 sm:mb-2 md:mb-3">
                          {/* Purpose Tags - Show only emoji on mobile */}
                          {hotel.purposeTags.slice(0, 1).map((tag) => (
                            <Badge key={tag} variant="secondary" className="text-[9px] sm:text-[10px] md:text-xs h-3.5 sm:h-4 md:h-5 px-1 sm:px-1.5 md:px-2">
                              {tag === 'Beach Vibes' && '🏖'}
                              {tag === 'Nightlife' && '💃'}
                              {tag === 'Family Spot' && '👨‍👩‍👧'}
                              {tag === 'Work-friendly' && '💼'}
                              {tag === 'Romantic' && '💖'}
                              <span className="hidden md:inline ml-0.5">{tag}</span>
                            </Badge>
                          ))}
                        </div>

                            <div className="pt-1.5 sm:pt-2 md:pt-3 border-t border-border/50">
                              <div className="flex flex-col gap-1 sm:gap-1.5 md:gap-2">
                                <div>
                                  <div className="flex items-baseline gap-0.5 sm:gap-1 md:gap-1.5 flex-wrap">
                                    <span className="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-primary">${hotel.price}</span>
                                    <span className="text-[9px] sm:text-[10px] md:text-xs text-muted-foreground line-through hidden sm:inline">${hotel.originalPrice}</span>
                                    <span className="text-[9px] sm:text-[10px] md:text-xs text-muted-foreground hidden sm:inline">per night</span>
                                  </div>
                                </div>
                                <Link href={`/stays/${hotel.id}`}>
                                  <Button size="sm" className="h-6 sm:h-7 md:h-8 text-[9px] sm:text-[10px] md:text-xs w-full">View</Button>
                                </Link>
                              </div>
                            </div>
                      </CardContent>
                    </Card>
                  ) : (
                    // List View Card - Horizontal Layout
                    <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 group border-border/50">
                      <div className="flex flex-col lg:flex-row">
                        <div className="relative lg:w-80 h-48 lg:h-auto flex-shrink-0 overflow-hidden">
                          <img
                            src={hotel.images[0]}
                            alt={hotel.name}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                        </div>

                        <div className="flex-1 p-4 sm:p-5">
                          <div className="flex justify-between items-start mb-3">
                            <div className="flex-1">
                              <h3 className="font-semibold text-base sm:text-lg mb-1.5">{hotel.name}</h3>
                              <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 text-sm text-muted-foreground mb-2">
                                <div className="flex items-center gap-1">
                                  <MapPin className="h-3.5 w-3.5" />
                                  <span>{hotel.location}</span>
                                </div>
                                <Button
                                  variant="link"
                                  size="sm"
                                  className="h-auto p-0 text-sm text-primary hover:text-primary/80 self-start sm:self-center"
                                >
                                  <Map className="h-3.5 w-3.5 mr-1" />
                                  View on map
                                </Button>
                              </div>
                              <div className="flex flex-wrap gap-1.5 mb-3">
                                {hotel.purposeTags.map((tag) => (
                                  <Badge key={tag} variant="secondary" className="text-xs h-6 px-2.5">
                                    {tag === 'Beach Vibes' && '🏖 '}
                                    {tag === 'Nightlife' && '💃 '}
                                    {tag === 'Family Spot' && '👨‍👩‍👧 '}
                                    {tag === 'Work-friendly' && '💼 '}
                                    {tag === 'Romantic' && '💖 '}
                                    {tag}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                            <div className="flex items-center gap-1.5 ml-4 flex-shrink-0">
                              <Star className="h-4 w-4 text-amber-400 fill-amber-400" />
                              <span className="font-semibold">{hotel.rating}</span>
                              <span className="text-sm text-muted-foreground">({hotel.reviews})</span>
                            </div>
                          </div>

                          <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                            {hotel.description}
                          </p>

                          {/* Vibe Summary for List View */}
                          <div className="flex items-start gap-2 mb-4 p-3 bg-primary/5 rounded-lg">
                            <Sparkles className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                            <span className="text-sm text-muted-foreground italic">{hotel.vibeSummary}</span>
                          </div>

                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-0 pt-3 border-t border-border/50">
                            <div>
                              <div className="flex items-baseline gap-2">
                                <span className="text-xl sm:text-2xl font-bold text-primary">${hotel.price}</span>
                                <span className="text-sm text-muted-foreground line-through">${hotel.originalPrice}</span>
                                <span className="text-sm text-muted-foreground">per night</span>
                              </div>
                            </div>
                            <div className="flex flex-col sm:flex-row gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setExpandedCard(expandedCard === hotel.id ? null : hotel.id)}
                                className="w-full sm:w-auto"
                              >
                                {expandedCard === hotel.id ? 'Hide' : 'Nearby'}
                              </Button>
                              <Link href={`/stays/${hotel.id}`}>
                                <Button size="sm" className="w-full sm:w-auto">View Details</Button>
                              </Link>
                            </div>
                          </div>

                          {/* Expandable Activities */}
                          <AnimatePresence>
                            {expandedCard === hotel.id && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="mt-4 pt-4 border-t border-border/30 overflow-hidden"
                              >
                                    <h4 className="text-sm font-semibold mb-3">Nearby Activities</h4>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                  {hotel.nearbyActivities.map((activity, i) => (
                                    <div key={i} className="flex items-center justify-between text-sm bg-muted/30 p-2 rounded">
                                      <div className="flex items-center gap-2">
                                        {activity.type === 'cafe' && <Coffee className="h-3.5 w-3.5 text-primary" />}
                                        {activity.type === 'nightlife' && <PartyPopper className="h-3.5 w-3.5 text-primary" />}
                                        {activity.type === 'museum' && <Camera className="h-3.5 w-3.5 text-primary" />}
                                        {activity.type === 'beach' && <Waves className="h-3.5 w-3.5 text-primary" />}
                                        {activity.type === 'market' && <Users className="h-3.5 w-3.5 text-primary" />}
                                        {activity.type === 'attraction' && <MapPin className="h-3.5 w-3.5 text-primary" />}
                                        {activity.type === 'office' && <Briefcase className="h-3.5 w-3.5 text-primary" />}
                                        {activity.type === 'ski' && <Gamepad2 className="h-3.5 w-3.5 text-primary" />}
                                        {activity.type === 'hiking' && <MapPin className="h-3.5 w-3.5 text-primary" />}
                                        {activity.type === 'restaurant' && <Utensils className="h-3.5 w-3.5 text-primary" />}
                                        {activity.type === 'park' && <MapPin className="h-3.5 w-3.5 text-primary" />}
                                        <span className="truncate text-xs">{activity.name}</span>
                                      </div>
                                      <span className="text-xs text-muted-foreground ml-2">{activity.distance}</span>
                                    </div>
                                  ))}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      </div>
                    </Card>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
