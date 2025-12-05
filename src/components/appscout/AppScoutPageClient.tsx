
'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/layout/Header';
import { SubtleFooter } from '@/components/layout/SubtleFooter';
import { Rocket, Edit, ListPlus, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import type { AppCategory, App, ApiResponse, ApiApp, ApiCategory } from './types';
import { AppCategoryTabs } from './AppCategoryTabs';
import { AppCard } from './AppCard';
import { AppFilterButtons } from './AppFilterButtons';
import { CityAutocomplete } from './CityAutocomplete';
import { isAppBlacklisted } from './appBlacklist';
import axios from 'axios';

// Category mapping from API to internal types
const categoryMapping: Record<string, AppCategory> = {
  'Ride-hailing': 'rideHailing',
  'Food Delivery': 'foodDelivery',
  'Public Transit': 'publicTransit',
  'Payments': 'payments',
  'Events': 'events',
};

// Function to transform API response to App[]
const transformApiResponse = (apiResponse: ApiResponse): App[] => {
  const apps: App[] = [];
  
  apiResponse.categories.forEach((categoryData: ApiCategory) => {
    const category = categoryMapping[categoryData.category] || 'rideHailing';
    
    categoryData.apps.forEach((apiApp: ApiApp, index: number) => {
      // Skip blacklisted apps
      if (isAppBlacklisted(apiApp.name)) {
        return;
      }
      
      const platforms: ('iOS' | 'Android')[] = [];
      if (apiApp.android?.url) platforms.push('Android');
      if (apiApp.ios?.url && apiApp.ios.available !== false) platforms.push('iOS');
      
      // Use icon from either platform
      const logoUrl = apiApp.android?.icon || apiApp.ios?.icon || 'https://placehold.co/64x64/2dd4bf/ffffff/png?text=' + apiApp.name.charAt(0);
      
      // Generate badges based on score and availability
      const badges: string[] = [];
      if (apiApp.score >= 4.7) badges.push('Highly Rated');
      if (platforms.length === 2) badges.push('Available Everywhere');
      
      // Generate tags
      const tags: string[] = [];
      if (apiApp.score >= 4.7) tags.push('highly-rated');
      
      // Clean summary (remove HTML tags and get first sentence)
      let cleanDescription = apiApp.summary
        // Remove HTML tags
        .replace(/<[^>]*>/g, ' ')
        // Decode HTML entities
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
        .replace(/&nbsp;/g, ' ')
        // Clean up whitespace
        .replace(/\s+/g, ' ')
        .trim();
      
      // Extract first sentence (ending with . ! or ?)
      const firstSentenceMatch = cleanDescription.match(/^[^.!?]+[.!?]/);
      if (firstSentenceMatch) {
        cleanDescription = firstSentenceMatch[0].trim();
      } else {
        // If no sentence ending found, take first 120 characters
        cleanDescription = cleanDescription.substring(0, 120) + '...';
      }
      
      apps.push({
        id: `${apiApp.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}-${index}`,
        name: apiApp.name,
        logoUrl,
        logoAiHint: `${apiApp.name} logo`,
        description: cleanDescription,
        badges,
        rating: Math.round(apiApp.score * 100) / 100, // Round to 2 decimal places
        platforms,
        category,
        tags,
        androidUrl: apiApp.android?.url || null,
        iosUrl: apiApp.ios?.url || null,
      });
    });
  });
  
  return apps;
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
};

function AppScoutPageComponent() {
  const searchParams = useSearchParams();
  const [headerSearchQuery, setHeaderSearchQuery] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  
  // State for AppScout feature
  const [activeCategory, setActiveCategory] = useState<AppCategory>('rideHailing');
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [destinationSearch, setDestinationSearch] = useState('');
  const [isValidCity, setIsValidCity] = useState(true);

  const [currentCity, setCurrentCity] = useState("Paris");
  const [currentFlag, setCurrentFlag] = useState("🇫🇷");
  const [countryCode, setCountryCode] = useState("fr");
  
  // API state
  const [allApps, setAllApps] = useState<App[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchingCity, setSearchingCity] = useState<string>("");

  // Fetch apps from API
  const fetchApps = async (location: string, countryCode?: string) => {
    setIsLoading(true);
    setError(null);
    setSearchingCity(location);
    
    try {
      const params: { location: string; countryCode?: string } = { location };
      if (countryCode) {
        params.countryCode = countryCode;
      }
      
      const response = await axios.get<ApiResponse>(
        `https://journi-api-concept.onrender.com/appscout/search`,
        { params }
      );
      
      if (response.data.status === 'SUCCESS') {
        const transformedApps = transformApiResponse(response.data);
        setAllApps(transformedApps);
        setCurrentCity(response.data.location);
        setCountryCode(response.data.countryCode);
        
        // Set flag based on country code
        const flagEmoji = getFlagEmoji(response.data.countryCode);
        setCurrentFlag(flagEmoji);
      } else {
        setError('Failed to fetch apps');
      }
    } catch (err) {
      console.error('Error fetching apps:', err);
      setError('Failed to load apps. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Get flag emoji from country code
  const getFlagEmoji = (countryCode: string): string => {
    const codePoints = countryCode
      .toUpperCase()
      .split('')
      .map(char => 127397 + char.charCodeAt(0));
    return String.fromCodePoint(...codePoints);
  };
  
  useEffect(() => {
    const destinationFromURL = searchParams.get('destination');
    if (destinationFromURL) {
      const decodedDestination = decodeURIComponent(destinationFromURL);
      setDestinationSearch(decodedDestination);
      setIsValidCity(true); // Assume URL parameter is valid
      fetchApps(decodedDestination);
    } else {
      // Default to Paris
      setDestinationSearch('Paris');
      setIsValidCity(true);
      fetchApps('Paris');
    }
  }, [searchParams]);

  React.useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleHeaderSearchSubmit = () => {
    console.log('Header search submitted on AppScout page:', headerSearchQuery);
  };
  
  const handleDestinationSearch = () => {
    if (destinationSearch.trim() && isValidCity) {
      // Country code will be fetched by the autocomplete component
      fetchApps(destinationSearch);
    }
  };

  const handleCitySelect = (location: string, countryCode: string, isValid: boolean) => {
    setIsValidCity(isValid);
    if (isValid && location.trim()) {
      fetchApps(location, countryCode);
    }
  };

  const filteredApps = useMemo(() => {
    let filtered = [...allApps];
    
    // Filter by active category
    filtered = filtered.filter(app => app.category === activeCategory);

    // Filter by active tags (Essentials, Offline, etc.)
    if (activeFilters.length > 0) {
        filtered = filtered.filter(app => 
            activeFilters.every(filterId => {
                if (filterId === 'highly-rated') return app.rating >= 4.7;
                if (filterId === 'free') return app.tags.includes('free');
                if (filterId === 'offline') return app.tags.includes('offline');
                if (filterId === 'essentials') return app.tags.includes('essentials');
                return true;
            })
        );
    }
    
    // Limit to 4 apps per category
    return filtered.slice(0, 4);
  }, [allApps, activeCategory, activeFilters]);

  const toggleFilter = (filter: string) => {
    setActiveFilters(prev => 
      prev.includes(filter) 
        ? prev.filter(f => f !== filter) 
        : [...prev, filter]
    );
  };

  return (
    <div className="flex flex-col min-h-screen w-full bg-gradient-to-br from-primary/10 via-background to-accent/10 text-foreground">
      <Header
        isScrolled={isScrolled}
        searchQuery={headerSearchQuery}
        onSearchQueryChange={setHeaderSearchQuery}
        onSearchSubmit={handleHeaderSearchSubmit}
        showCurrencySelector={false}
      />
      <main className="flex-grow p-4 sm:p-6 lg:p-8 z-10">
        <motion.div
            className="container mx-auto max-w-6xl"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
          {/* Section 1: Header + Context Block */}
          <motion.section variants={itemVariants} className="text-center mb-10 md:mb-12">
            <Rocket className="h-16 w-16 text-primary mx-auto mb-4" />
            <h1 className="font-headline text-4xl sm:text-5xl md:text-6xl font-bold mb-4">
              Land like a local
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Get the must-have apps for wherever you're going—before you even board.
            </p>
          </motion.section>

          {/* Section 3: Search + Filter Tool */}
          <motion.section variants={itemVariants} className="mb-8">
            <div className="max-w-xl mx-auto">
                <div className="relative flex gap-2">
                    <div className="flex-1">
                        <CityAutocomplete
                        value={destinationSearch}
                            onChange={setDestinationSearch}
                            onSelect={handleCitySelect}
                            onValidationChange={setIsValidCity}
                            disabled={isLoading}
                        />
                    </div>
                    <Button 
                        onClick={handleDestinationSearch}
                        disabled={isLoading || !destinationSearch.trim() || !isValidCity}
                        className="h-12 px-6 rounded-full"
                        title={!isValidCity && destinationSearch ? "Please select a valid city or country" : ""}
                    >
                        {isLoading ? (
                            <Loader2 className="h-5 w-5 animate-spin" />
                        ) : (
                            'Search'
                        )}
                    </Button>
                </div>
                 <AppFilterButtons activeFilters={activeFilters} onToggleFilter={toggleFilter} />
            </div>
          </motion.section>


          {/* Section 2: Interactive Local Apps Dashboard */}
          <motion.section variants={itemVariants}>
            <AppCategoryTabs activeCategory={activeCategory} onSelectCategory={setActiveCategory} />

            {isLoading ? (
              <div className="mt-8 flex flex-col items-center justify-center py-20 text-center">
                <Loader2 className="h-12 w-12 text-primary animate-spin mb-4" />
                <p className="text-muted-foreground text-lg">Loading apps for {searchingCity}...</p>
              </div>
            ) : error ? (
              <div className="mt-8 flex flex-col items-center justify-center py-20 text-center">
                <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-6 max-w-md">
                  <p className="text-destructive font-semibold mb-2">Error</p>
                  <p className="text-muted-foreground">{error}</p>
                  <Button 
                    onClick={() => fetchApps(destinationSearch || 'Paris')} 
                    className="mt-4"
                    variant="outline"
                  >
                    Try Again
                  </Button>
                </div>
              </div>
            ) : (
            <AnimatePresence>
                <motion.div 
                    key={activeCategory + activeFilters.join('-') + currentCity} // Re-trigger animation on category or filter change
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                >
                  {filteredApps.length > 0 ? (
                      filteredApps.map((app, index) => (
                        <AppCard key={app.id} app={app} index={index} />
                      ))
                  ) : (
                      <div className="col-span-full text-center py-12 text-muted-foreground">
                          <p>No apps found for this category and filter combination.</p>
                          <p className="text-sm mt-2">Try selecting a different category or removing filters.</p>
                      </div>
                  )}
                </motion.div>
            </AnimatePresence>
            )}
          </motion.section>
            
          {/* Section 4: Export (Placeholder) */}
          {/* <motion.section variants={itemVariants} className="mt-12 text-center">
             <Button>
                <ListPlus className="h-4 w-4 mr-2" />
                Add All Essentials to Trip
             </Button>
          </motion.section> */}

        </motion.div>
      </main>
      <SubtleFooter />
    </div>
  );
}

export function AppScoutPageClient() {
    return (
        // Suspense boundary is required for useSearchParams to work during initial render
        <React.Suspense fallback={<div>Loading...</div>}>
            <AppScoutPageComponent />
        </React.Suspense>
    );
}

