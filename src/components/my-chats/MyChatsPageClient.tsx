
'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { WanderChatsLayout } from './WanderChatsLayout';
import { WanderChatsSidebar, type ChatCategory } from './WanderChatsSidebar';
import { WanderChatsMain } from './WanderChatsMain';
import { Header } from '@/components/layout/Header'; // Standard header
import { useLanguage } from '@/contexts/LanguageContext';
import type { MessageProps } from './ChatMessageBubble';
import { ChatFooter } from './ChatFooter';

const PHIL_AVATAR_URL = 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=32&h=32&fit=crop';
const PHIL_PROFILE_PATH = '/profile/phil-harrison';
const EMILY_PROFILE_PATH = '/profile/emily-smith';
const ALEX_PROFILE_PATH = '/profile/alex-h';
const MARIA_PROFILE_PATH = '/profile/maria-l';
const CHEN_PROFILE_PATH = '/profile/chen-w';

// Placeholder Data for Chat Items
const placeholderChatItems = {
  tripGroupChats: [
    { id: 'tgc1', name: 'Parisian Dream Crew', avatarUrl: 'https://placehold.co/40x40/E5B84B/ffffff.png?text=P', aiHint: 'group travel', destinationTag: 'Paris, FR', latestMessage: 'Can’t wait for the Louvre!', unread: true, type: 'group' as const },
    { id: 'tgc2', name: 'Kyoto Explorers', avatarUrl: 'https://placehold.co/40x40/45A29E/ffffff.png?text=K', aiHint: 'temple japan', destinationTag: 'Kyoto, JP', latestMessage: 'Remember the Gion festival.', unread: false, type: 'group' as const },
  ],
  travelBuddies: [
    { id: 'tb1', name: 'Alex H.', avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=40&h=40&fit=crop', aiHint: 'person friendly', latestMessage: 'Still up for that hike?', unread: true, type: 'buddy' as const, profilePath: ALEX_PROFILE_PATH },
    { id: 'tb2', name: 'Maria L.', avatarUrl: 'https://images.unsplash.com/photo-1521146764736-56c929d59c83?q=80&w=40&h=40&fit=crop', aiHint: 'person kind', latestMessage: 'Loved the photos you sent!', unread: false, type: 'buddy' as const, profilePath: MARIA_PROFILE_PATH },
  ],
  localHosts: [
    { id: 'lh1', name: 'Chen W. (Bali Host)', avatarUrl: 'https://images.unsplash.com/photo-1528892952291-009c663ce843?q=80&w=40&h=40&fit=crop', aiHint: 'man smiling', destinationTag: 'Bali, ID', latestMessage: 'The villa is ready for you.', unread: false, type: 'host' as const, profilePath: CHEN_PROFILE_PATH },
  ],
};

// Messages for Parisian Dream Crew (tgc1)
const parisMessages: MessageProps[] = [
  { id: 'msg1', sender: 'Emily S.', text: 'Hey team! So excited for Paris! 🥐', timestamp: '10:30 AM', avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=32&h=32&fit=crop', aiHint: 'woman portrait', isCurrentUser: false, profilePath: EMILY_PROFILE_PATH, views: undefined, isRead: undefined },
  { id: 'msg2', sender: 'Phil Harrison', text: 'Me too! Anyone checked the weather forecast?', timestamp: '10:32 AM', avatarUrl: PHIL_AVATAR_URL, aiHint: 'user avatar male', isCurrentUser: true, profilePath: PHIL_PROFILE_PATH, views: 3, isRead: true },
  { id: 'msg3', sender: 'Alex H.', text: 'Looks sunny all week! Perfect for sightseeing. ☀️', timestamp: '10:35 AM', avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=32&h=32&fit=crop', aiHint: 'man glasses', isCurrentUser: false, profilePath: ALEX_PROFILE_PATH, views: undefined, isRead: undefined },
  { id: 'msg4', sender: 'Phil Harrison', text: 'Awesome! I was thinking we could visit the Eiffel Tower on the first day?', timestamp: '10:37 AM', avatarUrl: PHIL_AVATAR_URL, aiHint: 'user avatar male', isCurrentUser: true, profilePath: PHIL_PROFILE_PATH, views: 2, isRead: true },
  { id: 'msg5', sender: 'Emily S.', text: 'Sounds like a plan!', timestamp: '10:38 AM', avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=32&h=32&fit=crop', aiHint: 'woman portrait', isCurrentUser: false, profilePath: EMILY_PROFILE_PATH, views: undefined, isRead: undefined },
];

// Messages for Kyoto Explorers (tgc2)
const kyotoMessages: MessageProps[] = [
  { id: 'ky1', sender: 'Phil Harrison', text: 'Is everyone ready for the Gion Matsuri festival tomorrow?', timestamp: 'Yesterday 8:15 PM', avatarUrl: PHIL_AVATAR_URL, aiHint: 'user avatar male', isCurrentUser: true, profilePath: PHIL_PROFILE_PATH, views: 4, isRead: true },
  { id: 'ky2', sender: 'Yuki K.', text: 'Yes! So excited. I heard it\'s amazing.', timestamp: 'Yesterday 8:17 PM', avatarUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=32&h=32&fit=crop', aiHint: 'woman traditional', isCurrentUser: false, views: undefined, isRead: undefined },
  { id: 'ky3', sender: 'Kenji T.', text: 'I\'ve got my yukata ready!', timestamp: 'Yesterday 8:20 PM', avatarUrl: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=32&h=32&fit=crop', aiHint: 'man festival', isCurrentUser: false, views: undefined, isRead: undefined },
  { id: 'ky4', sender: 'Phil Harrison', text: 'Great! Let\'s meet at Yasaka Shrine at 6 PM then?', timestamp: 'Yesterday 8:22 PM', avatarUrl: PHIL_AVATAR_URL, aiHint: 'user avatar male', isCurrentUser: true, profilePath: PHIL_PROFILE_PATH, views: 3, isRead: true },
];

// Messages for Alex H. (tb1)
const alexMessages: MessageProps[] = [
  { id: 'ah1', sender: 'Alex H.', text: 'Hey! Still up for that hike in the Alps next month?', timestamp: 'Mon 9:00 AM', avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=32&h=32&fit=crop', aiHint: 'person friendly', isCurrentUser: false, profilePath: ALEX_PROFILE_PATH, views: undefined, isRead: undefined },
  { id: 'ah2', sender: 'Phil Harrison', text: 'Definitely! Been looking forward to it. Have you checked the weather forecast?', timestamp: 'Mon 9:05 AM', avatarUrl: PHIL_AVATAR_URL, aiHint: 'user avatar male', isCurrentUser: true, profilePath: PHIL_PROFILE_PATH, views: 1, isRead: true },
  { id: 'ah3', sender: 'Alex H.', text: 'Looks good so far, mostly sunny. We should book the cabin soon though.', timestamp: 'Mon 9:07 AM', avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=32&h=32&fit=crop', aiHint: 'person friendly', isCurrentUser: false, profilePath: ALEX_PROFILE_PATH, views: undefined, isRead: undefined },
  { id: 'ah4', sender: 'Phil Harrison', text: 'Good point. I\'ll look into it tonight.', timestamp: 'Mon 9:10 AM', avatarUrl: PHIL_AVATAR_URL, aiHint: 'user avatar male', isCurrentUser: true, profilePath: PHIL_PROFILE_PATH, views: 1, isRead: true },
];

// Messages for Maria L. (tb2)
const mariaMessages: MessageProps[] = [
  { id: 'ml1', sender: 'Maria L.', text: 'Loved the photos you sent from your Morocco trip! The souks looked incredible.', timestamp: 'Sun 3:30 PM', avatarUrl: 'https://images.unsplash.com/photo-1521146764736-56c929d59c83?q=80&w=32&h=32&fit=crop', aiHint: 'person kind', isCurrentUser: false, profilePath: MARIA_PROFILE_PATH, views: undefined, isRead: undefined },
  { id: 'ml2', sender: 'Phil Harrison', text: 'Thanks, Maria! It was an amazing experience. You should go sometime.', timestamp: 'Sun 3:32 PM', avatarUrl: PHIL_AVATAR_URL, aiHint: 'user avatar male', isCurrentUser: true, profilePath: PHIL_PROFILE_PATH, views: 1, isRead: true },
  { id: 'ml3', sender: 'Maria L.', text: 'It\'s on my list! Maybe next year.', timestamp: 'Sun 3:35 PM', avatarUrl: 'https://images.unsplash.com/photo-1521146764736-56c929d59c83?q=80&w=32&h=32&fit=crop', aiHint: 'person kind', isCurrentUser: false, profilePath: MARIA_PROFILE_PATH, views: undefined, isRead: undefined },
];

// Messages for Chen W. (Bali Host) (lh1)
const chenMessages: MessageProps[] = [
  { id: 'cw1', sender: 'Chen W. (Bali Host)', text: 'Just wanted to confirm your arrival time for next Tuesday. The villa is ready for you.', timestamp: 'Today 11:00 AM', avatarUrl: 'https://images.unsplash.com/photo-1528892952291-009c663ce843?q=80&w=32&h=32&fit=crop', aiHint: 'man smiling', isCurrentUser: false, profilePath: CHEN_PROFILE_PATH, views: undefined, isRead: undefined },
  { id: 'cw2', sender: 'Phil Harrison', text: 'Hi Chen, we\'ll be arriving around 3 PM. Thanks for the update!', timestamp: 'Today 11:05 AM', avatarUrl: PHIL_AVATAR_URL, aiHint: 'user avatar male', isCurrentUser: true, profilePath: PHIL_PROFILE_PATH, views: 1, isRead: true },
  { id: 'cw3', sender: 'Chen W. (Bali Host)', text: 'Perfect. I\'ll arrange for someone to meet you. Let me know if you need anything in the meantime.', timestamp: 'Today 11:08 AM', avatarUrl: 'https://images.unsplash.com/photo-1528892952291-009c663ce843?q=80&w=32&h=32&fit=crop', aiHint: 'man smiling', isCurrentUser: false, profilePath: CHEN_PROFILE_PATH, views: undefined, isRead: undefined },
  { id: 'cw4', sender: 'Phil Harrison', text: 'Will do, thanks again!', timestamp: 'Today 11:10 AM', avatarUrl: PHIL_AVATAR_URL, aiHint: 'user avatar male', isCurrentUser: true, profilePath: PHIL_PROFILE_PATH, views: 1, isRead: true },
];

// Fallback for unselected or new chats
const emptyMessages: MessageProps[] = [];

const allChatMessages: Record<string, MessageProps[]> = {
  'tgc1': parisMessages,
  'tgc2': kyotoMessages,
  'tb1': alexMessages,
  'tb2': mariaMessages,
  'lh1': chenMessages,
};

const SCROLL_THRESHOLD = 50;

export function MyChatsPageClient() {
  const { getTranslation } = useLanguage();
  const [activeChatCategory, setActiveChatCategory] = useState<ChatCategory>('tripGroupChats');
  const [selectedChat, setSelectedChat] = useState<any>(placeholderChatItems.tripGroupChats[0] || null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isHeaderScrolled, setIsHeaderScrolled] = useState(false);

  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY;
    setIsHeaderScrolled(currentScrollY > SCROLL_THRESHOLD);
  }, []);

  useEffect(() => {
    // If coming from a direct link with a category query param
    const queryParams = new URLSearchParams(window.location.search);
    const categoryFromQuery = queryParams.get('category') as ChatCategory;
    if (categoryFromQuery && placeholderChatItems[categoryFromQuery]) {
      setActiveChatCategory(categoryFromQuery);
      // Optionally, select the first chat in that category
      const firstChatInQueryCategory = placeholderChatItems[categoryFromQuery]?.[0];
      if (firstChatInQueryCategory && !selectedChat) { // Only if no chat is already selected
        setSelectedChat(firstChatInQueryCategory);
      }
    }
  }, []); // Run once on mount


  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const handleHeaderSearchSubmit = () => {
    console.log('Header search submitted on MyChats page:', searchQuery);
  };

  const handleSelectChat = (chatItem: any) => {
    setSelectedChat(chatItem);
    console.log("Selected chat:", chatItem.name);
  };
  
  const [chatMessages, setChatMessages] = useState<Record<string, MessageProps[]>>(allChatMessages);
  
  const currentChatItems = placeholderChatItems[activeChatCategory] || [];
  const messagesForSelectedChat = selectedChat ? (chatMessages[selectedChat.id] || emptyMessages) : emptyMessages;

  const handleSendMessage = useCallback((chatId: string, message: Omit<MessageProps, 'id' | 'timestamp' | 'views' | 'isRead'>) => {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const displayHours = hours % 12 || 12;
    const timestamp = `${displayHours}:${String(minutes).padStart(2, '0')} ${ampm}`;
    
    const newMessage: MessageProps = {
      ...message,
      id: `msg-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      timestamp,
      views: 0,
      isRead: false,
    };
    
    setChatMessages(prev => ({
      ...prev,
      [chatId]: [...(prev[chatId] || []), newMessage],
    }));
    
    // Simulate views after a delay (for demo purposes)
    setTimeout(() => {
      setChatMessages(prev => {
        const updatedMessages = [...(prev[chatId] || [])];
        const messageIndex = updatedMessages.findIndex(m => m.id === newMessage.id);
        if (messageIndex !== -1) {
          updatedMessages[messageIndex] = {
            ...updatedMessages[messageIndex],
            views: Math.floor(Math.random() * 5) + 1, // Random views between 1-5
            isRead: true,
          };
        }
        return {
          ...prev,
          [chatId]: updatedMessages,
        };
      });
    }, 2000);
  }, []);

  return (
    <div className="flex flex-col min-h-screen w-full bg-background">
      <Header
        isScrolled={isHeaderScrolled}
        searchQuery={searchQuery}
        onSearchQueryChange={setSearchQuery}
        onSearchSubmit={handleHeaderSearchSubmit}
        showCurrencySelector={false}
      />
      <div className="flex-1 flex overflow-hidden">
        <WanderChatsLayout
          sidebar={
            <WanderChatsSidebar
              activeCategory={activeChatCategory}
              onSelectCategory={setActiveChatCategory}
              chatItems={currentChatItems}
              onSelectChat={handleSelectChat}
              selectedChatId={selectedChat?.id}
            />
          }
        >
          {selectedChat ? (
            <WanderChatsMain
              chatName={selectedChat.name}
              location={selectedChat.destinationTag}
              messages={messagesForSelectedChat}
              onSendMessage={(message) => handleSendMessage(selectedChat.id, message)}
            />
          ) : (
            <div className="flex-1 flex items-center justify-center text-muted-foreground p-8 text-center bg-background">
              {getTranslation('wanderChatsSelectChatPrompt', 'Select a chat to start messaging or create a new one!')}
            </div>
          )}
        </WanderChatsLayout>
      </div>
      <ChatFooter />
    </div>
  );
}
