
'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Input } from '@/components/ui/input';
import { DatePickerWithRange } from '@/components/ui/date-picker-with-range';
import { Separator } from '@/components/ui/separator';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Search, Plus, Minus } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { DateRange } from 'react-day-picker';
import { useLanguage } from '@/contexts/LanguageContext';
import { format } from 'date-fns';

const FilterButton = ({ label, value }: { label: string; value: string }) => (
    <div className="flex flex-col items-start flex-grow p-2">
      <span className="text-xs font-semibold text-foreground">{label}</span>
      <span className="text-sm text-muted-foreground truncate">{value}</span>
    </div>
);

const CounterRow = ({
  title,
  subtitle,
  subtitleComponent,
  count,
  onDecrement,
  onIncrement,
  min = 0,
}: {
  title: string;
  subtitle?: string;
  subtitleComponent?: React.ReactNode;
  count: number;
  onDecrement: () => void;
  onIncrement: () => void;
  min?: number;
}) => (
  <div className="flex items-center justify-between py-2">
    <div>
      <h5 className="font-medium text-foreground">{title}</h5>
      {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
      {subtitleComponent}
    </div>
    <div className="flex items-center gap-4">
      <Button
        variant="outline"
        size="icon"
        className="h-8 w-8 rounded-full"
        onClick={onDecrement}
        disabled={count <= min}
      >
        <Minus className="h-4 w-4" />
      </Button>
      <span className="w-4 text-center font-semibold text-lg">{count}</span>
      <Button
        variant="outline"
        size="icon"
        className="h-8 w-8 rounded-full"
        onClick={onIncrement}
      >
        <Plus className="h-4 w-4" />
      </Button>
    </div>
  </div>
);


export function AnimatedSearchBar() {
  const { getTranslation } = useLanguage();
  const [destination, setDestination] = useState('');
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);
  const [pets, setPets] = useState(0);

  const [selectedBudget, setSelectedBudget] = useState('any');
  
  const [isTravelerPopoverOpen, setIsTravelerPopoverOpen] = useState(false);
  const [isBudgetPopoverOpen, setIsBudgetPopoverOpen] = useState(false);

  const totalTravelers = adults + children + infants;
  let travelersDisplay = `${totalTravelers} traveler${totalTravelers !== 1 ? 's' : ''}`;

  const budgetOptions = [
    { value: 'any', label: 'Any budget' },
    { value: 'budget', label: '$ On a budget' },
    { value: 'sensibly', label: '$$ Sensibly priced' },
    { value: 'upscale', label: '$$$ Upscale' },
    { value: 'luxury', label: '$$$$ Luxury' },
  ];
  
  const budgetKeys = budgetOptions.map(opt => opt.value);
  const budgetIndex = budgetKeys.indexOf(selectedBudget);

  const handleSliderChange = (newIndex: number) => {
    setSelectedBudget(budgetKeys[newIndex]);
  };

  const selectedBudgetLabel = budgetOptions[budgetIndex]?.label || 'Any budget';

  return (
    <div className="w-full max-w-4xl mx-auto px-4">
      <div className="bg-background/90 backdrop-blur-lg rounded-full border border-border/20 shadow-lg flex items-center divide-x divide-border/30 transition-all duration-300 hover:shadow-xl focus-within:ring-2 focus-within:ring-primary/50">
        
        {/* Where */}
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost" className="flex-grow text-left h-16 rounded-l-full hover:bg-muted/50 px-6 w-1/4">
              <FilterButton label="Where" value={destination || 'Search destinations'} />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80 mt-2">
            <div className="grid gap-4">
              <h4 className="font-medium leading-none">Select Destination</h4>
              <Input
                placeholder="e.g., Paris, France"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
              />
            </div>
          </PopoverContent>
        </Popover>
        
        {/* When */}
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost" className="flex-grow text-left h-16 rounded-none hover:bg-muted/50 px-6 w-1/4">
              <FilterButton
                label="When"
                value={
                  dateRange?.from
                    ? dateRange.to
                      ? `${format(dateRange.from, 'LLL dd')} - ${format(dateRange.to, 'LLL dd, y')}`
                      : format(dateRange.from, 'PPP')
                    : 'Add dates'
                }
              />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0 mt-2">
            <DatePickerWithRange date={dateRange} onSelectDate={setDateRange} />
          </PopoverContent>
        </Popover>

        {/* Travelers */}
        <Popover open={isTravelerPopoverOpen} onOpenChange={setIsTravelerPopoverOpen}>
          <PopoverTrigger asChild>
            <Button variant="ghost" className="flex-grow text-left h-16 rounded-none hover:bg-muted/50 px-6 w-1/4">
              <FilterButton label="Who" value={travelersDisplay} />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80 mt-2 p-0 rounded-xl">
            <div className="p-4">
                <CounterRow 
                    title="Adults"
                    subtitle="Ages 13 or above"
                    count={adults}
                    onDecrement={() => setAdults(c => Math.max(1, c - 1))}
                    onIncrement={() => setAdults(c => c + 1)}
                    min={1}
                />
                <Separator />
                <CounterRow 
                    title="Children"
                    subtitle="Ages 2–12"
                    count={children}
                    onDecrement={() => setChildren(c => Math.max(0, c - 1))}
                    onIncrement={() => setChildren(c => c + 1)}
                />
                <Separator />
                <CounterRow 
                    title="Infants"
                    subtitle="Under 2"
                    count={infants}
                    onDecrement={() => setInfants(c => Math.max(0, c - 1))}
                    onIncrement={() => setInfants(c => c + 1)}
                />
                <Separator />
                <CounterRow 
                    title="Pets"
                    subtitleComponent={<a href="#" className="text-sm text-muted-foreground underline hover:text-primary">Bringing a service animal?</a>}
                    count={pets}
                    onDecrement={() => setPets(c => Math.max(0, c - 1))}
                    onIncrement={() => setPets(c => c + 1)}
                />
            </div>
            <div className="p-4 border-t border-border bg-muted/50">
                <Button 
                    onClick={() => setIsTravelerPopoverOpen(false)}
                    className="w-full bg-foreground hover:bg-foreground/90 text-background rounded-lg"
                >
                    Update
                </Button>
            </div>
          </PopoverContent>
        </Popover>

        {/* Budget */}
        <Popover open={isBudgetPopoverOpen} onOpenChange={setIsBudgetPopoverOpen}>
            <PopoverTrigger asChild>
                <Button variant="ghost" className="flex-grow text-left h-16 rounded-none hover:bg-muted/50 px-6 w-1/4">
                    <FilterButton label="Budget" value={selectedBudgetLabel} />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 mt-2 p-0 rounded-xl">
                <div className="p-4">
                    <h4 className="font-medium text-center text-lg mb-1">Budget</h4>
                    <p className="text-sm text-muted-foreground text-center mb-4">
                        {selectedBudgetLabel}
                    </p>
                    <Slider
                        value={[budgetIndex]}
                        onValueChange={(value) => handleSliderChange(value[0])}
                        max={budgetKeys.length - 1}
                        step={1}
                        className="my-6"
                    />
                     <div className="flex justify-between text-xs text-muted-foreground px-1">
                        <span>Any</span>
                        <span>$</span>
                        <span>$$</span>
                        <span>$$$</span>
                        <span>$$$$</span>
                    </div>
                </div>
                <div className="p-4 border-t border-border bg-muted/50">
                    <Button
                        onClick={() => setIsBudgetPopoverOpen(false)}
                        className="w-full bg-foreground hover:bg-foreground/90 text-background rounded-lg"
                    >
                        Update
                    </Button>
                </div>
            </PopoverContent>
        </Popover>
        
        {/* Search Button */}
        <div className="p-2">
            <Button size="icon" className="bg-primary text-primary-foreground rounded-full h-12 w-12 flex-shrink-0 hover:bg-primary/90 hover:scale-105 transition-transform">
            <Search className="h-5 w-5" />
            </Button>
        </div>
      </div>
    </div>
  );
}

