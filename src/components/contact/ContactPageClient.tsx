'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { Header } from '@/components/layout/Header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Mail, User, SendHorizontal } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { SubtleFooter } from '@/components/layout/SubtleFooter';

const SCROLL_THRESHOLD = 50;

export function ContactPageClient() {
  const { getTranslation } = useLanguage();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [newsletterEmail, setNewsletterEmail] = useState('');

  const [headerSearchQuery, setHeaderSearchQuery] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);

  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY;
    setIsScrolled(currentScrollY > SCROLL_THRESHOLD);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const handleHeaderSearchSubmit = () => {
    console.log('Header search submitted on Contact page:', headerSearchQuery);
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Contact form submitted:', { name, email, message });
    alert(
      getTranslation(
        'contactFormSubmitAlert',
        'Thank you! Your message has been sent.'
      )
    );
    setName('');
    setEmail('');
    setMessage('');
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Newsletter subscription:', { email: newsletterEmail });
    alert(
      getTranslation('newsletterSubmitAlert', 'Thank you for subscribing!')
    );
    setNewsletterEmail('');
  };

  return (
    <div className="flex flex-col min-h-screen w-full bg-background text-foreground overflow-x-hidden">
      <Header
        isScrolled={isScrolled}
        searchQuery={headerSearchQuery}
        onSearchQueryChange={setHeaderSearchQuery}
        onSearchSubmit={handleHeaderSearchSubmit}
        showCurrencySelector={false}
      />

      <style jsx>{`
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        .animate-spin-slow {
          animation: spin 8s linear infinite;
        }
        .text-justify-word {
          text-align: justify;
          text-justify: inter-word; /* For better browser compatibility */
        }
      `}</style>

      <main className="relative flex-grow flex items-center justify-center w-full py-16 md:py-24">
        {/*Background Image*/}
        <Image
          src="https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=2070&auto=format&fit=crop"
          alt="Beautiful travel scenery with a lake and mountains"
          fill
          className="object-cover z-0"
          priority
        />
        {/* Opacity */}
        <div className="absolute inset-0 bg-black/60 z-10" />

        {/* Content Layout */}
        <div className="relative z-20 grid grid-cols-1 lg:grid-cols-2 gap-12 w-full max-w-6xl mx-auto p-4 sm:p-6 lg:p-8">
          {/* Left Column */}
          <div className="flex flex-col justify-center text-white drop-shadow-lg">
            <h1 className="font-headline text-4xl sm:text-5xl font-bold mb-4 text-left">
              {getTranslation(
                'contactPageTitle',
                'Let’s Start a Journey Together'
              )}
              <span className="inline-block align-middle ml-2">
                🌍
              </span>
            </h1>
            <p className="text-white/90 text-base sm:text-lg max-w-xl text-justify-word mb-12">
              {getTranslation(
                'contactPageSubtitle',
                'Have a question, a travel story, or a partnership idea? Drop us a line! Our team of explorers is always ready to chat about all things travel.'
              )}
            </p>

            {/* Subscribe */}
            <div className="w-full text-left">
              <h2 className="font-headline text-2xl sm:text-3xl font-bold mb-4 flex items-center gap-3">
                {getTranslation(
                  'newsletterTitle',
                  'Stay Wander-Inspired — Subscribe to trvalr’s Travel Journal'
                )}
              </h2>
              <p className="text-white/80 max-w-xl mb-6">
                {getTranslation(
                  'newsletterDescription',
                  'Get daily updates and travel tips directly in your inbox.'
                )}
              </p>
              <form
                onSubmit={handleNewsletterSubmit}
                className="flex flex-col sm:flex-row gap-3 max-w-md"
              >
                <Input
                  type="email"
                  placeholder={getTranslation(
                    'formPlaceholderEmail',
                    'you@example.com'
                  )}
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  required
                  className="flex-grow bg-white/10 border-white/20 focus:border-accent placeholder:text-gray-300 h-11 text-white" /* Glassmorphism */
                />
                <Button
                  type="submit"
                  className="h-11 bg-accent text-accent-foreground hover:bg-accent/90"
                >
                  {getTranslation('formButtonSubscribe', 'Subscribe')}
                </Button>
              </form>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-black/20 backdrop-blur-lg border border-white/20 rounded-2xl shadow-2xl p-6 sm:p-8 flex flex-col justify-center">
            <form onSubmit={handleContactSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label
                  htmlFor="name"
                  className="flex items-center gap-2 text-sm font-medium text-white/90"
                >
                  <User className="h-4 w-4 text-primary" />
                  {getTranslation('formLabelName', 'Name')}
                </Label>
                <Input
                  id="name"
                  type="text"
                  placeholder={getTranslation('formPlaceholderName', 'Your Name')}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="bg-white/10 border-white/20 focus:border-primary placeholder:text-gray-300 h-11 text-white" /* Glassmorphism */
                />
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="email"
                  className="flex items-center gap-2 text-sm font-medium text-white/90"
                >
                  <Mail className="h-4 w-4 text-primary" />
                  {getTranslation('formLabelEmail', 'Email')}
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder={getTranslation(
                    'formPlaceholderEmail',
                    'you@example.com'
                  )}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-white/10 border-white/20 focus:border-primary placeholder:text-gray-300 h-11 text-white"
                />
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="message"
                  className="flex items-center gap-2 text-sm font-medium text-white/90"
                >
                  <SendHorizontal className="h-4 w-4 text-primary" />
                  {getTranslation('formLabelMessage', 'Message')}
                </Label>
                <Textarea
                  id="message"
                  placeholder={getTranslation(
                    'formPlaceholderMessage',
                    'Your message here...'
                  )}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  className="min-h-[120px] bg-white/10 border-white/20 focus:border-primary placeholder:text-gray-300 text-white"
                />
              </div>
              <Button
                type="submit"
                className="w-full h-12 text-base font-semibold bg-primary text-primary-foreground transition-all duration-300 ease-in-out hover:bg-primary/90 hover:shadow-primary/40 shadow-lg shadow-primary/20"
              >
                {getTranslation('formButtonSendMessage', 'Send Message')}
              </Button>
            </form>
          </div>
        </div>
      </main>
      <SubtleFooter />
    </div>
  );
}