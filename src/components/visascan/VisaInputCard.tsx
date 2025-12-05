
'use client';

import type { LucideIcon } from 'lucide-react';

interface VisaInputCardProps {
  icon: LucideIcon;
  title: string;
  children: React.ReactNode;
}

export function VisaInputCard({ icon: Icon, title, children }: VisaInputCardProps) {
  return (
    <div className="p-4 bg-card/50 rounded-xl border border-border/70 shadow-sm">
      <div className="flex items-center gap-2 mb-2">
        <Icon className="h-5 w-5 text-primary" />
        <label className="text-sm font-semibold text-foreground">{title}</label>
      </div>
      {children}
    </div>
  );
}
