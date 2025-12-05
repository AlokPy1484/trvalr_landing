
export type AppCategory =
  | 'rideHailing'
  | 'foodDelivery'
  | 'publicTransit'
  | 'payments'
  | 'events';

export interface App {
  id: string;
  name: string;
  logoUrl: string;
  logoAiHint: string;
  description: string;
  badges: string[];
  rating: number;
  platforms: ('iOS' | 'Android')[];
  category: AppCategory;
  tags: string[]; // e.g., 'essentials', 'free', 'offline', 'highly-rated'
  androidUrl: string | null;
  iosUrl: string | null;
}

// API Response Types
export interface ApiAppPlatform {
  url: string | null;
  icon: string | null;
  available?: boolean;
}

export interface ApiApp {
  name: string;
  summary: string;
  score: number;
  android: ApiAppPlatform;
  ios: ApiAppPlatform;
}

export interface ApiCategory {
  category: string;
  apps: ApiApp[];
}

export interface ApiResponse {
  location: string;
  countryCode: string;
  status: string;
  categories: ApiCategory[];
}