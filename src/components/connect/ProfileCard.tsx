'use client';

import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Star, UserPlus, MessageSquare } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface ProfileCardProps {
  id: string;
  name: string;
  avatarUrl: string;
  location: string;
  rating: number;
  bio: string;
  role: 'Traveler' | 'Host' | 'Companion';
  stats: {
    value: string;
    label: string;
  };
  aiHint: string;
  animationDelay?: number;
}

export function ProfileCard({ name, avatarUrl, location, rating, bio, role, stats, aiHint, animationDelay = 0 }: ProfileCardProps) {
  const roleColors: Record<typeof role, string> = {
    Traveler: 'bg-sky-100 text-sky-700 border-sky-300',
    Host: 'bg-orange-100 text-orange-700 border-orange-300',
    Companion: 'bg-purple-100 text-purple-700 border-purple-300',
  };

  return (
    <div
      className="group bg-card rounded-2xl shadow-lg p-5 flex flex-col h-full transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:border-primary/30 border border-transparent"
      style={{ animationDelay: `${animationDelay}ms` }}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <Avatar className="h-12 w-12 border transition-transform duration-300 group-hover:scale-110">
            <AvatarImage src={avatarUrl} alt={name} data-ai-hint={aiHint} />
            <AvatarFallback>{name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <h4 className="font-semibold text-lg text-foreground transition-colors duration-300 group-hover:text-primary">{name}</h4>
            <div className="flex items-center text-xs text-muted-foreground">
              <MapPin className="h-3 w-3 mr-1" />
              <span>{location}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-1 bg-muted px-2 py-1 rounded-full text-sm">
          <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
          <span className="font-semibold">{rating.toFixed(1)}</span>
        </div>
      </div>

      <p className="text-sm text-muted-foreground mb-4 h-10">{bio}</p>

      <div className="flex items-end justify-between mb-4">
        <div>
          <Badge variant="outline" className={cn('text-xs', roleColors[role])}>
            {role}
          </Badge>
        </div>
        <div className="text-right">
          <p className="font-bold text-lg text-foreground">{stats.value}</p>
          <p className="text-xs text-muted-foreground">{stats.label}</p>
        </div>
      </div>

      <div className="mt-auto flex gap-2">
        <Button variant="outline" className="w-full transition-colors hover:bg-primary/10">
          <UserPlus className="h-4 w-4 mr-2" />
          Connect
        </Button>
        <Button variant="outline" className="w-full transition-colors hover:bg-primary/10">
          <MessageSquare className="h-4 w-4 mr-2" />
          Message
        </Button>
      </div>
    </div>
  );
}