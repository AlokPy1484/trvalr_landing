'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Header } from '@/components/layout/Header';
import { SubtleFooter } from '@/components/layout/SubtleFooter';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import {
  ChevronLeft,
  Check,
  Clock,
  MapPin,
  Calendar,
  Users,
  CreditCard,
  Wallet,
  ChevronRight,
  Star,
} from 'lucide-react';
import { useCurrency } from '@/contexts/CurrencyContext';
import { cn } from '@/lib/utils';
import { getRestaurantById } from './restaurantData';

interface RestaurantBookingPageProps {
  restaurantId: string;
  selectedDate: string;
  selectedTime: string;
  guests: number;
}


export function RestaurantBookingPage({
  restaurantId,
  selectedDate,
  selectedTime,
  guests,
}: RestaurantBookingPageProps) {
  const router = useRouter();
  const { selectedCurrency, currencyRates } = useCurrency();
  const [searchQuery, setSearchQuery] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const [restaurant, setRestaurant] = useState<any>(null);
  const [currentStep, setCurrentStep] = useState(1);

  // Form data
  const [guestInfo, setGuestInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    specialRequests: '',
  });

  const [paymentMethod, setPaymentMethod] = useState('card');
  const [cardDetails, setCardDetails] = useState({
    number: '',
    name: '',
    expiry: '',
    cvv: '',
  });
  const [agreeToTerms, setAgreeToTerms] = useState(false);

  useEffect(() => {
    const restaurantData = getRestaurantById(restaurantId);
    setRestaurant(restaurantData);
  }, [restaurantId]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

  const subtotal = restaurant.priceInr * guests;
  const serviceCharge = subtotal * 0.1;
  const total = subtotal + serviceCharge;

  const steps = [
    { number: 1, title: 'Guest Details', description: 'Tell us about yourself' },
    { number: 2, title: 'Payment', description: 'Complete reservation' },
  ];

  const handleNext = () => {
    if (currentStep < 2) {
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleComplete = () => {
    alert('Reservation confirmed! Redirecting to confirmation page...');
    router.push(`/restaurants/${restaurantId}/confirmation`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header
        isScrolled={isScrolled}
        searchQuery={searchQuery}
        onSearchQueryChange={setSearchQuery}
        onSearchSubmit={() => {}}
        showCurrencySelector={true}
      />

      {/* Hero Section */}
      <div className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-6">
          <Button
            variant="ghost"
            className="mb-4"
            onClick={() => router.push(`/restaurants/${restaurantId}`)}
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">
                Complete Your Reservation
              </h1>
              <p className="text-muted-foreground">
                Just a few steps to secure your table
              </p>
            </div>

            {/* Simple Step Indicator */}
            <div className="hidden md:flex items-center gap-2">
              {steps.map((step, index) => (
                <React.Fragment key={step.number}>
                  <div className="flex items-center gap-2">
                    <div
                      className={cn(
                        'w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors',
                        currentStep >= step.number
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted text-muted-foreground'
                      )}
                    >
                      {currentStep > step.number ? (
                        <Check className="h-4 w-4" />
                      ) : (
                        step.number
                      )}
                    </div>
                    <span className="text-sm font-medium">{step.title}</span>
                  </div>
                  {index < steps.length - 1 && (
                    <ChevronRight className="h-4 w-4 text-muted-foreground mx-2" />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-[1fr_380px] gap-8">
          {/* Main Content */}
          <div>
            {/* Step 1: Guest Details */}
            {currentStep === 1 && (
              <Card className="p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Users className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold">Guest Information</h2>
                    <p className="text-sm text-muted-foreground">
                      Primary contact for this reservation
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName" className="text-sm font-medium">First Name *</Label>
                      <Input
                        id="firstName"
                        value={guestInfo.firstName}
                        onChange={(e) =>
                          setGuestInfo({ ...guestInfo, firstName: e.target.value })
                        }
                        placeholder="John"
                        className="mt-1.5"
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName" className="text-sm font-medium">Last Name *</Label>
                      <Input
                        id="lastName"
                        value={guestInfo.lastName}
                        onChange={(e) =>
                          setGuestInfo({ ...guestInfo, lastName: e.target.value })
                        }
                        placeholder="Doe"
                        className="mt-1.5"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="email" className="text-sm font-medium">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={guestInfo.email}
                      onChange={(e) =>
                        setGuestInfo({ ...guestInfo, email: e.target.value })
                      }
                      placeholder="john.doe@example.com"
                      className="mt-1.5"
                    />
                    <p className="text-xs text-muted-foreground mt-1.5">
                      Confirmation will be sent here
                    </p>
                  </div>

                  <div>
                    <Label htmlFor="phone" className="text-sm font-medium">Phone Number *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={guestInfo.phone}
                      onChange={(e) =>
                        setGuestInfo({ ...guestInfo, phone: e.target.value })
                      }
                      placeholder="+971 50 123 4567"
                      className="mt-1.5"
                    />
                  </div>

                  <div>
                    <Label htmlFor="specialRequests" className="text-sm font-medium">Special Requests (Optional)</Label>
                    <Input
                      id="specialRequests"
                      value={guestInfo.specialRequests}
                      onChange={(e) =>
                        setGuestInfo({ ...guestInfo, specialRequests: e.target.value })
                      }
                      placeholder="e.g., Window seat, birthday celebration, dietary restrictions"
                      className="mt-1.5"
                    />
                  </div>
                </div>
              </Card>
            )}

            {/* Step 2: Payment */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <Card className="p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <CreditCard className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold">Payment Method</h2>
                      <p className="text-sm text-muted-foreground">
                        Choose how you'd like to pay
                      </p>
                    </div>
                  </div>

                  <RadioGroup
                    value={paymentMethod}
                    onValueChange={setPaymentMethod}
                    className="space-y-4 mb-6"
                  >
                    <Label
                      htmlFor="card"
                      className={cn(
                        "flex items-center justify-between p-4 border rounded-lg cursor-pointer transition-all",
                        paymentMethod === 'card'
                          ? 'border-primary ring-2 ring-primary/50 bg-primary/5'
                          : 'border-border hover:bg-muted/50'
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <RadioGroupItem value="card" id="card" className="sr-only" />
                        <CreditCard className="h-5 w-5 text-muted-foreground" />
                        <span className="font-medium">Credit/Debit Card</span>
                      </div>
                      {paymentMethod === 'card' && <Check className="h-5 w-5 text-primary" />}
                    </Label>
                    {paymentMethod === 'card' && (
                      <div className="grid sm:grid-cols-2 gap-4 p-4 pt-0 animate-in fade-in slide-in-from-top-2">
                        <div className="sm:col-span-2">
                          <Label htmlFor="cardNumber">Card Number</Label>
                          <Input
                            id="cardNumber"
                            value={cardDetails.number}
                            onChange={(e) => setCardDetails({ ...cardDetails, number: e.target.value })}
                            placeholder="XXXX XXXX XXXX XXXX"
                            className="mt-1.5"
                          />
                        </div>
                        <div className="sm:col-span-2">
                          <Label htmlFor="cardName">Cardholder Name</Label>
                          <Input
                            id="cardName"
                            value={cardDetails.name}
                            onChange={(e) => setCardDetails({ ...cardDetails, name: e.target.value })}
                            placeholder="John Doe"
                            className="mt-1.5"
                          />
                        </div>
                        <div>
                          <Label htmlFor="cardExpiry">Expiry Date</Label>
                          <Input
                            id="cardExpiry"
                            value={cardDetails.expiry}
                            onChange={(e) => setCardDetails({ ...cardDetails, expiry: e.target.value })}
                            placeholder="MM/YY"
                            className="mt-1.5"
                          />
                        </div>
                        <div>
                          <Label htmlFor="cardCvv">CVV</Label>
                          <Input
                            id="cardCvv"
                            value={cardDetails.cvv}
                            onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value })}
                            placeholder="123"
                            className="mt-1.5"
                          />
                        </div>
                      </div>
                    )}

                    <Label
                      htmlFor="upi"
                      className={cn(
                        "flex items-center justify-between p-4 border rounded-lg cursor-pointer transition-all",
                        paymentMethod === 'upi'
                          ? 'border-primary ring-2 ring-primary/50 bg-primary/5'
                          : 'border-border hover:bg-muted/50'
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <RadioGroupItem value="upi" id="upi" className="sr-only" />
                        <Wallet className="h-5 w-5 text-muted-foreground" />
                        <span className="font-medium">UPI</span>
                      </div>
                      {paymentMethod === 'upi' && <Check className="h-5 w-5 text-primary" />}
                    </Label>
                    {paymentMethod === 'upi' && (
                      <div className="p-4 pt-0 animate-in fade-in slide-in-from-top-2">
                        <Label htmlFor="upiId">UPI ID</Label>
                        <Input
                          id="upiId"
                          placeholder="yourname@bank"
                          className="mt-1.5"
                        />
                      </div>
                    )}

                    <Label
                      htmlFor="netbanking"
                      className={cn(
                        "flex items-center justify-between p-4 border rounded-lg cursor-pointer transition-all",
                        paymentMethod === 'netbanking'
                          ? 'border-primary ring-2 ring-primary/50 bg-primary/5'
                          : 'border-border hover:bg-muted/50'
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <RadioGroupItem value="netbanking" id="netbanking" className="sr-only" />
                        <CreditCard className="h-5 w-5 text-muted-foreground" />
                        <span className="font-medium">Net Banking</span>
                      </div>
                      {paymentMethod === 'netbanking' && <Check className="h-5 w-5 text-primary" />}
                    </Label>
                    {paymentMethod === 'netbanking' && (
                      <div className="p-4 pt-0 animate-in fade-in slide-in-from-top-2">
                        <Label htmlFor="bankSelect">Select Bank</Label>
                        <Input
                          id="bankSelect"
                          placeholder="e.g., HDFC Bank"
                          className="mt-1.5"
                        />
                      </div>
                    )}
                  </RadioGroup>

                  <div className="flex items-start space-x-2 pt-4 border-t">
                    <Checkbox
                      id="terms"
                      checked={agreeToTerms}
                      onCheckedChange={(checked) => setAgreeToTerms(!!checked)}
                    />
                    <Label htmlFor="terms" className="text-sm cursor-pointer leading-relaxed">
                      I agree to the{' '}
                      <a href="#" className="text-primary hover:underline">
                        Terms & Conditions
                      </a>{' '}
                      and{' '}
                      <a href="#" className="text-primary hover:underline">
                        Cancellation Policy
                      </a>
                    </Label>
                  </div>
                </Card>
              </div>
            )}
          </div>

          {/* Booking Summary Sidebar */}
          <div className="lg:sticky lg:top-24 h-fit">
            <Card className="p-6 shadow-lg">
              <h3 className="font-bold text-lg mb-4">Reservation Summary</h3>

              {/* Restaurant Info */}
              <div className="mb-6">
                <div className="relative h-40 rounded-lg overflow-hidden mb-3">
                  <Image
                    src={restaurant.images[0]}
                    alt={restaurant.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <h4 className="font-semibold text-base mb-1">{restaurant.name}</h4>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                  <MapPin className="h-3.5 w-3.5" />
                  <span>{restaurant.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">{restaurant.cuisine}</Badge>
                  <div className="flex items-center gap-1">
                    <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                    <span className="text-sm font-medium">{restaurant.rating}</span>
                  </div>
                </div>
              </div>

              <Separator className="my-6" />

              {/* Booking Details */}
              <div className="space-y-3 text-sm mb-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>Date</span>
                  </div>
                  <span className="font-medium">
                    {selectedDate ? new Date(selectedDate).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    }) : 'Not selected'}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>Time</span>
                  </div>
                  <span className="font-medium">{selectedTime}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Users className="h-4 w-4" />
                    <span>Guests</span>
                  </div>
                  <span className="font-medium">
                    {guests} {guests === 1 ? 'person' : 'people'}
                  </span>
                </div>
              </div>

              <Separator className="my-6" />

              {/* Price Breakdown */}
              <div className="space-y-3 text-sm mb-6">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal ({guests} {guests === 1 ? 'guest' : 'guests'})</span>
                  <span className="font-medium">{convertPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Service Charge (10%)</span>
                  <span className="font-medium">{convertPrice(serviceCharge)}</span>
                </div>
                <Separator />
                <div className="flex justify-between text-base font-bold">
                  <span>Total</span>
                  <span className="text-primary">{convertPrice(total)}</span>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="max-w-6xl mx-auto mt-8 flex justify-between">
          <Button
            variant="outline"
            onClick={handleBack}
            disabled={currentStep === 1}
            size="lg"
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            Back
          </Button>

          {currentStep < 2 ? (
            <Button onClick={handleNext} size="lg">
              Continue
              <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          ) : (
            <Button
              onClick={handleComplete}
              disabled={!agreeToTerms}
              className="bg-green-600 hover:bg-green-700"
              size="lg"
            >
              Complete Reservation
            </Button>
          )}
        </div>
      </div>

      <SubtleFooter />
    </div>
  );
}

