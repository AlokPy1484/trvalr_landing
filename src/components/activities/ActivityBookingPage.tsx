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
  Shield,
  ChevronRight,
  Info,
  Wallet,
  Plus,
  X,
} from 'lucide-react';
import { useCurrency } from '@/contexts/CurrencyContext';
import { cn } from '@/lib/utils';

interface ActivityBookingPageProps {
  activityId: string;
  selectedDate: string;
  selectedTime: string;
  participants: number;
}

// Mock activity data
const getActivityById = (id: string) => {
  return {
    id: 'act-1',
    title: 'Sunset Desert Safari with BBQ Dinner',
    location: 'Dubai Desert',
    images: ['https://images.unsplash.com/photo-1451337516015-6b6e9a44a8a3?w=600&h=400&fit=crop'],
    priceInr: 4500,
    duration: '6 hours',
  };
};

export function ActivityBookingPage({
  activityId,
  selectedDate,
  selectedTime,
  participants,
}: ActivityBookingPageProps) {
  const router = useRouter();
  const { selectedCurrency, currencyRates } = useCurrency();
  const [searchQuery, setSearchQuery] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const [activity, setActivity] = useState<any>(null);
  const [currentStep, setCurrentStep] = useState(1);

  // Form data - Combined
  const [leadGuestInfo, setLeadGuestInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    country: 'India',
  });

  const [additionalGuests, setAdditionalGuests] = useState<any[]>([]);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [cardDetails, setCardDetails] = useState({
    number: '',
    name: '',
    expiry: '',
    cvv: '',
  });
  const [agreeToTerms, setAgreeToTerms] = useState(false);

  // Calculate total participants (lead guest + additional guests)
  const totalParticipants = 1 + additionalGuests.length;
  const maxGuests = 8; // Maximum 8 guests total (1 lead + 7 additional)

  useEffect(() => {
    const activityData = getActivityById(activityId);
    setActivity(activityData);
  }, [activityId]);

  // Add a new guest
  const handleAddGuest = () => {
    if (totalParticipants < maxGuests) {
      setAdditionalGuests([
        ...additionalGuests,
        {
          firstName: '',
          lastName: '',
          age: '',
        },
      ]);
    }
  };

  // Remove a guest
  const handleRemoveGuest = (index: number) => {
    setAdditionalGuests(additionalGuests.filter((_, i) => i !== index));
  };

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!activity) {
    return null;
  }

  const convertPrice = (priceInr: number): string => {
    const rate = currencyRates[selectedCurrency.code] || 1;
    const convertedPrice = priceInr * rate;
    return `${selectedCurrency.symbol}${convertedPrice.toFixed(0)}`;
  };

  const subtotal = activity ? activity.priceInr * totalParticipants : 0;
  const serviceFee = subtotal * 0.05;
  const total = subtotal + serviceFee;

  const steps = [
    { number: 1, title: 'Guest Details', description: 'Who\'s coming?' },
    { number: 2, title: 'Payment', description: 'Complete booking' },
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
    alert('Booking confirmed! Redirecting to confirmation page...');
    router.push(`/activities/${activityId}/confirmation`);
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
            onClick={() => router.push(`/activities/${activityId}`)}
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">
                Complete Your Booking
              </h1>
              <p className="text-muted-foreground">
                Just a few steps to secure your experience
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
              <div className="space-y-6">
                {/* Lead Guest */}
                <Card className="p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Users className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold">Lead Guest</h2>
                      <p className="text-sm text-muted-foreground">
                        Primary contact for this booking
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName" className="text-sm font-medium">First Name *</Label>
                        <Input
                          id="firstName"
                          value={leadGuestInfo.firstName}
                          onChange={(e) =>
                            setLeadGuestInfo({ ...leadGuestInfo, firstName: e.target.value })
                          }
                          placeholder="John"
                          className="mt-1.5"
                        />
                      </div>
                      <div>
                        <Label htmlFor="lastName" className="text-sm font-medium">Last Name *</Label>
                        <Input
                          id="lastName"
                          value={leadGuestInfo.lastName}
                          onChange={(e) =>
                            setLeadGuestInfo({ ...leadGuestInfo, lastName: e.target.value })
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
                        value={leadGuestInfo.email}
                        onChange={(e) =>
                          setLeadGuestInfo({ ...leadGuestInfo, email: e.target.value })
                        }
                        placeholder="john.doe@example.com"
                        className="mt-1.5"
                      />
                      <p className="text-xs text-muted-foreground mt-1.5">
                        Confirmation will be sent here
                      </p>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="phone" className="text-sm font-medium">Phone Number *</Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={leadGuestInfo.phone}
                          onChange={(e) =>
                            setLeadGuestInfo({ ...leadGuestInfo, phone: e.target.value })
                          }
                          placeholder="+1 234 567 8900"
                          className="mt-1.5"
                        />
                      </div>
                      <div>
                        <Label htmlFor="country" className="text-sm font-medium">Country *</Label>
                        <Input
                          id="country"
                          value={leadGuestInfo.country}
                          onChange={(e) =>
                            setLeadGuestInfo({ ...leadGuestInfo, country: e.target.value })
                          }
                          placeholder="India"
                          className="mt-1.5"
                        />
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Additional Guests */}
                <Card className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <Users className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h2 className="text-xl font-bold">Additional Guests</h2>
                        <p className="text-sm text-muted-foreground">
                          {additionalGuests.length > 0 
                            ? `${additionalGuests.length} ${additionalGuests.length === 1 ? 'guest' : 'guests'} added`
                            : 'Add guests to your booking'
                          }
                        </p>
                      </div>
                    </div>
                    {totalParticipants < maxGuests && (
                      <Button
                        variant="outline"
                        onClick={handleAddGuest}
                        className="flex items-center gap-2"
                      >
                        <Plus className="h-4 w-4" />
                        Add Guest
                      </Button>
                    )}
                  </div>

                  {additionalGuests.length > 0 && (
                    <div className="space-y-6">
                      {additionalGuests.map((guest, index) => (
                        <div key={index} className="relative">
                          {index > 0 && <Separator className="mb-6" />}
                          <div className="space-y-4">
                            <div className="flex items-center justify-between">
                              <p className="text-sm font-medium text-muted-foreground">
                                Guest {index + 2}
                              </p>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 text-muted-foreground hover:text-destructive"
                                onClick={() => handleRemoveGuest(index)}
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                            <div className="grid sm:grid-cols-3 gap-4">
                              <div>
                                <Label htmlFor={`g${index}-firstName`} className="text-sm">
                                  First Name *
                                </Label>
                                <Input
                                  id={`g${index}-firstName`}
                                  value={guest.firstName}
                                  onChange={(e) => {
                                    const newGuests = [...additionalGuests];
                                    newGuests[index].firstName = e.target.value;
                                    setAdditionalGuests(newGuests);
                                  }}
                                  placeholder="First name"
                                  className="mt-1.5"
                                />
                              </div>
                              <div>
                                <Label htmlFor={`g${index}-lastName`} className="text-sm">
                                  Last Name *
                                </Label>
                                <Input
                                  id={`g${index}-lastName`}
                                  value={guest.lastName}
                                  onChange={(e) => {
                                    const newGuests = [...additionalGuests];
                                    newGuests[index].lastName = e.target.value;
                                    setAdditionalGuests(newGuests);
                                  }}
                                  placeholder="Last name"
                                  className="mt-1.5"
                                />
                              </div>
                              <div>
                                <Label htmlFor={`g${index}-age`} className="text-sm">
                                  Age *
                                </Label>
                                <Input
                                  id={`g${index}-age`}
                                  type="number"
                                  value={guest.age}
                                  onChange={(e) => {
                                    const newGuests = [...additionalGuests];
                                    newGuests[index].age = e.target.value;
                                    setAdditionalGuests(newGuests);
                                  }}
                                  placeholder="Age"
                                  className="mt-1.5"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {additionalGuests.length === 0 && (
                    <div className="text-center py-8 border-2 border-dashed border-border rounded-lg bg-muted/20">
                      <Users className="h-12 w-12 text-muted-foreground mx-auto mb-3 opacity-50" />
                      <p className="text-sm text-muted-foreground">
                        No additional guests added yet. Click "Add Guest" above to add guests.
                      </p>
                    </div>
                  )}

                  {totalParticipants >= maxGuests && (
                    <div className="mt-4 p-3 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900 rounded-lg">
                      <p className="text-xs text-amber-900 dark:text-amber-100 text-center">
                        Maximum {maxGuests} guests allowed
                      </p>
                    </div>
                  )}
                </Card>
              </div>
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

                  <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3 p-4 border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors">
                        <RadioGroupItem value="card" id="card" />
                        <Label htmlFor="card" className="flex-grow cursor-pointer flex items-center gap-2">
                          <CreditCard className="h-5 w-5" />
                          <span>Credit / Debit Card</span>
                        </Label>
                      </div>
                      <div className="flex items-center space-x-3 p-4 border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors">
                        <RadioGroupItem value="upi" id="upi" />
                        <Label htmlFor="upi" className="flex-grow cursor-pointer flex items-center gap-2">
                          <Wallet className="h-5 w-5" />
                          <span>UPI</span>
                        </Label>
                      </div>
                      <div className="flex items-center space-x-3 p-4 border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors">
                        <RadioGroupItem value="netbanking" id="netbanking" />
                        <Label htmlFor="netbanking" className="flex-grow cursor-pointer flex items-center gap-2">
                          <Wallet className="h-5 w-5" />
                          <span>Net Banking</span>
                        </Label>
                      </div>
                    </div>
                  </RadioGroup>

                  {paymentMethod === 'card' && (
                    <div className="mt-6 space-y-4">
                      <div>
                        <Label htmlFor="cardNumber" className="text-sm font-medium">Card Number *</Label>
                        <Input
                          id="cardNumber"
                          value={cardDetails.number}
                          onChange={(e) =>
                            setCardDetails({ ...cardDetails, number: e.target.value })
                          }
                          placeholder="1234 5678 9012 3456"
                          maxLength={19}
                          className="mt-1.5"
                        />
                      </div>
                      <div>
                        <Label htmlFor="cardName" className="text-sm font-medium">Cardholder Name *</Label>
                        <Input
                          id="cardName"
                          value={cardDetails.name}
                          onChange={(e) =>
                            setCardDetails({ ...cardDetails, name: e.target.value })
                          }
                          placeholder="JOHN DOE"
                          className="mt-1.5"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="expiry" className="text-sm font-medium">Expiry Date *</Label>
                          <Input
                            id="expiry"
                            value={cardDetails.expiry}
                            onChange={(e) =>
                              setCardDetails({ ...cardDetails, expiry: e.target.value })
                            }
                            placeholder="MM/YY"
                            maxLength={5}
                            className="mt-1.5"
                          />
                        </div>
                        <div>
                          <Label htmlFor="cvv" className="text-sm font-medium">CVV *</Label>
                          <Input
                            id="cvv"
                            value={cardDetails.cvv}
                            onChange={(e) =>
                              setCardDetails({ ...cardDetails, cvv: e.target.value })
                            }
                            placeholder="123"
                            maxLength={3}
                            type="password"
                            className="mt-1.5"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </Card>

                <Card className="p-6 bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-900">
                  <div className="flex gap-3">
                    <Shield className="h-5 w-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                    <div className="text-sm">
                      <div className="font-semibold text-blue-900 dark:text-blue-100 mb-1">
                        Secure Payment
                      </div>
                      <p className="text-blue-700 dark:text-blue-300">
                        Your payment information is encrypted and secure. We never store your card details.
                      </p>
                    </div>
                  </div>
                </Card>

                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="terms"
                    checked={agreeToTerms}
                    onCheckedChange={(checked) => setAgreeToTerms(!!checked)}
                  />
                  <Label htmlFor="terms" className="text-sm cursor-pointer leading-relaxed">
                    I agree to the{' '}
                    <a href="#" className="text-primary hover:underline">
                      Terms and Conditions
                    </a>{' '}
                    and{' '}
                    <a href="#" className="text-primary hover:underline">
                      Cancellation Policy
                    </a>
                  </Label>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between mt-8">
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
                  Complete Booking
                  <Check className="h-4 w-4 ml-2" />
                </Button>
              )}
            </div>
          </div>

          {/* Booking Summary Sidebar */}
          <div className="lg:sticky lg:top-24 h-fit">
            <Card className="p-6 shadow-lg">
              <h3 className="font-bold text-lg mb-4">Booking Summary</h3>

              {/* Activity Info */}
              <div className="flex gap-3 mb-4">
                <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                  <Image
                    src={activity.images[0]}
                    alt={activity.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-grow">
                  <h4 className="font-semibold text-sm line-clamp-2 mb-1">
                    {activity.title}
                  </h4>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <MapPin className="h-3 w-3" />
                    {activity.location}
                  </div>
                </div>
              </div>

              <Separator className="my-4" />

              {/* Booking Details */}
              <div className="space-y-3 text-sm">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>Date</span>
                  </div>
                  <span className="font-medium">
                    {new Date(selectedDate).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
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
                    {totalParticipants} {totalParticipants === 1 ? 'person' : 'people'}
                  </span>
                </div>
              </div>

              <Separator className="my-4" />

              {/* Price Breakdown */}
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">
                    {convertPrice(activity.priceInr)} × {totalParticipants}
                  </span>
                  <span className="font-medium">{convertPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Service Fee</span>
                  <span className="font-medium">{convertPrice(serviceFee)}</span>
                </div>
                <Separator />
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span className="text-primary">{convertPrice(total)}</span>
                </div>
              </div>

              <div className="mt-4 p-3 bg-muted/50 rounded-lg flex gap-2 text-xs">
                <Info className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                <p className="text-muted-foreground">
                  Free cancellation up to 24 hours before the activity starts
                </p>
              </div>
            </Card>
          </div>
        </div>
      </div>

      <SubtleFooter />
    </div>
  );
}

