'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/contexts/LanguageContext';

export function SubNav() {
  const pathname = usePathname();
  const { getTranslation } = useLanguage();

  const navItems = [
    { href: '/driftin', labelKey: 'subNavHosts', fallback: 'HOSTS' },
    { href: '/travelers', labelKey: 'subNavTravelers', fallback: 'TRAVELERS' },
    { href: '/companions', labelKey: 'subNavCompanions', fallback: 'COMPANIONS' },
    { href: '/connect', labelKey: 'connect', fallback: 'CONNECT' },
  ];

  return (
    <nav className="w-full bg-background/80 backdrop-blur-sm border-b border-border/70 sticky top-16 z-30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center items-center h-12 space-x-8 md:space-x-12">
          {navItems.map((item) => (
            <Link
              key={item.labelKey}
              href={item.href}
              className={cn(
                'text-sm font-semibold tracking-wider uppercase transition-colors',
                pathname === item.href
                  ? 'text-primary'
                  : 'text-muted-foreground hover:text-primary/80'
              )}
            >
              {getTranslation(item.labelKey, item.fallback)}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}