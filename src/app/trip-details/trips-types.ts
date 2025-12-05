export type HotelLocation = {
  street_name: string;
  area: string;
  city: string;
  state: string;
  country: string;
  postal_code: string;
};

export type HotelRecommendation = {
  hotel_id: string;
  hotel_name: string;
  hotel_category: string;
  hotel_location: HotelLocation;
  hotel_latitude: number;
  hotel_longitude: number;
  hotel_ratings: number;
  review_count: number;
  rating_source: string;
  amenities: string[];
  price_per_night: number;
  currency: string;
  why_recommended: string;
};
export type Activities={
morning:Activity,
afternoon:Activity,
evening:Activity,
night:Activity
}

export type Activity={
  title:string,
  description:string,
  start_time:string,
  end_time:string
}
export type DayPlan = {
  day: number;
  date: string;
  title: string;
  activities:Activities
  tips:string;
};

export type ItineraryLocation = {
  location: string;
  description: string;
  latitude: number;
  longitude: number;
  hotel_recommendations: HotelRecommendation[];
  days: DayPlan[];
};

export type ImageData = {
  raw: string;
  full: string;
  regular: string;
  small: string;
  thumb: string;
  small_s3: string;
};

export type ItineraryData = {
  status: string;
  message: string;
  title: string;
  destination: string;
  destination_city_code: string;
  budget_type:string
  duration_days: number;
  start_date: string;
  end_date: string;
  travellers: number;
  trip_type: string[];
  description: string;
  highlights: string[];
  itinerary: ItineraryLocation[];
  images: ImageData[];
};
