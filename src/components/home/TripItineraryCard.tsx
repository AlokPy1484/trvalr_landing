"use client";

import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

export const TripItineraryCard: React.FC = () => {
  return (
    <Card className="overflow-hidden rounded-xl w-full bg-card h-full flex flex-col border-none">
      <CardContent className="p-5 flex-grow flex flex-col overflow-y-auto space-y-4">
        <div className="pb-4 border-b border-border/50">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-headline text-lg font-semibold text-foreground">
              Day 1: Arrival and Relax in Tokyo
            </h3>
            <div className="flex items-center text-sm text-muted-foreground">
              <span>Fri, Mar 5</span>
            </div>
          </div>
          <p className="text-sm text-muted-foreground mb-2 line-clamp-3">
            Arrive in Tokyo after a long flight and check in at HOTEL CEN. Spend
            the evening settling in and enjoying a light stroll nearby. Have a
            romantic dinner at Sakura Tei, a cozy spot known for its delicious
            okonomiyaki and intimate atmosphere...
          </p>
        </div>

        <div className="p-4 rounded-lg border bg-background/50">
          <Badge
            variant="outline"
            className="mb-3 border-green-500 bg-green-500/10 text-green-700 dark:text-green-400 dark:border-green-700"
          >
            Airport Transfer
          </Badge>
          <div className="flex items-center gap-4">
            <Image
              src="https://images.unsplash.com/photo-1569154941061-e231b4725ef1?q=80&w=100&auto=format&fit=crop"
              alt="Airport tarmac view"
              width={100}
              height={60}
              className="rounded-md object-cover"
              style={{ width: "auto", height: "auto" }}
              data-ai-hint="airport tarmac"
            />
            <div className="flex-grow">
              <h4 className="font-semibold text-foreground text-sm">
                Private Airport Transfer
              </h4>
              <p className="text-xs text-muted-foreground mb-1">
                1 day • Private Group • Pickup available
              </p>
            </div>
          </div>
        </div>

        <div className="p-4 rounded-lg border bg-background/50">
          <Badge
            variant="outline"
            className="mb-3 border-blue-500 bg-blue-500/10 text-blue-700 dark:text-blue-400 dark:border-blue-700"
          >
            Accommodation
          </Badge>
          <div className="flex items-center gap-4">
            <Image
              src="https://images.unsplash.com/photo-1611892440504-42a792e24d32?q=80&w=100&auto=format&fit=crop"
              alt="Hotel room interior"
              width={100}
              height={60}
              className="rounded-md object-cover"
              style={{ width: "auto", height: "auto" }}
              data-ai-hint="hotel room interior"
            />
            <div className="flex-grow">
              <h4 className="font-semibold text-foreground text-sm">
                HOTEL CENTRAL
              </h4>
              <p className="text-xs text-muted-foreground mb-1">
                Shinjuku, Tokyo
              </p>
            </div>
          </div>
        </div>
        <div className="mt-auto pt-4 flex-shrink-0">
          <Button variant="outline" className="w-full">
            View Full Itinerary
            <ExternalLink className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
