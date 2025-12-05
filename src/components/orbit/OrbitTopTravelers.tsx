
'use client';

import React from 'react';
import Image from 'next/image';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useLanguage } from '@/contexts/LanguageContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export interface TopTraveler {
  id: string;
  name: string;
  avatarUrl: string;
  avatarAiHint: string;
  flagCode?: string; // e.g., 'FR', 'JP', 'US'. Will use flagcdn if available.
}

interface OrbitTopTravelersProps {
  topTravelers: TopTraveler[];
  indianTravelers: TopTraveler[];
}

export function OrbitTopTravelers({topTravelers, indianTravelers}: OrbitTopTravelersProps) {
  const { getTranslation } = useLanguage();

  return (
    <div className="bg-white/60 dark:bg-slate-800/50 backdrop-blur-lg border border-neutral-200/80 dark:border-slate-700/80 rounded-2xl p-4 shadow-lg">
      <h3 className="text-lg font-semibold text-neutral-800 dark:text-neutral-200 mb-4">{getTranslation('orbitTopTravelersTitle', 'Top Travelers')}</h3>
      <Tabs defaultValue="global" className="w-full">
        <TabsList className="grid w-full grid-cols-2 bg-neutral-100/70 dark:bg-slate-900/70 p-1 h-auto rounded-lg">
          <TabsTrigger value="global" className="text-xs text-neutral-500 dark:text-neutral-400 data-[state=active]:bg-white dark:data-[state=active]:bg-slate-700 data-[state=active]:text-teal-600 dark:data-[state=active]:text-teal-400 data-[state=active]:shadow-sm rounded-md">
            {getTranslation('orbitTopTravelersGlobal', 'Global')}
          </TabsTrigger>
          <TabsTrigger value="local" className="text-xs text-neutral-500 dark:text-neutral-400 data-[state=active]:bg-white dark:data-[state=active]:bg-slate-700 data-[state=active]:text-teal-600 dark:data-[state=active]:text-teal-400 data-[state=active]:shadow-sm rounded-md">
             {getTranslation('orbitTopTravelersLocal', 'Local')}
          </TabsTrigger>
        </TabsList>
        <TabsContent value="global" className="mt-4">
            <ul className="space-y-3">
            {topTravelers.map(traveler => (
              <li key={traveler.id} className="flex items-center space-x-3 group cursor-pointer p-1.5 rounded-lg hover:bg-neutral-100/80 dark:hover:bg-slate-700/50 transition-colors">
                <Avatar className="h-8 w-8 border-2 border-neutral-200 dark:border-slate-600">
                  <AvatarImage src={traveler.avatarUrl} alt={traveler.name} data-ai-hint={traveler.avatarAiHint} />
                  <AvatarFallback>{traveler.name.substring(0, 1)}</AvatarFallback>
                </Avatar>
                <span className="text-sm text-neutral-700 dark:text-neutral-300 group-hover:text-neutral-900 dark:group-hover:text-white flex-grow">{traveler.name}</span>
                {traveler.flagCode && (
                  <Image
                    src={`https://flagcdn.com/w20/${traveler.flagCode.toLowerCase()}.png`}
                    alt={`${traveler.flagCode} flag`}
                    width={20}
                    height={15}
                    className="rounded-sm object-contain flex-shrink-0"
                    data-ai-hint={`${traveler.flagCode.toLowerCase()} flag`}
                  />
                )}
              </li>
            ))}
          </ul>
        </TabsContent>
        <TabsContent value="local" className="mt-4">
           <ul className="space-y-3">
            {indianTravelers.map(traveler => (
              <li key={traveler.id} className="flex items-center space-x-3 group cursor-pointer p-1.5 rounded-lg hover:bg-neutral-100/80 dark:hover:bg-slate-700/50 transition-colors">
                <Avatar className="h-8 w-8 border-2 border-neutral-200 dark:border-slate-600">
                  <AvatarImage src={traveler.avatarUrl} alt={traveler.name} data-ai-hint={traveler.avatarAiHint} />
                  <AvatarFallback>{traveler.name.substring(0, 1)}</AvatarFallback>
                </Avatar>
                <span className="text-sm text-neutral-700 dark:text-neutral-300 group-hover:text-neutral-900 dark:group-hover:text-white flex-grow">{traveler.name}</span>
                {traveler.flagCode && (
                  <Image
                    src={`https://flagcdn.com/w20/${traveler.flagCode.toLowerCase()}.png`}
                    alt={`${traveler.flagCode} flag`}
                    width={20}
                    height={15}
                    className="rounded-sm object-contain flex-shrink-0"
                    data-ai-hint={`${traveler.flagCode.toLowerCase()} flag`}
                  />
                )}
              </li>
            ))}
          </ul>
        </TabsContent>
      </Tabs>
    </div>
  );
}
