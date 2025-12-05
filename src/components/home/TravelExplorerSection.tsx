

'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { DatePickerWithRange } from '@/components/ui/date-picker-with-range';
import { Heart, Plus, Search, Bed, Utensils, MapPin, Sparkles, Plane, Star, Minus, Users, RefreshCw, ChevronDown, SlidersHorizontal, CalendarDays, ArrowRightLeft, Clock, DollarSign, GripVertical } from 'lucide-react';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import type { DateRange } from 'react-day-picker';
import { format } from 'date-fns';
import { ExplorerFilters } from './ExplorerFilters';
import { Label } from '@/components/ui/label';
import { Separator } from '../ui/separator';
import { Switch } from '../ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';


type Category = 'stays' | 'restaurants' | 'activities' | 'flights';

const categories: { id: Category; label: string; icon: React.ElementType }[] = [
  { id: 'stays', label: 'Stays', icon: Bed },
  { id: 'restaurants', label: 'Restaurants', icon: Utensils },
  { id: 'activities', label: 'Activities', icon: Sparkles },
  { id: 'flights', label: 'Flights', icon: Plane },
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
    <div className="group relative overflow-hidden rounded-xl sm:rounded-2xl shadow-md transition-all duration-300 hover:shadow-xl">
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

// New Component for Flight Search UI
const FlightSearchInterface = () => {
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
    
    const secondaryFilters = [
        { 
            label: "Stops", 
            icon: ChevronDown, 
            content: 
                <div className="w-64 p-4 space-y-4">
                    <h4 className="font-medium text-center">Stops</h4>
                    <Separator />
                    <div className="flex items-center space-x-2">
                        <Checkbox id="non-stop" checked={stops.nonStop} onCheckedChange={(checked) => setStops(s => ({ ...s, nonStop: !!checked }))} />
                        <Label htmlFor="non-stop" className="font-normal">Non-stop</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Checkbox id="one-stop" checked={stops.oneStop} onCheckedChange={(checked) => setStops(s => ({ ...s, oneStop: !!checked }))} />
                        <Label htmlFor="one-stop" className="font-normal">1 stop</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Checkbox id="two-plus-stops" checked={stops.twoPlusStops} onCheckedChange={(checked) => setStops(s => ({ ...s, twoPlusStops: !!checked }))} />
                        <Label htmlFor="two-plus-stops" className="font-normal">2+ stops</Label>
                    </div>
                </div>
        },
        { 
            label: "Price", 
            icon: ChevronDown, 
            content: 
                <div className="w-64 p-4 space-y-4">
                    <h4 className="font-medium text-center">Price</h4>
                    <p className="text-sm text-muted-foreground text-center">Up to ${priceRange[0]}</p>
                    <Slider value={priceRange} onValueChange={setPriceRange} max={2000} step={50} />
                </div>
        },
        { 
            label: "Times", 
            icon: ChevronDown,
            contentClassName: "w-80", // Apply specific width for this popover
            content: 
                <div className="p-4 space-y-6">
                    <h4 className="font-medium text-center">Times</h4>
                    <div className="space-y-2">
                        <Label>Departure: {departureTime[0]}:00 - {departureTime[1]}:00</Label>
                        <Slider
                        value={departureTime}
                        onValueChange={setDepartureTime}
                        max={24}
                        step={1}
                        minStepsBetweenThumbs={1}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label>Arrival: {arrivalTime[0]}:00 - {arrivalTime[1]}:00</Label>
                        <Slider
                        value={arrivalTime}
                        onValueChange={setArrivalTime}
                        max={24}
                        step={1}
                        minStepsBetweenThumbs={1}
                        />
                    </div>
                </div>
        },
        { 
            label: "Duration", 
            icon: ChevronDown, 
            content: 
                <div className="w-64 p-4 space-y-4">
                    <h4 className="font-medium text-center">Duration</h4>
                    <p className="text-sm text-muted-foreground text-center">Max {duration[0]} hours</p>
                    <Slider value={duration} onValueChange={setDuration} max={50} step={1} />
                </div>
        }
    ];

    const allAirlines = [
        { value: 'any', label: 'Any Airline' },
        { value: 'star_alliance', label: 'Star Alliance' },
        { value: 'skyteam', label: 'SkyTeam' },
        { value: 'oneworld', label: 'Oneworld' },
        { value: 'emirates', label: 'Emirates' },
        { value: 'qatar', label: 'Qatar Airways' },
        { value: 'singapore', label: 'Singapore Airlines' },
    ];


    return (
        <div className="w-full max-w-4xl mx-auto p-3 sm:p-4 md:p-6 bg-card/60 backdrop-blur-lg border border-border/20 rounded-2xl shadow-xl overflow-x-hidden">
            <div className="flex flex-wrap items-center gap-x-2 sm:gap-x-4 gap-y-2 mb-4 sm:mb-6 w-full">
                <div className="flex items-center space-x-1 bg-muted p-1 rounded-full">
                    {(['Round Trip', 'One Way', 'Multi-city'] as const).map(type => (
                         <Button 
                            key={type}
                            variant={tripType === type ? 'default' : 'ghost'}
                            onClick={() => setTripType(type)}
                            className="rounded-full h-8 px-3 text-xs"
                         >
                            {type}
                         </Button>
                    ))}
                </div>
                <div className="flex items-center space-x-2">
                     <Popover>
                        <PopoverTrigger asChild>
                             <Button variant="ghost" className="text-sm font-medium p-1 h-auto hover:bg-muted/50 rounded-md">
                                <Users className="h-4 w-4 mr-2" /> {passengerLabel} <ChevronDown className="h-4 w-4 ml-1 opacity-50" />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-80 p-4">
                             <div className="space-y-4">
                                <CounterRow title="Adults" subtitle="Ages 13+" count={adults} onIncrement={() => setAdults(a => a + 1)} onDecrement={() => setAdults(a => Math.max(1, a - 1))} />
                                <CounterRow title="Children" subtitle="Ages 2-12" count={children} onIncrement={() => setChildren(c => c + 1)} onDecrement={() => setChildren(c => Math.max(0, c - 1))} />
                                <CounterRow title="Infants" subtitle="Under 2" count={infants} onIncrement={() => setInfants(i => i + 1)} onDecrement={() => setInfants(i => Math.max(0, i - 1))} />
                            </div>
                        </PopoverContent>
                    </Popover>

                    <Popover>
                        <PopoverTrigger asChild>
                            <Button variant="ghost" className="text-sm font-medium p-1 h-auto hover:bg-muted/50 rounded-md">
                                {cabinClass} <ChevronDown className="h-4 w-4 ml-1 opacity-50" />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-48 p-1">
                            {(['Economy', 'Premium Economy', 'Business', 'First'] as const).map(cClass => (
                                <Button key={cClass} variant="ghost" className="w-full justify-start" onClick={() => setCabinClass(cClass)}>
                                    {cClass}
                                </Button>
                            ))}
                        </PopoverContent>
                    </Popover>
                </div>
            </div>
            
            <div className="flex flex-col lg:flex-row items-stretch gap-2 w-full">
                <div className="flex-grow grid grid-cols-1 sm:grid-cols-[1fr_auto_1fr] items-center gap-2 bg-background p-2 rounded-lg border border-border/50 w-full min-w-0 overflow-hidden">
                    <div className="relative min-w-0 w-full">
                        <Label htmlFor="from" className="text-xs text-muted-foreground absolute top-0.5 left-2 sm:left-3">From</Label>
                        <Input id="from" value={fromLocation} onChange={(e) => setFromLocation(e.target.value)} placeholder="Origin" className="pl-2 sm:pl-3 pt-4 text-sm sm:text-base bg-transparent border-none h-auto focus-visible:ring-0 focus-visible:ring-offset-0 w-full"/>
                    </div>
                    <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full flex-shrink-0 self-center hidden sm:flex" onClick={handleLocationSwap}>
                        <ArrowRightLeft className="h-4 w-4 text-muted-foreground" />
                    </Button>
                    <div className="relative min-w-0 w-full">
                        <Label htmlFor="to" className="text-xs text-muted-foreground absolute top-0.5 left-2 sm:left-3">To</Label>
                        <Input id="to" value={toLocation} onChange={(e) => setToLocation(e.target.value)} placeholder="Destination" className="pl-2 sm:pl-3 pt-4 text-sm sm:text-base bg-transparent border-none h-auto focus-visible:ring-0 focus-visible:ring-offset-0 w-full"/>
                    </div>
                </div>

                <div className="flex-shrink-0 bg-background p-2 rounded-lg border border-border/50 w-full sm:w-[200px] lg:w-[220px] max-w-full overflow-hidden">
                    <div className="w-full">
                        <DatePickerWithRange 
                            date={flightDates} 
                            onSelectDate={setFlightDates}
                            className="w-full [&>div]:w-full [&_button]:border-none [&_button]:bg-transparent [&_button]:h-auto [&_button]:w-full [&_button]:text-left [&_button]:px-2 [&_button]:py-2 [&_button]:text-xs sm:text-sm [&_button]:truncate [&_button]:min-w-0 [&_button]:justify-start"
                        />
                    </div>
                </div>
                
                <div className="flex-shrink-0 flex items-center justify-center lg:justify-start w-full sm:w-auto">
                    <Button 
                        size="icon" 
                        className="h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 hover:scale-105 transition-transform duration-200 shadow-lg flex-shrink-0"
                        onClick={handleFlightSearch}
                    >
                      <Search className="h-4 w-4 sm:h-5 sm:w-5" />
                    </Button>
                </div>
            </div>
            
            <div className="mt-4 flex flex-wrap items-center gap-2">
                <Popover>
                    <PopoverTrigger asChild>
                        <Button variant="outline" className="h-8 text-xs rounded-full bg-background/70 border-border/70 hover:bg-muted">
                            All filters
                            <SlidersHorizontal className="ml-1.5 h-4 w-4 opacity-70" />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-96 p-4">
                        <div className="space-y-4">
                            <h4 className="font-medium text-center">Advanced Filters</h4>
                            <Separator />
                            <div className="flex items-center justify-between space-x-2">
                                <Label htmlFor="airlines-switch" className="font-normal">Airlines</Label>
                                <Switch id="airlines-switch" checked={includeAirlines} onCheckedChange={setIncludeAirlines} />
                            </div>
                            <Select
                                disabled={!includeAirlines}
                                value={selectedAirlines}
                                onValueChange={setSelectedAirlines}
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select airlines" />
                                </SelectTrigger>
                                <SelectContent>
                                    {allAirlines.map(airline => (
                                        <SelectItem key={airline.value} value={airline.value}>{airline.label}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <Separator />
                            <div className="flex items-center justify-between space-x-2">
                                <Label htmlFor="layover-switch" className="font-normal">Layover airports</Label>
                                <Switch id="layover-switch" checked={includeLayoverAirports} onCheckedChange={setIncludeLayoverAirports}/>
                            </div>
                            <Input
                                placeholder="e.g. DXB, DOH"
                                disabled={!includeLayoverAirports}
                                value={layoverAirports}
                                onChange={e => setLayoverAirports(e.target.value)}
                            />
                        </div>
                    </PopoverContent>
                </Popover>

                {secondaryFilters.map((filter) => {
                    const Icon = filter.icon;
                    return (
                        <Popover key={filter.label}>
                            <PopoverTrigger asChild>
                                <Button variant="outline" className="h-8 text-xs rounded-full bg-background/70 border-border/70 hover:bg-muted">
                                    {filter.label}
                                    <Icon className="ml-1.5 h-4 w-4 opacity-70" />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className={filter.contentClassName}>
                                {filter.content}
                            </PopoverContent>
                        </Popover>
                    )
                })}
            </div>
        </div>
    )
}

const CounterRow = ({ title, subtitle, count, onIncrement, onDecrement }: { title: string, subtitle: string, count: number, onIncrement: () => void, onDecrement: () => void }) => (
    <div className="flex items-center justify-between">
        <div>
            <p className="font-medium text-sm">{title}</p>
            <p className="text-xs text-muted-foreground">{subtitle}</p>
        </div>
        <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" className="h-7 w-7 rounded-full" onClick={onDecrement} disabled={count === 0}><Minus className="h-4 w-4"/></Button>
            <span className="w-5 text-center font-semibold">{count}</span>
            <Button variant="outline" size="icon" className="h-7 w-7 rounded-full" onClick={onIncrement}><Plus className="h-4 w-4"/></Button>
        </div>
    </div>
);


export function TravelExplorerSection() {
    const [activeCategory, setActiveCategory] = useState<Category>('stays');

    const renderContent = () => {
        if (activeCategory === 'flights') {
            return (
                <div>
                    <FlightSearchInterface />
                </div>
            );
        }

        const tabContent = mockData[activeCategory] || [];

        if (tabContent.length > 0) {
            return (
                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
                    {tabContent.map(item => <ContentCard key={item.id} item={item} />)}
                </div>
            );
        }
        
        return <p className="col-span-full text-center text-muted-foreground py-10">No {activeCategory} found. Try adjusting your search.</p>;
    };

    return (
        <section className="py-12 md:py-16 w-full overflow-x-hidden">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl w-full">
                {/* Tabs */}
                <div className="mb-6 sm:mb-8 overflow-x-auto scrollbar-hide -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8">
                    <div className="flex w-max mx-auto space-x-1.5 sm:space-x-2 rounded-full bg-muted p-0.5 sm:p-1">
                        {categories.map((cat) => {
                            const Icon = cat.icon;
                            return (
                                <Button
                                    key={cat.id}
                                    variant={activeCategory === cat.id ? 'default' : 'ghost'}
                                    className={cn(
                                        "rounded-full px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium transition-all h-auto whitespace-nowrap",
                                        activeCategory === cat.id ? 'bg-primary text-primary-foreground shadow-md' : 'text-muted-foreground'
                                    )}
                                    onClick={() => setActiveCategory(cat.id)}
                                >
                                    <Icon className="mr-1.5 sm:mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                                    {cat.label}
                                </Button>
                            );
                        })}
                    </div>
                </div>

                {/* Filter Bar for non-flight tabs */}
                {activeCategory !== 'flights' && (
                    <div className="mb-6 sm:mb-8">
                        <ExplorerFilters category={activeCategory} />
                    </div>
                )}


                {/* Content Grid */}
                {renderContent()}
            </div>
        </section>
    );
}

