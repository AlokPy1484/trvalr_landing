
'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Home, Compass, Circle, Bell, UserCircle2 } from 'lucide-react'; // UserCircle2 for profile
import { cn } from '@/lib/utils';
import { useLanguage } from '@/contexts/LanguageContext';

export function OrbitBottomNav() {
  const { getTranslation } = useLanguage();
  const [activeTab, setActiveTab] = React.useState('home');

  const navItems = [
    { id: 'home', labelKey: 'orbitBottomNavHome', fallback: 'Home', icon: Home },
    { id: 'explore', labelKey: 'orbitBottomNavExplore', fallback: 'Explore', icon: Compass },
    { id: 'post', labelKey: 'orbitBottomNavPost', fallback: 'Post', icon: Circle }, // Simple circle for post
    { id: 'notifications', labelKey: 'orbitBottomNavNotifications', fallback: 'Notifications', icon: Bell },
    { id: 'profile', labelKey: 'orbitBottomNavProfile', fallback: 'Profile', icon: UserCircle2 },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg border-t border-neutral-200/80 dark:border-slate-700/80 px-2 py-2.5 md:hidden">
      <div className="flex justify-around items-center">
        {navItems.map(item => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <Button
              key={item.id}
              variant="ghost"
              className={cn(
                "flex flex-col items-center h-auto p-1 rounded-md",
                isActive ? "text-teal-500 dark:text-teal-400" : "text-neutral-500 dark:text-neutral-400 hover:text-teal-500 dark:hover:text-teal-400"
              )}
              onClick={() => setActiveTab(item.id)}
            >
              <Icon className={cn("h-5 w-5", isActive && "fill-teal-500/20 dark:fill-teal-400/20")} />
              <span className="text-[10px] mt-0.5">{getTranslation(item.labelKey, item.fallback)}</span>
            </Button>
          );
        })}
      </div>
    </nav>
  );
}
