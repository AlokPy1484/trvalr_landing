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
import { Input } from '@/components/ui/input';
import {
  MapPin,
  Clock,
  Users,
  Star,
  Heart,
  Share2,
  Calendar,
  Check,
  X,
  Info,
  ChevronLeft,
  Zap,
  Shield,
  MessageSquare,
  ChevronRight,
  Plane,
  Car,
  Hotel,
  UtensilsCrossed,
  Camera,
  Map,
  Award,
  Globe,
  Plus,
  Minus,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCurrency } from '@/contexts/CurrencyContext';
import { cn } from '@/lib/utils';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';

interface ActivityDetailPageProps {
  activityId: string;
}

// Mock activity data - replace with API call
const getActivityById = (id: string) => {
  const activities = {
    'act-1': {
      id: 'act-1',
      title: 'Sunset Desert Safari with BBQ Dinner',
      shortDescription: 'Experience the thrill of dune bashing, camel riding, and traditional entertainment',
      fullDescription: 'Embark on an unforgettable desert adventure with our Sunset Safari experience. Start with exhilarating dune bashing in a 4x4 vehicle, followed by a peaceful camel ride as the sun sets over the golden dunes. Enjoy traditional entertainment including belly dancing, Tanoura shows, and fire performances. Cap off your evening with a delicious BBQ dinner under the stars in an authentic Bedouin-style camp.',
      category: 'Adventure',
      location: 'Dubai Desert Conservation Reserve, Dubai',
      venue: 'Desert Safari Camp',
      duration: '6 hours',
      priceInr: 4500,
      rating: 4.8,
      reviewCount: 2847,
      images: [
        'https://images.unsplash.com/photo-1451337516015-6b6e9a44a8a3?w=1200&h=800&fit=crop',
        'https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?w=1200&h=800&fit=crop',
        'https://images.unsplash.com/photo-1512408919737-a096dcf4d64b?w=1200&h=800&fit=crop',
        'https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=1200&h=800&fit=crop',
      ],
      highlights: [
        'Thrilling dune bashing in 4x4 vehicle',
        'Sunset camel riding experience',
        'Traditional belly dance and Tanoura shows',
        'Fire performance entertainment',
        'BBQ dinner with unlimited soft drinks',
        'Henna painting for ladies',
        'Shisha smoking area',
        'Traditional Arabic costumes for photos',
      ],
      included: [
        'Hotel pickup and drop-off in 4x4 vehicle',
        'Professional safari guide',
        'Dune bashing (30 minutes)',
        'Camel riding',
        'Sand boarding',
        'BBQ dinner buffet',
        'Unlimited soft drinks, water, tea, coffee',
        'Live entertainment shows',
        'Henna painting',
        'Insurance',
      ],
      notIncluded: [
        'Alcoholic beverages',
        'Quad biking (available at extra cost)',
        'Personal expenses',
        'Gratuities',
      ],
      meetingPoint: 'Hotel pickup from anywhere in Dubai',
      startTimes: ['3:00 PM', '3:30 PM', '4:00 PM'],
      minParticipants: 2,
      maxParticipants: 40,
      instantConfirmation: true,
      freeCancellation: true,
      cancellationPolicy: 'Free cancellation up to 24 hours before the activity starts. No refund for cancellations made within 24 hours.',
      languages: ['English', 'Arabic', 'Hindi', 'Urdu'],
      ageRestriction: 'Children under 3 years are not permitted. Pregnant women cannot participate in dune bashing.',
      tags: ['Bestseller', 'Adventure', 'Family Friendly', 'Sunset'],
      provider: 'Desert Adventures LLC',
      schedule: [
        { time: '3:00 PM - 3:30 PM', activity: 'Hotel pickup' },
        { time: '4:00 PM - 4:30 PM', activity: 'Dune bashing' },
        { time: '4:30 PM - 5:30 PM', activity: 'Camel riding and sandboarding' },
        { time: '5:30 PM - 6:00 PM', activity: 'Watch the sunset' },
        { time: '6:00 PM - 6:30 PM', activity: 'Henna painting and photos' },
        { time: '6:30 PM - 8:00 PM', activity: 'BBQ dinner and live shows' },
        { time: '8:00 PM - 9:00 PM', activity: 'Return to hotel' },
      ],
      importantInfo: [
        'Wear comfortable clothes and closed shoes',
        'Bring sunglasses and sunscreen',
        'Camera recommended for stunning sunset photos',
        'Not recommended for people with back problems',
        'Pregnant women cannot join dune bashing',
        'Children must be accompanied by adults',
      ],
      reviews: [
        {
          id: 1,
          name: 'Sarah Johnson',
          rating: 5,
          date: '2025-10-15',
          comment: 'Absolutely amazing experience! The dune bashing was thrilling and the sunset was breathtaking. Dinner was delicious and the entertainment was authentic. Highly recommend!',
          helpful: 45,
        },
        {
          id: 2,
          name: 'Mohammed Al-Rashid',
          rating: 5,
          date: '2025-10-10',
          comment: 'Perfect evening in the desert. Our guide was knowledgeable and friendly. The camel ride was peaceful and the BBQ dinner exceeded expectations. Worth every dirham!',
          helpful: 32,
        },
        {
          id: 3,
          name: 'Emma Wilson',
          rating: 4,
          date: '2025-10-05',
          comment: 'Great experience overall. The dune bashing was exciting, though a bit intense for young children. Entertainment was excellent and food was good. Would do it again!',
          helpful: 28,
        },
      ],
      availableDates: [
        { date: '2025-11-05', slots: ['3:00 PM', '3:30 PM', '4:00 PM'], available: true },
        { date: '2025-11-06', slots: ['3:00 PM', '3:30 PM', '4:00 PM'], available: true },
        { date: '2025-11-07', slots: ['3:00 PM', '3:30 PM'], available: true },
        { date: '2025-11-08', slots: ['3:00 PM', '4:00 PM'], available: true },
      ],
    },
  };

  return activities[id as keyof typeof activities] || null;
};

export function ActivityDetailPage({ activityId }: ActivityDetailPageProps) {
  const router = useRouter();
  const { selectedCurrency, currencyRates } = useCurrency();
  const [searchQuery, setSearchQuery] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const [activity, setActivity] = useState<any>(null);
  const [isSaved, setIsSaved] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [participants, setParticipants] = useState(2);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState(-1);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    const activityData = getActivityById(activityId);
    setActivity(activityData);
    
    if (activityData?.availableDates?.[0]) {
      setSelectedDate(activityData.availableDates[0].date);
      setSelectedTime(activityData.availableDates[0].slots[0]);
    }
  }, [activityId]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Auto-scroll images every 5 seconds
  useEffect(() => {
    if (!activity) return;
    
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => {
        const next = prev >= activity.images.length - 1 ? 0 : prev + 1;
        return next;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [activity]);

  if (!activity) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-2">Activity not found</h2>
          <Button onClick={() => router.push('/activities')}>
            Back to Activities
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

  const subtotal = activity.priceInr * participants;
  const serviceFee = subtotal * 0.05; // 5% service fee
  const totalPrice = subtotal + serviceFee;

  const handleBookNow = () => {
    router.push(
      `/activities/${activityId}/book?date=${selectedDate}&time=${selectedTime}&participants=${participants}`
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <Header
        isScrolled={isScrolled}
        searchQuery={searchQuery}
        onSearchQueryChange={setSearchQuery}
        onSearchSubmit={() => {}}
        showCurrencySelector={true}
      />

      {/* Hero Section with Image Carousel */}
      <div className="relative h-[60vh] min-h-[500px] w-full overflow-hidden group">
        {/* Image Carousel */}
        <div className="absolute inset-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentImageIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7 }}
              className="relative w-full h-full"
            >
              <Image
                src={activity.images[currentImageIndex]}
                alt={activity.title}
                fill
                className="object-cover"
                priority
              />
            </motion.div>
          </AnimatePresence>
        </div>
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70 pointer-events-none" />
        
        {/* Image Navigation Buttons */}
        <button
          onClick={() => {
            const prevIndex = currentImageIndex <= 0 ? activity.images.length - 1 : currentImageIndex - 1;
            setCurrentImageIndex(prevIndex);
          }}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full p-3 transition-all opacity-0 group-hover:opacity-100 z-10"
        >
          <ChevronLeft className="h-6 w-6 text-white" />
        </button>
        <button
          onClick={() => {
            const nextIndex = currentImageIndex >= activity.images.length - 1 ? 0 : currentImageIndex + 1;
            setCurrentImageIndex(nextIndex);
          }}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full p-3 transition-all opacity-0 group-hover:opacity-100 z-10"
        >
          <ChevronRight className="h-6 w-6 text-white" />
        </button>

        {/* Image Indicators */}
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {activity.images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={cn(
                'h-2 rounded-full transition-all',
                index === currentImageIndex
                  ? 'w-8 bg-white'
                  : 'w-2 bg-white/50 hover:bg-white/75'
              )}
            />
          ))}
        </div>
        
        {/* Hero Content */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center max-w-4xl mx-auto"
            >
              {/* Category Badge */}
              <Badge className="mb-4 bg-primary/90 backdrop-blur-sm text-primary-foreground border-0 px-4 py-1.5">
                {activity.category}
              </Badge>
              
              {/* Title */}
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
                {activity.title}
              </h1>
              
              {/* Meta Info */}
              <div className="flex items-center justify-center gap-6 text-white/90 text-sm md:text-base flex-wrap mb-8">
                <div className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  <span>{activity.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  <span>{activity.duration}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="h-5 w-5 fill-amber-400 text-amber-400" />
                  <span className="font-semibold">{activity.rating}</span>
                  <span className="text-white/70">({activity.reviewCount.toLocaleString()})</span>
                </div>
              </div>

              {/* Action Button */}
              <div className="flex items-center justify-center">
                <Button
                  size="lg"
                  className="h-12 px-8 text-base bg-primary hover:bg-primary/90 shadow-lg"
                  onClick={() => {
                    const bookingSection = document.getElementById('booking-section');
                    bookingSection?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  Book Now
                  <ChevronRight className="h-5 w-5 ml-2" />
                </Button>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Back Button - Floating */}
        <div className="absolute top-4 left-4">
          <Button
            variant="outline"
            className="bg-white/10 hover:bg-white/20 text-white border-white/30 backdrop-blur-md"
            onClick={() => router.push('/activities')}
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
        </div>

        {/* Share & Save Buttons - Floating */}
        <div className="absolute top-4 right-4 flex gap-2">
          <Button
            variant="outline"
            size="icon"
            className="bg-white/10 hover:bg-white/20 text-white border-white/30 backdrop-blur-md"
            onClick={() => setIsSaved(!isSaved)}
          >
            <Heart
              className={cn(
                'h-5 w-5',
                isSaved && 'fill-red-500 text-red-500'
              )}
            />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="bg-white/10 hover:bg-white/20 text-white border-white/30 backdrop-blur-md"
          >
            <Share2 className="h-5 w-5" />
          </Button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 md:py-16">

        {/* Quick Stats - Icon Based */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap items-center justify-center gap-8 mb-16 py-8"
        >
          <div className="flex items-center gap-3">
            <div className="p-3 bg-primary/10 rounded-full">
              <Clock className="h-6 w-6 text-primary" />
            </div>
            <div>
              <div className="font-semibold text-foreground">{activity.duration}</div>
              <div className="text-sm text-muted-foreground">Duration</div>
            </div>
          </div>

          <Separator orientation="vertical" className="h-12 hidden md:block" />

          <div className="flex items-center gap-3">
            <div className="p-3 bg-primary/10 rounded-full">
              <Users className="h-6 w-6 text-primary" />
            </div>
            <div>
              <div className="font-semibold text-foreground">Max {activity.maxParticipants}</div>
              <div className="text-sm text-muted-foreground">Group size</div>
            </div>
          </div>

          <Separator orientation="vertical" className="h-12 hidden md:block" />

          <div className="flex items-center gap-3">
            <div className="p-3 bg-primary/10 rounded-full">
              <MapPin className="h-6 w-6 text-primary" />
            </div>
            <div>
              <div className="font-semibold text-foreground line-clamp-1">{activity.venue}</div>
              <div className="text-sm text-muted-foreground">Location</div>
            </div>
          </div>

          <Separator orientation="vertical" className="h-12 hidden md:block" />

          <div className="flex items-center gap-3">
            <div className="p-3 bg-amber-500/10 rounded-full">
              <Star className="h-6 w-6 text-amber-500 fill-amber-500" />
            </div>
            <div>
              <div className="font-semibold text-foreground">{activity.rating} ★</div>
              <div className="text-sm text-muted-foreground">{activity.reviewCount.toLocaleString()} reviews</div>
            </div>
          </div>
        </motion.div>

        {/* ABOUT THE TOUR Section - Inspired by Japan Tours */}
        <div className="relative mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 tracking-tight">
              ABOUT THE EXPERIENCE
            </h2>
            <div className="w-32 h-1 bg-primary mx-auto" />
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-start mb-16">
            {/* Left: Description */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                {activity.fullDescription}
              </p>
              <div className="space-y-3">
                {activity.highlights.slice(0, 4).map((highlight: string, index: number) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="p-1 bg-primary/10 rounded-full mt-0.5">
                      <Check className="h-4 w-4 text-primary" />
                    </div>
                    <span className="text-foreground">{highlight}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right: Featured Image */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="relative h-[400px] rounded-2xl overflow-hidden shadow-2xl"
            >
              <Image
                src={activity.images[1] || activity.images[0]}
                alt="Experience highlight"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </motion.div>
          </div>
        </div>

        {/* Combined Section: Your Journey (Left) + Reserve Your Spot (Right) */}
        <div className="mb-20">
          <div className="grid lg:grid-cols-[1.2fr_1fr] gap-8 lg:gap-12 max-w-7xl mx-auto">
            {/* Left: Your Journey Section */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-8"
              >
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 tracking-tight">
                  YOUR JOURNEY
                </h2>
                <div className="w-24 h-1 bg-primary" />
              </motion.div>

              <div className="relative">
                {/* Timeline Line */}
                <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-primary/50 to-transparent" />

                {activity.schedule.map((item: any, index: number) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="relative mb-12 last:mb-0"
                  >
                    {/* Timeline Dot */}
                    <div className="absolute left-8 transform -translate-x-1/2 w-4 h-4 bg-primary rounded-full border-4 border-background shadow-lg z-10" />

                    {/* Content */}
                    <div className="ml-20 space-y-3">
                      <Badge className="mb-2">{item.time}</Badge>
                      <h3 className="text-lg font-bold text-foreground">{item.activity}</h3>
                      {item.description && (
                        <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                      )}
                      {/* Image */}
                      <div className="mt-4">
                        <div className="relative h-40 rounded-lg overflow-hidden shadow-md group">
                          <Image
                            src={activity.images[(index + 2) % activity.images.length]}
                            alt={item.activity}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Right: Reserve Your Spot Section */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-6"
              >
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 tracking-tight">
                  RESERVE YOUR SPOT
                </h2>
                <div className="w-24 h-1 bg-primary mb-2" />
                <p className="text-sm text-muted-foreground">
                  Secure your booking with flexible options
                </p>
              </motion.div>

              <Card className="p-6 lg:sticky lg:top-24 shadow-xl border-2 hover:shadow-2xl transition-shadow bg-gradient-to-br from-card to-primary/5">
                {/* Prominent Price Display */}
                <div className="mb-6 text-center bg-primary/10 rounded-xl p-6 border-2 border-primary/20">
                  <div className="text-xs text-muted-foreground mb-1 uppercase tracking-wider font-medium">Starting From</div>
                  <div className="text-4xl md:text-5xl font-bold text-primary mb-1">
                    {convertPrice(activity.priceInr)}
                  </div>
                  <div className="text-sm text-muted-foreground">per person</div>
                  {activity.discount && (
                    <div className="mt-2">
                      <Badge className="bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/20">
                        Save {activity.discount}%
                      </Badge>
                    </div>
                  )}
                </div>

                <Separator className="my-6" />

                {/* Date Selection */}
                <div className="space-y-4 mb-6">
                  <div>
                    <Label className="text-sm font-semibold mb-2 block">Select Date</Label>
                    <div className="grid grid-cols-2 gap-2">
                      {activity.availableDates.slice(0, 4).map((dateInfo: any) => (
                        <Button
                          key={dateInfo.date}
                          variant={selectedDate === dateInfo.date ? 'default' : 'outline'}
                          className="justify-start text-xs sm:text-sm"
                          onClick={() => {
                            setSelectedDate(dateInfo.date);
                            setSelectedTime(dateInfo.slots[0]);
                          }}
                        >
                          <Calendar className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-1.5" />
                          {new Date(dateInfo.date).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                          })}
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* Time Selection */}
                  <div>
                    <Label className="text-sm font-semibold mb-2 block">Select Time</Label>
                    <div className="grid grid-cols-3 gap-2">
                      {activity.availableDates
                        .find((d: any) => d.date === selectedDate)
                        ?.slots.map((time: string) => (
                          <Button
                            key={time}
                            variant={selectedTime === time ? 'default' : 'outline'}
                            size="sm"
                            className="text-xs"
                            onClick={() => setSelectedTime(time)}
                          >
                            {time}
                          </Button>
                        ))}
                    </div>
                  </div>

                  {/* Participants */}
                  <div>
                    <Label className="text-sm font-semibold mb-3 block">Number of Guests</Label>
                    <div className="flex items-center justify-between bg-muted/30 border border-border rounded-xl p-4">
                      <span className="text-sm font-medium">Guests</span>
                      <div className="flex items-center gap-4">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-9 w-9 rounded-full"
                          onClick={() => setParticipants(Math.max(1, participants - 1))}
                          disabled={participants <= 1}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="w-12 text-center font-bold text-lg">{participants}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-9 w-9 rounded-full"
                          onClick={() =>
                            setParticipants(
                              Math.min(activity.maxParticipants, participants + 1)
                            )
                          }
                          disabled={participants >= activity.maxParticipants}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                <Separator className="my-6" />

                {/* Price Breakdown - Prominent for Budget Users */}
                <div className="bg-primary/10 rounded-xl p-5 mb-6 border-2 border-primary/20">
                  <div className="space-y-3 mb-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">
                        {convertPrice(activity.priceInr)} × {participants} {participants === 1 ? 'guest' : 'guests'}
                      </span>
                      <span className="font-semibold">{convertPrice(totalPrice)}</span>
                    </div>
                    {serviceFee > 0 && (
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Service fee</span>
                        <span className="font-semibold">{convertPrice(serviceFee)}</span>
                      </div>
                    )}
                  </div>
                  <Separator className="my-3" />
                  <div className="flex items-center justify-between">
                    <span className="text-base font-bold">Total Amount</span>
                    <span className="text-2xl md:text-3xl font-bold text-primary">
                      {convertPrice(totalPrice)}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2 text-center">
                    All prices include taxes
                  </p>
                </div>

                {/* Book Now Button */}
                <Button
                  className="w-full h-12 md:h-14 text-base md:text-lg font-semibold shadow-lg hover:shadow-xl transition-all"
                  size="lg"
                  onClick={handleBookNow}
                >
                  Reserve Now
                  <ChevronRight className="h-5 w-5 md:h-6 md:w-6 ml-2" />
                </Button>

                <p className="text-xs text-center text-muted-foreground mt-4 flex items-center justify-center gap-2">
                  <Shield className="h-3 w-3" />
                  Secure booking • You won't be charged yet
                </p>

                {/* Quick Features */}
                <div className="mt-6 pt-6 border-t border-border/50">
                  <div className="grid grid-cols-2 gap-3">
                    {activity.instantConfirmation && (
                      <div className="flex items-center gap-2 text-xs">
                        <Zap className="h-4 w-4 text-primary flex-shrink-0" />
                        <span className="text-muted-foreground">Instant Confirmation</span>
                      </div>
                    )}
                    {activity.freeCancellation && (
                      <div className="flex items-center gap-2 text-xs">
                        <Shield className="h-4 w-4 text-green-600 dark:text-green-500 flex-shrink-0" />
                        <span className="text-muted-foreground">Free Cancellation</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Cancellation Policy */}
                <div className="mt-6 pt-6 border-t border-border/50">
                  <h3 className="font-semibold text-sm mb-3 flex items-center gap-2">
                    <Shield className="h-4 w-4 text-primary" />
                    Cancellation Policy
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{activity.cancellationPolicy}</p>
                </div>
              </Card>

              {/* What's Included Section */}
              <Card className="mt-6 p-6 shadow-lg border-2">
                <h3 className="font-bold text-xl mb-6 flex items-center gap-2">
                  <Check className="h-5 w-5 text-primary" />
                  What's Included
                </h3>
                
                {/* Feature Cards Grid */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  {/* Guide Card */}
                  <div className="p-4 bg-green-500/10 rounded-lg border border-green-500/20">
                    <div className="flex items-center gap-2 mb-2">
                      <Users className="h-5 w-5 text-green-600 dark:text-green-500" />
                      <h4 className="font-semibold text-sm">Expert Guide</h4>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      Professional English-speaking guide
                    </p>
                  </div>

                  {/* Transport Card */}
                  <div className="p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
                    <div className="flex items-center gap-2 mb-2">
                      <Car className="h-5 w-5 text-blue-600 dark:text-blue-500" />
                      <h4 className="font-semibold text-sm">Transportation</h4>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      Comfortable vehicle with pickup
                    </p>
                  </div>

                  {/* Food Card */}
                  <div className="p-4 bg-amber-500/10 rounded-lg border border-amber-500/20">
                    <div className="flex items-center gap-2 mb-2">
                      <UtensilsCrossed className="h-5 w-5 text-amber-600 dark:text-amber-500" />
                      <h4 className="font-semibold text-sm">Meals</h4>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      Local cuisine and refreshments
                    </p>
                  </div>

                  {/* Activities Card */}
                  <div className="p-4 bg-purple-500/10 rounded-lg border border-purple-500/20">
                    <div className="flex items-center gap-2 mb-2">
                      <Zap className="h-5 w-5 text-purple-600 dark:text-purple-500" />
                      <h4 className="font-semibold text-sm">Activities</h4>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      All entrance fees included
                    </p>
                  </div>
                </div>

                {/* Included/Not Included Lists - Side by Side */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-sm mb-3 flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-600 dark:text-green-500" />
                      Included
                    </h4>
                    <div className="space-y-2">
                      {activity.included.slice(0, 5).map((item: string, index: number) => (
                        <div key={index} className="flex items-start gap-2">
                          <Check className="h-3.5 w-3.5 text-green-600 dark:text-green-500 flex-shrink-0 mt-0.5" />
                          <span className="text-xs text-muted-foreground">{item}</span>
                        </div>
                      ))}
                      {activity.included.length > 5 && (
                        <p className="text-xs text-muted-foreground italic">
                          + {activity.included.length - 5} more
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-sm mb-3 flex items-center gap-2">
                      <X className="h-4 w-4 text-red-600 dark:text-red-500" />
                      Not Included
                    </h4>
                    <div className="space-y-2">
                      {activity.notIncluded.map((item: string, index: number) => (
                        <div key={index} className="flex items-start gap-2">
                          <X className="h-3.5 w-3.5 text-red-600 dark:text-red-500 flex-shrink-0 mt-0.5" />
                          <span className="text-xs text-muted-foreground">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>

              {/* Important Information Section */}
              <Card className="mt-6 p-6 bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-900 shadow-lg">
                <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                  <Info className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  Important Information
                </h3>
                <div className="space-y-2">
                  {activity.importantInfo.map((info: string, index: number) => (
                    <div key={index} className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-blue-900 dark:text-blue-100">{info}</span>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </div>


        {/* Reviews Section */}
        <div className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 tracking-tight">
              GUEST REVIEWS
            </h2>
            <div className="w-32 h-1 bg-primary mx-auto" />
          </motion.div>

          <div className="max-w-4xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activity.reviews.map((review: any, index: number) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="p-6 h-full hover:shadow-lg transition-shadow">
                  <div className="flex items-center justify-between mb-3">
                    <div className="font-semibold">{review.name}</div>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={cn(
                            'h-4 w-4',
                            i < review.rating
                              ? 'fill-amber-400 text-amber-400'
                              : 'text-muted-foreground'
                          )}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{review.comment}</p>
                  <div className="text-xs text-muted-foreground">{review.date}</div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

      </div>

      <SubtleFooter />

      {/* Lightbox */}
      <Lightbox
        open={lightboxIndex >= 0}
        close={() => setLightboxIndex(-1)}
        index={lightboxIndex}
        slides={activity.images.map((src: string) => ({ src }))}
      />
    </div>
  );
}

