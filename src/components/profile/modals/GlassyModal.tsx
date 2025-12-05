
'use client';

import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogOverlay,
  DialogPortal,
} from "@/components/ui/dialog";
// Removed X import as DialogContent provides its own close button
import { cn } from '@/lib/utils';

interface GlassyModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  modalWidthClass?: string; // e.g., "max-w-md", "max-w-lg"
}

export function GlassyModal({
  isOpen,
  onClose,
  title,
  children,
  modalWidthClass = "max-w-md", // Default width ~448px
}: GlassyModalProps) {
  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogPortal>
        <DialogOverlay className="bg-black/40 backdrop-blur-sm fixed inset-0 z-50" />
        <DialogContent
          className={cn(
            // Centering, base layout, and glassy/shadow effects
            "fixed left-1/2 top-1/2 z-50 flex w-[90vw] -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden rounded-[20px] bg-background/90 p-0 shadow-2xl backdrop-blur-xl focus:outline-none",
            // Animations from ShadCN Dialog
            "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]",
            // Responsive width: w-[90vw] for small screens, then applies modalWidthClass (e.g., max-w-md) for sm and up.
            // sm:w-full allows it to take available width up to the modalWidthClass.
            `sm:w-full ${modalWidthClass}`,
            // Prop for additional custom classes
            "" 
          )}
          style={{
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2), 0 0 0 1px hsl(var(--border) / 0.3)',
          }}
          onInteractOutside={(e) => {
            // Prevent closing when clicking on Popover content (like calendar or select dropdown)
            if ((e.target as HTMLElement).closest('[data-radix-popper-content-wrapper]')) {
              e.preventDefault();
            }
          }}
        >
          <DialogHeader className="p-6 pb-4 border-b border-border/20 relative">
            <DialogTitle className="text-xl font-headline text-center text-foreground">{title}</DialogTitle>
            {/* ShadCN DialogContent includes its own close button by default, no need for a manual one here if using default styling */}
          </DialogHeader>
          <div className="p-6 flex-grow overflow-y-auto">
            {children}
          </div>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
}

