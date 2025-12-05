
'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ImagePlus, MapPin, Music, Film, Edit3, List, BookOpen as StoryIcon, MoreHorizontal, ImageIcon } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

const journalingPrompts = [
  'myTripsPromptWindswept',
  'myTripsPromptMetStars',
  'myTripsPromptSoundtrack',
  'myTripsPromptUnforgettableTaste',
  'myTripsPromptLessonLearned',
];

interface PastEntry {
  id: string;
  title: string;
  date: string;
  location: string;
  snippet: string;
  imageUrl: string;
  aiHint: string;
}

const pastEntriesData: PastEntry[] = [
  {
    id: 'log1',
    title: 'Neon Dreams in Shinjuku',
    date: 'May 15, 2023',
    location: 'Tokyo, Japan',
    snippet: 'The city buzzes with a life of its own after dark. Lost track of time wandering through alleys lit by a thousand signs, each one telling a different story. The ramen was life-changing.',
    imageUrl: 'https://images.unsplash.com/photo-1542051841857-5f90071e7989?q=80&w=400&h=300&fit=crop',
    aiHint: 'tokyo street night neon',
  },
  {
    id: 'log2',
    title: 'Sunrise Over the Serengeti',
    date: 'August 02, 2023',
    location: 'Serengeti, Tanzania',
    snippet: 'Woke up before dawn to a sky painted in hues of orange and purple. The silhouette of acacia trees and the distant roar of a lion... a moment of pure, untamed magic.',
    imageUrl: 'https://images.unsplash.com/photo-1473580044384-7ba9967e16a0?q=80&w=400&h=300&fit=crop',
    aiHint: 'serengeti sunrise safari',
  },
  {
    id: 'log3',
    title: 'Echoes of the Colosseum',
    date: 'September 05, 2022',
    location: 'Rome, Italy',
    snippet: 'Standing inside the Colosseum, you can almost feel the weight of history. The sheer scale is hard to comprehend. A powerful reminder of human ambition and the passage of time.',
    imageUrl: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?q=80&w=400&h=300&fit=crop',
    aiHint: 'rome colosseum historic',
  },
];

const PastEntryCard: React.FC<PastEntry> = ({ title, date, location, snippet, imageUrl, aiHint }) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);
  
  // Fallback image URL
  const fallbackImage = 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=600&h=400&fit=crop';
  const displayImage = imageError ? fallbackImage : imageUrl;

  return (
    <div className="bg-card border border-border rounded-xl shadow-lg overflow-hidden group transition-all duration-300 ease-in-out hover:shadow-xl hover:-translate-y-1">
      <div className="relative aspect-video w-full bg-muted">
        {imageLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-muted animate-pulse">
            <ImageIcon className="h-12 w-12 text-muted-foreground/50" />
          </div>
        )}
        <Image
          src={displayImage}
          alt={title}
          fill
          className={cn(
            "object-cover",
            imageLoading && "opacity-0"
          )}
          data-ai-hint={aiHint}
          onError={() => {
            setImageError(true);
            setImageLoading(false);
          }}
          onLoad={() => setImageLoading(false)}
          unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <h4 className="font-headline text-lg font-semibold text-foreground">{title}</h4>
            <div className="flex items-center text-xs text-muted-foreground mt-1">
              <MapPin className="h-3 w-3 mr-1.5" />
              <span>{location}</span>
              <span className="mx-1.5">•</span>
              <span>{date}</span>
            </div>
          </div>
          <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:bg-muted -mt-1 -mr-1">
            <MoreHorizontal className="h-5 w-5" />
          </Button>
        </div>
        <p className="text-sm text-foreground/80 mt-3 leading-relaxed">
          {snippet}
        </p>
      </div>
    </div>
  );
};


export function SoulLogsSection() {
  const { getTranslation } = useLanguage();
  const [currentEntry, setCurrentEntry] = useState('');
  const [isStoryMode, setIsStoryMode] = useState(false);

  const getRandomPrompt = () => {
    const randomIndex = Math.floor(Math.random() * journalingPrompts.length);
    return getTranslation(journalingPrompts[randomIndex], "What's on your mind today?");
  };

  const [activePrompt, setActivePrompt] = useState(getRandomPrompt());

  const handleSaveEntry = () => {
    console.log("Soul Log Entry Saved:", { prompt: activePrompt, entry: currentEntry });
    setCurrentEntry('');
    setActivePrompt(getRandomPrompt()); // Get a new prompt
  };

  return (
    <div className="p-6 space-y-8 min-h-full">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <h2 className="font-headline text-3xl font-bold text-foreground">
          {getTranslation('myTripsSoulLogsTitle', 'Soul Logs')}
        </h2>
        <div className="flex items-center space-x-2">
          <Label htmlFor="view-toggle" className="text-sm text-muted-foreground">
            {isStoryMode ? getTranslation('myTripsStoryView', 'Story View') : getTranslation('myTripsListView', 'List View')}
          </Label>
          <Switch
            id="view-toggle"
            checked={isStoryMode}
            onCheckedChange={setIsStoryMode}
            aria-label="Toggle view mode"
          />
        </div>
      </div>

      {/* Journaling Area */}
      <div className="bg-card border border-border p-6 rounded-xl shadow-lg">
        <p className="text-md italic text-primary mb-4">{activePrompt}</p>
        <Textarea
          placeholder={getTranslation('myTripsJournalPlaceholder', 'Pour out your thoughts, memories, and reflections here...')}
          value={currentEntry}
          onChange={(e) => setCurrentEntry(e.target.value)}
          className="min-h-[200px] text-base bg-background border-border placeholder:text-muted-foreground focus:border-primary text-foreground mb-4"
        />
        <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" title={getTranslation('myTripsAddImage', 'Add Image')}>
              <ImagePlus className="h-5 w-5 text-muted-foreground hover:text-foreground" />
            </Button>
            <Button variant="ghost" size="icon" title={getTranslation('myTripsAddLocation', 'Add Location')}>
              <MapPin className="h-5 w-5 text-muted-foreground hover:text-foreground" />
            </Button>
            <Button variant="ghost" size="icon" title={getTranslation('myTripsAddMusic', 'Add Music/Soundtrack')}>
              <Music className="h-5 w-5 text-muted-foreground hover:text-foreground" />
            </Button>
            <Button variant="ghost" size="icon" title={getTranslation('myTripsAddVideo', 'Add Video')}>
              <Film className="h-5 w-5 text-muted-foreground hover:text-foreground" />
            </Button>
          </div>
          <Button onClick={handleSaveEntry} className="w-full sm:w-auto">
            <Edit3 className="h-5 w-5 mr-2" /> {getTranslation('myTripsSaveEntry', 'Save Entry')}
          </Button>
        </div>
      </div>

      {/* Past entries display */}
      <div className="mt-8">
        <h3 className="font-headline text-2xl font-semibold text-foreground mb-4">
          {getTranslation('myTripsPastEntries', 'Past Entries')}
        </h3>
        {pastEntriesData.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pastEntriesData.map((entry) => (
              <PastEntryCard key={entry.id} {...entry} />
            ))}
          </div>
        ) : (
          isStoryMode ? (
            <div className="text-center py-10 text-muted-foreground">
              <StoryIcon className="h-12 w-12 mx-auto mb-2 text-muted-foreground/50" />
              {getTranslation('myTripsStoryModeActive', 'Immersive story view coming soon.')}
            </div>
          ) : (
            <div className="text-center py-10 text-muted-foreground">
              <List className="h-12 w-12 mx-auto mb-2 text-muted-foreground/50" />
              {getTranslation('myTripsListViewActive', 'List of journal entries will appear here.')}
            </div>
          )
        )}
      </div>
    </div>
  );
}
