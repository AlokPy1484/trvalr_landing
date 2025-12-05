
'use client';

import { motion } from 'framer-motion';

interface ConfidenceRingProps {
  value: number; // 0-100
}

export function ConfidenceRing({ value }: ConfidenceRingProps) {
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;

  let strokeColor = "hsl(var(--primary))"; // Teal for high confidence
  if (value < 75) strokeColor = "hsl(var(--accent))"; // Gold for medium
  if (value < 50) strokeColor = "hsl(var(--destructive))"; // Red for low

  return (
    <div className="relative h-28 w-28">
      <svg className="h-full w-full" viewBox="0 0 100 100">
        {/* Background Circle */}
        <circle
          cx="50"
          cy="50"
          r={radius}
          strokeWidth="8"
          className="stroke-border/50"
          fill="transparent"
        />
        {/* Progress Circle */}
        <motion.circle
          cx="50"
          cy="50"
          r={radius}
          strokeWidth="8"
          stroke={strokeColor}
          fill="transparent"
          strokeLinecap="round"
          transform="rotate(-90 50 50)"
          style={{
            strokeDasharray: circumference,
          }}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-3xl font-bold text-foreground">{value}%</span>
        <span className="text-xs text-muted-foreground">Confidence</span>
      </div>
    </div>
  );
}
