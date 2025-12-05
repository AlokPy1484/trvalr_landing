
'use client';

import type { ReactNode } from 'react';

interface WanderChatsLayoutProps {
  sidebar: ReactNode;
  children: ReactNode; // Main content area for chat window
}

export function WanderChatsLayout({ sidebar, children }: WanderChatsLayoutProps) {
  return (
    <div className="flex flex-1 overflow-hidden">
      {sidebar}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Main chat window takes up the remaining space */}
        {children}
      </div>
      {/* Placeholder for Media Gallery Drawer - can be added here later */}
      {/* <aside className="w-80 bg-card/50 backdrop-blur-md border-l border-border/30 p-4 hidden lg:block">
        <h3 className="font-semibold text-lg mb-4">Media Gallery</h3>
      </aside> */}
    </div>
  );
}

    
