
'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Home, Search, Route, User, MessageSquare, ChevronLeft, CalendarDays, BedDouble, Send, Compass, Users as GroupIcon, Edit3, MapPin as DestinationPin } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
  SheetDescription,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ProfileMessengerSidebar } from './ProfileMessengerSidebar';
import { GlassyModal } from './modals/GlassyModal';
import { HostEmilyModalContent } from './modals/HostEmilyModalContent';
import { InviteEmilyModalContent } from './modals/InviteEmilyModalContent';

export function ProfileStickyFooter() {
  const { getTranslation } = useLanguage();
  const router = useRouter();
  const [isMessengerOpen, setIsMessengerOpen] = useState(false);
  const [isHostModalOpen, setIsHostModalOpen] = useState(false);
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);

  const navItems = [
    { id: 'home', href: '/', labelKey: 'footerNavHome', fallbackLabel: 'Home', icon: Home, isTrigger: false },
    { id: 'messages', labelKey: 'footerNavMessages', fallbackLabel: 'Messages', icon: MessageSquare, isTrigger: true },
    { id: 'explore', href: '/explore', labelKey: 'footerNavExplore', fallbackLabel: 'Explore', icon: Search, isTrigger: false },
    { id: 'trails', href: '/trails', labelKey: 'footerNavTrails', fallbackLabel: 'Trails', icon: Route, isTrigger: false },
    { id: 'profile', href: '/profile/emily-smith', labelKey: 'footerNavProfile', fallbackLabel: 'Profile', icon: User, isTrigger: false },
    { id: 'goBack', onClick: () => router.back(), labelKey: 'footerNavGoBack', fallbackLabel: 'Go Back', icon: ChevronLeft, isTrigger: false, isButton: true },
  ];

  return (
    <>
      <footer className="fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-neutral-800 border-t border-neutral-200 dark:border-neutral-700 shadow-top-soft">
        <Sheet open={isMessengerOpen} onOpenChange={setIsMessengerOpen}>
          <div className="container mx-auto px-4 sm:px-6 py-3">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="hidden sm:flex items-center space-x-3">
                <Button
                  variant="outline"
                  className="rounded-full border-primary text-primary hover:bg-primary/10"
                  onClick={() => setIsHostModalOpen(true)}
                >
                  {getTranslation('hostEmilyButton', 'Host Emily')}
                </Button>
                <Button
                  className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90"
                  onClick={() => setIsInviteModalOpen(true)}
                >
                  {getTranslation('inviteEmilyAdventureButton', 'Invite Emily to next adventure')}
                </Button>
              </div>

              <nav className="flex items-center justify-around sm:justify-center w-full sm:w-auto space-x-3 sm:space-x-4">
                {navItems.map((item) =>
                  item.isTrigger ? (
                    <SheetTrigger asChild key={item.id}>
                      <button
                        aria-label={getTranslation(item.labelKey, item.fallbackLabel)}
                        className="flex flex-col items-center text-neutral-500 dark:text-neutral-400 hover:text-primary dark:hover:text-amber-400 transition-colors group"
                      >
                        <item.icon className="h-6 w-6 mb-0.5 group-hover:scale-110 transition-transform" />
                        <span className="text-xs sr-only">{getTranslation(item.labelKey, item.fallbackLabel)}</span>
                      </button>
                    </SheetTrigger>
                  ) : item.isButton ? (
                     <button
                      key={item.id}
                      onClick={item.onClick}
                      aria-label={getTranslation(item.labelKey, item.fallbackLabel)}
                      className="flex flex-col items-center text-neutral-500 dark:text-neutral-400 hover:text-primary dark:hover:text-amber-400 transition-colors group"
                    >
                      <item.icon className="h-6 w-6 mb-0.5 group-hover:scale-110 transition-transform" />
                      <span className="text-xs sr-only">{getTranslation(item.labelKey, item.fallbackLabel)}</span>
                    </button>
                  ) : (
                    <Link
                      key={item.id}
                      href={item.href || '#'}
                      aria-label={getTranslation(item.labelKey, item.fallbackLabel)}
                      className="flex flex-col items-center text-neutral-500 dark:text-neutral-400 hover:text-primary dark:hover:text-amber-400 transition-colors group"
                    >
                      <item.icon className="h-6 w-6 mb-0.5 group-hover:scale-110 transition-transform" />
                      <span className="text-xs sr-only">{getTranslation(item.labelKey, item.fallbackLabel)}</span>
                    </Link>
                  )
                )}
              </nav>

              <div className="flex sm:hidden items-center space-x-3 w-full pt-3 border-t border-neutral-200 dark:border-neutral-700 mt-3">
                <Button
                  variant="outline"
                  className="rounded-full border-primary text-primary hover:bg-primary/10 flex-1"
                  onClick={() => setIsHostModalOpen(true)}
                  size="sm"
                >
                  {getTranslation('hostEmilyButton', 'Host Emily')}
                </Button>
                <Button
                  className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90 flex-1"
                  onClick={() => setIsInviteModalOpen(true)}
                  size="sm"
                >
                  {getTranslation('inviteEmilyAdventureButtonShort', 'Invite to Adventure')}
                </Button>
              </div>
            </div>
          </div>
          <SheetContent className="w-[360px] sm:w-[400px] p-0 flex flex-col">
            <SheetHeader className="p-4 border-b">
              <SheetTitle>{getTranslation('messengerSidebarTitle', 'Messages')}</SheetTitle>
              <SheetDescription>
                {getTranslation('messengerSidebarDescription', 'Your recent conversations.')}
              </SheetDescription>
            </SheetHeader>
            <ProfileMessengerSidebar />
            <SheetClose className="sr-only">Close</SheetClose>
          </SheetContent>
        </Sheet>
      </footer>

      <GlassyModal
        isOpen={isHostModalOpen}
        onClose={() => setIsHostModalOpen(false)}
        title={getTranslation('hostEmilyModalTitle', 'Open Your Doors to Emily')}
      >
        <HostEmilyModalContent onClose={() => setIsHostModalOpen(false)} />
      </GlassyModal>

      <GlassyModal
        isOpen={isInviteModalOpen}
        onClose={() => setIsInviteModalOpen(false)}
        title={getTranslation('inviteEmilyModalTitle', 'Take Emily Along the Journey')}
      >
        <InviteEmilyModalContent onClose={() => setIsInviteModalOpen(false)} />
      </GlassyModal>
    </>
  );
}
