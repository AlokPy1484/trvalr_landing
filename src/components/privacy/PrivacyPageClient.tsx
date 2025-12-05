
'use client';

import React from 'react';
import { Header } from '@/components/layout/Header';
import { SubtleFooter } from '@/components/layout/SubtleFooter';
import { ShieldCheck } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export function PrivacyPageClient() {
  const { getTranslation } = useLanguage();
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
      titleKey: "privacyTitle1",
      titleFallback: "1. Information We Collect",
      contentKey: "privacyContent1",
      contentFallback: "We collect information you provide directly to us. This includes your name, email, and password when you create an account. For travel planning, we collect your travel preferences, destinations, and any prompts you provide to our AI. For features like VisaScan, we may process nationality and passport data to provide visa information. For community features like Orbit, Driftin, and Companions, we collect profile information, photos, and user-generated content you share."
    },
    {
      titleKey: "privacyTitle2",
      titleFallback: "2. How We Use Your Information",
      contentKey: "privacyContent2",
      contentFallback: "Your information is used to operate and improve our Services. We use your prompts and preferences to power our AI features like SmartTrails and PriceTime to generate personalized results. Profile and location data help connect you with other travelers, hosts, and companions. We may also use your information to communicate with you about your trips and send you relevant updates, from which you can opt-out."
    },
    {
      titleKey: "privacyTitle3",
      titleFallback: "3. How We Share Your Information",
      contentKey: "privacyContent3",
      contentFallback: "We do not sell your personal information. We may share information with vendors who need it to perform services for us. When you use community features (e.g., connecting with a Companion), some of your profile information will be visible to other users to facilitate that connection. We may also share information if required by law or to protect the rights and safety of trvalr and our users."
    },
    {
      titleKey: "privacyTitle4",
      titleFallback: "4. Your Choices & Control",
      contentKey: "privacyContent4",
      contentFallback: "You have control over your personal data. You can access, update, or delete your account information at any time through your account settings. You can also manage your communication preferences and opt-out of promotional messages."
    },
    {
      titleKey: "privacyTitle5",
      titleFallback: "5. Data Security",
      contentKey: "privacyContent5",
      contentFallback: "trvalr takes reasonable measures to help protect information about you from loss, theft, misuse, and unauthorized access, disclosure, alteration, and destruction. We use encryption and other security protocols to safeguard sensitive data. However, no security system is impenetrable, and we cannot guarantee the security of our systems 100%."
    },
    {
      titleKey: "privacyTitle6",
      titleFallback: "6. Contact Us",
      contentKey: "privacyContent6",
      contentFallback: "If you have any questions about this Privacy Policy, please contact us through our contact page. We are committed to resolving any privacy concerns you may have."
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
        <div className="container mx-auto max-w-4xl">
          <section className="text-center py-12">
            <ShieldCheck className="h-16 w-16 text-primary mx-auto mb-4" />
            <h1 className="font-headline text-4xl sm:text-5xl font-bold mb-4">
              {getTranslation('privacyPolicyTitle', 'Privacy Policy')}
            </h1>
            <p className="text-muted-foreground text-lg">
              {getTranslation('lastUpdated', 'Last updated')}: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </section>

          <div className="bg-card/30 backdrop-blur-lg border border-border/20 rounded-2xl shadow-xl p-6 sm:p-10 space-y-8">
            {sections.map(section => (
              <div key={section.titleKey}>
                <h2 className="font-headline text-2xl font-semibold mb-3">{getTranslation(section.titleKey, section.titleFallback)}</h2>
                <p className="text-muted-foreground leading-relaxed">
                  {getTranslation(section.contentKey, section.contentFallback)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </main>
      <SubtleFooter />
    </div>
  );
}
