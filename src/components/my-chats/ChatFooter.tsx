
'use client';

import React from 'react';
import { Instagram, Linkedin, Youtube, Play, ChevronUp } from 'lucide-react';

export function ChatFooter() {
    const currentYear = new Date().getFullYear();
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    return (
        <footer className="w-full bg-background border-t border-border py-3 px-4 md:px-6 z-20">
            <div className="flex justify-between items-center text-xs text-muted-foreground">
                <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center h-8 w-8 rounded-full bg-muted text-muted-foreground font-serif text-lg shrink-0">
                        N
                    </div>
                    <span>© 2025 All right reserved by Trvalrone pvt. ltd.</span>
                </div>
                <div className="flex items-center space-x-1">
                    <a href="#" aria-label="TikTok" className="p-1.5 rounded-full hover:bg-muted transition-colors text-muted-foreground hover:text-foreground">
                        <Play className="h-4 w-4" />
                    </a>
                    <a href="https://www.instagram.com/trvalr/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="p-1.5 rounded-full hover:bg-muted transition-colors text-muted-foreground hover:text-foreground">
                        <Instagram className="h-4 w-4" />
                    </a>
                    <a href="https://www.linkedin.com/company/trvals/about/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="p-1.5 rounded-full hover:bg-muted transition-colors text-muted-foreground hover:text-foreground">
                        <Linkedin className="h-4 w-4" />
                    </a>
                    <a href="#" aria-label="YouTube" className="p-1.5 rounded-full hover:bg-muted transition-colors text-muted-foreground hover:text-foreground">
                        <Youtube className="h-4 w-4" />
                    </a>
                    <button
                        onClick={scrollToTop}
                        aria-label="Scroll to top"
                        className="p-1.5 rounded-full hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
                    >
                        <ChevronUp className="h-4 w-4" />
                    </button>
                </div>
            </div>
        </footer>
    );
}
