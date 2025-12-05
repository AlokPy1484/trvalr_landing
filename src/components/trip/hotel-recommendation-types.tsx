export interface HotelRecommendation {
  hotel_id: string;
  hotel_name: string;
  hotel_category: string; // e.g., "Luxury", "Boutique"
  hotel_location: HotelLocation;
  hotel_latitude: number;
  hotel_longitude: number;
  hotel_ratings: number; // e.g., 4.5
  review_count: number;
  rating_source: string; // e.g., "TripAdvisor", "Booking.com"
  amenities: string[];
  price_per_night: number;
  currency: string; // e.g., "USD"
  why_recommended: string;
}

export interface HotelLocation {
  street_name: string;
  area: string;
  city: string;
  state: string;
  country: string;
  postal_code: string;
}
