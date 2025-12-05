"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Download,
  FileEdit,
  MessageSquare,
  Maximize,
  CreditCard,
  List,
  Calendar,
  Luggage,
} from "lucide-react";
import { ItineraryTabs } from "./ItineraryTabs";
import { ItineraryDayCard } from "./ItineraryDayCard";
import { useLanguage } from "@/contexts/LanguageContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CalendarView, type TripDay } from "./CalendarView";
import { ActivityCard } from "./ActivityCard";
import { ItineraryData } from "@/app/trip-details/trips-types";
import { formatDate } from "@/lib/utils";
import { HotelRecommendation } from "./hotel-recommendation-types";
import { MapModal } from "./MapModal";
import { Maximize2 } from "lucide-react";
import { LocationPalette } from "./LocationPalette";

// Mock locations - should match LocationPalette
const mockLocations = [
  { id: '1', name: 'Promenade des Anglais', address: 'Nice, France', category: 'Attraction' },
  { id: '2', name: 'Old Town (Vieux Nice)', address: 'Nice, France', category: 'Attraction' },
  { id: '3', name: 'Castle Hill', address: 'Nice, France', category: 'Attraction' },
  { id: '4', name: 'Cours Saleya Market', address: 'Nice, France', category: 'Market' },
  { id: '5', name: 'Musée Matisse', address: 'Nice, France', category: 'Museum' },
  { id: '6', name: 'Villa Ephrussi de Rothschild', address: 'Saint-Jean-Cap-Ferrat, France', category: 'Museum' },
  { id: '7', name: 'Monaco', address: 'Monaco', category: 'City' },
  { id: '8', name: 'Cannes', address: 'Cannes, France', category: 'City' },
  { id: '9', name: 'Antibes', address: 'Antibes, France', category: 'City' },
  { id: '10', name: 'Eze Village', address: 'Èze, France', category: 'Village' },
  { id: '11', name: 'Le Chantecler', address: 'Nice, France', category: 'Restaurant' },
  { id: '12', name: 'La Merenda', address: 'Nice, France', category: 'Restaurant' },
];

interface ItinerarySectionProps {
  tripTitle: string;
  tripDateRange: string;
  tripDetails: ItineraryData;
  onTripDetailsUpdate?: (updatedTripDetails: ItineraryData) => void;
}

// Static data remains the same as before
const niceDay1Data = {
  dayTitleKey: "itineraryDay1NiceTitle",
  dayTitleFallback: "Day 1: Arrival and Relaxing Evening in Nice",
  date: "15 Jul, 2025",
  descriptionKey: "itineraryDay1NiceDesc",
  descriptionFallback:
    "Arrive in Nice after your long drive from Berlin and check in at Hotel Le Negresco. Spend a relaxing evening strolling along the iconic Promenade des Anglais, enjoying the sea breeze and beautiful sunset. For dinner, indulge in exquisite French cuisine at Le Chantecler, the Michelin-starred restaurant inside your hotel, perfect for a luxurious yet restful first night.",
  linkableTexts: [
    { textKey: "hotelLeNegresco", textFallback: "Hotel Le Negresco" },
    { textKey: "promenadeDesAnglais", textFallback: "Promenade des Anglais" },
    { textKey: "leChantecler", textFallback: "Le Chantecler" },
  ],
  tipsKey: "itineraryDay1NiceTips",
  tipsFallback:
    "After a long drive, keep activities light and enjoy the calming sea views to unwind and adjust to the local time.",
  activities: [
    {
      typeKey: "activityTypeTravel",
      fallbackType: "Travel",
      titleKey: "activityTravelBerlinNiceTitle",
      fallbackTitle: "Drive from Berlin → Nice",
      duration: "12h 30 min",
      icon: "Car",
      aiHint: "car dashboard road",
    },
    {
      typeKey: "activityTypeAccommodation",
      fallbackType: "Accommodation",
      titleKey: "hotelLeNegresco",
      fallbackTitle: "Hotel Le Negresco",
      time: "3:00 PM",
      duration: "1h 15min",
      imageUrl:
        "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?q=80&w=100&h=100&fit=crop",
      imageAlt: "Luxury hotel room with a balcony view",
      aiHint: "luxury hotel room",
      rating: 9.2,
      reviewsKey: "hotelReviews",
      fallbackReviews: "Wonderful (1719 Reviews)",
      priceKey: "hotelPrice",
      fallbackPrice: "₹139,796 per night • 2 guests",
      icon: "Hotel",
      distanceToNext: "50m walk",
    },
    {
      typeKey: "activityTypeAttraction",
      fallbackType: "Attraction",
      titleKey: "promenadeDesAnglais",
      fallbackTitle: "Promenade des Anglais",
      time: "4:15 PM",
      duration: "45min",
      imageUrl:
        "https://images.unsplash.com/photo-1558996422-5503b3f4137dfe?q=80&w=400&h=300&fit=crop",
      imageAlt: "Promenade des Anglais in Nice with its iconic blue chairs",
      aiHint: "nice promenade chairs",
      categoryKey: "attractionCategorySight",
      fallbackCategory: "Sightseeing Spot",
      icon: "Attraction",
    },
  ],
};

const niceDay2Data = {
  dayTitleKey: "itineraryDay2NiceTitleNew",
  dayTitleFallback: "Day 2: Vibrant Markets, Old Town Charm & Scenic Drive",
  date: "16 Jul, 2025",
  descriptionKey: "itineraryDay2NiceDescNew",
  descriptionFallback:
    "Start your day with a visit to the vibrant Cours Saleya Flower Market to experience local colors and flavors. Then explore the charming Nice Old Town (Vieux Nice) with its narrow streets and lively atmosphere. Enjoy lunch at La Petite Maison, known for its refined Niçoise cuisine. In the afternoon, embark on the exciting From Nice: 2-Hour Scenic Drive by 3-Wheel Vehicle tour, a fun and unique way to discover the French Riviera's highlights. End the day with a casual dinner at Bistrot d'Antoine, a local favorite with a cozy ambiance.",
  linkableTexts: [
    { textKey: "coursSaleya", textFallback: "Cours Saleya Flower Market" },
    { textKey: "vieuxNice", textFallback: "Nice Old Town (Vieux Nice)" },
    { textKey: "laPetiteMaison", textFallback: "La Petite Maison" },
    {
      textKey: "fromNice2HourScenicDrive",
      textFallback: "From Nice: 2-Hour Scenic Drive by 3-Wheel Vehicle",
    },
    { textKey: "bistrotDAntoine", textFallback: "Bistrot d'Antoine" },
  ],
  tipsKey: "itineraryDay2NiceTipsNew",
  tipsFallback:
    "Book the 3-wheel vehicle tour in advance to secure your preferred time and enjoy a memorable adventure.",
  activities: [
    {
      typeKey: "activityTypeAttraction",
      fallbackType: "Attraction",
      titleKey: "activityCoursSaleyaTitle",
      fallbackTitle: "Cours Saleya Flower Market",
      time: "10:00 AM",
      duration: "1h",
      imageUrl:
        "https://images.unsplash.com/photo-1562916568-3654054a140f?q=80&w=400&h=300&fit=crop",
      imageAlt: "Colorful flowers at a bustling market",
      aiHint: "flower market",
      categoryKey: "attractionCategoryMarket",
      fallbackCategory: "Market Visit",
      icon: "Attraction",
      distanceToNext: "200m walk",
    },
    {
      typeKey: "activityTypeAttraction",
      fallbackType: "Attraction",
      titleKey: "activityNiceOldTownTitle",
      fallbackTitle: "Nice Old Town (Vieux Nice)",
      time: "11:00 AM",
      duration: "1.5h",
      imageUrl:
        "https://images.unsplash.com/photo-1588892955217-a9a3b2598322?q=80&w=400&h=300&fit=crop",
      imageAlt: "Charming colorful street in Nice Old Town",
      aiHint: "nice old town",
      categoryKey: "attractionCategoryCultural",
      fallbackCategory: "Cultural Exploration",
      icon: "Attraction",
      distanceToNext: "500m walk",
    },
    {
      typeKey: "activityTypeActivity",
      fallbackType: "Activity",
      titleKey: "activityScenicDrive3WheelTitle",
      fallbackTitle: "From Nice: 2-Hour Scenic Drive by 3-Wheel Vehicle",
      time: "2:00 PM",
      duration: "2 hours",
      imageUrl:
        "https://images.unsplash.com/photo-1520175488228-40a4a44062a4?q=80&w=400&h=300&fit=crop",
      imageAlt: "A fun 3-wheel vehicle parked on a scenic road",
      aiHint: "vehicle coastal view",
      personsKey: "activityScenicDrive3WheelPersons",
      fallbackPersons: "2 person",
      icon: "Car",
    },
  ],
};

const niceDay3Data = {
  dayTitleKey: "itineraryDay3NiceNewTitle",
  dayTitleFallback: "Day 3: Art, Views & Departure to Cannes",
  date: "17 Jul, 2025",
  descriptionKey: "itineraryDay3NiceNewDesc",
  descriptionFallback:
    "After checking out from Hotel Le Negresco, visit the Marc Chagall National Museum to immerse in beautiful art. Then take a leisurely walk through Massena Square (Place Masséna) and nearby Castle Hill (Colline du Château) for panoramic views of Nice and the coastline. Have a light lunch at Café de Turin, famous for its seafood. Depart for Cannes by car in the early afternoon, a short 1-hour drive, ready for the next leg of your luxury trip.",
  linkableTexts: [
    { textKey: "hotelLeNegresco", textFallback: "Hotel Le Negresco" },
    {
      textKey: "marcChagallMuseum",
      textFallback: "Marc Chagall National Museum",
    },
    {
      textKey: "massenaSquare",
      textFallback: "Massena Square (Place Masséna)",
    },
    { textKey: "castleHill", textFallback: "Castle Hill (Colline du Château)" },
    { textKey: "cafeDeTurin", textFallback: "Café de Turin" },
  ],
  tipsKey: "itineraryDay3NiceNewTips",
  tipsFallback:
    "Morning visits are best to avoid crowds and enjoy cooler temperatures before your drive to Cannes.",
  activities: [
    {
      typeKey: "activityTypeAttraction",
      fallbackType: "Attraction",
      titleKey: "marcChagallMuseumActivityTitle",
      fallbackTitle: "Marc Chagall National Museum",
      time: "9:30 AM",
      duration: "1.5h",
      imageUrl:
        "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?q=80&w=400&h=300&fit=crop",
      imageAlt: "Interior of an art museum with stained glass",
      aiHint: "art museum",
      categoryKey: "attractionCategoryMuseum",
      fallbackCategory: "Museum",
      icon: "Attraction",
      distanceToNext: "1.5km walk",
    },
    {
      typeKey: "activityTypeAttraction",
      fallbackType: "Attraction",
      titleKey: "massenaSquareActivityTitle",
      fallbackTitle: "Massena Square (Place Masséna)",
      time: "11:00 AM",
      duration: "30min",
      imageUrl:
        "https://images.unsplash.com/photo-1562916568-3654054a140f?q=80&w=400&h=300&fit=crop",
      imageAlt: "The fountain and statues at Massena Square in Nice",
      aiHint: "nice square",
      categoryKey: "attractionCategorySight",
      fallbackCategory: "Sightseeing Spot",
      icon: "Attraction",
      distanceToNext: "800m walk",
    },
  ],
};

const cannesDay3Data = {
  date: "17 Jul, 2025",
  activities: [
    {
      typeKey: "activityTypeTravel",
      fallbackType: "Travel",
      titleKey: "activityTravelNiceCannesTitle",
      fallbackTitle: "Drive from Nice → Cannes",
      time: "1:00 PM",
      duration: "42 min",
      icon: "Car",
      aiHint: "car dashboard road",
    },
    {
      typeKey: "activityTypeAccommodation",
      fallbackType: "Accommodation",
      titleKey: "mobHotelCannesActivityTitle",
      fallbackTitle: "MOB HOTEL Cannes",
      time: "2:00 PM",
      duration: "1.5h",
      imageUrl:
        "https://images.unsplash.com/photo-1540541338287-41700207dee6?q=80&w=400&h=300&fit=crop",
      imageAlt: "Swimming pool at MOB HOTEL Cannes",
      aiHint: "hotel pool luxury",
      rating: 8.4,
      reviewsKey: "mobHotelReviewsCannes",
      fallbackReviews: "Very Good (198 Reviews)",
      discountKey: "mobHotelDiscount",
      fallbackDiscount: "15% off",
      priceKey: "mobHotelPriceCannes",
      fallbackPrice: "₹24,108 per night • 2 guests",
      icon: "Hotel",
      distanceToNext: "2km walk",
    },
    {
      typeKey: "activityTypeAttraction",
      fallbackType: "Attraction",
      titleKey: "leSuquetAttractionTitleCannes",
      fallbackTitle: "Le Suquet",
      time: "4:00 PM",
      duration: "1.5h",
      imageUrl:
        "https://images.unsplash.com/photo-1616686417942-0f0438a0f9f8?q=80&w=400&h=300&fit=crop",
      imageAlt: "View of Cannes harbor from Le Suquet old town",
      aiHint: "cannes harbor view",
      categoryKey: "attractionCategoryGeneral",
      fallbackCategory: "Attraction",
      icon: "Attraction",
    },
  ],
};

const cannesDay4Data = {
  date: "18 Jul, 2025",
  activities: [
    {
      typeKey: "activityTypeActivity",
      fallbackType: "Activity",
      titleKey: "cannesPrivateBoatTrip",
      fallbackTitle:
        "Cannes: Private Boat Trip to Lerins Islands & Cap d'Antibes",
      time: "10:00 AM",
      duration: "3 hours",
      imageUrl:
        "https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?q=80&w=400&h=300&fit=crop",
      imageAlt: "A boat near the Lerins Islands in Cannes",
      aiHint: "boat cove",
      personsKey: "cannesPrivateBoatTripPersons",
      fallbackPersons: "2 person",
      icon: "Sailboat",
    },
  ],
};

const cannesDay5Data = {
  date: "19 Jul, 2025",
  activities: [
    {
      typeKey: "activityTypeAttraction",
      fallbackType: "Attraction",
      titleKey: "marcheForvilleActivityTitle",
      fallbackTitle: "Marché Forville",
      time: "9:00 AM",
      duration: "1h",
      imageUrl:
        "https://images.unsplash.com/photo-1533900298318-6b8da08a523e?q=80&w=100&h=100&fit=crop",
      imageAlt: "Fresh produce at Marché Forville",
      aiHint: "french market",
      categoryKey: "attractionCategoryMarket",
      fallbackCategory: "Market Visit",
      icon: "Attraction",
      distanceToNext: "600m walk",
    },
  ],
};

const stTropezDay5Data = {
  date: "19 Jul, 2025",
  activities: [
    {
      typeKey: "activityTypeTravel",
      fallbackType: "Travel",
      titleKey: "activityTravelCannesStTropezTitle",
      fallbackTitle: "Drive from Cannes → Saint-Tropez",
      time: "11:00 AM",
      duration: "1h 28 min",
      icon: "Car",
      aiHint: "car dashboard road",
    },
    {
      typeKey: "activityTypeAccommodation",
      fallbackType: "Accommodation",
      titleKey: "villaCosyHotelSpaActivityTitle",
      fallbackTitle: "Villa Cosy, hotel & spa",
      time: "1:00 PM",
      duration: "2h",
      imageUrl:
        "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?q=80&w=100&h=100&fit=crop",
      imageAlt: "Luxurious spa at Villa Cosy",
      aiHint: "resort pool",
      rating: 9.2,
      reviewsKey: "villaCosyHotelSpaReviews",
      fallbackReviews: "Wonderful (231 Reviews)",
      priceKey: "villaCosyHotelSpaPrice",
      fallbackPrice: "₹365,789 per night • 2 guests",
      icon: "Hotel",
      distanceToNext: "1.2km walk",
    },
  ],
};

const stTropezDay6Data = {
  date: "20 Jul, 2025",
  activities: [
    {
      typeKey: "activityTypeActivity",
      fallbackType: "Activity",
      titleKey: "coteDAzurSailingTourActivityTitle",
      fallbackTitle: "Côte d'Azur: Half-Day Coastline Catamaran Sailing Tour",
      time: "9:00 AM",
      duration: "3 hours",
      imageUrl:
        "https://images.unsplash.com/photo-1510528445852-a602d18c1483?q=80&w=400&h=300&fit=crop",
      imageAlt: "Catamaran sailing on the Côte d'Azur",
      aiHint: "catamaran sailing",
      personsKey: "coteDAzurSailingTourPersons",
      fallbackPersons: "2 person",
      icon: "Sailboat",
      distanceToNext: "3km drive",
    },
  ],
};

const stTropezDay7Data = {
  date: "21 Jul, 2025",
  activities: [
    {
      typeKey: "activityTypeActivity",
      fallbackType: "Activity",
      titleKey: "stTropezKayakExperienceActivityTitle",
      fallbackTitle: "Saint-Tropez: Kayak Experience in Ramatuelle Reserve",
      time: "10:00 AM",
      duration: "3 hours",
      imageUrl:
        "https://images.unsplash.com/photo-1581454159339-01a719918349?q=80&w=400&h=300&fit=crop",
      imageAlt: "Kayaking in the clear waters of Ramatuelle Reserve",
      aiHint: "kayak sea",
      personsKey: "stTropezKayakExperiencePersons",
      fallbackPersons: "2 person",
      icon: "Sailboat",
      distanceToNext: "4km drive",
    },
  ],
};

const stTropezDay8Data = {
  date: "22 Jul, 2025",
  activities: [
    {
      typeKey: "activityTypeTravel",
      fallbackType: "Travel",
      titleKey: "activityTravelStTropezBerlinTitle",
      fallbackTitle: "Drive from Saint-Tropez → Berlin",
      time: "9:00 AM",
      duration: "13h 45 min",
      icon: "Car",
      aiHint: "car dashboard road",
    },
  ],
};

export function ItinerarySection({
  tripTitle,
  tripDateRange,
  tripDetails,
  onTripDetailsUpdate,
}: ItinerarySectionProps) {
  const { getTranslation } = useLanguage();
  const router = useRouter();
  const [location, setLocation] = useState<string | "">(
    tripDetails?.destination
  );
  const [selectedHotel, setSelectedHotel] = useState<string | "">("");
  const [checkoutHotels, setCheckoutHotels] = useState<HotelRecommendation[]>(
    []
  );
  const [isMapModalOpen, setIsMapModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingDayIndex, setEditingDayIndex] = useState<number | null>(null);
  const [editingLocationIndex, setEditingLocationIndex] = useState<number | null>(null);
  const [originalTripDetails, setOriginalTripDetails] = useState<ItineraryData | null>(null);
  const [workingTripDetails, setWorkingTripDetails] = useState<ItineraryData | null>(tripDetails);
  const [activeLocationTab, setActiveLocationTab] = useState<string>("");
  
  // Update working trip details when tripDetails prop changes
  React.useEffect(() => {
    if (tripDetails) {
      setWorkingTripDetails(tripDetails);
      // Set initial active location tab if not set
      if (!activeLocationTab && tripDetails.itinerary?.length > 0) {
        setActiveLocationTab(tripDetails.itinerary[0].location);
      }
    }
  }, [tripDetails]);
  
  // Helper function to replace location text in markdown link
  const replaceLocationInText = (text: string, oldLocation: string, newLocation: string): string => {
    // Match markdown links that contain the old location text
    const linkPattern = new RegExp(`\\[${oldLocation.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\]\\([^)]+\\)`, 'gi');
    return text.replace(linkPattern, (match) => {
      // Replace the link text but keep the URL
      const urlMatch = match.match(/\(([^)]+)\)/);
      const url = urlMatch ? urlMatch[1] : '';
      return `[${newLocation}](${url})`;
    });
  };
  
  // Helper function to handle location updates (temporary, not saved yet)
  const handleLocationUpdate = (oldLocation: string, newLocation: string) => {
    if (editingDayIndex !== null && editingLocationIndex !== null && workingTripDetails?.itinerary) {
      const updatedItinerary = [...workingTripDetails.itinerary];
      const locationIndex = editingLocationIndex;
      
      if (locationIndex !== -1 && updatedItinerary[locationIndex]?.days) {
        const dayIndex = editingDayIndex;
        if (dayIndex !== -1 && updatedItinerary[locationIndex].days[dayIndex]) {
          // Update the activity description with new location
          const updatedDays = [...updatedItinerary[locationIndex].days];
          const updatedActivities = { ...updatedDays[dayIndex].activities };
          
          // Update activity descriptions by replacing the specific location link
          const updateActivityDescription = (activity: any) => {
            if (!activity) return activity;
            return {
              ...activity,
              description: replaceLocationInText(activity.description, oldLocation, newLocation)
            };
          };
          
          if (updatedActivities.morning) {
            updatedActivities.morning = updateActivityDescription(updatedActivities.morning);
          }
          if (updatedActivities.afternoon) {
            updatedActivities.afternoon = updateActivityDescription(updatedActivities.afternoon);
          }
          if (updatedActivities.evening) {
            updatedActivities.evening = updateActivityDescription(updatedActivities.evening);
          }
          if (updatedActivities.night) {
            updatedActivities.night = updateActivityDescription(updatedActivities.night);
          }
          
          updatedDays[dayIndex] = {
            ...updatedDays[dayIndex],
            activities: updatedActivities
          };
          
          updatedItinerary[locationIndex] = {
            ...updatedItinerary[locationIndex],
            days: updatedDays
          };
          
          const updatedTripDetails = {
            ...workingTripDetails,
            itinerary: updatedItinerary
          };
          
          // Update working copy (not saved yet)
          setWorkingTripDetails(updatedTripDetails);
        }
      }
    }
  };
  
  // Handle save - apply changes permanently
  const handleSave = () => {
    if (workingTripDetails) {
      onTripDetailsUpdate?.(workingTripDetails);
      setIsEditMode(false);
      // Keep the current location tab active - don't reset it
      setEditingDayIndex(null);
      setEditingLocationIndex(null);
      setOriginalTripDetails(null);
    }
  };
  
  // Handle cancel - revert to original
  const handleCancel = () => {
    if (originalTripDetails) {
      setWorkingTripDetails(originalTripDetails);
      onTripDetailsUpdate?.(originalTripDetails);
    }
    setIsEditMode(false);
    // Keep the current location tab active - don't reset it
    setEditingDayIndex(null);
    setEditingLocationIndex(null);
    setOriginalTripDetails(null);
  };
  
  // Handle edit mode start
  const handleEditStart = (locationIdx: number, dayIndex: number) => {
    // Save original state
    if (tripDetails) {
      setOriginalTripDetails(JSON.parse(JSON.stringify(tripDetails))); // Deep copy
      setWorkingTripDetails(JSON.parse(JSON.stringify(tripDetails))); // Deep copy
    }
    setIsEditMode(true);
    setEditingDayIndex(dayIndex);
    setEditingLocationIndex(locationIdx);
  };
  
  // Convert tripDetails to calendar view format
  const tripDays: TripDay[] = React.useMemo(() => {
    if (!tripDetails?.itinerary) return [];
    
    const days: TripDay[] = [];
    let dayCounter = 1;
    
    tripDetails.itinerary.forEach((location) => {
      location.days?.forEach((day) => {
        // Convert activities to the format expected by CalendarView
        const activities: any[] = [];
        
        // Add morning activity
        if (day.activities?.morning?.title) {
          activities.push({
            type: 'Morning',
            title: day.activities.morning.title || 'Morning Activities',
            duration: '4 hours',
            icon: 'Sunrise',
            time: '8:00 AM',
            location: location.location,
            description: day.activities.morning.description,
          });
        }
        
        // Add afternoon activity
        if (day.activities?.afternoon?.title) {
          activities.push({
            type: 'Afternoon',
            title: day.activities.afternoon.title || 'Afternoon Activities',
            duration: '5 hours',
            icon: 'Sun',
            time: '12:00 PM',
            location: location.location,
            description: day.activities.afternoon.description,
          });
        }
        
        // Add evening activity
        if (day.activities?.evening?.title) {
          activities.push({
            type: 'Evening',
            title: day.activities.evening.title || 'Evening Activities',
            duration: '4 hours',
            icon: 'Sunset',
            time: '5:00 PM',
            location: location.location,
            description: day.activities.evening.description,
          });
        }
        
        // Add night activity
        if (day.activities?.night?.title) {
          activities.push({
            type: 'Night',
            title: day.activities.night.title || 'Night Activities',
            duration: '3 hours',
            icon: 'Moon',
            time: '9:00 PM',
            location: location.location,
            description: day.activities.night.description,
          });
        }
        
        days.push({
          day: dayCounter++,
          date: formatDate(day.date).slice(0, -5), // Remove year, keep "Mon, Jan 15"
          activities: activities,
        });
      });
    });
    
    return days;
  }, [tripDetails]);

  const mapActivityData = (activity: any) => ({
    type: getTranslation(activity.typeKey, activity.fallbackType),
    title: getTranslation(activity.titleKey, activity.fallbackTitle),
    duration: activity.durationKey
      ? getTranslation(activity.durationKey, activity.fallbackDuration)
      : activity.duration,
    persons: activity.personsKey
      ? getTranslation(activity.personsKey, activity.fallbackPersons)
      : undefined,
    reviews: activity.reviewsKey
      ? getTranslation(activity.reviewsKey, activity.fallbackReviews)
      : undefined,
    price: activity.priceKey
      ? getTranslation(activity.priceKey, activity.fallbackPrice)
      : undefined,
    discount: activity.discountKey
      ? getTranslation(activity.discountKey, activity.fallbackDiscount)
      : undefined,
    category: activity.categoryKey
      ? getTranslation(activity.categoryKey, activity.fallbackCategory)
      : undefined,
    imageUrl: activity.imageUrl,
    imageAlt:
      activity.imageAlt ||
      `${getTranslation(activity.titleKey, activity.fallbackTitle)} image`,
    aiHint: activity.aiHint || "placeholder",
    icon: activity.icon,
    rating: activity.rating,
    time: activity.time,
    distanceToNext: activity.distanceToNext,
  });

  const handleCheckout = () => {
    // if(localStorage.getItem("checkoutHotels"))
    router.push("/order-summary");
  };
  useEffect(() => {
    const saved = localStorage.getItem("checkoutHotels");
    if (saved) {
      setCheckoutHotels(JSON.parse(saved));
    }
  }, []);

  // Save to localStorage whenever checkoutHotels changes
  useEffect(() => {
    localStorage.setItem("checkoutHotels", JSON.stringify(checkoutHotels));
  }, [checkoutHotels]);

  const handleSelect = (
    hotel: HotelRecommendation,
    checked: boolean,
    locationKey: string,
    start_date: string,
    end_date: string
  ) => {
    setSelectedHotel(checked ? hotel.hotel_id : "");

    setCheckoutHotels((prev) => {
      if (checked) {
        //Remove any other hotel from this same location group
        const filtered = prev.filter((h) => h.location !== locationKey);

        // Add the newly checked hotel with its locationKey
        return [
          ...filtered,
          {
            ...hotel,
            location: locationKey,
            travellers: tripDetails?.travellers,
            start_date,
            end_date,
          },
        ];
      } else {
        // Remove if unchecked
        return prev.filter((h) => h.hotel_id !== hotel.hotel_id);
      }
    });
  };

  useEffect(() => {
    if (tripDetails?.destination) {
      setLocation(tripDetails?.destination);
      // setLocation(`${tripDetails?.itinerary[0]?.latitude},${tripDetails?.itinerary[0]?.longitude}`)
    }
  }, [tripDetails]);
  return (
    <section className="py-4 sm:py-6 md:py-8 lg:py-12">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-6 md:gap-8">
        <div className="md:col-span-7 lg:col-span-8 space-y-4 sm:space-y-6 order-2 md:order-1">
          <Tabs defaultValue="itinerary" className="w-full">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-0 mb-4 sm:mb-6">
              <TabsList className="bg-muted p-1 rounded-lg w-full sm:w-auto">
                <TabsTrigger
                  value="itinerary"
                  className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm px-2 sm:px-3"
                >
                  <List className="h-3 w-3 sm:h-4 sm:w-4" />
                  <span className="hidden min-[375px]:inline">Itinerary</span>
                  <span className="min-[375px]:hidden">List</span>
                </TabsTrigger>
                <TabsTrigger
                  value="calendar"
                  className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm px-2 sm:px-3"
                >
                  <Calendar className="h-3 w-3 sm:h-4 sm:w-4" />
                  <span className="hidden min-[375px]:inline">Calendar</span>
                  <span className="min-[375px]:hidden">Cal</span>
                </TabsTrigger>
                <TabsTrigger
                  value="bookings"
                  className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm px-2 sm:px-3"
                >
                  <CreditCard className="h-3 w-3 sm:h-4 sm:w-4" />
                  <span className="hidden min-[375px]:inline">Bookings</span>
                  <span className="min-[375px]:hidden">Book</span>
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="itinerary">
              <ItineraryTabs 
                tripData={tripDetails} 
                setLocation={setLocation}
                activeTab={activeLocationTab}
                onTabChange={setActiveLocationTab}
              >
                {tripDetails?.itinerary?.map((itinerary, idx) => (
                  <TabsContent key={idx} value={itinerary.location}>
                    <div className="mb-3 sm:mb-4">
                      <h3 className="text-lg sm:text-xl font-semibold text-foreground">
                        {/* {getTranslation('niceFranceLocation', 'Nice, France')} ({getTranslation('niceDurationDays', '1 - 3 Days')}) */}
                        {itinerary?.location}
                      </h3>
                      <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                        {/* {getTranslation('niceDescriptionIntro', 'Nice is a stunning city on the French Riviera known for its beautiful beaches, vibrant old town, and luxury shopping. It's perfect for couples looking to explore cultural sites and en...')} */}
                        {itinerary?.description}
                        {/* <button className="text-primary hover:underline text-sm ml-1">{getTranslation('readMore', 'Read more')}</button> */}
                      </p>
                    </div>
                    {(workingTripDetails?.itinerary?.[idx]?.days || itinerary?.days)?.map((currDay, id) => {
                      // Use working copy if in edit mode, otherwise use original
                      const dayData = isEditMode && workingTripDetails?.itinerary?.[idx]?.days?.[id] 
                        ? workingTripDetails.itinerary[idx].days[id] 
                        : currDay;
                      
                      return (
                        <ItineraryDayCard
                          key={id}
                          dayTitleKey={dayData?.title}
                          dayTitleFallback={niceDay1Data.dayTitleFallback}
                          date={formatDate(dayData?.date)}
                          activities={dayData?.activities}
                          descriptionFallback={niceDay1Data.descriptionFallback}
                          linkableTexts={niceDay1Data.linkableTexts}
                          tipsKey={dayData?.tips}
                          tipsFallback={niceDay1Data.tipsFallback}
                          dayno={dayData?.day}
                          isEditMode={isEditMode && editingDayIndex === id && editingLocationIndex === idx}
                          onEditClick={() => {
                            handleEditStart(idx, id);
                          }}
                          onCancelClick={() => {
                            handleCancel();
                          }}
                          onLocationUpdate={(oldLocation, newLocation) => {
                            handleLocationUpdate(oldLocation, newLocation);
                          }}
                        />
                      );
                    })}
                    <h3 className="text-base sm:text-lg font-semibold text-foreground mt-6 sm:mt-8 md:mt-10 mb-6 sm:mb-8 md:mb-10">
                      Hotel Recommendation
                    </h3>
                    <div className="pl-1 sm:pl-2 border-l-2 border-border ml-1">
                      {itinerary?.hotel_recommendations?.map(
                        (hotels, index) => (
                          <div key={index} className={index > 0 ? "mt-3" : ""}>
                            <ActivityCard
                              {...hotels}
                              isSelected={checkoutHotels.some(
                                (h) => h.hotel_id === hotels.hotel_id
                              )}
                              onSelect={(checked) =>
                                handleSelect(
                                  hotels,
                                  checked,
                                  itinerary.location,
                                  itinerary?.days[0]?.date,
                                  itinerary?.days[itinerary?.days?.length - 1]
                                    ?.date
                                )
                              }
                            />
                          </div>
                        )
                      )}
                    </div>
                  </TabsContent>
                ))}
              </ItineraryTabs>
            </TabsContent>

            <TabsContent value="calendar">
              <CalendarView
                tripDetails={tripDetails}
                tripDays={tripDays}
              />
            </TabsContent>

            <TabsContent value="bookings">
              <div className="space-y-4 sm:space-y-6">
                <div className="px-1">
                  <h3 className="text-lg sm:text-xl font-semibold text-foreground">
                    Your Confirmed Bookings
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                    Manage your reservations and view details for each booked
                    item on your trip.
                  </p>
                </div>
                
                <div className="flex flex-col items-center justify-center py-8 sm:py-12 px-4 text-center border-2 border-dashed border-border rounded-lg bg-muted/20">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-primary/10 flex items-center justify-center mb-3 sm:mb-4">
                    <Luggage className="h-8 w-8 sm:h-10 sm:w-10 text-primary" />
                  </div>
                  <p className="text-base sm:text-lg font-medium text-foreground mb-2">
                    Your adventure journal is waiting for its first story!
                  </p>
                  <p className="text-xs sm:text-sm text-muted-foreground max-w-md">
                    Select hotels from the itinerary to start building your perfect trip
                  </p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <div className="md:col-span-5 lg:col-span-4 space-y-4 sm:space-y-6 order-2">
          <div className="relative rounded-lg overflow-hidden shadow-lg w-full aspect-[4/3] min-h-[200px] sm:min-h-[250px] md:min-h-0 group">
            <iframe
              className="w-full h-full"
              src={`https://maps.google.com/maps?width=600&height=400&hl=en&q=${encodeURIComponent(
                location
              )}&t=&z=10&ie=UTF8&iwloc=B&output=embed`}
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={`Map of ${location}`}
            ></iframe>
            
            {/* Expand button */}
            <Button
              variant="secondary"
              size="icon"
              className="absolute top-2 right-2 sm:top-3 sm:right-3 h-8 w-8 sm:h-9 sm:w-9 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-card/95 hover:bg-card backdrop-blur-sm"
              onClick={() => setIsMapModalOpen(true)}
              aria-label="Expand map"
            >
              <Maximize2 className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            </Button>
          </div>
          
          {/* Map Modal */}
          <MapModal
            isOpen={isMapModalOpen}
            onClose={() => setIsMapModalOpen(false)}
            location={location}
            title={tripDetails?.title}
          />

          {/* Location Palette - Only visible in edit mode */}
          {isEditMode && (
            <LocationPalette
              isVisible={isEditMode}
              onLocationSelect={(location) => {
                // This will be handled by drag and drop or direct click on links
                // The location palette is mainly for dragging
              }}
              onClose={() => {
                // Close is handled by cancel button
              }}
              onSave={handleSave}
              onCancel={handleCancel}
            />
          )}

          <div className="p-3 sm:p-4 border rounded-lg bg-card shadow">
            <h4 className="font-semibold text-sm sm:text-base text-foreground mb-1 line-clamp-2">
              {tripDetails?.title}
            </h4>
            {/* <p className="text-sm text-muted-foreground mb-4">{tripDateRange}</p> */}
            <p className="text-xs sm:text-sm text-muted-foreground mb-3 sm:mb-4">
              {formatDate(tripDetails?.start_date ?? "").slice(0, -5) +
                " - " +
                formatDate(tripDetails?.end_date ?? "").slice(0, -5)}
            </p>
            <div className="flex items-center gap-1.5 sm:gap-2 mb-3">
              <Button
                variant="outline"
                size="icon"
                className="rounded-full h-8 w-8 sm:h-9 sm:w-9"
                aria-label={getTranslation(
                  "tripDetailsActionDownload",
                  "Download"
                )}
              >
                <Download className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="rounded-full h-8 w-8 sm:h-9 sm:w-9"
                aria-label={getTranslation("tripDetailsActionEdit", "Edit")}
              >
                <FileEdit className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="rounded-full h-8 w-8 sm:h-9 sm:w-9 bg-green-100 border-green-300 text-green-700 hover:bg-green-200"
                aria-label={getTranslation(
                  "shareViaWhatsApp",
                  "Share via WhatsApp"
                )}
              >
                <MessageSquare className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              </Button>
            </div>
            {checkoutHotels?.length > 0 ? (
              <Button
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90 text-sm sm:text-base h-9 sm:h-10"
                onClick={handleCheckout}
              >
                <CreditCard className="mr-2 h-3.5 w-3.5 sm:h-4 sm:w-4" />{" "}
                {getTranslation("checkout", "Check out")}
              </Button>
            ) : (
              <Button
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90 text-sm sm:text-base h-9 sm:h-10"
                disabled
              >
                <CreditCard className="mr-2 h-3.5 w-3.5 sm:h-4 sm:w-4" />{" "}
                {getTranslation("checkout", "Check out")}
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
