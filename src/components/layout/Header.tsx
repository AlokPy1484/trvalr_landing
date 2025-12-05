
'use client';

import Link from 'next/link';
import React from 'react';
import { Button } from '@/components/ui/button';
import { User, Globe, Menu, Mic, SendHorizontal, Coins, BookOpen, Map, Bookmark } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { useLanguage, type Language } from '@/contexts/LanguageContext';
import { useCurrency, type Currency } from '@/contexts/CurrencyContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";

interface HeaderProps {
  isScrolled: boolean;
  searchQuery: string;
  onSearchQueryChange: (query: string) => void;
  onSearchSubmit: () => void;
  showCurrencySelector?: boolean;
}

export function Header({
  isScrolled,
  searchQuery,
  onSearchQueryChange,
  onSearchSubmit,
  showCurrencySelector = false,
}: HeaderProps) {
  const { availableLanguages, selectedLanguage, setSelectedLanguage, getTranslation } = useLanguage();
  const { availableCurrencies, selectedCurrency, setSelectedCurrency } = useCurrency();

  const handleNavClick = (navItem: string) => {
    console.log('Header - Navigation item clicked:', navItem);
  };

  const handleLanguageSelect = (language: Language) => {
    setSelectedLanguage(language);
    console.log('Language selected:', language.name);
  };

  const handleCurrencySelect = (currency: Currency) => {
    setSelectedCurrency(currency);
    console.log('Currency selected:', currency.code);
  };

  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full border-b backdrop-blur supports-[backdrop-filter]:bg-background/60",
        isScrolled ? "border-border/40 shadow-md bg-background/95" : "border-transparent bg-background/80"
      )}
    >
      <div className="flex h-16 w-full items-center justify-between px-4 md:px-6">
        {/* Left Group */}
        <div className="flex items-center">
          <Link href="/" className="mr-4 flex items-center" onClick={() => handleNavClick('Logo/Home')}>
            <svg width="120" height="36" viewBox="0 0 522 155" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-8 w-auto">
              <path d="M203.836 153.501L162 43.6816H193.89L217.884 112.178L241.775 43.6816H273.768L231.932 153.501H203.836Z" fill="url(#paint0_linear_318_40)"/>
              <path d="M432.198 153.501H404V0H432.198V153.501Z" fill="url(#paint1_linear_318_40)"/>
              <path d="M475.993 153.819H448V44H454.768L463.996 57.0225C468.508 52.9209 473.635 49.7764 479.377 47.5889C485.119 45.333 491.066 44.2051 497.219 44.2051H521.931V72.0957H497.219C494.279 72.0957 491.511 72.6426 488.913 73.7363C486.315 74.8301 484.06 76.334 482.146 78.248C480.231 80.1621 478.728 82.418 477.634 85.0156C476.54 87.6133 475.993 90.3818 475.993 93.3213V153.819Z" fill="url(#paint2_linear_318_40)"/>
              <path d="M388.178 152.023H381.41L370.541 136.95C367.875 139.343 365.038 141.599 362.03 143.718C359.091 145.769 355.98 147.58 352.699 149.152C349.418 150.656 346.034 151.853 342.548 152.741C339.13 153.63 335.644 154.074 332.089 154.074C324.364 154.074 317.084 152.775 310.248 150.178C303.48 147.58 297.533 143.82 292.406 138.898C287.348 133.908 283.349 127.824 280.409 120.646C277.47 113.469 276 105.3 276 96.1396C276 87.5947 277.47 79.7676 280.409 72.6582C283.349 65.4805 287.348 59.3281 292.406 54.2012C297.533 49.0742 303.48 45.1094 310.248 42.3066C317.084 39.4355 324.364 38 332.089 38C335.644 38 339.164 38.4443 342.65 39.333C346.137 40.2217 349.521 41.4521 352.802 43.0244C356.083 44.5967 359.193 46.4424 362.133 48.5615C365.141 50.6807 367.943 52.9707 370.541 55.4316L381.41 42.4092H388.178V152.023ZM359.979 96.1396C359.979 92.3115 359.228 88.6201 357.724 85.0654C356.288 81.4424 354.306 78.2637 351.776 75.5293C349.247 72.7266 346.273 70.5049 342.855 68.8643C339.506 67.1553 335.917 66.3008 332.089 66.3008C328.261 66.3008 324.638 66.9502 321.22 68.249C317.87 69.5479 314.931 71.4619 312.401 73.9912C309.94 76.5205 307.992 79.665 306.557 83.4248C305.121 87.1162 304.403 91.3545 304.403 96.1396C304.403 100.925 305.121 105.197 306.557 108.957C307.992 112.648 309.94 115.759 312.401 118.288C314.931 120.817 317.87 122.731 321.22 124.03C324.638 125.329 328.261 125.979 332.089 125.979C335.917 125.979 339.506 125.158 342.855 123.518C346.273 121.809 349.247 119.587 351.776 116.853C354.306 114.05 356.288 110.871 357.724 107.316C359.228 103.693 359.979 99.9678 359.979 96.1396Z" fill="url(#paint3_linear_318_40)"/>
              <path d="M19 116C29.4934 116 38 124.507 38 135C38 135.211 37.9951 135.422 37.9883 135.632C37.9864 135.689 37.9838 135.746 37.9814 135.804C37.9745 135.972 37.9654 136.139 37.9541 136.306C37.9508 136.355 37.948 136.403 37.9443 136.452C37.9289 136.657 37.9096 136.86 37.8877 137.062C37.8832 137.104 37.8788 137.145 37.874 137.187C37.8257 137.608 37.7639 138.026 37.6885 138.438C37.6801 138.484 37.6708 138.53 37.6621 138.575C37.6296 138.746 37.5947 138.916 37.5576 139.085C37.5493 139.123 37.5418 139.161 37.5332 139.199C37.4874 139.402 37.438 139.604 37.3857 139.805C37.3799 139.827 37.3731 139.849 37.3672 139.871C37.317 140.061 37.2648 140.249 37.209 140.437C37.2012 140.463 37.1934 140.489 37.1855 140.515C37.0619 140.923 36.9244 141.325 36.7744 141.722C36.7643 141.748 36.7544 141.775 36.7441 141.802C36.5932 142.195 36.4298 142.582 36.2539 142.963C36.2412 142.99 36.2286 143.018 36.2158 143.045C36.0363 143.428 35.8445 143.805 35.6406 144.174C35.6362 144.182 35.6324 144.19 35.6279 144.198C32.3878 150.043 26.1563 154 19 154C8.50659 154 0 145.493 0 135C0 125.883 6.42203 118.266 14.9893 116.425C14.9984 116.423 15.0075 116.421 15.0166 116.419C15.1596 116.388 15.3031 116.359 15.4473 116.332C15.4629 116.329 15.4785 116.326 15.4941 116.323C15.6281 116.298 15.7626 116.275 15.8975 116.253C15.9316 116.247 15.9658 116.242 16 116.236C16.124 116.217 16.2483 116.198 16.373 116.181C16.4137 116.175 16.4544 116.169 16.4951 116.164C16.7954 116.125 17.0979 116.093 17.4023 116.067C17.4297 116.065 17.457 116.062 17.4844 116.06C17.6285 116.048 17.773 116.038 17.918 116.03C17.9388 116.029 17.9596 116.027 17.9805 116.026C18.318 116.009 18.658 116 19 116Z" fill="url(#paint4_linear_318_40)"/>
              <path fillRule="evenodd" clipRule="evenodd" d="M41.54 44.0293H83.6787L92.1484 55.4814L93.0488 56.707L93.0518 56.7031L109.883 79.46C108.584 81.0404 107.519 82.8172 106.69 84.791C105.596 87.3971 105.05 90.175 105.05 93.124V153.818L84.0029 154H62.7715C56.002 154 49.6423 152.731 43.6934 150.193C42.457 149.652 41.2534 149.067 40.0791 148.445C42.5607 144.563 44 139.95 44 135C44 121.193 32.8071 110 19 110C17.2729 110 15.5865 110.174 13.958 110.508C13.7467 108.614 13.6416 106.686 13.6416 104.724V72.0107H0V44.0293H13.6416V0H41.54V44.0293ZM41.54 104.724C41.54 107.673 42.0867 110.451 43.1807 113.057C44.2747 115.594 45.7797 117.823 47.6943 119.743C49.6089 121.663 51.8655 123.207 54.4639 124.373C57.0621 125.47 59.8314 126.019 62.7715 126.019H77.0488V72.0107H41.54V104.724Z" fill="url(#paint5_linear_318_40)"/>
              <path d="M151 71.8291H126.281C123.341 71.8291 120.572 72.3784 117.974 73.4756C116.663 74.0292 115.438 74.6871 114.302 75.4502L97.6348 53.0088C100.954 50.6486 104.553 48.7262 108.435 47.2432C114.178 44.98 120.127 43.8477 126.281 43.8477H151V71.8291Z" fill="url(#paint6_linear_318_40)"/>
              <defs>
                <linearGradient id="paint0_linear_318_40" x1="0" y1="77.0371" x2="520.931" y2="77.0371" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#006A97"/>
                  <stop offset="1" stopColor="#009AD7"/>
                </linearGradient>
                <linearGradient id="paint1_linear_318_40" x1="0" y1="77.0371" x2="520.931" y2="77.0371" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#006A97"/>
                  <stop offset="1" stopColor="#009AD7"/>
                </linearGradient>
                <linearGradient id="paint2_linear_318_40" x1="0" y1="77.0371" x2="520.931" y2="77.0371" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#006A97"/>
                  <stop offset="1" stopColor="#009AD7"/>
                </linearGradient>
                <linearGradient id="paint3_linear_318_40" x1="0" y1="77.0371" x2="520.931" y2="77.0371" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#006A97"/>
                  <stop offset="1" stopColor="#009AD7"/>
                </linearGradient>
                <linearGradient id="paint4_linear_318_40" x1="0" y1="77.0371" x2="520.931" y2="77.0371" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#006A97"/>
                  <stop offset="1" stopColor="#009AD7"/>
                </linearGradient>
                <linearGradient id="paint5_linear_318_40" x1="0" y1="77.0371" x2="520.931" y2="77.0371" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#006A97"/>
                  <stop offset="1" stopColor="#009AD7"/>
                </linearGradient>
                <linearGradient id="paint6_linear_318_40" x1="0" y1="77.0371" x2="520.931" y2="77.0371" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#006A97"/>
                  <stop offset="1" stopColor="#009AD7"/>
                </linearGradient>
              </defs>
            </svg>
          </Link>
          <nav className="hidden md:flex items-center space-x-4 text-sm font-medium">
            <Link href="/mapper" className="text-foreground/70 transition-colors hover:text-foreground" onClick={() => handleNavClick('Mapper')}>
              {getTranslation('mapper', 'Mapper')}
            </Link>
            <Link href="/driftin" className="text-foreground/70 transition-colors hover:text-foreground" onClick={() => handleNavClick('Driftin')}>
              {getTranslation('driftin', 'Driftin')}
            </Link>
            <Link href="/orbit" className="text-foreground/70 transition-colors hover:text-foreground" onClick={() => handleNavClick('Orbit')}>
              {getTranslation('orbit', 'Orbit')}
            </Link>
            <Link href="/smart-trails" className="text-foreground/70 transition-colors hover:text-foreground" onClick={() => handleNavClick('SmartTrails')}>
              {getTranslation('smartTrails', 'SmartTrails')}
            </Link>
            <Link href="/pricetime" className="text-foreground/70 transition-colors hover:text-foreground" onClick={() => handleNavClick('PriceTime')}>
              PriceTime
            </Link>
            <Link href="/visascan" className="text-foreground/70 transition-colors hover:text-foreground" onClick={() => handleNavClick('VisaScan')}>
              VisaScan
            </Link>
            <Link href="/appscout" className="text-foreground/70 transition-colors hover:text-foreground" onClick={() => handleNavClick('AppScout')}>
              AppScout
            </Link>
          </nav>
        </div>

        {/* Right Group (Search + Buttons) */}
        <div className="flex flex-1 items-center justify-end gap-x-2">
          {isScrolled && (
            <div className="hidden w-full px-4 md:flex">
                <div className="relative w-full max-w-md lg:max-w-lg mx-auto">
                    <Input
                    type="text"
                    placeholder={getTranslation('headerSearchPlaceholder', "Search trvalr...")}
                    className="w-full pr-20 md:pr-24 pl-4 text-sm h-10 rounded-full border-border bg-background/70 focus:border-primary shadow-sm"
                    value={searchQuery}
                    onChange={(e) => onSearchQueryChange(e.target.value)}
                    onKeyDown={(e) => { if (e.key === 'Enter') onSearchSubmit(); }}
                    />
                    <div className="absolute right-1 top-1/2 -translate-y-1/2 flex items-center space-x-0.5">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="text-muted-foreground hover:text-primary hover:bg-muted/30 rounded-full w-8 h-8"
                        onClick={() => console.log('Mic clicked in Header')}
                    >
                        <Mic className="h-4 w-4" />
                        <span className="sr-only">Use microphone</span>
                    </Button>
                    <Button
                        variant="default"
                        size="icon"
                        className="bg-primary hover:bg-primary/90 rounded-full text-primary-foreground w-8 h-8"
                        onClick={onSearchSubmit}
                    >
                        <SendHorizontal className="h-4 w-4" />
                        <span className="sr-only">Send message</span>
                    </Button>
                    </div>
                </div>
            </div>
          )}

          {showCurrencySelector && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  aria-label={getTranslation('selectCurrency', 'Select Currency')}
                  className="rounded-full text-foreground/70 hover:text-primary hover:bg-primary/10 flex items-center px-2 sm:px-3 h-9"
                >
                  <Coins className="h-5 w-5 mr-1 sm:mr-2" />
                  <span className="text-xs font-medium">{selectedCurrency.code}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="max-h-96 overflow-y-auto">
                {availableCurrencies.map((currency) => (
                  <DropdownMenuItem
                    key={currency.code}
                    onClick={() => handleCurrencySelect(currency)}
                    className={cn(
                      selectedCurrency.code === currency.code && "bg-primary/10 text-primary focus:bg-primary/15 focus:text-primary",
                      "hover:bg-primary/5 focus:bg-primary/10 flex justify-between items-center"
                    )}
                  >
                    <span>{currency.name} ({currency.symbol})</span>
                    <span className="text-xs opacity-70 ml-2">{currency.code}</span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          )}

          <Button
            asChild
            variant="ghost"
            aria-label="Trailboard"
            className="rounded-full text-foreground/70 hover:text-primary hover:bg-primary/10 flex items-center px-2 sm:px-3 h-9"
          >
            <Link href="/trailboard">
              <Map className="h-5 w-5 mr-0 sm:mr-1" />
              <span className="hidden sm:inline text-xs">Trailboard</span>
            </Link>
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                aria-label={getTranslation('selectLanguage', 'Select Language')}
                className="rounded-full text-foreground/70 hover:text-primary hover:bg-primary/10 flex items-center px-2 sm:px-3 h-9"
              >
                <Globe className="h-5 w-5 mr-0 sm:mr-1" />
                <span className="hidden sm:inline text-xs">{selectedLanguage.name}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="max-h-96 overflow-y-auto">
              {availableLanguages.map((lang) => (
                <DropdownMenuItem
                  key={lang.code}
                  onClick={() => handleLanguageSelect(lang)}
                  className={cn(
                    selectedLanguage.code === lang.code && "bg-primary/10 text-primary focus:bg-primary/15 focus:text-primary",
                    "hover:bg-primary/5 focus:bg-primary/10"
                  )}
                >
                  <span className="mr-2 text-xs w-6 text-center opacity-70">{lang.code.toUpperCase()}</span>
                  {lang.name} {lang.nativeName && lang.name !== lang.nativeName && `(${lang.nativeName})`}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                aria-label={getTranslation('userProfile', 'User Profile')}
                className="flex h-9 items-center justify-center gap-1.5 rounded-full bg-muted/30 p-1.5 text-foreground/70 hover:bg-primary/10 hover:text-primary"
              >
                <User className="h-5 w-5" />
                <Menu className="h-5 w-5 hidden sm:block" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild className="hover:bg-primary/5 focus:bg-primary/10 focus:text-primary cursor-pointer">
                 <Link href="/auth/login">
                    {getTranslation('login', 'Login')}
                  </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild className="hover:bg-primary/5 focus:bg-primary/10 focus:text-primary cursor-pointer">
                <Link href="/profile/phil-harrison">
                    {getTranslation('userProfile', 'Profile')}
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild className="hover:bg-primary/5 focus:bg-primary/10 focus:text-primary cursor-pointer">
                <Link href="/my-trips">
                  {getTranslation('myTripsMenu', 'My Trips')}
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild className="hover:bg-primary/5 focus:bg-primary/10 focus:text-primary cursor-pointer">
                <Link href="/settings">
                  {getTranslation('settings', 'Settings')}
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild className="hover:bg-primary/5 focus:bg-primary/10 focus:text-primary cursor-pointer">
                <Link href="/subscription">
                  {getTranslation('manageSubscription', 'Manage Subscription')}
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild className="hover:bg-primary/5 focus:bg-primary/10 focus:text-primary cursor-pointer">
                <Link href="/about">{getTranslation('about', 'About')}</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild className="hover:bg-primary/5 focus:bg-primary/10 focus:text-primary cursor-pointer">
                <Link href="/contact">{getTranslation('contact', 'Contact')}</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild className="hover:bg-primary/5 focus:bg-primary/10 focus:text-primary cursor-pointer">
                <Link href="/terms">{getTranslation('termsOfService', 'Terms of service')}</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
