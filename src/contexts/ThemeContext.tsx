'use client';

import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';

type Theme = 'light' | 'dark';

// This is a placeholder for a more robust auth context.
// In a real app, this would be provided by your authentication library (e.g., Firebase Auth).
interface AuthContextType {
  user: { uid: string } | null;
}
const AuthContext = createContext<AuthContextType>({ user: null });
const useAuth = () => useContext(AuthContext);

// This is a placeholder for Firebase Firestore functions.
// In a real app, these would interact with your database.
const getThemeFromFirestore = async (uid: string): Promise<Theme | null> => {
  console.log(`(Placeholder) Fetching theme for user ${uid}`);
  // In a real app:
  // const userDoc = await getDoc(doc(db, 'users', uid));
  // return userDoc.exists() ? userDoc.data().themePreference : null;
  return null;
};

const updateThemeInFirestore = async (uid: string, theme: Theme) => {
  console.log(`(Placeholder) Updating theme for user ${uid} to ${theme}`);
  // In a real app:
  // await setDoc(doc(db, 'users', uid), { themePreference: theme }, { merge: true });
};


interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // Default to light to avoid flash of unstyled content on server. Client-side effect will correct it.
  const [theme, setThemeState] = useState<Theme>('light');
  const { user } = useAuth();

  // Effect to set the initial theme from storage or system preference
  useEffect(() => {
    const applyTheme = (newTheme: Theme) => {
      setThemeState(newTheme);
      document.documentElement.classList.toggle('dark', newTheme === 'dark');
    };

    const initializeTheme = async () => {
      // 1. Check for logged-in user's preference in Firestore
      if (user) {
        const firestoreTheme = await getThemeFromFirestore(user.uid);
        if (firestoreTheme) {
          applyTheme(firestoreTheme);
          return;
        }
      }

      // 2. Check for preference in localStorage (for guests or as a fallback)
      const storedTheme = localStorage.getItem('theme') as Theme | null;
      if (storedTheme) {
        applyTheme(storedTheme);
        return;
      }

      // 3. Fallback to system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      applyTheme(prefersDark ? 'dark' : 'light');
    };

    initializeTheme();
  }, [user]);

  const setTheme = useCallback((newTheme: Theme) => {
    setThemeState(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
    
    if (user) {
      updateThemeInFirestore(user.uid, newTheme);
    }
  }, [user]);

  const toggleTheme = useCallback(() => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  }, [theme, setTheme]);
  
  const value = useMemo(() => ({ theme, setTheme, toggleTheme }), [theme, setTheme, toggleTheme]);

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
