
'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Plane, Users, Globe2, MessageSquarePlus, Search } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/contexts/LanguageContext';
import { Input } from '../ui/input';

export type ChatCategory = 'tripGroupChats' | 'travelBuddies' | 'localHosts';

interface ChatItem {
  id: string;
  name: string;
  avatarUrl: string;
  aiHint: string;
  destinationTag?: string;
  latestMessage: string;
  unread?: boolean;
  type: 'group' | 'buddy' | 'host';
}

interface WanderChatsSidebarProps {
  activeCategory: ChatCategory;
  onSelectCategory: (category: ChatCategory) => void;
  chatItems: ChatItem[];
  onSelectChat: (chatItem: ChatItem) => void;
  selectedChatId?: string | null;
}

export function WanderChatsSidebar({
  activeCategory,
  onSelectCategory,
  chatItems,
  onSelectChat,
  selectedChatId,
}: WanderChatsSidebarProps) {
  const { getTranslation } = useLanguage();
  const [searchTerm, setSearchTerm] = React.useState('');

  const categories = [
    { id: 'tripGroupChats', labelKey: 'wanderChatTripGroups', fallback: 'Trip Groups', icon: Plane },
    { id: 'travelBuddies', labelKey: 'wanderChatTravelBuddies', fallback: 'Travel Buddies', icon: Users },
    { id: 'localHosts', labelKey: 'wanderChatLocalHosts', fallback: 'Local Hosts', icon: Globe2 },
  ] as const;

  const filteredChatItems = chatItems.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (item.destinationTag && item.destinationTag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <aside className="w-80 md:w-96 bg-card border-r border-border flex flex-col h-full">
      <div className="p-4 border-b border-border flex items-center justify-between">
        <h2 className="font-headline text-2xl font-semibold text-foreground">
          {getTranslation('wanderChatsTitle', 'WanderChats')}
        </h2>
        <Link href="/profile/phil-harrison" className="flex items-center gap-2 group">
          <Avatar className="h-8 w-8 group-hover:ring-2 group-hover:ring-primary transition-all">
            <AvatarImage src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=40&h=40&fit=crop" alt="Phil" data-ai-hint="user avatar male" />
            <AvatarFallback>P</AvatarFallback>
          </Avatar>
          <span className="text-sm font-medium text-foreground hidden sm:inline group-hover:text-primary transition-colors">
            {getTranslation('philHarrisonName', 'Phil')}
          </span>
        </Link>
      </div>
      <div className="p-4 border-b border-border">
        <div className="relative">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder={getTranslation('wanderChatsSearchPlaceholder', 'Search chats...')}
            className="pl-9 h-9 text-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="p-2 border-b border-border">
        <div className="flex space-x-1 bg-muted/50 p-1 rounded-lg">
          {categories.map(category => {
            const Icon = category.icon;
            const isActive = activeCategory === category.id;
            return (
              <Button
                key={category.id}
                variant="ghost"
                size="sm"
                className={cn(
                  "flex-1 justify-center text-xs h-8 transition-all duration-200",
                  isActive ? "bg-primary text-white shadow-lg" : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
                onClick={() => onSelectCategory(category.id)}
              >
                <Icon className="h-4 w-4 mr-1.5" />
                {getTranslation(category.labelKey, category.fallback)}
              </Button>
            );
          })}
        </div>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-3 space-y-1.5">
          {filteredChatItems.length > 0 ? filteredChatItems.map(item => (
            <div
              key={item.id}
              className={cn(
                "flex items-start gap-3 p-2.5 rounded-lg cursor-pointer transition-colors duration-150",
                selectedChatId === item.id ? "bg-primary/10" : "hover:bg-muted/50"
              )}
              onClick={() => onSelectChat(item)}
            >
              <Avatar className="h-10 w-10 border-2 border-border shadow-sm">
                <AvatarImage src={item.avatarUrl} alt={item.name} data-ai-hint={item.aiHint} />
                <AvatarFallback>{item.name.substring(0, 1)}</AvatarFallback>
              </Avatar>
              <div className="flex-grow overflow-hidden">
                <div className="flex items-baseline justify-between">
                  <h4 className={cn("text-sm font-medium truncate", selectedChatId === item.id ? "text-primary" : "text-foreground")}>{item.name}</h4>
                  {item.unread && <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0 ml-2"></div>}
                </div>
                {item.destinationTag && (
                  <Badge variant="outline" className="text-[10px] px-1.5 py-0.5 font-normal border-border bg-muted/50 text-muted-foreground mt-0.5">
                    {item.destinationTag}
                  </Badge>
                )}
                <p className="text-xs text-muted-foreground truncate mt-0.5">{item.latestMessage}</p>
              </div>
            </div>
          )) : (
            <p className="p-4 text-center text-sm text-muted-foreground">
              {getTranslation('wanderChatsNoChatsFound', 'No chats found in this category.')}
            </p>
          )}
        </div>
      </ScrollArea>

      <div className="p-4 mt-auto border-t border-border">
        <Button className="w-full bg-primary text-white hover:bg-primary/90 transition-opacity shadow-lg">
          <MessageSquarePlus className="h-5 w-5 mr-2" />
          {getTranslation('wanderChatsStartNewChat', 'Start New Chat')}
        </Button>
      </div>
    </aside>
  );
}
