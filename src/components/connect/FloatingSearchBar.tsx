'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { MapPin, Calendar, Search } from 'lucide-react';
import { cn } from '@/lib/utils';
import { DatePicker } from '../ui/date-picker';
import { useLanguage } from '@/contexts/LanguageContext';

export function FloatingSearchBar() {
    const { getTranslation } = useLanguage();
    const [date, setDate] = React.useState<Date | undefined>(undefined);

    return (
        <div className="sticky top-20 z-20 mb-8">
            <div className="bg-card/60 backdrop-blur-xl border border-border/20 rounded-full shadow-lg p-2 max-w-2xl mx-auto flex items-center space-x-2">
                <div className="relative flex-grow">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                        type="text"
                        placeholder="Anywhere"
                        className="pl-10 h-12 text-base bg-transparent border-none focus-visible:ring-0 focus-visible:ring-offset-0"
                    />
                </div>
                
                <div className="h-8 border-l border-border/50"></div>

                <DatePicker
                    date={date}
                    onSelectDate={setDate}
                    placeholder="Pick your travel dates"
                    className="[&_button]:border-none [&_button]:bg-transparent [&_button]:h-12 [&_button]:text-base"
                />
                
                <div className="h-8 border-l border-border/50"></div>

                <div className="flex items-center space-x-2 px-3">
                    <label htmlFor="available-now" className="text-sm font-medium text-muted-foreground whitespace-nowrap">Available now</label>
                    <Switch id="available-now" />
                </div>
                
                <Button className="rounded-full bg-primary h-12 w-12 flex-shrink-0" size="icon">
                    <Search className="h-5 w-5" />
                    <span className="sr-only">Find Match</span>
                </Button>
            </div>
        </div>
    );
}
