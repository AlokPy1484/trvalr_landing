
'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BrainCircuit, Check, X } from 'lucide-react';

export interface AiSuggestion {
  id: string;
  title: string;
  description: string;
  onAccept: () => void;
  onDecline: () => void;
}

interface AiSuggestionCardProps {
  suggestion: AiSuggestion;
}

export function AiSuggestionCard({ suggestion }: AiSuggestionCardProps) {
  return (
    <Card className="bg-gradient-to-br from-primary/10 to-accent/10 border border-border text-foreground">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
            <BrainCircuit className="text-primary" />
            AI Smart Swap
        </CardTitle>
        <CardDescription className="text-muted-foreground">{suggestion.title}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-foreground/80 mb-4">{suggestion.description}</p>
        <div className="flex justify-end gap-2">
            <Button variant="ghost" size="sm" className="text-destructive hover:bg-destructive/10 hover:text-destructive" onClick={suggestion.onDecline}>
                <X className="mr-1 h-4 w-4"/>
                No, thanks
            </Button>
            <Button variant="default" size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground" onClick={suggestion.onAccept}>
                <Check className="mr-1 h-4 w-4"/>
                Yes, adjust
            </Button>
        </div>
      </CardContent>
    </Card>
  );
}
