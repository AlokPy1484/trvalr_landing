'use client';

import Image from 'next/image';
import { useLanguage } from '@/contexts/LanguageContext';
import { Gem, Ticket, Compass, ShieldCheck } from 'lucide-react';

interface FeatureItemProps {
  icon: React.ElementType;
  titleKey: string;
  titleFallback: string;
  descriptionKey: string;
  descriptionFallback: string;
}

const FeatureItem: React.FC<FeatureItemProps> = ({ icon: Icon, titleKey, titleFallback, descriptionKey, descriptionFallback }) => {
  const { getTranslation } = useLanguage();
  return (
    <div className="flex items-start gap-4">
      <div className="flex-shrink-0 mt-1">
        <Icon className="h-7 w-7 text-primary" />
      </div>
      <div>
        <h3 className="font-headline text-xl font-semibold text-foreground">
          {getTranslation(titleKey, titleFallback)}
        </h3>
        <p className="text-sm text-muted-foreground mt-1">
          {getTranslation(descriptionKey, descriptionFallback)}
        </p>
      </div>
    </div>
  );
};

export function EveryStepSection() {
  const { getTranslation } = useLanguage();

  const features: FeatureItemProps[] = [
    {
      icon: Compass,
      titleKey: 'everyStepTailorMadeTitle',
      titleFallback: 'Tailor-made',
      descriptionKey: 'everyStepTailorMadeDesc',
      descriptionFallback: "Get a personalized itinerary tailored to your unique travel style and interests, ensuring a journey that's perfectly you.",
    },
    {
      icon: Ticket,
      titleKey: 'everyStepCheaperTitle',
      titleFallback: 'Cheaper',
      descriptionKey: 'everyStepCheaperDesc',
      descriptionFallback: "Find the best deals on flights and hotels. Journi helps you save money, so you can focus on the experience.",
    },
    {
      icon: Gem,
      titleKey: 'everyStepHiddenGemsTitle',
      titleFallback: 'Hidden Gems',
      descriptionKey: 'everyStepHiddenGemsDesc',
      descriptionFallback: "Go beyond the usual tourist spots. Journi uncovers local secrets and unique destinations for a truly authentic trip.",
    },
    {
      icon: ShieldCheck,
      titleKey: 'everyStepNoSurprisesTitle',
      titleFallback: 'No Surprises',
      descriptionKey: 'everyStepNoSurprisesDesc',
      descriptionFallback: "Travel with confidence. Journi handles all the details, ensuring your trip is smooth and stress-free from start to finish.",
    },
  ];

  return (
    <section className="w-full py-16 md:py-20 lg:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10 md:mb-16">
          <h2 className="font-headline text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-3">
            {getTranslation('everyStepMainTitle', 'I will be there for you in every step')}
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg md:text-xl max-w-2xl mx-auto">
            {getTranslation('everyStepSubtitle', 'Curate, save and get notified about your trips on the go.')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="relative aspect-[4/5] w-full max-h-[550px] rounded-2xl overflow-hidden shadow-2xl">
            <Image
              src="https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=800&auto=format&fit=crop"
              alt="A person confidently planning a trip on their phone with a scenic background"
              fill
              className="object-cover"
              data-ai-hint="traveler map lake"
            />
          </div>
          <div className="space-y-8">
            {features.map((feature, index) => (
              <FeatureItem key={index} {...feature} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
