"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plane, Bed, Sparkles, Map, Wand2, ArrowRight } from "lucide-react";
import { HotelDealsCard } from "./HotelDealsCard";
import { TripItineraryCard } from "./TripItineraryCard";
import { cn } from "@/lib/utils";

// Redesigned Destination Card for the Inspiration section
const DestinationCard: React.FC<{
  imageUrl: string;
  imageAlt: string;
  aiHint: string;
  temperature: string;
  name: string;
  tags: string;
  description: string;
  flightPrice: string;
}> = ({
  imageUrl,
  imageAlt,
  aiHint,
  temperature,
  name,
  tags,
  description,
  flightPrice,
}) => (
  <Card className="overflow-hidden rounded-xl shadow-lg w-full group bg-card h-full flex flex-col border-none">
    <CardHeader className="p-0 flex-shrink-0">
      <div className="aspect-[4/5] relative w-full">
        <Image
          src={imageUrl}
          alt={imageAlt}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          data-ai-hint={aiHint}
          sizes="(max-width: 640px) 100vw, 50vw"
        />
      </div>
    </CardHeader>
    <CardContent className="p-4 flex flex-col flex-grow">
      <div className="flex items-center text-xs text-muted-foreground mb-1">
        <Sparkles className="h-4 w-4 mr-1 text-yellow-500" />
        <span>{temperature}</span>
      </div>
      <h3 className="font-semibold text-lg text-foreground mb-1">{name}</h3>
      <p className="text-xs text-muted-foreground mb-2">{tags}</p>
      <p className="text-sm text-foreground/80 mb-3 flex-grow">{description}</p>
      <p className="font-semibold text-base text-foreground mt-auto">
        {flightPrice}
      </p>
    </CardContent>
  </Card>
);

// Component to wrap the two destination cards
const InspirationResult: React.FC = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full h-full">
    <DestinationCard
      imageUrl="https://images.unsplash.com/photo-1473580044384-7ba9967e16a0?q=80&w=600&auto=format&fit=crop"
      imageAlt="Giraffes on the Tanzanian savanna at sunset"
      aiHint="tanzania safari giraffes"
      temperature="30°C"
      name="Babati, Tanzania"
      tags="Nature, Culture, Adventure"
      description="Home to Serengeti National Park and Mount Kilimanjaro."
      flightPrice="$ 1149 flight"
    />
    <DestinationCard
      imageUrl="https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?q=80&w=600&auto=format&fit=crop"
      imageAlt="Elephants in front of Mount Kilimanjaro in Kenya"
      aiHint="kenya safari elephants"
      temperature="27°C"
      name="Nairobi, Kenya"
      tags="Wildlife Safari, Cultural Diversity"
      description="Famous for its classic savanna safaris and diverse wildlife."
      flightPrice="$ 784 flight"
    />
  </div>
);

const examples = {
  inspiration: {
    icon: Sparkles,
    label: "Inspiration",
    ask: "Show me where I can go for a safari in Africa with my family.",
    result: <InspirationResult />,
  },
  flights: {
    icon: Plane,
    label: "Flights",
    ask: "Show me the top flight deals available right now.",
    result: <div className="p-4 text-center text-muted-foreground">Flight search interface coming soon...</div>,
  },
  hotels: {
    icon: Bed,
    label: "Hotels",
    ask: "Search for a luxury hotel in Dubai with a view of the Burj Khalifa.",
    result: <HotelDealsCard />,
  },
  trips: {
    icon: Map,
    label: "Trips",
    ask: "Build a 10-day romantic trip to Japan for the cherry blossoms.",
    result: <TripItineraryCard />,
  },
};

type ExampleKey = keyof typeof examples;

export function MidSection() {
  const [activeKey, setActiveKey] = useState<ExampleKey>("inspiration");

  const keys = Object.keys(examples) as ExampleKey[];

  /*  useEffect(() => {
    const interval = setInterval(() => {
      setActiveKey(prevKey => {
        const currentIndex = keys.indexOf(prevKey);
        const nextIndex = (currentIndex + 1) % keys.length;
        return keys[nextIndex];
      });
    }, 5000); // Change card every 5 seconds

    return () => clearInterval(interval);
  }, [keys]); */

  return (
    <section className="w-full py-12 sm:py-16 md:py-20 lg:py-24 overflow-x-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl w-full">
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
          {/* Left Column: Controls */}
          <div className="max-w-md mx-auto lg:mx-0 text-center lg:text-left">
            <Wand2 className="h-10 w-10 text-primary mx-auto lg:mx-0 mb-4" />
            <h2 className="font-headline text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-4">
              What can you ask me?
            </h2>
            <p className="text-muted-foreground text-base sm:text-lg md:text-xl mb-8">
              Select a category to see how trvalr can handle any travel request,
              from broad inspiration to detailed planning.
            </p>
            <div className="flex flex-col gap-4">
              {keys.map((key) => {
                const ex = examples[key];
                const Icon = ex.icon;
                return (
                  <Button
                    key={key}
                    className={cn(
                      "group w-full justify-start p-4 h-auto text-left transition-all duration-300 transform hover:scale-105",
                      activeKey === key
                        ? "bg-primary/90 text-primary-foreground shadow-lg"
                        : "bg-card/50 hover:bg-card/90 hover:border-primary/50"
                    )}
                    onClick={() => setActiveKey(key)}
                  >
                    <div className="flex items-center gap-4">
                      <Icon className="h-6 w-6 flex-shrink-0" />
                      <div>
                        <p className="font-semibold">{ex.label}</p>
                        <p
                          className={cn(
                            "text-xs",
                            activeKey === key
                              ? "text-primary-foreground/80"
                              : "text-muted-foreground"
                          )}
                        >
                          {ex.ask}
                        </p>
                      </div>
                    </div>
                    <ArrowRight
                      className={cn(
                        "h-5 w-5 ml-auto transition-transform",
                        activeKey === key
                          ? "translate-x-0"
                          : "-translate-x-2 opacity-0 group-hover:opacity-100"
                      )}
                    />
                  </Button>
                );
              })}
            </div>
          </div>

          {/* Right Column: Animated Card Stack */}
          <div className="relative h-[400px] sm:h-[500px] md:h-[550px] lg:h-[600px] w-full overflow-hidden">
            {keys.map((key, index) => {
              const isActive = activeKey === key;
              const activeOffset = keys.indexOf(activeKey);

              let offset = index - activeOffset;
              const len = keys.length;

              // Handle wrapping around for smoother circular transitions
              if (Math.abs(offset) > len / 2) {
                offset = offset > 0 ? offset - len : offset + len;
              }

              let transform = "";
              if (offset !== 0) {
                transform = `rotate(${offset * 2}deg) translateY(${
                  Math.abs(offset) * 20
                }px) scale(${1 - Math.abs(offset) * 0.05})`;
              }

              const zIndex = keys.length - Math.abs(offset);

              return (
                <div
                  key={key}
                  className="absolute w-full h-full transition-all duration-500 ease-in-out"
                  style={{
                    zIndex: isActive ? keys.length + 1 : zIndex,
                    transform: transform,
                    opacity: isActive || Math.abs(offset) < 3 ? 1 : 0,
                    pointerEvents: isActive ? "auto" : "none",
                  }}
                >
                  <div className="bg-card/30 backdrop-blur-lg p-2 rounded-2xl shadow-2xl border border-border/20 w-full h-full">
                    {examples[key].result}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
