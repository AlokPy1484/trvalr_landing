'use client';

import React, { useState, useRef, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { X, Move, ZoomIn, ZoomOut, RotateCw } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ImageCropperProps {
  imageSrc: string;
  onSave: (croppedImage: string) => void;
  onCancel: () => void;
  aspectRatio?: number; // width/height
  type: 'avatar' | 'cover';
}

export function ImageCropper({ imageSrc, onSave, onCancel, aspectRatio, type }: ImageCropperProps) {
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
  }, [position]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging) return;
    setPosition({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y,
    });
  }, [isDragging, dragStart]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  React.useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp]);

  const handleZoomIn = () => {
    setScale(prev => Math.min(prev + 0.1, 3));
  };

  const handleZoomOut = () => {
    setScale(prev => Math.max(prev - 0.1, 0.5));
  };

  const handleRotate = () => {
    setRotation(prev => (prev + 90) % 360);
  };

  const handleSave = () => {
    if (!containerRef.current || !imageRef.current) return;

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    const img = imageRef.current;
    
    // Calculate crop area
    const cropSize = type === 'avatar' 
      ? Math.min(containerRect.width, containerRect.height) * 0.8
      : containerRect.width;
    const cropHeight = type === 'avatar' 
      ? cropSize 
      : containerRect.height;

    canvas.width = type === 'avatar' ? cropSize : cropSize;
    canvas.height = type === 'avatar' ? cropSize : cropHeight;

    // Calculate source position
    const imgRect = img.getBoundingClientRect();
    const scaleX = img.naturalWidth / imgRect.width;
    const scaleY = img.naturalHeight / imgRect.height;
    
    const sourceX = (containerRect.left - imgRect.left + (containerRect.width - cropSize) / 2 - position.x) * scaleX;
    const sourceY = (containerRect.top - imgRect.top + (containerRect.height - cropHeight) / 2 - position.y) * scaleY;
    const sourceWidth = (cropSize / scale) * scaleX;
    const sourceHeight = (cropHeight / scale) * scaleY;

    // Draw rotated and scaled image
    ctx.save();
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate((rotation * Math.PI) / 180);
    ctx.scale(scale, scale);
    ctx.drawImage(
      img,
      sourceX / scale - canvas.width / (2 * scale),
      sourceY / scale - canvas.height / (2 * scale),
      sourceWidth / scale,
      sourceHeight / scale
    );
    ctx.restore();

    const croppedImage = canvas.toDataURL('image/png');
    onSave(croppedImage);
  };

  const containerSize = type === 'avatar' ? 400 : '100%';
  const containerHeight = type === 'avatar' ? 400 : 300;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <div className="bg-card rounded-lg shadow-2xl border border-border w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h3 className="text-lg font-semibold text-foreground">
            Adjust {type === 'avatar' ? 'Profile' : 'Cover'} Image
          </h3>
          <Button
            variant="ghost"
            size="icon"
            onClick={onCancel}
            className="text-muted-foreground hover:text-foreground"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="flex-1 p-6 overflow-auto">
          <div
            ref={containerRef}
            className={cn(
              "relative mx-auto border-2 border-dashed border-border overflow-hidden bg-muted/20",
              type === 'avatar' && "rounded-full"
            )}
            style={{
              width: containerSize,
              height: containerHeight,
              aspectRatio: type === 'cover' ? aspectRatio : 1,
            }}
          >
            <img
              ref={imageRef}
              src={imageSrc}
              alt="Preview"
              className="absolute inset-0 object-cover select-none"
              style={{
                transform: `translate(${position.x}px, ${position.y}px) scale(${scale}) rotate(${rotation}deg)`,
                cursor: isDragging ? 'grabbing' : 'grab',
                transformOrigin: 'center center',
              }}
              onMouseDown={handleMouseDown}
              draggable={false}
            />
          </div>
        </div>

        <div className="p-4 border-t border-border space-y-4">
          <div className="flex items-center justify-center gap-4">
            <Button
              variant="outline"
              size="icon"
              onClick={handleZoomOut}
              disabled={scale <= 0.5}
              className="border-border"
            >
              <ZoomOut className="h-4 w-4" />
            </Button>
            <span className="text-sm text-muted-foreground min-w-[60px] text-center">
              {Math.round(scale * 100)}%
            </span>
            <Button
              variant="outline"
              size="icon"
              onClick={handleZoomIn}
              disabled={scale >= 3}
              className="border-border"
            >
              <ZoomIn className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={handleRotate}
              className="border-border"
            >
              <RotateCw className="h-4 w-4" />
            </Button>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Move className="h-4 w-4" />
              <span>Drag to move</span>
            </div>
          </div>

          <div className="flex justify-end gap-3">
            <Button
              variant="outline"
              onClick={onCancel}
              className="border-border"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              className="bg-foreground text-background hover:bg-foreground/90"
            >
              Save
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

