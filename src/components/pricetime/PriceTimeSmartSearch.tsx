'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowRight, Plane, Calendar, Users, Rocket } from 'lucide-react';
import { DatePickerWithRange } from '@/components/ui/date-picker-with-range';
import type { DateRange } from 'react-day-picker';
import { Counter } from './Counter';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { SplitFlapDisplay } from './SplitFlapDisplay';

interface PriceTimeSmartSearchProps {
  onPredict: () => void;
}

export function PriceTimeSmartSearch({ onPredict }: PriceTimeSmartSearchProps) {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [dates, setDates] = useState<DateRange | undefined>();
  const [passengers, setPassengers] = useState(1);
  const [cabin, setCabin] = useState('economy');

  return (
    <div className="flex flex-col items-center justify-center p-4 min-h-[calc(100vh-160px)]">
      
      <SplitFlapDisplay text="PRICETIME" />

      <div className="w-full max-w-4xl text-center mb-8">
        <h2 className="text-4xl md:text-5xl font-bold font-headline text-foreground mb-3">Where are you going?</h2>
        <p className="text-lg text-muted-foreground">Enter your route to get an AI-powered fare forecast.</p>
      </div>

      <div className="w-full max-w-4xl p-2 bg-card/60 border border-border/50 rounded-full backdrop-blur-lg flex flex-col md:flex-row items-center gap-2 shadow-2xl">
        <div className="w-full md:w-auto flex-1 flex items-center gap-2">
            <Plane className="h-5 w-5 text-muted-foreground ml-4 hidden md:block" />
            <Input 
                placeholder="From" 
                value={from}
                onChange={(e) => setFrom(e.target.value)}
                className="bg-transparent border-none focus-visible:ring-0 focus-visible:ring-offset-0 text-foreground placeholder:text-muted-foreground text-lg h-14"
            />
            <div className="h-6 border-l border-border hidden md:block"/>
            <Input 
                placeholder="To"
                value={to}
                onChange={(e) => setTo(e.target.value)} 
                className="bg-transparent border-none focus-visible:ring-0 focus-visible:ring-offset-0 text-foreground placeholder:text-muted-foreground text-lg h-14"
            />
        </div>
        
        <div className="h-6 border-l border-border hidden md:block"/>

        <div className="w-full md:w-auto flex items-center justify-center gap-2">
            <Popover>
                <PopoverTrigger asChild>
                    <Button variant="ghost" className="text-lg h-14 text-muted-foreground hover:text-foreground w-full md:w-auto">
                        <Calendar className="h-5 w-5 mr-2" /> Dates
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 mt-2 bg-popover border-border backdrop-blur-lg text-popover-foreground">
                    <DatePickerWithRange date={dates} onSelectDate={setDates} />
                </PopoverContent>
            </Popover>
            
             <div className="h-6 border-l border-border hidden md:block"/>

            <Popover>
                <PopoverTrigger asChild>
                     <Button variant="ghost" className="text-lg h-14 text-muted-foreground hover:text-foreground w-full md:w-auto">
                        <Users className="h-5 w-5 mr-2" /> {passengers}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-72 mt-2 bg-popover border-border backdrop-blur-lg text-popover-foreground p-4">
                    <Counter label="Passengers" value={passengers} onValueChange={setPassengers} />
                </PopoverContent>
            </Popover>

             <div className="h-6 border-l border-border hidden md:block"/>
            
            <Select value={cabin} onValueChange={setCabin}>
                <SelectTrigger className="w-full md:w-[150px] bg-transparent border-none focus:ring-0 text-lg h-14 text-muted-foreground hover:text-foreground">
                    <SelectValue placeholder="Cabin" />
                </SelectTrigger>
                <SelectContent className="bg-popover border-border backdrop-blur-lg text-popover-foreground">
                    <SelectItem value="economy">Economy</SelectItem>
                    <SelectItem value="premium">Premium</SelectItem>
                    <SelectItem value="business">Business</SelectItem>
                    <SelectItem value="first">First</SelectItem>
                </SelectContent>
            </Select>
        </div>

        <Button
            onClick={onPredict}
            size="icon"
            className="h-12 w-12 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 flex-shrink-0 shadow-lg"
        >
            <Rocket className="h-6 w-6" />
        </Button>
      </div>
    </div>
  );
}
