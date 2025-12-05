'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { useLanguage } from '@/contexts/LanguageContext';

export function FilterSidebar() {
  const { getTranslation } = useLanguage();

  return (
    <aside className="sticky top-24">
      <div className="bg-card/40 backdrop-blur-xl border border-border/20 rounded-xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
        <h3 className="font-headline text-2xl font-semibold mb-6">Filters</h3>
        <div className="space-y-6">
          {/* Budget Filter */}
          <div>
            <Label className="font-semibold text-foreground">Budget</Label>
            <div className="flex items-center justify-between text-sm text-muted-foreground mt-2">
              <span>$0</span>
              <span>$500+</span>
            </div>
            <Slider defaultValue={[250]} max={500} step={10} className="mt-2" />
          </div>
          
          {/* Languages Filter */}
          <div>
            <Label className="font-semibold text-foreground">Languages</Label>
            <div className="space-y-2 mt-3">
              <div className="flex items-center space-x-2">
                <Checkbox id="lang-english" defaultChecked />
                <label htmlFor="lang-english" className="text-sm text-muted-foreground">English</label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="lang-spanish" />
                <label htmlFor="lang-spanish" className="text-sm text-muted-foreground">Spanish</label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="lang-french" />
                <label htmlFor="lang-french" className="text-sm text-muted-foreground">French</label>
              </div>
            </div>
          </div>

          {/* Verified Filter */}
          <div className="flex items-center justify-between">
            <Label htmlFor="verified-switch" className="font-semibold text-foreground">Verified</Label>
            <Switch id="verified-switch" />
          </div>

          {/* Apply Button */}
          <Button variant="outline" className="w-full mt-4 transition-colors hover:bg-primary/10">
            Apply Filters
          </Button>
        </div>
      </div>
    </aside>
  );
}