'use client';

import React, { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { SubtleFooter } from '@/components/layout/SubtleFooter';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Crown, Star } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export function SubscriptionPageClient() {
  const { getTranslation } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);

  React.useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="flex flex-col min-h-screen w-full bg-gradient-to-br from-primary/10 via-background to-accent/10 text-foreground">
      <Header
        isScrolled={isScrolled}
        searchQuery={searchQuery}
        onSearchQueryChange={setSearchQuery}
        onSearchSubmit={() => {}}
        showCurrencySelector={false}
      />
      <main className="flex-grow p-4 sm:p-6 lg:p-8 z-10">
        <div className="container mx-auto max-w-4xl">
          <header className="text-center py-8 md:py-12">
             <Crown className="h-16 w-16 text-accent mx-auto mb-4" />
            <h1 className="font-headline text-4xl sm:text-5xl font-bold mb-4">
              {getTranslation('subscriptionPageTitle', 'Manage Subscription')}
            </h1>
            <p className="text-muted-foreground text-lg">
              {getTranslation('subscriptionPageSubtitle', 'View your current plan and explore other options.')}
            </p>
          </header>

          <div className="grid md:grid-cols-2 gap-8 items-start">
            
            {/* Current Plan Card */}
            <div className="bg-card/50 backdrop-blur-xl border-2 border-primary/50 rounded-2xl shadow-2xl p-8 space-y-6 text-center">
               <Badge variant="outline" className="border-primary text-primary bg-primary/10 font-semibold">CURRENT PLAN</Badge>
              <h2 className="text-3xl font-bold text-primary">Pro Plan</h2>
              <p className="text-5xl font-bold text-foreground">
                $10<span className="text-xl text-muted-foreground">/month</span>
              </p>
              <ul className="space-y-3 text-left text-muted-foreground">
                <li className="flex items-center"><CheckCircle className="h-5 w-5 mr-3 text-green-500" />Unlimited Trip Planning</li>
                <li className="flex items-center"><CheckCircle className="h-5 w-5 mr-3 text-green-500" />Advanced AI Features</li>
                <li className="flex items-center"><CheckCircle className="h-5 w-5 mr-3 text-green-500" />Priority Support</li>
                 <li className="flex items-center"><CheckCircle className="h-5 w-5 mr-3 text-green-500" />Exclusive Host Connections</li>
              </ul>
              <Button variant="outline" className="w-full">
                {getTranslation('cancelSubscriptionButton', 'Cancel Subscription')}
              </Button>
               <p className="text-xs text-muted-foreground">Your plan renews on August 15, 2024.</p>
            </div>

             {/* Free Plan Card */}
            <div className="bg-card/30 backdrop-blur-lg border border-border/20 rounded-2xl p-8 space-y-6 text-center transition hover:border-border/50 hover:shadow-xl">
              <Star className="h-8 w-8 mx-auto text-muted-foreground" />
              <h2 className="text-3xl font-semibold text-foreground">Free Plan</h2>
              <p className="text-5xl font-bold text-foreground">
                $0<span className="text-xl text-muted-foreground">/month</span>
              </p>
              <ul className="space-y-3 text-left text-muted-foreground">
                <li className="flex items-center"><CheckCircle className="h-5 w-5 mr-3 text-green-500" />3 Trip Plans per month</li>
                <li className="flex items-center"><CheckCircle className="h-5 w-5 mr-3 text-green-500" />Basic Itinerary Generation</li>
                <li className="flex items-center"><CheckCircle className="h-5 w-5 mr-3 text-green-500" />Community Access</li>
                <li className="flex items-center text-muted-foreground/70"><CheckCircle className="h-5 w-5 mr-3 text-muted-foreground/50" />Priority Support</li>
              </ul>
               <Button variant="secondary" className="w-full">
                {getTranslation('downgradeToFreeButton', 'Downgrade to Free')}
              </Button>
               <p className="text-xs text-muted-foreground">Switch to the free plan at any time.</p>
            </div>
            
          </div>

        </div>
      </main>
      <SubtleFooter />
    </div>
  );
}
