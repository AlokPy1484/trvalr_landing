'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Header } from '@/components/layout/Header';
import { SubtleFooter } from '@/components/layout/SubtleFooter';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Label } from '@/components/ui/label';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import {
  MapPin,
  Clock,
  Users,
  Star,
  Heart,
  Share2,
  Calendar,
  Phone,
  DollarSign,
  Utensils,
  ChefHat,
  Leaf,
  Wifi,
  Car,
  Music,
  ChevronLeft,
  ChevronRight,
  MessageSquare,
  Award,
  CheckCircle2,
  Plus,
  Minus,
  Mail,
  Globe,
  Navigation,
  ExternalLink,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCurrency } from '@/contexts/CurrencyContext';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { getRestaurantById } from './restaurantData';

interface RestaurantDetailPageProps {
  restaurantId: string;
}

export function RestaurantDetailPage({ restaurantId }: RestaurantDetailPageProps) {
  const router = useRouter();
  const { selectedCurrency, currencyRates } = useCurrency();
  const [searchQuery, setSearchQuery] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const [restaurant, setRestaurant] = useState<any>(null);
  const [isSaved, setIsSaved] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedTime, setSelectedTime] = useState('7:00 PM');
  const [guests, setGuests] = useState(2);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [activeMenuSection, setActiveMenuSection] = useState('appetizers');
  const [selectedGalleryImage, setSelectedGalleryImage] = useState<string | null>(null);

  // Mock gallery images - restaurant ambiance and food
  const galleryImages = [
    { url: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=600&fit=crop', category: 'Interior' },
    { url: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&h=600&fit=crop', category: 'Food' },
    { url: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?w=800&h=600&fit=crop', category: 'Ambiance' },
    { url: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&h=600&fit=crop', category: 'Food' },
    { url: 'https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?w=800&h=600&fit=crop', category: 'Interior' },
    { url: 'https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=800&h=600&fit=crop', category: 'Food' },
    { url: 'https://images.unsplash.com/photo-1551218808-94e220e084d2?w=800&h=600&fit=crop', category: 'Ambiance' },
    { url: 'https://images.unsplash.com/photo-1537047902294-62a40c20a6ae?w=800&h=600&fit=crop', category: 'Food' },
  ];

  // Add images to menu items based on cuisine
  const getMenuItemImage = (itemName: string, section: string) => {
    const foodImages: Record<string, string> = {
      'appetizers': [
        'https://images.unsplash.com/photo-1541014741259-de529411b96a?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1608897013039-887f21d8c804?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1599974579688-8dbdd335c77f?w=400&h=300&fit=crop',
      ],
      'mains': [
        'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop',
      ],
      'desserts': [
        'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=300&fit=crop',
      ],
    };
    const hash = itemName.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const images = foodImages[section] || foodImages.mains;
    return images[hash % images.length];
  };

  useEffect(() => {
    const restaurantData = getRestaurantById(restaurantId);
    setRestaurant(restaurantData);
  }, [restaurantId]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Auto-scroll images every 5 seconds
  useEffect(() => {
    if (!restaurant) return;
    
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % restaurant.images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [restaurant]);

  if (!restaurant) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-2">Restaurant not found</h2>
          <Button onClick={() => router.push('/restaurants')}>
            Back to Restaurants
          </Button>
        </div>
      </div>
    );
  }

  const convertPrice = (priceInr: number): string => {
    const rate = currencyRates[selectedCurrency.code] || 1;
    const convertedPrice = priceInr * rate;
    return `${selectedCurrency.symbol}${convertedPrice.toFixed(0)}`;
  };

  const handleBookTable = () => {
    const params = new URLSearchParams();
    params.set('date', selectedDate ? format(selectedDate, 'yyyy-MM-dd') : '');
    params.set('time', selectedTime);
    params.set('guests', guests.toString());
    router.push(`/restaurants/${restaurantId}/book?${params.toString()}`);
  };

  const timeSlots = ['6:00 PM', '6:30 PM', '7:00 PM', '7:30 PM', '8:00 PM', '8:30 PM', '9:00 PM', '9:30 PM', '10:00 PM'];

  return (
    <div className="min-h-screen bg-background">
      <Header
        isScrolled={isScrolled}
        searchQuery={searchQuery}
        onSearchQueryChange={setSearchQuery}
        onSearchSubmit={() => {}}
        showCurrencySelector={true}
      />

      {/* Hero Section - Large Food Image */}
      <div className="relative h-[85vh] min-h-[600px] w-full overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentImageIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0"
          >
            <Image
              src={restaurant.images[currentImageIndex]}
              alt={restaurant.name}
              fill
              className="object-cover"
              priority
            />
          </motion.div>
        </AnimatePresence>
        
        {/* Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/30" />
        
        {/* Navigation */}
        <Button
          variant="secondary"
          className="absolute top-6 left-6 bg-white/10 backdrop-blur-md hover:bg-white/20 border-white/20 z-10"
          onClick={() => router.push('/restaurants')}
        >
          <ChevronLeft className="h-4 w-4 mr-2" />
          Back
        </Button>

        <div className="absolute top-6 right-6 flex gap-2 z-10">
          <Button
            variant="secondary"
            size="icon"
            className="bg-white/10 backdrop-blur-md hover:bg-white/20 border-white/20"
            onClick={() => setIsSaved(!isSaved)}
          >
            <Heart className={cn("h-5 w-5", isSaved && "fill-red-500 text-red-500")} />
          </Button>
          <Button
            variant="secondary"
            size="icon"
            className="bg-white/10 backdrop-blur-md hover:bg-white/20 border-white/20"
            onClick={() => navigator.share?.({ title: restaurant.name, url: window.location.href })}
          >
            <Share2 className="h-5 w-5" />
          </Button>
        </div>

        {/* Image Navigation */}
        <button
          onClick={() => setCurrentImageIndex((prev) => (prev - 1 + restaurant.images.length) % restaurant.images.length)}
          className="absolute left-6 top-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-md hover:bg-white/20 p-3 rounded-full transition-colors z-10"
        >
          <ChevronLeft className="h-6 w-6 text-white" />
        </button>
        <button
          onClick={() => setCurrentImageIndex((prev) => (prev + 1) % restaurant.images.length)}
          className="absolute right-6 top-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-md hover:bg-white/20 p-3 rounded-full transition-colors z-10"
        >
          <ChevronRight className="h-6 w-6 text-white" />
        </button>

        {/* Image Indicators */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {restaurant.images.map((_: any, index: number) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={cn(
                "h-2 rounded-full transition-all",
                currentImageIndex === index ? "w-8 bg-white" : "w-2 bg-white/50"
              )}
            />
          ))}
        </div>

        {/* Content Overlay - Bottom */}
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 text-white">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center gap-3 mb-4 flex-wrap">
              <Badge className="bg-primary text-primary-foreground text-sm px-3 py-1">
                {restaurant.cuisine}
              </Badge>
              <div className="flex items-center gap-1">
                <Star className="h-5 w-5 fill-amber-400 text-amber-400" />
                <span className="text-lg font-bold">{restaurant.rating}</span>
                <span className="text-white/70">({restaurant.reviewCount.toLocaleString()})</span>
              </div>
              <div className="flex items-center gap-1 text-white/80">
                <DollarSign className="h-4 w-4" />
                <span>{restaurant.priceRange}</span>
              </div>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-4 leading-tight">{restaurant.name}</h1>
            <p className="text-xl text-white/90 mb-6 max-w-2xl">{restaurant.description}</p>
            <div className="flex items-center gap-6 flex-wrap">
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                <span>{restaurant.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                <span>Open {restaurant.openTime} - {restaurant.closeTime}</span>
              </div>
              {restaurant.reservationsAvailable && (
                <Badge variant="secondary" className="bg-green-500/20 text-green-300 border-green-500/30">
                  <CheckCircle2 className="h-3 w-3 mr-1" />
                  Reservations Available
                </Badge>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Quick Info Bar */}
      <div className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-center gap-8 md:gap-16 flex-wrap text-sm">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-primary" />
              <span className="font-medium">{restaurant.openTime} - {restaurant.closeTime}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-primary" />
              <span className="font-medium">{restaurant.address}</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-primary" />
              <span className="font-medium">{restaurant.phone}</span>
            </div>
            <div className="flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-primary" />
              <span className="font-medium">Price Range: {restaurant.priceRange}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-[1fr_420px] gap-12">
          {/* Main Content */}
          <div>
            {/* Photo Gallery Section */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl font-bold">Photo Gallery</h2>
                <span className="text-sm text-muted-foreground">{galleryImages.length} photos</span>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {galleryImages.map((img, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05 }}
                    className="relative aspect-[4/3] rounded-lg overflow-hidden group cursor-pointer"
                    onClick={() => setSelectedGalleryImage(img.url)}
                  >
                    <Image
                      src={img.url}
                      alt={img.category}
                      fill
                      className="object-cover transition-transform group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <Badge className="absolute bottom-2 left-2 text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                      {img.category}
                    </Badge>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* About Section */}
            <Card className="p-8 mb-8 bg-gradient-to-br from-primary/5 to-accent/5">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <ChefHat className="h-6 w-6 text-primary" />
                    </div>
                    <h2 className="text-2xl font-bold">Our Story</h2>
                  </div>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    {restaurant.description}
                  </p>
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1">
                      <Award className="h-4 w-4 text-amber-500" />
                      <span className="font-medium">Award Winning</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-amber-500" />
                      <span className="font-medium">{restaurant.rating} Rating</span>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {restaurant.features.slice(0, 6).map((feature: string) => (
                    <div key={feature} className="flex items-center gap-2 p-3 bg-card rounded-lg shadow-sm">
                      <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0" />
                      <span className="text-sm font-medium">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Card>


            {/* Menu Section - Visual Cards with Images */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Utensils className="h-6 w-6 text-primary" />
                  </div>
                  <h2 className="text-3xl font-bold">Our Menu</h2>
                </div>
              </div>

              {/* Menu Tabs */}
              <div className="flex gap-2 mb-6 border-b border-border">
                {['appetizers', 'mains', 'desserts'].map((section) => (
                  <button
                    key={section}
                    onClick={() => setActiveMenuSection(section)}
                    className={cn(
                      "px-6 py-3 font-medium capitalize transition-all border-b-2 -mb-[1px]",
                      activeMenuSection === section
                        ? "border-primary text-primary bg-primary/5"
                        : "border-transparent text-muted-foreground hover:text-foreground hover:bg-muted/30"
                    )}
                  >
                    {section}
                  </button>
                ))}
              </div>

              {/* Menu Items - Grid with Images */}
              <div className="grid md:grid-cols-2 gap-6">
                {restaurant.menu[activeMenuSection]?.map((item: any, index: number) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.08 }}
                  >
                    <Card className="overflow-hidden group hover:shadow-lg transition-all cursor-pointer h-full">
                      <div className="relative h-48 overflow-hidden">
                        <Image
                          src={getMenuItemImage(item.name, activeMenuSection)}
                          alt={item.name}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        <div className="absolute top-3 right-3">
                          <Badge className="bg-primary text-primary-foreground font-bold text-base px-3 py-1">
                            {convertPrice(item.price * 100)}
                          </Badge>
                        </div>
                        {item.name.toLowerCase().includes('vegetarian') && (
                          <div className="absolute top-3 left-3">
                            <Badge className="bg-green-500 text-white">
                              <Leaf className="h-3 w-3 mr-1" />
                              Veg
                            </Badge>
                          </div>
                        )}
                      </div>
                      <div className="p-5">
                        <h4 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors">
                          {item.name}
                        </h4>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {item.description}
                        </p>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>

              {(!restaurant.menu[activeMenuSection] || restaurant.menu[activeMenuSection].length === 0) && (
                <Card className="p-12 text-center">
                  <Utensils className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">Menu items coming soon</p>
                </Card>
              )}
            </div>

            {/* Reviews Section - Compact Cards */}
            {restaurant.reviews && restaurant.reviews.length > 0 && (
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <MessageSquare className="h-6 w-6 text-primary" />
                  </div>
                  <h2 className="text-3xl font-bold">What Guests Say</h2>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  {restaurant.reviews.slice(0, 4).map((review: any) => (
                    <Card key={review.id} className="p-6 hover:shadow-md transition-shadow">
                      <div className="flex items-start gap-3 mb-3">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <span className="font-bold text-primary">{review.name.charAt(0)}</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold">{review.name}</h4>
                          <div className="flex items-center gap-2 mt-1">
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={cn(
                                    "h-3 w-3",
                                    i < review.rating ? "fill-amber-400 text-amber-400" : "text-gray-300"
                                  )}
                                />
                              ))}
                            </div>
                            <span className="text-xs text-muted-foreground">
                              {format(new Date(review.date), 'MMM yyyy')}
                            </span>
                          </div>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">
                        {review.comment}
                      </p>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Contact & Location Section - Full Width at Bottom */}
            <Card className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
                <h2 className="text-3xl font-bold">Contact & Location</h2>
              </div>
              <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                {/* Address with Google Maps */}
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm font-semibold mb-1">Address</p>
                    <p className="text-sm text-muted-foreground mb-2">{restaurant.address}</p>
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(restaurant.address)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
                    >
                      <Navigation className="h-3 w-3" />
                      Directions
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                </div>

                {/* Phone Number */}
                <div className="flex items-start gap-3">
                  <Phone className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm font-semibold mb-1">Phone</p>
                    <a 
                      href={`tel:${restaurant.phone}`}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {restaurant.phone}
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-3">
                  <Mail className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm font-semibold mb-1">Email</p>
                    <a 
                      href={`mailto:info@${restaurant.name.toLowerCase().replace(/\s+/g, '')}.com`}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors break-all"
                    >
                      info@{restaurant.name.toLowerCase().replace(/\s+/g, '')}.com
                    </a>
                  </div>
                </div>

                {/* Website */}
                <div className="flex items-start gap-3">
                  <Globe className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm font-semibold mb-1">Website</p>
                    <a 
                      href={`https://www.${restaurant.name.toLowerCase().replace(/\s+/g, '')}.com`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      Visit Site
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                </div>

                {/* Opening Hours */}
                <div className="flex items-start gap-3">
                  <Clock className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm font-semibold mb-1">Hours Today</p>
                    <p className="text-sm text-muted-foreground">
                      {restaurant.openTime} - {restaurant.closeTime}
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Sticky Booking Widget */}
          <div className="lg:sticky lg:top-24 h-fit">
            <Card className="p-6 shadow-xl border-2">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold mb-2">Reserve Your Table</h3>
                <p className="text-sm text-muted-foreground">Book in advance to secure your spot</p>
              </div>
              
              <div className="space-y-4 mb-6">
                <div>
                  <Label className="mb-2 block font-medium">Select Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start">
                        <Calendar className="mr-2 h-4 w-4" />
                        {selectedDate ? format(selectedDate, 'PPP') : 'Pick a date'}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <CalendarComponent
                        mode="single"
                        selected={selectedDate}
                        onSelect={setSelectedDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div>
                  <Label className="mb-2 block font-medium">Select Time</Label>
                  <Select value={selectedTime} onValueChange={setSelectedTime}>
                    <SelectTrigger>
                      <Clock className="mr-2 h-4 w-4" />
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {timeSlots.map((time) => (
                        <SelectItem key={time} value={time}>{time}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="mb-2 block font-medium">Number of Guests</Label>
                  <div className="flex items-center gap-3 p-3 border rounded-lg">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setGuests(Math.max(1, guests - 1))}
                      className="h-8 w-8"
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="flex-1 text-center font-semibold text-lg">{guests}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setGuests(guests + 1)}
                      className="h-8 w-8"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>

              <Separator className="my-6" />

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Est. per person</span>
                  <span className="font-semibold">{convertPrice(restaurant.priceInr)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">For {guests} {guests === 1 ? 'guest' : 'guests'}</span>
                  <span className="font-semibold">{convertPrice(restaurant.priceInr * guests)}</span>
                </div>
              </div>

              <Button 
                className="w-full" 
                size="lg"
                onClick={handleBookTable}
                disabled={!selectedDate || !selectedTime}
              >
                Reserve Now
              </Button>

              {restaurant.reservationsAvailable && (
                <p className="text-xs text-center text-muted-foreground mt-4 flex items-center justify-center gap-1">
                  <CheckCircle2 className="h-3 w-3 text-green-600" />
                  Instant confirmation available
                </p>
              )}
            </Card>

            {/* Opening Hours Card */}
            <Card className="p-6 mt-6">
              <h4 className="font-semibold mb-4 flex items-center gap-2">
                <Clock className="h-5 w-5 text-primary" />
                Opening Hours
              </h4>
              <div className="space-y-2 text-sm">
                {Object.entries(restaurant.hours).map(([day, hours]: [string, any]) => (
                  <div key={day} className="flex justify-between">
                    <span className="capitalize font-medium">{day}</span>
                    <span className="text-muted-foreground">{hours.open} - {hours.close}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>

      <SubtleFooter />

      {/* Gallery Lightbox */}
      <AnimatePresence>
        {selectedGalleryImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
            onClick={() => setSelectedGalleryImage(null)}
          >
            <Button
              variant="secondary"
              size="icon"
              className="absolute top-4 right-4 bg-white/10 backdrop-blur-md hover:bg-white/20"
              onClick={() => setSelectedGalleryImage(null)}
            >
              <ChevronLeft className="h-6 w-6 rotate-90" />
            </Button>
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="relative max-w-5xl w-full aspect-video"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={selectedGalleryImage}
                alt="Gallery"
                fill
                className="object-contain"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
