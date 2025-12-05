
'use client';

import React from 'react';
import Image from 'next/image';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';

interface MessengerItemProps {
  id: string;
  avatarUrl: string;
  avatarAiHint: string;
  name: string;
  designationKey: 'messengerHostDesignation' | 'messengerTravelerDesignation';
  designationFallback: 'Host' | 'Traveler';
  lastMessage: string;
  time: string;
  unread?: boolean;
}

const placeholderMessages: MessengerItemProps[] = [
  {
    id: 'msg1',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=40&h=40&fit=crop',
    avatarAiHint: 'person face happy',
    name: 'Alex H.',
    designationKey: 'messengerHostDesignation',
    designationFallback: 'Host',
    lastMessage: "Great! See you then. Don't forget your jacket!",
    time: '2m ago',
    unread: true,
  },
  {
    id: 'msg2',
    avatarUrl: 'https://images.unsplash.com/photo-1521146764736-56c929d59c83?q=80&w=40&h=40&fit=crop',
    avatarAiHint: 'person face neutral',
    name: 'Maria L.',
    designationKey: 'messengerTravelerDesignation',
    designationFallback: 'Traveler',
    lastMessage: "Sounds amazing, I'm really looking forward to it!",
    time: '1h ago',
  },
  {
    id: 'msg3',
    avatarUrl: 'https://images.unsplash.com/photo-1528892952291-009c663ce843?q=80&w=40&h=40&fit=crop',
    avatarAiHint: 'person face friendly',
    name: 'Chen W.',
    designationKey: 'messengerHostDesignation',
    designationFallback: 'Host',
    lastMessage: 'Yes, the room is still available for those dates.',
    time: 'Yesterday',
  },
  {
    id: 'msg4',
    avatarUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=40&h=40&fit=crop',
    avatarAiHint: 'person face thoughtful',
    name: 'David K.',
    designationKey: 'messengerTravelerDesignation',
    designationFallback: 'Traveler',
    lastMessage: 'Can you recommend any good local restaurants?',
    time: '3d ago',
    unread: true,
  },
  {
    id: 'msg5',
    avatarUrl: 'https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?q=80&w=40&h=40&fit=crop',
    avatarAiHint: 'person face kind',
    name: 'Priya S.',
    designationKey: 'messengerHostDesignation',
    designationFallback: 'Host',
    lastMessage: "Thanks for the stay, it was wonderful!",
    time: '1w ago',
  },
];

const MessengerItem: React.FC<MessengerItemProps> = ({
  avatarUrl,
  avatarAiHint,
  name,
  designationKey,
  designationFallback,
  lastMessage,
  time,
  unread,
}) => {
  const { getTranslation } = useLanguage();
  const designation = getTranslation(designationKey, designationFallback);
  const designationColor = designation === getTranslation('messengerHostDesignation', 'Host')
    ? 'bg-blue-100 text-blue-700'
    : 'bg-green-100 text-green-700';

  return (
    <div
      className={`flex items-start gap-3 p-3 hover:bg-muted/50 rounded-lg cursor-pointer transition-colors ${
        unread ? 'bg-primary/5' : ''
      }`}
      onClick={() => console.log(`Clicked on message from ${name}`)}
    >
      <Avatar className="h-10 w-10">
        <AvatarImage src={avatarUrl} alt={name} data-ai-hint={avatarAiHint} />
        <AvatarFallback>{name.substring(0, 1)}</AvatarFallback>
      </Avatar>
      <div className="flex-grow overflow-hidden">
        <div className="flex items-baseline justify-between">
          <h4 className="text-sm font-semibold text-foreground truncate">{name}</h4>
          <span className={`text-xs ${unread ? 'text-primary font-medium' : 'text-muted-foreground'}`}>{time}</span>
        </div>
        <div className="flex items-center justify-between">
            <Badge variant="outline" className={`text-[10px] px-1.5 py-0.5 font-normal border-transparent ${designationColor}`}>
            {designation}
            </Badge>
            {unread && <div className="w-2 h-2 bg-primary rounded-full ml-auto"></div>}
        </div>
        <p className={`text-xs text-muted-foreground truncate mt-0.5 ${unread ? 'font-medium text-foreground/90' : ''}`}>
          {lastMessage}
        </p>
      </div>
    </div>
  );
};


export function ProfileMessengerSidebar() {
  return (
    <ScrollArea className="flex-1">
      <div className="p-2 space-y-1">
        {placeholderMessages.map((msg) => (
          <MessengerItem key={msg.id} {...msg} />
        ))}
      </div>
    </ScrollArea>
  );
}
