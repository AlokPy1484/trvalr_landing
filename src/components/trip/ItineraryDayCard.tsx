'use client';

import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ActivityCard, type Activity } from "./ActivityCard";
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Plus, Footprints, Sunrise, Sun, Sunset, Moon, Info, Pencil } from 'lucide-react';
import { Activities } from '@/app/trip-details/trips-types';
import MarkdownText from '../markdown/MarkdownText';
import { cn } from '@/lib/utils';

interface LinkableText {
  textKey: string;
  textFallback: string;
}

interface ItineraryDayCardProps {
  dayTitleKey: string;
  dayTitleFallback: string;
  date: string;
  activities: Activities;
  descriptionFallback: string;
  linkableTexts: LinkableText[];
  tipsKey: string;
  tipsFallback: string;
  dayno: Number;
  isEditMode?: boolean;
  onEditClick?: () => void;
  onCancelClick?: () => void;
  onLocationUpdate?: (oldLocation: string, newLocation: string) => void;
}

// Time period configuration with icons and colors
const timePeriods = [
  {
    key: 'morning' as keyof Activities,
    label: 'Morning',
    icon: Sunrise,
    emoji: '☀️',
    bgColor: 'bg-amber-50 dark:bg-amber-950/20',
    borderColor: 'border-amber-200 dark:border-amber-800',
    iconColor: 'text-amber-600 dark:text-amber-400',
  },
  {
    key: 'afternoon' as keyof Activities,
    label: 'Afternoon',
    icon: Sun,
    emoji: '🌤️',
    bgColor: 'bg-orange-50 dark:bg-orange-950/20',
    borderColor: 'border-orange-200 dark:border-orange-800',
    iconColor: 'text-orange-600 dark:text-orange-400',
  },
  {
    key: 'evening' as keyof Activities,
    label: 'Evening',
    icon: Sunset,
    emoji: '🌙',
    bgColor: 'bg-violet-50 dark:bg-violet-950/20',
    borderColor: 'border-violet-200 dark:border-violet-800',
    iconColor: 'text-violet-600 dark:text-violet-400',
  },
  {
    key: 'night' as keyof Activities,
    label: 'Night',
    icon: Moon,
    emoji: '🌃',
    bgColor: 'bg-indigo-50 dark:bg-indigo-950/20',
    borderColor: 'border-indigo-200 dark:border-indigo-800',
    iconColor: 'text-indigo-600 dark:text-indigo-400',
  },
];

// Helper to escape regex special characters
function escapeRegex(string: string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export function ItineraryDayCard({
  dayTitleKey,
  dayTitleFallback,
  date,
  activities,
  descriptionFallback,
  linkableTexts,
  tipsKey,
  tipsFallback,
  dayno,
  isEditMode = false,
  onEditClick,
  onCancelClick,
  onLocationUpdate
}: ItineraryDayCardProps) {
  const { getTranslation } = useLanguage();
  const [accordionValue, setAccordionValue] = React.useState<string>("");
  const [wasInEditMode, setWasInEditMode] = React.useState<boolean>(false);
  
  // Auto-expand accordion when edit mode is activated
  React.useEffect(() => {
    if (isEditMode) {
      setAccordionValue("item-1");
      setWasInEditMode(true);
    } else if (wasInEditMode && !isEditMode) {
      // Keep accordion open after save/cancel - don't collapse it
      // Only allow user to manually close it
      setWasInEditMode(false);
    }
  }, [isEditMode, wasInEditMode]);

  // const formatDescription = (textToFormat: string, linksToApply: LinkableText[]) => {
  //   // const translatedText = getTranslation(descriptionKey, textToFormat);
  //   const translatedLinks = linksToApply.map(link => ({
  //     original: getTranslation(link.textKey, link.textFallback),
  //     key: link.textKey, // for unique key in map
  //   }));

  //   if (translatedLinks.length === 0) return [translatedText];

  //   const regexParts = translatedLinks.map(link => escapeRegex(link.original));
  //   const regex = new RegExp(`(${regexParts.join('|')})`, 'g');

  //   const elements: (string | JSX.Element)[] = [];
  //   let lastIndex = 0;
  //   let match;

  //   while ((match = regex.exec(translatedText)) !== null) {
  //     const matchedText = match[0];

  //     if (match.index > lastIndex) {
  //       elements.push(translatedText.substring(lastIndex, match.index));
  //     }
  //     elements.push(
  //       <a href="#" key={`link-${match.index}-${matchedText}`} className="text-primary hover:underline">
  //         {matchedText}
  //       </a>
  //     );
  //     lastIndex = regex.lastIndex;
  //   }

  //   if (lastIndex < translatedText.length) {
  //     elements.push(translatedText.substring(lastIndex));
  //   }
  //   return elements;
  // };


  return (
    <Accordion 
      type="single" 
      collapsible 
      className="w-full mb-6"
      value={accordionValue}
      onValueChange={setAccordionValue}
    >
      <AccordionItem value="item-1" className="border border-border rounded-lg overflow-hidden bg-card shadow-sm hover:shadow-md transition-shadow">
        <AccordionTrigger className="hover:no-underline py-4 px-5 bg-gradient-to-r from-primary/5 to-accent/5 hover:from-primary/10 hover:to-accent/10 transition-colors">
          <div className="flex justify-between items-center w-full">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center min-w-[60px] h-10 px-3 rounded-full bg-primary text-primary-foreground font-bold text-sm shadow-sm">
                Day {dayno.toString()}
              </div>
              <div className="text-left">
                <h4 className="text-base font-semibold text-foreground">
                  {dayTitleKey}
                </h4>
                <span className="text-xs text-muted-foreground">{date}</span>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-full hover:bg-primary/10 hover:text-primary transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                if (isEditMode) {
                  // If already in edit mode, cancel the edit
                  onCancelClick?.();
                } else {
                  // Otherwise, start edit mode
                  setAccordionValue("item-1"); // Expand accordion
                  onEditClick?.();
                }
              }}
              aria-label={isEditMode ? `Cancel editing Day ${dayno.toString()}` : `Edit Day ${dayno.toString()}`}
            >
              <Pencil className="h-4 w-4" />
            </Button>
          </div>
        </AccordionTrigger>
        
        <AccordionContent className="px-5 pt-4 pb-5 space-y-5">
          {/* Time-based activities */}
          <div className="space-y-4">
            {timePeriods.map((period) => {
              const activity = activities?.[period.key];
              if (!activity) return null;
              
              const Icon = period.icon;
              
              return (
                <div 
                  key={period.key} 
                  className={cn(
                    "rounded-lg border p-4 transition-all hover:shadow-sm",
                    period.borderColor,
                    period.bgColor
                  )}
                >
                  <div className="flex items-start gap-3">
                    {/* Icon */}
                    <div className={cn(
                      "flex-shrink-0 mt-0.5",
                      period.iconColor
                    )}>
                      <Icon className="h-5 w-5" />
                    </div>
                    
                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      {/* Time period header */}
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-base font-semibold text-foreground">
                          {period.emoji} {period.label}
                        </span>
                      </div>
                      
                      {/* Activity title */}
                      {activity.title && (
                        <h5 className="font-medium text-sm text-foreground mb-2">
                          {activity.title}
                        </h5>
                      )}
                      
                      {/* Activity description */}
                      <div className="text-sm text-muted-foreground leading-relaxed prose prose-sm max-w-none">
                        <MarkdownText 
                          text={activity.description} 
                          activitySlot={period.label}
                          isEditMode={isEditMode}
                          onLocationReplace={(oldText, newText) => {
                            if (onLocationUpdate) {
                              onLocationUpdate(oldText, newText);
                            }
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Tips section */}
          {tipsKey && (
            <div className="mt-5 p-4 rounded-lg bg-accent/10 border border-accent/20">
              <div className="flex items-start gap-3">
                <Info className="h-4 w-4 text-accent flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-semibold text-foreground mb-1">
                    💡 {getTranslation('tips', 'Tips')}
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {tipsKey}
                  </p>
                </div>
              </div>
            </div>
          )}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
