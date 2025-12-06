
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Mic, SendHorizontal, Wand2, Lightbulb, CalendarDays, Info, Utensils, Bed, Star, Heart, Plus, Minus, Circle, CircleCheckBig } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from "@/lib/utils";
import Loader from './Loader';
import Image from "next/image"
import hero from "../../assets/hero.png"
import { ArrowRightLeft, BedDouble, Bot, ChevronDown, Hotel,  NotebookText, Plane, Search, SlidersHorizontal, Sparkles, Users, UtensilsCrossed, WandSparkles } from "lucide-react"
import { Input } from '../ui/input';
import { format } from 'date-fns';
import { useRouter } from 'next/navigation';
import type { DateRange } from 'react-day-picker';


interface HeroSectionProps {
  tripQuery: string;
  onTripQueryChange: (query: string) => void;
  onTripQuerySubmit: () => void;
  sendBtnLoader:boolean
}

type Category = 'stays' | 'restaurants' | 'activities' | 'flights' | 'journi';


const categories: { id: Category; label: string; icon: React.ElementType }[] = [
  { id: 'flights', label: 'Flights', icon: Plane },
  { id: 'stays', label: 'Stays', icon: Bed },
  {id: 'journi', label: 'Journi', icon: NotebookText},
  { id: 'restaurants', label: 'Restaurants', icon: Utensils },
  { id: 'activities', label: 'Activities', icon: Sparkles }
];



const mockData = {
  stays: [
    { id: 1, title: 'Boutique Hotel in Paris', rating: 4.8, price: '$250/night', image: 'https://images.unsplash.com/photo-1549294413-26f195200c16?q=80&w=600&h=600&fit=crop', hint: 'hotel room modern' },
    { id: 2, title: 'Beachfront Villa in Bali', rating: 4.9, price: '$400/night', image: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?q=80&w=600&h=600&fit=crop', hint: 'villa pool ocean' },
    { id: 3, title: 'Cozy Cabin in the Alps', rating: 4.7, price: '$180/night', image: 'https://images.unsplash.com/photo-1551524164-687a55dd1126?q=80&w=600&h=600&fit=crop', hint: 'cabin mountains snow' },
    { id: 4, title: 'Luxury Apartment in Tokyo', rating: 4.9, price: '$350/night', image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=600&h=600&fit=crop', hint: 'apartment tokyo view' },
  ],
  flights: [
    // This data is now handled by FlightDealsCard for non-flight tabs and a new component for the flights tab
  ],
  restaurants: [
    { id: 1, title: 'Le Jardin Secret', rating: 4.8, price: '$$$', location: 'Paris, France', image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=600&h=600&fit=crop', hint: 'fine dining restaurant' },
    { id: 2, title: 'Sushi Master Tokyo', rating: 4.9, price: '$$$$', location: 'Tokyo, Japan', image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?q=80&w=600&h=600&fit=crop', hint: 'sushi restaurant japan' },
    { id: 3, title: 'Trattoria Bella Vista', rating: 4.7, price: '$$', location: 'Rome, Italy', image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=600&h=600&fit=crop', hint: 'italian restaurant' },
    { id: 4, title: 'Spice Route', rating: 4.6, price: '$$', location: 'Mumbai, India', image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=600&h=600&fit=crop', hint: 'indian restaurant' },
  ],
  activities: [
    { id: 1, title: 'Sunset Desert Safari', rating: 4.8, price: '₹4,500', location: 'Dubai', image: 'https://images.unsplash.com/photo-1451337516015-6b6e9a44a8a3?q=80&w=600&h=600&fit=crop', hint: 'desert safari adventure' },
    { id: 2, title: 'Paris Food Walking Tour', rating: 4.9, price: '₹7,200', location: 'Paris', image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=600&h=600&fit=crop', hint: 'food tour paris' },
    { id: 3, title: 'Scuba Diving Experience', rating: 4.7, price: '₹12,500', location: 'Great Barrier Reef', image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=600&h=600&fit=crop', hint: 'scuba diving coral reef' },
    { id: 4, title: 'Vatican Museums Tour', rating: 4.8, price: '₹6,800', location: 'Rome', image: 'https://images.unsplash.com/photo-1531572753322-ad063cecc140?q=80&w=600&h=600&fit=crop', hint: 'vatican museums rome' },
  ],
};

const ContentCard = ({ item }: { item: any }) => (
    <div className="group relative overflow-hidden rounded-xl sm:rounded-2xl shadow-md transition-all duration-300 hover:shadow-xl  h-[450px]">
        <Image src={item.image} alt={item.title} width={600} height={600} className="aspect-square w-full object-cover transition-transform duration-300 group-hover:scale-105" data-ai-hint={item.hint}/>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
        <div className="absolute top-1.5 right-1.5 sm:top-2 sm:right-2 flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button size="icon" variant="secondary" className="h-7 w-7 sm:h-8 sm:w-8 rounded-full bg-white/20 text-white backdrop-blur-sm hover:bg-white/30"><Heart className="h-3.5 w-3.5 sm:h-4 sm:w-4" /></Button>
            <Button size="icon" variant="secondary" className="h-7 w-7 sm:h-8 sm:w-8 rounded-full bg-white/20 text-white backdrop-blur-sm hover:bg-white/30"><Plus className="h-3.5 w-3.5 sm:h-4 sm:w-4" /></Button>
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-3 md:p-4 text-white">
            <h4 className="font-semibold text-sm sm:text-base line-clamp-1">{item.title}</h4>
            <div className="flex items-center text-xs sm:text-sm mt-0.5 sm:mt-1">
                <Star className="h-3 w-3 sm:h-4 sm:w-4 mr-0.5 sm:mr-1 text-yellow-400 fill-yellow-400" />
                <span>{item.rating}</span>
                <span className="mx-1 sm:mx-2">•</span>
                <span className="truncate">{item.price}</span>
            </div>
        </div>
    </div>
);




function JourniFormSection({
  tripQuery,
  onTripQueryChange,
  onTripQuerySubmit,
  sendBtnLoader,
  handleSuggestionClick,
  getTranslation
}: {
  tripQuery: string;
  onTripQueryChange: (val: string) => void;
  onTripQuerySubmit: () => void;
  sendBtnLoader: boolean;
  handleSuggestionClick: (key: string, fallback: string) => void;
  getTranslation: (key: string, fallback: string) => string;
}) {
  
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onTripQuerySubmit();
  };

  return (
    <div className="flex flex-col justify-center items-center gap-5 pt-10 w-full h-full p-6">
      
      {/* Input Field */}
      <div className="w-full max-w-[700px] px-6 py-4 rounded-full bg-card/80 dark:bg-card/90 backdrop-blur-sm border border-border/50 dark:border-border/60 shadow-sm dark:shadow-md">
        <form
          className="flex flex-row justify-between items-center h-[26px] gap-3"
          onSubmit={handleFormSubmit}
        >
          <Input
            placeholder={getTranslation(
              "heroCtaPlaceholder",
              "Create a 7-day Paris itinerary for a birthday getaway"
            )}
            className="flex-1 focus-visible:ring-0 focus-visible:ring-offset-0 outline-none bg-transparent border-none text-foreground placeholder:text-muted-foreground text-base sm:text-lg"
            value={tripQuery}
            onChange={(e) => onTripQueryChange(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleFormSubmit(e);
              }
            }}
          />

          <div className="flex flex-row gap-2 justify-center items-center">
            <Button
              variant="ghost"
              size="icon"
              className="text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-full w-10 h-10 sm:w-11 sm:h-11 transition-colors"
              type="button"
              onClick={() => console.log("Mic clicked in Hero")}
            >
              <Mic className="h-5 w-5" />
            </Button>

            <Button
              type="submit"
              variant="default"
              size="icon"
              className="bg-primary hover:bg-primary/90 rounded-full text-primary-foreground w-10 h-10 sm:w-11 sm:h-11 shadow-md hover:shadow-lg transition-all"
            >
              {!sendBtnLoader ? <SendHorizontal className="h-5 w-5" /> : <Loader />}
            </Button>
          </div>
        </form>
      </div>

      {/* Suggestions */}
      <div className="flex flex-row justify-center items-center gap-3 w-full flex-wrap">
        <Button
          variant="ghost"
          onClick={() => handleSuggestionClick("heroSuggestionNewTrip", "Create a new trip")}
          className="flex flex-row justify-center items-center gap-2 px-4 py-2.5 rounded-full bg-muted/60 dark:bg-muted/40 hover:bg-muted/80 dark:hover:bg-muted/60 text-foreground/90 dark:text-foreground/80 text-sm font-medium transition-all border border-border/30 dark:border-border/40"
        >
          <WandSparkles className="w-4 h-4" />
          <span className="hidden min-[375px]:inline">
            {getTranslation("heroSuggestionNewTrip", "Create a new trip")}
          </span>
          <span className="min-[375px]:hidden">New trip</span>
        </Button>

        <Button
          variant="ghost"
          onClick={() => handleSuggestionClick("heroSuggestionInspire", "Inspire me where to go")}
          className="flex flex-row justify-center items-center gap-2 px-4 py-2.5 rounded-full bg-muted/60 dark:bg-muted/40 hover:bg-muted/80 dark:hover:bg-muted/60 text-foreground/90 dark:text-foreground/80 text-sm font-medium transition-all border border-border/30 dark:border-border/40"
        >
          <Lightbulb className="h-4 w-4" />
          <span className="hidden min-[375px]:inline">
            {getTranslation("heroSuggestionInspire", "Inspire me where to go")}
          </span>
          <span className="min-[375px]:hidden">Inspire</span>
        </Button>

        <Button
          variant="ghost"
          onClick={() => handleSuggestionClick("heroSuggestionWeekend", "Weekend getaways")}
          className="flex flex-row justify-center items-center gap-2 px-4 py-2.5 rounded-full bg-muted/60 dark:bg-muted/40 hover:bg-muted/80 dark:hover:bg-muted/60 text-foreground/90 dark:text-foreground/80 text-sm font-medium transition-all border border-border/30 dark:border-border/40"
        >
          <CalendarDays className="h-4 w-4" />
          <span className="hidden min-[375px]:inline">
            {getTranslation("heroSuggestionWeekend", "Weekend getaways")}
          </span>
          <span className="min-[375px]:hidden">Weekend</span>
        </Button>

        <Link href="/how-it-works">
          <Button
            variant="ghost"
            className="flex flex-row justify-center items-center gap-2 px-4 py-2.5 rounded-full bg-muted/60 dark:bg-muted/40 hover:bg-muted/80 dark:hover:bg-muted/60 text-foreground/90 dark:text-foreground/80 text-sm font-medium transition-all border border-border/30 dark:border-border/40"
          >
            <Info className="h-4 w-4" />
            {getTranslation("heroSuggestionHowItWorks", "How it works")}
          </Button>
        </Link>
      </div>
    </div>
  );
}



function FlightFormSelector(){

  const router = useRouter();
      const [tripType, setTripType] = useState('Round Trip');
      const [fromLocation, setFromLocation] = useState('');
      const [toLocation, setToLocation] = useState('');
      const [flightDates, setFlightDates] = useState<DateRange | undefined>(undefined);
      
      // State for passenger popover
      const [adults, setAdults] = useState(1);
      const [children, setChildren] = useState(0);
      const [infants, setInfants] = useState(0);
  
      const [cabinClass, setCabinClass] = useState('Economy');
      
      // State for All Filters popover
      const [includeAirlines, setIncludeAirlines] = useState(false);
      const [selectedAirlines, setSelectedAirlines] = useState<string>('any');
      const [includeLayoverAirports, setIncludeLayoverAirports] = useState(false);
      const [layoverAirports, setLayoverAirports] = useState('');
      
      // State for Stops filter
      const [stops, setStops] = useState({ nonStop: true, oneStop: true, twoPlusStops: true });
      // State for Price filter
      const [priceRange, setPriceRange] = useState([500]);
      // State for Times filter
      const [departureTime, setDepartureTime] = useState([0, 24]);
      const [arrivalTime, setArrivalTime] = useState([0, 24]);
      // State for Duration filter
      const [duration, setDuration] = useState([40]);
      
      const passengerCount = adults + children + infants;
      const passengerLabel = `${passengerCount} traveler${passengerCount > 1 ? 's' : ''}`;
      
      const handleLocationSwap = () => {
          const temp = fromLocation;
          setFromLocation(toLocation);
          setToLocation(temp);
      };

      const [trip , setTrip] = useState('round')
      const [direct, setDirect] = useState(true)


      const toggleDirect = () => {
          direct ? setDirect(false) : setDirect(true)
      }
  
      const handleFlightSearch = () => {
          // Build query parameters
          const params = new URLSearchParams();
          if (fromLocation) params.append('from', fromLocation);
          if (toLocation) params.append('to', toLocation);
          if (flightDates?.from) params.append('depart', format(flightDates.from, 'PPP'));
          if (flightDates?.to) params.append('return', format(flightDates.to, 'PPP'));
          params.append('passengers', String(adults + children + infants));
          params.append('class', cabinClass);
          params.append('type', tripType === 'Round Trip' ? 'round-trip' : 'one-way');
          
          // Navigate to flight search results page
          router.push(`/flights?${params.toString()}`);
      };

  return(
    <div className="flex flex-col justify-center items-center gap-5 pt-8  w-full h-full p-6 ">
       <div className="flex flex-row justify-between items-center w-full gap-4 flex-wrap"> 
                        <div className="flex flex-row justify-between items-center gap-2 rounded-full p-1 bg-muted/60 dark:bg-muted/40 border border-border/30 dark:border-border/40">
                        <div onClick={() => {setTrip('round')}} className={cn(trip === 'round' ? "bg-primary ":"text-foreground/70 hover:text-foreground " , "px-4 py-2 rounded-full text-sm font-medium   cursor-pointer")}>Round Trip</div>
                        <div onClick={() => {setTrip('one')}} className={cn(trip === 'one' ? "bg-primary ":"text-foreground/70 hover:text-foreground " , "px-4 py-2 rounded-full text-sm font-medium cursor-pointer")}>One Way</div>
                        <div onClick={() => {setTrip('multi')}} className={cn(trip === 'multi'  ? "bg-primary ":"text-foreground/70 hover:text-foreground " , "px-4 py-2 rounded-full text-sm font-medium  cursor-pointer")}>Multi-city</div>
                        </div>
                        <div className="flex flex-row gap-2 py-1.5 flex-wrap">
                            <Button onClick={toggleDirect} className={cn( direct ? "bg-primary" :"bg-muted/60 dark:bg-muted/40 text-foreground/80" , "flex flex-row justify-center items-center gap-2 px-3 rounded-full  border border-border/30 dark:border-border/40 text-sm ")}> {direct === true ? <CircleCheckBig className="w-3.5 h-3.5"/> : <Circle className="w-3.5 h-3.5"/> }  Direct </Button>
                            <div className="flex flex-row justify-center items-center gap-2 px-3 py-2 rounded-full bg-muted/60 dark:bg-muted/40 border border-border/30 dark:border-border/40 text-sm text-foreground/80 cursor-pointer hover:bg-muted/80 dark:hover:bg-muted/60 transition-colors">Special Fare <ChevronDown className="w-4 h-4"/></div>
                            <div className="flex flex-row justify-center items-center gap-2 px-3 py-2 rounded-full bg-muted/60 dark:bg-muted/40 border border-border/30 dark:border-border/40 text-sm text-foreground/80 cursor-pointer hover:bg-muted/80 dark:hover:bg-muted/60 transition-colors">Economy <ChevronDown className="w-4 h-4"/></div>
                        </div>
                    </div>
                    <div className="flex flex-row gap-4 w-full flex-wrap">
                        <div className="flex flex-row justify-center items-center gap-3 flex-1 min-w-[280px]">
                        <div className="flex flex-row justify-center items-center flex-1 min-w-[200px] h-[72px] rounded-2xl bg-card/80 dark:bg-card/90 border border-border/50 dark:border-border/60 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                            <div className="text-2xl font-semibold px-3 text-foreground">INS</div>
                            <div className="flex flex-col justify-center items-start px-1 border-l border-border/50 dark:border-border/60">
                                <div className="text-sm font-medium text-foreground">India</div>
                                <div className="text-[10px] text-muted-foreground">Indira Gandhi International</div> </div>
                        </div>
                        <div className="p-2 rounded-full bg-primary/10 dark:bg-primary/20"><ArrowRightLeft className="w-5 h-5 text-primary"/></div>
                      <div className="flex flex-row justify-center items-center flex-1 min-w-[200px] h-[72px] rounded-2xl bg-card/80 dark:bg-card/90 border border-border/50 dark:border-border/60 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                            <div className="text-2xl font-semibold px-3 text-foreground">LHR</div>
                            <div className="flex flex-col justify-center items-start px-1 border-l border-border/50 dark:border-border/60">
                                <div className="text-sm font-medium text-foreground">London</div>
                                <div className="text-[10px] text-muted-foreground">United Kingdom London</div> </div>
                        </div>
                    
                        <div className="flex flex-row justify-center items-center min-w-[280px] h-[72px] rounded-2xl bg-card/80 dark:bg-card/90 border border-border/50 dark:border-border/60 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                            <div className="text-2xl font-semibold px-3 text-foreground">11</div>
                            <div className="flex flex-col justify-center items-start px-3 border-l border-border/50 dark:border-border/60">
                                <div className="text-sm font-medium text-foreground">August</div>
                                <div className="w-[50px] text-[10px] text-muted-foreground">Monday, 25</div> </div>
                                <div className="px-2 text-muted-foreground"><Minus className="w-4 h-4"/></div>
                            <div className="text-2xl font-semibold px-3 text-foreground">15</div>
                            <div className="flex flex-col justify-center items-start px-3 border-l border-border/50 dark:border-border/60">
                                <div className="text-sm font-medium text-foreground">August</div>
                                <div className="w-[50px] text-[10px] text-muted-foreground">Friday, 25</div> </div>
                        </div>
                        <div className="flex flex-row justify-center items-center min-w-[180px] h-[72px] rounded-2xl bg-card/80 dark:bg-card/90 border border-border/50 dark:border-border/60 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                            <div className="text-2xl font-semibold px-3 text-foreground">2</div>
                            <div className="flex flex-col justify-center items-start px-3 border-l border-border/50 dark:border-border/60">
                                <div className="text-sm font-medium text-foreground">Travellers</div>
                                <div className="text-xs text-muted-foreground">1 Adult 1 Child</div> </div>
                        </div>

                            <Button className="h-[72px] w-[72px] p-8 rounded-2xl bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all">
                            <Search className="w-12 h-12"/>  
                            </Button>
                        </div>
                    </div>


    </div>

  )
}




function BookingFormSelector(){

  return(
    <div className="flex flex-col justify-center items-center pt-10 gap-4 w-full h-full p-4">
       <div className="flex flex-row justify-center items-center gap-4 w-full flex-wrap">

                        <div className="flex flex-col justify-center items-start p-5 flex-1 min-w-[180px] h-[100px] rounded-2xl bg-card/80 dark:bg-card/90 border border-border/50 dark:border-border/60 shadow-sm hover:shadow-md transition-all cursor-pointer">
                            <div className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1">Location/City</div>
                            <div className="text-2xl font-semibold pt-1 text-foreground">New Delhi</div>
                            <div className="text-xs text-muted-foreground mt-0.5">India</div>
                        </div>
                          <div className="flex flex-col justify-center items-start p-5 flex-1 min-w-[170px] h-[100px] rounded-2xl bg-card/80 dark:bg-card/90 border border-border/50 dark:border-border/60 shadow-sm hover:shadow-md transition-all cursor-pointer">
                            <div className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1">Date</div>
                            <div className="flex flex-row justify-center items-end gap-2 pt-1"><div className="text-3xl font-semibold text-foreground">3</div><span className="text-xl font-medium text-foreground pb-1">Dec'25</span></div>
                            <div className="text-xs text-muted-foreground mt-0.5">Friday</div>
                        </div>


                          <div className="flex flex-col justify-center items-start p-5 flex-1 min-w-[150px] h-[100px] rounded-2xl bg-card/80 dark:bg-card/90 border border-border/50 dark:border-border/60 shadow-sm hover:shadow-md transition-all cursor-pointer">
                            <div className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1">Guests</div>
                            <div className="flex flex-row justify-center items-end gap-2 pt-1"><div className="text-3xl font-semibold text-foreground">1</div><span className="text-xl font-medium text-foreground pb-1">Guest</span></div>
                            <div className="text-xs text-muted-foreground mt-0.5">1 Adult 0 Child</div>
                        </div>
                             <div className="flex flex-col justify-center items-start p-5 flex-1 min-w-[200px] h-[100px] rounded-2xl bg-card/80 dark:bg-card/90 border border-border/50 dark:border-border/60 shadow-sm hover:shadow-md transition-all cursor-pointer">
                            <div className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1">Budget</div>
                            <div className="flex flex-row justify-center items-end gap-2 pt-1"><span className="text-2xl font-semibold text-foreground">$0-$1500</span></div>
                            <div className="text-xs text-muted-foreground mt-0.5">excluding taxes</div>

                        </div>
                        <Button className="w-[100px] h-[100px] p-0 rounded-2xl bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all">
                            <Search className="w-6 h-6"/>   
                          </Button>
                    </div>

    </div>
  )
}






export function HeroSection({
  tripQuery,
  onTripQueryChange,
  onTripQuerySubmit,
  sendBtnLoader
}: HeroSectionProps) {
  const { getTranslation } = useLanguage();
  const handleSuggestionClick = (suggestionTextKey: string, fallbackText: string) => {
    const translatedSuggestion = getTranslation(suggestionTextKey, fallbackText);
    onTripQueryChange(translatedSuggestion);
  };  

  const [activeCategory, setActiveCategory] = useState<Category>('flights');
  const tabContent = activeCategory === 'journi' ? [] : (mockData[activeCategory] || []);


  return (
    <section className="relative h-full  min-h-[600px] md:min-h-screen w-full flex flex-col items-center justify-start  text-center text-white overflow-hidden">
       <div className="flex flex-col justify-start items-center w-screen h-full ">
                <Image src={hero} alt="hero" width={1000} className="w-screen h-[65vh] object-cover rounded-b-2xl "/>
                <div className="absolute inset-0 bg-black/60 h-[65vh] rounded-b-2xl"></div>  
                <div className="absolute top-[150px] text-4xl px-8 text-zinc-300 text-center font-mono">
                    <h1 className="font-headline text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-4 animate-fade-up" style={{ animationDelay: '0.2s', textShadow: '0 2px 8px rgba(0,0,0,0.7)' }}>
                      {getTranslation('heroHeadlinePart1', "Hey, I'm ")}
                      <span className="text-primary">Journi</span>
                      {getTranslation('heroHeadlinePart2', ", your personal trip planner")}
                    </h1>
                    <p className="text-base sm:text-lg md:text-xl text-neutral-200  mb-8 animate-fade-up" style={{ animationDelay: '0.4s', textShadow: '0 1px 4px rgba(0,0,0,0.7)' }}>
                      {getTranslation('heroSubheadline', "Tell me what you want, and I'll handle the rest: flights, hotels, itineraries, in seconds.")}
                    </p>
                </div>
                
              {activeCategory === "journi" && (
                <div className="absolute top-[400px] flex flex-col justify-center items-start w-full max-w-[750px]  mx-auto rounded-3xl border border-border/50 dark:border-border/60 bg-card/95 dark:bg-card/90 backdrop-blur-md shadow-2xl">
                  <JourniFormSection
                    tripQuery={tripQuery}
                    onTripQueryChange={onTripQueryChange}
                    onTripQuerySubmit={onTripQuerySubmit}
                    sendBtnLoader={sendBtnLoader}
                    handleSuggestionClick={handleSuggestionClick}
                    getTranslation={getTranslation}
                  />
                </div>)}

              {activeCategory === "flights" && (
                <div className="absolute top-[400px] flex flex-col justify-center items-start w-full max-w-[1070px] mx-auto  rounded-3xl border border-border/50 dark:border-border/60 bg-card/95 dark:bg-card/90 backdrop-blur-md shadow-2xl">
                  <FlightFormSelector/>
                </div>)}

              {(activeCategory === "stays" || activeCategory === "activities" || activeCategory === "restaurants") && (
                <div className="absolute top-[400px] flex flex-col justify-center items-start w-full max-w-[900px] mx-auto rounded-3xl border border-border/50 dark:border-border/60 bg-card/95 dark:bg-card/90 backdrop-blur-md shadow-2xl">
                  <BookingFormSelector/>
                </div>)}


                <div className="flex flex-row justify-center items-center gap-2 absolute top-[370px] w-full max-w-[605px] h-[56px] border border-border/50 dark:border-border/60 bg-card/95 dark:bg-card/90 backdrop-blur-md rounded-3xl shadow-lg px-2">
                  {categories.map((cat) => {
                              const Icon = cat.icon;
                              return (
                                  <Button
                                      key={cat.id}
                                      variant={activeCategory === cat.id ? 'default' : 'ghost'}
                                      className={cn(
                                          "rounded-full px-4 py-2.5 text-sm font-medium transition-all h-auto whitespace-nowrap",
                                          activeCategory === cat.id 
                                            ? 'bg-primary text-primary-foreground shadow-md hover:bg-primary/90' 
                                            : 'text-muted-foreground hover:text-foreground hover:bg-muted/50 dark:hover:bg-muted/60'
                                      )}
                                      onClick={() => setActiveCategory(cat.id)}
                                  >
                                      <Icon className="mr-2 h-4 w-4" />
                                      {cat.label}
                                  </Button>
                              );
                          })}
                  </div>

                  <div className="relative top-[150px] grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
                    {tabContent.map((item: any) => <ContentCard key={item.id} item={item} />)}
                </div>
            </div>
            
    </section>
  );
}
