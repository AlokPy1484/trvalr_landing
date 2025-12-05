
'use client';

import React from 'react';
import Image from 'next/image';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Heart, MessageCircle } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export interface OrbitFeedItem {
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

interface OrbitFeedCardProps {
  item: OrbitFeedItem;
}

export function OrbitFeedCard({ item }: OrbitFeedCardProps) {
  const { getTranslation } = useLanguage();

  return (
    <div className="bg-white/60 dark:bg-slate-800/50 backdrop-blur-lg border border-neutral-200/80 dark:border-slate-700/80 rounded-2xl p-4 shadow-lg">
      <div className="flex items-center mb-3">
        <Avatar className="h-10 w-10 mr-3 border-2 border-teal-500/20 dark:border-teal-400/20">
          <AvatarImage src={item.avatarUrl} alt={item.userName} data-ai-hint={item.avatarAiHint} />
          <AvatarFallback>{item.userName.substring(0, 1)}</AvatarFallback>
        </Avatar>
        <div>
          <p className="font-semibold text-neutral-800 dark:text-neutral-200 text-sm">{item.userName} <span className="text-neutral-500 dark:text-neutral-400 font-normal">· {item.userLocation}</span></p>
          <p className="text-xs text-neutral-400 dark:text-neutral-500">{item.timestamp}</p>
        </div>
      </div>
      <p className="text-sm text-neutral-700 dark:text-neutral-300 mb-3">{item.caption}</p>
      <div className="relative aspect-[16/10] w-full rounded-lg overflow-hidden mb-3 shadow-md">
        <Image
          src={item.imageUrl}
          alt={item.caption}
          fill
          className="object-cover"
          data-ai-hint={item.imageAiHint}
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>
      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="sm" className="text-neutral-500 dark:text-neutral-400 hover:text-rose-500 dark:hover:text-rose-400 hover:bg-rose-500/10 dark:hover:bg-rose-400/10 p-1 h-auto">
          <Heart className="h-4 w-4 mr-1.5" />
          <span className="text-xs">{item.likes}</span>
        </Button>
        <Button variant="ghost" size="sm" className="text-neutral-500 dark:text-neutral-400 hover:text-teal-600 dark:hover:text-teal-400 hover:bg-teal-500/10 dark:hover:bg-teal-400/10 p-1 h-auto">
          <MessageCircle className="h-4 w-4 mr-1.5" />
          <span className="text-xs">{item.comments}</span>
        </Button>
      </div>
    </div>
  );
}
