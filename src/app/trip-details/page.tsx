'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Download, FileEdit, Check, Bookmark, BookmarkCheck, ChevronLeft, ChevronRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Header } from '@/components/layout/Header';
import { ItinerarySection } from '@/components/trip/ItinerarySection';
import { SubtleFooter } from '@/components/layout/SubtleFooter';
import { TripSubNav } from '@/components/trip/TripSubNav';
import type { DateRange } from "react-day-picker";
import { ItineraryData } from './trips-types';
import { formatDate, saveTrip, isTripSaved, deleteSavedTrip } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { exportItineraryToPDF } from '@/lib/pdfExport';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

// LIGHTBOX: Step 1 - Import the library and its styles
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import type { Slide } from "yet-another-react-lightbox";

const tripData = {
  titleKey: 'tripDetailsTitle',
  titleFallback: '7-Day Luxury Couple Escape French Riviera',
  tags: [
    { key: 'tripDetailsTagLuxuryCouple', fallback: 'Luxury couple', color: 'bg-blue-100 text-blue-800 border-blue-300' },
    { key: 'tripDetailsTagRomanticGetaway', fallback: 'Romantic getaway', color: 'bg-purple-100 text-purple-800 border-purple-300' },
    { key: 'tripDetailsTagFrenchRiviera', fallback: 'French riviera', color: 'bg-rose-100 text-rose-800 border-rose-300' },
  ],
  dateRangeKey: 'tripDetailsDateRange',
  dateRangeFallback: 'Jul 15 – 22',
  travelersKey: 'tripDetailsTravelers',
  travelersFallback: '2 travellers',
  travelerCount: 2,
  images: [
    { src: 'https://images.unsplash.com/photo-1568900661298-8a8b1a9a834d?q=80&w=800&h=600&fit=crop', alt: 'Stunning view of the calanques in Cassis, French Riviera', aiHint: 'cassis calanques', main: true },
    { src: 'https://images.unsplash.com/photo-1509291394229-9e0a69a40604?q=80&w=400&h=300&fit=crop', alt: 'Luxurious hotel room with a view of the Eiffel Tower', aiHint: 'luxury hotel paris' },
    { src: 'https://images.unsplash.com/photo-1533903333942-f01a085816e8?q=80&w=400&h=300&fit=crop', alt: 'Charming cobblestone street in Montmartre, Paris', aiHint: 'charming street paris' },
    { src: 'https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?q=80&w=400&h=300&fit=crop', alt: 'Vibrant display of fresh produce at a French market', aiHint: 'french market produce' },
    { src: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=400&h=300&fit=crop', alt: 'Cozy and romantic dinner setting in a French bistro', aiHint: 'romantic dinner bistro' },
    { src: 'https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?q=80&w=400&h=300&fit=crop', alt: 'People enjoying a sunny day on the beach in Nice, France', aiHint: 'nice beach' },
    { src: 'https://images.unsplash.com/photo-1564594738330-38de03a35b73?q=80&w=400&h=300&fit=crop', alt: 'Lush lavender fields in Provence, France at sunset', aiHint: 'provence lavender' },
  ],
  overviewTitleKey: 'tripDetailsOverviewTitle',
  overviewTitleFallback: 'Trip Overview',
  overviewTextKey: 'tripDetailsOverviewText',
  overviewTextFallback: "This 7-day luxury couple escape along the stunning French Riviera offers the perfect blend of romantic seaside strolls, luxurious accommodations, and exciting water adventures in iconic destinations like Nice, Cannes, and Saint-Tropez. Experience unforgettable moments of relaxation and connection while exploring vibrant old towns, pristine beaches, and breathtaking coastal views.",
  highlightsTitleKey: 'tripDetailsHighlightsTitle',
  highlightsTitleFallback: 'Highlights',
  highlights: [
    { key: 'tripDetailsHighlight1', fallback: "Stay at the iconic Hotel Le Negresco in Nice with elegant period decor" },
    { key: 'tripDetailsHighlight2', fallback: "Explore Nice's charming Old Town and vibrant Cours Saleya Flower Market" },
    { key: 'tripDetailsHighlight3', fallback: "Enjoy a scenic 2-hour drive along the French Riviera in a unique 3-wheel vehicle" },
    { key: 'tripDetailsHighlight4', fallback: "Private boat trip to Lerins Islands and Cap d'Antibes in Cannes" },
  ],
  actionButtons: [
    { icon: Download, labelKey: 'tripDetailsActionDownload', fallback: 'Download' },
    { icon: FileEdit, labelKey: 'tripDetailsActionNote', fallback: 'Note' },
    { icon: Bookmark, labelKey: 'tripDetailsActionSave', fallback: 'Save' },
  ],
  budgetValue: 'Luxury',
  tripItemCount: 40,
};

// LIGHTBOX: Step 2 - Add the custom slide component for consistent sizing
function ConsistentSizedSlide({ slide }: { slide: Slide }) {
    return (
        <div className="flex h-full w-full items-center justify-center">
            <div className="relative aspect-video w-full max-w-4xl">
                <Image
                    fill
                    alt={slide.alt || ""}
                    src={slide.src}
                    loading="eager"
                    draggable={false}
                    className="object-contain"
                    sizes="(max-width: 768px) 100vw, 50vw"
                />
            </div>
        </div>
    );
}


export default function TripDetailsPage() {
  const { getTranslation } = useLanguage();
  const router = useRouter();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = React.useState('');
  const [isScrolled, setIsScrolled] = React.useState(false);

  // LIGHTBOX: Step 3 - Add state to manage the lightbox
  const [lightboxIndex, setLightboxIndex] = React.useState(-1);
  
  // Mobile carousel state
  const [currentImageIndex, setCurrentImageIndex] = React.useState(0);
  const [touchStart, setTouchStart] = React.useState<number | null>(null);
  const [touchEnd, setTouchEnd] = React.useState<number | null>(null);
  
  // Minimum swipe distance (in pixels)
  const minSwipeDistance = 50;
  
  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };
  
  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };
  
  const onTouchEnd = () => {
    if (!touchStart || !touchEnd || !tripDetails?.images) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    
    if (isLeftSwipe) {
      setCurrentImageIndex((prev) => 
        prev === tripDetails.images.length - 1 ? 0 : prev + 1
      );
    }
    if (isRightSwipe) {
      setCurrentImageIndex((prev) => 
        prev === 0 ? tripDetails.images.length - 1 : prev - 1
      );
    }
  };

  // State for the interactive sub-nav
  const [tripDetails, setTripDetails] = useState<ItineraryData | null>();
  const [location, setLocation] = React.useState(tripData.tags.find(t => t.key === 'tripDetailsTagFrenchRiviera')?.fallback || 'French Riviera');
  const [dateRange, setDateRange] = React.useState<DateRange | undefined>({ from: tripDetails?.start_date, to: tripDetails?.end_date });
  const [adults, setAdults] = React.useState(tripDetails?.travellers);
  const [children, setChildren] = React.useState(0);
  const [budget, setBudget] = React.useState('luxury');
  const [savedTripId, setSavedTripId] = React.useState<string | null>(null);
  const [showSaveDialog, setShowSaveDialog] = React.useState(false);
  const [makePublic, setMakePublic] = React.useState(false);
  const [showNoteDialog, setShowNoteDialog] = React.useState(false);
  const [itineraryNote, setItineraryNote] = React.useState<string>('');

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    console.log("Hello trip details page: ")
    if (typeof window !== "undefined") {
      const savedData = localStorage.getItem("itineraryData")
      if (savedData) {
        const parsedData = JSON.parse(savedData) as ItineraryData;
        setTripDetails(parsedData);
        setAdults(parsedData?.travellers);
        
        // Check if trip is already saved
        const tripId = isTripSaved(parsedData);
        setSavedTripId(tripId);

        // Load saved note
        const savedNote = localStorage.getItem(`itineraryNote_${parsedData.title}`);
        if (savedNote) {
          setItineraryNote(savedNote);
        }
      } else {
        router.push("/")
      }
    }
    return () => window.removeEventListener('scroll', handleScroll);
  }, [router]);
  
  // Reset carousel index when trip details change
  React.useEffect(() => {
    setCurrentImageIndex(0);
  }, [tripDetails?.title]);

  const handleHeaderSearchSubmit = () => {
    console.log('Header search submitted:', searchQuery);
  };

  // Handle save/unsave trip
  const handleSaveTrip = () => {
    if (!tripDetails) return;
    
    if (savedTripId) {
      // Unsave trip
      const success = deleteSavedTrip(savedTripId);
      if (success) {
        setSavedTripId(null);
        toast({
          title: "Trip Unsaved",
          description: "Trip has been removed from your saved trips.",
        });
      }
    } else {
      // Show dialog to ask if user wants to make it public
      setShowSaveDialog(true);
    }
  };

  const handleConfirmSave = () => {
    if (!tripDetails) return;
    
    const promptInput = localStorage.getItem("promptInput") || undefined;
    // Get user info (in a real app, this would come from auth context)
    const userId = localStorage.getItem('userId') || `user_${Date.now()}`;
    const userName = localStorage.getItem('userName') || 'Anonymous User';
    
    const tripId = saveTrip(tripDetails, promptInput, makePublic, userId, userName);
    setSavedTripId(tripId);
    setShowSaveDialog(false);
    setMakePublic(false);
    
    toast({
      title: "Trip Saved",
      description: makePublic 
        ? "Your trip has been saved and shared publicly on Trailboard!" 
        : "Your trip has been saved! You can access it from My Trips.",
    });
  };

  // Handle PDF download
  const handleDownloadPDF = async () => {
    if (!tripDetails) {
      toast({
        title: "Error",
        description: "Trip details not available for export.",
        variant: "destructive",
      });
      return;
    }
    
    try {
      toast({
        title: "Generating PDF",
        description: "Please wait while we create your itinerary PDF...",
      });
      
      await exportItineraryToPDF(tripDetails, itineraryNote);
      
      toast({
        title: "PDF Exported",
        description: "Your itinerary has been exported as a PDF file.",
      });
    } catch (error) {
      console.error('PDF export error:', error);
      toast({
        title: "Export Failed",
        description: "There was an error exporting your itinerary. Please try again.",
        variant: "destructive",
      });
    }
  };

  // Handle note save
  const handleSaveNote = () => {
    if (!tripDetails) return;
    
    localStorage.setItem(`itineraryNote_${tripDetails.title}`, itineraryNote);
    setShowNoteDialog(false);
    
    toast({
      title: "Note Saved",
      description: "Your note has been saved to this itinerary.",
    });
  };

  // LIGHTBOX: Step 4 - Add the function to open the lightbox at a specific image
  const openLightbox = (imageSrc: string) => {
    if (!tripDetails?.images) return;
    const imageIndex = tripDetails.images.findIndex(img => img.full === imageSrc);
    if (imageIndex > -1) {
        setLightboxIndex(imageIndex);
    }
  };


  const mainImage = tripData.images.find(img => img.main) || tripData.images[0];
  const galleryImages = tripData.images.filter(img => !img.main).slice(0, 4);
  const remainingImageCount = tripData.images.length - 1 - galleryImages.length;
  const badgeColors = [
    'bg-blue-100 text-blue-800 border-blue-300',
    'bg-purple-100 text-purple-800 border-purple-300',
    'bg-rose-100 text-rose-800 border-rose-300',
    'bg-green-100 text-green-800 border-green-300',
    'bg-yellow-100 text-yellow-800 border-yellow-300',
  ];
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-primary/10 via-background to-accent/10">
      <Header
        isScrolled={isScrolled}
        searchQuery={searchQuery}
        onSearchQueryChange={setSearchQuery}
        onSearchSubmit={handleHeaderSearchSubmit}
        showCurrencySelector={false}
      />
      <TripSubNav
        title={tripDetails?.title}
        itemCount={tripData.tripItemCount}
        location={tripDetails?.destination}
        onLocationChange={setLocation}
        dateRange={{ from: tripDetails?.start_date, to: tripDetails?.end_date }}
        onDateRangeChange={setDateRange}
        adults={adults}
        onAdultsChange={setAdults}
        children={children}
        onChildrenChange={setChildren}
        budget={budget}
        onBudgetChange={setBudget}
        tripDetails={tripDetails}
        setTripDetails={setTripDetails}
      />
      <main className="flex-grow py-4 sm:py-6 md:py-8 lg:py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">

          <section className="grid grid-cols-1 md:grid-cols-5 gap-4 sm:gap-6 md:gap-x-8 md:gap-y-6 mb-6 sm:mb-8 md:mb-12">
            <div className="md:col-span-2 flex flex-col order-1">
              <h1 className="font-headline text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-3 sm:mb-4">
                {tripDetails?.title}
              </h1>
              <div className="flex flex-wrap items-center gap-2 mb-2 sm:mb-3">
                {tripDetails?.trip_type?.map((tag, idx) => {
                  const colorClass = badgeColors[idx % badgeColors.length];
                  return (
                    <Badge key={idx} variant="outline" className={`font-medium text-xs sm:text-sm ${colorClass}`}>
                      {tag}
                    </Badge>
                  )
                }

                )}
              </div>
              <div className="flex flex-wrap items-center text-xs sm:text-sm text-muted-foreground mb-4 sm:mb-6">
                <span>
                  {formatDate(tripDetails?.start_date ?? "").slice(0, -5) + " - " + formatDate(tripDetails?.end_date ?? "").slice(0, -5)}
                </span>
                <span className="mx-2">·</span>
                <span>
                  {`${tripDetails?.travellers ?? 0} ${(tripDetails?.travellers ?? 0) > 1 ? " travellers" : " traveller"}`}
                </span>
              </div>
              <div className="flex items-center gap-2 sm:space-x-2">
                {tripData.actionButtons.map((btn) => {
                  // Special handling for Save button
                  if (btn.labelKey === 'tripDetailsActionSave') {
                    const isSaved = savedTripId !== null;
                    return (
                      <Button
                        key={btn.labelKey}
                        variant={isSaved ? "default" : "outline"}
                        size="icon"
                        className={`rounded-full h-9 w-9 sm:h-10 sm:w-10 ${isSaved ? 'bg-primary hover:bg-primary/90' : 'border-border hover:bg-muted/50'}`}
                        aria-label={isSaved ? 'Unsave Trip' : getTranslation(btn.labelKey, btn.fallback)}
                        onClick={handleSaveTrip}
                      >
                        {isSaved ? (
                          <BookmarkCheck className="h-4 w-4 sm:h-5 sm:w-5 text-primary-foreground" />
                        ) : (
                          <Bookmark className="h-4 w-4 sm:h-5 sm:w-5 text-foreground/80" />
                        )}
                      </Button>
                    );
                  }
                  
                  // Handle Download button
                  if (btn.labelKey === 'tripDetailsActionDownload') {
                    return (
                      <Button
                        key={btn.labelKey}
                        variant="outline"
                        size="icon"
                        className="rounded-full h-9 w-9 sm:h-10 sm:w-10 border-border hover:bg-muted/50"
                        aria-label={getTranslation(btn.labelKey, btn.fallback)}
                        onClick={handleDownloadPDF}
                      >
                        <btn.icon className="h-4 w-4 sm:h-5 sm:w-5 text-foreground/80" />
                      </Button>
                    );
                  }
                  
                  // Handle Note button
                  if (btn.labelKey === 'tripDetailsActionNote') {
                    return (
                      <Button
                        key={btn.labelKey}
                        variant="outline"
                        size="icon"
                        className="rounded-full h-9 w-9 sm:h-10 sm:w-10 border-border hover:bg-muted/50"
                        aria-label={getTranslation(btn.labelKey, btn.fallback)}
                        onClick={() => setShowNoteDialog(true)}
                      >
                        <btn.icon className="h-4 w-4 sm:h-5 sm:w-5 text-foreground/80" />
                      </Button>
                    );
                  }
                  
                  return null;
                })}
              </div>
            </div>


            {/* Mobile Carousel View */}
            <div className="md:hidden w-full order-2">
              <div className="relative aspect-[4/3] rounded-lg overflow-hidden shadow-lg">
                {tripDetails?.images && tripDetails.images.length > 0 && (
                  <>
                    <div 
                      className="relative w-full h-full cursor-pointer"
                      onClick={() => openLightbox(tripDetails.images[currentImageIndex].full)}
                      onTouchStart={onTouchStart}
                      onTouchMove={onTouchMove}
                      onTouchEnd={onTouchEnd}
                    >
                      <Image
                        src={tripDetails.images[currentImageIndex].full}
                        alt={`Trip image ${currentImageIndex + 1}`}
                        fill
                        className="object-cover"
                        priority={currentImageIndex === 0}
                        sizes="100vw"
                      />
                      {/* Image counter overlay */}
                      <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm text-white text-xs font-medium px-2 py-1 rounded-full">
                        {currentImageIndex + 1} / {tripDetails.images.length}
                      </div>
                    </div>
                    
                    {/* Navigation buttons */}
                    {tripDetails.images.length > 1 && (
                      <>
                        <Button
                          variant="secondary"
                          size="icon"
                          className="absolute left-2 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-sm border-0"
                          onClick={(e) => {
                            e.stopPropagation();
                            setCurrentImageIndex((prev) => 
                              prev === 0 ? tripDetails.images.length - 1 : prev - 1
                            );
                          }}
                        >
                          <ChevronLeft className="h-5 w-5 text-white" />
                        </Button>
                        <Button
                          variant="secondary"
                          size="icon"
                          className="absolute right-2 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-sm border-0"
                          onClick={(e) => {
                            e.stopPropagation();
                            setCurrentImageIndex((prev) => 
                              prev === tripDetails.images.length - 1 ? 0 : prev + 1
                            );
                          }}
                        >
                          <ChevronRight className="h-5 w-5 text-white" />
                        </Button>
                        
                        {/* Dots indicator */}
                        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                          {tripDetails.images.map((_, index) => (
                            <button
                              key={index}
                              onClick={(e) => {
                                e.stopPropagation();
                                setCurrentImageIndex(index);
                              }}
                              className={`h-1.5 rounded-full transition-all ${
                                index === currentImageIndex
                                  ? 'w-6 bg-white'
                                  : 'w-1.5 bg-white/50 hover:bg-white/75'
                              }`}
                              aria-label={`Go to image ${index + 1}`}
                            />
                          ))}
                        </div>
                      </>
                    )}
                  </>
                )}
              </div>
            </div>

            {/* Desktop Grid View */}
            <div className="hidden md:grid md:col-span-3 grid-cols-2 gap-1.5 sm:gap-2 rounded-lg sm:rounded-xl overflow-hidden shadow-lg w-full min-h-[200px] sm:min-h-[300px] md:min-h-0 order-2">
              {/* Left: Main Image */}
              {/* LIGHTBOX: Step 5 - Add onClick to the image containers */}
              <div className="relative aspect-[4/3] md:aspect-auto cursor-pointer min-h-[150px] sm:min-h-[200px] overflow-hidden" onClick={() => tripDetails?.images?.[0] && openLightbox(tripDetails.images[0].full)}>
                {tripDetails?.images?.[0] && (
                  <Image
                    src={tripDetails.images[0].full}
                    alt="Main trip image"
                    fill
                    className="object-cover"
                    priority
                    sizes="(max-width: 640px) 50vw, (max-width: 768px) 50vw, 50vw"
                  />
                )}
              </div>

              {/* Right: 4 smaller images */}
              <div className="grid grid-cols-2 gap-1.5 sm:gap-2">
                {tripDetails?.images?.slice(1, 5).map((image: any, index: number) => (
                  // LIGHTBOX: Step 5 - Add onClick to the image containers
                  <div key={index} className="relative aspect-square cursor-pointer min-h-[75px] sm:min-h-[100px] overflow-hidden" onClick={() => openLightbox(image.full)}>
                    <Image
                      src={image.full}
                      alt={`trip-image-${index + 1}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 25vw, (max-width: 768px) 25vw, 25vw"
                    />
                    {/* Overlay count if more than 5 */}
                    {index === 3 && tripDetails.images.length > 5 && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white text-sm sm:text-lg md:text-xl font-bold">
                        +{tripDetails.images.length - 5}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

          </section>

          <section className="mb-6 sm:mb-8 md:mb-12">
            <h2 className="font-headline text-xl sm:text-2xl md:text-3xl font-semibold text-foreground mb-3 sm:mb-4">
              {getTranslation(tripData.overviewTitleKey, tripData.overviewTitleFallback)}
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              {tripDetails?.description}
            </p>
          </section>

          <section className="mb-6 sm:mb-8 md:mb-12">
            <h2 className="font-headline text-xl sm:text-2xl md:text-3xl font-semibold text-foreground mb-4 sm:mb-6">
              {getTranslation(tripData.highlightsTitleKey, tripData.highlightsTitleFallback)}
            </h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 sm:gap-x-6 md:gap-x-8 gap-y-3 sm:gap-y-4">
              {tripDetails?.highlights.map((highlight, idx) => (
                <li key={idx} className="flex items-start">
                  <Check className="h-5 w-5 sm:h-6 sm:w-6 text-primary mr-2 sm:mr-3 flex-shrink-0 mt-0.5 sm:mt-1" />
                  <span className="text-sm sm:text-base text-foreground">
                    {highlight}
                  </span>
                </li>
              ))}
            </ul>
          </section>

          <ItinerarySection 
            tripDetails={tripDetails} 
            tripTitle={getTranslation(tripData.titleKey, tripData.titleFallback)} 
            tripDateRange={getTranslation(tripData.dateRangeKey, tripData.dateRangeFallback)}
            onTripDetailsUpdate={(updatedTripDetails) => {
              setTripDetails(updatedTripDetails);
              // Also update localStorage
              localStorage.setItem("itineraryData", JSON.stringify(updatedTripDetails));
            }}
          />

        </div>
      </main>
      <SubtleFooter />

      {/* LIGHTBOX: Step 6 - Render the Lightbox component */}
      <Lightbox
          open={lightboxIndex > -1}
          index={lightboxIndex}
          close={() => setLightboxIndex(-1)}
          slides={tripDetails?.images?.map(img => ({ src: img.full, alt: `Trip Image` })) || []}
          render={{ slide: ConsistentSizedSlide }}
          styles={{
              container: {
                  backgroundColor: "rgba(0, 0, 0, 0.7)",
                  backdropFilter: "blur(8px)",
                  WebkitBackdropFilter: "blur(8px)",
              },
          }}
      />

      {/* Save Trip Dialog */}
      <Dialog open={showSaveDialog} onOpenChange={setShowSaveDialog}>
        <DialogContent className="max-w-[95vw] sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-lg sm:text-xl">Save Trip</DialogTitle>
            <DialogDescription className="text-sm">
              Save this trip to your collection. You can also share it publicly on Trailboard for others to discover and rate.
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-start sm:items-center gap-2 sm:space-x-2 py-4">
            <Checkbox 
              id="makePublic" 
              checked={makePublic}
              onCheckedChange={(checked) => setMakePublic(checked as boolean)}
              className="mt-1 sm:mt-0"
            />
            <Label 
              htmlFor="makePublic" 
              className="text-xs sm:text-sm font-normal cursor-pointer leading-relaxed"
            >
              Make this trip publicly available on Trailboard
            </Label>
          </div>
          <DialogFooter className="flex-col sm:flex-row gap-2 sm:gap-0">
            <Button variant="outline" onClick={() => {
              setShowSaveDialog(false);
              setMakePublic(false);
            }} className="w-full sm:w-auto">
              Cancel
            </Button>
            <Button onClick={handleConfirmSave} className="w-full sm:w-auto">
              Save Trip
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Note Dialog */}
      <Dialog open={showNoteDialog} onOpenChange={setShowNoteDialog}>
        <DialogContent className="max-w-[95vw] sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="text-lg sm:text-xl">Add Note to Itinerary</DialogTitle>
            <DialogDescription className="text-sm">
              Save personal notes, reminders, or additional information about this trip.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Textarea
              placeholder="Add your notes here... (e.g., packing reminders, restaurant reservations, special requests)"
              value={itineraryNote}
              onChange={(e) => setItineraryNote(e.target.value)}
              className="min-h-[120px] sm:min-h-[150px] text-sm sm:text-base"
            />
          </div>
          <DialogFooter className="flex-col sm:flex-row gap-2 sm:gap-0">
            <Button variant="outline" onClick={() => setShowNoteDialog(false)} className="w-full sm:w-auto">
              Cancel
            </Button>
            <Button onClick={handleSaveNote} className="w-full sm:w-auto">
              Save Note
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}