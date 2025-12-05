'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  MapPin,
  Star,
  Users,
  Bed,
  Bath,
  Wifi,
  Car,
  Coffee,
  Utensils,
  Waves,
  Dumbbell,
  Briefcase,
  Heart,
  Share2,
  Calendar,
  Clock,
  Shield,
  CheckCircle,
  X,
  ChevronLeft,
  ChevronRight,
  Phone,
  Mail,
  Globe,
  Camera,
  Map,
  Navigation,
  ShoppingBag,
  Star as StarIcon,
  ThumbsUp,
  MessageCircle,
  Filter,
  SortAsc
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DatePickerWithRange } from '@/components/ui/date-picker-with-range';
import { cn } from '@/lib/utils';
import { DateRange } from 'react-day-picker';

// Type definition for stay data
interface StayData {
  id: string;
  name: string;
  location: string;
  coordinates: { lat: number; lng: number };
  rating: number;
  reviewCount: number;
  price: number;
  originalPrice: number;
  images: string[];
  description: string;
  amenities: Array<{
    name: string;
    icon: React.ComponentType<any>;
    category: string;
  }>;
  uniqueFeatures: string[];
  houseRules: string[];
  roomTypes: Array<{
    id: string;
    name: string;
    description: string;
    price: number;
    originalPrice: number;
    maxGuests: number;
    size: string;
    bedType: string;
    amenities: string[];
    images: string[];
    available: boolean;
  }>;
  reviews: Array<{
    id: number;
    name: string;
    country: string;
    flag: string;
    rating: number;
    date: string;
    comment: string;
    helpful: number;
    avatar: string | null;
  }>;
  nearbyAttractions: Array<{
    name: string;
    distance: string;
    type: string;
  }>;
  contactInfo: {
    email: string;
    phone: string;
    website: string;
  };
}

// Mock data for the stay details
const mockStayData: StayData = {
  id: '1',
  name: 'Shutters on the Beach',
  location: '900 W Olympic Blvd, Los Angeles, CA 90015',
  coordinates: { lat: 34.0195, lng: -118.4912 },
  rating: 4.8,
  reviewCount: 256,
  price: 750,
  originalPrice: 850,
  images: [
    'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&q=80',
    'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=600&q=80',
    'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&h=600&q=80',
    'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800&h=600&q=80',
    'https://images.unsplash.com/photo-1595576508898-0ad5c879a061?w=800&h=600&q=80'
  ],
  description: 'Known as the "Pink Palace," this hotel has been an icon of glamour and luxury since its opening in 1912. Frequented by celebrities, dignitaries, and discerning travelers from around the world.',
  amenities: [
    { name: 'Free WiFi', icon: Wifi, category: 'Internet' },
    { name: 'Parking', icon: Car, category: 'Transportation' },
    { name: 'Restaurant', icon: Utensils, category: 'Dining' },
    { name: 'Coffee Shop', icon: Coffee, category: 'Dining' },
    { name: 'Pool', icon: Waves, category: 'Recreation' },
    { name: 'Fitness Center', icon: Dumbbell, category: 'Wellness' },
    { name: 'Business Center', icon: Briefcase, category: 'Business' },
    { name: 'Spa Services', icon: Heart, category: 'Wellness' },
    { name: 'Room Service', icon: Utensils, category: 'Dining' },
    { name: 'Concierge', icon: Users, category: 'Services' }
  ],
  uniqueFeatures: [
    'Known as the "Pink Palace," the hotel has been an icon of glamour and luxury since its opening in 1912',
    'Frequented by celebrities, dignitaries, and discerning travelers from around the world',
    'Historic bungalows offer a private retreat with a rich history, having hosted numerous famous guests over the years',
    'The hotel\'s design combines classic Hollywood elegance with modern comforts, maintaining a timeless charm',
    'Some rooms offer private balconies or patios with garden or city views'
  ],
  contactInfo: {
    email: 'reservations@shuttersonthebeach.com',
    phone: '+1 (310) 276-2251',
    website: 'shuttersonthebeach.com'
  },
  policies: {
    checkIn: '3:00 PM',
    checkOut: '11:00 AM',
    cancellation: 'Free cancellation up to 24 hours before check-in',
    pets: 'Pets allowed with additional fee',
    smoking: 'Non-smoking property'
  },
  houseRules: [
    'No smoking anywhere on the property',
    'Quiet hours from 10 PM to 7 AM',
    'No parties or events without prior approval',
    'Maximum occupancy must not exceed room capacity',
    'Check-in age requirement: 21 years or older',
    'Valid government-issued ID required at check-in',
    'No cooking in rooms (except designated kitchenettes)',
    'Respect other guests and maintain appropriate noise levels',
    'Report any damages immediately to front desk',
    'Follow all posted safety guidelines and emergency procedures'
  ],
  roomTypes: [
    {
      id: 'deluxe-ocean-view',
      name: 'Deluxe Ocean View',
      description: 'Spacious room with stunning ocean views and modern amenities',
      price: 750,
      originalPrice: 850,
      maxGuests: 2,
      size: '450 sq ft',
      bedType: '1 King Bed',
      amenities: ['Ocean View', 'Balcony', 'Mini Bar', 'Coffee Maker', 'Safe', 'Free WiFi'],
      images: [
        'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&q=80',
        'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=600&q=80',
        'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&h=600&q=80',
        'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800&h=600&q=80'
      ],
      available: true
    },
    {
      id: 'premium-suite',
      name: 'Premium Suite',
      description: 'Luxurious suite with separate living area and premium finishes',
      price: 1200,
      originalPrice: 1400,
      maxGuests: 4,
      size: '800 sq ft',
      bedType: '1 King Bed + Sofa Bed',
      amenities: ['Separate Living Area', 'Kitchenette', 'Dining Table', 'Premium Toiletries', 'Room Service', 'Concierge'],
      images: [
        'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&h=600&q=80',
        'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800&h=600&q=80',
        'https://images.unsplash.com/photo-1595576508898-0ad5c879a061?w=800&h=600&q=80',
        'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&q=80'
      ],
      available: true
    },
    {
      id: 'standard-room',
      name: 'Standard Room',
      description: 'Comfortable room with city views and essential amenities',
      price: 450,
      originalPrice: 550,
      maxGuests: 2,
      size: '300 sq ft',
      bedType: '1 Queen Bed',
      amenities: ['City View', 'Work Desk', 'Free WiFi', 'Coffee Maker', 'Safe'],
      images: [
        'https://images.unsplash.com/photo-1595576508898-0ad5c879a061?w=800&h=600&q=80',
        'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&q=80',
        'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=600&q=80'
      ],
      available: true
    },
    {
      id: 'penthouse',
      name: 'Penthouse Suite',
      description: 'Ultimate luxury with panoramic views and exclusive amenities',
      price: 2500,
      originalPrice: 3000,
      maxGuests: 6,
      size: '1500 sq ft',
      bedType: '1 King Bed + 2 Twin Beds',
      amenities: ['Panoramic Views', 'Private Terrace', 'Full Kitchen', 'Dining Room', 'Butler Service', 'Private Elevator'],
      images: [
        'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&q=80',
        'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&h=600&q=80',
        'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800&h=600&q=80',
        'https://images.unsplash.com/photo-1595576508898-0ad5c879a061?w=800&h=600&q=80',
        'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=600&q=80'
      ],
      available: false
    }
  ],
  nearbyAttractions: [
    { name: 'Santa Monica Pier', distance: '0.2 miles', type: 'attraction' },
    { name: 'Third Street Promenade', distance: '0.3 miles', type: 'shopping' },
    { name: 'Venice Beach', distance: '0.8 miles', type: 'beach' },
    { name: 'Getty Villa', distance: '2.1 miles', type: 'museum' },
    { name: 'Rodeo Drive', distance: '3.5 miles', type: 'shopping' }
  ],
  reviews: [
    {
      id: 1,
      name: 'Riki',
      country: 'India',
      flag: '🇮🇳',
      rating: 5,
      date: '2024-01-15',
      comment: 'Very spacious room. Well maintained. Staffs are all very cooperative.',
      helpful: 12,
      avatar: null
    },
    {
      id: 2,
      name: 'Klavs',
      country: 'Denmark',
      flag: '🇩🇰',
      rating: 5,
      date: '2024-01-10',
      comment: 'Excellent service from all the staff. They were both kind and helpful. Spacious rooms, internet works well, there is plenty if hot water, great food (room service dinner), Central in the city, but a bit of distance from the river, markets etc....',
      helpful: 8,
      avatar: null
    },
    {
      id: 3,
      name: 'Mylavarapu',
      country: 'India',
      flag: '🇮🇳',
      rating: 5,
      date: '2024-01-05',
      comment: 'Serene location and easy access to other parts of varanasi, Very clean and hygiene',
      helpful: 15,
      avatar: null
    },
    {
      id: 4,
      name: 'Alex Thompson',
      country: 'United States',
      flag: '🇺🇸',
      rating: 4,
      date: '2024-01-20',
      comment: 'Great location and friendly staff. The breakfast was amazing and the room was very clean.',
      helpful: 6,
      avatar: null
    },
    {
      id: 5,
      name: 'Maria Garcia',
      country: 'Spain',
      flag: '🇪🇸',
      rating: 5,
      date: '2024-01-18',
      comment: 'Perfect stay! The hotel exceeded our expectations. Beautiful views and excellent service.',
      helpful: 9,
      avatar: null
    },
    {
      id: 6,
      name: 'James Wilson',
      country: 'United Kingdom',
      flag: '🇬🇧',
      rating: 4,
      date: '2024-01-12',
      comment: 'Comfortable rooms and great amenities. The staff was very helpful throughout our stay.',
      helpful: 7,
      avatar: null
    }
  ]
};

export function StayDetailsClient({ stayId }: { stayId: string }) {
  const router = useRouter();
  const stay = mockStayData; // In real app, fetch by stayId
  
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFavorited, setIsFavorited] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  const [checkInDate, setCheckInDate] = useState<Date | undefined>(new Date());
  const [checkOutDate, setCheckOutDate] = useState<Date | undefined>(new Date(Date.now() + 7 * 24 * 60 * 60 * 1000));
  const [guests, setGuests] = useState(2);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [selectedRoomType, setSelectedRoomType] = useState(stay.roomTypes[0].id);
  const [selectedRoomTypes, setSelectedRoomTypes] = useState<{[roomId: string]: number}>({[stay.roomTypes[0].id]: 1});
  const [showRoomDetails, setShowRoomDetails] = useState<string | null>(null);
  const [showRoomModal, setShowRoomModal] = useState<string | null>(null);
  const [currentRoomImageIndex, setCurrentRoomImageIndex] = useState(0);
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);
  const [showAllReviews, setShowAllReviews] = useState(false);

  const dateRange: DateRange = {
    from: checkInDate,
    to: checkOutDate
  };

  const handleImageNavigation = (direction: 'prev' | 'next') => {
    if (direction === 'prev') {
      setCurrentImageIndex(prev => prev === 0 ? stay.images.length - 1 : prev - 1);
    } else {
      setCurrentImageIndex(prev => prev === stay.images.length - 1 ? 0 : prev + 1);
    }
  };

  const handleRoomImageNavigation = (direction: 'prev' | 'next', roomImages: string[]) => {
    if (direction === 'prev') {
      setCurrentRoomImageIndex(prev => prev === 0 ? roomImages.length - 1 : prev - 1);
    } else {
      setCurrentRoomImageIndex(prev => prev === roomImages.length - 1 ? 0 : prev + 1);
    }
  };

  const openRoomModal = (roomId: string) => {
    setShowRoomModal(roomId);
    setCurrentRoomImageIndex(0);
  };

  const closeRoomModal = () => {
    setShowRoomModal(null);
    setCurrentRoomImageIndex(0);
  };

  const handleReviewNavigation = (direction: 'prev' | 'next') => {
    const totalReviews = stay.reviews.length;
    const visibleReviews = 3; // Show 3 reviews at a time
    const maxIndex = Math.max(0, totalReviews - visibleReviews);
    
    if (direction === 'prev') {
      setCurrentReviewIndex(Math.max(0, currentReviewIndex - 1));
    } else {
      setCurrentReviewIndex(Math.min(maxIndex, currentReviewIndex + 1));
    }
  };

  const getVisibleReviews = () => {
    return stay.reviews.slice(currentReviewIndex, currentReviewIndex + 3);
  };

  const calculateTotalRoomCapacity = () => {
    return Object.entries(selectedRoomTypes).reduce((total, [roomId, quantity]) => {
      const room = stay.roomTypes.find(r => r.id === roomId);
      return total + ((room?.maxGuests || 0) * quantity);
    }, 0);
  };

  const canAccommodateGuests = () => {
    return calculateTotalRoomCapacity() >= guests;
  };

  const handleRoomSelection = (roomId: string, action: 'add' | 'remove' | 'set') => {
    const room = stay.roomTypes.find(r => r.id === roomId);
    if (!room || !room.available) return;

    setSelectedRoomTypes(prev => {
      const currentQuantity = prev[roomId] || 0;
      let newQuantity = currentQuantity;

      switch (action) {
        case 'add':
          newQuantity = currentQuantity + 1;
          break;
        case 'remove':
          newQuantity = Math.max(0, currentQuantity - 1);
          break;
        case 'set':
          newQuantity = currentQuantity > 0 ? 0 : 1;
          break;
      }

      if (newQuantity === 0) {
        const { [roomId]: removed, ...rest } = prev;
        return rest;
      } else {
        return { ...prev, [roomId]: newQuantity };
      }
    });
  };

  const getRecommendedRooms = () => {
    const availableRooms = stay.roomTypes.filter(room => room.available);
    const sortedRooms = availableRooms.sort((a, b) => a.maxGuests - b.maxGuests);
    
    const recommended: {[roomId: string]: number} = {};
    let remainingGuests = guests;
    
    for (const room of sortedRooms) {
      if (remainingGuests <= 0) break;
      
      const roomsNeeded = Math.ceil(remainingGuests / room.maxGuests);
      const maxPossible = Math.min(roomsNeeded, 5); // Limit to 5 rooms of same type
      
      if (maxPossible > 0) {
        recommended[room.id] = maxPossible;
        remainingGuests -= room.maxGuests * maxPossible;
      }
    }
    
    return recommended;
  };

  const handleGuestsChange = (value: number) => {
    setGuests(value);
    
    // Auto-suggest rooms if current selection can't accommodate
    if (value > calculateTotalRoomCapacity()) {
      const recommended = getRecommendedRooms();
      if (Object.keys(recommended).length > 0) {
        setSelectedRoomTypes(recommended);
      }
    }
  };

  const calculateTotalPrice = () => {
    if (!checkInDate || !checkOutDate) {
      return Object.entries(selectedRoomTypes).reduce((total, [roomId, quantity]) => {
        const room = stay.roomTypes.find(r => r.id === roomId);
        return total + ((room?.price || 0) * quantity);
      }, 0);
    }
    const nights = Math.ceil((checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24));
    return Object.entries(selectedRoomTypes).reduce((total, [roomId, quantity]) => {
      const room = stay.roomTypes.find(r => r.id === roomId);
      return total + ((room?.price || 0) * quantity * nights);
    }, 0);
  };

  const selectedRoom = stay.roomTypes.find(room => room.id === selectedRoomType);
  const selectedRooms = Object.entries(selectedRoomTypes).map(([roomId, quantity]) => {
    const room = stay.roomTypes.find(r => r.id === roomId);
    return { room, quantity };
  }).filter(item => item.room);

  const totalPrice = calculateTotalPrice();
  const discount = Math.round(totalPrice * 0.1);
  const serviceFee = Math.round(totalPrice * 0.12);
  const finalTotal = totalPrice - discount + serviceFee;

  return (
    <div className="min-h-screen bg-background">
      {/* Header with Back Button */}
      <div className="sticky top-16 z-40 bg-background/95 backdrop-blur-lg border-b border-border">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={() => router.back()}
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to search results
            </Button>
            
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsFavorited(!isFavorited)}
                className={cn(
                  "flex items-center gap-2",
                  isFavorited && "text-red-500 border-red-500"
                )}
              >
                <Heart className={cn("h-4 w-4", isFavorited && "fill-current")} />
                {isFavorited ? 'Saved' : 'Save'}
              </Button>
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <Share2 className="h-4 w-4" />
                Share
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Image Gallery */}
            <Card className="overflow-hidden">
              <div className="relative">
                <div className="relative h-64 sm:h-80 lg:h-96 overflow-hidden">
                  <img
                    src={stay.images[currentImageIndex]}
                    alt={stay.name}
                    className="w-full h-full object-cover cursor-pointer"
                    onClick={() => setShowImageModal(true)}
                  />
                  
                  {/* Navigation Arrows */}
                  <Button
                    variant="outline"
                    size="icon"
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background"
                    onClick={() => handleImageNavigation('prev')}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background"
                    onClick={() => handleImageNavigation('next')}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>

                  {/* Image Counter */}
                  <div className="absolute bottom-4 right-4 bg-background/80 px-3 py-1 rounded-full text-sm">
                    {currentImageIndex + 1} / {stay.images.length}
                  </div>
                </div>

                {/* Thumbnail Strip */}
                <div className="p-4 bg-muted/30">
                  <div className="flex gap-2 overflow-x-auto">
                    {stay.images.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={cn(
                          "flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all",
                          currentImageIndex === index 
                            ? "border-primary" 
                            : "border-transparent hover:border-border"
                        )}
                      >
                        <img
                          src={image}
                          alt={`${stay.name} ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </Card>

            {/* Basic Information */}
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-6">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h1 className="text-3xl font-bold text-foreground">{stay.name}</h1>
                      <div className="flex items-center gap-1">
                        {[...Array(3)].map((_, i) => (
                          <Star className="h-5 w-5 text-amber-400 fill-amber-400" key={i} />
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center gap-4 text-muted-foreground mb-4">
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        <span className="text-sm">{stay.location}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-amber-400 fill-amber-400" />
                        <span className="text-sm font-medium">{stay.rating}</span>
                        <span className="text-sm">({stay.reviewCount} reviews)</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-primary">${stay.price}</div>
                    <div className="text-sm text-muted-foreground line-through">${stay.originalPrice}</div>
                    <div className="text-sm text-muted-foreground">per night</div>
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                  <div className="flex items-center gap-2 text-sm">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span>{guests} guests</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Bed className="h-4 w-4 text-muted-foreground" />
                    <span>1 bedroom</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Bath className="h-4 w-4 text-muted-foreground" />
                    <span>1 private bath</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Wifi className="h-4 w-4 text-muted-foreground" />
                    <span>Free WiFi</span>
                  </div>
                </div>

                <p className="text-muted-foreground leading-relaxed">{stay.description}</p>
              </CardContent>
            </Card>

            {/* Amenities */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Amenities</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {stay.amenities.map((amenity, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <amenity.icon className="h-5 w-5 text-primary" />
                      <span className="text-sm">{amenity.name}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Room Types Selection */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-xl">Select Your Room{Object.keys(selectedRoomTypes).length > 1 ? 's' : ''}</CardTitle>
                    <p className="text-sm text-muted-foreground">Choose from our available room types and configurations</p>
                  </div>
                  {Object.keys(selectedRoomTypes).length > 0 && (
                    <div className="text-right">
                      <div className="text-sm font-medium text-primary">
                        {Object.values(selectedRoomTypes).reduce((sum, qty) => sum + qty, 0)} room{Object.values(selectedRoomTypes).reduce((sum, qty) => sum + qty, 0) > 1 ? 's' : ''} selected
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Capacity: {calculateTotalRoomCapacity()} guests
                      </div>
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                {/* Room Recommendation */}
                {!canAccommodateGuests() && guests > 0 && (
                  <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="flex items-start gap-3">
                      <Users className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-blue-800 mb-1">Room Recommendation</h4>
                        <p className="text-sm text-blue-700 mb-3">
                          For {guests} guests, we recommend selecting multiple rooms or a larger room type.
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {Object.entries(getRecommendedRooms()).map(([roomId, quantity]) => {
                            const room = stay.roomTypes.find(r => r.id === roomId);
                            return room ? (
                              <Button
                                key={roomId}
                                variant="outline"
                                size="sm"
                                onClick={() => setSelectedRoomTypes(getRecommendedRooms())}
                                className="text-xs text-blue-700 border-blue-300 hover:bg-blue-100"
                              >
                                {room.name} × {quantity}
                              </Button>
                            ) : null;
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <div className="space-y-4">
                  {stay.roomTypes.map((room) => (
                    <motion.div
                      key={room.id}
                      className={cn(
                        "border rounded-lg p-4 transition-all",
                        selectedRoomTypes[room.id] > 0
                          ? "border-primary bg-primary/5" 
                          : "border-border hover:border-primary/50",
                        !room.available && "opacity-50 cursor-not-allowed"
                      )}
                      onClick={() => room.available && openRoomModal(room.id)}
                      whileHover={room.available ? { scale: 1.02 } : {}}
                      whileTap={room.available ? { scale: 0.98 } : {}}
                    >
                      <div className="flex flex-col lg:flex-row gap-4">
                        {/* Room Image */}
                        <div className="relative w-full lg:w-48 h-48 lg:h-32 rounded-lg overflow-hidden flex-shrink-0">
                          <img
                            src={room.images[0]}
                            alt={room.name}
                            className="w-full h-full object-cover"
                          />
                          {!room.available && (
                            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                              <span className="text-white font-semibold">Not Available</span>
                            </div>
                          )}
                        </div>

                        {/* Room Details */}
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 mb-3">
                            <div>
                              <h3 className="font-semibold text-lg">{room.name}</h3>
                              <p className="text-sm text-muted-foreground mb-2">{room.description}</p>
                              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                                <div className="flex items-center gap-1">
                                  <Users className="h-4 w-4" />
                                  <span>Up to {room.maxGuests} guests</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Bed className="h-4 w-4" />
                                  <span>{room.bedType}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <span className="font-medium">{room.size}</span>
                                </div>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-2xl font-bold text-primary">${room.price}</div>
                              <div className="text-sm text-muted-foreground line-through">${room.originalPrice}</div>
                              <div className="text-sm text-muted-foreground">per night</div>
                            </div>
                          </div>

                          {/* Room Amenities */}
                          <div className="flex flex-wrap gap-2 mb-3">
                            {room.amenities.slice(0, 4).map((amenity, index) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                {amenity}
                              </Badge>
                            ))}
                            {room.amenities.length > 4 && (
                              <Badge variant="outline" className="text-xs">
                                +{room.amenities.length - 4} more
                              </Badge>
                            )}
                          </div>

                          {/* Action Buttons */}
                          <div className="flex gap-2 items-center">
                            {selectedRoomTypes[room.id] > 0 ? (
                              <div className="flex items-center gap-2 flex-1">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleRoomSelection(room.id, 'remove');
                                  }}
                                  disabled={!room.available}
                                  className="h-8 w-8 p-0"
                                >
                                  -
                                </Button>
                                <span className="text-sm font-medium min-w-[2rem] text-center">
                                  {selectedRoomTypes[room.id]}
                                </span>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleRoomSelection(room.id, 'add');
                                  }}
                                  disabled={!room.available}
                                  className="h-8 w-8 p-0"
                                >
                                  +
                                </Button>
                                <span className="text-xs text-muted-foreground ml-2">
                                  room{selectedRoomTypes[room.id] > 1 ? 's' : ''}
                                </span>
                              </div>
                            ) : (
                              <Button
                                variant="outline"
                                size="sm"
                                disabled={!room.available}
                                className="flex-1 sm:flex-none"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleRoomSelection(room.id, 'set');
                                }}
                              >
                                Add Room
                              </Button>
                            )}
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation();
                                setShowRoomDetails(showRoomDetails === room.id ? null : room.id);
                              }}
                              disabled={!room.available}
                            >
                              {showRoomDetails === room.id ? "Hide Details" : "View Details"}
                            </Button>
                          </div>

                          {/* Expanded Room Details */}
                          <AnimatePresence>
                            {showRoomDetails === room.id && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="mt-4 pt-4 border-t border-border overflow-hidden"
                              >
                                <div className="space-y-4">
                                  <div>
                                    <h4 className="font-semibold mb-2">Room Amenities</h4>
                                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                                      {room.amenities.map((amenity, index) => (
                                        <div key={index} className="flex items-center gap-2 text-sm">
                                          <CheckCircle className="h-4 w-4 text-primary" />
                                          <span>{amenity}</span>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                  
                                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                      <h4 className="font-semibold mb-2">Room Features</h4>
                                      <div className="space-y-1 text-sm text-muted-foreground">
                                        <div>• {room.bedType}</div>
                                        <div>• {room.size}</div>
                                        <div>• Maximum {room.maxGuests} guests</div>
                                      </div>
                                    </div>
                                    <div>
                                      <h4 className="font-semibold mb-2">Pricing</h4>
                                      <div className="space-y-1 text-sm">
                                        <div className="flex justify-between">
                                          <span>Regular Price:</span>
                                          <span className="line-through">${room.originalPrice}</span>
                                        </div>
                                        <div className="flex justify-between font-semibold">
                                          <span>Current Price:</span>
                                          <span className="text-primary">${room.price}</span>
                                        </div>
                                        <div className="flex justify-between text-green-600">
                                          <span>You Save:</span>
                                          <span>${room.originalPrice - room.price}</span>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Unique Features */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Unique Features</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {stay.uniqueFeatures.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* House Rules */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">House Rules</CardTitle>
                <p className="text-sm text-muted-foreground">Please review and follow these guidelines during your stay</p>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {stay.houseRules.map((rule, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0 mt-2" />
                      <span className="text-sm text-muted-foreground">{rule}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
                  <div className="flex items-start gap-3">
                    <Shield className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-amber-800 mb-1">Important Notice</h4>
                      <p className="text-sm text-amber-700">
                        Violation of house rules may result in additional charges or immediate termination of your stay. 
                        Please contact the front desk if you have any questions about these policies.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>


            {/* Reviews */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Guests who stayed here loved</CardTitle>
              </CardHeader>
              <CardContent>
                {!showAllReviews ? (
                  <div className="space-y-6">
                    {/* Horizontal Scrolling Reviews */}
                    <div className="relative">
                      <div className="flex gap-4 overflow-hidden">
                        {getVisibleReviews().map((review) => (
                          <div key={review.id} className="flex-shrink-0 w-80 bg-card border border-border rounded-lg p-4 shadow-sm">
                            <div className="flex items-start gap-3 mb-3">
                              {/* Avatar */}
                              <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                                {review.avatar ? (
                                  <img 
                                    src={review.avatar} 
                                    alt={review.name}
                                    className="w-10 h-10 rounded-full object-cover"
                                  />
                                ) : (
                                  <span className="text-sm font-semibold text-muted-foreground">
                                    {review.name.charAt(0)}
                                  </span>
                                )}
                              </div>
                              
                              {/* Name and Country */}
                              <div className="flex-1 min-w-0">
                                <h4 className="font-semibold text-foreground truncate">{review.name}</h4>
                                <div className="flex items-center gap-1 mt-1">
                                  <span className="text-lg">{review.flag}</span>
                                  <span className="text-sm text-muted-foreground">{review.country}</span>
                                </div>
                              </div>
                            </div>
                            
                            {/* Review Text */}
                            <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                              "{review.comment}"
                            </p>
                            
                            {/* Read More Link */}
                            <Button variant="link" className="p-0 h-auto text-primary text-sm">
                              Read more
                            </Button>
                          </div>
                        ))}
                      </div>
                      
                      {/* Navigation Buttons */}
                      <Button
                        variant="outline"
                        size="icon"
                        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 bg-background shadow-lg border-border hover:bg-muted"
                        onClick={() => handleReviewNavigation('prev')}
                        disabled={currentReviewIndex === 0}
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </Button>
                      
                      <Button
                        variant="outline"
                        size="icon"
                        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 bg-background shadow-lg border-border hover:bg-muted"
                        onClick={() => handleReviewNavigation('next')}
                        disabled={currentReviewIndex >= stay.reviews.length - 3}
                      >
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    {/* Read All Reviews Button */}
                    <div className="flex justify-center">
                      <Button
                        variant="outline"
                        className="border-blue-600 text-primary hover:bg-blue-50"
                        onClick={() => setShowAllReviews(true)}
                      >
                        Read all reviews
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {/* All Reviews List */}
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold">All Reviews</h3>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setShowAllReviews(false)}
                      >
                        <ChevronLeft className="h-4 w-4 mr-1" />
                        Back to Summary
                      </Button>
                    </div>
                    
                    <div className="space-y-6">
                      {stay.reviews.map((review) => (
                        <div key={review.id} className="border-b border-border pb-6 last:border-b-0">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex items-start gap-3">
                              {/* Avatar */}
                              <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                                {review.avatar ? (
                                  <img 
                                    src={review.avatar} 
                                    alt={review.name}
                                    className="w-10 h-10 rounded-full object-cover"
                                  />
                                ) : (
                                  <span className="text-sm font-semibold text-muted-foreground">
                                    {review.name.charAt(0)}
                                  </span>
                                )}
                              </div>
                              
                              <div>
                                <h4 className="font-semibold">{review.name}</h4>
                                <div className="flex items-center gap-2 mt-1">
                                  <span className="text-lg">{review.flag}</span>
                                  <span className="text-sm text-muted-foreground">{review.country}</span>
                                  <div className="flex items-center gap-1">
                                    {[...Array(5)].map((_, i) => (
                                      <StarIcon
                                        key={i}
                                        className={cn(
                                          "h-4 w-4",
                                          i < review.rating ? "text-amber-400 fill-amber-400" : "text-muted-foreground"
                                        )}
                                      />
                                    ))}
                                  </div>
                                  <span className="text-sm text-muted-foreground">{review.date}</span>
                                </div>
                              </div>
                            </div>
                            <Button variant="ghost" size="sm" className="text-muted-foreground">
                              <ThumbsUp className="h-4 w-4 mr-1" />
                              {review.helpful}
                            </Button>
                          </div>
                          <p className="text-muted-foreground text-sm leading-relaxed ml-12">{review.comment}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Map Section */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Hotel Location</CardTitle>
                <p className="text-sm text-muted-foreground">See where the hotel is located on the map</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Map Container */}
                  <div className="relative h-80 w-full rounded-lg overflow-hidden border border-border">
                    <img
                      src={`https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/pin-s-l+000(${stay.coordinates.lng},${stay.coordinates.lat})/${stay.coordinates.lng},${stay.coordinates.lat},14,0/800x400@2x?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw`}
                      alt="Hotel location map"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                      <div className="bg-white/90 backdrop-blur-sm rounded-lg p-4 text-center">
                        <MapPin className="h-6 w-6 text-primary mx-auto mb-2" />
                        <p className="font-semibold text-sm">{stay.name}</p>
                        <p className="text-xs text-muted-foreground">{stay.location}</p>
                      </div>
                    </div>
                  </div>

                  {/* Map Actions */}
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button 
                      variant="outline" 
                      className="flex-1"
                      onClick={() => window.open(`https://www.google.com/maps/search/?api=1&query=${stay.coordinates.lat},${stay.coordinates.lng}`, '_blank')}
                    >
                      <Map className="h-4 w-4 mr-2" />
                      Open in Google Maps
                    </Button>
                    <Button 
                      variant="outline" 
                      className="flex-1"
                      onClick={() => window.open(`https://www.apple.com/maps/?q=${stay.coordinates.lat},${stay.coordinates.lng}`, '_blank')}
                    >
                      <Navigation className="h-4 w-4 mr-2" />
                      Open in Apple Maps
                    </Button>
                  </div>

                  {/* Location Details */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-border">
                    <div>
                      <h4 className="font-semibold mb-2">Address</h4>
                      <p className="text-sm text-muted-foreground">{stay.location}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Coordinates</h4>
                      <p className="text-sm text-muted-foreground">
                        {stay.coordinates.lat}, {stay.coordinates.lng}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Location & Nearby */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Nearby Attractions</CardTitle>
                <p className="text-sm text-muted-foreground">Popular places to visit near the hotel</p>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {stay.nearbyAttractions.map((attraction, index) => (
                    <div key={index} className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-card to-muted/30 border border-border/50 p-4 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 hover:border-primary/30">
                      {/* Background Pattern */}
                      <div className="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity">
                        <div className="absolute top-0 right-0 w-16 h-16 bg-primary/20 rounded-full blur-xl"></div>
                        <div className="absolute bottom-0 left-0 w-12 h-12 bg-accent/30 rounded-full blur-lg"></div>
                      </div>

                      <div className="relative flex items-start gap-4">
                        {/* Icon */}
                        <div className="flex-shrink-0">
                          <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-primary/10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                            {attraction.type === 'beach' && <Waves className="h-6 w-6 text-primary" />}
                            {attraction.type === 'museum' && <Briefcase className="h-6 w-6 text-primary" />}
                            {attraction.type === 'shopping' && <ShoppingBag className="h-6 w-6 text-primary" />}
                            {attraction.type === 'restaurant' && <Utensils className="h-6 w-6 text-primary" />}
                            {attraction.type === 'attraction' && <Camera className="h-6 w-6 text-primary" />}
                          </div>
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between mb-2">
                            <div className="min-w-0 flex-1">
                              <h4 className="font-semibold text-foreground truncate group-hover:text-primary transition-colors">
                                {attraction.name}
                              </h4>
                              <div className="flex items-center gap-2 mt-1">
                                <Badge variant="secondary" className="text-xs px-2 py-0.5 capitalize bg-muted/80 text-muted-foreground">
                                  {attraction.type}
                                </Badge>
                                <span className="text-sm font-medium text-primary">
                                  {attraction.distance}
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* Action Button */}
                          <Button
                            variant="ghost"
                            size="sm"
                            className="w-full mt-3 h-8 text-xs bg-background/50 hover:bg-primary hover:text-primary-foreground border border-border/30 hover:border-primary/50 transition-all duration-200 group-hover:shadow-sm"
                            onClick={() => window.open(`https://www.google.com/maps/search/?api=1&query=${attraction.name}`, '_blank')}
                          >
                            <Navigation className="h-3 w-3 mr-1" />
                            Get Directions
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Contact Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-primary" />
                    <span className="text-sm">{stay.contactInfo.email}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-primary" />
                    <span className="text-sm">{stay.contactInfo.phone}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Globe className="h-5 w-5 text-primary" />
                    <span className="text-sm">{stay.contactInfo.website}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-32">
              <Card className="shadow-lg">
                <CardHeader>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-2xl font-bold text-primary">${selectedRoom?.price || stay.price}</div>
                        <div className="text-sm text-muted-foreground">per night</div>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-amber-400 fill-amber-400" />
                        <span className="font-semibold">{stay.rating}</span>
                        <span className="text-sm text-muted-foreground">({stay.reviewCount})</span>
                      </div>
                    </div>
                    
                    {/* Selected Rooms */}
                    {selectedRooms.length > 0 && (
                      <div className="p-3 bg-primary/5 rounded-lg border border-primary/20">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold text-sm">
                            {Object.values(selectedRoomTypes).reduce((sum, qty) => sum + qty, 0)} Room{Object.values(selectedRoomTypes).reduce((sum, qty) => sum + qty, 0) > 1 ? 's' : ''} Selected
                          </h4>
                          <Badge variant="secondary" className="text-xs">
                            {calculateTotalRoomCapacity()} guests
                          </Badge>
                        </div>
                        <div className="space-y-2">
                          {selectedRooms.map(({ room, quantity }, index) => (
                            <div key={room?.id || index} className="text-xs text-muted-foreground">
                              <div className="font-medium flex items-center justify-between">
                                <span>{room?.name}</span>
                                <span className="text-primary font-semibold">×{quantity}</span>
                              </div>
                              <div>• {room?.bedType} • {room?.maxGuests} guests • {room?.size}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Date Selection */}
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm font-medium">Check-in</label>
                      <DatePickerWithRange 
                        date={dateRange} 
                        onSelectDate={(range) => {
                          if (range?.from) setCheckInDate(range.from);
                          if (range?.to) setCheckOutDate(range.to);
                        }} 
                      />
                    </div>
                  </div>

                  {/* Room Type Selection */}
                  <div>
                    <label className="text-sm font-medium">Room Type</label>
                    <Select value={selectedRoomType} onValueChange={setSelectedRoomType}>
                      <SelectTrigger>
                        <Bed className="h-4 w-4 mr-2" />
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {stay.roomTypes.filter(room => room.available).map((room) => (
                          <SelectItem key={room.id} value={room.id}>
                            <div className="flex items-center justify-between w-full">
                              <span>{room.name}</span>
                              <span className="ml-2 text-sm text-muted-foreground">${room.price}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Guest Selection */}
                  <div>
                    <label className="text-sm font-medium">Number of Guests</label>
                    <div className="relative">
                      <Users className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        type="number"
                        min="1"
                        max="20"
                        value={guests}
                        onChange={(e) => handleGuestsChange(parseInt(e.target.value) || 1)}
                        className="pl-10"
                        placeholder="Enter number of guests"
                      />
                    </div>
                    {!canAccommodateGuests() && (
                      <div className="mt-2 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                        <div className="flex items-start gap-2">
                          <Users className="h-4 w-4 text-amber-600 flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="text-xs text-amber-800 font-medium">
                              Current rooms can accommodate {calculateTotalRoomCapacity()} guests
                            </p>
                            <p className="text-xs text-amber-700 mt-1">
                              Select additional rooms or reduce guest count to {calculateTotalRoomCapacity()}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                    {canAccommodateGuests() && Object.keys(selectedRoomTypes).length > 0 && (
                      <div className="mt-2 p-3 bg-green-50 border border-green-200 rounded-lg">
                        <div className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="text-xs text-green-800 font-medium">
                              {Object.values(selectedRoomTypes).reduce((sum, qty) => sum + qty, 0)} room{Object.values(selectedRoomTypes).reduce((sum, qty) => sum + qty, 0) > 1 ? 's' : ''} selected
                            </p>
                            <p className="text-xs text-green-700 mt-1">
                              Total capacity: {calculateTotalRoomCapacity()} guests
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Reserve Button */}
                  <Button 
                    className="w-full h-12 text-lg font-semibold"
                    onClick={() => router.push('/booking')}
                    disabled={!canAccommodateGuests()}
                  >
                    <Shield className="h-5 w-5 mr-2" />
                    {!canAccommodateGuests() ? 'Select More Rooms' : 'Reserve'}
                  </Button>

                  {/* Price Breakdown */}
                  <div className="space-y-2 pt-4 border-t border-border">
                    {selectedRooms.map(({ room, quantity }, index) => (
                      <div key={room?.id || index} className="flex justify-between text-sm">
                        <span>{room?.name} × {quantity} room{quantity > 1 ? 's' : ''} × {checkInDate && checkOutDate ? Math.ceil((checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24)) : 1} nights</span>
                        <span>${(room?.price || 0) * quantity} × {checkInDate && checkOutDate ? Math.ceil((checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24)) : 1}</span>
                      </div>
                    ))}
                    <div className="flex justify-between text-sm font-medium">
                      <span>Subtotal</span>
                      <span>${totalPrice}</span>
                    </div>
                    <div className="flex justify-between text-sm text-green-600">
                      <span>10% discount</span>
                      <span>-${discount}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Service fee</span>
                      <span>${serviceFee}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between font-semibold">
                      <span>Total</span>
                      <span>${finalTotal}</span>
                    </div>
                  </div>

                  {/* Policies */}
                  <div className="text-xs text-muted-foreground space-y-1">
                    <div className="flex items-center gap-2">
                      <Clock className="h-3 w-3" />
                      <span>Check-in: {stay.policies.checkIn}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-3 w-3" />
                      <span>Check-out: {stay.policies.checkOut}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Shield className="h-3 w-3" />
                      <span>{stay.policies.cancellation}</span>
                    </div>
                  </div>

                  <Button variant="link" className="p-0 h-auto text-xs text-muted-foreground">
                    Report this property
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Image Modal */}
      <AnimatePresence>
        {showImageModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            onClick={() => setShowImageModal(false)}
          >
            <div className="relative max-w-4xl max-h-[90vh] w-full">
              <img
                src={stay.images[currentImageIndex]}
                alt={stay.name}
                className="w-full h-full object-contain rounded-lg"
                onClick={(e) => e.stopPropagation()}
              />
              <Button
                variant="outline"
                size="icon"
                className="absolute top-4 right-4 bg-background/80"
                onClick={() => setShowImageModal(false)}
              >
                <X className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-background/80"
                onClick={(e) => {
                  e.stopPropagation();
                  handleImageNavigation('prev');
                }}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-background/80"
                onClick={(e) => {
                  e.stopPropagation();
                  handleImageNavigation('next');
                }}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Room Details Modal */}
      <AnimatePresence>
        {showRoomModal && (() => {
          const room = stay.roomTypes.find(r => r.id === showRoomModal);
          if (!room) return null;
          
          return (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
              onClick={closeRoomModal}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="relative max-w-6xl max-h-[90vh] w-full bg-background rounded-lg overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Modal Header */}
                <div className="flex items-center justify-between p-6 border-b border-border">
                  <div>
                    <h2 className="text-2xl font-bold">{room.name}</h2>
                    <p className="text-muted-foreground">{room.description}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="text-3xl font-bold text-primary">${room.price}</div>
                      <div className="text-sm text-muted-foreground line-through">${room.originalPrice}</div>
                      <div className="text-sm text-muted-foreground">per night</div>
                    </div>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={closeRoomModal}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Modal Content */}
                <div className="p-6 max-h-[calc(90vh-120px)] overflow-y-auto">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Room Images */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">Room Gallery</h3>
                      <div className="relative">
                        <div className="relative h-80 rounded-lg overflow-hidden">
                          <img
                            src={room.images[currentRoomImageIndex]}
                            alt={`${room.name} ${currentRoomImageIndex + 1}`}
                            className="w-full h-full object-cover"
                          />
                          
                          {/* Navigation Arrows */}
                          {room.images.length > 1 && (
                            <>
                              <Button
                                variant="outline"
                                size="icon"
                                className="absolute left-4 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background"
                                onClick={() => handleRoomImageNavigation('prev', room.images)}
                              >
                                <ChevronLeft className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="outline"
                                size="icon"
                                className="absolute right-4 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background"
                                onClick={() => handleRoomImageNavigation('next', room.images)}
                              >
                                <ChevronRight className="h-4 w-4" />
                              </Button>
                            </>
                          )}

                          {/* Image Counter */}
                          <div className="absolute bottom-4 right-4 bg-background/80 px-3 py-1 rounded-full text-sm">
                            {currentRoomImageIndex + 1} / {room.images.length}
                          </div>
                        </div>

                        {/* Thumbnail Strip */}
                        {room.images.length > 1 && (
                          <div className="flex gap-2 overflow-x-auto mt-4">
                            {room.images.map((image, index) => (
                              <button
                                key={index}
                                onClick={() => setCurrentRoomImageIndex(index)}
                                className={cn(
                                  "flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all",
                                  currentRoomImageIndex === index 
                                    ? "border-primary" 
                                    : "border-transparent hover:border-border"
                                )}
                              >
                                <img
                                  src={image}
                                  alt={`${room.name} ${index + 1}`}
                                  className="w-full h-full object-cover"
                                />
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Room Details */}
                    <div className="space-y-6">
                      {/* Room Features */}
                      <div>
                        <h3 className="text-lg font-semibold mb-4">Room Features</h3>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="flex items-center gap-2">
                            <Users className="h-5 w-5 text-primary" />
                            <span className="text-sm">Up to {room.maxGuests} guests</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Bed className="h-5 w-5 text-primary" />
                            <span className="text-sm">{room.bedType}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium">{room.size}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-green-600 font-medium">
                              Save ${room.originalPrice - room.price}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Room Amenities */}
                      <div>
                        <h3 className="text-lg font-semibold mb-4">Room Amenities</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {room.amenities.map((amenity, index) => (
                            <div key={index} className="flex items-center gap-2">
                              <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                              <span className="text-sm">{amenity}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Pricing Details */}
                      <div>
                        <h3 className="text-lg font-semibold mb-4">Pricing Details</h3>
                        <div className="space-y-2 p-4 bg-muted/30 rounded-lg">
                          <div className="flex justify-between text-sm">
                            <span>Regular Price:</span>
                            <span className="line-through">${room.originalPrice}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Current Price:</span>
                            <span className="font-semibold text-primary">${room.price}</span>
                          </div>
                          <div className="flex justify-between text-sm text-green-600">
                            <span>You Save:</span>
                            <span className="font-semibold">${room.originalPrice - room.price}</span>
                          </div>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-3 pt-4">
                        <Button
                          variant={selectedRoomTypes[room.id] > 0 ? "default" : "outline"}
                          onClick={() => {
                            handleRoomSelection(room.id, 'set');
                            closeRoomModal();
                          }}
                          className="flex-1"
                        >
                          {selectedRoomTypes[room.id] > 0 ? `Selected (×${selectedRoomTypes[room.id]})` : "Select This Room"}
                        </Button>
                        <Button
                          variant="outline"
                          onClick={closeRoomModal}
                        >
                          Close
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          );
        })()}
      </AnimatePresence>
    </div>
  );
}
