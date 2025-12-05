'use client';

import React, { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { SubtleFooter } from '@/components/layout/SubtleFooter';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User, Bell, Palette, Upload, Sun, Moon } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';

export function SettingsPageClient() {
  const { getTranslation } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const { theme, setTheme } = useTheme();

  // Mock state for settings
  const [name, setName] = useState('Phil Harrison');
  const [email, setEmail] = useState('phil.harrison@example.com');
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(false);

  React.useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSaveChanges = (section: string) => {
    // Placeholder for actual save logic
    alert(`"${section}" settings saved! (This is a placeholder)`);
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
      <main className="flex-grow p-4 sm:p-6 lg:p-8 z-10">
        <div className="container mx-auto max-w-4xl">
          <header className="text-center py-8 md:py-12">
            <h1 className="font-headline text-4xl sm:text-5xl font-bold mb-4">
              {getTranslation('settingsPageTitle', 'Account Settings')}
            </h1>
            <p className="text-muted-foreground text-lg">
              {getTranslation('settingsPageSubtitle', 'Manage your profile, preferences, and more.')}
            </p>
          </header>

          <div className="space-y-12">
            {/* Profile Settings Card */}
            <div className="bg-card/30 backdrop-blur-lg border border-border/20 rounded-2xl shadow-xl">
              <div className="p-6 border-b border-border/20 flex items-center gap-4">
                <User className="h-6 w-6 text-primary" />
                <h2 className="text-xl font-semibold">Profile Information</h2>
              </div>
              <div className="p-6 space-y-6">
                <div className="flex items-center gap-6">
                  <Avatar className="h-20 w-20">
                    <AvatarImage src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=160&h=160&fit=crop" alt="Phil Harrison" data-ai-hint="man portrait smiling" />
                    <AvatarFallback>PH</AvatarFallback>
                  </Avatar>
                  <div className="flex-grow">
                    <p className="text-sm text-muted-foreground mb-2">Update your photo and personal details here.</p>
                    <div className="flex gap-2">
                       <Button variant="outline"><Upload className="h-4 w-4 mr-2" /> Upload New Photo</Button>
                       <Button variant="ghost" className="text-destructive hover:bg-destructive/10">Remove</Button>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} className="mt-1 bg-background/70 border-border/50 focus:border-primary" />
                  </div>
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1 bg-background/70 border-border/50 focus:border-primary" />
                  </div>
                </div>
                <div>
                  <Button variant="outline" className="text-primary border-primary hover:bg-primary/10">Change Password</Button>
                </div>
              </div>
              <div className="p-6 bg-card/10 border-t border-border/20 flex justify-end">
                <Button onClick={() => handleSaveChanges('Profile')}>Save Changes</Button>
              </div>
            </div>

            {/* Notification Settings Card */}
            <div className="bg-card/30 backdrop-blur-lg border border-border/20 rounded-2xl shadow-xl">
              <div className="p-6 border-b border-border/20 flex items-center gap-4">
                <Bell className="h-6 w-6 text-primary" />
                <h2 className="text-xl font-semibold">Notifications</h2>
              </div>
              <div className="p-6 space-y-4 divide-y divide-border/20">
                <div className="flex items-center justify-between pt-4 first:pt-0">
                  <div>
                    <h3 className="font-medium">Email Notifications</h3>
                    <p className="text-sm text-muted-foreground">Receive trip updates, news, and offers.</p>
                  </div>
                  <Switch checked={emailNotifications} onCheckedChange={setEmailNotifications} />
                </div>
                 <div className="flex items-center justify-between pt-4">
                  <div>
                    <h3 className="font-medium">Push Notifications</h3>
                    <p className="text-sm text-muted-foreground">Get real-time alerts on your devices.</p>
                  </div>
                  <Switch checked={pushNotifications} onCheckedChange={setPushNotifications} />
                </div>
              </div>
               <div className="p-6 bg-card/10 border-t border-border/20 flex justify-end">
                <Button onClick={() => handleSaveChanges('Notifications')}>Save Changes</Button>
              </div>
            </div>
            
             {/* Theme Settings Card */}
            <div className="bg-card/30 backdrop-blur-lg border border-border/20 rounded-2xl shadow-xl">
              <div className="p-6 border-b border-border/20 flex items-center gap-4">
                <Palette className="h-6 w-6 text-primary" />
                <h2 className="text-xl font-semibold">Appearance</h2>
              </div>
              <div className="p-6 space-y-4">
                 <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Theme</h3>
                    <p className="text-sm text-muted-foreground">Choose your preferred interface style.</p>
                  </div>
                   <div className="flex items-center border rounded-lg p-1 bg-muted/50">
                      <Button variant={theme === 'light' ? 'secondary' : 'ghost'} size="sm" onClick={() => setTheme('light')} className="text-sm flex-1 flex items-center gap-2">
                        <Sun className="h-4 w-4" /> Light
                      </Button>
                      <Button variant={theme === 'dark' ? 'secondary' : 'ghost'} size="sm" onClick={() => setTheme('dark')} className="text-sm flex-1 flex items-center gap-2">
                        <Moon className="h-4 w-4" /> Dark
                      </Button>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </main>
      <SubtleFooter />
    </div>
  );
}
