'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ChevronDown, Users, DollarSign, Plus, Sparkles, Search, Rocket, Minus, MapPin, Check, Calendar } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Input } from '@/components/ui/input';
import { DatePickerWithRange } from '@/components/ui/date-picker-with-range';
import { Separator } from '@/components/ui/separator';
import { Slider } from '@/components/ui/slider';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuLabel } from '@/components/ui/dropdown-menu';
import { useLanguage } from '@/contexts/LanguageContext';
import type { DateRange } from 'react-day-picker';
import { format, differenceInDays } from 'date-fns';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ItineraryData } from '@/app/trip-details/trips-types';
import { getSavedTrips, formatDate, type SavedTrip } from '@/lib/utils';
import axios from 'axios'
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
  <div className="flex items-center justify-between py-2">
    <div>
      <h5 className="font-medium text-foreground">{title}</h5>
      {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
    </div>
    <div className="flex items-center gap-4">
      <Button
        variant="outline"
        size="icon"
        className="h-8 w-8 rounded-full"
        onClick={onDecrement}
        disabled={count <= min}
      >
        <Minus className="h-4 w-4" />
      </Button>
      <span className="w-4 text-center font-semibold text-lg">{count}</span>
      <Button
        variant="outline"
        size="icon"
        className="h-8 w-8 rounded-full"
        onClick={onIncrement}
      >
        <Plus className="h-4 w-4" />
      </Button>
    </div>
  </div>
);

const budgetOptions = [
  { value: 'Minimalist', label: '$ Minimalist' },
  { value: 'Budget', label: '$$ Budget' },
  { value: 'Mid-range', label: '$$$ Mid-range' },
  { value: 'Luxury', label: '$$$$ Luxury' },
];
const budgetKeys = budgetOptions.map(opt => opt.value);

interface TripSubNavProps {
  title: string;
  itemCount: number;
  location: string;
  onLocationChange: (value: string) => void;
  dateRange: DateRange | undefined;
  onDateRangeChange: (value: DateRange | undefined) => void;
  adults: number;
  onAdultsChange: (value: number) => void;
  children: number;
  onChildrenChange: (value: number) => void;
  budget: string;
  onBudgetChange: (value: string) => void;
  tripDetails:ItineraryData
  setTripDetails: (value:ItineraryData) => void;
}

export function TripSubNav({ 
  title, 
  itemCount,
  location,
  onLocationChange,
  dateRange,
  onDateRangeChange,
  adults,
  onAdultsChange,
  children,
  onChildrenChange,
  budget,
  onBudgetChange,
  tripDetails,
  setTripDetails
}: TripSubNavProps) {
  const { getTranslation } = useLanguage();
  const router = useRouter();
  const [destination,setDestination]=useState("")
   const [fromDate, setFromDate] = useState<string | null>(null);
  const [toDate, setToDate] = useState<string | null>(null);
  const [dateRangeState, setDateRangeState] = useState<DateRange | undefined>(dateRange);
  const [savedTrips, setSavedTrips] = useState<SavedTrip[]>([]);
  const totalTravelers = adults + children;

  // Load saved trips
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const trips = getSavedTrips();
      setSavedTrips(trips);
    }
  }, []);

  // Handle clicking on a saved trip
  const handleSavedTripClick = (savedTrip: SavedTrip) => {
    // Store the itinerary data in localStorage for trip-details page
    localStorage.setItem('itineraryData', JSON.stringify(savedTrip.itineraryData));
    if (savedTrip.promptInput) {
      localStorage.setItem('promptInput', savedTrip.promptInput);
    }
    // Reload the page to show the new trip
    window.location.href = '/trip-details';
  };

  // Check if current trip is saved
  const currentTripId = React.useMemo(() => {
    if (!tripDetails) return null;
    const saved = savedTrips.length > 0 ? savedTrips : getSavedTrips();
    const found = saved.find(trip => {
      const tripData = trip.itineraryData;
      return tripData?.title === tripDetails.title &&
             tripData?.destination === tripDetails.destination &&
             tripData?.start_date === tripDetails.start_date &&
             tripData?.end_date === tripDetails.end_date;
    });
    return found?.id || null;
  }, [tripDetails, savedTrips]);
  let travelersDisplay = `${totalTravelers} traveler${totalTravelers !== 1 ? 's' : ''}`;

  let durationDisplay = "Select dates";
  if (dateRange?.from && dateRange.to) {
    const days = differenceInDays(dateRange.to, dateRange.from) + 1;
    durationDisplay = `${days} day${days !== 1 ? 's' : ''}`;
  } else if (dateRange?.from) {
    durationDisplay = format(dateRange.from, 'LLL dd, y');
  }

  const budgetIndex = Math.max(0, budgetKeys.indexOf(budget));
  const selectedBudgetLabel = budgetOptions[budgetIndex]?.label || 'Any budget';

  // Temp state for slider
  const [tempBudgetIndex, setTempBudgetIndex] = useState(budgetIndex);

  const handleSliderChange = async(newIndex: number) => {
   try {
    const budget = budgetKeys[newIndex];
    if(!destination){
      setDestination(tripDetails?.destination)
    }
    console.log(
      " budget : ",
      budget
    );

    const from = fromDate?fromDate:tripDetails?.start_date
    const to=toDate?toDate:tripDetails?.end_date
console.log("Destination",destination)
console.log("Travellers",adults+children)
console.log("From date : ",from," - ",toDate)

const promptInput=`Generate me an itinerary to ${destination} with a ${budget} type of budget for ${adults+children} travellers from ${from} to ${to}`
console.log("Prompt input :: ",promptInput)
    // // 👇 Stringify only currentResponse
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/generate/itinerary`,
      {
        promptInput
      })
    const data = response.data;
    console.log("Trip details response: ", data);
    localStorage.setItem("itineraryData", JSON.stringify(data));
    setTripDetails(data);
  } catch (err) {
    console.error("Error adjusting itinerary:", err);
  }
  };




    const handleDateChange = (newDate: DateRange | undefined) => {
  if (!newDate) {
    setDateRangeState(undefined);
    setFromDate(null);
    setToDate(null);
    onDateRangeChange(undefined);
    return;
  }

  setDateRangeState(newDate);
  onDateRangeChange(newDate);

  const from = newDate.from ? format(newDate.from, "yyyy-MM-dd") : null;
  const to = newDate.to ? format(newDate.to, "yyyy-MM-dd") : null;

  setFromDate(from);
  setToDate(to);
  console.log(from ,  " - ",to)
};

React.useEffect(() => {
  if (tripDetails) {
    setDestination(tripDetails.destination || "");
    setFromDate(tripDetails.start_date || null);
    setToDate(tripDetails.end_date || null);
    setTempBudgetIndex(
      Math.max(0, budgetKeys.indexOf(tripDetails.budget_type || ""))
    );
  }
}, [tripDetails]);

  

const shouldShowApply =
  (destination && destination !== tripDetails?.destination) ||
  tripDetails?.travellers !== adults + children ||
  budgetKeys[tempBudgetIndex] !== tripDetails?.budget_type ||
  fromDate!==tripDetails?.start_date ||
  toDate!==tripDetails?.end_date
  ;
  const handleSearch = () => {
    console.log("SubNav Search Clicked", {
      location,
      dateRange,
      adults,
      children,
      budget
    });
    alert('Search functionality to be implemented. Check console for values.');
  };

  return (
    <div className="sticky top-16 z-30 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm">
      {/* Main Nav Bar */}
      <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 h-12 sm:h-14 flex items-center justify-between relative gap-2">
        
        {/* Left Side: Trip Title with Saved Itineraries Dropdown */}
        <div className="flex-shrink-0 min-w-0">
          <DropdownMenu onOpenChange={(open) => {
            if (open && typeof window !== 'undefined') {
              // Refresh saved trips when dropdown opens
              const trips = getSavedTrips();
              setSavedTrips(trips);
            }
          }}>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="p-1 h-auto text-foreground hover:bg-muted">
                <span className="font-semibold text-xs sm:text-sm truncate max-w-[100px] min-[375px]:max-w-[120px] sm:max-w-xs md:max-w-sm" title={title}>
                  {title}
                </span>
                <ChevronDown className="h-3 w-3 sm:h-4 sm:w-4 ml-1 sm:ml-2 flex-shrink-0" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-80 max-h-[400px] overflow-y-auto">
              <DropdownMenuLabel className="text-xs font-semibold text-muted-foreground uppercase">
                Saved Itineraries ({savedTrips.length})
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              {savedTrips.length > 0 ? (
                savedTrips.map((trip) => {
                  const isCurrentTrip = trip.id === currentTripId;
                  const startDate = formatDate(trip.startDate);
                  const endDate = formatDate(trip.endDate);
                  const dateRange = `${startDate.slice(0, -5)} - ${endDate.slice(0, -5)}`;
                  
                  return (
                    <DropdownMenuItem
                      key={trip.id}
                      onClick={() => handleSavedTripClick(trip)}
                      className={cn(
                        "flex flex-col items-start gap-1 p-3 cursor-pointer",
                        isCurrentTrip && "bg-primary/10 text-primary"
                      )}
                    >
                      <div className="flex items-center justify-between w-full">
                        <div className="flex items-center gap-2 flex-1 min-w-0">
                          <MapPin className="h-4 w-4 flex-shrink-0 text-muted-foreground" />
                          <span className={cn(
                            "font-semibold text-sm truncate",
                            isCurrentTrip && "text-primary"
                          )}>
                            {trip.title}
                          </span>
                        </div>
                        {isCurrentTrip && (
                          <Check className="h-4 w-4 text-primary flex-shrink-0" />
                        )}
                      </div>
                      <div className="text-xs text-muted-foreground ml-6">
                        {trip.destination} • {dateRange}
                      </div>
                    </DropdownMenuItem>
                  );
                })
              ) : (
                <DropdownMenuItem disabled className="text-sm text-muted-foreground">
                  No saved itineraries yet
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        
        {/* Center: Trip Parameters */}
        <div className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="flex items-center border rounded-full text-sm font-medium shadow-inner bg-muted/30 h-9 sm:h-10">
              
              {/* Location Popover */}
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="ghost" className="px-2 sm:px-3 py-1.5 h-full rounded-l-full hover:bg-muted-foreground/10 text-xs sm:text-sm truncate max-w-[100px] sm:max-w-none">{location}</Button>
                </PopoverTrigger>
                <PopoverContent className="w-80 mt-2">
                   <Input
                    placeholder="Search destinations"
                    value={destination}
                    onChange={(e) => {
                    setDestination(e.target.value)
                    }}
                  />
                </PopoverContent>
              </Popover>

              <div className="h-4 border-l border-border" />

              {/* Dates Popover */}
              {/* <Popover>
                 <PopoverTrigger asChild>
                  <Button variant="ghost" className="px-3 py-1.5 h-full rounded-none hover:bg-muted-foreground/10 text-xs sm:text-sm truncate">{durationDisplay}</Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 mt-2">
                  <DatePickerWithRange date={dateRange} onSelectDate={onDateRangeChange} />
                </PopoverContent>
              </Popover> */}
 <Popover>
    <PopoverTrigger asChild>
      <Button variant="ghost" className="px-2 sm:px-3 py-1.5 h-full rounded-none hover:bg-muted-foreground/10 text-xs sm:text-sm truncate">
        {durationDisplay}
      </Button>
    </PopoverTrigger>
    <PopoverContent className="w-auto p-0 mt-2">
      <DatePickerWithRange
        date={dateRangeState}
        onSelectDate={handleDateChange}
      />
    </PopoverContent>
  </Popover>
              <div className="h-4 border-l border-border" />

              {/* Travelers Popover */}
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="ghost" className="px-2 sm:px-3 py-1.5 h-full rounded-none hover:bg-muted-foreground/10 text-xs sm:text-sm truncate">{travelersDisplay}</Button>
                </PopoverTrigger>
                 <PopoverContent className="w-80 mt-2 p-4 rounded-xl">
                    <CounterRow 
                        title="Adults"
                        subtitle="Ages 13 or above"
                        count={adults}
                        onDecrement={() => onAdultsChange(Math.max(1, adults - 1))}
                        onIncrement={() => onAdultsChange(adults + 1)}
                        min={1}
                    />
                    <Separator className="my-2"/>
                    <CounterRow 
                        title="Children"
                        subtitle="Ages 2–12"
                        count={children}
                        onDecrement={() => onChildrenChange(Math.max(0, children - 1))}
                        onIncrement={() => onChildrenChange(children + 1)}
                        
                    />
                </PopoverContent>
              </Popover>
               
              <div className="h-4 border-l border-border" />
              
              {/* Budget Popover */}
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="ghost" className="px-2 sm:px-3 py-1.5 h-full rounded-r-full text-muted-foreground hover:bg-muted-foreground/10 text-xs sm:text-sm truncate max-w-[80px] sm:max-w-none">{tripDetails?.budget_type}</Button>
                </PopoverTrigger>
                 <PopoverContent className="w-80 mt-2 p-4 rounded-xl">
                    <h4 className="font-medium text-center text-lg mb-1">Budget</h4>
                    <p className="text-sm text-muted-foreground text-center mb-4">
                        {budgetOptions[tempBudgetIndex]?.label}
                    </p>
                    <Slider
                        value={[tempBudgetIndex]}
                        onValueChange={(value) => {
                          setTempBudgetIndex(value[0])
                  
                        }}
                        max={budgetKeys.length - 1}
                        step={1}
                        className="my-6"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground px-1">
                        {budgetOptions.map(opt => <span key={opt.value}>{opt.label.split(' ')[0]}</span>)}
                    </div>
                    <div className="flex justify-center mt-4">
                       
                    </div>
                </PopoverContent>
              </Popover>

            </div>
           {shouldShowApply && (
  <Button
    variant="default"
    className="rounded-lg ml-2 h-8 sm:h-9 text-xs sm:text-sm px-2 sm:px-3"
    onClick={() => handleSliderChange(tempBudgetIndex)}
  >
    Apply
  </Button>
)}
        </div>

        {/* Right Side: Actions */}
        <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
            <Button asChild variant="outline" className="h-8 sm:h-9 text-xs sm:text-sm px-2 sm:px-3">
              <Link href={`/appscout?destination=${encodeURIComponent(location)}`}>
                <Rocket className="h-3.5 w-3.5 sm:h-4 sm:w-4 sm:mr-2" />
                <span className="hidden sm:inline">AppScout</span>
              </Link>
            </Button>
            <Button
              variant="default"
              className="h-8 sm:h-9 relative bg-primary hover:bg-primary/90 rounded-md shadow-lg shadow-primary/20 text-xs sm:text-sm px-2 sm:px-3"
              asChild
            >
              <Link href="/trip-sync">
                <Sparkles className="h-3.5 w-3.5 sm:h-4 sm:w-4 sm:mr-2" />
                <span className="hidden sm:inline">TripSync</span>
              </Link>
            </Button>
             <Button
              variant="default"
              className="h-8 sm:h-9 relative bg-[#054b68] hover:bg-[#065a7f] text-white rounded-md shadow-lg shadow-[#054b68]/20 text-xs sm:text-sm px-2 sm:px-3"
              asChild
            >
              <Link href="/autobudgeter">
                <DollarSign className="h-3.5 w-3.5 sm:h-4 sm:w-4 sm:mr-2" />
                <span className="hidden sm:inline">AutoBudgeter</span>
              </Link>
            </Button>
        </div>
      </div>
      
      {/* Mobile Trip Parameters Row */}
      <div className="lg:hidden border-t border-border bg-muted/30">
        <div className="container mx-auto px-3 sm:px-4 py-2">
          <div className="flex items-center justify-between gap-2 flex-wrap">
            {/* Location */}
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost" className="h-7 px-2 text-xs hover:bg-muted-foreground/10">
                  <MapPin className="h-3 w-3 mr-1" />
                  <span className="truncate max-w-[80px]">{location}</span>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80 mt-2">
                <Input
                  placeholder="Search destinations"
                  value={destination}
                  onChange={(e) => {
                    setDestination(e.target.value)
                  }}
                />
              </PopoverContent>
            </Popover>

            <div className="h-3 border-l border-border" />

            {/* Dates */}
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost" className="h-7 px-2 text-xs hover:bg-muted-foreground/10">
                  <Calendar className="h-3 w-3 mr-1" />
                  <span className="truncate max-w-[70px]">{durationDisplay}</span>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 mt-2">
                <DatePickerWithRange
                  date={dateRangeState}
                  onSelectDate={handleDateChange}
                />
              </PopoverContent>
            </Popover>

            <div className="h-3 border-l border-border" />

            {/* Travelers */}
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost" className="h-7 px-2 text-xs hover:bg-muted-foreground/10">
                  <Users className="h-3 w-3 mr-1" />
                  <span className="truncate">{travelersDisplay}</span>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80 mt-2 p-4 rounded-xl">
                <CounterRow 
                  title="Adults"
                  subtitle="Ages 13 or above"
                  count={adults}
                  onDecrement={() => onAdultsChange(Math.max(1, adults - 1))}
                  onIncrement={() => onAdultsChange(adults + 1)}
                  min={1}
                />
                <Separator className="my-2"/>
                <CounterRow 
                  title="Children"
                  subtitle="Ages 2–12"
                  count={children}
                  onDecrement={() => onChildrenChange(Math.max(0, children - 1))}
                  onIncrement={() => onChildrenChange(children + 1)}
                />
              </PopoverContent>
            </Popover>

            <div className="h-3 border-l border-border" />

            {/* Budget */}
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost" className="h-7 px-2 text-xs hover:bg-muted-foreground/10">
                  <DollarSign className="h-3 w-3 mr-1" />
                  <span className="truncate max-w-[60px]">{tripDetails?.budget_type}</span>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80 mt-2 p-4 rounded-xl">
                <h4 className="font-medium text-center text-lg mb-1">Budget</h4>
                <p className="text-sm text-muted-foreground text-center mb-4">
                  {budgetOptions[tempBudgetIndex]?.label}
                </p>
                <Slider
                  value={[tempBudgetIndex]}
                  onValueChange={(value) => {
                    setTempBudgetIndex(value[0])
                  }}
                  max={budgetKeys.length - 1}
                  step={1}
                  className="my-6"
                />
                <div className="flex justify-between text-xs text-muted-foreground px-1">
                  {budgetOptions.map(opt => <span key={opt.value}>{opt.label.split(' ')[0]}</span>)}
                </div>
              </PopoverContent>
            </Popover>

            {/* Apply Button (if needed) */}
            {shouldShowApply && (
              <Button
                variant="default"
                className="h-7 text-xs px-2 ml-auto"
                onClick={() => handleSliderChange(tempBudgetIndex)}
              >
                Apply
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
