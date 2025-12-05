
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
  Home,
  Wine,
  Sun,
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
                className="rounded-full object-cover border-4 border-amber-100/30 shadow-lg"
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
    <div className="bg-white/60 dark:bg-stone-900/50 backdrop-blur-lg border border-amber-200/80 dark:border-amber-800/80 rounded-2xl p-4 space-y-4">
      <h3 className="font-semibold text-lg text-stone-900 dark:text-amber-200">Add Post</h3>
      <div className="flex items-center gap-3">
        <Avatar className="h-10 w-10">
          <AvatarImage src={avatarUrl} alt="Your avatar" data-ai-hint={avatarAiHint} />
          <AvatarFallback>I</AvatarFallback>
        </Avatar>
        <input
          type="text"
          placeholder="Share a taste of Tuscany..."
          className="w-full bg-transparent text-stone-800 dark:text-amber-300 placeholder:text-stone-600 dark:placeholder:text-amber-400 focus:outline-none"
        />
      </div>
      <div className="flex justify-between items-center">
        <div className="flex gap-2">
          <Button variant="ghost" size="icon" className="text-stone-600 dark:text-amber-400 hover:text-primary hover:bg-primary/10 rounded-full h-8 w-8">
            <ImageIcon className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-stone-600 dark:text-amber-400 hover:text-primary hover:bg-primary/10 rounded-full h-8 w-8">
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
    <div className="bg-white/60 dark:bg-stone-900/50 backdrop-blur-lg border border-amber-200/80 dark:border-amber-800/80 rounded-2xl p-4 space-y-3">
       <div className="flex justify-between items-start">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src={item.avatarUrl} alt={item.userName} data-ai-hint={item.avatarAiHint} />
            <AvatarFallback>{item.userName.substring(0, 1)}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-semibold text-sm text-stone-900 dark:text-amber-200">{item.userName}</p>
            <p className="text-xs text-stone-600 dark:text-amber-400">{item.timestamp}</p>
          </div>
        </div>
        <Button variant="ghost" size="icon" className="text-stone-500 dark:text-amber-400 hover:bg-stone-500/10 rounded-full h-8 w-8">
          <MoreHorizontal className="h-5 w-5" />
        </Button>
      </div>
      <p className="text-sm text-stone-800 dark:text-amber-300 pl-1">{item.caption}</p>
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
        <Button variant="ghost" size="sm" className="text-stone-600 dark:text-amber-400 hover:text-rose-500 hover:bg-rose-500/10 p-1 h-auto">
          <Heart className="h-5 w-5 mr-2" />
          <span className="text-sm">{item.likes}</span>
        </Button>
        <Button variant="ghost" size="sm" className="text-stone-600 dark:text-amber-400 hover:text-primary hover:bg-primary/10 p-1 h-auto">
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
    <div className="bg-white/60 dark:bg-stone-900/50 backdrop-blur-lg border border-amber-200/80 dark:border-amber-800/80 rounded-2xl p-4 space-y-4">
      <h3 className="font-semibold text-lg text-stone-900 dark:text-amber-200">Past Guests</h3>
      <ul className="space-y-3">
        {friends.map(friend => (
          <li key={friend.id} className="group">
             <Link href={friend.profilePath || '#'} className="flex items-center justify-between cursor-pointer p-1 -m-1 rounded-md hover:bg-amber-500/10 transition-colors">
                <div className="flex items-center gap-3">
                <Avatar className="h-9 w-9">
                    <AvatarImage src={friend.avatarUrl} alt={friend.name} data-ai-hint={friend.avatarAiHint} />
                    <AvatarFallback>{friend.name.substring(0, 1)}</AvatarFallback>
                </Avatar>
                <span className="font-medium text-sm text-stone-800 dark:text-amber-300 group-hover:text-primary transition-colors">{friend.name}</span>
                </div>
            </Link>
          </li>
        ))}
      </ul>
       <Button variant="link" className="text-sm p-0 h-auto text-primary">View all guests</Button>
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
     <div className="bg-white/60 dark:bg-stone-900/50 backdrop-blur-lg border border-amber-200/80 dark:border-amber-800/80 rounded-2xl p-4 space-y-4">
      <h3 className="font-semibold text-lg text-stone-900 dark:text-amber-200">Host Details</h3>
      <div className="space-y-3">
        {stats.map((stat, index) => (
          <div key={index} className="flex items-center gap-4">
            <stat.icon className="h-6 w-6 text-primary flex-shrink-0" />
            <div>
              <p className="font-bold text-lg text-stone-800 dark:text-amber-100">{stat.value}</p>
              <p className="text-xs text-stone-600 dark:text-amber-400">{stat.label}</p>
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
    <div className="bg-white/60 dark:bg-stone-900/50 backdrop-blur-lg border border-amber-200/80 dark:border-amber-800/80 rounded-2xl p-4 space-y-4">
      <h3 className="font-semibold text-lg text-stone-900 dark:text-amber-200">Host Badges</h3>
      <div className="grid grid-cols-2 gap-4">
        {badges.map(badge => (
          <div key={badge.id} className="bg-amber-50/50 dark:bg-amber-900/50 p-3 rounded-lg flex flex-col items-center text-center hover:bg-amber-100/70 dark:hover:bg-amber-700/50 transition-colors cursor-pointer">
            <badge.icon className="h-8 w-8 text-primary mb-2" />
            <p className="font-semibold text-xs text-stone-800 dark:text-amber-200">{badge.name}</p>
            <p className="text-[10px] text-stone-600 dark:text-amber-400">{badge.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// --- Main Page Client Component ---
export function IsabellaRProfilePageClient() {
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
    console.log('Header search submitted on Isabella R. Profile page:', searchQuery);
  };
  
  // --- Data for Isabella's profile ---
  const isabellaProfileData = {
      name: 'Isabella Rossi',
      tagline: "Sharing my family's vineyard and farmhouse in Tuscany.",
      heroImageUrl: 'https://images.unsplash.com/photo-1586790068323-2b2f6ab2398f?q=80&w=1600&h=500&fit=crop',
      heroImageAlt: 'Rolling hills of a vineyard in Tuscany',
      heroImageAiHint: 'tuscany vineyard hills',
      avatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=160&h=160&fit=crop',
      avatarAiHint: 'woman portrait kind',
  };

  const isabellaStatsData: StatItem[] = [
    { icon: Home, value: '80+', label: 'Guests Hosted' },
    { icon: Star, value: '4.9', label: 'Host Rating' },
    { icon: Globe2, value: '20+', label: 'Guest Nationalities' },
    { icon: Sun, value: '250+', label: 'Days of Sunshine' },
  ];

  const isabellaFriendsData: Friend[] = [
      { id: 'r1', name: 'Emily Smith', avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=48&h=48&fit=crop', avatarAiHint: 'woman smiling', profilePath: '/profile/emily-smith' },
  ];
  
  const isabellaBadgesData: BadgeInfo[] = [
      { id: 'b1', icon: Sun, name: 'Tuscan Hospitality', description: 'Embodying the warmth of the Italian sun.' },
      { id: 'b2', icon: Wine, name: 'Vineyard Virtuoso', description: 'Master of the grape and fine wine.' },
      { id: 'b3', icon: Palette, name: 'Renaissance Soul', description: 'Living amidst art, history, and culture.' },
      { id: 'b4', icon: Users, name: 'Community Weaver', description: 'Connecting people over food and wine.' },
  ];

  const isabellaFeedItems: FeedItem[] = [
    {
      id: 'p1',
      userName: 'Isabella Rossi',
      userLocation: 'Tuscany, Italy',
      avatarUrl: isabellaProfileData.avatarUrl,
      avatarAiHint: isabellaProfileData.avatarAiHint,
      timestamp: '3 days ago',
      caption: "Another beautiful harvest season begins. The air is filled with the scent of grapes and the promise of good wine.",
      imageUrl: 'https://images.unsplash.com/photo-1563299796-b729d0af5e6e?q=80&w=1200&auto=format&fit=crop',
      imageAiHint: 'vineyard grapes harvest',
      likes: '1.1K',
      comments: '120',
    },
    {
      id: 'p2',
      userName: 'Isabella Rossi',
      userLocation: 'Tuscany, Italy',
      avatarUrl: isabellaProfileData.avatarUrl,
      avatarAiHint: isabellaProfileData.avatarAiHint,
      timestamp: '2 weeks ago',
      caption: 'Homemade pasta night with my wonderful guests! Nothing brings people together like good food.',
      imageUrl: 'https://images.unsplash.com/photo-1621996346565-e326e22e3924?q=80&w=1200&auto=format&fit=crop',
      imageAiHint: 'homemade pasta cooking',
      likes: '950',
      comments: '180',
    },
  ];


  return (
    <div className="flex flex-col min-h-screen w-full bg-amber-50 dark:bg-stone-900 text-stone-800 dark:text-amber-200">
      <Header
        isScrolled={isScrolled}
        searchQuery={searchQuery}
        onSearchQueryChange={setSearchQuery}
        onSearchSubmit={handleHeaderSearchSubmit}
        showCurrencySelector={false}
      />
      <div className="relative">
         <ProfileBanner {...isabellaProfileData} />
      </div>
      <main className="flex-grow p-4 md:p-6 lg:p-8 pb-28">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {/* Left Column */}
          <div className="lg:col-span-1 space-y-6">
            <StatsCard stats={isabellaStatsData} />
            <FriendsListCard friends={isabellaFriendsData} />
          </div>

          {/* Center Column */}
          <div className="lg:col-span-2 space-y-6">
            <AddPostCard avatarUrl={isabellaProfileData.avatarUrl} avatarAiHint={isabellaProfileData.avatarAiHint} />
            {isabellaFeedItems.map(item => (
              <ProfileFeedCard key={item.id} item={item} />
            ))}
          </div>

          {/* Right Column */}
          <div className="lg:col-span-1 space-y-6">
             <WanderBadgesCard badges={isabellaBadgesData} />
          </div>
        </div>
      </main>
      <ProfileStickyFooter />
    </div>
  );
}
