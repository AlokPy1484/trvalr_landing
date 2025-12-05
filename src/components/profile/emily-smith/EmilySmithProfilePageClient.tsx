
'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  ImageIcon,
  MapPin,
  MoreHorizontal,
  Heart,
  MessageSquare,
  Languages,
  Star,
  Users,
  Feather,
  Palette,
  Briefcase,
  Globe2,
} from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { ProfileStickyFooter } from '@/components/profile/ProfileStickyFooter';

// --- Sub-components defined within the page file for this specific layout ---

// 1. Profile Banner Component
interface ProfileBannerProps {
  name: string;
  tagline: string;
  heroImageUrl: string;
  heroImageAlt: string;
  heroImageAiHint: string;
  avatarUrl: string;
  avatarAiHint: string;
}

function ProfileBanner({ name, tagline, heroImageUrl, heroImageAlt, heroImageAiHint, avatarUrl, avatarAiHint }: ProfileBannerProps) {
  return (
    <div className="relative w-full h-[250px] md:h-[300px]">
      <Image
        src={heroImageUrl}
        alt={heroImageAlt}
        fill
        className="object-cover"
        data-ai-hint={heroImageAiHint}
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-4 md:p-6 lg:p-8">
        <div className="flex items-end justify-between max-w-7xl mx-auto">
          <div className="flex items-center gap-4">
            <div className="relative h-20 w-20 md:h-28 md:w-28 flex-shrink-0">
              <Image
                src={avatarUrl}
                alt={name}
                fill
                className="rounded-full object-cover border-4 border-rose-100/30 shadow-lg"
                data-ai-hint={avatarAiHint}
              />
            </div>
            <div className="text-white">
              <h1 className="font-bold text-2xl md:text-4xl" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>{name}</h1>
              <p className="text-sm md:text-base text-neutral-200" style={{ textShadow: '0 1px 3px rgba(0,0,0,0.5)' }}>{tagline}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


// 2. Add Post Card Component
interface AddPostCardProps {
  avatarUrl: string;
  avatarAiHint: string;
}

function AddPostCard({ avatarUrl, avatarAiHint }: AddPostCardProps) {
  return (
    <div className="bg-white/60 dark:bg-neutral-800/50 backdrop-blur-lg border border-neutral-200/80 dark:border-slate-700/80 rounded-2xl p-4 space-y-4">
      <h3 className="font-semibold text-lg text-neutral-800 dark:text-neutral-200">Add Post</h3>
      <div className="flex items-center gap-3">
        <Avatar className="h-10 w-10">
          <AvatarImage src={avatarUrl} alt="Your avatar" data-ai-hint={avatarAiHint} />
          <AvatarFallback>E</AvatarFallback>
        </Avatar>
        <input
          type="text"
          placeholder="Share your latest adventure..."
          className="w-full bg-transparent text-neutral-700 dark:text-neutral-300 placeholder:text-neutral-500 dark:placeholder:text-neutral-400 focus:outline-none"
        />
      </div>
      <div className="flex justify-between items-center">
        <div className="flex gap-2">
          <Button variant="ghost" size="icon" className="text-neutral-500 dark:text-neutral-400 hover:text-primary hover:bg-primary/10 rounded-full h-8 w-8">
            <ImageIcon className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-neutral-500 dark:text-neutral-400 hover:text-primary hover:bg-primary/10 rounded-full h-8 w-8">
            <MapPin className="h-5 w-5" />
          </Button>
        </div>
        <Button className="bg-primary hover:bg-primary/90 text-white font-semibold rounded-lg px-6 py-2 text-sm">
          Post
        </Button>
      </div>
    </div>
  );
}

// 3. Feed Card Component
interface FeedItem {
  id: string;
  userName: string;
  userLocation: string;
  avatarUrl: string;
  avatarAiHint: string;
  timestamp: string;
  caption: string;
  imageUrl: string;
  imageAiHint: string;
  likes: string;
  comments: string;
}

interface ProfileFeedCardProps {
  item: FeedItem;
}

function ProfileFeedCard({ item }: ProfileFeedCardProps) {
  return (
    <div className="bg-white/60 dark:bg-neutral-800/50 backdrop-blur-lg border border-neutral-200/80 dark:border-slate-700/80 rounded-2xl p-4 space-y-3">
       <div className="flex justify-between items-start">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src={item.avatarUrl} alt={item.userName} data-ai-hint={item.avatarAiHint} />
            <AvatarFallback>{item.userName.substring(0, 1)}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-semibold text-sm text-neutral-800 dark:text-neutral-200">{item.userName}</p>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">{item.timestamp}</p>
          </div>
        </div>
        <Button variant="ghost" size="icon" className="text-neutral-500 dark:text-neutral-400 hover:bg-neutral-500/10 rounded-full h-8 w-8">
          <MoreHorizontal className="h-5 w-5" />
        </Button>
      </div>
      <p className="text-sm text-neutral-700 dark:text-neutral-300 pl-1">{item.caption}</p>
      <div className="relative aspect-video w-full rounded-lg overflow-hidden shadow-lg">
        <Image
          src={item.imageUrl}
          alt={item.caption}
          fill
          className="object-cover"
          data-ai-hint={item.imageAiHint}
        />
      </div>
      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="sm" className="text-neutral-600 dark:text-neutral-400 hover:text-rose-500 hover:bg-rose-500/10 p-1 h-auto">
          <Heart className="h-5 w-5 mr-2" />
          <span className="text-sm">{item.likes}</span>
        </Button>
        <Button variant="ghost" size="sm" className="text-neutral-600 dark:text-neutral-400 hover:text-primary hover:bg-primary/10 p-1 h-auto">
          <MessageSquare className="h-5 w-5 mr-2" />
          <span className="text-sm">{item.comments}</span>
        </Button>
      </div>
    </div>
  );
}


// 4. Friends List Component
interface Friend {
  id: string;
  name: string;
  avatarUrl: string;
  avatarAiHint: string;
  profilePath?: string;
}

interface FriendsListCardProps {
  friends: Friend[];
}

function FriendsListCard({ friends }: FriendsListCardProps) {
  return (
    <div className="bg-white/60 dark:bg-neutral-800/50 backdrop-blur-lg border border-neutral-200/80 dark:border-slate-700/80 rounded-2xl p-4 space-y-4">
      <h3 className="font-semibold text-lg text-neutral-800 dark:text-neutral-200">Connections</h3>
      <ul className="space-y-3">
        {friends.map(friend => {
          const content = (
            <div className="flex items-center justify-between group cursor-pointer w-full">
              <div className="flex items-center gap-3">
                <Avatar className="h-9 w-9">
                  <AvatarImage src={friend.avatarUrl} alt={friend.name} data-ai-hint={friend.avatarAiHint} />
                  <AvatarFallback>{friend.name.substring(0, 1)}</AvatarFallback>
                </Avatar>
                <span className="font-medium text-sm text-neutral-700 dark:text-neutral-300 group-hover:text-primary transition-colors">{friend.name}</span>
              </div>
            </div>
          );

          return (
            <li key={friend.id}>
              {friend.profilePath ? (
                <Link href={friend.profilePath}>{content}</Link>
              ) : (
                content
              )}
            </li>
          );
        })}
      </ul>
       <Button variant="link" className="text-sm p-0 h-auto text-primary">View all connections</Button>
    </div>
  );
}

// 5. Stats Card Component
interface StatItem {
  icon: React.ElementType;
  value: string;
  label: string;
}

interface StatsCardProps {
  stats: StatItem[];
}

function StatsCard({ stats }: StatsCardProps) {
  return (
     <div className="bg-white/60 dark:bg-neutral-800/50 backdrop-blur-lg border border-neutral-200/80 dark:border-slate-700/80 rounded-2xl p-4 space-y-4">
      <h3 className="font-semibold text-lg text-neutral-800 dark:text-neutral-200">About</h3>
      <div className="space-y-3">
        {stats.map((stat, index) => (
          <div key={index} className="flex items-center gap-4">
            <stat.icon className="h-6 w-6 text-primary flex-shrink-0" />
            <div>
              <p className="font-bold text-lg text-neutral-800 dark:text-neutral-100">{stat.value}</p>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// 6. Wander Badges Component
interface BadgeInfo {
  id: string;
  icon: React.ElementType;
  name: string;
  description: string;
}

interface WanderBadgesCardProps {
  badges: BadgeInfo[];
}

function WanderBadgesCard({ badges }: WanderBadgesCardProps) {
  return (
    <div className="bg-white/60 dark:bg-neutral-800/50 backdrop-blur-lg border border-neutral-200/80 dark:border-slate-700/80 rounded-2xl p-4 space-y-4">
      <h3 className="font-semibold text-lg text-neutral-800 dark:text-neutral-200">Wander Badges</h3>
      <div className="grid grid-cols-2 gap-4">
        {badges.map(badge => (
          <div key={badge.id} className="bg-rose-50/50 dark:bg-neutral-900/50 p-3 rounded-lg flex flex-col items-center text-center hover:bg-rose-100/70 dark:hover:bg-neutral-700/50 transition-colors cursor-pointer">
            <badge.icon className="h-8 w-8 text-primary mb-2" />
            <p className="font-semibold text-xs text-neutral-800 dark:text-neutral-200">{badge.name}</p>
            <p className="text-[10px] text-neutral-500 dark:text-neutral-400">{badge.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}


// --- Main Page Client Component ---
export default function EmilySmithProfilePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);

  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY;
    setIsScrolled(currentScrollY > 50);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const handleHeaderSearchSubmit = () => {
    console.log('Header search submitted on Emily Smith Profile page:', searchQuery);
  };
  
  // --- Data for Emily's profile ---
  const emilyProfileData = {
      name: 'Emily Smith',
      tagline: 'Wanderer, Storyteller, Globe-Trotter',
      heroImageUrl: 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?q=80&w=1600&h=500&fit=crop',
      heroImageAlt: 'Woman planning a trip on a large map',
      heroImageAiHint: 'woman map planning',
      avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=160&h=160&fit=crop',
      avatarAiHint: 'woman portrait friendly',
  };

  const emilyStatsData: StatItem[] = [
    { icon: Globe2, value: '40+', label: 'Countries Visited' },
    { icon: Languages, value: '5', label: 'Languages Spoken' },
    { icon: Star, value: '4.9', label: 'Traveler Rating' },
    { icon: Briefcase, value: '12', label: 'Journeys Logged' },
  ];

  const emilyFriendsData: Friend[] = [
      { id: 'r1', name: 'Alex H. (Host)', avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=48&h=48&fit=crop', avatarAiHint: 'person face friendly', profilePath: '/profile/alex-h' },
      { id: 'r2', name: 'Maria L. (Traveler)', avatarUrl: 'https://images.unsplash.com/photo-1521146764736-56c929d59c83?q=80&w=48&h=48&fit=crop', avatarAiHint: 'person face kind', profilePath: '/profile/maria-l'},
      { id: 'r3', name: 'Chen W. (Host)', avatarUrl: 'https://images.unsplash.com/photo-1528892952291-009c663ce843?q=80&w=48&h=48&fit=crop', avatarAiHint: 'person face happy', profilePath: '/profile/chen-w' },
  ];
  
  const emilyBadgesData: BadgeInfo[] = [
      { id: 'b1', icon: Palette, name: 'Cultural Connoisseur', description: 'Captured cultures in 40+ countries.' },
      { id: 'b2', icon: Feather, name: 'Solo Storyteller', description: 'Traveled alone, shared many tales.' },
      { id: 'b3', icon: Users, name: 'Community Weaver', description: 'Connected with local souls worldwide.' },
      { id: 'b4', icon: MapPin, name: 'Andean Adventurer', description: 'Hiked the Andes and embraced the heights.' },
  ];

  const emilyFeedItems: FeedItem[] = [
    {
      id: 'p1',
      userName: 'Emily Smith',
      userLocation: 'Iceland',
      avatarUrl: emilyProfileData.avatarUrl,
      avatarAiHint: emilyProfileData.avatarAiHint,
      timestamp: 'Last Winter',
      caption: "Witnessed the magic of the dancing auroras under a starlit Icelandic sky. Truly a moment that felt out of this world. Can't wait to go back!",
      imageUrl: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?q=80&w=1200&auto=format&fit=crop',
      imageAiHint: 'iceland aurora borealis',
      likes: '1.8K',
      comments: '302',
    },
    {
      id: 'p2',
      userName: 'Emily Smith',
      userLocation: 'Bali, Indonesia',
      avatarUrl: emilyProfileData.avatarUrl,
      avatarAiHint: emilyProfileData.avatarAiHint,
      timestamp: 'Last Summer',
      caption: 'Found such a profound sense of peace among the vibrant green rice paddies and ancient temples of Bali. A spiritual reset.',
      imageUrl: 'https://images.unsplash.com/photo-1555400038-63f5ba517a47?q=80&w=1200&auto=format&fit=crop',
      imageAiHint: 'bali temple',
      likes: '2.1K',
      comments: '415',
    },
     {
      id: 'p3',
      userName: 'Emily Smith',
      userLocation: 'Morocco',
      avatarUrl: emilyProfileData.avatarUrl,
      avatarAiHint: emilyProfileData.avatarAiHint,
      timestamp: 'Last Spring',
      caption: "Lost in the labyrinthine souks of Marrakech – a symphony of sights, sounds, and smells. Every corner holds a new discovery.",
      imageUrl: 'https://images.unsplash.com/photo-1617154394674-d89053423725?q=80&w=1200&auto=format&fit=crop',
      imageAiHint: 'moroccan lanterns',
      likes: '1.5K',
      comments: '250',
    },
  ];


  return (
    <div className="flex flex-col min-h-screen w-full bg-rose-50 dark:bg-neutral-900 text-neutral-800 dark:text-neutral-200">
      <Header
        isScrolled={isScrolled}
        searchQuery={searchQuery}
        onSearchQueryChange={setSearchQuery}
        onSearchSubmit={handleHeaderSearchSubmit}
        showCurrencySelector={false}
      />
      <div className="relative">
         <ProfileBanner {...emilyProfileData} />
      </div>
      <main className="flex-grow p-4 md:p-6 lg:p-8 pb-28">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {/* Left Column */}
          <div className="lg:col-span-1 space-y-6">
            <StatsCard stats={emilyStatsData} />
            <FriendsListCard friends={emilyFriendsData} />
          </div>

          {/* Center Column */}
          <div className="lg:col-span-2 space-y-6">
            <AddPostCard avatarUrl={emilyProfileData.avatarUrl} avatarAiHint={emilyProfileData.avatarAiHint} />
            {emilyFeedItems.map(item => (
              <ProfileFeedCard key={item.id} item={item} />
            ))}
          </div>

          {/* Right Column */}
          <div className="lg:col-span-1 space-y-6">
             <WanderBadgesCard badges={emilyBadgesData} />
          </div>
        </div>
      </main>
      <ProfileStickyFooter />
    </div>
  );
}
