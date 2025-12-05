'use client';

import React, { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  Check, 
  User, 
  Mail, 
  Phone, 
  CreditCard, 
  Shield, 
  Clock, 
  MapPin, 
  Star,
  Users,
  Bed,
  Wifi,
  Car,
  Utensils,
  Calendar,
  ChevronDown,
  Plus,
  Info,
  AlertCircle,
  CheckCircle,
  X
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

// Mock booking data - in real app, this would come from URL params or API
const mockBookingData = {
  hotel: {
    id: '1',
    name: 'Hotel Shivsudhaa',
    rating: 5,
    address: 'D-44/85C, Ramapura, Luxa, Varanasi, 221001 Varanasi, India',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&q=80',
    amenities: ['Airport shuttle', 'Parking', 'Restaurant'],
    guestRating: 8.4,
    reviewCount: 18
  },
  booking: {
    checkIn: '2025-10-31',
    checkOut: '2025-11-01',
    nights: 1,
    rooms: 2,
    adults: 2,
    children: 0,
    roomType: 'Deluxe King Room'
  },
  pricing: {
    basePrice: 450,
    taxes: 22.50,
    total: 472.50,
    currency: '$',
    savings: 50,
    originalPrice: 522.50
  },
  cancellation: {
    freeBefore: '2025-10-30',
    feeAfter: 236.25
  }
};

export function BookingClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Form state
  const [currentStep, setCurrentStep] = useState(2); // 1: Selection, 2: Details, 3: Confirmation
  const [guestInfo, setGuestInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    country: 'India',
    phoneCode: '+91'
  });
  const [specialRequests, setSpecialRequests] = useState({
    liftProximity: 'near',
    otherRequests: '',
    roomsClose: false
  });
  const [paymentMethod, setPaymentMethod] = useState('other');
  const [promoCode, setPromoCode] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [arrivalTime, setArrivalTime] = useState('');
  const [workTravel, setWorkTravel] = useState(false);
  const [bookingFor, setBookingFor] = useState('self');
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setGuestInfo(prev => ({ ...prev, [field]: value }));
  };

  const handleSpecialRequestChange = (field: string, value: string | boolean) => {
    setSpecialRequests(prev => ({ ...prev, [field]: value }));
  };

  const handleCardDetailsChange = (field: string, value: string) => {
    setCardDetails(prev => ({ ...prev, [field]: value }));
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4);
    }
    return v;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  const formatTime = (dateString: string, time: string) => {
    const date = new Date(dateString);
    return `${date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    })} ${time}`;
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between h-auto sm:h-16 py-4 sm:py-0">
            {/* Logo */}
            <div className="flex items-center mb-4 sm:mb-0">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => router.back()}
                className="mr-4"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
              <h1 className="text-xl font-bold text-gray-900">Trvalr</h1>
            </div>

            {/* Progress Steps */}
            <div className="flex items-center space-x-2 sm:space-x-4 lg:space-x-8 w-full sm:w-auto justify-center sm:justify-start mb-4 sm:mb-0">
              <div className="flex items-center space-x-1 sm:space-x-2">
                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-green-500 rounded-full flex items-center justify-center">
                  <Check className="h-3 w-3 sm:h-4 sm:w-4 text-white" />
                </div>
                <span className="text-xs sm:text-sm font-medium text-gray-900 hidden sm:inline">Your Selection</span>
              </div>
              <div className="w-4 sm:w-8 h-0.5 bg-muted"></div>
              <div className="flex items-center space-x-1 sm:space-x-2">
                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-xs sm:text-sm font-medium text-white">2</span>
                </div>
                <span className="text-xs sm:text-sm font-medium text-blue-600 hidden sm:inline">Your Details</span>
              </div>
              <div className="w-4 sm:w-8 h-0.5 bg-muted"></div>
              <div className="flex items-center space-x-1 sm:space-x-2">
                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-muted rounded-full flex items-center justify-center">
                  <span className="text-xs sm:text-sm font-medium text-gray-500">3</span>
                </div>
                <span className="text-xs sm:text-sm font-medium text-gray-500 hidden sm:inline">Finish booking</span>
              </div>
            </div>

            {/* Right side actions */}
            <div className="flex items-center space-x-2 sm:space-x-4 w-full sm:w-auto justify-end">
              <Button variant="ghost" size="sm" className="text-xs sm:text-sm">
                <span className="hidden sm:inline">Customer support</span>
                <span className="sm:hidden">Support</span>
              </Button>
              <Button variant="outline" size="sm" className="text-xs sm:text-sm">
                <span className="hidden sm:inline">Sign in / Register</span>
                <span className="sm:hidden">Sign in</span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Left Column - Booking Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Promotional Banners */}
            <div className="space-y-3">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-blue-600 mr-2" />
                  <span className="text-blue-800 font-medium">
                    You've saved a total of {mockBookingData.pricing.currency}{mockBookingData.pricing.savings}!
                  </span>
                </div>
              </div>
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                <div className="flex items-center">
                  <AlertCircle className="h-5 w-5 text-orange-600 mr-2" />
                  <span className="text-orange-800 font-medium">
                    We only have 2 rooms left!
                  </span>
                </div>
              </div>
            </div>

            {/* Guest Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-lg sm:text-xl">
                  <User className="h-5 w-5 mr-2" />
                  Guest Information
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  Guest names must match the valid ID which will be used at check-in.
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">Given names *</Label>
                    <Input
                      id="firstName"
                      placeholder="Use only English letters"
                      value={guestInfo.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Surname *</Label>
                    <Input
                      id="lastName"
                      placeholder="Use only English letters"
                      value={guestInfo.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Email"
                    value={guestInfo.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                  />
                  <p className="text-sm text-muted-foreground mt-1">
                    Booking confirmation will be sent to this email
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="country">Country/Region</Label>
                    <Select value={guestInfo.country} onValueChange={(value) => handleInputChange('country', value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="India">India</SelectItem>
                        <SelectItem value="United States">United States</SelectItem>
                        <SelectItem value="United Kingdom">United Kingdom</SelectItem>
                        <SelectItem value="Canada">Canada</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="phoneCode">Phone Code</Label>
                    <Select value={guestInfo.phoneCode} onValueChange={(value) => handleInputChange('phoneCode', value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="+91">IN +91</SelectItem>
                        <SelectItem value="+1">US +1</SelectItem>
                        <SelectItem value="+44">UK +44</SelectItem>
                        <SelectItem value="+1">CA +1</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="sm:col-span-2 lg:col-span-1">
                    <Label htmlFor="phone">Phone number *</Label>
                    <Input
                      id="phone"
                      placeholder="Phone number"
                      value={guestInfo.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-start space-x-2">
                    <Checkbox 
                      id="saveDetails"
                      checked={false}
                      className="mt-1"
                    />
                    <Label htmlFor="saveDetails" className="text-sm leading-relaxed">
                      Sign in to save your details (optional) You'll also get free access to discounts and travel rewards.
                    </Label>
                  </div>

                  <div className="flex items-start space-x-2">
                    <Checkbox 
                      id="paperless"
                      checked={true}
                      className="mt-1"
                    />
                    <Label htmlFor="paperless" className="text-sm leading-relaxed">
                      Yes, I want free paperless confirmation (recommended) We'll text you a link to download our app.
                    </Label>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Who are you booking for? */}
            <Card>
              <CardHeader>
                <CardTitle>Who are you booking for? (optional)</CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup value={bookingFor} onValueChange={setBookingFor}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="self" id="self" />
                    <Label htmlFor="self">I'm the main guest</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="other" id="other" />
                    <Label htmlFor="other">I'm booking for someone else</Label>
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>

            {/* Are you traveling for work? */}
            <Card>
              <CardHeader>
                <CardTitle>Are you traveling for work? (optional)</CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup value={workTravel ? 'yes' : 'no'} onValueChange={(value) => setWorkTravel(value === 'yes')}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="work-yes" />
                    <Label htmlFor="work-yes">Yes</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="work-no" />
                    <Label htmlFor="work-no">No</Label>
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>

            {/* Special Requests */}
            <Card>
              <CardHeader>
                <CardTitle>Special Requests (Optional)</CardTitle>
                <p className="text-sm text-muted-foreground">
                  The property will do its best, but cannot guarantee to fulfil all requests.
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="text-sm font-medium">Lift Proximity</Label>
                  <RadioGroup 
                    value={specialRequests.liftProximity} 
                    onValueChange={(value) => handleSpecialRequestChange('liftProximity', value)}
                    className="mt-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="away" id="lift-away" />
                      <Label htmlFor="lift-away">Away from lift</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="near" id="lift-near" />
                      <Label htmlFor="lift-near">Near lift</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div>
                  <Label htmlFor="otherRequests">Other requests</Label>
                  <div className="flex space-x-2 mt-2">
                    <Input
                      id="otherRequests"
                      placeholder="Enter your special requests"
                      value={specialRequests.otherRequests}
                      onChange={(e) => handleSpecialRequestChange('otherRequests', e.target.value)}
                    />
                    <Button variant="outline">Add</Button>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="roomsClose"
                    checked={specialRequests.roomsClose}
                    onCheckedChange={(checked) => handleSpecialRequestChange('roomsClose', checked as boolean)}
                  />
                  <Label htmlFor="roomsClose" className="text-sm">
                    I want rooms close to each other (if available)
                  </Label>
                </div>
              </CardContent>
            </Card>

            {/* Promo Code */}
            <Card>
              <CardHeader>
                <CardTitle>Available for This Booking</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex space-x-2">
                  <Input
                    placeholder="Promo Code"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                  />
                  <Button variant="outline">Use</Button>
                  <Button variant="ghost" size="sm">Hide</Button>
                </div>
              </CardContent>
            </Card>

            {/* Payment Method */}
            <Card>
              <CardHeader>
                <CardTitle>How would you like to pay?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="card" id="card" />
                    <Label htmlFor="card">Credit/Debit Card</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="other" id="other-payment" />
                    <div>
                      <Label htmlFor="other-payment">Other payment methods</Label>
                      <p className="text-sm text-muted-foreground">
                        Pay on next page: Apple Pay, PayPal, Google Pay, Gift Card
                      </p>
                    </div>
                  </div>
                </RadioGroup>

                {/* Credit Card Details Form */}
                {paymentMethod === 'card' && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="space-y-4 pt-4 border-t border-border"
                  >
                    <div>
                      <Label htmlFor="cardName">Name on Card *</Label>
                      <Input
                        id="cardName"
                        placeholder="John Doe"
                        value={cardDetails.cardName}
                        onChange={(e) => handleCardDetailsChange('cardName', e.target.value)}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="cardNumber">Card Number *</Label>
                      <Input
                        id="cardNumber"
                        placeholder="1234 5678 9012 3456"
                        value={cardDetails.cardNumber}
                        onChange={(e) => handleCardDetailsChange('cardNumber', formatCardNumber(e.target.value))}
                        maxLength={19}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="expiryDate">Expiry Date *</Label>
                        <Input
                          id="expiryDate"
                          placeholder="MM/YY"
                          value={cardDetails.expiryDate}
                          onChange={(e) => handleCardDetailsChange('expiryDate', formatExpiryDate(e.target.value))}
                          maxLength={5}
                        />
                      </div>
                      <div>
                        <Label htmlFor="cvv">CVV *</Label>
                        <Input
                          id="cvv"
                          placeholder="123"
                          value={cardDetails.cvv}
                          onChange={(e) => handleCardDetailsChange('cvv', e.target.value.replace(/\D/g, '').slice(0, 4))}
                          maxLength={4}
                        />
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Shield className="h-4 w-4 text-green-600" />
                      <span className="text-sm text-muted-foreground">
                        Your payment information is secure and encrypted
                      </span>
                    </div>
                  </motion.div>
                )}

                {/* Other Payment Methods Details */}
                {paymentMethod === 'other' && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="space-y-4 pt-4 border-t border-border"
                  >
                    <div className="space-y-3">
                      <h4 className="font-medium text-sm text-gray-900">Available Payment Methods</h4>
                      
                      {/* Apple Pay */}
                      <div className="flex items-center justify-between p-3 border border-border rounded-lg hover:border-primary transition-colors cursor-pointer">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-black rounded flex items-center justify-center">
                            <span className="text-white text-xs font-bold">🍎</span>
                          </div>
                          <div>
                            <p className="font-medium text-sm">Apple Pay</p>
                            <p className="text-xs text-muted-foreground">Pay securely with Touch ID or Face ID</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-green-600 font-medium">Instant</p>
                          <p className="text-xs text-muted-foreground">No fees</p>
                        </div>
                      </div>

                      {/* Google Pay */}
                      <div className="flex items-center justify-between p-3 border border-border rounded-lg hover:border-primary transition-colors cursor-pointer">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-blue-500 rounded flex items-center justify-center">
                            <span className="text-white text-xs font-bold">G</span>
                          </div>
                          <div>
                            <p className="font-medium text-sm">Google Pay</p>
                            <p className="text-xs text-muted-foreground">Quick and secure payment</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-green-600 font-medium">Instant</p>
                          <p className="text-xs text-muted-foreground">No fees</p>
                        </div>
                      </div>

                      {/* PayPal */}
                      <div className="flex items-center justify-between p-3 border border-border rounded-lg hover:border-primary transition-colors cursor-pointer">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
                            <span className="text-white text-xs font-bold">PP</span>
                          </div>
                          <div>
                            <p className="font-medium text-sm">PayPal</p>
                            <p className="text-xs text-muted-foreground">Pay with your PayPal account</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-green-600 font-medium">Instant</p>
                          <p className="text-xs text-muted-foreground">No fees</p>
                        </div>
                      </div>

                      {/* UPI */}
                      <div className="flex items-center justify-between p-3 border border-border rounded-lg hover:border-primary transition-colors cursor-pointer">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-purple-600 rounded flex items-center justify-center">
                            <span className="text-white text-xs font-bold">UPI</span>
                          </div>
                          <div>
                            <p className="font-medium text-sm">UPI Payment</p>
                            <p className="text-xs text-muted-foreground">Pay using PhonePe, GPay, Paytm</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-green-600 font-medium">Instant</p>
                          <p className="text-xs text-muted-foreground">No fees</p>
                        </div>
                      </div>

                      {/* Net Banking */}
                      <div className="flex items-center justify-between p-3 border border-border rounded-lg hover:border-primary transition-colors cursor-pointer">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-green-600 rounded flex items-center justify-center">
                            <span className="text-white text-xs font-bold">NB</span>
                          </div>
                          <div>
                            <p className="font-medium text-sm">Net Banking</p>
                            <p className="text-xs text-muted-foreground">Pay directly from your bank account</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-green-600 font-medium">Secure</p>
                          <p className="text-xs text-muted-foreground">No fees</p>
                        </div>
                      </div>

                      {/* Gift Card */}
                      <div className="flex items-center justify-between p-3 border border-border rounded-lg hover:border-primary transition-colors cursor-pointer">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-orange-500 rounded flex items-center justify-center">
                            <span className="text-white text-xs font-bold">GC</span>
                          </div>
                          <div>
                            <p className="font-medium text-sm">Gift Card</p>
                            <p className="text-xs text-muted-foreground">Use your Trvalr gift card</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-green-600 font-medium">Instant</p>
                          <p className="text-xs text-muted-foreground">No fees</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                      <div className="flex items-start space-x-2">
                        <Info className="h-4 w-4 text-blue-600 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-sm text-blue-800 font-medium">Payment Security</p>
                          <p className="text-xs text-blue-700 mt-1">
                            All payment methods are secured with 256-bit SSL encryption. Your payment details are never stored on our servers.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-muted border border-border rounded-lg p-3">
                      <div className="flex items-start space-x-2">
                        <Clock className="h-4 w-4 text-gray-600 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-sm text-gray-800 font-medium">Processing Time</p>
                          <p className="text-xs text-gray-600 mt-1">
                            Most payments are processed instantly. Bank transfers may take 1-2 business days to reflect in your account.
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Payment Logos */}
                <div className="flex flex-wrap items-center gap-2 sm:gap-4 pt-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-4 sm:w-8 sm:h-5 bg-blue-600 rounded text-white text-xs flex items-center justify-center">VISA</div>
                    <div className="w-6 h-4 sm:w-8 sm:h-5 bg-red-600 rounded text-white text-xs flex items-center justify-center">MC</div>
                    <div className="w-6 h-4 sm:w-8 sm:h-5 bg-blue-500 rounded text-white text-xs flex items-center justify-center">AMEX</div>
                    <div className="w-6 h-4 sm:w-8 sm:h-5 bg-orange-500 rounded text-white text-xs flex items-center justify-center">JCB</div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-4 sm:w-8 sm:h-5 bg-gray-800 rounded text-white text-xs flex items-center justify-center">Apple</div>
                    <div className="w-6 h-4 sm:w-8 sm:h-5 bg-blue-500 rounded text-white text-xs flex items-center justify-center">PayPal</div>
                    <div className="w-6 h-4 sm:w-8 sm:h-5 bg-green-500 rounded text-white text-xs flex items-center justify-center">Google</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Terms and Conditions */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-start space-x-2">
                  <Checkbox 
                    id="terms"
                    checked={termsAccepted}
                    onCheckedChange={(checked) => setTermsAccepted(checked as boolean)}
                  />
                  <Label htmlFor="terms" className="text-sm">
                    By submitting this booking, I acknowledge that I have read and agree to Trvalr's{' '}
                    <Button variant="link" className="p-0 h-auto text-blue-600">Terms of Use</Button>
                    {' '}and{' '}
                    <Button variant="link" className="p-0 h-auto text-blue-600">Privacy Statement</Button>
                    , along with the{' '}
                    <Button variant="link" className="p-0 h-auto text-blue-600">Supplier Service Terms</Button>
                    {' '}and{' '}
                    <Button variant="link" className="p-0 h-auto text-blue-600">Tax Statement</Button>.
                  </Label>
                </div>
              </CardContent>
            </Card>

            {/* Next Step Button */}
            <Button 
              size="lg" 
              className="w-full h-12 text-base sm:text-lg"
              disabled={!termsAccepted || !guestInfo.firstName || !guestInfo.lastName || !guestInfo.email}
            >
              Next Step: Final Confirmation &gt;
            </Button>

            {/* Footer Info */}
            <div className="text-center space-y-2 text-sm text-muted-foreground">
              <p>Save your frequent traveler details for faster bookings</p>
              <div className="flex items-center justify-center space-x-4">
                <div className="flex items-center space-x-1">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span>Trvalr Your trip is protected</span>
                </div>
                <div className="flex items-center space-x-1">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span>We price match</span>
                </div>
                <div className="flex items-center space-x-1">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span>Secure payment</span>
                </div>
              </div>
              <Button variant="link" className="p-0 h-auto text-blue-600">
                &lt; Hotel Shivsudhaa
              </Button>
            </div>
          </div>

          {/* Right Column - Booking Summary */}
          <div className="lg:col-span-1 order-first lg:order-last">
            <div className="lg:sticky lg:top-24 space-y-4 lg:space-y-6">
              {/* Hotel Details */}
              <Card>
                <div className="relative h-40 sm:h-48">
                  <img
                    src={mockBookingData.hotel.image}
                    alt={mockBookingData.hotel.name}
                    className="w-full h-full object-cover rounded-t-lg"
                  />
                </div>
                <CardContent className="p-3 sm:p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-base sm:text-lg">{mockBookingData.hotel.name}</h3>
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-3 w-3 sm:h-4 sm:w-4 text-amber-400 fill-amber-400" />
                      ))}
                    </div>
                  </div>
                  <p className="text-xs sm:text-sm text-muted-foreground mb-2 line-clamp-2">{mockBookingData.hotel.address}</p>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3 space-y-1 sm:space-y-0">
                    <span className="text-xs sm:text-sm font-medium">Great Location - {mockBookingData.hotel.guestRating}</span>
                    <span className="text-xs sm:text-sm text-muted-foreground">
                      {mockBookingData.hotel.guestRating} Very Good - {mockBookingData.hotel.reviewCount} reviews
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs sm:text-sm text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <Car className="h-3 w-3 sm:h-4 sm:w-4" />
                      <span>Airport shuttle</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Car className="h-3 w-3 sm:h-4 sm:w-4" />
                      <span>Parking</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Utensils className="h-3 w-3 sm:h-4 sm:w-4" />
                      <span>Restaurant</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Booking Details */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base sm:text-lg">Your Booking Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 sm:space-y-3">
                  <div className="flex justify-between">
                    <span className="text-xs sm:text-sm text-muted-foreground">Check-in:</span>
                    <span className="text-xs sm:text-sm font-medium text-right">
                      {formatTime(mockBookingData.booking.checkIn, 'From 12:00 PM')}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-xs sm:text-sm text-muted-foreground">Check-out:</span>
                    <span className="text-xs sm:text-sm font-medium text-right">
                      {formatTime(mockBookingData.booking.checkOut, 'Until 11:00 AM')}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-xs sm:text-sm text-muted-foreground">Total length of stay:</span>
                    <span className="text-xs sm:text-sm font-medium">{mockBookingData.booking.nights} night</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-xs sm:text-sm text-muted-foreground">Selection:</span>
                    <span className="text-xs sm:text-sm font-medium text-right">
                      You selected {mockBookingData.booking.rooms} rooms for {mockBookingData.booking.adults} adults
                    </span>
                  </div>
                  <Button variant="link" className="p-0 h-auto text-blue-600 text-xs sm:text-sm">
                    Change your selection
                  </Button>
                </CardContent>
              </Card>

              {/* Price Summary */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base sm:text-lg">Your Price Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 sm:space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-xl sm:text-2xl font-bold">{mockBookingData.pricing.currency}{mockBookingData.pricing.total}</span>
                    <Badge variant="secondary" className="bg-green-100 text-green-800 text-xs">
                      You save {mockBookingData.pricing.currency}{mockBookingData.pricing.savings}
                    </Badge>
                  </div>
                  <div className="flex justify-between text-xs sm:text-sm">
                    <span className="text-muted-foreground">+ {mockBookingData.pricing.currency}{mockBookingData.pricing.taxes} taxes and fees</span>
                  </div>
                  <Separator />
                  <div className="space-y-1 sm:space-y-2 text-xs sm:text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Excludes {mockBookingData.pricing.currency}{mockBookingData.pricing.taxes} in taxes and fees</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Goods and services tax {mockBookingData.pricing.currency}{mockBookingData.pricing.taxes}</span>
                    </div>
                    <Button variant="link" className="p-0 h-auto text-blue-600 text-xs sm:text-sm">
                      Hide details
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Payment Schedule */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base sm:text-lg">Your Payment Schedule</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    You'll be charged a prepayment of the total price at any time.
                  </p>
                </CardContent>
              </Card>

              {/* Cancellation Policy */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base sm:text-lg">How much will it cost to cancel?</CardTitle>
                </CardHeader>
                <CardContent className="space-y-1 sm:space-y-2">
                  <div className="flex justify-between text-xs sm:text-sm">
                    <span className="text-green-600">Free cancellation before {formatDate(mockBookingData.cancellation.freeBefore)}</span>
                  </div>
                  <div className="flex justify-between text-xs sm:text-sm">
                    <span className="text-muted-foreground">After 12:00 AM on {formatDate(mockBookingData.cancellation.freeBefore)}</span>
                    <span className="font-medium">{mockBookingData.pricing.currency}{mockBookingData.cancellation.feeAfter}</span>
                  </div>
                </CardContent>
              </Card>

              {/* Limited Supply Alert */}
              <Card className="border-red-200 bg-red-50">
                <CardContent className="p-3 sm:p-4">
                  <div className="flex items-center">
                    <AlertCircle className="h-4 w-4 sm:h-5 sm:w-5 text-red-600 mr-2 flex-shrink-0" />
                    <span className="text-red-800 text-xs sm:text-sm font-medium">
                      6 five-star hotels like this are already unavailable on our site.
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
