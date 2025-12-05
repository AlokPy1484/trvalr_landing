
'use client';

import type { ReactNode } from 'react';

interface MyTripsLayoutProps {
  sidebar: ReactNode;
  topBar: ReactNode;
  children: ReactNode; // Main content area
}

export function MyTripsLayout({ sidebar, topBar, children }: MyTripsLayoutProps) {
  return (
    <div className="flex flex-1 overflow-hidden">
      {sidebar}
      <div className="flex flex-col flex-1 overflow-hidden">
        {topBar}
        <div className="flex-1 overflow-y-auto bg-background">
          {children}
        </div>
      </div>
    </div>
  );
}
