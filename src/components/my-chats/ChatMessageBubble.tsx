
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { MapPin, Paperclip, Play, Eye, X, Download, ExternalLink } from 'lucide-react';

export interface MessageProps {
  id: string;
  sender: string;
  text: string;
  timestamp: string;
  avatarUrl: string;
  aiHint: string;
  isCurrentUser: boolean; // To determine alignment and styling
  profilePath?: string;
  views?: number; // Number of views/reads
  isRead?: boolean; // Whether the message has been read
  attachments?: Array<{ type: 'image' | 'file' | 'location' | 'voice'; data: string | File; preview?: string; duration?: number }>;
}

export function ChatMessageBubble({
  sender,
  text,
  timestamp,
  avatarUrl,
  aiHint,
  isCurrentUser,
  profilePath,
  views,
  isRead,
  attachments = [],
}: MessageProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const [playingAudio, setPlayingAudio] = useState<HTMLAudioElement | null>(null);
  const avatarElement = (
    <Avatar className={cn("h-8 w-8 self-end mb-1 flex-shrink-0", isCurrentUser ? "ml-2" : "mr-2")}>
      <AvatarImage src={avatarUrl} alt={sender} data-ai-hint={aiHint} />
      <AvatarFallback>{sender.substring(0, 1)}</AvatarFallback>
    </Avatar>
  );

  return (
    <div
      className={cn(
        "flex items-end gap-2 max-w-[75%] md:max-w-[65%]",
        isCurrentUser ? "ml-auto flex-row-reverse" : "mr-auto"
      )}
    >
      {profilePath ? (
        <Link href={profilePath} passHref>
          {avatarElement}
        </Link>
      ) : (
        avatarElement
      )}
      <div
        className={cn(
          "p-3 rounded-xl min-w-[80px]",
          isCurrentUser
            ? "bg-primary text-white rounded-br-none"
            : "bg-muted text-foreground rounded-bl-none"
        )}
      >
        {!isCurrentUser && (
          <p className="text-xs font-medium text-primary mb-0.5">{sender}</p>
        )}
        
        {/* Message Text */}
        {text && (
          <p className="text-sm leading-snug whitespace-pre-wrap">{text}</p>
        )}
        
        {/* Attachments */}
        {attachments.length > 0 && (
          <div className="mt-2 space-y-2">
            {attachments.map((attachment, idx) => (
              <div key={idx}>
                {attachment.type === 'image' && attachment.preview && (
                  <button
                    onClick={() => setSelectedImage(attachment.preview!)}
                    className={cn(
                      "relative w-48 h-32 rounded-lg overflow-hidden cursor-pointer hover:opacity-90 transition-opacity group",
                      isCurrentUser ? "border border-white/20" : "border border-border"
                    )}
                  >
                    <Image
                      src={attachment.preview}
                      alt="Attachment"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                  </button>
                )}
                {attachment.type === 'file' && (
                  <button
                    onClick={() => {
                      if (attachment.data instanceof File) {
                        const url = URL.createObjectURL(attachment.data);
                        const a = document.createElement('a');
                        a.href = url;
                        a.download = attachment.data.name;
                        document.body.appendChild(a);
                        a.click();
                        document.body.removeChild(a);
                        URL.revokeObjectURL(url);
                      }
                    }}
                    className={cn(
                      "flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer hover:opacity-80 transition-opacity w-full text-left",
                      isCurrentUser ? "bg-white/10 border border-white/20 hover:bg-white/15" : "bg-muted/50 border border-border hover:bg-muted/70"
                    )}
                  >
                    <Paperclip className="h-4 w-4 flex-shrink-0" />
                    <span className={cn(
                      "text-xs truncate flex-1",
                      isCurrentUser ? "text-white" : "text-foreground"
                    )}>
                      {attachment.data instanceof File ? attachment.data.name : 'File'}
                    </span>
                    <Download className={cn("h-3.5 w-3.5 flex-shrink-0", isCurrentUser ? "text-white/70" : "text-muted-foreground")} />
                  </button>
                )}
                {attachment.type === 'location' && (
                  <button
                    onClick={() => setSelectedLocation(attachment.data as string)}
                    className={cn(
                      "flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer hover:opacity-80 transition-opacity w-full text-left",
                      isCurrentUser ? "bg-white/10 border border-white/20 hover:bg-white/15" : "bg-muted/50 border border-border hover:bg-muted/70"
                    )}
                  >
                    <MapPin className="h-4 w-4 flex-shrink-0" />
                    <span className={cn(
                      "text-xs truncate flex-1",
                      isCurrentUser ? "text-white" : "text-foreground"
                    )}>
                      {attachment.data as string}
                    </span>
                    <ExternalLink className={cn("h-3.5 w-3.5 flex-shrink-0", isCurrentUser ? "text-white/70" : "text-muted-foreground")} />
                  </button>
                )}
                {attachment.type === 'voice' && attachment.preview && (
                  <div className={cn(
                    "flex items-center gap-2 px-3 py-2 rounded-lg",
                    isCurrentUser ? "bg-white/10 border border-white/20" : "bg-muted/50 border border-border"
                  )}>
                    <button
                      onClick={() => {
                        if (playingAudio) {
                          playingAudio.pause();
                          playingAudio.currentTime = 0;
                          setPlayingAudio(null);
                        } else {
                          const audio = new Audio(attachment.preview);
                          audio.play();
                          setPlayingAudio(audio);
                          audio.onended = () => setPlayingAudio(null);
                          audio.onpause = () => setPlayingAudio(null);
                        }
                      }}
                      className={cn(
                        "h-8 w-8 rounded-full flex items-center justify-center hover:opacity-80 transition-opacity",
                        isCurrentUser ? "bg-white/20 hover:bg-white/30" : "bg-primary/20 hover:bg-primary/30"
                      )}
                    >
                      {playingAudio && !playingAudio.paused ? (
                        <X className={cn("h-4 w-4", isCurrentUser ? "text-white" : "text-primary")} />
                      ) : (
                        <Play className={cn("h-4 w-4 ml-0.5", isCurrentUser ? "text-white" : "text-primary")} />
                      )}
                    </button>
                    <span className={cn(
                      "text-xs",
                      isCurrentUser ? "text-white" : "text-foreground"
                    )}>
                      {attachment.duration ? `${Math.floor(attachment.duration / 60)}:${String(attachment.duration % 60).padStart(2, '0')}` : '0:00'}
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
        
        {/* Timestamp and Views */}
        <div className={cn(
          "flex items-center gap-1.5 mt-1.5",
          isCurrentUser ? "justify-end" : "justify-start"
        )}>
          <p
            className={cn(
              "text-[10px]",
              isCurrentUser ? "text-white/80" : "text-muted-foreground"
            )}
          >
            {timestamp}
          </p>
          {isCurrentUser && views !== undefined && views > 0 && (
            <div className="flex items-center gap-1 text-[10px] text-white/60">
              <Eye className="h-3 w-3" />
              <span>{views}</span>
            </div>
          )}
          {isCurrentUser && isRead !== undefined && (
            <div className={cn(
              "h-1.5 w-1.5 rounded-full",
              isRead ? "bg-blue-300" : "bg-white/40"
            )} />
          )}
        </div>
      </div>

      {/* Image Viewer Dialog */}
      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-4xl w-full p-0 bg-black/95 border-none">
          <div className="relative w-full aspect-video max-h-[90vh]">
            {selectedImage && (
              <Image
                src={selectedImage}
                alt="Full size image"
                fill
                className="object-contain"
              />
            )}
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 text-white"
              onClick={() => setSelectedImage(null)}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Location Viewer Dialog */}
      <Dialog open={!!selectedLocation} onOpenChange={() => setSelectedLocation(null)}>
        <DialogContent className="max-w-2xl w-full p-0">
          <div className="relative w-full h-96">
            {selectedLocation && (
              <iframe
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                src={`https://www.google.com/maps/embed/v1/search?key=AIzaSyBFw0Qbyq9zTFTd-tUY6d-s6U4qGbkjJxY&q=${encodeURIComponent(selectedLocation)}&zoom=15`}
              />
            )}
            <div className="absolute top-4 left-4 bg-background/90 backdrop-blur-sm px-3 py-2 rounded-lg border border-border">
              <p className="text-sm font-medium text-foreground flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary" />
                {selectedLocation}
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
