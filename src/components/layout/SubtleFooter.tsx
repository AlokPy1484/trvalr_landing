
'use client';

import React from 'react';
import Image from 'next/image';
import { Instagram, Linkedin, Youtube, Play, ChevronUp } from 'lucide-react';

export function SubtleFooter() {
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    return (
        <footer className="w-full bg-transparent border-t border-border/50 py-3 px-4 md:px-6 z-20">
            <div className="flex justify-between items-center text-xs text-muted-foreground">
                <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center h-8 w-8 rounded-full bg-card text-foreground shrink-0 border border-border overflow-hidden">
                        <Image
                            src="/Trvlar icon color.svg"
                            alt="Trvalr Logo"
                            width={20}
                            height={20}
                            className="h-5 w-5"
                        />
                    </div>
                    <span>© 2025 All right reserved by Trvalrone pvt. ltd.</span>
                </div>
                <div className="flex items-center space-x-1">
                    <a href="#" aria-label="TikTok" className="p-1.5 rounded-full hover:bg-muted transition-colors">
                        <Play className="h-4 w-4" />
                    </a>
                    <a href="https://www.instagram.com/trvalr/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="p-1.5 rounded-full hover:bg-muted transition-colors">
                        <Instagram className="h-4 w-4" />
                    </a>
                    <a href="https://www.linkedin.com/company/trvals/about/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="p-1.5 rounded-full hover:bg-muted transition-colors">
                        <Linkedin className="h-4 w-4" />
                    </a>
                    <a href="#" aria-label="YouTube" className="p-1.5 rounded-full hover:bg-muted transition-colors">
                        <Youtube className="h-4 w-4" />
                    </a>
                    <button
                        onClick={scrollToTop}
                        aria-label="Scroll to top"
                        className="p-1.5 rounded-full hover:bg-muted transition-colors"
                    >
                        <ChevronUp className="h-4 w-4" />
                    </button>
                </div>
            </div>
        </footer>
    );
}
