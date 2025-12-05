
'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Mail } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface ProfileHeaderProps {
  name: string;
  tagline: string;
  avatarUrl: string;
  avatarAiHint: string;
  buttonTextKey: string;
  buttonTextFallback: string;
}

export function ProfileHeader({ name, tagline, avatarUrl, avatarAiHint, buttonTextKey, buttonTextFallback }: ProfileHeaderProps) {
  const { getTranslation } = useLanguage();

  const handleSendMessage = () => {
    console.log(`Send message to ${name}`);
  };

  return (
    <section className="text-center py-6 md:py-8">
      <div className="relative inline-block mb-6">
        <Image
          src={avatarUrl}
          alt={name}
          width={160}
          height={160}
          className="rounded-full object-cover shadow-xl border-4 border-white dark:border-neutral-800"
          data-ai-hint={avatarAiHint}
          priority
        />
      </div>
      <h1 className="font-headline text-3xl sm:text-4xl font-bold text-neutral-900 dark:text-white mb-2">{name}</h1>
      <p className="text-neutral-600 dark:text-neutral-400 text-md sm:text-lg mb-6">{tagline}</p>
      <Button
        size="lg"
        className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-8 py-3 text-base shadow-md hover:shadow-lg transition-shadow"
        onClick={handleSendMessage}
      >
        <Mail className="mr-2 h-5 w-5" />
        {getTranslation(buttonTextKey, buttonTextFallback)}
      </Button>
    </section>
  );
}
