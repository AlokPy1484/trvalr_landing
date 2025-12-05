"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { Header } from "@/components/layout/Header";
import { HeroSection } from "@/components/home/HeroSection";
import { Footer } from "@/components/layout/Footer";
import { TravelExplorerSection } from "@/components/home/TravelExplorerSection";
import { PromotionsSection } from "@/components/home/PromotionsSection";
import { RecommendedSection } from "@/components/home/RecommendedSection";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";

/* DEV importing mock data starts */
import { devPrompt } from "../../Dev_Itinerary_Obj.js";
/* DEV importing mock data ends */

// Lazy load below-the-fold sections
const FeaturesShowcaseSection = dynamic(
  () =>
    import("@/components/home/FeaturesShowcaseSection").then(
      (mod) => mod.FeaturesShowcaseSection
    ),
  { loading: () => <Skeleton className="h-[500px] w-full" /> }
);
const TopTripsSection = dynamic(
  () =>
    import("@/components/home/TopTripsSection").then(
      (mod) => mod.TopTripsSection
    ),
  { loading: () => <Skeleton className="h-[500px] w-full" /> }
);
const EveryStepSection = dynamic(
  () =>
    import("@/components/home/EveryStepSection").then(
      (mod) => mod.EveryStepSection
    ),
  { loading: () => <Skeleton className="h-[600px] w-full" /> }
);

const SCROLL_THRESHOLD = 50;

type FailureResponse = {
  message: string;
  status: string;
};

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [tripQuery, setTripQuery] = useState("");
  const [sendBtnLoader, setSendBtnLoader] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showStickyNav, setShowStickyNav] = useState(false);

  const router = useRouter();
  const { toast } = useToast();
  const explorerSectionRef = useRef<HTMLDivElement>(null);

  const errorMessages: Record<string, string> = {
    DAYS_EXCEEDED:
      "Whoa there, marathoner! Trips longer than 30 days aren’t supported (yet 🏃‍♂️💨).",
    INVALID_DAYS: "Hmm… those days don’t add up. Double-check your math 🧮.",
    OFF_TOPIC_PROMPT:
      "Uh oh, looks like you wandered off the travel trail 🚧. Try a trip-related prompt!",
    LOCATION_NOT_FOUND:
      "I’d love to take you there… if only you told me where ✈️🌍.",
    DATE_ALREADY_PASSED:
      "Back to the future? ⏳ That date has already passed, time traveler.",
    INTERNAL_SERVER_ERROR:
      "Server’s taking a coffee break ☕. Try again in a bit!",
  };

  const handleFailureCases = (failureData: FailureResponse) => {
    const description =
      errorMessages[failureData.message] || errorMessages.INTERNAL_SERVER_ERROR;
    const title = failureData.message.split("_").join(" ");
    toast({ title, description });
  };

  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY;
    setIsScrolled(currentScrollY > SCROLL_THRESHOLD);

    if (explorerSectionRef.current) {
      const { top } = explorerSectionRef.current.getBoundingClientRect();
      setShowStickyNav(top <= 80);
    }
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const handleHeaderSearchSubmit = () => {
    console.log("Header search submitted:", searchQuery);
  };

  const handleHeroTripQuerySubmit = async () => {
    if (!tripQuery.trim()) return;

    /* DEV If API limit is reached, use mock data starts */

    if (tripQuery == "dev") {
      alert("Mock data is being used");
      console.log(devPrompt);
      localStorage.setItem(
        "itineraryData",
        JSON.stringify(devPrompt.itineraryData)
      );
      localStorage.setItem("promptInput", devPrompt.promptInput);
      // cleanup any old checked hotels
      localStorage.removeItem("checkoutHotels");
      router.push("/trip-details");
      setSendBtnLoader(false);
      return;
    }

    /* DEV If API limit is reached, use mock data ends */

    setSendBtnLoader(true);
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/generate/itinerary`,
        { promptInput: tripQuery }
      );
      const data = response.data;

      if (data.status === "SUCCESS") {
        localStorage.setItem("itineraryData", JSON.stringify(data));
        localStorage.setItem("promptInput", tripQuery);
        // cleanup any old checked hotels
        localStorage.removeItem("checkoutHotels");
        router.push("/trip-details");
      } else {
        handleFailureCases(data);
      }
    } catch (e) {
      handleFailureCases({
        message: "INTERNAL_SERVER_ERROR",
        status: "FAILURE",
      });
    } finally {
      setSendBtnLoader(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-primary/10 via-background to-accent/10 overflow-x-hidden w-full">
      <Header
        isScrolled={isScrolled}
        searchQuery={searchQuery}
        onSearchQueryChange={setSearchQuery}
        onSearchSubmit={handleHeaderSearchSubmit}
        showCurrencySelector={false}
      />

      {/* <AnimatePresence>
        {showStickyNav && <StickyExplorerNav />}
      </AnimatePresence> */}

      <main className="flex-grow w-full overflow-x-hidden">
        <HeroSection
          tripQuery={tripQuery}
          onTripQueryChange={setTripQuery}
          onTripQuerySubmit={handleHeroTripQuerySubmit}
          sendBtnLoader={sendBtnLoader}
        />

        <div ref={explorerSectionRef} className="w-full overflow-x-hidden">
          <TravelExplorerSection />
        </div>

        <div className="w-full overflow-x-hidden">
          <PromotionsSection
            title="Promotions"
            promotions={[
              {
                id: '1',
                title: 'Travel Fest+',
                offer: 'Extra 10% off',
                cta: 'Limited Time Offer!',
                image: 'https://images.unsplash.com/photo-1547036967-23d11aacaee0?q=80&w=800&auto=format&fit=crop',
                country: 'Sri Lanka',
                countryFlag: '🇱🇰',
                brand: 'Travel Fest+',
                textColor: 'light',
              },
              {
                id: '2',
                title: 'Stone Wood Hotels',
                offer: 'Extra 10% off',
                cta: 'Stay & Save!',
                image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=800&auto=format&fit=crop',
                country: 'India',
                countryFlag: '🇮🇳',
                brand: 'STONE WOOD HOTELS & RESORTS',
                overlayColor: 'bg-teal-900/80',
                textColor: 'light',
              },
              {
                id: '3',
                title: 'Hosteper',
                offer: 'Up to 30% off',
                cta: 'Festive Sale!',
                image: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?q=80&w=800&auto=format&fit=crop',
                country: 'India',
                countryFlag: '🇮🇳',
                brand: 'HOSTEPER',
                overlayColor: 'bg-yellow-400/90',
                textColor: 'dark',
              },
            ]}
            viewAllLink="/stays"
            category="accommodation"
          />
        </div>

        <div className="w-full overflow-x-hidden">
          <RecommendedSection
            title="Recommended for you"
            items={[
              {
                id: 5,
                title: 'Mountain View Retreat',
                rating: 4.9,
                price: '$420/night',
                image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=600&h=600&fit=crop',
                hint: 'mountain retreat switzerland',
                href: '/stays/5',
              },
              {
                id: 6,
                title: 'Urban Tech Hub Hotel',
                rating: 4.7,
                price: '$340/night',
                image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?q=80&w=600&h=600&fit=crop',
                hint: 'modern hotel san francisco',
                href: '/stays/6',
              },
              {
                id: 7,
                title: 'Seaside Boutique Hotel',
                rating: 4.6,
                price: '$195/night',
                image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=600&h=600&fit=crop',
                hint: 'beachfront hotel nice',
                href: '/stays/7',
              },
              {
                id: 8,
                title: 'Rooftop Paradise',
                rating: 4.8,
                price: '$285/night',
                image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=600&h=600&fit=crop',
                hint: 'rooftop hotel paris',
                href: '/stays/8',
              },
            ]}
            category="stays"
            viewAllLink="/stays"
          />
        </div>

        <div className="w-full overflow-x-hidden">
          <FeaturesShowcaseSection />
        </div>
        <div className="w-full overflow-x-hidden">
          <TopTripsSection />
        </div>
        <div className="w-full overflow-x-hidden">
          <EveryStepSection />
        </div>
      </main>

      <Footer />
    </div>
  );
}
