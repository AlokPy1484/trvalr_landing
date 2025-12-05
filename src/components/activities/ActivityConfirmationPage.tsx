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
import {
  Check,
  Calendar,
  MapPin,
  Clock,
  Users,
  Download,
  Mail,
  Share2,
  Home,
  ChevronRight,
} from 'lucide-react';

interface ActivityConfirmationPageProps {
  activityId: string;
}

// Mock data
const getBookingDetails = (activityId: string) => {
  return {
    bookingId: 'BK' + Math.random().toString(36).substr(2, 9).toUpperCase(),
    activity: {
      title: 'Sunset Desert Safari with BBQ Dinner',
      location: 'Dubai Desert',
      images: ['https://images.unsplash.com/photo-1451337516015-6b6e9a44a8a3?w=600&h=400&fit=crop'],
    },
    date: new Date(Date.now() + 86400000 * 7).toISOString().split('T')[0],
    time: '10:00 AM',
    participants: 2,
    totalPaid: '₹9,450',
    contactEmail: 'john.doe@example.com',
  };
};

export function ActivityConfirmationPage({ activityId }: ActivityConfirmationPageProps) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const [booking, setBooking] = useState<any>(null);

  useEffect(() => {
    const bookingData = getBookingDetails(activityId);
    setBooking(bookingData);
  }, [activityId]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!booking) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-background to-primary/5 dark:from-green-950/10 dark:via-background dark:to-primary/5">
      <Header
        isScrolled={isScrolled}
        searchQuery={searchQuery}
        onSearchQueryChange={setSearchQuery}
        onSearchSubmit={() => {}}
        showCurrencySelector={true}
      />

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          {/* Success Message */}
          <Card className="p-8 text-center mb-8 border-green-200 dark:border-green-900 bg-gradient-to-br from-green-50/50 to-white dark:from-green-950/20 dark:to-card">
            <div className="mb-4 flex justify-center">
              <div className="w-20 h-20 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                <Check className="h-10 w-10 text-green-600 dark:text-green-400" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Booking Confirmed!
            </h1>
            <p className="text-muted-foreground text-lg mb-4">
              Your activity has been successfully booked
            </p>
            <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 border-green-300 dark:border-green-700 px-4 py-1.5 text-base">
              Booking ID: {booking.bookingId}
            </Badge>
          </Card>

          {/* Activity Details */}
          <Card className="p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Activity Details</h2>
            
            <div className="flex gap-4 mb-6">
              <div className="relative w-32 h-32 rounded-lg overflow-hidden flex-shrink-0">
                <Image
                  src={booking.activity.images[0]}
                  alt={booking.activity.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-grow">
                <h3 className="text-lg font-semibold mb-2">{booking.activity.title}</h3>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                  <MapPin className="h-4 w-4" />
                  {booking.activity.location}
                </div>
                <Badge variant="outline">Instant Confirmation</Badge>
              </div>
            </div>

            <Separator className="my-4" />

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Calendar className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">Date</div>
                  <div className="font-medium">
                    {new Date(booking.date).toLocaleDateString('en-US', {
                      weekday: 'short',
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    })}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Clock className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">Time</div>
                  <div className="font-medium">{booking.time}</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Users className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">Participants</div>
                  <div className="font-medium">
                    {booking.participants} {booking.participants === 1 ? 'person' : 'people'}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                  <Check className="h-5 w-5 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">Amount Paid</div>
                  <div className="font-semibold text-green-600 dark:text-green-400">
                    {booking.totalPaid}
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Confirmation Email Notice */}
          <Card className="p-6 mb-6 bg-blue-50/50 dark:bg-blue-950/10 border-blue-200 dark:border-blue-900">
            <div className="flex gap-3">
              <Mail className="h-5 w-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-1">
                  Confirmation Email Sent
                </h3>
                <p className="text-sm text-blue-700 dark:text-blue-300">
                  A detailed confirmation email with your e-ticket and activity information 
                  has been sent to <strong>{booking.contactEmail}</strong>
                </p>
              </div>
            </div>
          </Card>

          {/* Action Buttons */}
          <div className="grid sm:grid-cols-3 gap-3 mb-6">
            <Button variant="outline" className="w-full">
              <Download className="h-4 w-4 mr-2" />
              Download Ticket
            </Button>
            <Button variant="outline" className="w-full">
              <Mail className="h-4 w-4 mr-2" />
              Email Ticket
            </Button>
            <Button variant="outline" className="w-full">
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
          </div>

          {/* Navigation Buttons */}
          <div className="grid sm:grid-cols-2 gap-3">
            <Button
              variant="outline"
              size="lg"
              onClick={() => router.push('/my-trips')}
              className="w-full"
            >
              View My Bookings
              <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
            <Button
              size="lg"
              onClick={() => router.push('/')}
              className="w-full"
            >
              <Home className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
          </div>

          {/* Additional Info */}
          <Card className="p-6 mt-6">
            <h3 className="font-semibold mb-3">Important Information</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex gap-2">
                <Check className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                <span>Please arrive 15 minutes before the scheduled time</span>
              </li>
              <li className="flex gap-2">
                <Check className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                <span>Bring a valid ID proof for verification</span>
              </li>
              <li className="flex gap-2">
                <Check className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                <span>Free cancellation up to 24 hours before the activity</span>
              </li>
              <li className="flex gap-2">
                <Check className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                <span>Contact support if you need to make any changes</span>
              </li>
            </ul>
          </Card>
        </div>
      </div>

      <SubtleFooter />
    </div>
  );
}

