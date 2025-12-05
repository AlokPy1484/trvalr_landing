
'use client';

import React from 'react';
import { Header } from '@/components/layout/Header';
import { SubtleFooter } from '@/components/layout/SubtleFooter';
import { ShieldCheck } from 'lucide-react';
import { TracingBeam } from '@/components/ui/tracing-beam';

export function TermsPageClient() {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [isScrolled, setIsScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const sections = [
    {
      title: "1. Introduction",
      content: "Welcome to trvalr! These Terms of Service ('Terms') govern your use of the trvalr website, applications, and services (collectively, the 'Services'). By accessing or using our Services, you agree to be bound by these Terms and our Privacy Policy. If you do not agree to these Terms, please do not use our Services."
    },
    {
      title: "2. Our Services",
      content: "trvalr provides a suite of AI-powered travel planning tools. Our Services include, but are not limited to: AI-driven itinerary generation (SmartTrails), fare forecasting (PriceTime), visa requirement information (VisaScan), local app recommendations (AppScout), interactive 3D mapping (Mapper), and collaborative trip planning (TripSync). We also offer community features like Orbit, Driftin, and Companions to connect you with other travelers, hosts, and local guides."
    },
    {
      title: "3. User Accounts",
      content: "To access certain features, you may need to create an account. You are responsible for safeguarding your account information and for all activities that occur under your account. You agree to notify us immediately of any unauthorized use of your account."
    },
    {
        title: "4. User-Generated Content",
        content: "Our Services, particularly features like Orbit and Driftin, may allow you to post content, including photos, text, and other materials. You are solely responsible for the content you post and you retain all rights to it. However, by posting content, you grant trvalr a non-exclusive, royalty-free, worldwide license to use, display, and distribute your content in connection with the Services."
    },
    {
      title: "5. User Conduct",
      content: "You agree not to use the Services to post violent, discriminatory, unlawful, infringing, hateful, or sexually suggestive content. You are responsible for your interactions with other users, whether they are travelers, hosts, or companions. trvalr is not responsible for the conduct of any user."
    },
    {
        title: "6. Disclaimers for AI and User-Provided Information",
        content: "Information provided by our AI tools, such as PriceTime fare forecasts and VisaScan requirements, is for informational purposes only and is not guaranteed to be accurate or complete. You should always verify critical information with official sources. Similarly, trvalr is a platform that connects users. We do not vet or endorse users and are not responsible for interactions or agreements made between them through features like Companions or Driftin. Always exercise caution and good judgment."
    },
    {
      title: "7. Intellectual Property",
      content: "All content and materials on the Services, excluding user-generated content, are the property of trvalr or its licensors and are protected by copyright and other intellectual property laws. You may not use our intellectual property without our prior written consent."
    },
    {
      title: "8. Limitation of Liability",
      content: "To the fullest extent permitted by applicable law, trvalr shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses, resulting from (a) your access to or use of or inability to access or use the services; (b) any conduct or content of any third party on the services."
    },
    {
      title: "9. Changes to Terms",
      content: "We may modify these Terms from time to time. If we make material changes, we will provide you with notice through our Services or by other means. Your continued use of the Services after the changes have been implemented constitutes your acceptance of the new Terms."
    }
  ];

  return (
    <div className="flex flex-col min-h-screen w-full bg-gradient-to-br from-primary/10 via-background to-accent/10 text-foreground">
      <Header
        isScrolled={isScrolled}
        searchQuery={searchQuery}
        onSearchQueryChange={setSearchQuery}
        onSearchSubmit={() => {}}
        showCurrencySelector={false}
      />
      <main className="flex-grow p-4 sm:p-6 lg:p-8 z-10">
        <TracingBeam >
            <div className="container mx-auto max-w-4xl">
            <section className="text-center py-12">
                <ShieldCheck className="h-16 w-16 text-primary mx-auto mb-4" />
                <h1 className="font-headline text-4xl sm:text-5xl font-bold mb-4">
                Terms of Service
                </h1>
                <p className="text-muted-foreground text-lg">
                Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                </p>
            </section>

            <div className="bg-card/30 backdrop-blur-lg border border-border/20 rounded-2xl shadow-xl p-6 sm:p-10 space-y-8">
                {sections.map(section => (
                <div key={section.title}>
                    <h2 className="font-headline text-2xl font-semibold mb-3">{section.title}</h2>
                    <p className="text-muted-foreground leading-relaxed">
                    {section.content}
                    </p>
                </div>
                ))}
            </div>
            </div>
        </TracingBeam>
      </main>
      <SubtleFooter />
    </div>
  );
}
