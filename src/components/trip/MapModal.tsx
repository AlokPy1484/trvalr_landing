'use client';

import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface MapModalProps {
  isOpen: boolean;
  onClose: () => void;
  location: string;
  title?: string;
}

export function MapModal({ isOpen, onClose, location, title }: MapModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl w-[95vw] h-[90vh] p-0 gap-0 overflow-hidden flex flex-col [&>button]:!hidden">
        <DialogHeader className="px-4 sm:px-6 py-3 sm:py-4 border-b border-border bg-card flex-shrink-0">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-base sm:text-lg font-semibold">
              {title || `Map of ${location}`}
            </DialogTitle>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-full"
              onClick={onClose}
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </Button>
          </div>
        </DialogHeader>
        
        <div className="flex-1 min-h-0 w-full">
          <iframe
            className="w-full h-full"
            src={`https://maps.google.com/maps?width=100%&height=100%&hl=en&q=${encodeURIComponent(
              location
            )}&t=&z=12&ie=UTF8&iwloc=B&output=embed`}
            style={{ border: 0 }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title={`Full screen map of ${location}`}
            allowFullScreen
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}

