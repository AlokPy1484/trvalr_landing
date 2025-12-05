
'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Minus, Plus } from 'lucide-react';

interface CounterProps {
  label: string;
  value: number;
  onValueChange: (value: number) => void;
}

export function Counter({ label, value, onValueChange }: CounterProps) {
  return (
    <div className="flex items-center justify-between w-full">
      <Label className="text-lg text-foreground">{label}</Label>
      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          size="icon"
          className="h-10 w-10 rounded-full border-border bg-transparent text-foreground hover:bg-muted"
          onClick={() => onValueChange(Math.max(1, value - 1))}
        >
          <Minus className="h-5 w-5" />
        </Button>
        <span className="text-xl font-semibold text-foreground w-8 text-center">{value}</span>
        <Button
          variant="outline"
          size="icon"
          className="h-10 w-10 rounded-full border-border bg-transparent text-foreground hover:bg-muted"
          onClick={() => onValueChange(value + 1)}
        >
          <Plus className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}
