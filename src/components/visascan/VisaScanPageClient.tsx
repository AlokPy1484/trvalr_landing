
'use client';

import React, { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DatePickerWithRange } from '@/components/ui/date-picker-with-range';
import type { DateRange } from 'react-day-picker';
import { Globe, Users, Calendar, FileCheck, Search, Plane, Loader2 } from 'lucide-react';
import { VisaInputCard } from './VisaInputCard';
import { VisaUploader } from './VisaUploader';
import { Header } from '@/components/layout/Header';
import { SubtleFooter } from '@/components/layout/SubtleFooter';
import { AnimatePresence, motion } from 'framer-motion';
import { VisaResultDisplay } from './VisaResultDisplay';
import type { VisaCheckOutput } from '@/ai/flows/visa-check-flow';
import { checkVisaRequirements } from '@/ai/flows/visa-check-flow';

// Mock data for dropdowns
const countries = [
  { code: 'US', name: 'United States', flag: '🇺🇸' },
  { code: 'IN', name: 'India', flag: '🇮🇳' },
  { code: 'GB', name: 'United Kingdom', flag: '🇬🇧' },
  { code: 'DE', name: 'Germany', flag: '🇩🇪' },
  { code: 'JP', name: 'Japan', flag: '🇯🇵' },
  { code: 'VN', name: 'Vietnam', flag: '🇻🇳' },
];

const travelerTypes = [
  { value: 'tourist', label: 'Tourist' },
  { value: 'business', label: 'Business' },
  { value: 'student', label: 'Student' },
  { value: 'transit', label: 'Transit' },
];

export function VisaScanPageClient() {
  const [fromCountry, setFromCountry] = useState<string>('IN');
  const [destinationCountry, setDestinationCountry] = useState<string>('GB');
  const [travelDates, setTravelDates] = useState<DateRange | undefined>();
  const [travelerType, setTravelerType] = useState<string>('business');
  const [passportFile, setPassportFile] = useState<File | null>(null);

  const [searchQuery, setSearchQuery] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);

  const [view, setView] = useState<'form' | 'loading' | 'results' | 'error'>('form');
  const [visaResult, setVisaResult] = useState<VisaCheckOutput | null>(null);
  const [errorMessage, setErrorMessage] = useState('');

  React.useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleFileDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setPassportFile(acceptedFiles[0]);
    }
  }, []);

  const handleCheckRequirements = async () => {
    if (!fromCountry || !destinationCountry) {
        setErrorMessage('Please select your nationality and destination.');
        setView('error');
        setTimeout(() => setView('form'), 3000);
        return;
    }

    setView('loading');
    setErrorMessage('');

    const result = await checkVisaRequirements({
        nationality: countries.find(c => c.code === fromCountry)?.name || '',
        destination: countries.find(c => c.code === destinationCountry)?.name || '',
        travelerType: travelerType,
    });
    
    // Simulate network delay
    setTimeout(() => {
        setVisaResult(result);
        setView('results');
    }, 1000);
  };
  
  const handleReset = () => {
      setView('form');
      setVisaResult(null);
  };

  return (
    <div className="flex flex-col min-h-screen w-full bg-gradient-to-br from-primary/10 via-background to-accent/10 text-foreground">
      <Header
        isScrolled={isScrolled}
        searchQuery={searchQuery}
        onSearchQueryChange={setSearchQuery}
        onSearchSubmit={() => {}}
        showCurrencySelector={false}
      />
      <main className="flex-grow flex flex-col items-center justify-center p-4 relative overflow-hidden">
        <Plane className="absolute top-20 right-20 h-24 w-24 text-primary/10 rotate-12 -z-10 animate-pulse" />

        <AnimatePresence mode="wait">
          {view === 'form' && (
             <motion.div
                key="form"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-4xl"
            >
                <div className="w-full mx-auto text-center mb-10">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-headline text-foreground tracking-tight">
                        What’s your next destination?
                    </h1>
                    <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                        Instantly view personalized visa rules, requirements, and warnings.
                    </p>
                </div>

                <div className="w-full p-6 bg-card/30 backdrop-blur-xl border border-border/20 rounded-3xl shadow-2xl shadow-primary/10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-6">
                    <VisaInputCard icon={Globe} title="From Country">
                        <Select value={fromCountry} onValueChange={setFromCountry}>
                        <SelectTrigger className="h-11">
                            <SelectValue placeholder="Select your nationality" />
                        </SelectTrigger>
                        <SelectContent>
                            {countries.map(c => <SelectItem key={c.code} value={c.code}>{c.flag} {c.name}</SelectItem>)}
                        </SelectContent>
                        </Select>
                    </VisaInputCard>
                    
                    <VisaInputCard icon={Plane} title="Destination Country">
                        <Select value={destinationCountry} onValueChange={setDestinationCountry}>
                        <SelectTrigger className="h-11">
                            <SelectValue placeholder="Select your destination" />
                        </SelectTrigger>
                        <SelectContent>
                            {countries.map(c => <SelectItem key={c.code} value={c.code}>{c.flag} {c.name}</SelectItem>)}
                        </SelectContent>
                        </Select>
                    </VisaInputCard>

                    <div className="grid grid-cols-2 gap-4">
                        <VisaInputCard icon={Calendar} title="Travel Dates">
                            <DatePickerWithRange date={travelDates} onSelectDate={setTravelDates} className="[&_button]:h-11"/>
                        </VisaInputCard>
                        <VisaInputCard icon={Users} title="Traveler Type">
                            <Select value={travelerType} onValueChange={setTravelerType}>
                            <SelectTrigger className="h-11">
                                <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                            <SelectContent>
                                {travelerTypes.map(t => <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>)}
                            </SelectContent>
                            </Select>
                        </VisaInputCard>
                    </div>

                    </div>

                    <VisaInputCard icon={FileCheck} title="Upload Passport (Optional)">
                    <VisaUploader onDrop={handleFileDrop} file={passportFile} />
                    </VisaInputCard>
                </div>
                
                <div className="mt-6">
                    <Button size="lg" className="w-full h-14 text-lg font-bold bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl shadow-lg shadow-primary/20" onClick={handleCheckRequirements}>
                    <Search className="mr-3"/>
                    Check Visa Requirements
                    </Button>
                </div>
                </div>
            </motion.div>
          )}

          {(view === 'loading' || view === 'error') && (
            <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center text-center p-8"
            >
                {view === 'loading' ? (
                    <>
                        <Loader2 className="h-12 w-12 text-primary animate-spin mb-4" />
                        <h2 className="text-xl font-semibold text-foreground">Checking Visa Rules...</h2>
                        <p className="text-muted-foreground">Our AI is analyzing the latest entry requirements for you.</p>
                    </>
                ) : (
                     <div className="text-center my-8 p-4 bg-destructive/10 border border-destructive/50 rounded-lg max-w-xl">
                        <p className="text-destructive">{errorMessage}</p>
                    </div>
                )}
            </motion.div>
          )}

          {view === 'results' && visaResult && (
            <motion.div
                key="results"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="w-full max-w-4xl"
            >
                <VisaResultDisplay result={visaResult} onReset={handleReset} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
      <SubtleFooter />
    </div>
  );
}
