'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { Users, UserPlus } from 'lucide-react';

export function CompanionsCallToActionSection() {
  const { getTranslation } = useLanguage();

  return (
    <section className="bg-background py-20 md:py-28">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto flex flex-col items-center text-center">

          {/* Glowing Icon */}
          <div className="relative mb-6">
            {/* Glow effect */}
            <div className="absolute inset-0 bg-primary/60 rounded-full blur-2xl animate-pulse"></div>
            {/* The Icon */}
            <div className="relative h-16 w-16 flex items-center justify-center rounded-full bg-primary/10 border border-primary/20">
              <Users className="h-8 w-8 text-primary" />
            </div>
          </div>

          <h2 className="font-headline text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            {getTranslation('companionsCTATitle', 'Ready to Explore with a Local?')}
          </h2>

          <p className="text-muted-foreground md:text-lg mb-8">
            {getTranslation('companionsCTASubtitle', 'Your unforgettable journey, enriched by local wisdom and genuine connection, is just a click away.')}
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button
              asChild
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-md transition-all shadow-lg shadow-primary/20 hover:shadow-primary/40"
            >
              <Link href="/connect">
                {getTranslation('companionsCTAButtonFindCompanion', 'Find Your Local Companion Today')}
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="text-primary border-primary hover:bg-primary/10 rounded-md transition-all"
            >
              <Link href="/become-a-companion">
                <UserPlus className="mr-2 h-5 w-5" />
                {getTranslation('companionsCTAButtonBecomeCompanion', 'Become a Companion')}
              </Link>
            </Button>
          </div>
          
        </div>
      </div>
    </section>
  );
}