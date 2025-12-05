
'use client';

import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, CalendarDays, Globe, Smile, Sparkles, SlidersHorizontal } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface MyTripsTopBarProps {
  onSearch: (query: string) => void;
}

export function MyTripsTopBar({ onSearch }: MyTripsTopBarProps) {
  const { getTranslation } = useLanguage();
  const [searchQuery, setSearchQuery] = React.useState('');

  const handleSearch = () => {
    onSearch(searchQuery);
  };

  return (
    <div className="p-4 border-b border-border bg-background/95 backdrop-blur-lg sticky top-0 z-10">
      <div className="flex flex-col sm:flex-row items-center gap-3">
        <div className="relative flex-grow w-full sm:w-auto">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="search"
            placeholder={getTranslation('myTripsSearchPlaceholder', 'Find your lost skies...')}
            className="pl-10 pr-4 py-2 h-10 rounded-lg border-border bg-background focus:border-primary text-sm w-full text-foreground placeholder:text-muted-foreground"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          />
        </div>
        <div className="flex items-center gap-2 flex-wrap justify-center sm:justify-start">
          <Button variant="outline" size="sm" className="h-9 text-xs">
            <CalendarDays className="h-4 w-4 mr-1.5" /> {getTranslation('filterDate', 'Date')}
          </Button>
          <Button variant="outline" size="sm" className="h-9 text-xs">
            <Globe className="h-4 w-4 mr-1.5" /> {getTranslation('filterCountry', 'Country')}
          </Button>
          <Button variant="outline" size="sm" className="h-9 text-xs">
            <Smile className="h-4 w-4 mr-1.5" /> {getTranslation('filterMoodRelax', 'Relax')}
          </Button>
           <Button variant="outline" size="icon" className="h-9 w-9">
             <SlidersHorizontal className="h-4 w-4" />
             <span className="sr-only">{getTranslation('filterMore', 'More Filters')}</span>
           </Button>
        </div>
      </div>
    </div>
  );
}
