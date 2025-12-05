
import type { LucideIcon } from 'lucide-react';

export interface Member {
  id: string;
  name: string;
  avatarUrl: string;
  aiHint: string;
  email?: string;
}

export interface UserVote {
  userId: string;
  userName: string;
  userAvatar: string;
  voteType: 'up' | 'maybe' | 'down';
  timestamp: Date;
}

export interface TripIdea {
  id: string;
  title: string;
  content?: string;
  image?: {
    src: string;
    aiHint: string;
  };
  votes: {
    up: number;
    maybe: number;
    down: number;
  };
  userVotes: UserVote[]; // Track individual user votes
  contributorId: string; // Who added this item
  contributorName: string;
  contributorAvatar: string;
  addedAt: Date;
  category: 'flights' | 'stays' | 'restaurants' | 'activities' | 'notes';
  metadata?: {
    price?: string;
    provider?: string;
    duration?: string;
    dates?: string;
    location?: string;
    rating?: number;
  };
  comments: number;
  isNew?: boolean; // Badge for recently added items
  rank?: number; // Current ranking position
}

export interface TripColumnData {
  id: string;
  title: string;
  iconColor?: string;
  ideas: TripIdea[];
}

export type SortOption = 'most-voted' | 'most-recent' | 'price-low' | 'price-high' | 'alphabetical';
export type FilterOption = {
  contributor?: string;
  dateRange?: { start: Date; end: Date };
  priceRange?: { min: number; max: number };
};
