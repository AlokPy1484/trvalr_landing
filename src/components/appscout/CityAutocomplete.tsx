'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Search, MapPin, Globe } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { searchLocations, isCity, type CityData, type CountryData } from '@/data/cities';
import { cn } from '@/lib/utils';

interface CityAutocompleteProps {
  value: string;
  onChange: (value: string) => void;
  onSelect: (location: string, countryCode: string, isValid: boolean) => void;
  onValidationChange?: (isValid: boolean) => void;
  disabled?: boolean;
  placeholder?: string;
}

export function CityAutocomplete({
  value,
  onChange,
  onSelect,
  onValidationChange,
  disabled = false,
  placeholder = "Type your destination... e.g., Paris, London, Tokyo"
}: CityAutocompleteProps) {
  const [suggestions, setSuggestions] = useState<Array<CityData | CountryData>>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [isValidSelection, setIsValidSelection] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Validate if the input matches any city/country
  const validateInput = (input: string): boolean => {
    if (!input.trim()) return false;
    const results = searchLocations(input, 100);
    return results.some(item => 
      item.name.toLowerCase() === input.toLowerCase().trim()
    );
  };

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    onChange(newValue);
    
    // Check if the current input is valid (even while typing)
    const isValid = validateInput(newValue);
    setIsValidSelection(isValid);
    onValidationChange?.(isValid);
    
    if (newValue.trim().length > 0) {
      const results = searchLocations(newValue, 8);
      setSuggestions(results);
      setShowSuggestions(true);
      setSelectedIndex(-1);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
      setIsValidSelection(false);
      onValidationChange?.(false);
    }
  };

  // Handle suggestion click
  const handleSuggestionClick = (item: CityData | CountryData) => {
    const locationName = isCity(item) ? item.name : item.name;
    const countryCode = item.countryCode;
    onChange(locationName);
    setIsValidSelection(true);
    onValidationChange?.(true);
    onSelect(locationName, countryCode, true);
    setShowSuggestions(false);
    setSuggestions([]);
  };

  // Get country code from value
  const getCountryCodeFromValue = (input: string): string => {
    const results = searchLocations(input, 100);
    const match = results.find(item => 
      item.name.toLowerCase() === input.toLowerCase().trim()
    );
    return match?.countryCode || '';
  };

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!showSuggestions || suggestions.length === 0) {
      if (e.key === 'Enter') {
        // Validate before allowing search
        const isValid = validateInput(value);
        const countryCode = getCountryCodeFromValue(value);
        setIsValidSelection(isValid);
        onSelect(value, countryCode, isValid);
      }
      return;
    }

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev < suggestions.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => prev > 0 ? prev - 1 : -1);
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0) {
          handleSuggestionClick(suggestions[selectedIndex]);
        } else {
          // Validate before allowing search
          const isValid = validateInput(value);
          const countryCode = getCountryCodeFromValue(value);
          setIsValidSelection(isValid);
          onSelect(value, countryCode, isValid);
          setShowSuggestions(false);
        }
        break;
      case 'Escape':
        setShowSuggestions(false);
        setSuggestions([]);
        break;
    }
  };

  // Click outside to close
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={wrapperRef} className="relative w-full">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          ref={inputRef}
          type="text"
          placeholder={placeholder}
          className="w-full h-12 pl-12 pr-4 text-base rounded-full bg-card/60 border-border/40 shadow-inner"
          value={value}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          autoComplete="off"
        />
      </div>

      {showSuggestions && (
        <div className="absolute z-50 w-full mt-2 bg-card border border-border rounded-lg shadow-lg max-h-[300px] overflow-y-auto">
          {suggestions.length > 0 ? (
            suggestions.map((item, index) => {
              const itemIsCity = isCity(item);
              return (
                <button
                  key={index}
                  onClick={() => handleSuggestionClick(item)}
                  className={cn(
                    "w-full px-4 py-3 text-left hover:bg-muted/50 transition-colors flex items-center gap-3 border-b border-border/30 last:border-b-0",
                    selectedIndex === index && "bg-muted/50"
                  )}
                >
                  {itemIsCity ? (
                    <MapPin className="h-4 w-4 text-primary flex-shrink-0" />
                  ) : (
                    <Globe className="h-4 w-4 text-accent flex-shrink-0" />
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-foreground truncate">
                      {item.name}
                    </div>
                    {itemIsCity && (
                      <div className="text-xs text-muted-foreground truncate">
                        {item.country} ({item.countryCode})
                      </div>
                    )}
                    {!itemIsCity && (
                      <div className="text-xs text-muted-foreground">
                        Country ({item.countryCode})
                      </div>
                    )}
                  </div>
                </button>
              );
            })
          ) : (
            <div className="px-4 py-6 text-center text-muted-foreground">
              <p className="text-sm">No cities or countries found</p>
              <p className="text-xs mt-1">Try searching for a different location</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

