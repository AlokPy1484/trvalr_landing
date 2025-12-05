
'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input'; // Using Input for City & Country for simplicity
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CalendarDays, BedDouble, Send, MapPin, Building2, Home as HomeIcon } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

interface HostEmilyModalContentProps {
  onClose: () => void;
}

export function HostEmilyModalContent({ onClose }: HostEmilyModalContentProps) {
  const { getTranslation } = useLanguage();
  const [cityCountry, setCityCountry] = useState('');
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [sleepingArrangement, setSleepingArrangement] = useState('');
  const [message, setMessage] = useState('');

  const handleSendRequest = () => {
    console.log({
      type: 'Host Emily Request',
      cityCountry,
      dateAvailable: selectedDate ? format(selectedDate, 'PPP') : 'Not selected',
      sleepingArrangement,
      message,
    });
    onClose(); // Close modal after sending
  };

  const sleepingOptions = [
    { value: 'private_room', labelKey: 'sleepingArrPrivateRoom', fallback: 'Private room' },
    { value: 'shared_space', labelKey: 'sleepingArrSharedSpace', fallback: 'Shared space' },
    { value: 'couch', labelKey: 'sleepingArrCouch', fallback: 'Couch' },
  ];

  return (
    <div className="space-y-6">
      <div className="absolute top-4 right-16"> {/* This might need to be removed or adjusted if the close button is from shadcn */}
        <Image
            src="https://placehold.co/40x40.png"
            alt={getTranslation('emilyAvatarAlt', "Emily's Avatar")}
            width={32}
            height={32}
            className="rounded-full border-2 border-background shadow-sm"
            data-ai-hint="woman friendly"
        />
      </div>
      <p className="text-sm text-muted-foreground text-center">
        {getTranslation('hostEmilyModalSubtext', 'Become a part of her journey by offering your home, your stories, and your city. Let connection begin where comfort lives.')}
      </p>

      <div className="space-y-4">
        <div>
          <Label htmlFor="cityCountry" className="text-sm font-medium text-foreground flex items-center mb-1.5">
            <MapPin className="h-4 w-4 mr-2 text-primary/70" />
            {getTranslation('hostEmilyFormCityCountry', 'City & Country')}
          </Label>
          <Input
            id="cityCountry"
            placeholder={getTranslation('hostEmilyFormCityCountryPlaceholder', 'e.g., Paris, France')}
            value={cityCountry}
            onChange={(e) => setCityCountry(e.target.value)}
            className="bg-background/70 border-border/50 focus:border-primary"
          />
        </div>

        <div>
           <Label htmlFor="datesAvailable" className="text-sm font-medium text-foreground flex items-center mb-1.5">
            <CalendarDays className="h-4 w-4 mr-2 text-primary/70" />
            {getTranslation('hostEmilyFormDatesAvailable', 'Dates Available')}
          </Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal h-10 border-border/50 bg-background/70 hover:bg-muted/30",
                  !selectedDate && "text-muted-foreground"
                )}
              >
                <CalendarDays className="mr-2 h-4 w-4 opacity-70" />
                {selectedDate ? format(selectedDate, "PPP") : <span>{getTranslation('hostEmilyFormPickDate', 'Pick a date')}</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 bg-background shadow-xl rounded-lg" align="start">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        <div>
          <Label htmlFor="sleepingArrangement" className="text-sm font-medium text-foreground flex items-center mb-1.5">
            <BedDouble className="h-4 w-4 mr-2 text-primary/70" />
            {getTranslation('hostEmilyFormSleepingArrangement', 'Sleeping Arrangement')}
          </Label>
          <Select value={sleepingArrangement} onValueChange={setSleepingArrangement}>
            <SelectTrigger id="sleepingArrangement" className="bg-background/70 border-border/50 focus:border-primary h-10">
              <SelectValue placeholder={getTranslation('hostEmilyFormSelectArrangement', 'Select arrangement')} />
            </SelectTrigger>
            <SelectContent className="bg-popover shadow-xl rounded-lg">
              {sleepingOptions.map(opt => (
                <SelectItem key={opt.value} value={opt.value}>
                  {getTranslation(opt.labelKey, opt.fallback)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="messageToEmilyHost" className="text-sm font-medium text-foreground flex items-center mb-1.5">
            <Send className="h-4 w-4 mr-2 text-primary/70" />
            {getTranslation('hostEmilyFormMessage', 'Message to Emily')}
          </Label>
          <Textarea
            id="messageToEmilyHost"
            placeholder={getTranslation('hostEmilyFormMessagePlaceholder', 'A brief welcome or any details...')}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            maxLength={250}
            className="bg-background/70 border-border/50 focus:border-primary min-h-[100px]"
          />
          <p className="text-xs text-muted-foreground mt-1 text-right">{message.length}/250</p>
        </div>
      </div>

       <div className="flex items-center justify-between pt-4 border-t border-border/20 mt-6">
        <Badge variant="outline" className="text-xs border-primary/50 text-primary bg-primary/10">
          <HomeIcon className="h-3 w-3 mr-1.5" />
          {getTranslation('hostEmilyFormVerifiedBadge', 'Verified Hosts only')}
        </Badge>
        <div className="flex gap-2">
          <Button variant="ghost" onClick={onClose} className="hover:bg-muted/40 text-muted-foreground">
            {getTranslation('formButtonCancel', 'Cancel')}
          </Button>
          <Button onClick={handleSendRequest} className="bg-primary text-primary-foreground hover:bg-primary/90">
            {getTranslation('hostEmilyFormSendRequestButton', 'Send Hosting Request')}
            <Send className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}

