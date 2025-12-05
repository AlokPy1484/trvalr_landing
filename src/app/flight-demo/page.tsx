'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plane, ArrowRight, Calendar, Users, MapPin } from 'lucide-react';
import Link from 'next/link';

export default function FlightDemoPage() {
  const [selectedTripType, setSelectedTripType] = useState<'return' | 'one-way' | 'multi-city'>('return');

  const tripTypes = [
    {
      id: 'return',
      title: 'Round Trip',
      description: 'Fly to your destination and back',
      icon: ArrowRight,
      features: ['Outbound and return flights', 'Same airline typically', 'Better pricing', 'Convenient scheduling'],
      example: 'New Delhi → Dubai → New Delhi'
    },
    {
      id: 'one-way',
      title: 'One-way',
      description: 'Fly to your destination only',
      icon: Plane,
      features: ['Single flight segment', 'Flexible return planning', 'Often cheaper per segment', 'Perfect for open-jaw trips'],
      example: 'New Delhi → Dubai'
    },
    {
      id: 'multi-city',
      title: 'Multi-city',
      description: 'Visit multiple destinations',
      icon: MapPin,
      features: ['Multiple destinations', 'Different airlines possible', 'Complex routing', 'Maximum flexibility'],
      example: 'New Delhi → Dubai → London → New Delhi'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-accent/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Flight Selection Demo</h1>
          <p className="text-xl text-muted-foreground mb-8">
            Experience our dynamic flight booking page that adapts to different trip types
          </p>
          <div className="flex justify-center gap-4 mb-8">
            {tripTypes.map((trip) => {
              const Icon = trip.icon;
              return (
                <Button
                  key={trip.id}
                  variant={selectedTripType === trip.id ? "default" : "outline"}
                  onClick={() => setSelectedTripType(trip.id as any)}
                  className="flex items-center gap-2"
                >
                  <Icon className="h-4 w-4" />
                  {trip.title}
                </Button>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {tripTypes.map((trip) => {
            const Icon = trip.icon;
            const isSelected = selectedTripType === trip.id;
            
            return (
              <Card key={trip.id} className={`transition-all ${isSelected ? 'ring-2 ring-primary shadow-lg' : ''}`}>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                      isSelected ? 'bg-primary text-primary-foreground' : 'bg-muted'
                    }`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <div>
                      <CardTitle className="text-xl">{trip.title}</CardTitle>
                      <p className="text-muted-foreground">{trip.description}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">Example Route:</h4>
                      <p className="text-sm text-muted-foreground">{trip.example}</p>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold mb-2">Key Features:</h4>
                      <ul className="space-y-1">
                        {trip.features.map((feature, index) => (
                          <li key={index} className="text-sm text-muted-foreground flex items-center gap-2">
                            <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="pt-4">
                      <Link href={`/flight-selection?tripType=${trip.id}`}>
                        <Button className="w-full" variant={isSelected ? "default" : "outline"}>
                          {isSelected ? 'View Selected Trip Type' : 'View This Trip Type'}
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="text-center">
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="flex items-center justify-center gap-2">
                <Plane className="h-5 w-5" />
                Try the Full Experience
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-6">
                Click on any trip type above to see how our flight selection page dynamically adapts 
                to show the appropriate flight segments, pricing, and booking flow.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/flights">
                  <Button variant="outline" className="w-full sm:w-auto">
                    <ArrowRight className="h-4 w-4 mr-2" />
                    Start Flight Search
                  </Button>
                </Link>
                <Link href={`/flight-selection?tripType=${selectedTripType}`}>
                  <Button className="w-full sm:w-auto">
                    <Calendar className="h-4 w-4 mr-2" />
                    View {tripTypes.find(t => t.id === selectedTripType)?.title} Selection
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="font-semibold mb-2">Responsive Design</h3>
              <p className="text-sm text-muted-foreground">
                Fully responsive layout that works perfectly on desktop, tablet, and mobile devices.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Plane className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="font-semibold mb-2">Dynamic Content</h3>
              <p className="text-sm text-muted-foreground">
                Content and pricing automatically adapt based on the selected trip type and flight segments.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="font-semibold mb-2">User-Friendly</h3>
              <p className="text-sm text-muted-foreground">
                Intuitive step-by-step process with clear progress indicators and helpful guidance.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
