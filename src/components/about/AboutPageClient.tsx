'use client';

import React from 'react';
import Image from 'next/image';
import { Header } from '@/components/layout/Header';
import { SubtleFooter } from '@/components/layout/SubtleFooter';
import { Lightbulb, Users } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export function AboutPageClient() {
  const { getTranslation } = useLanguage();
  const [searchQuery, setSearchQuery] = React.useState('');
  const [isScrolled, setIsScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="flex flex-col min-h-screen w-full bg-gradient-to-br from-primary/10 via-background to-accent/10 text-foreground overflow-x-hidden">
      <Header
        isScrolled={isScrolled}
        searchQuery={searchQuery}
        onSearchQueryChange={setSearchQuery}
        onSearchSubmit={() => {}}
        showCurrencySelector={false}
      />
      <main className="flex-grow p-4 sm:p-6 lg:p-8 z-10">
        <div className="container mx-auto">
          {/* Hero Section */}
          <section className="text-center py-12 md:py-20">
            <div className="flex justify-center mb-4">
              <Image
                src="/Trvlar logo color.svg"
                alt="Trvalr Logo"
                width={300}
                height={89}
                className="h-auto w-auto max-w-[300px]"
              />
            </div>
            <h1 className="font-headline text-4xl sm:text-5xl md:text-6xl font-bold mb-4">
              About us
            </h1>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
              We believe travel is about more than just visiting new places; it’s about creating unforgettable experiences and meaningful connections. trvalr was born from a passion for exploration and a desire to make travel planning seamless, personal, and inspiring for everyone.
            </p>
          </section>

          {/* Mission & Vision Section */}
          <section className="py-12 md:py-20 grid md:grid-cols-2 gap-12 items-center">
            <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=1200&h=800&fit=crop"
                alt="Travelers looking at a map"
                fill
                className="object-cover transition-transform duration-500 hover:scale-105"
                data-ai-hint="travelers map"
              />
            </div>
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-card/50 rounded-full text-primary">
                  <Lightbulb className="h-6 w-6" />
                </div>
                <div>
                  <h2 className="font-headline text-2xl font-semibold mb-2">Our Mission</h2>
                  <p className="text-muted-foreground">
                    To empower travelers by transforming complex trip planning into an intuitive, AI-driven conversation. We aim to unlock the world’s hidden gems and make every journey uniquely yours.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="p-3 bg-card/50 rounded-full text-accent">
                   <Users className="h-6 w-6" />
                </div>
                <div>
                  <h2 className="font-headline text-2xl font-semibold mb-2">Our Vision</h2>
                  <p className="text-muted-foreground">
                    To build a global community of curious explorers, connected by shared experiences and a passion for discovering the world. We envision a future where travel is smarter, more sustainable, and accessible to all.
                  </p>
                </div>
              </div>
            </div>
          </section>

        </div>
      </main>
      <SubtleFooter />
    </div>
  );
}
