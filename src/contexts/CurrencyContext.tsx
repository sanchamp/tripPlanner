import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Currency {
  code: string;
  symbol: string;
  name: string;
  rate: number; // Exchange rate relative to USD
}

export const currencies: Currency[] = [
  { code: 'USD', symbol: '$', name: 'US Dollar', rate: 1 },
  { code: 'EUR', symbol: '€', name: 'Euro', rate: 0.85 },
  { code: 'GBP', symbol: '£', name: 'British Pound', rate: 0.73 },
  { code: 'JPY', symbol: '¥', name: 'Japanese Yen', rate: 110 },
  { code: 'CAD', symbol: 'C$', name: 'Canadian Dollar', rate: 1.25 },
  { code: 'AUD', symbol: 'A$', name: 'Australian Dollar', rate: 1.35 },
  { code: 'CHF', symbol: 'CHF', name: 'Swiss Franc', rate: 0.92 },
  { code: 'CNY', symbol: '¥', name: 'Chinese Yuan', rate: 6.45 },
  { code: 'INR', symbol: '₹', name: 'Indian Rupee', rate: 74.5 },
  { code: 'SGD', symbol: 'S$', name: 'Singapore Dollar', rate: 1.35 }
];

interface CurrencyContextType {
  selectedCurrency: Currency;
  setSelectedCurrency: (currency: Currency) => void;
  convertPrice: (usdPrice: number) => string;
  formatPrice: (usdPrice: number) => string;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
};

interface CurrencyProviderProps {
  children: ReactNode;
}

export const CurrencyProvider: React.FC<CurrencyProviderProps> = ({ children }) => {
  const [selectedCurrency, setSelectedCurrency] = useState<Currency>(currencies[0]); // Default to USD

  const convertPrice = (usdPrice: number): string => {
    const convertedPrice = usdPrice * selectedCurrency.rate;
    return convertedPrice.toFixed(2);
  };

  const formatPrice = (usdPrice: number): string => {
    const convertedPrice = convertPrice(usdPrice);
    return `${selectedCurrency.symbol}${convertedPrice}`;
  };

  return (
    <CurrencyContext.Provider
      value={{
        selectedCurrency,
        setSelectedCurrency,
        convertPrice,
        formatPrice
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
};