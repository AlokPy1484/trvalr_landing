'use client';

import React, { useState } from 'react';
import { ExternalLink, MapPin } from 'lucide-react';

interface MapPreviewPopupProps {
  locationName: string;
  mapsUrl: string;
  children: React.ReactNode;
}

export function MapPreviewPopup({ locationName, mapsUrl, children }: MapPreviewPopupProps) {
  const [isHovering, setIsHovering] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  // Extract coordinates or location from the maps URL
  const getEmbedUrl = (url: string): string => {
    try {
      const urlObj = new URL(url);
      
      // Handle different Google Maps URL formats
      if (url.includes('maps.google.com') || url.includes('google.com/maps')) {
        // Extract query parameter
        const query = urlObj.searchParams.get('q') || urlObj.searchParams.get('query');
        if (query) {
          return `https://maps.google.com/maps?q=${encodeURIComponent(query)}&t=&z=14&ie=UTF8&iwloc=&output=embed`;
        }
        
        // Extract from path (e.g., /maps/place/Location+Name)
        const pathMatch = url.match(/\/maps\/place\/([^\/]+)/);
        if (pathMatch) {
          return `https://maps.google.com/maps?q=${encodeURIComponent(pathMatch[1])}&t=&z=14&ie=UTF8&iwloc=&output=embed`;
        }
      }
      
      // Fallback: use location name
      return `https://maps.google.com/maps?q=${encodeURIComponent(locationName)}&t=&z=14&ie=UTF8&iwloc=&output=embed`;
    } catch (e) {
      // If URL parsing fails, use location name
      return `https://maps.google.com/maps?q=${encodeURIComponent(locationName)}&t=&z=14&ie=UTF8&iwloc=&output=embed`;
    }
  };

  const handleMouseEnter = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setPosition({
      x: rect.left + rect.width / 2,
      y: rect.bottom + 10,
    });
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  const handleClick = (e: React.MouseEvent) => {
    // Still allow clicking to open in new tab
    e.preventDefault();
    window.open(mapsUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <>
      <a
        href={mapsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1 text-primary hover:text-primary/80 transition-colors underline decoration-dotted cursor-pointer"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
      >
        <MapPin className="h-3 w-3 inline" />
        {children}
      </a>

      {/* Popup Portal */}
      {isHovering && (
        <div
          className="fixed z-[9999] pointer-events-none"
          style={{
            left: `${position.x}px`,
            top: `${position.y}px`,
            transform: 'translateX(-50%)',
          }}
        >
          <div className="bg-card border border-border rounded-lg shadow-2xl overflow-hidden animate-in fade-in-0 zoom-in-95 duration-200">
            {/* Header */}
            <div className="bg-primary/5 px-3 py-2 border-b border-border">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary flex-shrink-0" />
                <p className="text-xs font-medium text-foreground truncate max-w-[250px]">
                  {locationName}
                </p>
                <ExternalLink className="h-3 w-3 text-muted-foreground flex-shrink-0 ml-auto" />
              </div>
            </div>
            
            {/* Map */}
            <div className="relative">
              <iframe
                src={getEmbedUrl(mapsUrl)}
                width="320"
                height="240"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={`Map preview of ${locationName}`}
                className="block"
              />
              <div className="absolute inset-0 bg-transparent pointer-events-none" />
            </div>

            {/* Footer */}
            <div className="bg-muted/30 px-3 py-2 text-center">
              <p className="text-[10px] text-muted-foreground">
                Click to open in Google Maps
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

