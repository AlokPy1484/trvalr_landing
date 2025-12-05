
'use client';

import React, { useState, useCallback, useEffect } from 'react';
import { TripSyncDashboardLayout } from './TripSyncDashboardLayout';
import type { TripColumnData, Member, TripIdea } from './types';
import type { ActivityItem } from './ActivityFeed';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Header } from '@/components/layout/Header';
import { SubtleFooter } from '@/components/layout/SubtleFooter';

// Mock Data
const tripMembers: Member[] = [
  { 
    id: '1', 
    name: 'Phil Harrison', 
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=40&h=40&fit=crop', 
    aiHint: 'man portrait smiling',
    email: 'phil.harrison@example.com'
  },
  { 
    id: '2', 
    name: 'Emily Smith', 
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=40&h=40&fit=crop', 
    aiHint: 'woman portrait friendly',
    email: 'emily.smith@example.com'
  },
  { 
    id: '3', 
    name: 'Alex H.', 
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=40&h=40&fit=crop', 
    aiHint: 'man portrait glasses',
    email: 'alex.h@example.com'
  },
  { 
    id: '4', 
    name: 'Maria L.', 
    avatarUrl: 'https://images.unsplash.com/photo-1521146764736-56c929d59c83?q=80&w=40&h=40&fit=crop', 
    aiHint: 'woman portrait adventurous',
    email: 'maria.l@example.com'
  },
];

const now = new Date();
const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
const twoDaysAgo = new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000);
const threeDaysAgo = new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000);

const createInitialColumns = (): TripColumnData[] => [
  {
    id: 'flights',
    title: 'Flights',
    iconColor: 'text-blue-500',
    ideas: [
      {
        id: 'f1',
        title: 'Round Trip to NCE',
        content: 'Lufthansa, 2 layovers',
        category: 'flights',
        votes: { up: 3, maybe: 1, down: 0 },
        userVotes: [
          { userId: '1', userName: 'Phil Harrison', userAvatar: tripMembers[0].avatarUrl, voteType: 'up', timestamp: oneDayAgo },
          { userId: '2', userName: 'Emily Smith', userAvatar: tripMembers[1].avatarUrl, voteType: 'up', timestamp: oneDayAgo },
          { userId: '3', userName: 'Alex H.', userAvatar: tripMembers[2].avatarUrl, voteType: 'up', timestamp: twoDaysAgo },
          { userId: '4', userName: 'Maria L.', userAvatar: tripMembers[3].avatarUrl, voteType: 'maybe', timestamp: oneDayAgo },
        ],
        contributorId: '1',
        contributorName: 'Phil Harrison',
        contributorAvatar: tripMembers[0].avatarUrl,
        addedAt: threeDaysAgo,
        metadata: {
          price: '$850',
          provider: 'Lufthansa',
          duration: '8h 30m',
        },
        comments: 2,
        image: { src: 'https://logolook.net/wp-content/uploads/2021/11/Lufthansa-Logo.png', aiHint: 'lufthansa logo' },
        isNew: false,
      },
      {
        id: 'f2',
        title: 'One-way to NCE',
        content: 'Ryanair, direct flight',
        category: 'flights',
        votes: { up: 1, maybe: 1, down: 2 },
        userVotes: [
          { userId: '2', userName: 'Emily Smith', userAvatar: tripMembers[1].avatarUrl, voteType: 'up', timestamp: oneDayAgo },
          { userId: '3', userName: 'Alex H.', userAvatar: tripMembers[2].avatarUrl, voteType: 'maybe', timestamp: twoDaysAgo },
          { userId: '1', userName: 'Phil Harrison', userAvatar: tripMembers[0].avatarUrl, voteType: 'down', timestamp: oneDayAgo },
          { userId: '4', userName: 'Maria L.', userAvatar: tripMembers[3].avatarUrl, voteType: 'down', timestamp: oneDayAgo },
        ],
        contributorId: '2',
        contributorName: 'Emily Smith',
        contributorAvatar: tripMembers[1].avatarUrl,
        addedAt: twoDaysAgo,
        metadata: {
          price: '$450',
          provider: 'Ryanair',
          duration: '2h 15m',
        },
        comments: 4,
        image: { src: 'https://logos-world.net/wp-content/uploads/2020/10/Ryanair-Logo.png', aiHint: 'ryanair logo' },
        isNew: false,
      },
    ],
  },
  {
    id: 'stays',
    title: 'Stays',
    iconColor: 'text-purple-500',
    ideas: [
      {
        id: 's1',
        title: 'Hotel Le Negresco',
        content: '5-star historic hotel on the promenade.',
        category: 'stays',
        votes: { up: 4, maybe: 0, down: 0 },
        userVotes: [
          { userId: '1', userName: 'Phil Harrison', userAvatar: tripMembers[0].avatarUrl, voteType: 'up', timestamp: oneDayAgo },
          { userId: '2', userName: 'Emily Smith', userAvatar: tripMembers[1].avatarUrl, voteType: 'up', timestamp: oneDayAgo },
          { userId: '3', userName: 'Alex H.', userAvatar: tripMembers[2].avatarUrl, voteType: 'up', timestamp: twoDaysAgo },
          { userId: '4', userName: 'Maria L.', userAvatar: tripMembers[3].avatarUrl, voteType: 'up', timestamp: oneDayAgo },
        ],
        contributorId: '3',
        contributorName: 'Alex H.',
        contributorAvatar: tripMembers[2].avatarUrl,
        addedAt: threeDaysAgo,
        metadata: {
          price: '$320/night',
          location: 'Nice, France',
          rating: 4.8,
        },
        comments: 1,
        image: { src: 'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?q=80&w=600&h=400&fit=crop', aiHint: 'luxury hotel room' },
        isNew: false,
      },
      {
        id: 's2',
        title: 'Airbnb in Old Town',
        content: 'Charming 2-bedroom with a balcony.',
        category: 'stays',
        votes: { up: 2, maybe: 2, down: 0 },
        userVotes: [
          { userId: '1', userName: 'Phil Harrison', userAvatar: tripMembers[0].avatarUrl, voteType: 'up', timestamp: oneDayAgo },
          { userId: '2', userName: 'Emily Smith', userAvatar: tripMembers[1].avatarUrl, voteType: 'up', timestamp: oneDayAgo },
          { userId: '3', userName: 'Alex H.', userAvatar: tripMembers[2].avatarUrl, voteType: 'maybe', timestamp: twoDaysAgo },
          { userId: '4', userName: 'Maria L.', userAvatar: tripMembers[3].avatarUrl, voteType: 'maybe', timestamp: oneDayAgo },
        ],
        contributorId: '4',
        contributorName: 'Maria L.',
        contributorAvatar: tripMembers[3].avatarUrl,
        addedAt: twoDaysAgo,
        metadata: {
          price: '$180/night',
          location: 'Nice Old Town',
          rating: 4.6,
        },
        comments: 5,
        image: { src: 'https://images.unsplash.com/photo-1594563703937-fdc640497dcd?q=80&w=600&h=400&fit=crop', aiHint: 'airbnb apartment' },
        isNew: false,
      },
      {
        id: 's3',
        title: 'MOB HOTEL Cannes',
        content: 'Modern hotel with a pool and great vibes.',
        category: 'stays',
        votes: { up: 1, maybe: 2, down: 1 },
        userVotes: [
          { userId: '1', userName: 'Phil Harrison', userAvatar: tripMembers[0].avatarUrl, voteType: 'up', timestamp: oneDayAgo },
          { userId: '2', userName: 'Emily Smith', userAvatar: tripMembers[1].avatarUrl, voteType: 'maybe', timestamp: oneDayAgo },
          { userId: '3', userName: 'Alex H.', userAvatar: tripMembers[2].avatarUrl, voteType: 'maybe', timestamp: twoDaysAgo },
          { userId: '4', userName: 'Maria L.', userAvatar: tripMembers[3].avatarUrl, voteType: 'down', timestamp: oneDayAgo },
        ],
        contributorId: '2',
        contributorName: 'Emily Smith',
        contributorAvatar: tripMembers[1].avatarUrl,
        addedAt: oneDayAgo,
        metadata: {
          price: '$250/night',
          location: 'Cannes, France',
          rating: 4.4,
        },
        comments: 3,
        image: { src: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?q=80&w=600&h=400&fit=crop', aiHint: 'hotel pool luxury' },
        isNew: true,
      },
    ],
  },
  {
    id: 'activities',
    title: 'Activities',
    iconColor: 'text-pink-500',
    ideas: [
      {
        id: 'a1',
        title: '3-Wheel Vehicle Tour',
        content: 'Scenic 2-hour drive along the coast.',
        category: 'activities',
        votes: { up: 4, maybe: 0, down: 0 },
        userVotes: [
          { userId: '1', userName: 'Phil Harrison', userAvatar: tripMembers[0].avatarUrl, voteType: 'up', timestamp: oneDayAgo },
          { userId: '2', userName: 'Emily Smith', userAvatar: tripMembers[1].avatarUrl, voteType: 'up', timestamp: oneDayAgo },
          { userId: '3', userName: 'Alex H.', userAvatar: tripMembers[2].avatarUrl, voteType: 'up', timestamp: twoDaysAgo },
          { userId: '4', userName: 'Maria L.', userAvatar: tripMembers[3].avatarUrl, voteType: 'up', timestamp: oneDayAgo },
        ],
        contributorId: '4',
        contributorName: 'Maria L.',
        contributorAvatar: tripMembers[3].avatarUrl,
        addedAt: threeDaysAgo,
        metadata: {
          price: '$85/person',
          duration: '2 hours',
          location: 'French Riviera',
        },
        comments: 1,
        image: { src: 'https://images.unsplash.com/photo-1520175488228-40a4a44062a4?q=80&w=600&h=400&fit=crop', aiHint: 'vehicle coastal view' },
        isNew: false,
      },
      {
        id: 'a2',
        title: 'Private Boat Trip',
        content: 'Explore the Lerins Islands.',
        category: 'activities',
        votes: { up: 3, maybe: 1, down: 0 },
        userVotes: [
          { userId: '1', userName: 'Phil Harrison', userAvatar: tripMembers[0].avatarUrl, voteType: 'up', timestamp: oneDayAgo },
          { userId: '2', userName: 'Emily Smith', userAvatar: tripMembers[1].avatarUrl, voteType: 'up', timestamp: oneDayAgo },
          { userId: '3', userName: 'Alex H.', userAvatar: tripMembers[2].avatarUrl, voteType: 'up', timestamp: twoDaysAgo },
          { userId: '4', userName: 'Maria L.', userAvatar: tripMembers[3].avatarUrl, voteType: 'maybe', timestamp: oneDayAgo },
        ],
        contributorId: '1',
        contributorName: 'Phil Harrison',
        contributorAvatar: tripMembers[0].avatarUrl,
        addedAt: twoDaysAgo,
        metadata: {
          price: '$120/person',
          duration: 'Half day',
          location: 'Cannes Harbor',
        },
        comments: 0,
        image: { src: 'https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?q=80&w=600&h=400&fit=crop', aiHint: 'boat cove' },
        isNew: false,
      },
    ],
  },
  {
    id: 'restaurants',
    title: 'Restaurants',
    iconColor: 'text-orange-500',
    ideas: [
      {
        id: 'r1',
        title: 'Le Comptoir du Marché',
        content: 'Authentic French bistro in Old Nice.',
        category: 'restaurants',
        votes: { up: 3, maybe: 1, down: 0 },
        userVotes: [
          { userId: '1', userName: 'Phil Harrison', userAvatar: tripMembers[0].avatarUrl, voteType: 'up', timestamp: oneDayAgo },
          { userId: '2', userName: 'Emily Smith', userAvatar: tripMembers[1].avatarUrl, voteType: 'up', timestamp: oneDayAgo },
          { userId: '3', userName: 'Alex H.', userAvatar: tripMembers[2].avatarUrl, voteType: 'up', timestamp: twoDaysAgo },
          { userId: '4', userName: 'Maria L.', userAvatar: tripMembers[3].avatarUrl, voteType: 'maybe', timestamp: oneDayAgo },
        ],
        contributorId: '2',
        contributorName: 'Emily Smith',
        contributorAvatar: tripMembers[1].avatarUrl,
        addedAt: twoDaysAgo,
        metadata: {
          price: '$$',
          location: 'Old Nice',
          rating: 4.7,
        },
        comments: 2,
        image: { src: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=600&h=400&fit=crop', aiHint: 'french restaurant' },
        isNew: false,
      },
    ],
  },
  {
    id: 'notes',
    title: 'Notes',
    iconColor: 'text-gray-500',
    ideas: [
      {
        id: 'n1',
        title: 'Remember to pack sunscreen!',
        content: 'And hats. The sun can be strong on the Riviera.',
        category: 'notes',
        votes: { up: 0, maybe: 0, down: 0 },
        userVotes: [],
        contributorId: '3',
        contributorName: 'Alex H.',
        contributorAvatar: tripMembers[2].avatarUrl,
        addedAt: threeDaysAgo,
        comments: 0,
        isNew: false,
      },
      {
        id: 'n2',
        title: 'Car Rental Options',
        content: 'Need to book a 7-seater van for the group.',
        category: 'notes',
        votes: { up: 0, maybe: 0, down: 0 },
        userVotes: [],
        contributorId: '1',
        contributorName: 'Phil Harrison',
        contributorAvatar: tripMembers[0].avatarUrl,
        addedAt: twoDaysAgo,
        comments: 0,
        isNew: false,
      },
    ],
  },
];

const mockActivities: ActivityItem[] = [
  {
    id: 'act1',
    type: 'vote',
    userId: '1',
    userName: 'Phil Harrison',
    userAvatar: tripMembers[0].avatarUrl,
    action: 'loved',
    targetTitle: 'Hotel Le Negresco',
    targetCategory: 'stays',
    timestamp: oneDayAgo,
    voteType: 'up',
  },
  {
    id: 'act2',
    type: 'add',
    userId: '2',
    userName: 'Emily Smith',
    userAvatar: tripMembers[1].avatarUrl,
    action: 'added',
    targetTitle: 'MOB HOTEL Cannes',
    targetCategory: 'stays',
    timestamp: oneDayAgo,
  },
  {
    id: 'act3',
    type: 'vote',
    userId: '4',
    userName: 'Maria L.',
    userAvatar: tripMembers[3].avatarUrl,
    action: 'is thinking about',
    targetTitle: 'Private Boat Trip',
    targetCategory: 'activities',
    timestamp: oneDayAgo,
    voteType: 'maybe',
  },
  {
    id: 'act4',
    type: 'comment',
    userId: '3',
    userName: 'Alex H.',
    userAvatar: tripMembers[2].avatarUrl,
    action: 'commented on',
    targetTitle: 'Round Trip to NCE',
    targetCategory: 'flights',
    timestamp: twoDaysAgo,
  },
  {
    id: 'act5',
    type: 'vote',
    userId: '2',
    userName: 'Emily Smith',
    userAvatar: tripMembers[1].avatarUrl,
    action: 'loved',
    targetTitle: '3-Wheel Vehicle Tour',
    targetCategory: 'activities',
    timestamp: twoDaysAgo,
    voteType: 'up',
  },
];

export function TripSyncPageClient() {
  const [columns, setColumns] = useState<TripColumnData[]>(createInitialColumns());
  const [searchQuery, setSearchQuery] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);

  const handleScroll = useCallback(() => {
    setIsScrolled(window.scrollY > 50);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const handleHeaderSearchSubmit = () => {
    console.log('Search submitted on TripSync page:', searchQuery);
  };

  const handleVote = (ideaId: string, voteType: 'up' | 'maybe' | 'down') => {
    // This would typically make an API call
    console.log(`Vote ${voteType} for idea ${ideaId}`);
  };

  // Placeholder for drag-and-drop logic
  const moveCard = (cardId: string, fromColumnId: string, toColumnId: string, toIndex: number) => {
    // This will be implemented in a future step
    console.log(`Moving card ${cardId} from ${fromColumnId} to ${toColumnId} at index ${toIndex}`);
  };

  const moveColumn = (fromIndex: number, toIndex: number) => {
    // This will be implemented in a future step
    console.log(`Moving column from index ${fromIndex} to ${toIndex}`);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex flex-col h-screen bg-gradient-to-br from-primary/10 via-background to-accent/10">
        <Header
          isScrolled={isScrolled}
          searchQuery={searchQuery}
          onSearchQueryChange={setSearchQuery}
          onSearchSubmit={handleHeaderSearchSubmit}
          showCurrencySelector={false}
        />
        <main className="flex-grow overflow-hidden">
          <TripSyncDashboardLayout
            tripName="French Riviera Escape"
            members={tripMembers}
            columns={columns}
            setColumns={setColumns}
            moveCard={moveCard}
            moveColumn={moveColumn}
            currentUserId="1"
            onVote={handleVote}
            activities={mockActivities}
          />
        </main>
        <SubtleFooter />
      </div>
    </DndProvider>
  );
}
