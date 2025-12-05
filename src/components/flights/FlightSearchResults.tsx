'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Plane,
  ArrowRight,
  Calendar,
  Users,
  SlidersHorizontal,
  ArrowRightLeft,
  ChevronDown,
  ChevronUp,
  Filter,
  X,
  Search,
  MapPin,
  Info,
  Briefcase,
  UtensilsCrossed,
  Wifi,
  MonitorPlay,
  Zap,
  TrendingUp,
  TrendingDown,
  Minus,
  Plus,
  Star,
  Luggage,
  Sun,
  Sunset,
  Moon,
  CloudSun,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Slider } from '@/components/ui/slider';
import { cn } from '@/lib/utils';
import { DatePickerWithRange } from '@/components/ui/date-picker-with-range';
import { DateRange } from 'react-day-picker';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { format, addDays } from 'date-fns';

// Mock date availability data for the calendar
const mockDateAvailability = [
  { date: 'Nov 2 - Nov 3', price: 287, available: true },
  { date: 'Nov 3 - Nov 4', price: null, available: false },
  { date: 'Nov 4 - Nov 5', price: 263, available: true },
  { date: 'Nov 5 - Nov 6', price: 235, available: true, isCheapest: true },
  { date: 'Nov 6 - Nov 7', price: 239, available: true },
  { date: 'Nov 7 - Nov 8', price: null, available: false },
  { date: 'Nov 8 - Nov 9', price: 243, available: true },
  { date: 'Nov 9 - Nov 10', price: 256, available: true },
  { date: 'Nov 10 - Nov 11', price: 271, available: true },
];

// Mock airlines data
const mockAirlines = [
  { name: 'Indigo', code: 'IG', count: 57, price: 2569 },
  { name: 'Air India', code: 'AI', count: 26, price: 2325 },
  { name: 'Air India Express', code: 'IX', count: 18, price: 2325 },
  { name: 'Qatar Airways', code: 'QR', count: 37, price: null },
  { name: 'Flynas', code: 'XY', count: 61, price: 3363 },
  { name: 'SpiceJet', code: 'SG', count: 45, price: 2789 },
  { name: 'Vistara', code: 'UK', count: 32, price: 2950 },
];

// Mock flight data
const mockFlights = [
  {
    id: 1,
    airline: 'USA Airlines',
    airlineCode: 'UA',
    logo: '🇺🇸',
    route: 'UK - USA',
    departure: '11:30 AM',
    arrival: '12:45 PM',
    duration: '16h 15m',
    stops: 0,
    stopInfo: 'Non-Stop',
    price: 100,
    originalPrice: 150,
    flightClass: 'Economy',
    departureAirport: 'Heathrow',
    departureCode: 'LHR',
    arrivalAirport: 'JFK International',
    arrivalCode: 'JFK',
    aircraft: 'Boeing 787',
    amenities: ['WiFi', 'In-flight Entertainment', 'Meals'],
    baggageAllowance: '2 checked bags',
    priceType: 'cheapest',
    departureDate: '31 Jul, Wed',
    layovers: []
  },
  {
    id: 2,
    airline: 'UK Airways',
    airlineCode: 'BA',
    logo: '🇬🇧',
    route: 'UK - USA',
    departure: '11:30 AM',
    arrival: '12:45 PM',
    duration: '18h 45m',
    stops: 1,
    stopInfo: '1 Stop',
    price: 120,
    originalPrice: 180,
    flightClass: 'Economy',
    departureAirport: 'Gatwick',
    departureCode: 'LGW',
    arrivalAirport: 'Newark',
    arrivalCode: 'EWR',
    aircraft: 'Airbus A350',
    amenities: ['WiFi', 'Premium Meals', 'Extra Legroom'],
    baggageAllowance: '2 checked bags',
    priceType: null,
    departureDate: '31 Jul, Wed',
    layovers: ['DXB - 2h 30m']
  },
  {
    id: 3,
    airline: 'NYC Express',
    airlineCode: 'NX',
    logo: '🗽',
    route: 'NYC to LA',
    departure: '11:30 AM',
    arrival: '12:45 PM',
    duration: '6h 15m',
    stops: 0,
    stopInfo: 'Non-Stop',
    price: 180,
    originalPrice: 220,
    flightClass: 'Business',
    departureAirport: 'JFK International',
    departureCode: 'JFK',
    arrivalAirport: 'Los Angeles Intl',
    arrivalCode: 'LAX',
    aircraft: 'Boeing 777',
    amenities: ['Lie-flat Seats', 'Premium Dining', 'Priority Boarding'],
    baggageAllowance: '3 checked bags',
    priceType: 'fastest',
    departureDate: '31 Jul, Wed',
    layovers: []
  },
  {
    id: 4,
    airline: 'LA Express',
    airlineCode: 'LX',
    logo: '☀️',
    route: 'LA to NYC',
    departure: '11:30 AM',
    arrival: '12:45 PM',
    duration: '5h 30m',
    stops: 0,
    stopInfo: 'Non-Stop',
    price: 100,
    originalPrice: 130,
    flightClass: 'Economy',
    departureAirport: 'Los Angeles Intl',
    departureCode: 'LAX',
    arrivalAirport: 'JFK International',
    arrivalCode: 'JFK',
    aircraft: 'Airbus A321',
    amenities: ['WiFi', 'Snacks'],
    baggageAllowance: '1 checked bag',
    priceType: 'cheapest',
    departureDate: '31 Jul, Wed',
    layovers: []
  },
  {
    id: 5,
    airline: 'Chicago Wings',
    airlineCode: 'CW',
    logo: '🌆',
    route: 'Chicago to Miami',
    departure: '11:30 AM',
    arrival: '12:45 PM',
    duration: '3h 15m',
    stops: 0,
    stopInfo: 'Non-Stop',
    price: 95,
    originalPrice: 120,
    flightClass: 'Economy',
    departureAirport: "O'Hare",
    departureCode: 'ORD',
    arrivalAirport: 'Miami Intl',
    arrivalCode: 'MIA',
    aircraft: 'Boeing 737',
    amenities: ['WiFi', 'In-flight Entertainment'],
    baggageAllowance: '1 checked bag',
    priceType: 'cheapest',
    departureDate: '31 Jul, Wed',
    layovers: []
  }
];

export function FlightSearchResults() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Search parameters
  const [fromLocation, setFromLocation] = useState(searchParams?.get('from') || 'New Delhi');
  const [toLocation, setToLocation] = useState(searchParams?.get('to') || 'Dubai');
  const [departDate, setDepartDate] = useState(searchParams?.get('depart') || 'Wed, Nov 5');
  const [returnDate, setReturnDate] = useState(searchParams?.get('return') || 'Thu, Nov 6');
  const [passengers, setPassengers] = useState(parseInt(searchParams?.get('passengers') || '1'));
  const [flightClass, setFlightClass] = useState(searchParams?.get('class') || 'Economy');

  // Filters
  const [priceRange, setPriceRange] = useState([100, 402]);
  const [selectedStops, setSelectedStops] = useState<number[]>([0, 1, 2]);
  const [selectedAirlines, setSelectedAirlines] = useState<string[]>([]);
  const [departureTimeFilter, setDepartureTimeFilter] = useState<string[]>([]);
  const [arrivalTimeFilter, setArrivalTimeFilter] = useState<string[]>([]);
  const [maxDuration, setMaxDuration] = useState([24]);
  const [selectedStopoverCities, setSelectedStopoverCities] = useState<string[]>([]);
  const [selectedAirports, setSelectedAirports] = useState<string[]>([]);
  const [selectedAircrafts, setSelectedAircrafts] = useState<string[]>([]);

  // Additional filters
  const [directFlights, setDirectFlights] = useState(false);
  const [checkedBaggage, setCheckedBaggage] = useState(false);
  const [noBagFees, setNoBagFees] = useState(false);
  const [starAlliance, setStarAlliance] = useState(false);
  const [oneworld, setOneworld] = useState(false);
  const [skyTeam, setSkyTeam] = useState(false);

  // UI State
  const [showFilters, setShowFilters] = useState(false);
  const [expandedFlight, setExpandedFlight] = useState<number | null>(null);
  const [sortBy, setSortBy] = useState<'cheapest' | 'fastest' | 'best'>('cheapest');
  const [tripType, setTripType] = useState<'return' | 'one-way' | 'multi-city'>('return');
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [currentDateIndex, setCurrentDateIndex] = useState(0);

  const airlines = Array.from(new Set(mockFlights.map(f => f.airline)));
  
  const timeSlots = [
    { label: 'Morning', value: 'morning', icon: Sun, time: '00:00 - 11:59' },
    { label: 'Noon', value: 'noon', icon: CloudSun, time: '12:00 - 14:59' },
    { label: 'Afternoon', value: 'afternoon', icon: Sunset, time: '15:00 - 17:59' },
    { label: 'Night', value: 'night', icon: Moon, time: '18:00 - 23:59' },
  ];

  const handleLocationSwap = () => {
    const temp = fromLocation;
    setFromLocation(toLocation);
    setToLocation(temp);
  };

  const handleSearch = () => {
    console.log('Searching flights...');
  };

  const filteredFlights = mockFlights.filter(flight => {
    if (flight.price < priceRange[0] || flight.price > priceRange[1]) return false;
    if (!selectedStops.includes(flight.stops)) return false;
    if (selectedAirlines.length > 0 && !selectedAirlines.includes(flight.airline)) return false;
    return true;
  });

  const sortedFlights = [...filteredFlights].sort((a, b) => {
    if (sortBy === 'cheapest') return a.price - b.price;
    if (sortBy === 'fastest') {
      const aDuration = parseInt(a.duration.split('h')[0]);
      const bDuration = parseInt(b.duration.split('h')[0]);
      return aDuration - bDuration;
    }
    return 0;
  });

  const cheapestFlight = sortedFlights.reduce((min, flight) => 
    flight.price < min.price ? flight : min, sortedFlights[0]);
  
  const fastestFlight = sortedFlights.reduce((min, flight) => {
    const minDuration = parseInt(min.duration.split('h')[0]) * 60 + parseInt(min.duration.split('h')[1]?.split('m')[0] || '0');
    const flightDuration = parseInt(flight.duration.split('h')[0]) * 60 + parseInt(flight.duration.split('h')[1]?.split('m')[0] || '0');
    return flightDuration < minDuration ? flight : min;
  }, sortedFlights[0]);

  const visibleDates = mockDateAvailability.slice(currentDateIndex, currentDateIndex + 5);
  const canScrollLeft = currentDateIndex > 0;
  const canScrollRight = currentDateIndex + 5 < mockDateAvailability.length;

  return (
    <div className="min-h-screen bg-background">
      {/* Enhanced Search Bar */}
      <div className="sticky top-16 z-40 bg-card border-b border-border shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          {/* Trip Type */}
          <div className="flex items-center gap-4 mb-4">
            <div className="flex items-center gap-2">
              <input
                type="radio"
                id="return"
                name="tripType"
                value="return"
                checked={tripType === 'return'}
                onChange={() => setTripType('return')}
                className="w-4 h-4 text-primary-foreground"
              />
              <Label htmlFor="return" className="text-sm cursor-pointer">
                Return
              </Label>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="radio"
                id="one-way"
                name="tripType"
                value="one-way"
                checked={tripType === 'one-way'}
                onChange={() => setTripType('one-way')}
                className="w-4 h-4"
              />
              <Label htmlFor="one-way" className="text-sm cursor-pointer">
                One-way
              </Label>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="radio"
                id="multi-city"
                name="tripType"
                value="multi-city"
                checked={tripType === 'multi-city'}
                onChange={() => setTripType('multi-city')}
                className="w-4 h-4"
              />
              <Label htmlFor="multi-city" className="text-sm cursor-pointer">
                Multi-city
              </Label>
            </div>
            <div className="flex items-center gap-2 ml-auto">
              <Checkbox id="direct" checked={directFlights} onCheckedChange={(checked) => setDirectFlights(checked as boolean)} />
              <Label htmlFor="direct" className="text-sm cursor-pointer">
                Direct
              </Label>
            </div>
          </div>

          {/* Search Inputs */}
          <div className="flex flex-col lg:flex-row items-stretch gap-3 bg-card rounded-xl p-2">
            {/* From - To */}
            <div className="flex items-center gap-2 flex-1 bg-background rounded-lg px-3 py-2">
              <div className="flex-1">
                <p className="text-xs text-muted-foreground">{fromLocation}</p>
                <p className="text-sm font-medium">All airports</p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleLocationSwap}
                className="flex-shrink-0 h-8 w-8 rounded-full bg-muted hover:bg-muted/80"
              >
                <ArrowRightLeft className="h-4 w-4" />
              </Button>
              <div className="flex-1">
                <p className="text-xs text-muted-foreground">{toLocation}</p>
                <p className="text-sm font-medium">All airports</p>
              </div>
            </div>

            {/* Dates */}
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="flex-1 lg:w-64 justify-start bg-background">
                  <Calendar className="h-4 w-4 mr-2" />
                  <div className="flex items-center gap-2">
                    <span className="text-sm">{departDate}</span>
                    {tripType === 'return' && (
                      <>
                        <span className="text-muted-foreground">—</span>
                        <span className="text-sm">{returnDate}</span>
                      </>
                    )}
                  </div>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <DatePickerWithRange />
              </PopoverContent>
            </Popover>

            {/* Passengers & Class */}
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="lg:w-48 justify-start bg-background">
                  <Users className="h-4 w-4 mr-2" />
                  <span className="text-sm">{passengers} adult · {flightClass}</span>
                  <ChevronDown className="h-4 w-4 ml-auto" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className="space-y-4">
                  <div>
                    <Label className="text-sm font-medium">Passengers</Label>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-sm">Adults</span>
                      <div className="flex items-center gap-3">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => setPassengers(Math.max(1, passengers - 1))}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="w-8 text-center">{passengers}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => setPassengers(passengers + 1)}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                  <Separator />
                  <div>
                    <Label className="text-sm font-medium mb-2 block">Cabin</Label>
                    <Select value={flightClass} onValueChange={setFlightClass}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Economy">Economy</SelectItem>
                        <SelectItem value="Premium Economy">Premium Economy</SelectItem>
                        <SelectItem value="Business">Business</SelectItem>
                        <SelectItem value="First">First Class</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </PopoverContent>
            </Popover>

            {/* Search Button */}
            <Button onClick={handleSearch} className="lg:w-32" size="lg">
              <Search className="h-4 w-4 mr-2" />
              Search
            </Button>
          </div>
        </div>
      </div>

      {/* Date Availability Carousel */}
      <div className="bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setCurrentDateIndex(Math.max(0, currentDateIndex - 1))}
              disabled={!canScrollLeft}
              className="flex-shrink-0"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>

            <div className="flex gap-2 flex-1 overflow-hidden">
              {visibleDates.map((dateInfo, index) => (
                <button
                  key={index}
                  className={cn(
                    "flex-1 p-3 rounded-lg border transition-all text-center",
                    dateInfo.isCheapest
                      ? "bg-primary text-primary-foreground border-primary"
                      : dateInfo.available
                      ? "bg-background border-border hover:border-primary"
                      : "bg-muted border-border opacity-50 cursor-not-allowed"
                  )}
                  disabled={!dateInfo.available}
                >
                  <div className="text-xs font-medium mb-1">{dateInfo.date}</div>
                  {dateInfo.available ? (
                    <div className="text-sm font-bold">US${dateInfo.price}</div>
                  ) : (
                    <div className="text-xs">View</div>
                  )}
                </button>
              ))}
            </div>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => setCurrentDateIndex(currentDateIndex + 1)}
              disabled={!canScrollRight}
              className="flex-shrink-0"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Filters Sidebar */}
          <aside className="hidden lg:block w-80 flex-shrink-0">
            <div className="sticky top-60 space-y-4">
              {/* Price Range */}
              <Card>
                <CardContent className="p-4">
                  <Collapsible defaultOpen>
                    <CollapsibleTrigger className="flex items-center justify-between w-full mb-3">
                      <Label className="text-sm font-semibold cursor-pointer">Price Range</Label>
                      <ChevronDown className="h-4 w-4" />
                    </CollapsibleTrigger>
                    <CollapsibleContent className="space-y-4">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">min price</span>
                        <span className="text-muted-foreground">max price</span>
                      </div>
                      <Slider
                        value={priceRange}
                        onValueChange={setPriceRange}
                        max={500}
                        min={50}
                        step={10}
                        className="w-full"
                      />
                      <div className="flex justify-between text-sm font-medium">
                        <span>${priceRange[0]}</span>
                        <span>${priceRange[1]}</span>
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
                </CardContent>
              </Card>

              {/* Flight Schedules */}
              <Card>
                <CardContent className="p-4">
                  <Collapsible>
                    <CollapsibleTrigger className="flex items-center justify-between w-full">
                      <Label className="text-sm font-semibold cursor-pointer">Flight Schedules</Label>
                      <ChevronDown className="h-4 w-4" />
                    </CollapsibleTrigger>
                    <CollapsibleContent className="space-y-3 mt-3">
                      <div className="flex gap-1 border-b border-border">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="flex-1 h-8 text-xs text-primary border-b-2 border-primary rounded-none"
                        >
                          Departure
                        </Button>
                        <Button variant="ghost" size="sm" className="flex-1 h-8 text-xs text-muted-foreground">
                          Arrival
                        </Button>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground mb-2">Departure USA: Anytime</p>
                        <div className="grid grid-cols-2 gap-2">
                          {timeSlots.map((slot) => {
                            const Icon = slot.icon;
                            return (
                              <button
                                key={slot.value}
                                className={cn(
                                  "flex flex-col items-center gap-1 p-2 rounded-lg border transition-colors",
                                  departureTimeFilter.includes(slot.value)
                                    ? "bg-primary/10 border-primary"
                                    : "bg-background border-border hover:border-primary/50"
                                )}
                                onClick={() => {
                                  if (departureTimeFilter.includes(slot.value)) {
                                    setDepartureTimeFilter(departureTimeFilter.filter(t => t !== slot.value));
                                  } else {
                                    setDepartureTimeFilter([...departureTimeFilter, slot.value]);
                                  }
                                }}
                              >
                                <Icon className="h-4 w-4" />
                                <div className="text-center">
                                  <div className="text-xs font-medium">{slot.label}</div>
                                  <div className="text-[10px] text-muted-foreground">{slot.time}</div>
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
                </CardContent>
              </Card>

              {/* Recommended Filters */}
              <Card>
                <CardContent className="p-4">
                  <Label className="text-sm font-semibold mb-3 block">Recommended</Label>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="direct-filter" checked={directFlights} onCheckedChange={(c) => setDirectFlights(c as boolean)} />
                        <Label htmlFor="direct-filter" className="text-sm cursor-pointer">Direct</Label>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="baggage" checked={checkedBaggage} onCheckedChange={(c) => setCheckedBaggage(c as boolean)} />
                        <Label htmlFor="baggage" className="text-sm cursor-pointer">Checked baggage included</Label>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="no-bag-fees" checked={noBagFees} onCheckedChange={(c) => setNoBagFees(c as boolean)} />
                        <Label htmlFor="no-bag-fees" className="text-sm cursor-pointer">No bag fees</Label>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Alliance */}
              <Card>
                <CardContent className="p-4">
                  <Collapsible>
                    <CollapsibleTrigger className="flex items-center justify-between w-full mb-3">
                      <Label className="text-sm font-semibold cursor-pointer">Alliance</Label>
                      <ChevronDown className="h-4 w-4" />
                    </CollapsibleTrigger>
                    <CollapsibleContent className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Checkbox id="star-alliance" checked={starAlliance} onCheckedChange={(c) => setStarAlliance(c as boolean)} />
                          <Label htmlFor="star-alliance" className="text-sm cursor-pointer">Star Alliance</Label>
                        </div>
                        <span className="text-xs text-muted-foreground">US$289</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Checkbox id="oneworld" checked={oneworld} onCheckedChange={(c) => setOneworld(c as boolean)} />
                          <Label htmlFor="oneworld" className="text-sm cursor-pointer">Oneworld</Label>
                        </div>
                        <span className="text-xs text-muted-foreground">US$325</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="skyteam" checked={skyTeam} onCheckedChange={(c) => setSkyTeam(c as boolean)} />
                        <Label htmlFor="skyteam" className="text-sm cursor-pointer">SkyTeam</Label>
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
                </CardContent>
              </Card>

              {/* Airlines */}
              <Card>
                <CardContent className="p-4">
                  <Collapsible>
                    <CollapsibleTrigger className="flex items-center justify-between w-full mb-3">
                      <Label className="text-sm font-semibold cursor-pointer">Airlines</Label>
                      <ChevronDown className="h-4 w-4" />
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <Input placeholder="All airlines" className="mb-3" />
                      <div className="space-y-2 max-h-48 overflow-y-auto">
                        {mockAirlines.map((airline) => (
                          <div key={airline.code} className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <Checkbox
                                id={airline.code}
                                checked={selectedAirlines.includes(airline.name)}
                                onCheckedChange={(checked) => {
                                  if (checked) {
                                    setSelectedAirlines([...selectedAirlines, airline.name]);
                                  } else {
                                    setSelectedAirlines(selectedAirlines.filter(a => a !== airline.name));
                                  }
                                }}
                              />
                              <Label htmlFor={airline.code} className="text-sm cursor-pointer">
                                {airline.name} ({airline.count})
                              </Label>
                            </div>
                            {airline.price && (
                              <span className="text-xs text-muted-foreground">US${airline.price}</span>
                            )}
                          </div>
                        ))}
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
                </CardContent>
              </Card>

              {/* Times */}
              <Card>
                <CardContent className="p-4">
                  <Collapsible>
                    <CollapsibleTrigger className="flex items-center justify-between w-full mb-3">
                      <Label className="text-sm font-semibold cursor-pointer">Times</Label>
                      <ChevronDown className="h-4 w-4" />
                    </CollapsibleTrigger>
                    <CollapsibleContent className="space-y-4">
                      <div>
                        <div className="flex justify-between text-xs text-muted-foreground mb-2">
                          <span>Departure Time</span>
                          <span>00:00 - 24:00</span>
                        </div>
                        <Slider defaultValue={[0, 24]} max={24} min={0} step={1} className="w-full" />
                        <div className="flex justify-between text-xs text-muted-foreground mt-1">
                          <span>00:00</span>
                          <span>24:00</span>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-xs text-muted-foreground mb-2">
                          <span>Arrival Time</span>
                          <span>00:00 - 24:00</span>
                        </div>
                        <Slider defaultValue={[0, 24]} max={24} min={0} step={1} className="w-full" />
                        <div className="flex justify-between text-xs text-muted-foreground mt-1">
                          <span>00:00</span>
                          <span>24:00</span>
                        </div>
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
                </CardContent>
              </Card>

              {/* Duration */}
              <Card>
                <CardContent className="p-4">
                  <Collapsible>
                    <CollapsibleTrigger className="flex items-center justify-between w-full">
                      <Label className="text-sm font-semibold cursor-pointer">Duration</Label>
                      <ChevronDown className="h-4 w-4" />
                    </CollapsibleTrigger>
                  </Collapsible>
                </CardContent>
              </Card>

              {/* Stops */}
              <Card>
                <CardContent className="p-4">
                  <Collapsible>
                    <CollapsibleTrigger className="flex items-center justify-between w-full mb-3">
                      <Label className="text-sm font-semibold cursor-pointer">Stops</Label>
                      <ChevronDown className="h-4 w-4" />
                    </CollapsibleTrigger>
                    <CollapsibleContent className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="stop-0"
                            checked={selectedStops.includes(0)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setSelectedStops([...selectedStops, 0]);
                              } else {
                                setSelectedStops(selectedStops.filter(s => s !== 0));
                              }
                            }}
                          />
                          <Label htmlFor="stop-0" className="text-sm cursor-pointer">1 stop or fewer</Label>
                        </div>
                        <span className="text-xs text-muted-foreground">US$235</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="stop-2"
                            checked={selectedStops.includes(2)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setSelectedStops([...selectedStops, 2]);
                              } else {
                                setSelectedStops(selectedStops.filter(s => s !== 2));
                              }
                            }}
                          />
                          <Label htmlFor="stop-2" className="text-sm cursor-pointer">2 stops or fewer</Label>
                        </div>
                        <span className="text-xs text-muted-foreground">US$235</span>
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
                </CardContent>
              </Card>

              {/* Stopover Cities */}
              <Card>
                <CardContent className="p-4">
                  <Collapsible>
                    <CollapsibleTrigger className="flex items-center justify-between w-full">
                      <Label className="text-sm font-semibold cursor-pointer">Stopover Cities</Label>
                      <ChevronDown className="h-4 w-4" />
                    </CollapsibleTrigger>
                  </Collapsible>
                </CardContent>
              </Card>

              {/* Airports */}
              <Card>
                <CardContent className="p-4">
                  <Collapsible>
                    <CollapsibleTrigger className="flex items-center justify-between w-full">
                      <Label className="text-sm font-semibold cursor-pointer">Airports</Label>
                      <ChevronDown className="h-4 w-4" />
                    </CollapsibleTrigger>
                  </Collapsible>
                </CardContent>
              </Card>

              {/* Aircrafts */}
              <Card>
                <CardContent className="p-4">
                  <Collapsible>
                    <CollapsibleTrigger className="flex items-center justify-between w-full">
                      <Label className="text-sm font-semibold cursor-pointer">Aircrafts</Label>
                      <ChevronDown className="h-4 w-4" />
                    </CollapsibleTrigger>
                  </Collapsible>
                </CardContent>
              </Card>
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1 space-y-4">
            {/* Results Header with Cheapest/Fastest */}
            <div className="flex flex-col sm:flex-row items-start justify-between gap-4">
              <h2 className="text-xl font-bold">
                {sortedFlights.length} Available Flight{sortedFlights.length !== 1 ? 's' : ''}
              </h2>

              <div className="flex items-center gap-2">
                <div className="flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-lg border border-primary/20">
                  <TrendingDown className="h-4 w-4 text-primary" />
                  <div className="text-left">
                    <div className="text-xs text-muted-foreground">Cheapest</div>
                    <div className="text-sm font-bold">{cheapestFlight?.price ? `$${cheapestFlight.price}` : 'N/A'}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-green-50 dark:bg-green-950/30 rounded-lg border border-green-200 dark:border-green-900">
                  <Zap className="h-4 w-4 text-green-600 dark:text-green-400" />
                  <div className="text-left">
                    <div className="text-xs text-muted-foreground">Fastest</div>
                    <div className="text-sm font-bold">{fastestFlight?.duration || 'N/A'}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Flight Cards */}
            <div className="space-y-3">
              {sortedFlights.map((flight) => (
                <Card key={flight.id} className="overflow-hidden hover:shadow-lg transition-all">
                  <CardContent className="p-0">
                    <div className="flex flex-col lg:flex-row">
                      {/* Flight Info - Main Content */}
                      <div className="flex-1 p-4">
                        <div className="flex items-start gap-4">
                          {/* Airline Logo */}
                          <div className="flex flex-col items-center gap-1">
                            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center text-2xl">
                              {flight.logo}
                            </div>
                            <span className="text-xs text-muted-foreground">{flight.airlineCode}</span>
                          </div>

                          {/* Flight Details */}
                          <div className="flex-1 space-y-3">
                            <div>
                              <div className="flex items-center gap-2">
                                <h3 className="font-semibold">{flight.airline}</h3>
                                <span className="text-xs text-muted-foreground">• {flight.aircraft}</span>
                              </div>
                              <p className="text-xs text-muted-foreground">{flight.route}</p>
                            </div>

                            {/* Time and Route */}
                            <div className="flex items-center gap-4">
                              <div className="text-center">
                                <div className="text-xl font-bold">{flight.departure}</div>
                                <div className="text-xs text-muted-foreground">{flight.departureDate}</div>
                                <div className="text-xs font-medium">{flight.departureCode}</div>
                              </div>

                              <div className="flex-1 px-2">
                                <div className="text-xs text-center text-muted-foreground mb-1">{flight.duration}</div>
                                <div className="relative">
                                  <div className="absolute top-1/2 left-0 right-0 h-px bg-border"></div>
                                  <div className="relative flex justify-center">
                                    <Plane className="h-4 w-4 text-primary bg-background rotate-90" />
                                  </div>
                                </div>
                                <div className="text-xs text-center mt-1">
                                  <Badge variant={flight.stops === 0 ? "default" : "secondary"} className="text-xs">
                                    {flight.stopInfo}
                                  </Badge>
                                </div>
                              </div>

                              <div className="text-center">
                                <div className="text-xl font-bold">{flight.arrival}</div>
                                <div className="text-xs text-muted-foreground">{flight.departureDate}</div>
                                <div className="text-xs font-medium">{flight.arrivalCode}</div>
                              </div>
                            </div>

                            {/* Additional Info */}
                            <div className="text-xs text-muted-foreground">
                              {flight.departureAirport} → {flight.arrivalAirport}
                            </div>
                          </div>
                        </div>

                        {/* Expandable Details */}
                        <Collapsible
                          open={expandedFlight === flight.id}
                          onOpenChange={() => setExpandedFlight(expandedFlight === flight.id ? null : flight.id)}
                        >
                          <CollapsibleTrigger className="text-xs text-primary hover:underline mt-3">
                            {expandedFlight === flight.id ? 'Hide' : 'Show'} flight details
                          </CollapsibleTrigger>
                          <CollapsibleContent>
                            <div className="mt-4 pt-4 border-t border-border grid grid-cols-3 gap-4 text-sm">
                              <div>
                                <p className="text-xs text-muted-foreground mb-1">Aircraft</p>
                                <p className="font-medium">{flight.aircraft}</p>
                              </div>
                              <div>
                                <p className="text-xs text-muted-foreground mb-1">Baggage</p>
                                <p className="font-medium">{flight.baggageAllowance}</p>
                              </div>
                              <div>
                                <p className="text-xs text-muted-foreground mb-1">Class</p>
                                <p className="font-medium">{flight.flightClass}</p>
                              </div>
                            </div>
                          </CollapsibleContent>
                        </Collapsible>
                      </div>

                      {/* Price Box - Right Side */}
                      <div className="lg:w-48 bg-muted/30 p-4 flex flex-col items-center justify-center gap-3 border-t lg:border-t-0 lg:border-l border-border">
                        {flight.priceType && (
                          <Badge 
                            variant={flight.priceType === 'cheapest' ? 'default' : 'secondary'}
                            className="text-xs"
                          >
                            {flight.priceType === 'cheapest' ? 'Cheapest' : 'Fastest'}
                          </Badge>
                        )}
                        <div className="text-center">
                          <div className="text-xs text-muted-foreground mb-1">Ticket Price</div>
                          <div className="text-3xl font-bold text-primary">${flight.price}</div>
                          {flight.originalPrice && (
                            <div className="text-sm text-muted-foreground line-through">${flight.originalPrice}</div>
                          )}
                        </div>
                        <Button 
                          className="w-full bg-primary hover:bg-primary/90"
                          onClick={() => router.push(`/flight-selection?tripType=${tripType}&flightId=${flight.id}`)}
                        >
                          Select
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Filters Drawer */}
      <AnimatePresence>
        {showMobileFilters && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 lg:hidden"
            onClick={() => setShowMobileFilters(false)}
          >
            <div className="absolute inset-0 bg-black/50" />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="absolute left-0 top-0 bottom-0 w-full max-w-sm bg-card shadow-xl overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-semibold text-lg">Filters</h3>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setShowMobileFilters(false)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                {/* Add mobile filter content here */}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
