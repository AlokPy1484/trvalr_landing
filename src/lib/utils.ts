import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function formatDate(dateString: string): string {
  const dateObj = new Date(dateString);

  return dateObj.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export function daysBetween(startDate: string, endDate: string): number {
  if(startDate===endDate) return 1;
  const start = new Date(startDate);
  const end = new Date(endDate);

  // Get difference in milliseconds
  const diffInMs = end.getTime() - start.getTime();

  // Convert ms → days
  return Math.ceil(diffInMs / (1000 * 60 * 60 * 24));
}

// Saved Trips Utilities
export interface SavedTrip {
  id: string;
  itineraryData: any; // ItineraryData type
  promptInput?: string;
  savedAt: string;
  title: string;
  destination: string;
  startDate: string;
  endDate: string;
  duration: number;
  heroImageUrl: string;
  isPublic?: boolean;
  authorId?: string;
  authorName?: string;
}

export interface PublicItinerary extends SavedTrip {
  views: number;
  ratings: {
    userId: string;
    rating: number; // 1-5
  }[];
  averageRating: number;
  totalRatings: number;
  createdAt: string;
}

const SAVED_TRIPS_KEY = 'savedTrips';
const PUBLIC_ITINERARIES_KEY = 'publicItineraries';

export function saveTrip(itineraryData: any, promptInput?: string, isPublic: boolean = false, authorId?: string, authorName?: string): string {
  if (typeof window === 'undefined') return '';
  
  const savedTrips = getSavedTrips();
  const tripId = `trip_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  
  const savedTrip: SavedTrip = {
    id: tripId,
    itineraryData,
    promptInput,
    savedAt: new Date().toISOString(),
    title: itineraryData.title || 'Untitled Trip',
    destination: itineraryData.destination || 'Unknown',
    startDate: itineraryData.start_date || '',
    endDate: itineraryData.end_date || '',
    duration: itineraryData.duration_days || 0,
    heroImageUrl: itineraryData.images?.[0]?.full || itineraryData.images?.[0]?.regular || '',
    isPublic,
    authorId,
    authorName,
  };
  
  savedTrips.push(savedTrip);
  localStorage.setItem(SAVED_TRIPS_KEY, JSON.stringify(savedTrips));
  
  // If public, also add to public itineraries
  if (isPublic) {
    const publicItinerary: PublicItinerary = {
      ...savedTrip,
      views: 0,
      ratings: [],
      averageRating: 0,
      totalRatings: 0,
      createdAt: new Date().toISOString(),
    };
    
    const publicItineraries = getPublicItineraries();
    publicItineraries.push(publicItinerary);
    localStorage.setItem(PUBLIC_ITINERARIES_KEY, JSON.stringify(publicItineraries));
  }
  
  return tripId;
}

export function getSavedTrips(): SavedTrip[] {
  if (typeof window === 'undefined') return [];
  
  try {
    const saved = localStorage.getItem(SAVED_TRIPS_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch (error) {
    console.error('Error reading saved trips:', error);
    return [];
  }
}

export function deleteSavedTrip(tripId: string): boolean {
  if (typeof window === 'undefined') return false;
  
  try {
    const savedTrips = getSavedTrips();
    const filtered = savedTrips.filter(trip => trip.id !== tripId);
    localStorage.setItem(SAVED_TRIPS_KEY, JSON.stringify(filtered));
    return true;
  } catch (error) {
    console.error('Error deleting saved trip:', error);
    return false;
  }
}

export function isTripSaved(itineraryData: any): string | null {
  if (typeof window === 'undefined' || !itineraryData) return null;
  
  const savedTrips = getSavedTrips();
  const tripTitle = itineraryData.title;
  const tripDestination = itineraryData.destination;
  const tripStartDate = itineraryData.start_date;
  
  // Try to find by matching title, destination, and start date
  const found = savedTrips.find(trip => 
    trip.title === tripTitle &&
    trip.destination === tripDestination &&
    trip.startDate === tripStartDate
  );
  
  return found ? found.id : null;
}

export function getSavedTripById(tripId: string): SavedTrip | null {
  if (typeof window === 'undefined') return null;
  
  const savedTrips = getSavedTrips();
  return savedTrips.find(trip => trip.id === tripId) || null;
}

// Public Itineraries Utilities
export function getPublicItineraries(): PublicItinerary[] {
  if (typeof window === 'undefined') return [];
  
  try {
    const saved = localStorage.getItem(PUBLIC_ITINERARIES_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch (error) {
    console.error('Error reading public itineraries:', error);
    return [];
  }
}

export function getPublicItinerariesSortedByPopularity(): PublicItinerary[] {
  const itineraries = getPublicItineraries();
  
  // Sort by popularity: (averageRating * totalRatings) + views
  return itineraries.sort((a, b) => {
    const popularityA = (a.averageRating * a.totalRatings) + a.views;
    const popularityB = (b.averageRating * b.totalRatings) + b.views;
    return popularityB - popularityA;
  });
}

export function ratePublicItinerary(tripId: string, userId: string, rating: number): boolean {
  if (typeof window === 'undefined' || rating < 1 || rating > 5) return false;
  
  try {
    const publicItineraries = getPublicItineraries();
    const itineraryIndex = publicItineraries.findIndex(trip => trip.id === tripId);
    
    if (itineraryIndex === -1) return false;
    
    const itinerary = publicItineraries[itineraryIndex];
    
    // Remove existing rating by this user if any
    itinerary.ratings = itinerary.ratings.filter(r => r.userId !== userId);
    
    // Add new rating
    itinerary.ratings.push({ userId, rating });
    
    // Recalculate average rating
    const totalRating = itinerary.ratings.reduce((sum, r) => sum + r.rating, 0);
    itinerary.averageRating = totalRating / itinerary.ratings.length;
    itinerary.totalRatings = itinerary.ratings.length;
    
    publicItineraries[itineraryIndex] = itinerary;
    localStorage.setItem(PUBLIC_ITINERARIES_KEY, JSON.stringify(publicItineraries));
    
    return true;
  } catch (error) {
    console.error('Error rating itinerary:', error);
    return false;
  }
}

export function incrementItineraryViews(tripId: string): void {
  if (typeof window === 'undefined') return;
  
  try {
    const publicItineraries = getPublicItineraries();
    const itineraryIndex = publicItineraries.findIndex(trip => trip.id === tripId);
    
    if (itineraryIndex !== -1) {
      publicItineraries[itineraryIndex].views += 1;
      localStorage.setItem(PUBLIC_ITINERARIES_KEY, JSON.stringify(publicItineraries));
    }
  } catch (error) {
    console.error('Error incrementing views:', error);
  }
}

export function getUserRating(tripId: string, userId: string): number | null {
  if (typeof window === 'undefined') return null;
  
  const publicItineraries = getPublicItineraries();
  const itinerary = publicItineraries.find(trip => trip.id === tripId);
  
  if (!itinerary) return null;
  
  const userRating = itinerary.ratings.find(r => r.userId === userId);
  return userRating ? userRating.rating : null;
}

export function shareSavedTripPublicly(tripId: string, userId?: string, userName?: string): boolean {
  if (typeof window === 'undefined') return false;
  
  try {
    const savedTrips = getSavedTrips();
    const savedTrip = savedTrips.find(trip => trip.id === tripId);
    
    if (!savedTrip) return false;
    
    // Check if already public
    const publicItineraries = getPublicItineraries();
    const alreadyPublic = publicItineraries.find(trip => trip.id === tripId);
    
    if (alreadyPublic) {
      // Already shared, just update the saved trip flag
      const tripIndex = savedTrips.findIndex(trip => trip.id === tripId);
      if (tripIndex !== -1) {
        savedTrips[tripIndex].isPublic = true;
        savedTrips[tripIndex].authorId = userId || savedTrips[tripIndex].authorId;
        savedTrips[tripIndex].authorName = userName || savedTrips[tripIndex].authorName;
        localStorage.setItem(SAVED_TRIPS_KEY, JSON.stringify(savedTrips));
      }
      return true;
    }
    
    // Mark as public in saved trips
    const tripIndex = savedTrips.findIndex(trip => trip.id === tripId);
    if (tripIndex !== -1) {
      savedTrips[tripIndex].isPublic = true;
      savedTrips[tripIndex].authorId = userId || savedTrips[tripIndex].authorId || `user_${Date.now()}`;
      savedTrips[tripIndex].authorName = userName || savedTrips[tripIndex].authorName || 'Anonymous User';
      localStorage.setItem(SAVED_TRIPS_KEY, JSON.stringify(savedTrips));
    }
    
    // Add to public itineraries
    const publicItinerary: PublicItinerary = {
      ...savedTrip,
      isPublic: true,
      authorId: userId || savedTrip.authorId || `user_${Date.now()}`,
      authorName: userName || savedTrip.authorName || 'Anonymous User',
      views: 0,
      ratings: [],
      averageRating: 0,
      totalRatings: 0,
      createdAt: new Date().toISOString(),
    };
    
    publicItineraries.push(publicItinerary);
    localStorage.setItem(PUBLIC_ITINERARIES_KEY, JSON.stringify(publicItineraries));
    
    return true;
  } catch (error) {
    console.error('Error sharing trip publicly:', error);
    return false;
  }
}

export function isTripPublic(tripId: string): boolean {
  if (typeof window === 'undefined') return false;
  
  const publicItineraries = getPublicItineraries();
  return publicItineraries.some(trip => trip.id === tripId);
}


