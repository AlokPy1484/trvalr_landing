
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Search, Globe, Plus, MessageSquare } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/contexts/LanguageContext';
import { SheetTrigger } from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface OrbitHeaderProps {
  activeTab: string;
  onNavClick: (tabId: string) => void;
  currentUserAvatarUrl?: string;
  currentUserProfilePath?: string;
}

export function OrbitHeader({
  activeTab,
  onNavClick,
  currentUserAvatarUrl,
  currentUserProfilePath,
}: OrbitHeaderProps) {
  const { getTranslation } = useLanguage();
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const handleNavClick = (tabId: string) => {
    onNavClick(tabId);
    if (tabId === 'connect') {
      console.log('Connect clicked: Should show global friend recommendations.');
    } else if (tabId === 'explore') {
      console.log('Explore clicked: Should show abstract view of posts, videos, and images.');
    }
  };

  const navItems = [
    { id: 'home', labelKey: 'orbitNavHome', fallback: 'Home' },
    { id: 'connect', labelKey: 'orbitNavConnect', fallback: 'Connect' },
    { id: 'explore', labelKey: 'orbitNavExplore', fallback: 'Explore' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-md px-4 py-3 shadow-sm border-b border-neutral-200/80 dark:border-slate-700/80">
      <div className="relative flex items-center justify-between">
        {/* Left Side: Logo and Search */}
        <div className="flex items-center space-x-2 md:space-x-3">
          <Link href="/" className="flex items-center space-x-2">
            <Globe className="h-7 w-7 text-teal-500 dark:text-teal-400" />
            <span className="hidden sm:inline text-2xl font-bold text-neutral-800 dark:text-neutral-100 font-headline">Orbit</span>
          </Link>

          {/* Current User Profile Button */}
          {currentUserAvatarUrl && currentUserProfilePath && (
            <Link href={currentUserProfilePath} aria-label="Your Profile">
              <Avatar className="h-8 w-8 cursor-pointer border-2 border-transparent hover:border-teal-400 transition-all">
                <AvatarImage src={currentUserAvatarUrl} alt="Your profile" />
                <AvatarFallback>P</AvatarFallback>
              </Avatar>
            </Link>
          )}

          <div className="hidden md:flex items-center">
            {isSearchOpen ? (
              <div className="animate-in fade-in slide-in-from-left-4 duration-300">
                <div className="rounded-full p-[1.5px] bg-gradient-to-r from-teal-400 via-sky-400 to-rose-400">
                  <Input
                    type="search"
                    placeholder={getTranslation('search', 'Search') + '...'}
                    className="h-8 w-48 bg-white dark:bg-slate-800 border-none rounded-full placeholder:text-neutral-500/70 dark:placeholder:text-neutral-400/70 text-sm text-neutral-800 dark:text-neutral-200 focus-visible:ring-0 focus-visible:ring-offset-0 transition-all"
                    autoFocus
                    onBlur={() => setIsSearchOpen(false)}
                  />
                </div>
              </div>
            ) : (
              <Button
                variant="ghost"
                size="icon"
                className="text-neutral-500 dark:text-neutral-400 hover:text-teal-600 dark:hover:text-teal-400 hover:bg-teal-500/10 dark:hover:bg-teal-400/10 rounded-full"
                onClick={() => setIsSearchOpen(true)}
              >
                <Search className="h-5 w-5" />
                <span className="sr-only">{getTranslation('search', 'Search')}</span>
              </Button>
            )}
          </div>
        </div>

        {/* Center Navigation (Desktop) - Absolutely positioned */}
        <nav className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center space-x-2 bg-neutral-100/50 dark:bg-slate-800/50 backdrop-blur-sm p-1 rounded-full">
          {navItems.map(item => (
            <Button
              key={item.id}
              variant="ghost"
              className={cn(
                "px-4 py-1.5 text-sm rounded-full h-auto",
                activeTab === item.id ? "bg-white dark:bg-slate-700 text-neutral-800 dark:text-neutral-100 shadow-sm" : "text-neutral-500 dark:text-neutral-400 hover:bg-white/70 dark:hover:bg-slate-700/80 hover:text-neutral-800 dark:hover:text-neutral-100"
              )}
              onClick={() => handleNavClick(item.id)}
            >
              {getTranslation(item.labelKey, item.fallback)}
            </Button>
          ))}
        </nav>

        {/* Right Side: Actions */}
        <div className="flex items-center justify-end space-x-2">
           {/* Mobile search button - kept separate for mobile-specific interactions */}
           <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-neutral-500 dark:text-neutral-400 hover:text-teal-600 dark:hover:text-teal-400 hover:bg-teal-500/10 dark:hover:bg-teal-400/10 rounded-full"
              onClick={() => console.log('Mobile search TBD')}
            >
              <Search className="h-5 w-5" />
              <span className="sr-only">{getTranslation('search', 'Search')}</span>
            </Button>
          <Button variant="default" size="icon" className="bg-teal-500 hover:bg-teal-600 dark:bg-teal-600 dark:hover:bg-teal-500 text-white rounded-full">
            <Plus className="h-5 w-5" />
            <span className="sr-only">{getTranslation('orbitNavAddPost', 'Add Post')}</span>
          </Button>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="text-neutral-500 dark:text-neutral-400 hover:text-teal-600 dark:hover:text-teal-400 hover:bg-teal-500/10 dark:hover:bg-teal-400/10 rounded-full">
              <MessageSquare className="h-5 w-5" />
              <span className="sr-only">{getTranslation('orbitNavMessages', 'Messages')}</span>
            </Button>
          </SheetTrigger>
        </div>
      </div>
    </header>
  );
}
