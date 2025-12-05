'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Header } from '@/components/layout/Header';
import { SubtleFooter } from '@/components/layout/SubtleFooter';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  CheckCircle2,
  Calendar,
  Clock,
  Users,
  MapPin,
  Phone,
  Mail,
  Download,
  Share2,
  Home,
} from 'lucide-react';
import { format } from 'date-fns';

interface RestaurantConfirmationPageProps {
  restaurantId: string;
}

export function RestaurantConfirmationPage({ restaurantId }: RestaurantConfirmationPageProps) {
  const router = useRouter();

  // Mock confirmation data
  const bookingData = {
    bookingId: 'RES-' + Math.random().toString(36).substr(2, 9).toUpperCase(),
    restaurant: {
      name: 'The Golden Fork',
      location: 'Dubai Marina',
      address: '123 Marina Walk, Dubai Marina, Dubai',
      phone: '+971 4 123 4567',
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&h=400&fit=crop',
    },
    date: '2025-11-15',
    time: '7:00 PM',
    guests: 2,
    total: 7700,
    currency: 'AED',
    guestName: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+971 50 123 4567',
  };

  return (
    <div className="min-h-screen bg-background">
      <Header
        isScrolled={false}
        searchQuery=""
        onSearchQueryChange={() => {}}
        onSearchSubmit={() => {}}
        showCurrencySelector={true}
      />

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          {/* Success Icon */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 dark:bg-green-900/20 mb-4">
              <CheckCircle2 className="h-10 w-10 text-green-600 dark:text-green-400" />
            </div>
            <h1 className="text-3xl font-bold mb-2">Reservation Confirmed!</h1>
            <p className="text-muted-foreground">
              Your table has been reserved successfully
            </p>
          </div>

          {/* Booking Card */}
          <Card className="p-6 mb-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Booking ID</p>
                <p className="text-xl font-bold">{bookingData.bookingId}</p>
              </div>
              <Badge className="bg-green-600 hover:bg-green-700">
                Confirmed
              </Badge>
            </div>

            <Separator className="my-6" />

            {/* Restaurant Info */}
            <div className="flex gap-4 mb-6">
              <div className="relative w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                <Image
                  src={bookingData.restaurant.image}
                  alt={bookingData.restaurant.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold mb-2">{bookingData.restaurant.name}</h3>
                <div className="space-y-1 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    <span>{bookingData.restaurant.address}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    <span>{bookingData.restaurant.phone}</span>
                  </div>
                </div>
              </div>
            </div>

            <Separator className="my-6" />

            {/* Booking Details */}
            <div className="grid sm:grid-cols-2 gap-4 mb-6">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Date</p>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-primary" />
                  <span className="font-semibold">
                    {format(new Date(bookingData.date), 'EEEE, MMMM d, yyyy')}
                  </span>
                </div>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Time</p>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-primary" />
                  <span className="font-semibold">{bookingData.time}</span>
                </div>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Guests</p>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-primary" />
                  <span className="font-semibold">
                    {bookingData.guests} {bookingData.guests === 1 ? 'Guest' : 'Guests'}
                  </span>
                </div>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Total Amount</p>
                <span className="font-semibold text-lg">
                  {bookingData.currency} {bookingData.total.toLocaleString()}
                </span>
              </div>
            </div>

            <Separator className="my-6" />

            {/* Guest Info */}
            <div>
              <h4 className="font-semibold mb-3">Guest Information</h4>
              <div className="space-y-2 text-sm">
                <div>
                  <span className="text-muted-foreground">Name: </span>
                  <span className="font-medium">{bookingData.guestName}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Email: </span>
                  <span className="font-medium">{bookingData.email}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Phone: </span>
                  <span className="font-medium">{bookingData.phone}</span>
                </div>
              </div>
            </div>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 mb-8">
            <Button variant="outline" className="flex-1">
              <Download className="h-4 w-4 mr-2" />
              Download Confirmation
            </Button>
            <Button variant="outline" className="flex-1">
              <Mail className="h-4 w-4 mr-2" />
              Email Confirmation
            </Button>
            <Button variant="outline" className="flex-1">
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
          </div>

          {/* Important Info */}
          <Card className="p-6 bg-muted/50">
            <h4 className="font-semibold mb-3">Important Information</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• A confirmation email has been sent to {bookingData.email}</li>
              <li>• Please arrive 10 minutes before your reservation time</li>
              <li>• Cancellations must be made at least 24 hours in advance</li>
              <li>• Please contact the restaurant directly for any special dietary requirements</li>
              <li>• Dress code: Smart casual</li>
            </ul>
          </Card>

          {/* Navigation */}
          <div className="flex flex-col sm:flex-row gap-3 mt-8">
            <Button variant="outline" className="flex-1" onClick={() => router.push('/')}>
              <Home className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
            <Button className="flex-1" onClick={() => router.push('/restaurants')}>
              Browse More Restaurants
            </Button>
          </div>
        </div>
      </div>

      <SubtleFooter />
    </div>
  );
}

