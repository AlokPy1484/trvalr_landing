
'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { AlertCircle, Check, HelpCircle } from 'lucide-react';

interface ApprovalGaugeProps {
  chance: number;
  riskFactors: string[];
}

export function ApprovalGauge({ chance, riskFactors }: ApprovalGaugeProps) {
  const circumference = 2 * Math.PI * 45;
  const offset = circumference - (chance / 100) * circumference;

  let strokeColor = 'hsl(var(--primary))'; // Teal for high chance
  let statusText = 'High Chance';
  let StatusIcon = Check;
  if (chance < 80) {
    strokeColor = 'hsl(var(--accent))';
    statusText = 'Medium Chance';
    StatusIcon = HelpCircle;
  }
  if (chance < 60) {
    strokeColor = 'hsl(var(--destructive))';
    statusText = 'Risky';
    StatusIcon = AlertCircle;
  }

  return (
    <Card className="bg-card/50 backdrop-blur-lg border border-border/20 shadow-xl">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-foreground">Approval Chance</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center gap-4">
          <div className="relative h-32 w-32">
            <svg className="h-full w-full" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="45" strokeWidth="10" className="stroke-border/50" fill="transparent" />
              <motion.circle
                cx="50" cy="50" r="45" strokeWidth="10"
                stroke={strokeColor}
                fill="transparent"
                strokeLinecap="round"
                transform="rotate(-90 50 50)"
                style={{ strokeDasharray: circumference }}
                initial={{ strokeDashoffset: circumference }}
                animate={{ strokeDashoffset: offset }}
                transition={{ duration: 1.5, ease: 'circOut' }}
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-4xl font-bold text-foreground">{chance}%</span>
            </div>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-2">
                <StatusIcon className={`h-5 w-5 ${chance < 60 ? 'text-destructive' : 'text-muted-foreground'}`} />
                <p className="font-semibold text-foreground">{statusText}</p>
            </div>
            {riskFactors.length > 0 && (
              <div className="mt-4 text-left space-y-1">
                <p className="text-xs text-muted-foreground font-semibold">To improve your chances:</p>
                <ul className="text-xs text-muted-foreground list-disc list-inside">
                    {riskFactors.map((factor, i) => <li key={i}>{factor}</li>)}
                </ul>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
