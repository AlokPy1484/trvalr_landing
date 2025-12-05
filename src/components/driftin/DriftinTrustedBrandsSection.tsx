// src/components/trusted-brands/DriftinTrustedBrandsSection.tsx

'use client';

import Image from 'next/image';
import { useLanguage } from '@/contexts/LanguageContext';

interface BrandLogoProps {
  nameKey: string;
  nameFallback: string;
  logoSrc: string;
  logoAltKey: string;
  logoAltFallback: string;
  aiHint: string;
}

const brands: BrandLogoProps[] = [
  {
    nameKey: 'brandBookingCom',
    nameFallback: 'Booking.com',
    logoSrc: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Booking.com_logo.svg/1024px-Booking.com_logo.svg.png',
    logoAltKey: 'brandBookingComLogoAlt',
    logoAltFallback: 'Booking.com Logo',
    aiHint: 'booking.com logo',
  },
  {
    nameKey: 'brandTripAdvisor',
    nameFallback: 'TripAdvisor',
    logoSrc: 'https://logos-world.net/wp-content/uploads/2020/11/Tripadvisor-Logo.png',
    logoAltKey: 'brandTripAdvisorLogoAlt',
    logoAltFallback: 'TripAdvisor Logo',
    aiHint: 'tripadvisor logo',
  },
  {
    nameKey: 'brandAirbnb',
    nameFallback: 'Airbnb',
    logoSrc: 'https://logos-world.net/wp-content/uploads/2020/07/Airbnb-Logo.png',
    logoAltKey: 'brandAirbnbLogoAlt',
    logoAltFallback: 'Airbnb Logo',
    aiHint: 'airbnb logo',
  },
  {
    nameKey: 'brandExpedia',
    nameFallback: 'Expedia',
    logoSrc: 'https://logos-world.net/wp-content/uploads/2021/02/Expedia-Logo.png',
    logoAltKey: 'brandExpediaLogoAlt',
    logoAltFallback: 'Expedia Logo',
    aiHint: 'expedia logo',
  },
];

export function DriftinTrustedBrandsSection() {
  const { getTranslation } = useLanguage();

  return (
    <section className="py-10 md:py-16 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="font-headline text-3xl sm:text-4xl font-bold text-foreground mb-4">
          {getTranslation('driftinTrustedBrandsTitle', 'Trusted by Leading Brands')}
        </h2>
        <p className="text-muted-foreground text-base md:text-lg mb-10 max-w-2xl mx-auto">
          {getTranslation('driftinTrustedBrandsSubtitle', 'Driftin partners with reputable companies to provide our community with exclusive benefits and a reliable experience.')}
        </p>

        <style jsx>{`
          @keyframes scroll-animation {
            from {
              transform: translateX(0);
            }
            to {
              transform: translateX(-50%);
            }
          }
          .scroll-container {
            animation: scroll-animation 25s linear infinite;
          }
          .group:hover .scroll-container {
            animation-play-state: paused;
          }
        `}</style>

        <div className="relative overflow-hidden w-full py-8 group">
          <div className="flex flex-nowrap scroll-container w-[200%] gap-x-24">
            {[...brands, ...brands, ...brands].map((brand, index) => (
              <div 
                key={`${brand.nameKey}-${index}`} 
                
                className="flex flex-col items-center flex-shrink-0 transition-transform duration-300 hover:scale-105"
                style={{ width: '150px' }}
              >
                {/* animation and transparency effects */}
                <div className="bg-card/40 backdrop-blur-lg border border-border/20 rounded-xl p-4 md:p-5 shadow-lg mb-4 w-36 h-36 md:w-48 md:h-48 flex items-center justify-center transition-all duration-300 hover:shadow-xl hover:border-border/30">
                  <Image
                    src={brand.logoSrc}
                    alt={getTranslation(brand.logoAltKey, brand.logoAltFallback)}
                    width={120}
                    height={100}
                    className="object-contain"
                    data-ai-hint={brand.aiHint}
                  />
                </div>
                <p className="text-base font-medium text-foreground">
                  {getTranslation(brand.nameKey, brand.nameFallback)}
                </p>
              </div>
            ))}
          </div>
          {/* Fades for seamless edges */}
          <div className="absolute top-0 left-0 bottom-0 w-16 bg-gradient-to-r from-background to-transparent pointer-events-none"></div>
          <div className="absolute top-0 right-0 bottom-0 w-16 bg-gradient-to-l from-background to-transparent pointer-events-none"></div>
        </div>
      </div>
    </section>
  );
}