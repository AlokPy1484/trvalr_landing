
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { KeyRound, Mail, User, ShieldCheck, Eye, EyeOff, Plane } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';

// Inline SVG for Google icon
const GoogleIcon = () => (
  <svg viewBox="0 0 48 48" className="h-5 w-5 mr-2">
    <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path>
    <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path>
    <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path>
    <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path>
    <path fill="none" d="M0 0h48v48H0z"></path>
  </svg>
);

// Inline SVG for Apple icon
const AppleIcon = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-5 mr-2 fill-current">
    <path d="M19.688 18.094c-.69.996-1.594 2.016-2.672 2.016-1.008 0-1.512-.826-2.916-.826-1.404 0-2.016.826-2.988.826-1.008 0-2.05-.984-2.772-2.016C6.94 16.182 6.25 13.086 6.25 10.61c0-3.52 1.766-5.296 3.924-5.296.972 0 2.05.932 2.772.932.648 0 1.834-.932 2.844-.932 2.016 0 3.924 1.688 3.924 5.296 0 .828-.084 1.908-.252 2.844M14.842 3.082c.756-.932 1.368-2.268 1.188-3.072-.9.044-2.062.62-2.772 1.48-.684.86-.936 2.062-.756 2.916.828.12 1.704-.432 2.34-.324"/>
  </svg>
);


export function LoginPageClient() {
  const { getTranslation } = useLanguage();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    console.log('Login attempt:', { email, password });
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      // Redirect to home page after successful login
      router.push('/');
    }, 1500);
  };

  const handleSocialLogin = (provider: 'google' | 'apple') => {
    setIsLoading(true);
    console.log(`Login with ${provider}`);
    setTimeout(() => {
      setIsLoading(false);
      // Redirect to home page after successful social login
      router.push('/');
    }, 1000);
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-primary/10 via-background to-accent/10 p-4 relative overflow-hidden">
      {/* Decorative icons updated for the new theme */}
      <div className="absolute top-10 left-10 text-primary/10 animate-pulse">
        <Plane className="h-16 w-16 transform -rotate-45" />
      </div>
      <div className="absolute bottom-10 right-10 text-accent/10 animate-pulse">
        <ShieldCheck className="h-20 w-20 transform rotate-12" />
      </div>
      <div className="absolute top-1/2 left-20 text-primary/5 animate-bounce delay-500">
        <User className="h-12 w-12" />
      </div>


      <div className="w-full max-w-md bg-card/30 backdrop-blur-lg border border-border/20 rounded-2xl shadow-xl p-8 sm:p-10 text-center z-10">
        <Link href="/" className="inline-block mb-8 group">
          <svg width="160" height="48" viewBox="0 0 529 157" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-12 w-auto mx-auto transition-transform group-hover:scale-105 duration-300">
            <path d="M204.836 153.501L163 43.6816H194.89L218.884 112.178L242.775 43.6816H274.768L232.932 153.501H204.836Z" fill="url(#paint0_linear_login)"/>
            <path d="M313.862 153.501H285.664V0H313.862V153.501Z" fill="url(#paint1_linear_login)"/>
            <path d="M437.997 153.501H431.229L420.36 138.428C417.694 140.82 414.857 143.076 411.85 145.195C408.91 147.246 405.8 149.058 402.519 150.63C399.237 152.134 395.854 153.33 392.367 154.219C388.949 155.107 385.463 155.552 381.908 155.552C374.184 155.552 366.903 154.253 360.067 151.655C353.3 149.058 347.353 145.298 342.226 140.376C337.167 135.386 333.168 129.302 330.229 122.124C327.289 114.946 325.819 106.777 325.819 97.6172C325.819 89.0723 327.289 81.2451 330.229 74.1357C333.168 66.958 337.167 60.8057 342.226 55.6787C347.353 50.5518 353.3 46.5869 360.067 43.7842C366.903 40.9131 374.184 39.4775 381.908 39.4775C385.463 39.4775 388.983 39.9219 392.47 40.8105C395.956 41.6992 399.34 42.9297 402.621 44.502C405.902 46.0742 409.013 47.9199 411.952 50.0391C414.96 52.1582 417.763 54.4482 420.36 56.9092L431.229 43.8867H437.997V153.501ZM409.799 97.6172C409.799 93.7891 409.047 90.0977 407.543 86.543C406.107 82.9199 404.125 79.7412 401.596 77.0068C399.066 74.2041 396.093 71.9824 392.675 70.3418C389.325 68.6328 385.736 67.7783 381.908 67.7783C378.08 67.7783 374.457 68.4277 371.039 69.7266C367.689 71.0254 364.75 72.9395 362.221 75.4688C359.76 77.998 357.812 81.1426 356.376 84.9023C354.94 88.5938 354.223 92.832 354.223 97.6172C354.223 102.402 354.94 106.675 356.376 110.435C357.812 114.126 359.76 117.236 362.221 119.766C364.75 122.295 367.689 124.209 371.039 125.508C374.457 126.807 378.08 127.456 381.908 127.456C385.736 127.456 389.325 126.636 392.675 124.995C396.093 123.286 399.066 121.064 401.596 118.33C404.125 115.527 406.107 112.349 407.543 108.794C409.047 105.171 409.799 101.445 409.799 97.6172Z" fill="url(#paint2_linear_login)"/>
            <path d="M482.657 153.501H454.664V43.6816H461.432L470.66 56.7041C475.172 52.6025 480.299 49.458 486.041 47.2705C491.783 45.0146 497.73 43.8867 503.883 43.8867H528.595V71.7773H503.883C500.943 71.7773 498.175 72.3242 495.577 73.418C492.979 74.5117 490.724 76.0156 488.81 77.9297C486.896 79.8438 485.392 82.0996 484.298 84.6973C483.204 87.2949 482.657 90.0635 482.657 93.0029V153.501Z" fill="url(#paint3_linear_login)"/>
            <path d="M41.8427 136.154C41.8427 147.419 32.7104 156.552 21.4452 156.552C10.18 156.552 1.04776 147.419 1.04776 136.154C1.04776 124.889 10.18 115.757 21.4452 115.757C32.7104 115.757 41.8427 124.889 41.8427 136.154Z" fill="url(#paint4_linear_login)"/>
            <path fillRule="evenodd" clipRule="evenodd" d="M42.3536 44.7589H85.3178L93.9538 56.4008L94.8721 57.6467L94.8751 57.6428L112.036 80.7761C110.711 82.3829 109.626 84.1895 108.781 86.1962C107.665 88.8455 107.108 91.6691 107.108 94.6669V156.367H85.6484V156.552H64.001C57.099 156.552 50.6152 155.262 44.5497 152.682C42.3531 151.723 40.2538 150.638 38.2492 149.431C41.137 145.781 42.8626 141.17 42.8626 136.154C42.8626 124.326 33.2737 114.737 21.4452 114.737C19.1048 114.737 16.8525 115.114 14.7443 115.807C14.1876 112.782 13.9087 109.666 13.9087 106.459V73.2038H0V44.7589H13.9087V0H42.3536V44.7589ZM42.3536 106.459C42.3536 109.457 42.9114 112.281 44.0268 114.93C45.1423 117.51 46.6761 119.775 48.6282 121.727C50.5803 123.68 52.881 125.248 55.5303 126.433C58.1796 127.549 61.0032 128.107 64.001 128.107H78.5581V73.2038H42.3536V106.459Z" fill="url(#paint5_linear_login)"/>
            <path d="M21.4452 115.757C32.7104 115.757 41.8427 124.889 41.8427 136.154C41.8427 140.974 40.1698 145.402 37.3748 148.893C34.1833 146.886 31.2403 144.561 28.5495 141.911C24.0178 137.309 20.4273 131.976 17.7781 125.911C16.5303 122.977 15.5847 119.945 14.9405 116.815C16.9834 116.128 19.1709 115.757 21.4452 115.757Z" fill="url(#paint6_linear_login)"/>
            <path d="M153.958 73.0195H128.755C125.757 73.0195 122.934 73.5773 120.284 74.6928C117.66 75.7979 115.377 77.314 113.437 79.2404L96.4189 56.2992C100.636 52.7692 105.348 50.0105 110.559 48.0257C116.415 45.725 122.48 44.5746 128.755 44.5746H153.958V73.0195Z" fill="url(#paint7_linear_login)"/>
            <defs>
              <linearGradient id="paint0_linear_login" x1="0" y1="78.2758" x2="528.595" y2="78.2758" gradientUnits="userSpaceOnUse">
                <stop stopColor="#006A97"/>
                <stop offset="1" stopColor="#009AD7"/>
              </linearGradient>
              <linearGradient id="paint1_linear_login" x1="0" y1="78.2758" x2="528.595" y2="78.2758" gradientUnits="userSpaceOnUse">
                <stop stopColor="#006A97"/>
                <stop offset="1" stopColor="#009AD7"/>
              </linearGradient>
              <linearGradient id="paint2_linear_login" x1="0" y1="78.2758" x2="528.595" y2="78.2758" gradientUnits="userSpaceOnUse">
                <stop stopColor="#006A97"/>
                <stop offset="1" stopColor="#009AD7"/>
              </linearGradient>
              <linearGradient id="paint3_linear_login" x1="0" y1="78.2758" x2="528.595" y2="78.2758" gradientUnits="userSpaceOnUse">
                <stop stopColor="#006A97"/>
                <stop offset="1" stopColor="#009AD7"/>
              </linearGradient>
              <linearGradient id="paint4_linear_login" x1="0" y1="78.2758" x2="528.595" y2="78.2758" gradientUnits="userSpaceOnUse">
                <stop stopColor="#006A97"/>
                <stop offset="1" stopColor="#009AD7"/>
              </linearGradient>
              <linearGradient id="paint5_linear_login" x1="0" y1="78.2758" x2="528.595" y2="78.2758" gradientUnits="userSpaceOnUse">
                <stop stopColor="#006A97"/>
                <stop offset="1" stopColor="#009AD7"/>
              </linearGradient>
              <linearGradient id="paint6_linear_login" x1="0" y1="78.2758" x2="528.595" y2="78.2758" gradientUnits="userSpaceOnUse">
                <stop stopColor="#006A97"/>
                <stop offset="1" stopColor="#009AD7"/>
              </linearGradient>
              <linearGradient id="paint7_linear_login" x1="0" y1="78.2758" x2="528.595" y2="78.2758" gradientUnits="userSpaceOnUse">
                <stop stopColor="#006A97"/>
                <stop offset="1" stopColor="#009AD7"/>
              </linearGradient>
            </defs>
          </svg>
        </Link>
        <p className="text-muted-foreground mt-2 mb-8">
          {getTranslation('loginPageSubtext', 'Sign in to continue your adventure')}
        </p>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2 text-left">
            <Label htmlFor="email" className="text-sm font-medium text-foreground flex items-center">
              <Mail className="h-4 w-4 mr-2 opacity-70" />
              {getTranslation('loginPageEmailLabel', 'Email or Username')}
            </Label>
            <Input
              id="email"
              type="email"
              placeholder={getTranslation('loginPageEmailPlaceholder', 'you@example.com')}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-background/70 border-border/50 focus:border-primary placeholder:text-muted-foreground/80 h-11"
            />
          </div>

          <div className="space-y-2 text-left">
            <Label htmlFor="password" className="text-sm font-medium text-foreground flex items-center">
              <KeyRound className="h-4 w-4 mr-2 opacity-70" />
              {getTranslation('loginPagePasswordLabel', 'Password')}
            </Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="bg-background/70 border-border/50 focus:border-primary placeholder:text-muted-foreground/80 h-11 pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 px-3 flex items-center text-muted-foreground hover:text-primary"
                aria-label={showPassword ? getTranslation('loginPageHidePassword', "Hide password") : getTranslation('loginPageShowPassword', "Show password")}
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
            <div className="text-right">
              <Link href="/auth/forgot-password" passHref>
                <span className="text-xs text-primary hover:underline cursor-pointer">
                  {getTranslation('loginPageForgotPasswordLink', 'Forgot password?')}
                </span>
              </Link>
            </div>
          </div>

          <Button
            type="submit"
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90 h-11 text-base font-semibold shadow-lg hover:scale-105 transition-transform duration-150 ease-in-out"
            disabled={isLoading}
          >
            {isLoading ? getTranslation('loginPageLoggingIn', 'Logging In...') : getTranslation('loginPageLoginButton', 'Login')}
          </Button>
        </form>

        <div className="my-6 flex items-center">
          <div className="flex-grow border-t border-border/30"></div>
          <span className="mx-4 text-xs text-muted-foreground uppercase">
            {getTranslation('loginPageOrContinueWith', 'Or continue with')}
          </span>
          <div className="flex-grow border-t border-border/30"></div>
        </div>

        <div className="space-y-3">
          <Button
            variant="outline"
            className="w-full bg-background/50 border-border/50 hover:bg-muted/50 text-foreground h-11 text-sm font-medium shadow-md hover:scale-105 transition-transform"
            onClick={() => handleSocialLogin('google')}
            disabled={isLoading}
          >
            <GoogleIcon />
            {getTranslation('loginPageContinueWithGoogle', 'Continue with Google')}
          </Button>
          <Button
            variant="outline"
            className="w-full bg-background/50 border-border/50 hover:bg-muted/50 text-foreground h-11 text-sm font-medium shadow-md hover:scale-105 transition-transform"
            onClick={() => handleSocialLogin('apple')}
            disabled={isLoading}
          >
            <AppleIcon />
            {getTranslation('loginPageContinueWithApple', 'Continue with Apple')}
          </Button>
        </div>

        <p className="mt-8 text-sm text-foreground">
          {getTranslation('loginPageNewHere', 'New here? ')}
          <Link href="/auth/signup" passHref>
            <span className="font-semibold text-primary hover:underline cursor-pointer">
              {getTranslation('loginPageJoinTheJourney', 'Join the Journey →')}
            </span>
          </Link>
        </p>
      </div>

      <footer className="absolute bottom-4 text-center w-full z-10">
        <div className="text-xs text-muted-foreground space-x-4">
          <Link href="/privacy" className="hover:underline">{getTranslation('loginPagePrivacyLink', 'Privacy')}</Link>
          <span>&bull;</span>
          <Link href="/terms" className="hover:underline">{getTranslation('loginPageTermsLink', 'Terms')}</Link>
          <span>&bull;</span>
          <Link href="/contact" className="hover:underline">{getTranslation('loginPageHelpLink', 'Help')}</Link>
        </div>
      </footer>
    </div>
  );
}
