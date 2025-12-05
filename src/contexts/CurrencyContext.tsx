
'use client';

import type { ReactNode } from 'react';
import React, { createContext, useContext, useState, useMemo } from 'react';

export interface Currency {
  code: string;
  name: string;
  symbol: string;
}

// Placeholder exchange rates relative to INR (1 INR = X TargetCurrency)
// In a real application, these would come from an API.
const placeholderRates: Record<string, number> = {
  INR: 1.0,
  USD: 0.012, // 1 INR = 0.012 USD
  EUR: 0.011, // 1 INR = 0.011 EUR
  GBP: 0.0095, // 1 INR = 0.0095 GBP
  JPY: 1.88, // 1 INR = 1.88 JPY
  AUD: 0.018, // 1 INR = 0.018 AUD
  CAD: 0.016, // 1 INR = 0.016 CAD
  CHF: 0.011, // 1 INR = 0.011 CHF
  CNY: 0.087, // 1 INR = 0.087 CNY
};

interface CurrencyContextType {
  availableCurrencies: Currency[];
  selectedCurrency: Currency;
  setSelectedCurrency: (currency: Currency) => void;
  currencyRates: Record<string, number>;
  baseCurrencyCode: string;
}

const initialCurrencies: Currency[] = [
  { code: 'INR', name: 'Indian Rupee', symbol: 'INR' }, // Changed symbol to "INR"
  { code: 'USD', name: 'US Dollar', symbol: '$' },
  { code: 'EUR', name: 'Euro', symbol: '€' },
  { code: 'GBP', name: 'British Pound', symbol: '£' },
  { code: 'JPY', name: 'Japanese Yen', symbol: '¥' },
  { code: 'AUD', name: 'Australian Dollar', symbol: 'A$' },
  { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$' },
  { code: 'CHF', name: 'Swiss Franc', symbol: 'CHF' },
  { code: 'CNY', name: 'Chinese Yuan', symbol: '¥' },
];

const defaultCurrency: Currency = initialCurrencies.find(c => c.code === 'INR') || initialCurrencies[0];
const BASE_CURRENCY_CODE = 'INR';

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export const CurrencyProvider = ({ children }: { children: ReactNode }) => {
  const [currentCurrency, setCurrentCurrency] = useState<Currency>(defaultCurrency);

  const contextValue = useMemo(() => ({
    availableCurrencies: initialCurrencies,
    selectedCurrency: currentCurrency,
    setSelectedCurrency: setCurrentCurrency,
    currencyRates: placeholderRates,
    baseCurrencyCode: BASE_CURRENCY_CODE,
  }), [currentCurrency]);

  return (
    <CurrencyContext.Provider value={contextValue}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = (): CurrencyContextType => {
  const context = useContext(CurrencyContext);
  if (context === undefined) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
};
