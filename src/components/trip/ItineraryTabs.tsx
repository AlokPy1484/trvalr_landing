
'use client';

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"; // Added TabsContent
import { CarFront, Anchor, Palmtree } from "lucide-react";
import { useLanguage } from '@/contexts/LanguageContext';
import { useEffect, useState, type ReactNode } from "react";
import { ItineraryData } from "@/app/trip-details/trips-types";

interface ItineraryTabsProps {
  children: ReactNode; // To accept TabsContent as children
  tripData:ItineraryData,
  setLocation:Function
  activeTab?: string;
  onTabChange?: (value: string) => void;
}

export function ItineraryTabs({ children, tripData, setLocation, activeTab: controlledActiveTab, onTabChange }: ItineraryTabsProps) {
  const { getTranslation } = useLanguage();
  const [internalActiveTab, setInternalActiveTab] = useState<string>("");
  
  // Use controlled tab if provided, otherwise use internal state
  const activeTab = controlledActiveTab !== undefined ? controlledActiveTab : internalActiveTab;
  const setActiveTab = (value: string) => {
    if (onTabChange) {
      onTabChange(value);
    } else {
      setInternalActiveTab(value);
    }
    setLocation(value);
  };
  
  const tabs = [
    { value: "nice", labelKey: "locationNice", fallbackLabel: "Nice", icon: CarFront, count: 1 },
    { value: "cannes", labelKey: "locationCannes", fallbackLabel: "Cannes", icon: Anchor, count: 2 },
    { value: "sttropez", labelKey: "locationStTropez", fallbackLabel: "Saint-Tropez", icon: Palmtree, count: 3 },
  ];
  
  useEffect(() => {
    if (tripData?.itinerary?.length) {
      // Only set initial tab if not controlled from outside
      if (controlledActiveTab === undefined && !internalActiveTab) {
        setInternalActiveTab(tripData.itinerary[0].location);
      }
    }
  }, [tripData, controlledActiveTab, internalActiveTab]);
  
  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <div className="overflow-x-auto scrollbar-hide">
        <TabsList className="flex gap-2 bg-muted p-1 rounded-lg min-w-max">
          {tripData?.itinerary?.map((tab, idx) => (
            <TabsTrigger
              key={idx}
              value={tab.location}
              className="flex items-center flex-shrink-0 gap-2 px-3 py-2 text-sm data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm rounded-md whitespace-nowrap"
            >
              <span className="bg-foreground text-background rounded-full h-5 w-5 flex items-center justify-center text-xs font-bold flex-shrink-0">
                {idx + 1}
              </span>
              {tab.location}
            </TabsTrigger>
          ))}
        </TabsList>
      </div>
      {children} {/* Render TabsContent here */}
    </Tabs>
  );
}
