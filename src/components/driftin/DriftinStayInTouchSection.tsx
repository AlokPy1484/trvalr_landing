'use client';

import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import Link from 'next/link';
import { Twitter, Instagram, Mail } from 'lucide-react';

const socialLinks = [
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Instagram, href: 'https://www.instagram.com/trvalr/', label: 'Instagram' },
  { icon: Mail, href: '/contact', label: 'Email' },
];

export function DriftinStayInTouchSection() {
  const { getTranslation } = useLanguage();

  return (
    <section className="relative py-20 md:py-28 bg-background overflow-hidden">
      {/* Animated Gradient Background Controls */}
      <style jsx>{`
        .animated-gradient {
          background: radial-gradient(circle at 15% 25%, rgba(52, 211, 153, 0.05), transparent 40%),
                      radial-gradient(circle at 85% 75%, rgba(59, 130, 246, 0.05), transparent 40%);
          animation: animate-gradient 5s ease-in-out infinite; 
          background-size: 200% 200%;
        }
        @keyframes animate-gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
      <div className="absolute inset-0 animated-gradient z-0"></div>

      <div className="container relative z-10 mx-auto px-4 flex flex-col items-center">
        <div className="text-center max-w-2xl">
            <p className="text-sm text-primary font-semibold mb-2 uppercase tracking-wider">
              {getTranslation('driftinConnectWithUsLabel', 'Connect with Us')}
            </p>
            <h2 className="font-headline text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-6">
              {getTranslation('driftinStayInTouchTitle', 'Stay in Touch')}
            </h2>
             <p className="text-muted-foreground text-base md:text-lg mb-10 leading-relaxed">
              {getTranslation('driftinStayInTouchDesc', 'Follow us on social media, sign up for our newsletter, or reach out to our team to learn more about Driftin and how we can help you unlock unforgettable travel experiences.')}
            </p>
        </div>

        {/* Icons with Glowing Effect */}
        <div className="flex gap-6 mb-12">
          {socialLinks.map((social, index) => {
            const Icon = social.icon;
            return (
              <Link 
                key={index} 
                href={social.href} 
                aria-label={social.label} 
                className="group relative"
              >
                {/* Glow effect */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-teal-400 to-blue-500 rounded-full blur opacity-0 group-hover:opacity-75 transition duration-300"></div>
                {/* Icon Container */}
                <div className="relative p-4 bg-card/60 backdrop-blur-lg border border-border/20 rounded-full transition-all duration-300 group-hover:scale-110">
                  <Icon className="h-6 w-6 text-muted-foreground transition-colors duration-300 group-hover:text-white" />
                </div>
              </Link>
            );
          })}
        </div>

        {/* Contact Button */}
        {/* <div>
          <Button
            size="lg"
            className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-3 text-lg rounded-lg transition-all shadow-lg shadow-primary/20 hover:shadow-primary/40"
            asChild
          >
            <Link href="/contact">{getTranslation('driftinContactUsButton', 'Contact Us')}</Link>
          </Button>
        </div> */}
      </div>
    </section>
  );
}