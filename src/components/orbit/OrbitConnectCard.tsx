
'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { MapPin, UserPlus } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export interface ConnectProfile {
  id: string;
  name: string;
  avatarUrl: string;
  avatarAiHint: string;
  location: string;
  flagCode: string;
  tagline: string;
}

interface OrbitConnectCardProps {
  profile: ConnectProfile;
}

export function OrbitConnectCard({ profile }: OrbitConnectCardProps) {
  const { getTranslation } = useLanguage();

  return (
    <div className="bg-white/60 dark:bg-slate-800/50 backdrop-blur-lg border border-neutral-200/80 dark:border-slate-700/80 rounded-2xl p-4 shadow-lg flex flex-col items-center text-center group transition-all duration-300 hover:scale-105 hover:shadow-xl hover:border-neutral-300 dark:hover:border-slate-600">
      <Avatar className="h-20 w-20 mb-3 border-4 border-white dark:border-slate-700">
        <AvatarImage src={profile.avatarUrl} alt={profile.name} data-ai-hint={profile.avatarAiHint} />
        <AvatarFallback>{profile.name.substring(0, 1)}</AvatarFallback>
      </Avatar>
      <h3 className="font-semibold text-neutral-800 dark:text-neutral-200 text-lg">{profile.name}</h3>
      <div className="flex items-center text-xs text-neutral-500 dark:text-neutral-400 mt-1 mb-3">
        <Image
          src={`https://flagcdn.com/w20/${profile.flagCode.toLowerCase()}.png`}
          alt={`${profile.flagCode} flag`}
          width={16}
          height={12}
          className="mr-1.5 rounded-sm object-contain"
        />
        <span>{profile.location}</span>
      </div>
      <p className="text-xs text-neutral-500 dark:text-neutral-400 mb-4 h-8 overflow-hidden">
        {profile.tagline}
      </p>
      <Button
        variant="outline"
        className="w-full mt-auto bg-white/50 dark:bg-slate-900/50 border-neutral-300 dark:border-slate-600 text-teal-700 dark:text-teal-400 hover:bg-teal-500/10 dark:hover:bg-teal-400/10 hover:text-teal-800 dark:hover:text-teal-300 hover:border-teal-300 dark:hover:border-teal-500 rounded-lg"
      >
        <UserPlus className="h-4 w-4 mr-2" />
        {getTranslation('orbitConnectButton', 'Connect')}
      </Button>
    </div>
  );
}
