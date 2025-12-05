
'use client';

import React from 'react';
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
  // Using data from existing users in Orbit page for consistency
  {
    id: 'msg1',
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=40&h=40&fit=crop',
    avatarAiHint: 'woman smiling',
    name: 'Emily Smith',
    designationKey: 'messengerTravelerDesignation',
    designationFallback: 'Traveler',
    lastMessage: "Can't wait for our Kyoto trip!",
    time: '5m ago',
    unread: true,
  },
  {
    id: 'msg2',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=40&h=40&fit=crop',
    avatarAiHint: 'man portrait',
    name: 'Jack Ryan',
    designationKey: 'messengerHostDesignation',
    designationFallback: 'Host',
    lastMessage: "Just sent you the address for the Venice stay.",
    time: '1h ago',
  },
  {
    id: 'msg3',
    avatarUrl: 'https://images.unsplash.com/photo-1521146764736-56c929d59c83?q=80&w=40&h=40&fit=crop',
    avatarAiHint: 'woman adventure',
    name: 'Sophia Chen',
    designationKey: 'messengerTravelerDesignation',
    designationFallback: 'Traveler',
    lastMessage: 'The photos from Machu Picchu are stunning!',
    time: 'Yesterday',
    unread: true,
  },
    {
    id: 'msg4',
    avatarUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=40&h=40&fit=crop',
    avatarAiHint: 'woman glasses',
    name: 'Hannah Lee',
    designationKey: 'messengerHostDesignation',
    designationFallback: 'Host',
    lastMessage: "Thanks for the great review!",
    time: '2d ago',
  },
    {
    id: 'msg5',
    avatarUrl: 'https://images.unsplash.com/photo-1615109398623-88346a601842?q=80&w=80&h=80&fit=crop',
    avatarAiHint: 'man smiling',
    name: 'Aarav Sharma',
    designationKey: 'messengerTravelerDesignation',
    designationFallback: 'Traveler',
    lastMessage: 'See you in Jaipur next week!',
    time: '4d ago',
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
    ? 'bg-teal-100 text-teal-800 dark:bg-teal-900/50 dark:text-teal-300'
    : 'bg-rose-100 text-rose-800 dark:bg-rose-900/50 dark:text-rose-300';

  return (
    <div
      className={`flex items-start gap-3 p-3 hover:bg-neutral-100/80 dark:hover:bg-slate-700/50 rounded-lg cursor-pointer transition-colors ${
        unread ? 'bg-teal-500/10 dark:bg-teal-500/10' : ''
      }`}
      onClick={() => console.log(`Clicked on message from ${name}`)}
    >
      <Avatar className="h-10 w-10 border-2 border-neutral-200/50 dark:border-slate-600">
        <AvatarImage src={avatarUrl} alt={name} data-ai-hint={avatarAiHint} />
        <AvatarFallback>{name.substring(0, 1)}</AvatarFallback>
      </Avatar>
      <div className="flex-grow overflow-hidden">
        <div className="flex items-baseline justify-between">
          <h4 className="text-sm font-semibold text-neutral-800 dark:text-neutral-100 truncate">{name}</h4>
          <span className={`text-xs ${unread ? 'text-teal-600 dark:text-teal-400 font-medium' : 'text-neutral-400 dark:text-neutral-500'}`}>{time}</span>
        </div>
        <div className="flex items-center justify-between">
            <Badge variant="outline" className={`text-[10px] px-1.5 py-0.5 font-normal border-transparent ${designationColor}`}>
            {designation}
            </Badge>
            {unread && <div className="w-2 h-2 bg-teal-500 dark:bg-teal-400 rounded-full ml-auto"></div>}
        </div>
        <p className={`text-xs text-neutral-500 dark:text-neutral-400 truncate mt-0.5 ${unread ? 'font-semibold text-neutral-700 dark:text-neutral-300' : ''}`}>
          {lastMessage}
        </p>
      </div>
    </div>
  );
};


export function OrbitMessengerSidebar() {
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
