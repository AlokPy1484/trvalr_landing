
'use client';

import React, { useState, useMemo } from 'react';
import { Header } from '@/components/layout/Header';
import { SubtleFooter } from '@/components/layout/SubtleFooter';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { Wand2, DollarSign, CalendarDays, MapPin, BrainCircuit, Users } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { BudgetRing } from './BudgetRing';
import { SpendFeed } from './SpendFeed';
import { AiSuggestionCard } from './AiSuggestionCard';
import type { SpendItem } from './SpendFeed';
import type { AiSuggestion } from './AiSuggestionCard';
import type { CategorySpend } from './BudgetRing';


const mockBudgetData: CategorySpend[] = [
    { name: 'Stays', value: 1425176, color: 'hsl(var(--chart-1))' },
    { name: 'Food', value: 70000, color: 'hsl(var(--chart-2))' },
    { name: 'Flights', value: 150000, color: 'hsl(var(--chart-3))' },
    { name: 'Activities', value: 91255, color: 'hsl(var(--chart-4))' },
];

const mockSpendFeedData: SpendItem[] = [
    { id: '1', category: 'Flights', description: 'Round trip to Nice (NCE)', amount: 145000, status: 'within' },
    { id: '2', category: 'Food', description: 'Dinner at Le Chantecler', amount: 25000, status: 'over' },
    { id: '3', category: 'Stays', description: 'AI found cheaper dates for Villa Cosy', amount: -40000, status: 'saved' },
    { id: '4', category: 'Activities', description: '3-Wheel Vehicle Tour', amount: 9919, status: 'within' },
];

const mockAiSuggestions: AiSuggestion[] = [
    { id: 'sugg1', title: "Replace Le Jules Verne with a charming bistro?", description: "Experience authentic Parisian dining praised by locals and save over ₹15,000 on dinner without compromising on quality.", onAccept: () => console.log("Accepted suggestion 1"), onDecline: () => console.log("Declined suggestion 1")},
    { id: 'sugg2', title: "Alternative Stay in Saint-Tropez?", description: "Switch from Villa Cosy to a highly-rated boutique hotel nearby and save ₹50,000 per night without compromising on luxury.", onAccept: () => console.log("Accepted suggestion 2"), onDecline: () => console.log("Declined suggestion 2")},
];


export function AutoBudgeterPageClient() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);

  // State for budget setup - updated to match French Riviera trip
  const [totalBudget, setTotalBudget] = useState<number | ''>(1500000);
  const [tripDuration, setTripDuration] = useState<number | ''>(7);
  const [destination, setDestination] = useState('French Riviera, France');
  const [travelers, setTravelers] = useState(2);
  const [showDashboard, setShowDashboard] = useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleHeaderSearchSubmit = () => {
    console.log('Header search submitted on AutoBudgeter page:', searchQuery);
  };
  
  const avgSpendPerDay = useMemo(() => {
    if (typeof totalBudget === 'number' && typeof tripDuration === 'number' && tripDuration > 0) {
      return totalBudget / tripDuration;
    }
    return 0;
  }, [totalBudget, tripDuration]);

  const handleLaunchAI = () => {
      if(totalBudget && tripDuration && destination) {
          setShowDashboard(true);
      } else {
          alert("Please fill in all fields to launch the AutoBudgeter AI.");
      }
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut"
      }
    })
  };
  
  const dashboardContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const dashboardItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground font-sans">
      <Header
        isScrolled={isScrolled}
        searchQuery={searchQuery}
        onSearchQueryChange={setSearchQuery}
        onSearchSubmit={handleHeaderSearchSubmit}
        showCurrencySelector={false}
      />
      <main className="flex-1 flex flex-col items-center justify-center p-4">
        <AnimatePresence mode="wait">
            {!showDashboard ? (
                <motion.div
                    key="setup"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.5 }}
                    className="w-full max-w-2xl mx-auto"
                >
                    <div className="text-center mb-10">
                        <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent mb-3">
                            AutoBudgeter
                        </h1>
                        <p className="text-lg text-muted-foreground">Let’s start with how much you’re planning to spend!</p>
                    </div>

                    <div className="space-y-6">
                        {/* Input Cards */}
                        <motion.div custom={0} initial="hidden" animate="visible" variants={cardVariants}>
                            <InputCard icon={DollarSign} title="Total Budget (INR)">
                                <Input 
                                    type="number" 
                                    placeholder="e.g., 50000" 
                                    className="bg-background/70 border-border text-lg h-12 text-primary focus:border-primary"
                                    value={totalBudget}
                                    onChange={(e) => setTotalBudget(e.target.value === '' ? '' : Number(e.target.value))}
                                />
                            </InputCard>
                        </motion.div>
                        
                        <motion.div custom={1} initial="hidden" animate="visible" variants={cardVariants}>
                            <InputCard icon={CalendarDays} title="Trip Duration (days)">
                                <Input 
                                    type="number" 
                                    placeholder="e.g., 7" 
                                    className="bg-background/70 border-border text-lg h-12 text-primary focus:border-primary"
                                    value={tripDuration}
                                     onChange={(e) => setTripDuration(e.target.value === '' ? '' : Number(e.target.value))}
                                />
                            </InputCard>
                        </motion.div>
                        
                         <motion.div custom={2} initial="hidden" animate="visible" variants={cardVariants}>
                            <InputCard icon={Users} title="Travelers">
                                <Input 
                                    type="number" 
                                    placeholder="e.g., 2" 
                                    className="bg-background/70 border-border text-lg h-12 text-primary focus:border-primary"
                                    value={travelers}
                                    onChange={(e) => setTravelers(e.target.value === '' ? '' : Number(e.target.value))}
                                />
                            </InputCard>
                        </motion.div>

                        <motion.div custom={3} initial="hidden" animate="visible" variants={cardVariants}>
                            <InputCard icon={MapPin} title="Destination(s)">
                                <Input 
                                    type="text" 
                                    placeholder="e.g., Paris, France" 
                                    className="bg-background/70 border-border text-lg h-12 text-primary focus:border-primary"
                                    value={destination}
                                    onChange={(e) => setDestination(e.target.value)}
                                />
                            </InputCard>
                        </motion.div>

                        {/* Real-Time Graph */}
                        {avgSpendPerDay > 0 && (
                             <motion.div 
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                className="bg-muted/50 rounded-lg p-4 space-y-3"
                             >
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-muted-foreground">Avg Spend Per Day:</span>
                                    <span className="font-bold text-primary">₹{avgSpendPerDay.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                                </div>
                                <Progress value={(avgSpendPerDay / 300000) * 100} className="h-2 [&>div]:bg-primary" />
                                <div className="flex items-start gap-2 text-xs text-accent">
                                    <BrainCircuit className="h-4 w-4 mt-0.5 flex-shrink-0" />
                                    <p>
                                        <span className="font-semibold">AI Tip:</span> This is a high-end luxury budget. You have flexibility for premium experiences.
                                    </p>
                                </div>
                             </motion.div>
                        )}
                        
                        {/* CTA */}
                         <motion.div custom={4} initial="hidden" animate="visible" variants={cardVariants}>
                            <Button
                                size="lg"
                                className="w-full h-14 text-lg font-bold bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/20"
                                onClick={handleLaunchAI}
                            >
                                <Wand2 className="mr-3"/>
                                Launch AutoBudget AI
                            </Button>
                         </motion.div>
                    </div>
                </motion.div>
            ) : (
                <motion.div
                    key="dashboard"
                    variants={dashboardContainerVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    className="w-full max-w-7xl mx-auto"
                >
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Left Column */}
                        <div className="lg:col-span-1 space-y-6">
                            <motion.div variants={dashboardItemVariants}>
                                <BudgetRing data={mockBudgetData} totalBudget={totalBudget || 0} />
                            </motion.div>
                             <motion.div variants={dashboardItemVariants}>
                                <SpendFeed items={mockSpendFeedData} />
                            </motion.div>
                        </div>
                        {/* Right Column */}
                        <div className="lg:col-span-2 space-y-6">
                             <motion.div variants={dashboardItemVariants}>
                                 <AiSuggestionCard suggestion={mockAiSuggestions[0]} />
                             </motion.div>
                             <motion.div variants={dashboardItemVariants}>
                                 <AiSuggestionCard suggestion={mockAiSuggestions[1]} />
                             </motion.div>
                             <motion.div variants={dashboardItemVariants} className="text-center">
                                <Button onClick={() => setShowDashboard(false)} variant="outline" className="mt-4">
                                    Go Back to Edit
                                </Button>
                             </motion.div>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
      </main>
      <SubtleFooter />
    </div>
  );
}

// Helper component for the input cards
const InputCard = ({ icon: Icon, title, children }: { icon: React.ElementType, title: string, children: React.ReactNode }) => (
    <div className="bg-card/50 backdrop-blur-md border border-border/70 rounded-xl p-4">
        <div className="flex items-center gap-2 mb-2">
            <Icon className="h-4 w-4 text-primary" />
            <label className="text-sm font-medium text-foreground">{title}</label>
        </div>
        {children}
    </div>
)
