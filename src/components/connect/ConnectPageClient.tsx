'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { SubtleFooter } from '@/components/layout/SubtleFooter';
import { FloatingSearchBar } from './FloatingSearchBar';
import { FilterSidebar } from './FilterSidebar';
import { ProfileCard, type ProfileCardProps } from './ProfileCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plane, Compass, Globe } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const travelerProfiles: ProfileCardProps[] = [
    {
        id: 'emily-s',
        name: 'Emily Smith',
        avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=80&h=80&fit=crop',
        location: 'Global',
        rating: 4.9,
        bio: 'Wanderer and storyteller exploring cultures.',
        role: 'Traveler',
        stats: { value: '40+', label: 'Countries Visited' },
        aiHint: 'woman portrait smiling',
    },
    {
        id: 'phil-h',
        name: 'Phil Harrison',
        avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=80&h=80&fit=crop',
        location: 'On the road',
        rating: 4.8,
        bio: 'Chasing forgotten alleys and open skies.',
        role: 'Traveler',
        stats: { value: '37', label: 'Countries Visited' },
        aiHint: 'man portrait outdoor',
    },
    {
        id: 'maria-l',
        name: 'Maria L.',
        avatarUrl: 'https://images.unsplash.com/photo-1521146764736-56c929d59c83?q=80&w=80&h=80&fit=crop',
        location: 'South America',
        rating: 4.7,
        bio: 'Adventure seeker and mountain lover.',
        role: 'Traveler',
        stats: { value: '15', label: 'Countries Visited' },
        aiHint: 'woman adventure',
    },
    {
        id: 'alex-h',
        name: 'Alex H.',
        avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=80&h=80&fit=crop',
        location: 'Europe',
        rating: 4.9,
        bio: 'City explorer and coffee enthusiast.',
        role: 'Traveler',
        stats: { value: '25', label: 'Countries Visited' },
        aiHint: 'man portrait glasses',
    }
];

const hostProfiles: ProfileCardProps[] = [
    {
        id: 'chen-w',
        name: 'Chen W.',
        avatarUrl: 'https://images.unsplash.com/photo-1528892952291-009c663ce843?q=80&w=80&h=80&fit=crop',
        location: 'Bali, Indonesia',
        rating: 5.0,
        bio: 'Offering a peaceful villa stay surrounded by nature.',
        role: 'Host',
        stats: { value: '50+', label: 'Guests Hosted' },
        aiHint: 'man friendly smiling',
    },
    {
        id: 'isabella-r',
        name: 'Isabella Rossi',
        avatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=80&h=80&fit=crop',
        location: 'Tuscany, Italy',
        rating: 4.9,
        bio: 'Share my family\'s vineyard and farmhouse.',
        role: 'Host',
        stats: { value: '80+', label: 'Guests Hosted' },
        aiHint: 'woman dog',
    }
];

const companionProfiles: ProfileCardProps[] = [
    {
        id: 'natalie-b',
        name: 'Natalie',
        avatarUrl: 'https://images.unsplash.com/photo-1554151228-14d9def656e4?q=80&w=80&h=80&fit=crop',
        location: 'Barcelona, Spain',
        rating: 4.9,
        bio: "Let's find the best tapas and Gaudi's secrets.",
        role: 'Companion',
        stats: { value: '3+', label: 'Years Guiding' },
        aiHint: 'woman smiling outdoor',
    },
    {
        id: 'liam-k',
        name: 'Liam',
        avatarUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=80&h=80&fit=crop',
        location: 'Kyoto, Japan',
        rating: 4.8,
        bio: 'Your guide to tranquil temples and gardens.',
        role: 'Companion',
        stats: { value: '5+', label: 'Years Guiding' },
        aiHint: 'man city street',
    }
];

const profileLinks: Record<string, string> = {
    'emily-s': '/profile/emily-smith',
    'phil-h': '/profile/phil-harrison',
    'maria-l': '/profile/maria-l',
    'alex-h': '/profile/alex-h',
    'chen-w': '/profile/chen-w',
    'isabella-r': '/profile/isabella-r',
    'natalie-b': '/profile/natalie-b',
    'liam-k': '/profile/liam-k',
};

const SCROLL_THRESHOLD = 50;

export function ConnectPageClient() {
    const { getTranslation } = useLanguage();
    const [searchQuery, setSearchQuery] = useState('');
    const [isScrolled, setIsScrolled] = useState(false);

    const handleScroll = useCallback(() => {
        const currentScrollY = window.scrollY;
        setIsScrolled(currentScrollY > SCROLL_THRESHOLD);
    }, []);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, [handleScroll]);

    const handleHeaderSearchSubmit = () => {
        console.log('Search submitted:', searchQuery);
    };

    const renderProfileList = (profiles: ProfileCardProps[]) => {
        return profiles.map((p, index) => {
            const href = profileLinks[p.id];
            const card = <ProfileCard {...p} animationDelay={index * 100} />;
            
            return href ? (
                <Link key={p.id} href={href} className="cursor-pointer block h-full">
                    {card}
                </Link>
            ) : (
                <div key={p.id}>{card}</div>
            );
        });
    };

    return (
        <div className="relative flex flex-col min-h-screen bg-gradient-to-br from-primary/10 via-background to-accent/10 text-foreground overflow-hidden">
            {/* animation */}
            <style jsx>{`
                .animated-gradient {
                  background: linear-gradient(
                    120deg, 
                    rgba(59, 130, 246, 0.1),
                    rgba(52, 211, 153, 0.15),
                    rgba(59, 130, 246, 0.1)
                  );
                  background-size: 300% 300%;
                  animation: animate-flow 8s ease-in-out infinite;
                }
                @keyframes animate-flow {
                  0% { background-position: 0% 50%; }
                  50% { background-position: 100% 50%; }
                  100% { background-position: 0% 50%; }
                }
            `}</style>
            <div className="absolute inset-0 animated-gradient z-[-10]"></div>

            <Header
                isScrolled={isScrolled}
                searchQuery={searchQuery}
                onSearchQueryChange={setSearchQuery}
                onSearchSubmit={handleHeaderSearchSubmit}
                showCurrencySelector={false}
            />
            <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8 relative">
                <Plane className="absolute top-16 right-10 h-24 w-24 text-primary/10 rotate-12 -z-10 animate-pulse" />
                <Compass className="absolute bottom-1/4 left-5 h-20 w-20 text-accent/10 -rotate-12 -z-10 animate-pulse delay-500" />
                
                <section className="text-center mb-8 relative z-10">
                    <div className="inline-block p-4 bg-card/30 backdrop-blur-sm rounded-full mb-4">
                        <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
                           <Globe className="h-8 w-8 text-primary" />
                        </div>
                    </div>
                    <h1 className="font-headline text-4xl sm:text-5xl md:text-6xl font-bold mb-4">
                        Find Your People
                    </h1>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                        Connect with hosts, fellow travelers, and local companions to make your journey unforgettable.
                    </p>
                </section>
                
                <FloatingSearchBar />

                <div className="grid lg:grid-cols-4 gap-8 mt-12">
                    <div className="lg:col-span-1">
                        <FilterSidebar />
                    </div>
                    <div className="lg:col-span-3">
                        <Tabs defaultValue="travelers" className="w-full">
                            <TabsList className="grid w-full grid-cols-3 bg-muted/50 p-1 rounded-lg mb-6">
                                <TabsTrigger value="travelers">Travelers</TabsTrigger>
                                <TabsTrigger value="hosts">Hosts</TabsTrigger>
                                <TabsTrigger value="companions">Companions</TabsTrigger>
                            </TabsList>
                            <TabsContent value="travelers" className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {renderProfileList(travelerProfiles)}
                            </TabsContent>
                            <TabsContent value="hosts" className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {renderProfileList(hostProfiles)}
                            </TabsContent>
                            <TabsContent value="companions" className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {renderProfileList(companionProfiles)}
                            </TabsContent>
                        </Tabs>
                    </div>
                </div>
            </main>
            <SubtleFooter />
        </div>
    );
}