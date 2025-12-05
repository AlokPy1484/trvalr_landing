
'use client';

import React from 'react';
import Image from 'next/image';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/contexts/LanguageContext';

export interface StoryItem {
  id: string;
  userName: string;
  avatarUrl: string;
  avatarAiHint: string;
  hasStory: boolean;
  isCurrentUser?: boolean;
}

interface OrbitStoriesProps {
  stories: StoryItem[];
}

export function OrbitStories({ stories }: OrbitStoriesProps) {
  const { getTranslation } = useLanguage();
  return (
    <div className="w-full px-2 md:px-4 py-3 border-b border-neutral-200/80 dark:border-slate-700/80">
      <div className="flex space-x-4 overflow-x-auto pb-2 scrollbar-hide">
        {stories.map(story => (
          <div key={story.id} className="flex flex-col items-center flex-shrink-0 w-16 text-center group cursor-pointer">
            <div
              className={cn(
                "relative rounded-full p-0.5 transition-all duration-300 group-hover:scale-105",
                story.hasStory && "bg-gradient-to-r from-teal-400 via-rose-400 to-amber-400 group-hover:bg-gradient-to-bl"
              )}
            >
              <Avatar className="h-14 w-14 border-2 border-background dark:border-slate-800">
                <AvatarImage src={story.avatarUrl} alt={story.userName} data-ai-hint={story.avatarAiHint} />
                <AvatarFallback>{story.userName.substring(0, 1).toUpperCase()}</AvatarFallback>
              </Avatar>
              {story.isCurrentUser && (
                <div className="absolute bottom-0 right-0">
                  <Button size="icon" className="h-5 w-5 rounded-full bg-teal-500 hover:bg-teal-400 text-white border-2 border-background dark:border-slate-800">
                    <Plus className="h-3 w-3" />
                  </Button>
                </div>
              )}
            </div>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-1.5 truncate w-full">
              {story.isCurrentUser ? getTranslation('orbitYourStory', 'Your Story') : story.userName}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
