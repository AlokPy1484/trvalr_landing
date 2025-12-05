"use client";

import Image from "next/image";
import React, { useRef } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface TripCardProps {
  imageUrl: string;
  imageAlt: string;
  aiHint: string;
  title: string;
  onClick: () => void;
  className?: string;
}

const TripCard: React.FC<TripCardProps> = ({
  imageUrl,
  imageAlt,
  aiHint,
  title,
  onClick,
  className,
}) => {
  return (
    <div
      className={cn(
        "relative w-72 h-96 flex-shrink-0 rounded-xl overflow-hidden shadow-lg group cursor-pointer transition-all duration-300 hover:shadow-2xl hover:-translate-y-1",
        className
      )}
      onClick={onClick}
    >
      <Image
        src={imageUrl}
        alt={imageAlt}
        fill
        className="object-cover transform group-hover:scale-105 transition-transform duration-300"
        data-ai-hint={aiHint}
        sizes="(max-width: 768px) 50vw, 33vw"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent group-hover:from-black/80 transition-all duration-300" />
      <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
        <h3 className="font-headline text-lg sm:text-xl font-semibold text-white">
          {title}
        </h3>
      </div>
    </div>
  );
};

export function TopTripsSection() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const topTrips = [
    {
      imageUrl:
        "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?q=80&w=800&auto=format&fit=crop",
      imageAlt: "Plaza de España in Seville, Spain",
      aiHint: "spain plaza",
      title: "Road Trip Through the South of Spain",
    },
    {
      imageUrl:
        "https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=800&auto=format&fit=crop",
      imageAlt: "Starry night sky over a mountain range",
      aiHint: "mountain stars",
      title: "Trekking the Swiss Alps",
    },
    {
      imageUrl:
        "https://images.unsplash.com/photo-1528181304800-259b08848526?q=80&w=800&auto=format&fit=crop",
      imageAlt: "Limestone karsts in Ha Long Bay, Vietnam",
      aiHint: "vietnam bay",
      title: "10 Days in Vietnam: Culture & Adventure",
    },
    {
      imageUrl:
        "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?q=80&w=800&auto=format&fit=crop",
      imageAlt:
        "Colorful houses on the cliffs of Positano, Amalfi Coast, Italy",
      aiHint: "amalfi coast",
      title: "Romantic Getaway in the Amalfi Coast",
    },
    {
      imageUrl:
        "https://images.unsplash.com/photo-1520106212299-d99c443e4568?q=80&w=800&auto=format&fit=crop",
      imageAlt: "A beautiful aerial view of Dubrovnik, Croatia",
      aiHint: "dubrovnik croatia aerial",
      title: "Ultimate Summer Escape to Croatia",
    },
    {
      imageUrl:
        "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?q=80&w=800&auto=format&fit=crop",
      imageAlt: "Aurora Borealis over a snowy landscape in Iceland",
      aiHint: "iceland aurora borealis",
      title: "Chasing the Northern Lights in Iceland",
    },
  ];

  const handleTripCardClick = (tripTitle: string) => {
    console.log(`TopTripsSection - TripCard clicked: ${tripTitle}`);
  };

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === "left" ? -350 : 350;
      scrollContainerRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="w-full py-16 md:py-20 lg:py-24">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-10 md:mb-12">
          <h2 className="font-headline text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground">
            Top Trips to Level Up Your Vacation Game
          </h2>
          <div className="hidden sm:flex items-center space-x-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => scroll("left")}
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => scroll("right")}
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>

        <div className="relative">
          <div
            ref={scrollContainerRef}
            className="flex space-x-6 overflow-x-auto pb-4 -mb-4 scrollbar-hide"
          >
            {topTrips.map((trip) => (
              <TripCard
                key={trip.title}
                imageUrl={trip.imageUrl}
                imageAlt={trip.imageAlt}
                aiHint={trip.aiHint}
                title={trip.title}
                onClick={() => handleTripCardClick(trip.title)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
