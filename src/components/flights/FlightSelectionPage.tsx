'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  ArrowRight,
  Plane,
  Users,
  Calendar,
  MapPin,
  Clock,
  Check,
  ChevronDown,
  ChevronUp,
  Info,
  AlertCircle,
  CheckCircle,
  X,
  Plus,
  Minus,
  Shield,
  Gift,
  CreditCard,
  Phone,
  Mail,
  User,
  Luggage,
  Star,
  Wifi,
  Utensils,
  MonitorPlay,
  Zap,
  Briefcase,
  Globe,
  FileText,
  Lock,
  Eye,
  EyeOff,
  HelpCircle,
  ExternalLink,
  ArrowRightLeft,
  RefreshCw,
  Settings,
  Bell,
  Heart,
  Share2,
  Download,
  Printer,
  Wallet
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

// Types
interface FlightSegment {
  id: string;
  airline: string;
  airlineCode: string;
  logo: string;
  departure: {
    time: string;
    date: string;
    airport: string;
    code: string;
    terminal?: string;
  };
  arrival: {
    time: string;
    date: string;
    airport: string;
    code: string;
    terminal?: string;
  };
  duration: string;
  stops: number;
  stopInfo: string;
  aircraft: string;
  amenities: string[];
  baggageAllowance: {
    personal: string;
    carryOn: string;
    checked: string;
  };
  layovers?: Array<{
    airport: string;
    code: string;
    duration: string;
    note?: string;
  }>;
}

interface FlightSelection {
  tripType: 'return' | 'one-way' | 'multi-city';
  segments: FlightSegment[];
  passengers: number;
  cabinClass: string;
  totalPrice: number;
  basePrice: number;
  taxes: number;
  fees: number;
  currency: string;
}

interface PassengerInfo {
  id: string;
  title: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: string;
  nationality: string;
  passportNumber: string;
  passportExpiry: string;
  frequentFlyerNumber?: string;
  frequentFlyerProgram?: string;
  extraBaggage?: {
    weight: number; // in kg
    price: number; // in USD
  };
  seatNumber?: string;
  seatPrice?: number;
}

interface Seat {
  id: string;
  row: number;
  column: string;
  type: 'economy' | 'premium-economy' | 'business' | 'first';
  status: 'available' | 'occupied' | 'selected';
  comfort: 'standard' | 'extra-legroom' | 'premium';
  price: number;
  position: 'window' | 'middle' | 'aisle';
}

interface ContactInfo {
  name: string;
  email: string;
  phone: string;
  countryCode: string;
  address?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  country?: string;
}

// Mock data for different trip types
const getMockFlightData = (tripType: 'return' | 'one-way' | 'multi-city'): FlightSelection => {
  const baseSegment = {
    airline: 'Emirates',
    airlineCode: 'EK',
    logo: '🇦🇪',
    aircraft: 'Boeing 777-300ER',
    amenities: ['WiFi', 'In-flight Entertainment', 'Meals', 'Extra Legroom'],
    baggageAllowance: {
      personal: '1 x 7kg',
      carryOn: '1 x 7kg',
      checked: '1 x 30kg'
    }
  };

  if (tripType === 'one-way') {
    return {
      tripType: 'one-way',
      segments: [{
        id: '1',
        ...baseSegment,
        departure: {
          time: '07:45',
          date: 'Wed, Nov 5',
          airport: 'New Delhi International Airport',
          code: 'DEL',
          terminal: 'T3'
        },
        arrival: {
          time: '10:10',
          date: 'Wed, Nov 5',
          airport: 'Dubai International Airport',
          code: 'DXB',
          terminal: 'T3'
        },
        duration: '3h 25m',
        stops: 0,
        stopInfo: 'Non-stop'
      }],
      passengers: 1,
      cabinClass: 'Economy',
      totalPrice: 125.55,
      basePrice: 122.20,
      taxes: 3.35,
      fees: 0,
      currency: 'USD'
    };
  }

  if (tripType === 'multi-city') {
    return {
      tripType: 'multi-city',
      segments: [
        {
          id: '1',
          ...baseSegment,
          departure: {
            time: '07:45',
            date: 'Wed, Nov 5',
            airport: 'New Delhi International Airport',
            code: 'DEL',
            terminal: 'T3'
          },
          arrival: {
            time: '10:10',
            date: 'Wed, Nov 5',
            airport: 'Dubai International Airport',
            code: 'DXB',
            terminal: 'T3'
          },
          duration: '3h 25m',
          stops: 0,
          stopInfo: 'Non-stop'
        },
        {
          id: '2',
          ...baseSegment,
          airline: 'Qatar Airways',
          airlineCode: 'QR',
          logo: '🇶🇦',
          departure: {
            time: '16:30',
            date: 'Fri, Nov 7',
            airport: 'Dubai International Airport',
            code: 'DXB',
            terminal: 'T1'
          },
          arrival: {
            time: '22:15',
            date: 'Fri, Nov 7',
            airport: 'London Heathrow Airport',
            code: 'LHR',
            terminal: 'T5'
          },
          duration: '6h 45m',
          stops: 0,
          stopInfo: 'Non-stop'
        },
        {
          id: '3',
          ...baseSegment,
          airline: 'British Airways',
          airlineCode: 'BA',
          logo: '🇬🇧',
          departure: {
            time: '14:20',
            date: 'Sun, Nov 9',
            airport: 'London Heathrow Airport',
            code: 'LHR',
            terminal: 'T5'
          },
          arrival: {
            time: '19:45',
            date: 'Sun, Nov 9',
            airport: 'New Delhi International Airport',
            code: 'DEL',
            terminal: 'T3'
          },
          duration: '8h 25m',
          stops: 0,
          stopInfo: 'Non-stop'
        }
      ],
      passengers: 1,
      cabinClass: 'Economy',
      totalPrice: 450.30,
      basePrice: 420.00,
      taxes: 30.30,
      fees: 0,
      currency: 'USD'
    };
  }

  // Return trip (default)
  return {
    tripType: 'return',
    segments: [
      {
        id: '1',
        ...baseSegment,
        departure: {
          time: '07:45',
          date: 'Wed, Nov 5',
          airport: 'New Delhi International Airport',
          code: 'DEL',
          terminal: 'T3'
        },
        arrival: {
          time: '10:10',
          date: 'Wed, Nov 5',
          airport: 'Dubai International Airport',
          code: 'DXB',
          terminal: 'T3'
        },
        duration: '3h 25m',
        stops: 0,
        stopInfo: 'Non-stop'
      },
      {
        id: '2',
        ...baseSegment,
        departure: {
          time: '14:30',
          date: 'Thu, Nov 6',
          airport: 'Dubai International Airport',
          code: 'DXB',
          terminal: 'T3'
        },
        arrival: {
          time: '19:15',
          date: 'Thu, Nov 6',
          airport: 'New Delhi International Airport',
          code: 'DEL',
          terminal: 'T3'
        },
        duration: '3h 45m',
        stops: 0,
        stopInfo: 'Non-stop'
      }
    ],
    passengers: 1,
    cabinClass: 'Economy',
    totalPrice: 251.10,
    basePrice: 244.40,
    taxes: 6.70,
    fees: 0,
    currency: 'USD'
  };
};

const mockPromoCodes = [
  {
    id: '1',
    code: 'WELCOME10',
    description: 'New user promo code (1st booking) 10% off',
    discount: 10,
    maxDiscount: 10,
    type: 'percentage',
    icon: Gift
  },
  {
    id: '2',
    code: 'SECOND5',
    description: 'New user promo code (2nd booking) 5% off',
    discount: 5,
    maxDiscount: 6,
    type: 'percentage',
    icon: Gift
  },
  {
    id: '3',
    code: 'FLYER25',
    description: 'Flyer Exclusive Offer Up to 25% Off',
    discount: 25,
    maxDiscount: 50,
    type: 'percentage',
    icon: Star
  }
];

const mockAddOns = [
  {
    id: '1',
    title: 'Trip Protection',
    description: '24x7 Optional Trip Baggage Assistance',
    price: 7.50,
    icon: Shield,
    popular: true
  },
  {
    id: '2',
    title: 'Priority Check-in',
    description: 'Skip the queue with priority check-in',
    price: 15.00,
    icon: Zap,
    popular: false
  }
];

// Extra baggage pricing tiers
const extraBaggageOptions = [
  { weight: 5, price: 15, label: '5kg' },
  { weight: 10, price: 25, label: '10kg' },
  { weight: 15, price: 35, label: '15kg' },
  { weight: 20, price: 45, label: '20kg' },
  { weight: 25, price: 55, label: '25kg' },
  { weight: 30, price: 65, label: '30kg' }
];

// VIP Lounge options
const vipLounges = [
  {
    id: 'lounge-1',
    name: 'New Delhi Indira Gandhi International Airport T3 Encalm Lounge',
    terminal: 'International T3',
    location: 'DEL',
    price: 21.60,
    image: '🛋️',
    amenities: ['WiFi', 'Food & Beverages', 'Comfortable Seating', 'Shower Facilities'],
    description: 'Start your journey in comfort - enjoy the privacy and space of the lounge'
  },
  {
    id: 'lounge-2',
    name: 'Dubai International Airport T3 Emirates Lounge',
    terminal: 'Terminal 3',
    location: 'DXB',
    price: 35.00,
    image: '✈️',
    amenities: ['WiFi', 'Premium Dining', 'Spa Services', 'Business Center'],
    description: 'Experience luxury with premium amenities and services'
  }
];

export function FlightSelectionPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Get trip type from URL params or default
  const tripType = (searchParams?.get('tripType') as 'return' | 'one-way' | 'multi-city') || 'return';
  const flightId = searchParams?.get('flightId') || '1';
  
  // State management
  const [currentStep, setCurrentStep] = useState(1);
  const [flightData, setFlightData] = useState<FlightSelection>(() => getMockFlightData(tripType));
  const [passengers, setPassengers] = useState<PassengerInfo[]>([
    {
      id: '1',
      title: 'Mr',
      firstName: '',
      lastName: '',
      dateOfBirth: '',
      gender: '',
      nationality: '',
      passportNumber: '',
      passportExpiry: '',
      frequentFlyerNumber: '',
      frequentFlyerProgram: '',
      extraBaggage: undefined
    }
  ]);
  const [contactInfo, setContactInfo] = useState<ContactInfo>({
    name: '',
    email: '',
    phone: '',
    countryCode: '+91',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'India'
  });
  
  // UI State
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(['passenger-details']));
  const [selectedPromoCodes, setSelectedPromoCodes] = useState<string[]>([]);
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);
  const [promoCodeInput, setPromoCodeInput] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showSeatMapPopup, setShowSeatMapPopup] = useState(false);
  const [currentPassengerForSeat, setCurrentPassengerForSeat] = useState<string | null>(null);
  const [seats, setSeats] = useState<Seat[]>([]);
  const [hoveredSeat, setHoveredSeat] = useState<Seat | null>(null);
  const [travelInsuranceSelected, setTravelInsuranceSelected] = useState(false);
  const [insuranceDeclined, setInsuranceDeclined] = useState(false);
  const [selectedVIPLounges, setSelectedVIPLounges] = useState<string[]>([]);
  const [showInsuranceDetails, setShowInsuranceDetails] = useState(false);
  const [showFlightDetails, setShowFlightDetails] = useState(true);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>('card');

  const steps = [
    { id: 1, title: 'Fill in your info', description: 'Passenger and contact details' },
    { id: 2, title: 'Choose your seat', description: 'Select your preferred seats' },
    { id: 3, title: 'Personalise your trip', description: 'Add-ons and preferences' },
    { id: 4, title: 'Finalise your payment', description: 'Review and pay' }
  ];

  // Update flight data when trip type changes
  useEffect(() => {
    setFlightData(getMockFlightData(tripType));
  }, [tripType]);

  // Generate seat map
  useEffect(() => {
    const generateSeats = (): Seat[] => {
      const seatMap: Seat[] = [];
      const columns = ['A', 'B', 'C', 'D', 'E', 'F'];
      const rows = 30;
      
      // Randomly occupy some seats for realism
      const occupiedSeats = new Set<string>();
      for (let i = 0; i < 45; i++) {
        const randomRow = Math.floor(Math.random() * rows) + 1;
        const randomCol = columns[Math.floor(Math.random() * columns.length)];
        occupiedSeats.add(`${randomRow}${randomCol}`);
      }

      for (let row = 1; row <= rows; row++) {
        for (const column of columns) {
          const seatId = `${row}${column}`;
          let comfort: 'standard' | 'extra-legroom' | 'premium' = 'standard';
          let price = 0;

          // Exit rows (rows 1, 12, 15) have extra legroom
          if (row === 1 || row === 12 || row === 15) {
            comfort = 'extra-legroom';
            price = 25;
          }

          // First 3 rows are premium/business
          if (row <= 3) {
            comfort = 'premium';
            price = 50;
          }

          const position: 'window' | 'middle' | 'aisle' = 
            column === 'A' || column === 'F' ? 'window' :
            column === 'C' || column === 'D' ? 'aisle' : 'middle';

          seatMap.push({
            id: seatId,
            row,
            column,
            type: row <= 3 ? 'business' : 'economy',
            status: occupiedSeats.has(seatId) ? 'occupied' : 'available',
            comfort,
            price,
            position
          });
        }
      }

      return seatMap;
    };

    setSeats(generateSeats());
  }, []);

  const toggleSection = (sectionId: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(sectionId)) {
      newExpanded.delete(sectionId);
    } else {
      newExpanded.add(sectionId);
    }
    setExpandedSections(newExpanded);
  };

  const addPassenger = () => {
    const newPassenger: PassengerInfo = {
      id: (passengers.length + 1).toString(),
      title: 'Mr',
      firstName: '',
      lastName: '',
      dateOfBirth: '',
      gender: '',
      nationality: '',
      passportNumber: '',
      passportExpiry: '',
      frequentFlyerNumber: '',
      frequentFlyerProgram: '',
      extraBaggage: undefined
    };
    setPassengers([...passengers, newPassenger]);
  };

  const removePassenger = (id: string) => {
    if (passengers.length > 1) {
      setPassengers(passengers.filter(p => p.id !== id));
    }
  };

  const updatePassenger = (id: string, field: keyof PassengerInfo, value: string) => {
    setPassengers(passengers.map(p => 
      p.id === id ? { ...p, [field]: value } : p
    ));
  };

  const updatePassengerExtraBaggage = (id: string, weight: number, price: number) => {
    setPassengers(passengers.map(p => 
      p.id === id ? { 
        ...p, 
        extraBaggage: { weight, price } 
      } : p
    ));
  };

  const removePassengerExtraBaggage = (id: string) => {
    setPassengers(passengers.map(p => 
      p.id === id ? { 
        ...p, 
        extraBaggage: undefined 
      } : p
    ));
  };

  const updateContactInfo = (field: keyof ContactInfo, value: string) => {
    setContactInfo(prev => ({ ...prev, [field]: value }));
  };

  const handlePromoCodeApply = (codeId: string) => {
    if (selectedPromoCodes.includes(codeId)) {
      setSelectedPromoCodes(selectedPromoCodes.filter(id => id !== codeId));
    } else {
      setSelectedPromoCodes([...selectedPromoCodes, codeId]);
    }
  };

  const handleAddOnToggle = (addOnId: string) => {
    if (selectedAddOns.includes(addOnId)) {
      setSelectedAddOns(selectedAddOns.filter(id => id !== addOnId));
    } else {
      setSelectedAddOns([...selectedAddOns, addOnId]);
    }
  };

  const calculateTotal = () => {
    let total = flightData.totalPrice;
    
    // Add extra baggage charges
    passengers.forEach(passenger => {
      if (passenger.extraBaggage) {
        total += passenger.extraBaggage.price;
      }
      // Add seat selection charges
      if (passenger.seatPrice) {
        total += passenger.seatPrice;
      }
    });
    
    // Add selected add-ons
    selectedAddOns.forEach(addOnId => {
      const addOn = mockAddOns.find(a => a.id === addOnId);
      if (addOn) {
        total += addOn.price;
      }
    });
    
    // Add travel insurance
    if (travelInsuranceSelected) {
      total += 6.25; // Per person insurance cost
    }
    
    // Add VIP lounge access
    selectedVIPLounges.forEach(loungeId => {
      const lounge = vipLounges.find(l => l.id === loungeId);
      if (lounge) {
        total += lounge.price;
      }
    });
    
    // Apply promo codes (simplified calculation)
    selectedPromoCodes.forEach(codeId => {
      const promo = mockPromoCodes.find(p => p.id === codeId);
      if (promo) {
        const discount = Math.min(promo.maxDiscount, total * (promo.discount / 100));
        total -= discount;
      }
    });
    
    return Math.max(0, total);
  };

  const handleSeatSelection = (seat: Seat, passengerId: string) => {
    if (seat.status === 'occupied') return;

    // Update seat status
    setSeats(prevSeats => prevSeats.map(s => {
      if (s.id === seat.id) {
        return { ...s, status: 'selected' as const };
      }
      // Deselect previous seat for this passenger
      const passenger = passengers.find(p => p.id === passengerId);
      if (passenger?.seatNumber === s.id) {
        return { ...s, status: 'available' as const };
      }
      return s;
    }));

    // Update passenger seat
    setPassengers(prevPassengers => prevPassengers.map(p =>
      p.id === passengerId
        ? { ...p, seatNumber: seat.id, seatPrice: seat.price }
        : p
    ));

    setShowSeatMapPopup(false);
    setCurrentPassengerForSeat(null);
  };

  const openSeatMapForPassenger = (passengerId: string) => {
    setCurrentPassengerForSeat(passengerId);
    setShowSeatMapPopup(true);
  };

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
      // Scroll to top smoothly
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // Handle final submission
      setIsLoading(true);
      setTimeout(() => {
        router.push('/booking/confirmation');
      }, 2000);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      // Scroll to top smoothly
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      router.back();
    }
  };

  const renderFlightSummary = () => {
    const isReturn = tripType === 'return';
    const isMultiCity = tripType === 'multi-city';
    const isOneWay = tripType === 'one-way';
    
    // Update flight data based on trip type
    const displaySegments = isOneWay ? flightData.segments.slice(0, 1) : flightData.segments;
    
    return (
      <Card className="mb-6">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold">
                {isReturn ? 'Round Trip to Dubai' : 
                 isMultiCity ? 'Multi-city Trip' : 
                 'One-way to Dubai'}
              </h2>
              <p className="text-sm text-muted-foreground">
                {flightData.passengers} passenger{flightData.passengers > 1 ? 's' : ''} • {flightData.cabinClass}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setShowFlightDetails(!showFlightDetails)}
              >
                {showFlightDetails ? 'Hide Details' : 'Details'}
                <ChevronDown className={cn("h-4 w-4 ml-1 transition-transform", showFlightDetails && "rotate-180")} />
              </Button>
              <Button variant="outline" size="sm">
                Change Flight
              </Button>
            </div>
          </div>
        </CardHeader>
        <Collapsible open={showFlightDetails}>
          <CollapsibleContent>
            <CardContent>
          <div className="space-y-4">
            {displaySegments.map((segment, index) => (
              <div key={segment.id} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center text-lg">
                      {segment.logo}
                    </div>
                    <div>
                      <h3 className="font-semibold">{segment.airline}</h3>
                      <p className="text-sm text-muted-foreground">{segment.aircraft}</p>
                    </div>
                  </div>
                  <Badge variant="outline">{segment.stopInfo}</Badge>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold">{segment.departure.time}</div>
                    <div className="text-sm text-muted-foreground">{segment.departure.date}</div>
                    <div className="text-sm font-medium">{segment.departure.code}</div>
                    <div className="text-xs text-muted-foreground">{segment.departure.airport}</div>
                  </div>
                  
                  <div className="flex-1 px-4">
                    <div className="text-center text-sm text-muted-foreground mb-2">{segment.duration}</div>
                    <div className="relative">
                      <div className="absolute top-1/2 left-0 right-0 h-px bg-border"></div>
                      <div className="relative flex justify-center">
                        <Plane className="h-4 w-4 text-primary bg-background rotate-90" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <div className="text-2xl font-bold">{segment.arrival.time}</div>
                    <div className="text-sm text-muted-foreground">{segment.arrival.date}</div>
                    <div className="text-sm font-medium">{segment.arrival.code}</div>
                    <div className="text-xs text-muted-foreground">{segment.arrival.airport}</div>
                  </div>
                </div>
                
                {segment.layovers && segment.layovers.length > 0 && (
                  <div className="mt-3 p-3 bg-muted/50 rounded-lg">
                    <h4 className="text-sm font-medium mb-2">Layover Information</h4>
                    {segment.layovers.map((layover, layoverIndex) => (
                      <div key={layoverIndex} className="text-sm text-muted-foreground">
                        {layover.airport} ({layover.code}) - {layover.duration}
                        {layover.note && <span className="ml-2 text-orange-600">{layover.note}</span>}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
            </CardContent>
          </CollapsibleContent>
        </Collapsible>
      </Card>
    );
  };

  const renderPassengerDetails = () => (
    <Card className="mb-6">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Who's travelling?
          </CardTitle>
          <Button variant="link" size="sm" className="text-primary">
            <Check className="h-4 w-4 mr-1" />
            Sign in for effortless booking
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {passengers.map((passenger, index) => (
            <div key={passenger.id} className="border rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">Passenger {index + 1}</h3>
                {passengers.length > 1 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removePassenger(passenger.id)}
                    className="text-destructive hover:text-destructive"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor={`title-${passenger.id}`}>Title *</Label>
                  <Select
                    value={passenger.title}
                    onValueChange={(value) => updatePassenger(passenger.id, 'title', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select title" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Mr">Mr</SelectItem>
                      <SelectItem value="Mrs">Mrs</SelectItem>
                      <SelectItem value="Ms">Ms</SelectItem>
                      <SelectItem value="Dr">Dr</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor={`firstName-${passenger.id}`}>Given name(s) *</Label>
                  <Input
                    id={`firstName-${passenger.id}`}
                    value={passenger.firstName}
                    onChange={(e) => updatePassenger(passenger.id, 'firstName', e.target.value)}
                    placeholder="Enter first name"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor={`lastName-${passenger.id}`}>Surname *</Label>
                  <Input
                    id={`lastName-${passenger.id}`}
                    value={passenger.lastName}
                    onChange={(e) => updatePassenger(passenger.id, 'lastName', e.target.value)}
                    placeholder="Enter last name"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor={`dateOfBirth-${passenger.id}`}>Date of birth *</Label>
                  <Input
                    id={`dateOfBirth-${passenger.id}`}
                    type="date"
                    value={passenger.dateOfBirth}
                    onChange={(e) => updatePassenger(passenger.id, 'dateOfBirth', e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor={`gender-${passenger.id}`}>Gender on ID *</Label>
                  <Select
                    value={passenger.gender}
                    onValueChange={(value) => updatePassenger(passenger.id, 'gender', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor={`nationality-${passenger.id}`}>Nationality *</Label>
                  <Select
                    value={passenger.nationality}
                    onValueChange={(value) => updatePassenger(passenger.id, 'nationality', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select nationality" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="IN">India</SelectItem>
                      <SelectItem value="US">United States</SelectItem>
                      <SelectItem value="GB">United Kingdom</SelectItem>
                      <SelectItem value="AE">United Arab Emirates</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor={`passportNumber-${passenger.id}`}>Passport Number *</Label>
                  <Input
                    id={`passportNumber-${passenger.id}`}
                    value={passenger.passportNumber}
                    onChange={(e) => updatePassenger(passenger.id, 'passportNumber', e.target.value)}
                    placeholder="Enter passport number"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor={`passportExpiry-${passenger.id}`}>Passport Expiry *</Label>
                  <Input
                    id={`passportExpiry-${passenger.id}`}
                    type="date"
                    value={passenger.passportExpiry}
                    onChange={(e) => updatePassenger(passenger.id, 'passportExpiry', e.target.value)}
                  />
                </div>
              </div>
              
              <div className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-950/20 rounded-lg">
                <p className="text-sm text-yellow-800 dark:text-yellow-200">
                  <Info className="h-4 w-4 inline mr-1" />
                  Please enter the passenger's name exactly as it appears on the government-issued ID to be shown at check-in.
                </p>
              </div>
              
              <Collapsible className="mt-4">
                <CollapsibleTrigger className="flex items-center gap-2 text-sm text-primary hover:underline">
                  <ChevronDown className="h-4 w-4" />
                  Frequent Flyer Program (Optional)
                </CollapsibleTrigger>
                <CollapsibleContent className="mt-3 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor={`frequentFlyerProgram-${passenger.id}`}>Program</Label>
                      <Select
                        value={passenger.frequentFlyerProgram}
                        onValueChange={(value) => updatePassenger(passenger.id, 'frequentFlyerProgram', value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select program" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="emirates">Emirates Skywards</SelectItem>
                          <SelectItem value="air-india">Air India Flying Returns</SelectItem>
                          <SelectItem value="spicejet">SpiceJet SpiceClub</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor={`frequentFlyerNumber-${passenger.id}`}>Number</Label>
                      <Input
                        id={`frequentFlyerNumber-${passenger.id}`}
                        value={passenger.frequentFlyerNumber}
                        onChange={(e) => updatePassenger(passenger.id, 'frequentFlyerNumber', e.target.value)}
                        placeholder="Enter frequent flyer number"
                      />
                    </div>
                  </div>
                  
                  <div className="p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                    <p className="text-sm text-blue-800 dark:text-blue-200">
                      <Info className="h-4 w-4 inline mr-1" />
                      Please contact the airline to confirm whether miles/points can be earned for this trip.
                    </p>
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </div>
          ))}
          
          <Button onClick={addPassenger} variant="outline" className="w-full">
            <Plus className="h-4 w-4 mr-2" />
            Add Passenger
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  const renderContactDetails = () => (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Mail className="h-5 w-5" />
          Contact details
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="contactName">Contact name *</Label>
            <Input
              id="contactName"
              value={contactInfo.name}
              onChange={(e) => updateContactInfo('name', e.target.value)}
              placeholder="Enter contact name"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="contactEmail">Email *</Label>
            <Input
              id="contactEmail"
              type="email"
              value={contactInfo.email}
              onChange={(e) => updateContactInfo('email', e.target.value)}
              placeholder="Enter email address"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="contactPhone">Mobile phone *</Label>
            <div className="flex gap-2">
              <Select
                value={contactInfo.countryCode}
                onValueChange={(value) => updateContactInfo('countryCode', value)}
              >
                <SelectTrigger className="w-24">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="+91">+91</SelectItem>
                  <SelectItem value="+1">+1</SelectItem>
                  <SelectItem value="+44">+44</SelectItem>
                  <SelectItem value="+971">+971</SelectItem>
                </SelectContent>
              </Select>
              <Input
                id="contactPhone"
                value={contactInfo.phone}
                onChange={(e) => updateContactInfo('phone', e.target.value)}
                placeholder="Enter phone number"
                className="flex-1"
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );


  const renderCancellationPolicy = () => (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          Cancellations & changes
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center gap-3">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <div>
                <p className="font-medium">Cancellation policy</p>
                <p className="text-sm text-muted-foreground">From US$132 Details</p>
              </div>
            </div>
            <Badge variant="outline" className="text-green-600 border-green-600">
              Included
            </Badge>
          </div>
          
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center gap-3">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <div>
                <p className="font-medium">Change policy</p>
                <p className="text-sm text-muted-foreground">From US$132 Details</p>
              </div>
            </div>
            <Badge variant="outline" className="text-green-600 border-green-600">
              Included
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const renderPromoCodes = () => (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Gift className="h-5 w-5" />
          Your free promo codes
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {mockPromoCodes.map((promo) => {
            const Icon = promo.icon;
            const isSelected = selectedPromoCodes.includes(promo.id);
            
            return (
              <div key={promo.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <Icon className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">{promo.description}</p>
                    <p className="text-sm text-muted-foreground">
                      {promo.discount}% off (up to US${promo.maxDiscount})
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="link" size="sm" className="p-0 h-auto">
                    View Details
                  </Button>
                  <Button
                    size="sm"
                    variant={isSelected ? "default" : "outline"}
                    onClick={() => handlePromoCodeApply(promo.id)}
                  >
                    {isSelected ? 'Applied' : 'Claim'}
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
        
        <div className="mt-4">
          <Label htmlFor="promoCode">Promo codes</Label>
          <div className="flex gap-2 mt-2">
            <Input
              id="promoCode"
              value={promoCodeInput}
              onChange={(e) => setPromoCodeInput(e.target.value)}
              placeholder="Select/Enter"
            />
            <Button variant="outline">Apply</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const renderAddOns = () => (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Settings className="h-5 w-5" />
          Add-ons & Services
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Enhance your travel experience with these optional services
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {mockAddOns.map((addOn) => {
            const Icon = addOn.icon;
            const isSelected = selectedAddOns.includes(addOn.id);
            
            return (
              <div key={addOn.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <Icon className="h-5 w-5 text-primary" />
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-medium">{addOn.title}</p>
                      {addOn.popular && (
                        <Badge variant="secondary" className="text-xs">Popular</Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">{addOn.description}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-semibold">US${addOn.price}</span>
                  <Button
                    size="sm"
                    variant={isSelected ? "default" : "outline"}
                    onClick={() => handleAddOnToggle(addOn.id)}
                  >
                    {isSelected ? 'Added' : 'Add'}
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );

  const renderTravelInsurance = () => (
    <Card className="mb-6 border-2 border-primary/20">
      <CardHeader className="bg-gradient-to-br from-blue-50 to-white dark:from-blue-950/20 dark:to-background">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/30 to-blue-600/20 flex items-center justify-center">
              <Shield className="h-6 w-6 text-primary" />
            </div>
            <div className="flex-1">
              <CardTitle className="text-lg mb-1">Add protection for a worry-free journey</CardTitle>
              <p className="text-sm text-muted-foreground font-normal">Be prepared for the unexpected</p>
            </div>
          </div>
          <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">Powered by XCover</span>
        </div>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="space-y-4">
          {/* Insurance Option */}
          <div className={cn(
            "border-2 rounded-lg p-4 transition-all cursor-pointer",
            travelInsuranceSelected ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
          )}
          onClick={() => {
            setTravelInsuranceSelected(true);
            setInsuranceDeclined(false);
          }}>
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-start gap-3 flex-1">
                <div className={cn(
                  "w-5 h-5 rounded-full border-2 flex items-center justify-center mt-0.5",
                  travelInsuranceSelected ? "border-primary bg-primary" : "border-muted-foreground"
                )}>
                  {travelInsuranceSelected && <Check className="h-3 w-3 text-primary-foreground" />}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-semibold">Travel Insurance</h3>
                    <Badge variant="secondary" className="text-xs">Recommended</Badge>
                  </div>
                  <div className="space-y-2 mb-3">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span>Emergency medical and dental costs</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span>Personal accident cover</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span>Trip cancellation and interruption</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span>Refundable flights and trip costs</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span>24/7 Emergency assistance</span>
                    </div>
                  </div>
                  <Collapsible open={showInsuranceDetails} onOpenChange={setShowInsuranceDetails}>
                    <CollapsibleTrigger asChild>
                      <Button variant="link" size="sm" className="p-0 h-auto text-primary">
                        {showInsuranceDetails ? 'Hide' : 'Total 15+ benefits'} <ChevronDown className={cn("h-4 w-4 ml-1 transition-transform", showInsuranceDetails && "rotate-180")} />
                      </Button>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="mt-2 pt-2 border-t text-xs text-muted-foreground space-y-1">
                      <p>This comprehensive travel protection is powered by XCover.com and underwritten by Care Health Insurance Company Limited.</p>
                      <p className="pt-2">Additional coverage includes: Lost baggage protection, Flight delay compensation, Travel document protection, Liability coverage, and more.</p>
                    </CollapsibleContent>
                  </Collapsible>
                </div>
              </div>
              <div className="text-right ml-4">
                <p className="font-bold text-lg">US$6.25</p>
                <p className="text-xs text-muted-foreground">/person</p>
              </div>
            </div>
          </div>

          {/* Decline Insurance */}
          <div className={cn(
            "border-2 rounded-lg p-4 transition-all cursor-pointer",
            insuranceDeclined ? "border-orange-500 bg-orange-50/50 dark:bg-orange-950/20" : "border-border hover:border-orange-500/50"
          )}
          onClick={() => {
            setInsuranceDeclined(true);
            setTravelInsuranceSelected(false);
          }}>
            <div className="flex items-start gap-3">
              <div className={cn(
                "w-5 h-5 rounded-full border-2 flex items-center justify-center mt-0.5",
                insuranceDeclined ? "border-orange-500 bg-orange-500" : "border-muted-foreground"
              )}>
                {insuranceDeclined && <Check className="h-3 w-3 text-white" />}
              </div>
              <div className="flex-1">
                <p className="font-medium text-sm">I am aware of the risks of not protecting my trip</p>
              </div>
            </div>
          </div>

          {/* Terms and conditions */}
          <div className="text-xs text-muted-foreground bg-muted/50 p-3 rounded-lg">
            <p>By opting in, I confirm I am an Indian national & agree to terms and conditions and confirm all passengers are between 3 months to 70 years of age. By clicking the button, you confirm that you have read and agreed to the Travel Protection Terms and Conditions. This comprehensive travel protection is powered by XCover.com and underwritten by Care Health Insurance Company Limited. I hereby declare on behalf of myself/all members proposed that I/we are in good health...</p>
            <Button variant="link" size="sm" className="p-0 h-auto text-primary mt-1">
              Show More <ChevronDown className="h-3 w-3 ml-1" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const renderVIPLounges = () => (
    <Card className="mb-6">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-500/20 to-orange-500/10 flex items-center justify-center">
            <Briefcase className="h-5 w-5 text-amber-600 dark:text-amber-400" />
          </div>
          <div>
            <CardTitle className="text-lg">VIP Lounges</CardTitle>
            <p className="text-sm text-muted-foreground">Treat yourself to VIP comfort before you fly</p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {vipLounges.map((lounge) => {
            const isSelected = selectedVIPLounges.includes(lounge.id);
            
            return (
              <div key={lounge.id} className={cn(
                "border rounded-lg overflow-hidden transition-all",
                isSelected ? "border-primary shadow-md" : "border-border"
              )}>
                <div className="flex items-start gap-4 p-4">
                  <div className="text-5xl">{lounge.image}</div>
                  <div className="flex-1">
                    <h3 className="font-semibold mb-1">{lounge.name}</h3>
                    <p className="text-xs text-muted-foreground mb-2">
                      {lounge.location} ({lounge.terminal})
                    </p>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {lounge.amenities.map((amenity, idx) => (
                        <div key={idx} className="flex items-center gap-1 text-xs bg-muted px-2 py-1 rounded">
                          {amenity === 'WiFi' && <Wifi className="h-3 w-3" />}
                          {amenity === 'Food & Beverages' && <Utensils className="h-3 w-3" />}
                          {amenity === 'Comfortable Seating' && <Briefcase className="h-3 w-3" />}
                          {amenity === 'Shower Facilities' && <Globe className="h-3 w-3" />}
                          {amenity === 'Premium Dining' && <Utensils className="h-3 w-3" />}
                          {amenity === 'Spa Services' && <Star className="h-3 w-3" />}
                          {amenity === 'Business Center' && <MonitorPlay className="h-3 w-3" />}
                          <span>{amenity}</span>
                        </div>
                      ))}
                    </div>
                    <p className="text-sm text-muted-foreground italic">{lounge.description}</p>
                    <Button variant="link" size="sm" className="p-0 h-auto text-primary mt-2">
                      Details <ExternalLink className="h-3 w-3 ml-1" />
                    </Button>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-lg mb-1">US${lounge.price.toFixed(2)}</p>
                    <p className="text-xs text-muted-foreground mb-3">/person</p>
                    <Button
                      size="sm"
                      variant={isSelected ? "default" : "outline"}
                      className="w-20"
                      onClick={() => {
                        if (isSelected) {
                          setSelectedVIPLounges(selectedVIPLounges.filter(id => id !== lounge.id));
                        } else {
                          setSelectedVIPLounges([...selectedVIPLounges, lounge.id]);
                        }
                      }}
                    >
                      {isSelected ? 'Added' : 'Add'}
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );

  const renderSeatSelection = () => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center">
            <Plane className="h-5 w-5 text-primary rotate-90" />
          </div>
          <div>
            <span>Select Your Seats</span>
            <p className="text-sm text-muted-foreground font-normal mt-0.5">Choose comfortable seats for all passengers</p>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {passengers.map((passenger, index) => (
            <div key={passenger.id} className="p-4 border rounded-lg hover:border-primary/50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <User className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold">
                      Passenger {index + 1}
                      {passenger.firstName && `: ${passenger.firstName} ${passenger.lastName}`}
                    </p>
                    {passenger.seatNumber ? (
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="default" className="text-xs">
                          Seat {passenger.seatNumber}
                        </Badge>
                        {passenger.seatPrice && passenger.seatPrice > 0 && (
                          <span className="text-xs text-muted-foreground">+US${passenger.seatPrice}</span>
                        )}
                      </div>
                    ) : (
                      <p className="text-sm text-muted-foreground mt-1">No seat selected</p>
                    )}
                  </div>
                </div>
                <Button
                  variant={passenger.seatNumber ? "outline" : "default"}
                  size="sm"
                  onClick={() => openSeatMapForPassenger(passenger.id)}
                >
                  {passenger.seatNumber ? 'Change Seat' : 'Select Seat'}
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="mt-6 p-4 bg-muted/30 rounded-lg">
          <h4 className="font-semibold text-sm mb-3">Seat Types</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded bg-green-100 dark:bg-green-900/30 border-2 border-green-500" />
              <span className="text-xs">Available</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded bg-gray-200 dark:bg-gray-700 border-2 border-gray-400" />
              <span className="text-xs">Occupied</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded bg-primary/20 border-2 border-primary" />
              <span className="text-xs">Selected</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded bg-yellow-100 dark:bg-yellow-900/30 border-2 border-yellow-500" />
              <span className="text-xs">Extra Legroom</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const renderSeatMapPopup = () => {
    if (!showSeatMapPopup || !currentPassengerForSeat) return null;

    const passenger = passengers.find(p => p.id === currentPassengerForSeat);
    const rows = Array.from(new Set(seats.map(s => s.row))).sort((a, b) => a - b);
    const columns = ['A', 'B', 'C', 'D', 'E', 'F'];

    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-card rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col"
        >
          {/* Header */}
          <div className="p-4 border-b border-border">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold">Select Your Seat</h2>
                <p className="text-xs text-muted-foreground mt-1">
                  {passenger?.firstName ? `${passenger.firstName} ${passenger.lastName}` : `Passenger ${passengers.findIndex(p => p.id === currentPassengerForSeat) + 1}`} • Economy Class
                </p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => {
                  setShowSeatMapPopup(false);
                  setCurrentPassengerForSeat(null);
                }}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Airplane Fuselage Container */}
          <div className="flex-1 overflow-y-auto p-4 bg-gradient-to-b from-sky-100 to-sky-50 dark:from-slate-900 dark:to-slate-800">
            <div className="max-w-md mx-auto">
              {/* Airplane Body with Seats */}
              <div className="relative bg-gradient-to-r from-slate-200 via-white to-slate-200 dark:from-slate-800 dark:via-slate-700 dark:to-slate-800 shadow-xl border-x-4 border-slate-300 dark:border-slate-600 rounded-t-lg rounded-b-lg">
                {/* Side Windows */}
                <div className="absolute left-0 top-0 bottom-0 w-2 flex flex-col gap-4 p-1">
                  {Array.from({ length: 15 }).map((_, i) => (
                    <div key={i} className="w-full h-6 bg-gradient-to-r from-blue-200 to-blue-100 dark:from-blue-900/40 dark:to-blue-800/40 rounded-sm" />
                  ))}
                </div>
                <div className="absolute right-0 top-0 bottom-0 w-2 flex flex-col gap-4 p-1">
                  {Array.from({ length: 15 }).map((_, i) => (
                    <div key={i} className="w-full h-6 bg-gradient-to-l from-blue-200 to-blue-100 dark:from-blue-900/40 dark:to-blue-800/40 rounded-sm" />
                  ))}
                </div>

                {/* Column Headers */}
                <div className="flex justify-center pt-3 pb-2">
                  <div className="flex gap-1.5">
                    {columns.map((col, idx) => (
                      <React.Fragment key={col}>
                        <div className="w-9 flex items-center justify-center text-[10px] font-bold text-slate-600 dark:text-slate-400">
                          {col}
                        </div>
                        {idx === 2 && <div className="w-6" />}
                      </React.Fragment>
                    ))}
                  </div>
                </div>

                {/* Seat Grid */}
                <div className="space-y-1.5 px-4 pb-4">
                  {rows.map((row) => {
                    const isBusinessClass = row <= 3;
                    
                    return (
                      <div key={row} className="relative">
                        {/* Business Class Divider */}
                        {row === 4 && (
                          <div className="flex items-center gap-2 py-2 mb-1">
                            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-slate-400 dark:via-slate-500 to-transparent" />
                            <span className="text-[10px] font-semibold text-slate-600 dark:text-slate-400 px-2 bg-slate-100 dark:bg-slate-800 rounded">
                              ECONOMY CLASS
                            </span>
                            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-slate-400 dark:via-slate-500 to-transparent" />
                          </div>
                        )}

                        <div className="flex justify-center items-center gap-1.5">
                          {/* Row Number */}
                          <div className="w-6 text-center text-[10px] font-semibold text-slate-500 dark:text-slate-400">
                            {row}
                          </div>

                          {/* Seats */}
                          <div className="flex gap-1.5">
                            {columns.map((col, idx) => {
                              const seat = seats.find(s => s.row === row && s.column === col);
                              if (!seat) return null;

                              const isSelected = seat.status === 'selected';
                              const isOccupied = seat.status === 'occupied';
                              const isAvailable = seat.status === 'available';
                              const isExtraLegroom = seat.comfort === 'extra-legroom';
                              const isLocked = isBusinessClass; // Lock all business class seats

                              return (
                                <React.Fragment key={col}>
                                  <button
                                    onClick={() => !isLocked && handleSeatSelection(seat, currentPassengerForSeat)}
                                    onMouseEnter={() => setHoveredSeat(seat)}
                                    onMouseLeave={() => setHoveredSeat(null)}
                                    disabled={isOccupied || isLocked}
                                    className={cn(
                                      "w-9 h-9 rounded-md transition-all relative group",
                                      "flex items-center justify-center text-[9px] font-semibold",
                                      "shadow-sm",
                                      isLocked && "bg-slate-300 dark:bg-slate-600 border-2 border-slate-400 dark:border-slate-500 cursor-not-allowed opacity-60",
                                      isOccupied && !isLocked && "bg-gray-300 dark:bg-gray-600 border-2 border-gray-400 cursor-not-allowed",
                                      isSelected && !isLocked && "bg-primary/30 border-2 border-primary shadow-lg scale-105",
                                      isAvailable && !isExtraLegroom && !isLocked && "bg-emerald-100 dark:bg-emerald-900/40 border-2 border-emerald-400 dark:border-emerald-600 hover:scale-110 hover:shadow-lg hover:border-emerald-500",
                                      isAvailable && isExtraLegroom && !isLocked && "bg-amber-100 dark:bg-amber-900/40 border-2 border-amber-400 dark:border-amber-600 hover:scale-110 hover:shadow-lg hover:border-amber-500"
                                    )}
                                  >
                                    {isLocked ? (
                                      <Lock className="h-3 w-3 text-slate-500 dark:text-slate-400" />
                                    ) : isOccupied ? (
                                      <User className="h-3 w-3 text-gray-500" />
                                    ) : isSelected ? (
                                      <Check className="h-4 w-4 text-primary" />
                                    ) : (
                                      <span>{seat.id}</span>
                                    )}

                                    {/* Tooltip */}
                                    {hoveredSeat?.id === seat.id && !isLocked && (
                                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 z-50 pointer-events-none">
                                        <div className="bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 px-2 py-1.5 rounded shadow-xl whitespace-nowrap text-[10px]">
                                          <p className="font-bold">Seat {seat.id}</p>
                                          <p className="opacity-90">{seat.position}</p>
                                          {seat.comfort === 'extra-legroom' && (
                                            <p className="text-amber-300 dark:text-amber-600 font-semibold">Extra Legroom +$25</p>
                                          )}
                                          {!seat.price && <p className="text-green-300 dark:text-green-600">Free</p>}
                                        </div>
                                      </div>
                                    )}
                                  </button>
                                  {idx === 2 && (
                                    <div className="w-6 flex items-center justify-center">
                                      <div className="w-full h-px bg-slate-300 dark:bg-slate-600" />
                                    </div>
                                  )}
                                </React.Fragment>
                              );
                            })}
                          </div>

                          {/* Row Number (right) */}
                          <div className="w-6 text-center text-[10px] font-semibold text-slate-500 dark:text-slate-400">
                            {row}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>
          </div>

          {/* Footer Legend */}
          <div className="p-4 border-t border-border bg-muted/20">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-md bg-emerald-100 dark:bg-emerald-900/40 border-2 border-emerald-400" />
                <div>
                  <p className="text-xs font-medium">Available</p>
                  <p className="text-[10px] text-muted-foreground">Free</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-md bg-amber-100 dark:bg-amber-900/40 border-2 border-amber-400" />
                <div>
                  <p className="text-xs font-medium">Extra Legroom</p>
                  <p className="text-[10px] text-muted-foreground">+$25</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-md bg-gray-300 dark:bg-gray-600 border-2 border-gray-400 flex items-center justify-center">
                  <User className="h-3 w-3 text-gray-500" />
                </div>
                <div>
                  <p className="text-xs font-medium">Occupied</p>
                  <p className="text-[10px] text-muted-foreground">Unavailable</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-md bg-slate-300 dark:bg-slate-600 border-2 border-slate-400 flex items-center justify-center">
                  <Lock className="h-3 w-3 text-slate-500" />
                </div>
                <div>
                  <p className="text-xs font-medium">Business Class</p>
                  <p className="text-[10px] text-muted-foreground">Not available</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    );
  };

  const renderCompactBaggageAllowance = () => (
    <Card>
      <CardHeader className="pb-4">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-blue-500/20 to-blue-600/10 dark:from-blue-500/30 dark:to-blue-600/20 flex items-center justify-center">
            <Luggage className="h-4 w-4 text-blue-600 dark:text-blue-400" />
          </div>
          <div className="flex-1">
            <CardTitle className="text-sm flex items-center gap-1.5">
              Baggage Allowance
              <Check className="h-3.5 w-3.5 text-green-600 dark:text-green-500" />
            </CardTitle>
            <p className="text-xs text-muted-foreground mt-0.5">Included with your ticket</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Standard Allowance - Visual Grid */}
        <div className="grid grid-cols-3 gap-2">
          <div className="text-center p-3 rounded-lg bg-gradient-to-b from-purple-50 to-purple-100/50 dark:from-purple-950/40 dark:to-purple-900/30 border border-purple-200 dark:border-purple-800/50">
            <Briefcase className="h-5 w-5 text-purple-600 dark:text-purple-400 mx-auto mb-1" />
            <p className="text-xs font-medium mb-0.5">Personal</p>
            <Badge variant="secondary" className="text-[10px] h-4 px-1.5 bg-purple-100 dark:bg-purple-900/50">Free</Badge>
          </div>
          
          <div className="text-center p-3 rounded-lg bg-gradient-to-b from-orange-50 to-orange-100/50 dark:from-orange-950/40 dark:to-orange-900/30 border border-orange-200 dark:border-orange-800/50">
            <Briefcase className="h-5 w-5 text-orange-600 dark:text-orange-400 mx-auto mb-1" />
            <p className="text-xs font-medium mb-0.5">Carry-on</p>
            <Badge variant="secondary" className="text-[10px] h-4 px-1.5 bg-orange-100 dark:bg-orange-900/50">7kg</Badge>
          </div>
          
          <div className="text-center p-3 rounded-lg bg-gradient-to-b from-green-50 to-green-100/50 dark:from-green-950/40 dark:to-green-900/30 border border-green-200 dark:border-green-800/50">
            <Luggage className="h-5 w-5 text-green-600 dark:text-green-400 mx-auto mb-1" />
            <p className="text-xs font-medium mb-0.5">Checked</p>
            <Badge variant="secondary" className="text-[10px] h-4 px-1.5 bg-green-100 dark:bg-green-900/50">30kg</Badge>
          </div>
        </div>
        
        <Separator />
        
        {/* Extra Baggage Section */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Plus className="h-3.5 w-3.5 text-primary" />
              <span className="text-sm font-semibold">Extra Baggage</span>
            </div>
            <Badge variant="outline" className="text-xs">Optional</Badge>
          </div>
          
          <div className="space-y-3">
            {passengers.map((passenger, index) => (
              <div key={passenger.id} className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-xs font-semibold text-primary">{index + 1}</span>
                  </div>
                  <span className="text-sm font-medium">Passenger {index + 1}</span>
                </div>
                
                {passenger.extraBaggage ? (
                  <div className="relative p-3 rounded-lg bg-gradient-to-br from-blue-50 to-blue-100/50 dark:from-blue-950/40 dark:to-blue-900/30 border border-blue-200 dark:border-blue-800/50">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removePassengerExtraBaggage(passenger.id)}
                      className="absolute top-2 right-2 h-6 w-6 p-0 hover:bg-destructive/10 dark:hover:bg-destructive/20"
                    >
                      <X className="h-3.5 w-3.5 text-destructive dark:text-red-400" />
                    </Button>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-blue-600/10 dark:bg-blue-500/20 flex items-center justify-center">
                        <Luggage className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-semibold">+{passenger.extraBaggage.weight}kg Added</p>
                        <p className="text-xs text-muted-foreground">Extra checked baggage</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-bold text-blue-600 dark:text-blue-400">US${passenger.extraBaggage.price}</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button 
                        variant="outline" 
                        className="w-full justify-start h-auto p-3 hover:bg-muted/50 hover:border-primary/50 transition-colors"
                      >
                        <div className="flex items-center gap-3 w-full">
                          <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                            <Plus className="h-5 w-5 text-muted-foreground" />
                          </div>
                          <div className="flex-1 text-left">
                            <p className="text-sm font-medium">Add extra baggage</p>
                            <p className="text-xs text-muted-foreground">Starting from $15</p>
                          </div>
                          <ChevronDown className="h-4 w-4 text-muted-foreground" />
                        </div>
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-72 p-3 bg-card dark:bg-card border-border" align="start">
                      <div className="space-y-2">
                        <h4 className="font-semibold text-sm mb-3">Select extra baggage weight</h4>
                        <div className="grid grid-cols-2 gap-2">
                          {extraBaggageOptions.map((option) => (
                            <Button
                              key={option.label}
                              variant="outline"
                              className="flex flex-col h-auto p-3 hover:bg-primary hover:text-primary-foreground hover:border-primary dark:hover:bg-primary dark:hover:text-primary-foreground transition-all"
                              onClick={() => {
                                updatePassengerExtraBaggage(passenger.id, option.weight, option.price);
                              }}
                            >
                              <span className="text-base font-bold">{option.label}</span>
                              <span className="text-xs opacity-80">US${option.price}</span>
                            </Button>
                          ))}
                        </div>
                      </div>
                    </PopoverContent>
                  </Popover>
                )}
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const renderPriceSummary = () => (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Price Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm">Tickets ({flightData.passengers} adult)</span>
              <span className="font-medium">US${flightData.basePrice}</span>
            </div>
            
            <div className="space-y-2">
              <p className="text-sm font-medium">Baggage</p>
              <div className="ml-4 space-y-1 text-sm text-muted-foreground">
                <div className="flex justify-between">
                  <span>Personal item</span>
                  <span>Free</span>
                </div>
                <div className="flex justify-between">
                  <span>Carry-on baggage</span>
                  <span>Free</span>
                </div>
                <div className="flex justify-between">
                  <span>Checked baggage</span>
                  <span>Free</span>
                </div>
                {passengers.some(p => p.extraBaggage) && (
                  <div className="flex justify-between">
                    <span>Extra baggage</span>
                    <span>US${passengers.reduce((sum, p) => sum + (p.extraBaggage?.price || 0), 0)}</span>
                  </div>
                )}
              </div>
            </div>
            
            {passengers.some(p => p.seatPrice && p.seatPrice > 0) && (
              <div className="space-y-2">
                <p className="text-sm font-medium">Seat Selection</p>
                <div className="ml-4 space-y-1 text-sm text-muted-foreground">
                  {passengers.filter(p => p.seatPrice && p.seatPrice > 0).map((p, idx) => (
                    <div key={p.id} className="flex justify-between">
                      <span>Passenger {passengers.indexOf(p) + 1} - Seat {p.seatNumber}</span>
                      <span>US${p.seatPrice}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            <div className="space-y-2">
              <p className="text-sm font-medium">Services</p>
              <div className="ml-4 space-y-1 text-sm text-muted-foreground">
                <div className="flex justify-between">
                  <span>Trip.com booking fee</span>
                  <span>US${flightData.taxes}</span>
                </div>
              </div>
            </div>
            
            {travelInsuranceSelected && (
              <div className="space-y-2">
                <p className="text-sm font-medium">Travel Insurance</p>
                <div className="ml-4 space-y-1 text-sm text-muted-foreground">
                  <div className="flex justify-between">
                    <span>Trip protection</span>
                    <span>US$6.25</span>
                  </div>
                </div>
              </div>
            )}
            
            {selectedVIPLounges.length > 0 && (
              <div className="space-y-2">
                <p className="text-sm font-medium">VIP Lounge Access</p>
                <div className="ml-4 space-y-1 text-sm text-muted-foreground">
                  {selectedVIPLounges.map(loungeId => {
                    const lounge = vipLounges.find(l => l.id === loungeId);
                    return lounge ? (
                      <div key={loungeId} className="flex justify-between">
                        <span>{lounge.location} Lounge</span>
                        <span>US${lounge.price.toFixed(2)}</span>
                      </div>
                    ) : null;
                  })}
                </div>
              </div>
            )}
            
            {selectedAddOns.length > 0 && (
              <div className="space-y-2">
                <p className="text-sm font-medium">Add-ons</p>
                <div className="ml-4 space-y-1 text-sm text-muted-foreground">
                  {selectedAddOns.map(addOnId => {
                    const addOn = mockAddOns.find(a => a.id === addOnId);
                    return addOn ? (
                      <div key={addOnId} className="flex justify-between">
                        <span>{addOn.title}</span>
                        <span>US${addOn.price}</span>
                      </div>
                    ) : null;
                  })}
                </div>
              </div>
            )}
            
            <Separator />
            
            <div className="flex justify-between text-lg font-bold">
              <span>Total</span>
              <span>US${calculateTotal().toFixed(2)}</span>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Compact Baggage Allowance - Only show on step 1 */}
      {currentStep === 1 && renderCompactBaggageAllowance()}
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Seat Map Popup */}
      <AnimatePresence>
        {renderSeatMapPopup()}
      </AnimatePresence>

      {/* Header - Only this stays sticky */}
      <div className="sticky top-0 z-50 bg-card/95 backdrop-blur-md border-b border-border shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" onClick={handleBack}>
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div>
                <h1 className="text-base font-semibold">Complete your booking</h1>
                <p className="text-xs text-muted-foreground">Secure & encrypted transaction</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="sm" className="hidden sm:flex">
                <HelpCircle className="h-4 w-4 mr-2" />
                Support
              </Button>
              <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-primary/10 rounded-lg">
                <span className="text-sm font-semibold">Total:</span>
                <span className="text-lg font-bold text-primary">US${calculateTotal().toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Indicator - Not sticky */}
      <div className="bg-card/50 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-center">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className="flex items-center gap-3">
                  <div className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors",
                    currentStep >= step.id
                      ? "bg-primary text-primary-foreground shadow-md"
                      : "bg-muted text-muted-foreground"
                  )}>
                    {currentStep > step.id ? <Check className="h-4 w-4" /> : step.id}
                  </div>
                  <div className="hidden sm:block">
                    <p className={cn(
                      "text-sm font-medium transition-colors",
                      currentStep >= step.id ? "text-foreground" : "text-muted-foreground"
                    )}>
                      {step.title}
                    </p>
                    <p className="text-xs text-muted-foreground">{step.description}</p>
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div className={cn(
                    "h-0.5 w-12 mx-4 transition-colors",
                    currentStep > step.id ? "bg-primary" : "bg-muted"
                  )} />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-5 pb-24 lg:pb-8">
            {renderFlightSummary()}
            
            {currentStep === 1 && (
              <>
                {renderPassengerDetails()}
                {renderContactDetails()}
                {renderCancellationPolicy()}
                {renderPromoCodes()}
              </>
            )}
            
            {currentStep === 2 && (
              <>
                {renderSeatSelection()}
              </>
            )}

            {currentStep === 3 && (
              <>
                {renderTravelInsurance()}
                {renderVIPLounges()}
                {renderAddOns()}
                {renderPromoCodes()}
              </>
            )}
            
            {currentStep === 4 && (
              <>
                <Card className="mb-6">
                  <CardHeader>
                    <CardTitle>Payment Method</CardTitle>
                    <p className="text-sm text-muted-foreground">Choose your preferred payment option</p>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {/* Credit/Debit Card */}
                      <div 
                        className={cn(
                          "border-2 rounded-lg p-4 cursor-pointer transition-all",
                          selectedPaymentMethod === 'card' ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
                        )}
                        onClick={() => setSelectedPaymentMethod('card')}
                      >
                        <div className="flex items-center gap-3 mb-3">
                          <div className={cn(
                            "w-5 h-5 rounded-full border-2 flex items-center justify-center",
                            selectedPaymentMethod === 'card' ? "border-primary bg-primary" : "border-muted-foreground"
                          )}>
                            {selectedPaymentMethod === 'card' && <Check className="h-3 w-3 text-primary-foreground" />}
                          </div>
                          <CreditCard className="h-5 w-5 text-primary" />
                          <span className="font-semibold">Credit/Debit Card</span>
                        </div>
                        {selectedPaymentMethod === 'card' && (
                          <div className="ml-8 space-y-3 mt-4">
                            <div>
                              <Label htmlFor="cardNumber">Card Number</Label>
                              <Input id="cardNumber" placeholder="1234 5678 9012 3456" className="mt-1" />
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                              <div>
                                <Label htmlFor="expiry">Expiry Date</Label>
                                <Input id="expiry" placeholder="MM/YY" className="mt-1" />
                              </div>
                              <div>
                                <Label htmlFor="cvv">CVV</Label>
                                <Input id="cvv" placeholder="123" className="mt-1" />
                              </div>
                            </div>
                            <div>
                              <Label htmlFor="cardName">Cardholder Name</Label>
                              <Input id="cardName" placeholder="Name on card" className="mt-1" />
                            </div>
                          </div>
                        )}
                      </div>

                      {/* UPI */}
                      <div 
                        className={cn(
                          "border-2 rounded-lg p-4 cursor-pointer transition-all",
                          selectedPaymentMethod === 'upi' ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
                        )}
                        onClick={() => setSelectedPaymentMethod('upi')}
                      >
                        <div className="flex items-center gap-3">
                          <div className={cn(
                            "w-5 h-5 rounded-full border-2 flex items-center justify-center",
                            selectedPaymentMethod === 'upi' ? "border-primary bg-primary" : "border-muted-foreground"
                          )}>
                            {selectedPaymentMethod === 'upi' && <Check className="h-3 w-3 text-primary-foreground" />}
                          </div>
                          <Globe className="h-5 w-5 text-primary" />
                          <span className="font-semibold">UPI</span>
                        </div>
                        {selectedPaymentMethod === 'upi' && (
                          <div className="ml-8 space-y-3 mt-4">
                            <div>
                              <Label htmlFor="upiId">UPI ID</Label>
                              <Input id="upiId" placeholder="yourname@upi" className="mt-1" />
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Net Banking */}
                      <div 
                        className={cn(
                          "border-2 rounded-lg p-4 cursor-pointer transition-all",
                          selectedPaymentMethod === 'netbanking' ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
                        )}
                        onClick={() => setSelectedPaymentMethod('netbanking')}
                      >
                        <div className="flex items-center gap-3">
                          <div className={cn(
                            "w-5 h-5 rounded-full border-2 flex items-center justify-center",
                            selectedPaymentMethod === 'netbanking' ? "border-primary bg-primary" : "border-muted-foreground"
                          )}>
                            {selectedPaymentMethod === 'netbanking' && <Check className="h-3 w-3 text-primary-foreground" />}
                          </div>
                          <Briefcase className="h-5 w-5 text-primary" />
                          <span className="font-semibold">Net Banking</span>
                        </div>
                        {selectedPaymentMethod === 'netbanking' && (
                          <div className="ml-8 space-y-3 mt-4">
                            <div>
                              <Label htmlFor="bank">Select Bank</Label>
                              <Select>
                                <SelectTrigger className="mt-1">
                                  <SelectValue placeholder="Choose your bank" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="hdfc">HDFC Bank</SelectItem>
                                  <SelectItem value="icici">ICICI Bank</SelectItem>
                                  <SelectItem value="sbi">State Bank of India</SelectItem>
                                  <SelectItem value="axis">Axis Bank</SelectItem>
                                  <SelectItem value="kotak">Kotak Mahindra Bank</SelectItem>
                                  <SelectItem value="pnb">Punjab National Bank</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Digital Wallets */}
                      <div 
                        className={cn(
                          "border-2 rounded-lg p-4 cursor-pointer transition-all",
                          selectedPaymentMethod === 'wallet' ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
                        )}
                        onClick={() => setSelectedPaymentMethod('wallet')}
                      >
                        <div className="flex items-center gap-3">
                          <div className={cn(
                            "w-5 h-5 rounded-full border-2 flex items-center justify-center",
                            selectedPaymentMethod === 'wallet' ? "border-primary bg-primary" : "border-muted-foreground"
                          )}>
                            {selectedPaymentMethod === 'wallet' && <Check className="h-3 w-3 text-primary-foreground" />}
                          </div>
                          <Wallet className="h-5 w-5 text-primary" />
                          <span className="font-semibold">Digital Wallets</span>
                        </div>
                        {selectedPaymentMethod === 'wallet' && (
                          <div className="ml-8 mt-4">
                            <div className="grid grid-cols-2 gap-3">
                              <Button variant="outline" className="h-12">
                                <img src="https://upload.wikimedia.org/wikipedia/commons/2/24/Paytm_Logo_%28standalone%29.svg" alt="Paytm" className="h-6" />
                                <span className="ml-2">Paytm</span>
                              </Button>
                              <Button variant="outline" className="h-12">
                                <span className="font-bold text-blue-600">PhonePe</span>
                              </Button>
                              <Button variant="outline" className="h-12">
                                <span className="font-bold text-purple-600">Google Pay</span>
                              </Button>
                              <Button variant="outline" className="h-12">
                                <span className="font-bold text-indigo-600">Amazon Pay</span>
                              </Button>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* PayPal */}
                      <div 
                        className={cn(
                          "border-2 rounded-lg p-4 cursor-pointer transition-all",
                          selectedPaymentMethod === 'paypal' ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
                        )}
                        onClick={() => setSelectedPaymentMethod('paypal')}
                      >
                        <div className="flex items-center gap-3">
                          <div className={cn(
                            "w-5 h-5 rounded-full border-2 flex items-center justify-center",
                            selectedPaymentMethod === 'paypal' ? "border-primary bg-primary" : "border-muted-foreground"
                          )}>
                            {selectedPaymentMethod === 'paypal' && <Check className="h-3 w-3 text-primary-foreground" />}
                          </div>
                          <Globe className="h-5 w-5 text-primary" />
                          <span className="font-semibold">PayPal</span>
                        </div>
                      </div>

                      {/* Apple Pay */}
                      <div 
                        className={cn(
                          "border-2 rounded-lg p-4 cursor-pointer transition-all",
                          selectedPaymentMethod === 'applepay' ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
                        )}
                        onClick={() => setSelectedPaymentMethod('applepay')}
                      >
                        <div className="flex items-center gap-3">
                          <div className={cn(
                            "w-5 h-5 rounded-full border-2 flex items-center justify-center",
                            selectedPaymentMethod === 'applepay' ? "border-primary bg-primary" : "border-muted-foreground"
                          )}>
                            {selectedPaymentMethod === 'applepay' && <Check className="h-3 w-3 text-primary-foreground" />}
                          </div>
                          <CreditCard className="h-5 w-5 text-primary" />
                          <span className="font-semibold">Apple Pay</span>
                        </div>
                      </div>

                      {/* Google Pay */}
                      <div 
                        className={cn(
                          "border-2 rounded-lg p-4 cursor-pointer transition-all",
                          selectedPaymentMethod === 'googlepay' ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
                        )}
                        onClick={() => setSelectedPaymentMethod('googlepay')}
                      >
                        <div className="flex items-center gap-3">
                          <div className={cn(
                            "w-5 h-5 rounded-full border-2 flex items-center justify-center",
                            selectedPaymentMethod === 'googlepay' ? "border-primary bg-primary" : "border-muted-foreground"
                          )}>
                            {selectedPaymentMethod === 'googlepay' && <Check className="h-3 w-3 text-primary-foreground" />}
                          </div>
                          <CreditCard className="h-5 w-5 text-primary" />
                          <span className="font-semibold">Google Pay</span>
                        </div>
                      </div>

                      {/* EMI */}
                      <div 
                        className={cn(
                          "border-2 rounded-lg p-4 cursor-pointer transition-all",
                          selectedPaymentMethod === 'emi' ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
                        )}
                        onClick={() => setSelectedPaymentMethod('emi')}
                      >
                        <div className="flex items-center gap-3">
                          <div className={cn(
                            "w-5 h-5 rounded-full border-2 flex items-center justify-center",
                            selectedPaymentMethod === 'emi' ? "border-primary bg-primary" : "border-muted-foreground"
                          )}>
                            {selectedPaymentMethod === 'emi' && <Check className="h-3 w-3 text-primary-foreground" />}
                          </div>
                          <CreditCard className="h-5 w-5 text-primary" />
                          <span className="font-semibold">EMI (Easy Installments)</span>
                          <Badge variant="secondary" className="ml-auto">0% Interest</Badge>
                        </div>
                        {selectedPaymentMethod === 'emi' && (
                          <div className="ml-8 space-y-3 mt-4">
                            <div>
                              <Label htmlFor="emiCard">Card Number</Label>
                              <Input id="emiCard" placeholder="Enter card number" className="mt-1" />
                            </div>
                            <div>
                              <Label htmlFor="emiTenure">Select Tenure</Label>
                              <Select>
                                <SelectTrigger className="mt-1">
                                  <SelectValue placeholder="Choose EMI tenure" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="3">3 Months - US${(calculateTotal() / 3).toFixed(2)}/month</SelectItem>
                                  <SelectItem value="6">6 Months - US${(calculateTotal() / 6).toFixed(2)}/month</SelectItem>
                                  <SelectItem value="9">9 Months - US${(calculateTotal() / 9).toFixed(2)}/month</SelectItem>
                                  <SelectItem value="12">12 Months - US${(calculateTotal() / 12).toFixed(2)}/month</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-start space-x-2">
                      <Checkbox
                        id="terms"
                        checked={termsAccepted}
                        onCheckedChange={(checked) => setTermsAccepted(checked as boolean)}
                      />
                      <Label htmlFor="terms" className="text-sm leading-relaxed">
                        I have read and agreed to the following booking terms and conditions:{' '}
                        <Button variant="link" size="sm" className="p-0 h-auto">
                          Flight Booking Policies
                        </Button>
                        ,{' '}
                        <Button variant="link" size="sm" className="p-0 h-auto">
                          Privacy Statement
                        </Button>
                        ,{' '}
                        <Button variant="link" size="sm" className="p-0 h-auto">
                          Cancellation and change policies
                        </Button>
                      </Label>
                    </div>
                  </CardContent>
                </Card>
              </>
            )}
          </div>

          {/* Price Summary Sidebar - Sticky on desktop only */}
          <div className="lg:col-span-1">
            <div className="lg:sticky lg:top-24 space-y-4">
              {renderPriceSummary()}
            </div>
          </div>
        </div>
      </div>

      {/* Simplified Bottom Navigation - Only on mobile */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-card/95 backdrop-blur-md border-t border-border shadow-lg">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-xs text-muted-foreground">Total Amount</p>
              <p className="text-lg font-bold">US${calculateTotal().toFixed(2)}</p>
            </div>
            
            <div className="flex items-center gap-2">
              {currentStep > 1 && (
                <Button variant="outline" size="sm" onClick={handleBack}>
                  Back
                </Button>
              )}
              <Button
                onClick={handleNext}
                disabled={isLoading}
                size="sm"
                className="min-w-24"
              >
                {isLoading ? (
                  <>
                    <RefreshCw className="h-3 w-3 mr-1 animate-spin" />
                    Loading...
                  </>
                ) : currentStep === 4 ? (
                  'Book'
                ) : (
                  'Next'
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Bottom Action - Clean and minimal */}
      <div className="hidden lg:block max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center justify-end gap-4">
          {currentStep > 1 && (
            <Button variant="outline" size="lg" onClick={handleBack}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
          )}
          <Button
            onClick={handleNext}
            disabled={isLoading}
            size="lg"
            className="min-w-40"
          >
            {isLoading ? (
              <>
                <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                Processing...
              </>
            ) : currentStep === 4 ? (
              <>
                Complete Booking
                <Check className="h-4 w-4 ml-2" />
              </>
            ) : (
              <>
                Next
                <ArrowRight className="h-4 w-4 ml-2" />
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
