
'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import { Check, Clock, Loader } from 'lucide-react';

export interface TimelineStep {
  day: string;
  description: string;
  status: 'completed' | 'in_progress' | 'upcoming';
}

interface SmartTimelineProps {
  timeline: TimelineStep[];
}

const statusStyles = {
  completed: { icon: Check, color: 'bg-green-500', text: 'text-foreground' },
  in_progress: { icon: Loader, color: 'bg-primary', text: 'text-foreground' },
  upcoming: { icon: Clock, color: 'bg-border', text: 'text-muted-foreground' },
};

export function SmartTimeline({ timeline }: SmartTimelineProps) {
  const completedSteps = timeline.filter(s => s.status === 'completed').length;
  const progressPercentage = (completedSteps / (timeline.length -1)) * 100;

  return (
    <Card className="bg-card/50 backdrop-blur-lg border border-border/20 shadow-xl">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-foreground">Smart Timeline</CardTitle>
      </CardHeader>
      <CardContent>
        <Progress value={progressPercentage} className="mb-4 h-2" />
        <div className="relative pl-4">
          <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-border -translate-x-1/2" />
          {timeline.map((step, index) => {
            const { icon: Icon, color, text } = statusStyles[step.status];
            return (
              <div key={index} className="relative pb-6 last:pb-0">
                <div className="absolute -left-[18px] top-0 h-4 w-4 rounded-full flex items-center justify-center bg-background">
                  <div className={cn("h-3 w-3 rounded-full", color)}>
                     {step.status === 'in_progress' && <Icon className="h-full w-full text-background animate-spin p-0.5" />}
                  </div>
                </div>
                <div className={cn("ml-2", text)}>
                  <p className="text-xs font-semibold">{step.day}</p>
                  <p className="text-sm">{step.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
