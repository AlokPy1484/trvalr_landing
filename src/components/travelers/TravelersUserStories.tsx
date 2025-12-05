'use client';

import React, { useState, useEffect, useRef } from 'react';

// user data & stories
const stories = [
  { name: 'Alex Harrison', location: 'Kyoto, Japan', image: 'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?q=80&w=300&auto=format&fit=crop', story: "Wandering through Gion, I felt like I'd stepped back in time. My host, Kenji, showed me a tiny, hidden tea house I never would have found on my own. It wasn't just a trip; it was a genuine connection to the culture. This platform made it possible to see the real Japan." },
  { name: 'Isabella Rossi', location: 'Amalfi Coast, Italy', image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=300&auto=format&fit=crop', story: "I thought I knew Italy, but staying with a local family changed everything. They taught me how to make pasta from scratch and shared stories that have been in their family for generations. The human connection was the most beautiful part of the entire experience." },
  { name: 'Chen Wang', location: 'Zhangjiajie, China', image: 'https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?q=80&w=300&auto=format&fit=crop', story: "The 'Avatar Mountains' were as mystical as I'd imagined, but hiking them with a companion I met through this app made it an adventure. Traveling with someone who shares your passion turns a beautiful sight into an unforgettable shared memory." },
  { name: 'Emily Smith', location: 'Patagonia, Chile', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=300&auto=format&fit=crop', story: "Trekking through Torres del Paine was challenging, but incredibly rewarding. My host was an expert mountaineer who ensured our safety while sharing her deep respect for the wild. This was true, raw adventure, made accessible and safe for everyone." },
  { name: 'Liam Kelly', location: 'Galway, Ireland', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300&auto=format&fit=crop', story: "I spent a week in Galway, and my host took me to local pubs where traditional music sessions last all night. No tourist traps, just genuine people sharing their culture. It's the best way to travel, hands down. I felt like a local, not just a visitor." },
  { name: 'Maria Garcia', location: 'Oaxaca, Mexico', image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300&auto=format&fit=crop', story: "The colors, the food, the art—Oaxaca is a feast for the senses. I connected with a companion who was a local artist, and she showed me workshops and galleries I'd never have discovered. It’s these shared moments that truly define a journey." }
];

const VISIBLE_CARDS = 3;

export function TravelersUserStories() {
  const [currentPage, setCurrentPage] = useState(0);
  const [expandedCard, setExpandedCard] = useState<number | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const numPages = Math.ceil(stories.length / VISIBLE_CARDS);
  const getTranslation = (key: string, fallback: string) => fallback;
  const resetTimeout = () => { if (timeoutRef.current) clearTimeout(timeoutRef.current); };

  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(() => {
      setCurrentPage((prevPage) => (prevPage + 1) % numPages);
    }, 5000);
    return () => resetTimeout();
  }, [currentPage, numPages]);
  const handleDotClick = (page: number) => setCurrentPage(page);
  const handleReadMore = (index: number) => {
    setExpandedCard(expandedCard === index ? null : index);
  };

  return (
    <section className="bg-background text-foreground py-16 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold font-headline mb-4">{getTranslation('storiesTitle', 'Stories from the Trail')}</h2>
          <p className="text-lg text-muted-foreground">{getTranslation('storiesSubtitle', 'Real adventures from our global community of explorers.')}</p>
        </div>
        <div className="max-w-6xl mx-auto relative overflow-hidden">
          <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${currentPage * 100}%)` }}>
            {stories.map((story, index) => (
              <div key={index} className="px-4 w-full md:w-1/3 flex-shrink-0">
                <div className="bg-primary/5 border border-border p-6 rounded-lg h-full flex flex-col">
                  <div className="flex items-center mb-4">
                    <img src={story.image} alt={story.name} className="w-12 h-12 rounded-full mr-4 object-cover" />
                    <div>
                      <h4 className="font-semibold text-lg">{story.name}</h4>
                      <p className="text-sm text-muted-foreground">{story.location}</p>
                    </div>
                  </div>
                  <div className="flex-grow">
                    <p className={`text-muted-foreground transition-all duration-300 ${expandedCard === index ? 'line-clamp-none' : 'line-clamp-5'}`}>
                      {story.story}
                    </p>
                  </div>
                  <button onClick={() => handleReadMore(index)} className="text-sm text-primary font-semibold mt-4 self-start hover:underline">
                    {expandedCard === index ? 'Read Less' : 'Read More'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-center mt-8 space-x-3">
          {Array.from({ length: numPages }).map((_, index) => (
            <button key={index} onClick={() => handleDotClick(index)} className={`w-2.5 h-2.5 rounded-full transition-colors duration-300 ${currentPage === index ? 'bg-primary' : 'bg-border hover:bg-muted-foreground'}`} aria-label={`Go to page ${index + 1}`} />
          ))}
        </div>
      </div>
    </section>
  );
}