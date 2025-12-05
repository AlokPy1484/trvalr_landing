
'use client';

import React from 'react';
import { useDropzone } from 'react-dropzone';
import { UploadCloud, FileText, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface VisaUploaderProps {
  onDrop: (acceptedFiles: File[]) => void;
  file: File | null;
}

export function VisaUploader({ onDrop, file }: VisaUploaderProps) {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/jpeg': [], 'image/png': [], 'application/pdf': [] },
    multiple: false,
  });

  return (
    <div
      {...getRootProps()}
      className={cn(
        'relative w-full h-full flex flex-col items-center justify-center p-2 rounded-lg bg-background/50 cursor-pointer transition-all duration-300 ease-in-out',
        'group' // Add a group class for hover states
      )}
    >
      <input {...getInputProps()} />

      {/* Dotted border container with padding */}
      <div
        className={cn(
          'w-full h-full flex flex-col items-center justify-center text-center rounded-md border-2 border-dashed border-border transition-all duration-300 p-4',
          isDragActive
            ? 'border-primary bg-primary/10 shadow-inner shadow-primary/20'
            : 'group-hover:border-primary/50 group-hover:bg-muted/50'
        )}
      >
        {/* Main content */}
        {file ? (
          <>
            <CheckCircle className="h-10 w-10 text-green-500 mb-2" />
            <p className="text-sm font-semibold text-foreground">{file.name}</p>
            <p className="text-xs text-muted-foreground">({(file.size / 1024).toFixed(2)} KB)</p>
          </>
        ) : (
          <>
            <UploadCloud className="h-10 w-10 text-muted-foreground mb-2 transition-transform group-hover:scale-110" />
            <p className="text-sm font-semibold text-foreground">
              Drag & drop or <span className="text-primary">browse</span>
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Supports: PNG, JPG, PDF (max. 5MB)
            </p>
          </>
        )}
      </div>

      {/* Glow effect for drag active state */}
      {isDragActive && (
        <div className="absolute inset-0 bg-primary/20 rounded-lg blur-xl animate-pulse -z-10" />
      )}
    </div>
  );
}
