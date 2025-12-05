
'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
  MapPin,
  Languages,
  Star,
  Users,
  Mountain,
  UtensilsCrossed,
  Tent,
  Waves,
  Play,
  Instagram,
  Linkedin,
  Youtube,
  ChevronUp,
  Briefcase,
  Heart,
  Bookmark,
  BookmarkCheck,
  Plus,
  FolderPlus,
  Info,
  Globe,
  Calendar,
  Eye,
  MessageSquare,
  Camera,
  X,
  Upload,
  ZoomIn,
  ZoomOut,
  RotateCw,
  Move,
} from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { getSavedTrips, getPublicItineraries, type SavedTrip, type PublicItinerary } from '@/lib/utils';
import { formatDate } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { searchLocations, type CityData, type CountryData } from '@/data/cities';

// --- Sub-components ---


// Custom TikTok Icon Component
function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
    </svg>
  );
}

// Custom X (Twitter) Icon Component
function XIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  );
}


// 1. Enhanced Profile Header Component
interface ProfileHeaderProps {
  name: string;
  tagline: string;
  avatarUrl: string;
  avatarAiHint: string;
  coverImageUrl?: string;
  location?: string;
  bio?: string;
  following?: number;
  followers?: number;
  socialLinks?: {
    instagram?: string;
    youtube?: string;
    tiktok?: string;
    twitter?: string;
  };
  isEditMode?: boolean;
  onEditClick?: () => void;
  onSaveClick?: () => void;
  onCancelClick?: () => void;
  onAvatarUpload?: (file: File) => void;
  onCoverUpload?: (file: File) => void;
  onBioChange?: (bio: string) => void;
  onLocationChange?: (location: string) => void;
  onSocialLinkChange?: (platform: string, url: string) => void;
  avatarPreview?: string;
  coverPreview?: string;
  onAvatarPreviewChange?: (preview: string) => void;
  onCoverPreviewChange?: (preview: string) => void;
}

function ProfileHeader({ 
  name, 
  tagline, 
  avatarUrl, 
  avatarAiHint,
  coverImageUrl,
  location = 'Milan, Italy',
  bio = "I share my past and future experiences in the hope of inspiring you and helping you plan your trip. If you have any questions, feel free to message me.",
  following = 1,
  followers = 6,
  socialLinks = {},
  isEditMode = false,
  onEditClick,
  onSaveClick,
  onCancelClick,
  onAvatarUpload,
  onCoverUpload,
  onBioChange,
  onLocationChange,
  onSocialLinkChange,
  avatarPreview,
  coverPreview,
  onAvatarPreviewChange,
  onCoverPreviewChange,
}: ProfileHeaderProps) {
  const [locationInput, setLocationInput] = useState(location || '');
  const [locationSuggestions, setLocationSuggestions] = useState<Array<CityData | CountryData>>([]);
  const [showLocationSuggestions, setShowLocationSuggestions] = useState(false);
  const [showSocialDialog, setShowSocialDialog] = useState<{ platform: string; url: string } | null>(null);
  const [socialInputUrl, setSocialInputUrl] = useState('');
  const locationInputRef = useRef<HTMLInputElement>(null);
  const locationWrapperRef = useRef<HTMLDivElement>(null);

  // Sync location input with prop when it changes
  useEffect(() => {
    if (location) {
      setLocationInput(location);
    }
  }, [location]);

  const handleLocationInputChange = (value: string) => {
    setLocationInput(value);
    if (value.trim().length > 0) {
      const results = searchLocations(value, 5);
      setLocationSuggestions(results);
      setShowLocationSuggestions(true);
    } else {
      setLocationSuggestions([]);
      setShowLocationSuggestions(false);
    }
  };

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (locationWrapperRef.current && !locationWrapperRef.current.contains(event.target as Node)) {
        setShowLocationSuggestions(false);
      }
    };
    if (showLocationSuggestions) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [showLocationSuggestions]);

  const handleLocationSelect = (item: CityData | CountryData) => {
    const locationName = 'country' in item ? `${item.name}, ${item.country}` : item.name;
    setLocationInput(locationName);
    setShowLocationSuggestions(false);
    onLocationChange?.(locationName);
  };

  const handleSocialClick = (platform: string, currentUrl?: string) => {
    if (isEditMode) {
      setSocialInputUrl(currentUrl || '');
      setShowSocialDialog({ platform, url: currentUrl || '' });
    }
  };

  const handleSocialSave = () => {
    if (showSocialDialog) {
      onSocialLinkChange?.(showSocialDialog.platform, socialInputUrl);
      setShowSocialDialog(null);
      setSocialInputUrl('');
    }
  };
  
  // Inline image adjustment state
  const [avatarAdjustment, setAvatarAdjustment] = useState({ scale: 1, x: 0, y: 0, rotation: 0 });
  const [coverAdjustment, setCoverAdjustment] = useState({ scale: 1, x: 0, y: 0, rotation: 0 });
  const [avatarRawSrc, setAvatarRawSrc] = useState<string>('');
  const [coverRawSrc, setCoverRawSrc] = useState<string>('');
  const [isDraggingAvatar, setIsDraggingAvatar] = useState(false);
  const [isDraggingCover, setIsDraggingCover] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const avatarContainerRef = useRef<HTMLDivElement>(null);
  const coverContainerRef = useRef<HTMLDivElement>(null);

  const handleAvatarFileSelect = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const dataUrl = reader.result as string;
      setAvatarRawSrc(dataUrl);
      onAvatarPreviewChange?.(dataUrl);
      setAvatarAdjustment({ scale: 1, x: 0, y: 0, rotation: 0 });
    };
    reader.readAsDataURL(file);
  };

  const handleCoverFileSelect = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const dataUrl = reader.result as string;
      setCoverRawSrc(dataUrl);
      // Don't set preview yet - wait for image to load and calculate proper scale
      const img = new window.Image();
      img.onload = () => {
        if (coverContainerRef.current) {
          const container = coverContainerRef.current;
          const containerAspect = container.offsetWidth / container.offsetHeight;
          const imgAspect = img.width / img.height;
          // Calculate scale to fit the full image in container
          const scaleToFit = imgAspect > containerAspect 
            ? container.offsetHeight / img.height
            : container.offsetWidth / img.width;
          // Start with scale that shows full image (may be < 1 if image is larger)
          setCoverAdjustment({ scale: Math.min(1, scaleToFit), x: 0, y: 0, rotation: 0 });
          onCoverPreviewChange?.(dataUrl);
        }
      };
      img.src = dataUrl;
    };
    reader.readAsDataURL(file);
  };

  // Avatar adjustment handlers
  const handleAvatarMouseDown = (e: React.MouseEvent) => {
    if (!avatarRawSrc) return;
    setIsDraggingAvatar(true);
    setDragStart({
      x: e.clientX - avatarAdjustment.x,
      y: e.clientY - avatarAdjustment.y,
    });
  };

  const handleAvatarMouseMove = useCallback((e: MouseEvent) => {
    if (!isDraggingAvatar) return;
    setAvatarAdjustment(prev => ({
      ...prev,
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y,
    }));
  }, [isDraggingAvatar, dragStart]);

  const handleAvatarMouseUp = useCallback(() => {
    setIsDraggingAvatar(false);
  }, []);

  // Cover adjustment handlers
  const handleCoverMouseDown = (e: React.MouseEvent) => {
    if (!coverRawSrc) return;
    setIsDraggingCover(true);
    setDragStart({
      x: e.clientX - coverAdjustment.x,
      y: e.clientY - coverAdjustment.y,
    });
  };

  const handleCoverMouseMove = useCallback((e: MouseEvent) => {
    if (!isDraggingCover) return;
    setCoverAdjustment(prev => ({
      ...prev,
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y,
    }));
  }, [isDraggingCover, dragStart]);

  const handleCoverMouseUp = useCallback(() => {
    setIsDraggingCover(false);
  }, []);

  useEffect(() => {
    if (isDraggingAvatar) {
      document.addEventListener('mousemove', handleAvatarMouseMove);
      document.addEventListener('mouseup', handleAvatarMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleAvatarMouseMove);
        document.removeEventListener('mouseup', handleAvatarMouseUp);
      };
    }
  }, [isDraggingAvatar, handleAvatarMouseMove, handleAvatarMouseUp]);

  useEffect(() => {
    if (isDraggingCover) {
      document.addEventListener('mousemove', handleCoverMouseMove);
      document.addEventListener('mouseup', handleCoverMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleCoverMouseMove);
        document.removeEventListener('mouseup', handleCoverMouseUp);
      };
    }
  }, [isDraggingCover, handleCoverMouseMove, handleCoverMouseUp]);

  // Apply adjustments and generate final image when user saves
  const applyAvatarAdjustment = useCallback(() => {
    if (!avatarRawSrc || !avatarContainerRef.current) return;
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const container = avatarContainerRef.current;
    const size = container.offsetWidth;
    canvas.width = size;
    canvas.height = size;

    const img = new window.Image();
    img.onload = () => {
      ctx.save();
      ctx.translate(size / 2, size / 2);
      ctx.rotate((avatarAdjustment.rotation * Math.PI) / 180);
      ctx.scale(avatarAdjustment.scale, avatarAdjustment.scale);
      ctx.drawImage(
        img,
        -img.width / 2 + avatarAdjustment.x / avatarAdjustment.scale,
        -img.height / 2 + avatarAdjustment.y / avatarAdjustment.scale,
        img.width,
        img.height
      );
      ctx.restore();

      const finalImage = canvas.toDataURL('image/png');
      onAvatarPreviewChange?.(finalImage);
      if (onAvatarUpload) {
        fetch(finalImage)
          .then(res => res.blob())
          .then(blob => {
            const file = new File([blob], 'avatar.png', { type: 'image/png' });
            onAvatarUpload(file);
          });
      }
    };
    img.src = avatarRawSrc;
  }, [avatarRawSrc, avatarAdjustment, onAvatarPreviewChange, onAvatarUpload]);

  const applyCoverAdjustment = useCallback(() => {
    if (!coverRawSrc || !coverContainerRef.current) return;
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const container = coverContainerRef.current;
    canvas.width = container.offsetWidth;
    canvas.height = container.offsetHeight;

    const img = new window.Image();
    img.onload = () => {
      ctx.save();
      ctx.translate(canvas.width / 2, canvas.height / 2);
      ctx.rotate((coverAdjustment.rotation * Math.PI) / 180);
      ctx.scale(coverAdjustment.scale, coverAdjustment.scale);
      ctx.drawImage(
        img,
        -img.width / 2 + coverAdjustment.x / coverAdjustment.scale,
        -img.height / 2 + coverAdjustment.y / coverAdjustment.scale,
        img.width,
        img.height
      );
      ctx.restore();

      const finalImage = canvas.toDataURL('image/png');
      onCoverPreviewChange?.(finalImage);
      if (onCoverUpload) {
        fetch(finalImage)
          .then(res => res.blob())
          .then(blob => {
            const file = new File([blob], 'cover.png', { type: 'image/png' });
            onCoverUpload(file);
          });
      }
    };
    img.src = coverRawSrc;
  }, [coverRawSrc, coverAdjustment, onCoverPreviewChange, onCoverUpload]);

  // Apply adjustments only when user clicks save
  // The visual preview is handled by CSS transforms in real-time
  // Final cropped image is generated only when save is clicked
  const handleSaveWithAdjustments = () => {
    if (avatarRawSrc) {
      applyAvatarAdjustment();
    }
    if (coverRawSrc) {
      applyCoverAdjustment();
    }
    // Call the original save handler
    onSaveClick?.();
  };

  return (
    <>
      {/* Cover Image Section */}
      <div 
        ref={coverContainerRef}
        className="relative w-full h-64 md:h-80 bg-gradient-to-br from-muted to-card"
        onMouseDown={handleCoverMouseDown}
        style={{ overflow: 'hidden' }}
      >
        {(coverRawSrc || coverPreview || coverImageUrl) && (
          <div className="absolute inset-0">
            {coverRawSrc ? (
              <img
                src={coverRawSrc}
                alt="Cover"
                className="absolute"
                style={{
                  top: '50%',
                  left: '50%',
                  width: 'auto',
                  height: 'auto',
                  minWidth: '100%',
                  minHeight: '100%',
                  maxWidth: 'none',
                  maxHeight: 'none',
                  objectFit: 'cover',
                  transform: `translate(calc(-50% + ${coverAdjustment.x}px), calc(-50% + ${coverAdjustment.y}px)) scale(${coverAdjustment.scale}) rotate(${coverAdjustment.rotation}deg)`,
                  cursor: isDraggingCover ? 'grabbing' : 'grab',
                  transformOrigin: 'center center',
                }}
              />
            ) : (
      <Image
                src={coverPreview || coverImageUrl || ''}
                alt="Cover"
        fill
        className="object-cover"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/20 pointer-events-none" />
          </div>
        )}
        
        {/* Cover Image Upload Button (only in edit mode) */}
        {isEditMode && (
          <div className="absolute top-2 right-2 sm:top-4 sm:right-4 z-20 flex flex-col gap-2">
            <label
              htmlFor="cover-upload"
              className="flex items-center gap-1.5 sm:gap-2 px-2 sm:px-4 py-1.5 sm:py-2 rounded-lg cursor-pointer border border-border bg-card/90 backdrop-blur-sm hover:bg-card transition-colors text-xs sm:text-sm"
            >
              <Upload className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="font-medium hidden xs:inline sm:text-sm">Upload Cover</span>
              <span className="font-medium xs:hidden">Upload</span>
              <input
                id="cover-upload"
                type="file"
                className="hidden"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    handleCoverFileSelect(file);
                  }
                }}
              />
            </label>
            
            {/* Inline Adjustment Controls for Cover */}
            {coverRawSrc && (
              <div className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg border border-border bg-card/90 backdrop-blur-sm overflow-x-auto">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 sm:h-8 sm:w-8 flex-shrink-0"
                  onClick={(e) => {
                    e.stopPropagation();
                    setCoverAdjustment(prev => ({ ...prev, scale: Math.max(0.5, prev.scale - 0.1) }));
                  }}
                >
                  <ZoomOut className="h-3 w-3 sm:h-4 sm:w-4" />
                </Button>
                <span className="text-xs text-muted-foreground min-w-[35px] sm:min-w-[40px] text-center flex-shrink-0">
                  {Math.round(coverAdjustment.scale * 100)}%
                </span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 sm:h-8 sm:w-8 flex-shrink-0"
                  onClick={(e) => {
                    e.stopPropagation();
                    setCoverAdjustment(prev => ({ ...prev, scale: Math.min(3, prev.scale + 0.1) }));
                  }}
                >
                  <ZoomIn className="h-3 w-3 sm:h-4 sm:w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 sm:h-8 sm:w-8 flex-shrink-0"
                  onClick={(e) => {
                    e.stopPropagation();
                    setCoverAdjustment(prev => ({ ...prev, rotation: (prev.rotation + 90) % 360 }));
                  }}
                >
                  <RotateCw className="h-3 w-3 sm:h-4 sm:w-4" />
                </Button>
                <div className="hidden sm:flex items-center gap-1 text-xs text-muted-foreground flex-shrink-0">
                  <Move className="h-3 w-3" />
                  <span>Drag</span>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Profile Details Section - Separated from cover */}
      <div className="relative bg-background border-b">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          {/* Avatar and Name Section - Half above, half below */}
          <div className="relative -mt-8 sm:-mt-12 md:-mt-16 lg:-mt-20 mb-4 sm:mb-6 z-10">
            <div className="flex items-end gap-3 sm:gap-4 md:gap-6">
              {/* Avatar */}
              <div className="relative flex-shrink-0">
                <div 
                  ref={avatarContainerRef}
                  className="relative h-20 w-20 sm:h-28 sm:w-28 md:h-36 md:w-36 lg:h-40 lg:w-40 rounded-full overflow-hidden border-2 sm:border-4 border-background shadow-xl"
                  onMouseDown={handleAvatarMouseDown}
                >
                  {avatarRawSrc ? (
                    <img
                      src={avatarRawSrc}
                      alt={name}
                      className="absolute inset-0 w-full h-full object-cover"
                      style={{
                        transform: `translate(${avatarAdjustment.x}px, ${avatarAdjustment.y}px) scale(${avatarAdjustment.scale}) rotate(${avatarAdjustment.rotation}deg)`,
                        cursor: isDraggingAvatar ? 'grabbing' : 'grab',
                        transformOrigin: 'center center',
                      }}
                    />
                  ) : (
              <Image
                      src={avatarPreview || avatarUrl}
                alt={name}
                fill
                      className="rounded-full object-cover"
                data-ai-hint={avatarAiHint}
              />
                  )}
                  {isEditMode && !avatarRawSrc && (
                    <div className="absolute inset-0 rounded-full bg-black/50 flex items-center justify-center">
                      <label
                        htmlFor="avatar-upload"
                        className="cursor-pointer p-2 rounded-full hover:bg-white/30 transition-colors"
                      >
                        <Camera className="h-6 w-6 text-white" />
                        <input
                          id="avatar-upload"
                          type="file"
                          className="hidden"
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              handleAvatarFileSelect(file);
                            }
                          }}
                        />
                      </label>
            </div>
                  )}
            </div>
                
                {/* Inline Adjustment Controls for Avatar */}
                {isEditMode && avatarRawSrc && (
                  <div className="absolute -bottom-10 sm:-bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg border border-border bg-card shadow-lg z-20">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 sm:h-8 sm:w-8 flex-shrink-0"
                      onClick={(e) => {
                        e.stopPropagation();
                        setAvatarAdjustment(prev => ({ ...prev, scale: Math.max(0.5, prev.scale - 0.1) }));
                      }}
                    >
                      <ZoomOut className="h-3 w-3 sm:h-4 sm:w-4" />
            </Button>
                    <span className="text-xs text-muted-foreground min-w-[35px] sm:min-w-[40px] text-center flex-shrink-0">
                      {Math.round(avatarAdjustment.scale * 100)}%
                    </span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 sm:h-8 sm:w-8 flex-shrink-0"
                      onClick={(e) => {
                        e.stopPropagation();
                        setAvatarAdjustment(prev => ({ ...prev, scale: Math.min(3, prev.scale + 0.1) }));
                      }}
                    >
                      <ZoomIn className="h-3 w-3 sm:h-4 sm:w-4" />
            </Button>
            <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 sm:h-8 sm:w-8 flex-shrink-0"
                      onClick={(e) => {
                        e.stopPropagation();
                        setAvatarAdjustment(prev => ({ ...prev, rotation: (prev.rotation + 90) % 360 }));
                      }}
                    >
                      <RotateCw className="h-3 w-3 sm:h-4 sm:w-4" />
            </Button>
                    <div className="hidden sm:flex items-center gap-1 text-xs text-muted-foreground flex-shrink-0">
                      <Move className="h-3 w-3" />
                      <span>Drag</span>
          </div>
        </div>
                )}
      </div>

              {/* Name and Username */}
              <div className="flex-1 min-w-0 pt-6 mt-2 sm:pt-0">
                <h1 className="font-headline text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-foreground mb-1 truncate">
                  {name}
                </h1>
                <p className="text-xs sm:text-sm md:text-base text-muted-foreground truncate">
                  @{name.toLowerCase().replace(/\s+/g, '')}
                </p>
    </div>
            </div>
          </div>

          {/* Profile Info */}
          <div className="pb-6 md:pb-8">

            {/* Stats */}
            <div className="flex items-center gap-4 sm:gap-6 mb-4 text-xs sm:text-sm text-muted-foreground">
              <span>
                <span className="font-semibold text-foreground">{following}</span> following
              </span>
              <span>
                <span className="font-semibold text-foreground">{followers}</span> followers
              </span>
            </div>

            {/* Bio */}
            {isEditMode ? (
              <div className="mb-4">
                <Textarea
                  value={bio}
                  onChange={(e) => onBioChange?.(e.target.value)}
                  placeholder="Tell us about yourself..."
                  className="min-h-[100px] max-w-2xl"
                />
              </div>
            ) : (
              <p className="text-sm md:text-base mb-4 leading-relaxed max-w-2xl text-muted-foreground">
                {bio}
              </p>
            )}

            {/* Location & Social */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 text-sm">
              <div className="flex flex-wrap items-center gap-3 sm:gap-4 w-full sm:w-auto">
                {isEditMode ? (
                  <div className="relative w-full sm:w-auto" ref={locationWrapperRef}>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                      <Input
                        ref={locationInputRef}
                        value={locationInput}
                        onChange={(e) => handleLocationInputChange(e.target.value)}
                        onFocus={() => {
                          if (locationInput.trim().length > 0) {
                            const results = searchLocations(locationInput, 5);
                            setLocationSuggestions(results);
                            setShowLocationSuggestions(true);
                          }
                        }}
                        placeholder="Enter location..."
                        className="w-full sm:w-48"
                      />
                    </div>
                    {showLocationSuggestions && locationSuggestions.length > 0 && (
                      <div className="absolute top-full left-0 sm:left-8 mt-1 w-full sm:w-64 rounded-lg shadow-xl border bg-card overflow-hidden z-50 max-h-60 overflow-y-auto">
                        {locationSuggestions.map((item, idx) => {
                          const displayName = 'country' in item ? `${item.name}, ${item.country}` : item.name;
  return (
                            <button
                              key={idx}
                              onClick={() => handleLocationSelect(item)}
                              className="w-full text-left px-4 py-2 hover:bg-muted transition-colors text-foreground"
                            >
                              {displayName}
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                ) : (
                  location && (
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      <span>{location}</span>
                    </div>
                  )
                )}
                <div className="flex items-center gap-2">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-8 w-8 rounded-full text-muted-foreground hover:text-foreground"
                    onClick={() => handleSocialClick('instagram', socialLinks.instagram)}
                    asChild={!isEditMode && !!socialLinks.instagram}
                  >
                    {isEditMode || !socialLinks.instagram ? (
                      <Instagram className="h-4 w-4" />
                    ) : (
                      <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                        <Instagram className="h-4 w-4" />
                      </a>
                    )}
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-8 w-8 rounded-full text-muted-foreground hover:text-foreground"
                    onClick={() => handleSocialClick('youtube', socialLinks.youtube)}
                    asChild={!isEditMode && !!socialLinks.youtube}
                  >
                    {isEditMode || !socialLinks.youtube ? (
                      <Youtube className="h-4 w-4" />
                    ) : (
                      <a href={socialLinks.youtube} target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                        <Youtube className="h-4 w-4" />
                      </a>
                    )}
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-8 w-8 rounded-full text-muted-foreground hover:text-foreground"
                    onClick={() => handleSocialClick('tiktok', socialLinks.tiktok)}
                    asChild={!isEditMode && !!socialLinks.tiktok}
                  >
                    {isEditMode || !socialLinks.tiktok ? (
                      <TikTokIcon className="h-4 w-4" />
                    ) : (
                      <a href={socialLinks.tiktok} target="_blank" rel="noopener noreferrer" aria-label="TikTok">
                        <TikTokIcon className="h-4 w-4" />
                      </a>
                    )}
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-8 w-8 rounded-full text-muted-foreground hover:text-foreground"
                    onClick={() => handleSocialClick('twitter', socialLinks.twitter)}
                    asChild={!isEditMode && !!socialLinks.twitter}
                  >
                    {isEditMode || !socialLinks.twitter ? (
                      <XIcon className="h-4 w-4" />
                    ) : (
                      <a href={socialLinks.twitter} target="_blank" rel="noopener noreferrer" aria-label="X (Twitter)">
                        <XIcon className="h-4 w-4" />
                      </a>
                    )}
        </Button>
      </div>
      </div>
              <div className="flex flex-col sm:flex-row sm:flex-col gap-2 w-full sm:w-auto">
                {!isEditMode ? (
                  <Button
                    variant="outline"
                    className="font-semibold rounded-xl px-4 sm:px-6 py-2 sm:py-2.5 border-2 hover:bg-foreground hover:text-background transition-colors w-full sm:w-auto text-sm sm:text-base"
                    onClick={onEditClick}
                  >
                    Edit Profile
          </Button>
                ) : (
                  <div className="flex gap-2 w-full sm:w-auto">
                    <Button
                      variant="outline"
                      className="font-semibold rounded-xl px-4 sm:px-6 py-2 sm:py-2.5 border-2 flex-1 sm:flex-none text-sm sm:text-base"
                      onClick={onCancelClick}
                    >
                      Cancel
                    </Button>
                    <Button
                      variant="outline"
                      className="font-semibold rounded-xl px-4 sm:px-6 py-2 sm:py-2.5 border-2 bg-foreground text-background hover:bg-foreground/90 flex-1 sm:flex-none text-sm sm:text-base"
                      onClick={handleSaveWithAdjustments}
                    >
                      Save
          </Button>
        </div>
                )}
                <Button
                  variant="outline"
                  size="default"
                  className="flex items-center justify-center gap-2 px-4 py-2 rounded-xl border-2 hover:bg-foreground hover:text-background transition-all w-full sm:w-auto text-sm"
                  asChild
                >
                  <Link href="/my-chats?category=tripGroupChats" aria-label="Wander Chats">
                    <MessageSquare className="h-4 w-4 sm:h-5 sm:w-5" />
                    <span className="font-medium">Wander Chats</span>
                  </Link>
        </Button>
      </div>
    </div>
          </div>
        </div>
      </div>

      {/* Social Media URL Input Dialog */}
      {showSocialDialog && (
        <Dialog open={!!showSocialDialog} onOpenChange={() => setShowSocialDialog(null)}>
          <DialogContent className="sm:max-w-[400px]">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                {showSocialDialog.platform === 'instagram' && <Instagram className="h-5 w-5" />}
                {showSocialDialog.platform === 'youtube' && <Youtube className="h-5 w-5" />}
                {showSocialDialog.platform === 'tiktok' && <TikTokIcon className="h-5 w-5" />}
                {showSocialDialog.platform === 'twitter' && <XIcon className="h-5 w-5" />}
                {showSocialDialog.platform.charAt(0).toUpperCase() + showSocialDialog.platform.slice(1)} URL
              </DialogTitle>
              <DialogDescription>
                Enter your {showSocialDialog.platform} profile URL
              </DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <Input
                value={socialInputUrl}
                onChange={(e) => setSocialInputUrl(e.target.value)}
                placeholder={`https://${showSocialDialog.platform === 'twitter' ? 'twitter.com' : showSocialDialog.platform + '.com'}/...`}
              />
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => {
                  setShowSocialDialog(null);
                  setSocialInputUrl('');
                }}
              >
                Cancel
              </Button>
              <Button
                onClick={handleSocialSave}
              >
                Save
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}

// 2. Itinerary Card Component
interface ItineraryCardProps {
  itinerary: SavedTrip | PublicItinerary;
  isLiked?: boolean;
  isSaved?: boolean;
  onLike?: (id: string) => void;
  onSave?: (id: string) => void;
  onAddToCollection?: (id: string) => void;
  onClick?: () => void;
  showCreator?: boolean;
}

function ItineraryCard({ 
  itinerary, 
  isLiked = false, 
  isSaved = false,
  onLike,
  onSave,
  onAddToCollection,
  onClick,
  showCreator = false
}: ItineraryCardProps) {
  const [imageIndex, setImageIndex] = useState(0);
  const images = itinerary.itineraryData?.images || [];
  const hasMultipleImages = images.length > 1;

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    onLike?.(itinerary.id);
  };

  const handleSave = (e: React.MouseEvent) => {
    e.stopPropagation();
    onSave?.(itinerary.id);
  };

  const handleAddToCollection = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCollection?.(itinerary.id);
  };

  return (
    <div 
      className="group relative bg-card border border-border rounded-2xl overflow-hidden cursor-pointer hover:border-primary/50 transition-all duration-300 hover:shadow-lg"
      onClick={onClick}
    >
      {/* Image Container */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-gradient-to-br from-yellow-900/20 to-amber-900/20">
        <Image
          src={images[imageIndex]?.full || images[imageIndex]?.regular || itinerary.heroImageUrl || 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=800&h=600&fit=crop'}
          alt={itinerary.title}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-500"
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        {/* Duration Badge */}
        <div className="absolute top-3 left-3">
          <Badge className="bg-white/95 backdrop-blur-sm text-[#3a2f26] font-semibold px-3 py-1 rounded-full text-xs border-0 shadow-lg">
            {itinerary.duration} {itinerary.duration === 1 ? 'day' : 'days'}
          </Badge>
      </div>

        {/* Action Buttons */}
        <div className="absolute top-3 right-3 flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleLike}
            className={cn(
              "h-9 w-9 rounded-full backdrop-blur-md border-0 transition-all",
              isLiked 
                ? "bg-red-500/90 text-white hover:bg-red-500" 
                : "bg-white/20 text-white hover:bg-white/30"
            )}
          >
            <Heart className={cn("h-4 w-4", isLiked && "fill-current")} />
        </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleSave}
            className={cn(
              "h-9 w-9 rounded-full backdrop-blur-md border-0 transition-all",
              isSaved 
                ? "bg-primary/90 text-white hover:bg-primary" 
                : "bg-white/20 text-white hover:bg-white/30"
            )}
          >
            {isSaved ? (
              <BookmarkCheck className="h-4 w-4" />
            ) : (
              <Plus className="h-4 w-4" />
            )}
        </Button>
        </div>

        {/* Image Pagination Dots */}
        {hasMultipleImages && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5">
            {images.slice(0, 5).map((_: any, idx: number) => (
              <button
                key={idx}
                onClick={(e) => {
                  e.stopPropagation();
                  setImageIndex(idx);
                }}
                className={cn(
                  "h-1.5 rounded-full transition-all",
                  imageIndex === idx 
                    ? "w-6 bg-white" 
                    : "w-1.5 bg-white/50 hover:bg-white/70"
                )}
                aria-label={`View image ${idx + 1}`}
              />
            ))}
          </div>
        )}

        {/* Info Icon */}
        <div className="absolute bottom-3 right-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={(e) => {
              e.stopPropagation();
              // Show itinerary details
            }}
            className="h-8 w-8 rounded-full bg-white/20 backdrop-blur-md text-white hover:bg-white/30 border-0"
          >
            <Info className="h-3.5 w-3.5" />
        </Button>
      </div>
    </div>

      {/* Content */}
      <div className="p-4 bg-card">
        {/* Title */}
        <h3 className="font-headline text-lg font-bold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
          {itinerary.title}
        </h3>

        {/* Location & Creator */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <MapPin className="h-3.5 w-3.5 flex-shrink-0" />
            <span className="truncate">{itinerary.destination}</span>
          </div>
          {showCreator && itinerary.authorName && (
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Avatar className="h-4 w-4 border border-border">
                <AvatarFallback className="text-[8px] bg-muted text-foreground">
                  {itinerary.authorName.substring(0, 1)}
                </AvatarFallback>
              </Avatar>
              <span className="truncate max-w-[80px]">{itinerary.authorName}</span>
            </div>
          )}
        </div>

        {/* Stats (for public itineraries) */}
        {'views' in itinerary && (
          <div className="flex items-center gap-4 text-xs text-muted-foreground pt-2 border-t border-border">
            <div className="flex items-center gap-1">
              <Eye className="h-3 w-3" />
              <span>{itinerary.views}</span>
            </div>
            {itinerary.averageRating > 0 && (
              <div className="flex items-center gap-1">
                <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                <span>{itinerary.averageRating.toFixed(1)}</span>
      </div>
            )}
      </div>
        )}
      </div>
    </div>
  );
}

// 3. Diary Log Card Component
interface DiaryLog {
  id: string;
  title: string;
  content: string;
  imageUrl?: string;
  location?: string;
  date: string;
  createdAt: string;
}

interface DiaryLogCardProps {
  diaryLog: DiaryLog;
  onClick?: () => void;
}

function DiaryLogCard({ diaryLog, onClick }: DiaryLogCardProps) {
  return (
    <div 
      className="group relative bg-card border border-border rounded-2xl overflow-hidden cursor-pointer hover:border-primary/50 transition-all duration-300 hover:shadow-lg"
      onClick={onClick}
    >
      {diaryLog.imageUrl ? (
        <div className="relative aspect-[4/3] w-full overflow-hidden">
          <Image
            src={diaryLog.imageUrl}
            alt={diaryLog.title}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
            </div>
      ) : (
        <div className="relative aspect-[4/3] w-full bg-muted/30 flex items-center justify-center">
          <Calendar className="h-16 w-16 text-muted-foreground/30" />
        </div>
      )}
      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-headline text-lg font-bold text-foreground line-clamp-2 flex-1">{diaryLog.title}</h3>
        </div>
        <p className="text-muted-foreground text-sm line-clamp-2 mb-2">{diaryLog.content}</p>
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          {diaryLog.location && (
            <div className="flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              <span>{diaryLog.location}</span>
            </div>
          )}
          <div className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            <span>{new Date(diaryLog.date).toLocaleDateString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// 4. Stats Card Component
interface StatItem {
  icon: React.ElementType;
  value: string;
  label: string;
}

interface StatsCardProps {
  stats: StatItem[];
}

function StatsCard({ stats }: StatsCardProps) {
  return (
    <div className="bg-card border border-border rounded-2xl p-5 shadow-sm">
      <h3 className="font-headline text-xl font-bold text-foreground mb-5">Travel Stats</h3>
      <div className="grid grid-cols-2 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-muted/50 rounded-xl p-3 border border-border/50">
              <Icon className="h-5 w-5 text-primary mb-2" />
              <p className="font-bold text-xl text-foreground mb-1">{stat.value}</p>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// 5. Wander Badges Component
interface BadgeInfo {
  id: string;
  icon: React.ElementType;
  name: string;
  description: string;
}

interface WanderBadgesCardProps {
  badges: BadgeInfo[];
}

function WanderBadgesCard({ badges }: WanderBadgesCardProps) {
  return (
    <div className="bg-card border border-border rounded-2xl p-5 shadow-sm">
      <h3 className="font-semibold text-lg text-foreground mb-5">Wander Badges</h3>
      <div className="grid grid-cols-2 gap-4">
        {badges.map(badge => (
          <div key={badge.id} className="bg-muted/50 rounded-xl p-3 border border-border/50 hover:bg-muted transition-colors cursor-pointer group">
            <badge.icon className="h-8 w-8 text-primary mb-2 group-hover:scale-110 transition-transform" />
            <p className="font-semibold text-xs text-foreground mb-1">{badge.name}</p>
            <p className="text-[10px] text-muted-foreground leading-tight">{badge.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// 6. Profile Footer Component
function ProfileFooter() {
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    return (
        <footer className="w-full bg-background text-muted-foreground border-t border-border py-4 px-4 md:px-8">
            <div className="flex justify-between items-center text-xs">
                <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center h-8 w-8 rounded-full bg-muted text-muted-foreground font-serif text-lg">
                        N
                    </div>
                    <span>© 2025 All right reserved by Trvalrone pvt. ltd.</span>
                </div>
                <div className="flex items-center space-x-1">
                    <a href="#" aria-label="TikTok" className="p-1.5 rounded-full hover:bg-muted transition-colors text-muted-foreground hover:text-foreground">
                        <Play className="h-4 w-4" />
                    </a>
                    <a href="https://www.instagram.com/trvalr/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="p-1.5 rounded-full hover:bg-muted transition-colors text-muted-foreground hover:text-foreground">
                        <Instagram className="h-4 w-4" />
                    </a>
                    <a href="https://www.linkedin.com/company/trvals/about/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="p-1.5 rounded-full hover:bg-muted transition-colors text-muted-foreground hover:text-foreground">
                        <Linkedin className="h-4 w-4" />
                    </a>
                    <a href="#" aria-label="YouTube" className="p-1.5 rounded-full hover:bg-muted transition-colors text-muted-foreground hover:text-foreground">
                        <Youtube className="h-4 w-4" />
                    </a>
                    <button
                        onClick={scrollToTop}
                        aria-label="Scroll to top"
                        className="p-1.5 rounded-full hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
                    >
                        <ChevronUp className="h-4 w-4" />
                    </button>
                </div>
            </div>
        </footer>
    );
}

// --- Main Page Client Component ---
export function PhilHarrisonProfilePageClient() {
    const router = useRouter();
    const { toast } = useToast();
    const [searchQuery, setSearchQuery] = useState('');
    const [isScrolled, setIsScrolled] = useState(false);
    const [activeTab, setActiveTab] = useState<'itineraries' | 'saved' | 'photos' | 'diaryLogs'>('itineraries');
    const [createdItineraries, setCreatedItineraries] = useState<SavedTrip[]>([]);
    const [savedItineraries, setSavedItineraries] = useState<(SavedTrip | PublicItinerary)[]>([]);
    const [diaryLogs, setDiaryLogs] = useState<DiaryLog[]>([]);
    const [photos, setPhotos] = useState<string[]>([]);
    const [likedItineraryIds, setLikedItineraryIds] = useState<Set<string>>(new Set());
    const [savedItineraryIds, setSavedItineraryIds] = useState<Set<string>>(new Set());
    const [showDiaryDialog, setShowDiaryDialog] = useState(false);
    const [newDiaryTitle, setNewDiaryTitle] = useState('');
    const [newDiaryContent, setNewDiaryContent] = useState('');
    const [newDiaryLocation, setNewDiaryLocation] = useState('');
    const [newDiaryDate, setNewDiaryDate] = useState(new Date().toISOString().split('T')[0]);
    const [newDiaryImageUrl, setNewDiaryImageUrl] = useState('');
    const [diaryAttachment, setDiaryAttachment] = useState<File | null>(null);
    const [diaryAttachmentPreview, setDiaryAttachmentPreview] = useState<string | null>(null);
    
    // Profile editing state
    const [isEditMode, setIsEditMode] = useState(false);
    const [profileData, setProfileData] = useState({
        name: 'Phil Harrison',
        bio: "I share my past and future experiences in the hope of inspiring you and helping you plan your trip. If you have any questions, feel free to message me.",
        location: 'Milan, Italy',
        avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=160&h=160&fit=crop',
        coverImageUrl: '',
        socialLinks: {
            instagram: 'https://instagram.com/philharrison',
            youtube: 'https://youtube.com/@philharrison',
            tiktok: 'https://tiktok.com/@philharrison',
            twitter: 'https://twitter.com/philharrison',
        },
    });
    const [editingProfileData, setEditingProfileData] = useState(profileData);
    const [avatarFile, setAvatarFile] = useState<File | null>(null);
    const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
    const [coverFile, setCoverFile] = useState<File | null>(null);
    const [coverPreview, setCoverPreview] = useState<string | null>(null);

    const handleScroll = useCallback(() => {
        const currentScrollY = window.scrollY;
        setIsScrolled(currentScrollY > 50);
    }, []);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, [handleScroll]);

    // Load user's created itineraries (trips they created and made public)
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const allSavedTrips = getSavedTrips();
            // Filter for trips created by this user (assuming current user ID)
            const created = allSavedTrips.filter(trip => trip.isPublic && trip.authorName === 'Phil Harrison');
            setCreatedItineraries(created);

            // Load saved itineraries (from public itineraries that user saved)
            const publicItineraries = getPublicItineraries();
            const savedIds = JSON.parse(localStorage.getItem('savedItineraryIds') || '[]') as string[];
            const savedFromPublic = publicItineraries.filter(trip => savedIds.includes(trip.id));
            setSavedItineraries(savedFromPublic);
            setSavedItineraryIds(new Set(savedIds));

            // Load liked itinerary IDs
            const likedIds = JSON.parse(localStorage.getItem('likedItineraryIds') || '[]') as string[];
            setLikedItineraryIds(new Set(likedIds));

            // Load diary logs
            const userDiaryLogs = JSON.parse(localStorage.getItem('userDiaryLogs') || '[]') as DiaryLog[];
            setDiaryLogs(userDiaryLogs);

            // Load photos (extract from diary logs and itineraries)
            const allPhotos: string[] = [];
            userDiaryLogs.forEach(log => {
                if (log.imageUrl) allPhotos.push(log.imageUrl);
            });
            const savedTripsForPhotos = getSavedTrips();
            savedTripsForPhotos.forEach(trip => {
                if (trip.heroImageUrl) allPhotos.push(trip.heroImageUrl);
                if (trip.itineraryData?.images) {
                    trip.itineraryData.images.forEach((img: any) => {
                        if (img.full) allPhotos.push(img.full);
                        if (img.regular) allPhotos.push(img.regular);
                    });
                }
            });
            setPhotos([...new Set(allPhotos)]);

            // Load profile data
            const savedProfile = localStorage.getItem('userProfileData');
            if (savedProfile) {
                setProfileData(JSON.parse(savedProfile));
            }
        }
    }, []);

    const handleHeaderSearchSubmit = () => {
        console.log('Header search submitted on Phil Harrison Profile page:', searchQuery);
    };

    const handleItineraryClick = (itinerary: SavedTrip | PublicItinerary) => {
        localStorage.setItem('itineraryData', JSON.stringify(itinerary.itineraryData));
        if (itinerary.promptInput) {
            localStorage.setItem('promptInput', itinerary.promptInput);
        }
        router.push('/trip-details');
    };

    const handleLike = (itineraryId: string) => {
        const newLikedIds = new Set(likedItineraryIds);
        if (newLikedIds.has(itineraryId)) {
            newLikedIds.delete(itineraryId);
            toast({
                title: "Unliked",
                description: "Itinerary removed from your likes.",
            });
        } else {
            newLikedIds.add(itineraryId);
            toast({
                title: "Liked",
                description: "Itinerary added to your likes.",
            });
        }
        setLikedItineraryIds(newLikedIds);
        localStorage.setItem('likedItineraryIds', JSON.stringify(Array.from(newLikedIds)));
    };

    const handleSave = (itineraryId: string) => {
        const newSavedIds = new Set(savedItineraryIds);
        if (newSavedIds.has(itineraryId)) {
            newSavedIds.delete(itineraryId);
            setSavedItineraries(prev => prev.filter(trip => trip.id !== itineraryId));
            toast({
                title: "Unsaved",
                description: "Itinerary removed from your saved list.",
            });
        } else {
            const publicItineraries = getPublicItineraries();
            const itinerary = publicItineraries.find(trip => trip.id === itineraryId);
            if (itinerary) {
                setSavedItineraries(prev => [...prev, itinerary]);
                newSavedIds.add(itineraryId);
                toast({
                    title: "Saved",
                    description: "Itinerary saved to your collection.",
                });
            }
        }
        setSavedItineraryIds(newSavedIds);
        localStorage.setItem('savedItineraryIds', JSON.stringify(Array.from(newSavedIds)));
    };

    const handleCreateDiary = () => {
        if (!newDiaryTitle.trim() || !newDiaryContent.trim()) {
            toast({
                title: "Validation Error",
                description: "Please fill in title and content.",
                variant: "destructive",
            });
            return;
        }

        const newDiary: DiaryLog = {
            id: `diary_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            title: newDiaryTitle,
            content: newDiaryContent,
            location: newDiaryLocation || undefined,
            date: newDiaryDate,
            imageUrl: diaryAttachmentPreview || newDiaryImageUrl || undefined,
            createdAt: new Date().toISOString(),
        };

        const updatedDiaryLogs = [...diaryLogs, newDiary];
        setDiaryLogs(updatedDiaryLogs);
        localStorage.setItem('userDiaryLogs', JSON.stringify(updatedDiaryLogs));

        // Add photo if provided
        if (newDiaryImageUrl || diaryAttachmentPreview) {
            const photoUrl = diaryAttachmentPreview || newDiaryImageUrl;
            if (photoUrl) {
                setPhotos(prev => [...prev, photoUrl]);
            }
        }

        // Reset form
        setNewDiaryTitle('');
        setNewDiaryContent('');
        setNewDiaryLocation('');
        setNewDiaryDate(new Date().toISOString().split('T')[0]);
        setNewDiaryImageUrl('');
        setDiaryAttachment(null);
        setDiaryAttachmentPreview(null);
        setShowDiaryDialog(false);

        toast({
            title: "Diary Log Created",
            description: "Your diary entry has been saved.",
        });
    };

    const handleEditProfile = () => {
        setEditingProfileData(profileData);
        setIsEditMode(true);
    };

    const handleSaveProfile = () => {
        const updatedProfile = {
            ...editingProfileData,
            avatarUrl: avatarPreview || editingProfileData.avatarUrl,
            coverImageUrl: coverPreview || editingProfileData.coverImageUrl,
        };
        setProfileData(updatedProfile);
        localStorage.setItem('userProfileData', JSON.stringify(updatedProfile));
        
        // Reset file states
        setAvatarFile(null);
        setAvatarPreview(null);
        setCoverFile(null);
        setCoverPreview(null);
        setIsEditMode(false);

        toast({
            title: "Profile Updated",
            description: "Your profile changes have been saved.",
        });
    };

    const handleCancelEdit = () => {
        setEditingProfileData(profileData);
        setAvatarFile(null);
        setAvatarPreview(null);
        setCoverFile(null);
        setCoverPreview(null);
        setIsEditMode(false);
    };

    const handleAvatarUpload = (file: File) => {
        setAvatarFile(file);
        const reader = new FileReader();
        reader.onloadend = () => {
            setAvatarPreview(reader.result as string);
        };
        reader.readAsDataURL(file);
    };

    const handleCoverUpload = (file: File) => {
        setCoverFile(file);
        const reader = new FileReader();
        reader.onloadend = () => {
            setCoverPreview(reader.result as string);
        };
        reader.readAsDataURL(file);
    };

    const handleBioChange = (bio: string) => {
        setEditingProfileData({ ...editingProfileData, bio });
    };

    const handleLocationChange = (location: string) => {
        setEditingProfileData({ ...editingProfileData, location });
    };

    const handleSocialLinkChange = (platform: string, url: string) => {
        setEditingProfileData({
            ...editingProfileData,
            socialLinks: {
                ...editingProfileData.socialLinks,
                [platform]: url,
            },
        });
    };


    // Profile data for header
    const currentProfileData = {
        name: isEditMode ? editingProfileData.name : profileData.name,
        tagline: 'Travelling the world',
        avatarUrl: isEditMode ? editingProfileData.avatarUrl : profileData.avatarUrl,
        avatarAiHint: 'man portrait smiling',
        coverImageUrl: isEditMode ? editingProfileData.coverImageUrl : profileData.coverImageUrl,
        location: isEditMode ? editingProfileData.location : profileData.location,
        bio: isEditMode ? editingProfileData.bio : profileData.bio,
        following: 1,
        followers: 6,
        socialLinks: isEditMode ? editingProfileData.socialLinks : profileData.socialLinks,
        isEditMode,
        onEditClick: handleEditProfile,
        onSaveClick: handleSaveProfile,
        onCancelClick: handleCancelEdit,
        onAvatarUpload: handleAvatarUpload,
        onCoverUpload: handleCoverUpload,
        onBioChange: handleBioChange,
        onLocationChange: handleLocationChange,
        onSocialLinkChange: handleSocialLinkChange,
        avatarPreview: avatarPreview || undefined,
        coverPreview: coverPreview || undefined,
        onAvatarPreviewChange: (preview: string) => setAvatarPreview(preview),
        onCoverPreviewChange: (preview: string) => setCoverPreview(preview),
    };

    // Data for the stats card
    const statsData: StatItem[] = [
      { icon: MapPin, value: String(createdItineraries.length), label: 'Itineraries' },
      { icon: Heart, value: String(likedItineraryIds.size), label: 'Liked' },
      { icon: Bookmark, value: String(savedItineraryIds.size), label: 'Saved' },
      { icon: Calendar, value: String(diaryLogs.length), label: 'Diary Logs' },
    ];
    
    // Data for the wander badges
    const badgesData: BadgeInfo[] = [
      { id: 'b1', icon: Mountain, name: 'Mountain Conqueror', description: 'Summited 5 major peaks.' },
      { id: 'b2', icon: UtensilsCrossed, name: 'Culinary Explorer', description: 'Tasted cuisine from 20+ countries.' },
      { id: 'b3', icon: Tent, name: 'Wilderness Survivor', description: 'Spent 10 nights camping solo.' },
      { id: 'b4', icon: Waves, name: 'Ocean Wanderer', description: 'Sailed across an ocean.' },
    ];

    // Get current tab's content
    const currentItineraries = activeTab === 'itineraries' 
        ? createdItineraries 
        : activeTab === 'saved' 
        ? savedItineraries 
        : [];

  return (
    <div className="flex flex-col min-h-screen w-full bg-background font-sans">
      <Header
        isScrolled={isScrolled}
        searchQuery={searchQuery}
        onSearchQueryChange={setSearchQuery}
        onSearchSubmit={handleHeaderSearchSubmit}
        showCurrencySelector={false}
      />
      
      {/* Profile Header */}
      <ProfileHeader {...currentProfileData} />

      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-4 sm:py-8">
          {/* Mobile: Stats and Badges - Compact Single Line (Mobile Only) */}
          <div className="lg:hidden mb-4">
            <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto scrollbar-hide pb-2">
              {/* Stats - Compact */}
              <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0 bg-card border border-border rounded-lg px-3 sm:px-4 py-2">
                <span className="text-xs sm:text-sm font-semibold text-foreground whitespace-nowrap">Travel Stats:</span>
                {statsData.map((stat, idx) => (
                  <div key={idx} className="flex items-center gap-1 flex-shrink-0">
                    <stat.icon className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
                    <span className="text-xs sm:text-sm font-bold text-foreground">{stat.value}</span>
                    <span className="text-xs text-muted-foreground hidden sm:inline">{stat.label}</span>
      </div>
                ))}
          </div>

              {/* Badges - Compact */}
              <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0 bg-card border border-border rounded-lg px-3 sm:px-4 py-2">
                <span className="text-xs sm:text-sm font-semibold text-foreground whitespace-nowrap">Badges:</span>
                <div className="flex items-center gap-1.5 sm:gap-2">
                  {badgesData.slice(0, 3).map((badge) => (
                    <div key={badge.id} className="flex items-center gap-1 flex-shrink-0">
                      <badge.icon className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
                    </div>
                  ))}
                  {badgesData.length > 3 && (
                    <span className="text-xs text-muted-foreground">+{badgesData.length - 3}</span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex items-center gap-1 mb-6 sm:mb-8 border-b border-border overflow-x-auto scrollbar-hide">
            <button
              onClick={() => setActiveTab('itineraries')}
              className={cn(
                "px-3 sm:px-6 py-2 sm:py-3 text-xs sm:text-sm font-semibold border-b-2 transition-colors relative whitespace-nowrap flex-shrink-0",
                activeTab === 'itineraries'
                  ? "text-foreground border-primary"
                  : "text-muted-foreground border-transparent hover:text-foreground"
              )}
            >
              <div className="flex items-center gap-1.5 sm:gap-2">
                <Briefcase className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                <span className="hidden xs:inline">My Itineraries</span>
                <span className="xs:hidden">Itineraries</span>
                <Badge variant="secondary" className="ml-1 sm:ml-2 text-xs px-1.5 sm:px-2 py-0.5">
                  {createdItineraries.length}
                </Badge>
      </div>
            </button>
            <button
              onClick={() => setActiveTab('saved')}
              className={cn(
                "px-3 sm:px-6 py-2 sm:py-3 text-xs sm:text-sm font-semibold border-b-2 transition-colors relative whitespace-nowrap flex-shrink-0",
                activeTab === 'saved'
                  ? "text-foreground border-primary"
                  : "text-muted-foreground border-transparent hover:text-foreground"
              )}
            >
              <div className="flex items-center gap-1.5 sm:gap-2">
                <Bookmark className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                <span>Saved</span>
                <Badge variant="secondary" className="ml-1 sm:ml-2 text-xs px-1.5 sm:px-2 py-0.5">
                  {savedItineraryIds.size}
                </Badge>
              </div>
            </button>
            <button
              onClick={() => setActiveTab('photos')}
              className={cn(
                "px-3 sm:px-6 py-2 sm:py-3 text-xs sm:text-sm font-semibold border-b-2 transition-colors relative whitespace-nowrap flex-shrink-0",
                activeTab === 'photos'
                  ? "text-foreground border-primary"
                  : "text-muted-foreground border-transparent hover:text-foreground"
              )}
            >
              <div className="flex items-center gap-1.5 sm:gap-2">
                <Camera className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                <span>Photos</span>
                <Badge variant="secondary" className="ml-1 sm:ml-2 text-xs px-1.5 sm:px-2 py-0.5">
                  {photos.length}
                </Badge>
              </div>
            </button>
            <button
              onClick={() => setActiveTab('diaryLogs')}
              className={cn(
                "px-3 sm:px-6 py-2 sm:py-3 text-xs sm:text-sm font-semibold border-b-2 transition-colors relative whitespace-nowrap flex-shrink-0",
                activeTab === 'diaryLogs'
                  ? "text-foreground border-primary"
                  : "text-muted-foreground border-transparent hover:text-foreground"
              )}
            >
              <div className="flex items-center gap-1.5 sm:gap-2">
                <Calendar className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                <span className="hidden sm:inline">Diary Logs</span>
                <span className="sm:hidden">Diary</span>
                <Badge variant="secondary" className="ml-1 sm:ml-2 text-xs px-1.5 sm:px-2 py-0.5">
                  {diaryLogs.length}
                </Badge>
              </div>
            </button>
          </div>

          {/* Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-9">
              {activeTab === 'photos' ? (
                // Photos Grid
                photos.length > 0 ? (
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                    {photos.map((photoUrl, index) => (
                      <div
                        key={index}
                        className="relative aspect-square rounded-xl overflow-hidden group cursor-pointer hover:scale-105 transition-transform duration-300"
                      >
                        <Image
                          src={photoUrl}
                          alt={`Photo ${index + 1}`}
                          fill
                          className="object-cover"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-16">
                    <Camera className="h-16 w-16 mx-auto mb-4 text-muted-foreground/30" />
                    <h3 className="text-xl font-semibold mb-2 text-foreground">No Photos Yet</h3>
                    <p className="text-muted-foreground">Photos from your itineraries and diary logs will appear here.</p>
                  </div>
                )
              ) : activeTab === 'diaryLogs' ? (
                // Diary Logs Grid
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="font-headline text-2xl font-bold text-foreground">My Diary Logs</h2>
                    <Button
                      className="bg-primary hover:bg-primary/90 text-white"
                      onClick={() => setShowDiaryDialog(true)}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      New Diary Entry
                    </Button>
                  </div>
                  {diaryLogs.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {diaryLogs.map(diaryLog => (
                        <DiaryLogCard
                          key={diaryLog.id}
                          diaryLog={diaryLog}
                          onClick={() => {
                            toast({
                              title: diaryLog.title,
                              description: diaryLog.content.substring(0, 100) + '...',
                            });
                          }}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-16">
                      <Calendar className="h-16 w-16 mx-auto mb-4 text-muted-foreground/30" />
                      <h3 className="text-xl font-semibold mb-2 text-foreground">No Diary Logs Yet</h3>
                      <p className="text-muted-foreground mb-6">Start documenting your travel experiences</p>
                      <Button
                        className="bg-primary hover:bg-primary/90 text-white"
                        onClick={() => setShowDiaryDialog(true)}
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Create First Entry
                      </Button>
                    </div>
                  )}
                </div>
              ) : (
                // Itineraries Grid (for itineraries and saved tabs)
                currentItineraries.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {currentItineraries.map(itinerary => (
                      <ItineraryCard
                        key={itinerary.id}
                        itinerary={itinerary}
                        isLiked={likedItineraryIds.has(itinerary.id)}
                        isSaved={savedItineraryIds.has(itinerary.id)}
                        onLike={handleLike}
                        onSave={handleSave}
                        onClick={() => handleItineraryClick(itinerary)}
                        showCreator={activeTab === 'saved'}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-16">
                    <Briefcase className="h-16 w-16 mx-auto mb-4 text-muted-foreground/30" />
                    <h3 className="text-xl font-semibold mb-2 text-foreground">
                      {activeTab === 'itineraries' ? 'No Itineraries Created Yet' : 'No Saved Itineraries'}
                    </h3>
                    <p className="text-muted-foreground">
                      {activeTab === 'itineraries' 
                        ? 'Start creating and sharing your travel itineraries!' 
                        : 'Save itineraries from the Trailboard to see them here.'}
                    </p>
                  </div>
                )
              )}
          </div>

            {/* Sidebar - Desktop Only */}
            <div className="hidden lg:block lg:col-span-3 space-y-6">
              <StatsCard stats={statsData} />
            <WanderBadgesCard badges={badgesData} />
            </div>
          </div>
        </div>
      </main>
      
      {/* Diary Creation Dialog */}
      <Dialog open={showDiaryDialog} onOpenChange={setShowDiaryDialog}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Create New Diary Entry</DialogTitle>
            <DialogDescription>
              Document your travel experiences and memories.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="diary-title">Title *</Label>
              <Input
                id="diary-title"
                value={newDiaryTitle}
                onChange={(e) => setNewDiaryTitle(e.target.value)}
                placeholder="e.g., Amazing day in Tokyo"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="diary-content">Content *</Label>
              <Textarea
                id="diary-content"
                value={newDiaryContent}
                onChange={(e) => setNewDiaryContent(e.target.value)}
                placeholder="Write about your experience..."
                className="min-h-[150px]"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="diary-location">Location</Label>
                <Input
                  id="diary-location"
                  value={newDiaryLocation}
                  onChange={(e) => setNewDiaryLocation(e.target.value)}
                  placeholder="e.g., Tokyo, Japan"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="diary-date">Date</Label>
                <Input
                  id="diary-date"
                  type="date"
                  value={newDiaryDate}
                  onChange={(e) => setNewDiaryDate(e.target.value)}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Attachment (optional)</Label>
              <div className="space-y-3">
                {diaryAttachmentPreview ? (
                  <div className="relative">
                    <div className="relative aspect-video w-full rounded-lg overflow-hidden border border-border">
                      <Image
                        src={diaryAttachmentPreview}
                        alt="Attachment preview"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute top-2 right-2 h-8 w-8 bg-background/90 hover:bg-background text-foreground rounded-full border border-border"
                      onClick={() => {
                        setDiaryAttachment(null);
                        setDiaryAttachmentPreview(null);
                      }}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <label
                    htmlFor="diary-attachment"
                    className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-border rounded-lg cursor-pointer hover:border-primary hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Camera className="h-8 w-8 mb-2 text-muted-foreground" />
                      <p className="mb-2 text-sm text-muted-foreground">
                        <span className="font-semibold">Click to upload</span> or drag and drop
                      </p>
                      <p className="text-xs text-muted-foreground">PNG, JPG, GIF up to 10MB</p>
                    </div>
                    <input
                      id="diary-attachment"
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          // Check file size (10MB)
                          if (file.size > 10 * 1024 * 1024) {
                            toast({
                              title: "File too large",
                              description: "Please select an image smaller than 10MB.",
                              variant: "destructive",
                            });
                            return;
                          }
                          setDiaryAttachment(file);
                          const reader = new FileReader();
                          reader.onloadend = () => {
                            setDiaryAttachmentPreview(reader.result as string);
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                    />
                  </label>
                )}
                {!diaryAttachmentPreview && (
                  <div className="text-center">
                    <p className="text-xs text-muted-foreground mb-2">Or enter image URL:</p>
                    <Input
                      value={newDiaryImageUrl}
                      onChange={(e) => setNewDiaryImageUrl(e.target.value)}
                      placeholder="https://..."
                      className="text-sm"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setShowDiaryDialog(false);
                setNewDiaryTitle('');
                setNewDiaryContent('');
                setNewDiaryLocation('');
                setNewDiaryDate(new Date().toISOString().split('T')[0]);
                setNewDiaryImageUrl('');
                setDiaryAttachment(null);
                setDiaryAttachmentPreview(null);
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={handleCreateDiary}
              className="bg-primary hover:bg-primary/90 text-white"
            >
              Create Entry
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <ProfileFooter />
    </div>
  );
}
