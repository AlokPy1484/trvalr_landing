"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ChatMessageBubble, type MessageProps } from "./ChatMessageBubble";
import {
  ImagePlus,
  Paperclip,
  Mic,
  Send,
  Map,
  CalendarDays,
  MapPin,
  X,
  Play,
  Trash2,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { searchLocations, type CityData, type CountryData } from "@/data/cities";
import { cn } from "@/lib/utils";

interface WanderChatsMainProps {
  chatName: string;
  location?: string;
  dateRange?: string;
  groupMembers?: { name: string; avatarUrl: string; aiHint: string }[]; // For group chats
  messages: MessageProps[];
  onSendMessage?: (message: Omit<MessageProps, 'id' | 'timestamp' | 'views' | 'isRead'>) => void;
}

const placeholderAmbientImage =
  "https://images.unsplash.com/photo-1517524206127-48bbd363f357?q=80&w=1200&auto=format&fit=crop";
const placeholderAiHint = "desert landscape sunset";

export function WanderChatsMain({
  chatName,
  location,
  dateRange,
  groupMembers,
  messages,
  onSendMessage,
}: WanderChatsMainProps) {
  const { getTranslation } = useLanguage();
  const [newMessage, setNewMessage] = useState("");
  const [attachments, setAttachments] = useState<Array<{ type: 'image' | 'file' | 'location' | 'voice'; data: string | File; preview?: string; duration?: number }>>([]);
  const [locationPickerOpen, setLocationPickerOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<string>("");
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const recordingTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({
        top: scrollAreaRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim() === "" && attachments.length === 0) return;
    
    if (onSendMessage) {
      const currentUser = "Phil Harrison"; // This should come from auth context
      const currentAvatar = "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=32&h=32&fit=crop";
      
      onSendMessage({
        sender: currentUser,
        text: newMessage.trim(),
        avatarUrl: currentAvatar,
        aiHint: 'user avatar male',
        isCurrentUser: true,
        profilePath: '/profile/phil-harrison',
        attachments: attachments.length > 0 ? attachments : undefined,
      });
    }
    
    setNewMessage("");
    setAttachments([]);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    
    Array.from(files).forEach(file => {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setAttachments(prev => [...prev, {
            type: 'image',
            data: file,
            preview: reader.result as string
          }]);
        };
        reader.readAsDataURL(file);
      }
    });
    if (imageInputRef.current) imageInputRef.current.value = '';
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    
    Array.from(files).forEach(file => {
      setAttachments(prev => [...prev, {
        type: 'file',
        data: file,
      }]);
    });
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleLocationSelect = (location: string) => {
    setAttachments(prev => [...prev, {
      type: 'location',
      data: location,
    }]);
    setLocationPickerOpen(false);
    setSelectedLocation("");
  };


  const handleRemoveAttachment = (index: number) => {
    setAttachments(prev => prev.filter((_, i) => i !== index));
  };

  const handleVoiceRecord = async () => {
    if (!isRecording) {
      try {
        // Request microphone access
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        
        // Create MediaRecorder
        const mediaRecorder = new MediaRecorder(stream);
        mediaRecorderRef.current = mediaRecorder;
        audioChunksRef.current = [];
        
        // Collect audio chunks
        mediaRecorder.ondataavailable = (event) => {
          if (event.data.size > 0) {
            audioChunksRef.current.push(event.data);
          }
        };
        
        // When recording stops, create blob and URL
        mediaRecorder.onstop = () => {
          const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
          const url = URL.createObjectURL(audioBlob);
          setAudioBlob(audioBlob);
          setAudioUrl(url);
          
          // Stop all tracks to release microphone
          stream.getTracks().forEach(track => track.stop());
        };
        
        // Start recording
        mediaRecorder.start();
        setIsRecording(true);
        setRecordingTime(0);
        
        // Start timer
        recordingTimerRef.current = setInterval(() => {
          setRecordingTime(prev => prev + 1);
        }, 1000);
        
      } catch (error) {
        console.error("Error accessing microphone:", error);
        alert("Unable to access microphone. Please check your permissions.");
      }
    } else {
      // Stop recording
      if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
        mediaRecorderRef.current.stop();
      }
      setIsRecording(false);
      
      // Clear timer
      if (recordingTimerRef.current) {
        clearInterval(recordingTimerRef.current);
        recordingTimerRef.current = null;
      }
    }
  };

  const handleSaveVoiceNote = () => {
    if (audioBlob && audioUrl) {
      const file = new File([audioBlob], `voice-note-${Date.now()}.webm`, { type: 'audio/webm' });
      setAttachments(prev => [...prev, {
        type: 'voice',
        data: file,
        preview: audioUrl,
        duration: recordingTime
      }]);
      
      // Reset recording state
      setAudioBlob(null);
      setAudioUrl(null);
      setRecordingTime(0);
    }
  };

  const handleCancelVoiceNote = () => {
    // Stop recording if still recording
    if (isRecording && mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
    
    // Clear timer
    if (recordingTimerRef.current) {
      clearInterval(recordingTimerRef.current);
      recordingTimerRef.current = null;
    }
    
    // Revoke audio URL if exists
    if (audioUrl) {
      URL.revokeObjectURL(audioUrl);
    }
    
    // Reset state
    setAudioBlob(null);
    setAudioUrl(null);
    setRecordingTime(0);
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (recordingTimerRef.current) {
        clearInterval(recordingTimerRef.current);
      }
      if (audioUrl) {
        URL.revokeObjectURL(audioUrl);
      }
      if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
        mediaRecorderRef.current.stop();
      }
    };
  }, [audioUrl]);

  return (
    <main className="flex-1 flex flex-col relative overflow-hidden bg-background">
      {/* Ambient Background Image */}
      <div className="absolute inset-0 z-0 opacity-5">
        <Image
          src={placeholderAmbientImage}
          alt={getTranslation(
            "wanderChatAmbientBgAlt",
            "Ambient travel background"
          )}
          fill
          className="object-cover blur-sm"
          data-ai-hint={placeholderAiHint}
        />
        <div className="absolute inset-0 bg-background/80"></div>
      </div>

      {/* Chat Header */}
      <header className="relative z-10 p-4 border-b border-border bg-card/80 backdrop-blur-lg flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10 border-2 border-border">
            <AvatarImage
              src={`https://placehold.co/40x40/94a3b8/1e293b.png?text=${chatName.substring(
                0,
                1
              )}`}
              alt={chatName}
              data-ai-hint="chat avatar"
            />
            <AvatarFallback>{chatName.substring(0, 1)}</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-semibold text-foreground text-lg">
              {chatName}
            </h3>
            {(location || dateRange) && (
              <div className="flex items-center text-xs text-muted-foreground gap-2">
                {location && (
                  <>
                    <MapPin className="h-3 w-3" />
                    <span>{location}</span>
                  </>
                )}
                {location && dateRange && <span>•</span>}
                {dateRange && (
                  <>
                    <CalendarDays className="h-3 w-3" />
                    <span>{dateRange}</span>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Messages Area */}
      <ScrollArea
        className="flex-1 p-4 md:p-6 space-y-6 relative z-10"
        ref={scrollAreaRef as any}
      >
        {messages.map((msg) => (
          <ChatMessageBubble key={msg.id} {...msg} />
        ))}
      </ScrollArea>

      {/* Message Input Area */}
      <footer className="relative z-10 p-3 md:p-4 border-t border-border bg-card/80 backdrop-blur-lg">
        {/* Attachments Preview */}
        {attachments.length > 0 && (
          <div className="mb-2 flex flex-wrap gap-2">
            {attachments.map((attachment, index) => (
              <div key={index} className="relative group">
                {attachment.type === 'image' && attachment.preview && (
                  <div className="relative w-20 h-20 rounded-lg overflow-hidden border border-border">
                    <Image
                      src={attachment.preview}
                      alt="Attachment preview"
                      fill
                      className="object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveAttachment(index)}
                      className="absolute top-1 right-1 h-5 w-5 rounded-full bg-black/60 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                )}
                {attachment.type === 'file' && attachment.data instanceof File && (
                  <div className="flex items-center gap-2 px-3 py-2 rounded-lg border border-border bg-muted/50">
                    <Paperclip className="h-4 w-4 text-muted-foreground" />
                    <span className="text-xs text-foreground max-w-[100px] truncate">
                      {attachment.data.name}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleRemoveAttachment(index)}
                      className="h-4 w-4 rounded-full bg-black/60 text-white flex items-center justify-center"
                    >
                      <X className="h-2.5 w-2.5" />
                    </button>
                  </div>
                )}
                {attachment.type === 'location' && (
                  <div className="flex items-center gap-2 px-3 py-2 rounded-lg border border-border bg-muted/50">
                    <Map className="h-4 w-4 text-muted-foreground" />
                    <span className="text-xs text-foreground max-w-[150px] truncate">
                      {attachment.data as string}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleRemoveAttachment(index)}
                      className="h-4 w-4 rounded-full bg-black/60 text-white flex items-center justify-center"
                    >
                      <X className="h-2.5 w-2.5" />
                    </button>
                  </div>
                )}
                {attachment.type === 'voice' && attachment.preview && (
                  <div className="flex items-center gap-2 px-3 py-2 rounded-lg border border-border bg-muted/50">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        const audio = new Audio(attachment.preview);
                        audio.play();
                      }}
                      className="h-8 w-8 rounded-full bg-primary text-white flex items-center justify-center hover:bg-primary/90 transition-colors"
                    >
                      <Play className="h-4 w-4 ml-0.5" />
                    </button>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-foreground">Voice Note</p>
                      <p className="text-[10px] text-muted-foreground">
                        {attachment.duration ? `${Math.floor(attachment.duration / 60)}:${String(attachment.duration % 60).padStart(2, '0')}` : '0:00'}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveAttachment(index)}
                      className="h-4 w-4 rounded-full bg-black/60 text-white flex items-center justify-center"
                    >
                      <X className="h-2.5 w-2.5" />
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        <form onSubmit={handleSendMessage} className="flex items-end gap-2">
          <div className="flex items-center gap-1">
            {/* Image Upload */}
            <input
              ref={imageInputRef}
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={handleImageUpload}
            />
            <Button
              variant="ghost"
              size="icon"
              type="button"
              className="h-9 w-9 text-muted-foreground hover:text-foreground"
              onClick={() => imageInputRef.current?.click()}
            >
              <ImagePlus className="h-5 w-5" />
              <span className="sr-only">
                {getTranslation("wanderChatAddImage", "Add Image")}
              </span>
            </Button>

            {/* File Upload */}
            <input
              ref={fileInputRef}
              type="file"
              className="hidden"
              onChange={handleFileUpload}
            />
            <Button
              variant="ghost"
              size="icon"
              type="button"
              className="h-9 w-9 text-muted-foreground hover:text-foreground"
              onClick={() => fileInputRef.current?.click()}
            >
              <Paperclip className="h-5 w-5" />
              <span className="sr-only">
                {getTranslation("wanderChatAddFile", "Add File")}
              </span>
            </Button>

            {/* Location */}
            <Popover open={locationPickerOpen} onOpenChange={setLocationPickerOpen}>
              <PopoverTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              type="button"
                  className="h-9 w-9 text-muted-foreground hover:text-foreground"
            >
              <Map className="h-5 w-5" />
              <span className="sr-only">
                {getTranslation("wanderChatAddLocation", "Add Location")}
              </span>
            </Button>
              </PopoverTrigger>
              <PopoverContent 
                className="w-80 p-0" 
                side="top"
                align="start"
              >
                <LocationPickerPopover
                  onSelect={handleLocationSelect}
                  selectedLocation={selectedLocation}
                  onLocationChange={setSelectedLocation}
                />
              </PopoverContent>
            </Popover>

            {/* Voice Message */}
            <Button
              variant="ghost"
              size="icon"
              type="button"
              className={cn(
                "h-9 w-9 text-muted-foreground hover:text-foreground",
                isRecording && "bg-red-500/20 text-red-500 animate-pulse"
              )}
              onClick={handleVoiceRecord}
            >
              <Mic className="h-5 w-5" />
              <span className="sr-only">
                {getTranslation("wanderChatVoiceMessage", "Voice Message")}
              </span>
            </Button>
          </div>

          {/* Voice Recording UI */}
          {(isRecording || audioUrl) && (
            <div className="mt-2 p-3 rounded-lg border border-border bg-muted/30 flex items-center gap-3">
              {isRecording ? (
                <>
                  <div className="flex items-center gap-2 flex-1">
                    <div className="h-3 w-3 rounded-full bg-red-500 animate-pulse" />
                    <span className="text-sm text-foreground">
                      Recording... {Math.floor(recordingTime / 60)}:{String(recordingTime % 60).padStart(2, '0')}
                    </span>
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={handleCancelVoiceNote}
                    className="h-8"
                  >
                    Cancel
                  </Button>
                </>
              ) : audioUrl ? (
                <>
                  <button
                    type="button"
                    onClick={() => {
                      const audio = new Audio(audioUrl);
                      audio.play();
                    }}
                    className="h-8 w-8 rounded-full bg-primary text-white flex items-center justify-center hover:bg-primary/90 transition-colors"
                  >
                    <Play className="h-4 w-4 ml-0.5" />
                  </button>
                  <div className="flex-1">
                    <p className="text-xs font-medium text-foreground">Voice Note</p>
                    <p className="text-[10px] text-muted-foreground">
                      {Math.floor(recordingTime / 60)}:{String(recordingTime % 60).padStart(2, '0')}
                    </p>
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={handleCancelVoiceNote}
                    className="h-8"
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                  <Button
                    type="button"
                    size="sm"
                    onClick={handleSaveVoiceNote}
                    className="h-8 bg-primary text-white hover:bg-primary/90"
                  >
                    Add
                  </Button>
                </>
              ) : null}
          </div>
          )}
          <Textarea
            placeholder={getTranslation(
              "wanderChatMessagePlaceholder",
              "Type a memory, thought or plan…"
            )}
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage(e as any);
              }
            }}
            rows={1}
            className="flex-grow resize-none max-h-24 text-sm py-2.5 px-3.5"
          />
          <Button
            type="submit"
            size="icon"
            className="h-9 w-9 bg-primary text-white hover:bg-primary/90 rounded-full flex-shrink-0"
            disabled={newMessage.trim() === "" && attachments.length === 0}
          >
            <Send className="h-4 w-4" />
            <span className="sr-only">
              {getTranslation("wanderChatSendButton", "Send")}
            </span>
          </Button>
        </form>

      </footer>
    </main>
  );
}

// Location Picker Popover Component
interface LocationPickerPopoverProps {
  onSelect: (location: string) => void;
  selectedLocation: string;
  onLocationChange: (location: string) => void;
}

function LocationPickerPopover({ onSelect, selectedLocation, onLocationChange }: LocationPickerPopoverProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState<Array<CityData | CountryData>>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [mapLocation, setMapLocation] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  useEffect(() => {
    if (selectedLocation) {
      setMapLocation(selectedLocation);
    }
  }, [selectedLocation]);

  const handleInputChange = (value: string) => {
    setSearchQuery(value);
    if (value.trim().length > 0) {
      const results = searchLocations(value, 10);
      setSuggestions(results);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSelect = (item: CityData | CountryData) => {
    const locationName = 'country' in item ? `${item.name}, ${item.country}` : item.name;
    setMapLocation(locationName);
    onLocationChange(locationName);
    setSearchQuery(locationName);
    setShowSuggestions(false);
  };

  const handleAddLocation = () => {
    if (mapLocation.trim()) {
      onSelect(mapLocation);
    }
  };

  // Encode location for map URL
  const encodedLocation = encodeURIComponent(mapLocation || "World");

  return (
    <div className="flex flex-col">
      {/* Search Input */}
      <div className="p-3 border-b border-border">
        <div className="relative">
          <Input
            ref={inputRef}
            value={searchQuery}
            onChange={(e) => handleInputChange(e.target.value)}
            placeholder="Search for a location..."
            className="w-full"
          />
          {showSuggestions && suggestions.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-1 max-h-40 overflow-y-auto rounded-lg border bg-card shadow-lg z-50">
              {suggestions.map((item, idx) => {
                const displayName = 'country' in item ? `${item.name}, ${item.country}` : item.name;
                return (
                  <button
                    key={idx}
                    onClick={() => handleSelect(item)}
                    className="w-full text-left px-3 py-2 hover:bg-muted transition-colors text-foreground flex items-center gap-2 text-sm"
                  >
                    <MapPin className="h-3.5 w-3.5 text-muted-foreground flex-shrink-0" />
                    <span className="truncate">{displayName}</span>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Map */}
      <div className="h-48 w-full relative border-b border-border bg-muted/30">
        {mapLocation ? (
          <iframe
            width="100%"
            height="100%"
            style={{ border: 0 }}
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
            src={`https://www.google.com/maps/embed/v1/search?key=AIzaSyBFw0Qbyq9zTFTd-tUY6d-s6U4qGbkjJxY&q=${encodedLocation}&zoom=12`}
          />
        ) : (
          <div className="flex items-center justify-center h-full text-muted-foreground text-sm">
            Search for a location to see it on the map
          </div>
        )}
      </div>

      {/* Selected Location Display and Add Button */}
      <div className="p-3 flex items-center gap-2">
        {mapLocation && (
          <div className="flex items-center gap-2 flex-1 min-w-0">
            <MapPin className="h-4 w-4 text-muted-foreground flex-shrink-0" />
            <span className="text-sm text-foreground truncate">{mapLocation}</span>
          </div>
        )}
        <Button
          onClick={handleAddLocation}
          disabled={!mapLocation.trim()}
          size="sm"
          className="h-8 bg-primary text-white hover:bg-primary/90"
        >
          Add
        </Button>
      </div>
    </div>
  );
}
