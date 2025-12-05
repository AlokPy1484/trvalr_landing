
'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DatePickerWithRange } from '@/components/ui/date-picker-with-range';
import { CalendarDays, Compass, Send, Users as GroupIcon, MapPin as DestinationPin, MountainSnow, Utensils, Zap, Sparkles, Layers, Building2 } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import type { DateRange } from "react-day-picker";

interface InviteEmilyModalContentProps {
  onClose: () => void;
}

export function InviteEmilyModalContent({ onClose }: InviteEmilyModalContentProps) {
  const { getTranslation } = useLanguage();
  const [destination, setDestination] = useState('');
  const [adventureType, setAdventureType] = useState('');
  const [travelDates, setTravelDates] = useState<DateRange | undefined>(undefined);
  const [groupType, setGroupType] = useState('');
  const [message, setMessage] = useState('');

  const handleSendInvite = () => {
    console.log({
      type: 'Invite Emily to Adventure',
      destination,
      adventureType,
      travelDates,
      groupType,
      message,
    });
    onClose(); // Close modal after sending
  };

  const adventureTypes = [
    { value: 'nature', labelKey: 'advTypeNature', fallback: 'Nature', icon: MountainSnow },
    { value: 'culture', labelKey: 'advTypeCulture', fallback: 'Culture', icon: Building2 },
    { value: 'foodie', labelKey: 'advTypeFoodie', fallback: 'Foodie', icon: Utensils },
    { value: 'thrill', labelKey: 'advTypeThrill', fallback: 'Thrill', icon: Zap },
    { value: 'spiritual', labelKey: 'advTypeSpiritual', fallback: 'Spiritual', icon: Sparkles },
    { value: 'mixed', labelKey: 'advTypeMixed', fallback: 'Mixed', icon: Layers },
  ];

  const groupTypes = [
    { value: 'solo', labelKey: 'groupTypeSolo', fallback: 'Solo' },
    { value: 'duo', labelKey: 'groupTypeDuo', fallback: 'Duo' },
    { value: 'group', labelKey: 'groupTypeGroup', fallback: 'Group' },
  ];

  return (
    <div className="space-y-6">
      {/* Removed the absolutely positioned Compass icon from here */}
      <p className="text-sm text-muted-foreground text-center">
        {getTranslation('inviteEmilyModalSubtext', "Planning something unforgettable? Invite Emily to join your adventure — whether it’s a road trip, a trek, or a culture dive.")}
      </p>

      <div className="space-y-4">
        <div>
          <Label htmlFor="destination" className="text-sm font-medium text-foreground flex items-center mb-1.5">
            <DestinationPin className="h-4 w-4 mr-2 text-primary/70" />
            {getTranslation('inviteEmilyFormDestination', 'Destination')}
          </Label>
          <Input
            id="destination"
            placeholder={getTranslation('inviteEmilyFormDestinationPlaceholder', 'e.g., The Himalayas, Nepal')}
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            className="bg-background/70 border-border/50 focus:border-primary"
          />
        </div>

        <div>
          <Label htmlFor="adventureType" className="text-sm font-medium text-foreground flex items-center mb-1.5">
            <Compass className="h-4 w-4 mr-2 text-primary/70" /> 
            {getTranslation('inviteEmilyFormAdventureType', 'Adventure Type')}
          </Label>
          <Select value={adventureType} onValueChange={setAdventureType}>
            <SelectTrigger id="adventureType" className="bg-background/70 border-border/50 focus:border-primary h-10">
              <SelectValue placeholder={getTranslation('inviteEmilyFormSelectAdventureType', 'Select adventure type')} />
            </SelectTrigger>
            <SelectContent className="bg-popover shadow-xl rounded-lg">
              {adventureTypes.map(opt => {
                const Icon = opt.icon;
                return (
                  <SelectItem key={opt.value} value={opt.value}>
                    <div className="flex items-center gap-2">
                      <Icon className="h-4 w-4 text-muted-foreground" />
                      {getTranslation(opt.labelKey, opt.fallback)}
                    </div>
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <Label htmlFor="travelDates" className="text-sm font-medium text-foreground flex items-center mb-1.5">
            <CalendarDays className="h-4 w-4 mr-2 text-primary/70" />
            {getTranslation('inviteEmilyFormTravelDates', 'Travel Dates')}
          </Label>
          <DatePickerWithRange
            date={travelDates}
            onSelectDate={setTravelDates}
            className="[&_button]:bg-background/70 [&_button]:border-border/50 [&_button:focus]:border-primary"
          />
        </div>

        <div>
          <Label htmlFor="groupType" className="text-sm font-medium text-foreground flex items-center mb-1.5">
            <GroupIcon className="h-4 w-4 mr-2 text-primary/70" />
            {getTranslation('inviteEmilyFormGroupType', 'Group Type')}
          </Label>
          <Select value={groupType} onValueChange={setGroupType}>
            <SelectTrigger id="groupType" className="bg-background/70 border-border/50 focus:border-primary h-10">
              <SelectValue placeholder={getTranslation('inviteEmilyFormSelectGroupType', 'Select group type')} />
            </SelectTrigger>
            <SelectContent className="bg-popover shadow-xl rounded-lg">
              {groupTypes.map(opt => (
                <SelectItem key={opt.value} value={opt.value}>
                  {getTranslation(opt.labelKey, opt.fallback)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="messageToEmilyInvite" className="text-sm font-medium text-foreground flex items-center mb-1.5">
            <Send className="h-4 w-4 mr-2 text-primary/70" />
            {getTranslation('inviteEmilyFormMessage', 'Message to Emily')}
          </Label>
          <Textarea
            id="messageToEmilyInvite"
            placeholder={getTranslation('inviteEmilyFormMessagePlaceholder', 'Share some details about your adventure...')}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            maxLength={250}
            className="bg-background/70 border-border/50 focus:border-primary min-h-[100px]"
          />
          <p className="text-xs text-muted-foreground mt-1 text-right">{message.length}/250</p>
        </div>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-border/20 mt-6">
        <p className="text-xs text-muted-foreground italic">
           <Compass className="inline h-3.5 w-3.5 mr-1 text-primary/70" />
           {getTranslation('inviteEmilyFormTagline', 'Let shared footprints write the best stories.')}
        </p>
        <div className="flex gap-2">
          <Button variant="ghost" onClick={onClose} className="hover:bg-muted/40 text-muted-foreground">
            {getTranslation('formButtonCancel', 'Cancel')}
          </Button>
          <Button onClick={handleSendInvite} className="bg-primary text-primary-foreground hover:bg-primary/90">
            {getTranslation('inviteEmilyFormSendInviteButton', 'Send Invite')}
            <Send className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
