
'use client';

import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

interface OrbitCTAProps {
  title: string;
  description: string;
  imageUrl?: string;
  imageAltKey?: string;
  imageAltFallback?: string;
  imageAiHint?: string;
  buttonTextKey: string;
  buttonTextFallback: string;
}

export function OrbitCTA({
  title,
  description,
  imageUrl,
  imageAltKey = '',
  imageAltFallback = 'CTA Image',
  imageAiHint,
  buttonTextKey,
  buttonTextFallback,
}: OrbitCTAProps) {
  const { getTranslation } = useLanguage();
  return (
    <div className="bg-gradient-to-br from-teal-50 to-rose-50 dark:from-slate-800 dark:to-blue-900/50 border border-neutral-200/80 dark:border-slate-700/80 rounded-2xl shadow-lg text-center overflow-hidden">
      {imageUrl && (
        <div className="relative aspect-[16/9] w-full">
          <Image
            src={imageUrl}
            alt={getTranslation(imageAltKey, imageAltFallback)}
            fill
            className="object-cover"
            data-ai-hint={imageAiHint}
          />
        </div>
      )}
      <div className="p-5">
        <h4 className="text-md font-semibold text-neutral-800 dark:text-neutral-200 mb-2">{title}</h4>
        <p className="text-xs text-neutral-500 dark:text-neutral-400 mb-4">{description}</p>
        <Button
          variant="outline"
          size="sm"
          className="text-teal-600 border-teal-500/50 hover:bg-teal-500/10 hover:text-teal-700 dark:text-teal-400 dark:border-teal-400/30 dark:hover:bg-teal-400/10 dark:hover:text-teal-300 rounded-lg text-xs"
        >
          {getTranslation(buttonTextKey, buttonTextFallback)}
        </Button>
      </div>
    </div>
  );
}
