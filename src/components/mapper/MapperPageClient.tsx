
'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Maximize, Save, Share2, PlayCircle, PauseCircle, Shrink, Download } from 'lucide-react';
import { FlightAnimator } from './FlightAnimator';
import { Header } from '@/components/layout/Header';
import { RouteEditorSidebar, type VisualOptions as SidebarVisualOptions } from './RouteEditorSidebar';
import { MapperIconStrip } from './MapperIconStrip';
import { cn } from '@/lib/utils';
import { SubtleFooter } from '@/components/layout/SubtleFooter';

const SCROLL_THRESHOLD = 50;

// Default visual options for FlightAnimator
const defaultVisualOptions: SidebarVisualOptions = {
  backgroundColor: '#0A0F1E', // Default dark blue
  speedFactor: 0.5, // Default 50% speed
  distanceUnit: 'km',
  mapTheme: 'night',
};


export function MapperPageClient() {
  const [isPlaying, setIsPlaying] = React.useState(true);
  const [isFullScreen, setIsFullScreen] = React.useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const flightAnimatorContainerRef = useRef<HTMLDivElement>(null);

  const [isPanelOpen, setIsPanelOpen] = useState(true);
  const [activePanelSection, setActivePanelSection] = useState<'route' | 'options'>('route');

  const [visualOptions, setVisualOptions] = useState<SidebarVisualOptions>(defaultVisualOptions);

  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY;
    setIsScrolled(currentScrollY > SCROLL_THRESHOLD);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const handleHeaderSearchSubmit = () => {
    console.log('Header search submitted on Mapper page:', searchQuery);
  };

  const handleVisualOptionsChange = useCallback((newOptions: Partial<SidebarVisualOptions>) => {
    setVisualOptions(prevOptions => ({ ...prevOptions, ...newOptions }));
  }, []);
  
  const handleExportAnimation = () => {
    console.log("Attempting to export animation with options:", visualOptions);
    alert("Video export functionality is under development. Current options logged to console.");
  };

  const toggleFullScreen = async () => {
    const element = flightAnimatorContainerRef.current;
    if (!element) return;

    if (!document.fullscreenElement) {
      try {
        await element.requestFullscreen();
        setIsFullScreen(true);
      } catch (err) {
        console.error(`Error attempting to enable full-screen mode: ${err?.message} (${err?.name})`);
        setIsFullScreen(false);
      }
    } else {
      if (document.exitFullscreen) {
        try {
          await document.exitFullscreen();
          setIsFullScreen(false);
        } catch (err) {
          console.error(`Error attempting to exit full-screen mode: ${err?.message} (${err?.name})`);
        }
      }
    }
  };
  
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullScreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const handleIconStripClick = (section: 'route' | 'options') => {
    if (isPanelOpen && activePanelSection === section) {
      setIsPanelOpen(false);
    } else {
      setActivePanelSection(section);
      setIsPanelOpen(true);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-background text-foreground overflow-hidden">
      <Header
        isScrolled={isScrolled}
        searchQuery={searchQuery}
        onSearchQueryChange={setSearchQuery}
        onSearchSubmit={handleHeaderSearchSubmit}
        showCurrencySelector={false}
      />
      <div className="flex flex-1 overflow-hidden">
        <MapperIconStrip 
          onRouteClick={() => handleIconStripClick('route')}
          onOptionsClick={() => handleIconStripClick('options')}
          activeSection={isPanelOpen ? activePanelSection : null}
        />
        <div className={cn(
          'transition-[width] duration-300 ease-in-out',
          isPanelOpen ? 'w-96' : 'w-0'
        )}>
          <RouteEditorSidebar 
            isOpen={isPanelOpen}
            activeSection={activePanelSection}
            onClose={() => setIsPanelOpen(false)}
            onVisualOptionsChange={handleVisualOptionsChange}
          />
        </div>
        
        {/* The new robust grid layout for the animator and its controls */}
        <div className="flex-1 grid grid-rows-1 grid-cols-1 overflow-hidden">
            {/* Layer 1: The animator itself */}
            <div className="row-start-1 col-start-1" ref={flightAnimatorContainerRef}>
                <FlightAnimator
                    isPlaying={isPlaying}
                    sceneBackgroundColor={visualOptions.backgroundColor || defaultVisualOptions.backgroundColor!}
                    animationSpeedFactor={visualOptions.speedFactor !== undefined ? visualOptions.speedFactor : defaultVisualOptions.speedFactor!}
                    distanceUnit={visualOptions.distanceUnit || defaultVisualOptions.distanceUnit!}
                    mapTheme={visualOptions.mapTheme || defaultVisualOptions.mapTheme!}
                    isSidebarOpen={isPanelOpen}
                />
            </div>
            
            {/* Layer 2: The UI controls, positioned absolutely over the animator */}
            <div className="row-start-1 col-start-1 relative pointer-events-none">
                <div className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 w-auto p-2 md:p-3 pointer-events-auto">
                    <div className="bg-slate-800/80 backdrop-blur-sm p-2 rounded-lg shadow-xl flex items-center space-x-2 md:space-x-3">
                        <Button variant="ghost" size="icon" className="text-slate-300 hover:text-white h-8 w-8 md:h-10 md:w-10" onClick={() => setIsPlaying(!isPlaying)}>
                            {isPlaying ? <PauseCircle className="h-5 w-5 md:h-6 md:w-6" /> : <PlayCircle className="h-5 w-5 md:h-6 md:w-6" />}
                        </Button>
                        <Button variant="ghost" size="icon" className="text-slate-300 hover:text-white h-8 w-8 md:h-10 md:w-10" onClick={toggleFullScreen}>
                            {isFullScreen ? <Shrink className="h-4 w-4 md:h-5 md:w-5" /> : <Maximize className="h-4 w-4 md:h-5 md:w-5" />}
                        </Button>
                    </div>
                </div>
                <div className="absolute top-4 right-4 flex space-x-2 pointer-events-auto">
                    <button
                        className="animated-button text-sm"
                        onClick={handleExportAnimation}
                    >
                        <span className="button-content">
                            <Download className="h-4 w-4 mr-2" />
                            Export
                        </span>
                    </button>
                     <button className="animated-button text-sm">
                        <span className="button-content">
                            <Share2 className="h-4 w-4 mr-2" />
                            Share
                        </span>
                    </button>
                </div>
            </div>
        </div>
      </div>
      <SubtleFooter />
    </div>
  );
}
