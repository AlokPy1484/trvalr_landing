
'use client';

import React from 'react';
import { OrbitHeader } from './OrbitHeader';
import { OrbitStories, type StoryItem } from './OrbitStories';
import { OrbitFeedCard, type OrbitFeedItem } from './OrbitFeedCard';
import { OrbitTopTravelers, type TopTraveler } from './OrbitTopTravelers';
import { OrbitCTA } from './OrbitCTA';
import { OrbitBottomNav } from './OrbitBottomNav';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useLanguage } from '@/contexts/LanguageContext';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { OrbitMessengerSidebar } from './OrbitMessengerSidebar';
import { OrbitConnectView } from './OrbitConnectView';
import { OrbitExploreView } from './OrbitExploreView';


const placeholderFeedItems: OrbitFeedItem[] = [
  {
    id: '1',
    userName: 'Emily Smith',
    userLocation: 'Japan',
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=80&h=80&fit=crop',
    avatarAiHint: 'woman smiling',
    timestamp: '2 hours ago',
    caption: 'Exploring the temples of Kyoto 🏯',
    imageUrl: 'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?q=80&w=1200&auto=format&fit=crop',
    imageAiHint: 'kyoto temple sunset',
    likes: '1,6K',
    comments: '219',
  },
  {
    id: '2',
    userName: 'Jack Ryan',
    userLocation: 'Italy',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=80&h=80&fit=crop',
    avatarAiHint: 'man portrait',
    timestamp: '5 hours ago',
    caption: 'Venice is just magical! 🛶',
    imageUrl: 'https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?q=80&w=1200&auto=format&fit=crop',
    imageAiHint: 'venice canals gondolas',
    likes: '0,8K',
    comments: '104',
  },
  {
    id: '3',
    userName: 'Sophia Chen',
    userLocation: 'Peru',
    avatarUrl: 'https://images.unsplash.com/photo-1521146764736-56c929d59c83?q=80&w=80&h=80&fit=crop',
    avatarAiHint: 'woman adventure',
    timestamp: '1 day ago',
    caption: "Sunrise at Machu Picchu. Words can't describe this. ✨",
    imageUrl: 'https://images.unsplash.com/photo-1587330979470-3595ac045ab0?q=80&w=1200&auto=format&fit=crop',
    imageAiHint: 'machu picchu sunrise',
    likes: '2,2K',
    comments: '350',
  },
  {
    id: '4',
    userName: 'Liam Miller',
    userLocation: 'Arctic Circle',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=80&h=80&fit=crop',
    avatarAiHint: 'man outdoor',
    timestamp: '2 days ago',
    caption: "Face to face with giants of ice. Greenland's beauty is humbling. 🧊",
    imageUrl: 'https://images.unsplash.com/photo-1551537482-f2075a1d41f2?q=80&w=1200&auto=format&fit=crop',
    imageAiHint: 'iceberg greenland boat',
    likes: '1,9K',
    comments: '288',
  },
];

const placeholderTopTravelers: TopTraveler[] = [
    { id: 't1', name: 'Amelie Duval', avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=80&h=80&fit=crop', avatarAiHint: 'woman happy', flagCode: 'FR' },
    { id: 't2', name: 'David Yang', avatarUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=80&h=80&fit=crop', avatarAiHint: 'man thoughtful', flagCode: 'CN' },
    { id: 't3', name: 'James Kim', avatarUrl: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=80&h=80&fit=crop', avatarAiHint: 'man smiling', flagCode: 'KR' },
    { id: 't4', name: 'Lisa Weber', avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=80&h=80&fit=crop', avatarAiHint: 'woman professional', flagCode: 'DE' },
    { id: 't5', name: 'Mark Stone', avatarUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=80&h=80&fit=crop', avatarAiHint: 'man outdoor', flagCode: 'US' },
    { id: 't6', name: 'Hannah Lee', avatarUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=80&h=80&fit=crop', avatarAiHint: 'woman glasses', flagCode: 'JP' },
    { id: 't7', name: 'Joshua Chen', avatarUrl: 'https://images.unsplash.com/photo-1528892952291-009c663ce843?q=80&w=80&h=80&fit=crop', avatarAiHint: 'man content', flagCode: 'CA' },
    { id: 't8', name: 'Emma Scott', avatarUrl: 'https://images.unsplash.com/photo-1554151228-14d9def656e4?q=80&w=80&h=80&fit=crop', avatarAiHint: 'woman travel', flagCode: 'GB' },
    { id: 't9', name: 'Alexander Roy', avatarUrl: 'https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?q=80&w=80&h=80&fit=crop', avatarAiHint: 'man serious', flagCode: 'AU' },
    { id: 't10', name: 'Isabella Rossi', avatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=80&h=80&fit=crop', avatarAiHint: 'woman italy', flagCode: 'IT' },
    { id: 't11', name: 'Ben Carter', avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=80&h=80&fit=crop', avatarAiHint: 'man friendly', flagCode: 'NZ' },
];

const placeholderIndianTravelers: TopTraveler[] = [
  { id: 'in1', name: 'Aarav Sharma', avatarUrl: 'https://images.unsplash.com/photo-1615109398623-88346a601842?q=80&w=80&h=80&fit=crop', avatarAiHint: 'man smiling', flagCode: 'IN' },
  { id: 'in2', name: 'Diya Patel', avatarUrl: 'https://images.unsplash.com/photo-1619472322303-933e0a4e72a8?q=80&w=80&h=80&fit=crop', avatarAiHint: 'woman portrait', flagCode: 'IN' },
  { id: 'in3', name: 'Rohan Gupta', avatarUrl: 'https://images.unsplash.com/photo-1618567523799-556de6522c02?q=80&w=80&h=80&fit=crop', avatarAiHint: 'man outdoor', flagCode: 'IN' },
  { id: 'in4', name: 'Anika Singh', avatarUrl: 'https://images.unsplash.com/photo-1627284424364-398555959620?q=80&w=80&h=80&fit=crop', avatarAiHint: 'woman travel', flagCode: 'IN' },
  { id: 'in5', name: 'Vikram Kumar', avatarUrl: 'https://images.unsplash.com/photo-1616766098950-6a2c07925642?q=80&w=80&h=80&fit=crop', avatarAiHint: 'man glasses', flagCode: 'IN' },
  { id: 'in6', name: 'Priya Mehta', avatarUrl: 'https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?q=80&w=80&h=80&fit=crop', avatarAiHint: 'woman happy', flagCode: 'IN' },
  { id: 'in7', name: 'Arjun Reddy', avatarUrl: 'https://images.unsplash.com/photo-1610088444640-352431682d33?q=80&w=80&h=80&fit=crop', avatarAiHint: 'man serious', flagCode: 'IN' },
  { id: 'in8', name: 'Ishani Joshi', avatarUrl: 'https://images.unsplash.com/photo-1598110522432-6a41f6d7b8a8?q=80&w=80&h=80&fit=crop', avatarAiHint: 'woman kind', flagCode: 'IN' },
  { id: 'in9', name: 'Kabir Das', avatarUrl: 'https://images.unsplash.com/photo-1599425482404-58f705ea58f3?q=80&w=80&h=80&fit=crop', avatarAiHint: 'man thoughtful', flagCode: 'IN' },
  { id: 'in10', name: 'Meera Nair', avatarUrl: 'https://images.unsplash.com/photo-1594819047053-b9b5162a0a38?q=80&w=80&h=80&fit=crop', avatarAiHint: 'woman content', flagCode: 'IN' },
];

// Combine users from different sources for a rich story feed and remove duplicates
const storyUsers = [
  ...placeholderFeedItems.map(item => ({ id: item.id, userName: item.userName, avatarUrl: item.avatarUrl, avatarAiHint: item.avatarAiHint })),
  ...placeholderTopTravelers.map(item => ({ id: item.id, userName: item.name, avatarUrl: item.avatarUrl, avatarAiHint: item.avatarAiHint })),
  ...placeholderIndianTravelers.map(item => ({ id: item.id, userName: item.name, avatarUrl: item.avatarUrl, avatarAiHint: item.avatarAiHint })),
];
const uniqueStoryUsers = Array.from(new Map(storyUsers.map(item => [item.userName, item])).values());


// Create story data from the unique list of users
const storyItems: StoryItem[] = [
  { id: 'currentUser', userName: 'Phil Harrison', avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=80&h=80&fit=crop', avatarAiHint: 'your avatar male', hasStory: false, isCurrentUser: true },
  ...uniqueStoryUsers.map(item => ({
    id: item.id,
    userName: item.userName,
    avatarUrl: item.avatarUrl,
    avatarAiHint: item.avatarAiHint,
    hasStory: true,
    isCurrentUser: false,
  }))
];


export function OrbitPageClient() {
  const { getTranslation } = useLanguage();
  const [activeTab, setActiveTab] = React.useState('home');

  const currentUser = {
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=80&h=80&fit=crop',
    profilePath: '/profile/phil-harrison',
  };

  const renderMainContent = () => {
    switch (activeTab) {
      case 'home':
        return (
          <div className="space-y-4">
            {placeholderFeedItems.map(item => (
              <OrbitFeedCard key={item.id} item={item} />
            ))}
          </div>
        );
      case 'connect':
        return <OrbitConnectView />;
      case 'explore':
        return <OrbitExploreView />;
      default:
        return (
           <div className="space-y-4">
            {placeholderFeedItems.map(item => (
              <OrbitFeedCard key={item.id} item={item} />
            ))}
          </div>
        );
    }
  };

  return (
    <Sheet>
      <div className="flex flex-col h-screen bg-gradient-to-br from-sky-100 via-rose-50 to-white text-neutral-800 dark:bg-gradient-to-br dark:from-slate-900 dark:to-blue-950 dark:text-neutral-200 overflow-hidden">
        <OrbitHeader
          activeTab={activeTab}
          onNavClick={setActiveTab}
          currentUserAvatarUrl={currentUser.avatarUrl}
          currentUserProfilePath={currentUser.profilePath}
        />
        <OrbitStories stories={storyItems} />
        <div className="flex flex-1 overflow-hidden pt-4 pb-20 md:pb-4 px-2 md:px-4">
          <ScrollArea className="flex-1 pr-2 md:pr-4">
            {renderMainContent()}
          </ScrollArea>
          <aside className="hidden md:block w-72 lg:w-80 flex-shrink-0 pl-2 md:pl-4">
            <ScrollArea className="h-full">
              <div className="space-y-4 pr-3">
                <OrbitTopTravelers topTravelers={placeholderTopTravelers} indianTravelers={placeholderIndianTravelers} />
                <OrbitCTA
                  title={getTranslation('orbitCTATitle', 'Embark on Adventures')}
                  description={getTranslation(
                    'orbitCTADescriptionNew',
                    "Meet fellow traveler's, embark on adventures together and win free trips"
                  )}
                  buttonTextKey="orbitCTAButtonExplore"
                  buttonTextFallback="Explore Now"
                />
                <OrbitCTA
                  title={getTranslation('orbitShareJourneyTitle', 'Share Your Journey')}
                  description={getTranslation(
                    'orbitShareJourneyDescription',
                    'The most adventurous journey of the month wins a free trip!'
                  )}
                  imageUrl="https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=800&auto=format&fit=crop"
                  imageAltKey="orbitShareJourneyImageAlt"
                  imageAltFallback="Adventurous mountain landscape"
                  imageAiHint="adventure mountain stars"
                  buttonTextKey="orbitShareJourneyButton"
                  buttonTextFallback="Share Now"
                />
              </div>
            </ScrollArea>
          </aside>
        </div>
        <OrbitBottomNav />
      </div>
      <SheetContent className="w-[380px] sm:w-[420px] bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg border-l border-neutral-200/50 dark:border-slate-700/50 text-neutral-800 dark:text-neutral-200 p-0 flex flex-col">
        <SheetHeader className="p-4 border-b border-neutral-200/60 dark:border-slate-700/60">
          <SheetTitle className="text-neutral-900 dark:text-neutral-100">{getTranslation('messengerSidebarTitle', 'Messages')}</SheetTitle>
          <SheetDescription className="text-neutral-500 dark:text-neutral-400">
            {getTranslation('messengerSidebarDescription', 'Your recent conversations.')}
          </SheetDescription>
        </SheetHeader>
        <OrbitMessengerSidebar />
      </SheetContent>
    </Sheet>
  );
}
