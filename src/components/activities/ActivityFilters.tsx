'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Calendar, X, ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

interface ActivityFiltersProps {
  onFiltersChange: (filters: any) => void;
}

export function ActivityFilters({ onFiltersChange }: ActivityFiltersProps) {
  const [selectedDate, setSelectedDate] = useState<string[]>([]);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedMoreFilters, setSelectedMoreFilters] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<string>('');
  
  // Expandable sections
  const [expandedSections, setExpandedSections] = useState({
    date: true,
    price: true,
    language: true,
    categories: true,
    moreFilters: true,
  });

  const dateOptions = [
    { value: 'today', label: 'Today' },
    { value: 'tomorrow', label: 'Tomorrow' },
    { value: 'this-weekend', label: 'This Weekend' },
    { value: 'date-range', label: 'Date Range' },
  ];

  const languageOptions = [
    'Hindi', 'English', 'Malayalam', 'Bengali', 'Tamil', 'Telugu',
    'Kannada', 'Marathi', 'Gujarati', 'Punjabi', 'Konkani', 
    'Rajasthani', 'Arabic', 'Bhojpuri', 'Hindustani', 'Marwari',
    'Sindhi', 'Multi-Language', 'Punjabi',
  ];

  const categoryOptions = [
    'Workshops', 'Comedy Shows', 'Music Shows', 'Performances',
    'Kids', 'Meetups', 'Screening', 'Talks', 'Conferences',
    'Award shows', 'New Year Parties', 'Holi Celebrations', 'Spirituality',
  ];

  const moreFilterOptions = [
    'Outdoor Events', 'Fast Filling', 'Must Attend', 'Kids Allowed',
    'Kids Activities', 'New Year Parties', 'Religious',
  ];

  const priceOptions = [
    { value: 'free', label: 'Free' },
    { value: '0-500', label: '₹ 0 - 500' },
    { value: '501-2000', label: '₹ 501 - 2000' },
    { value: 'above-2000', label: 'Above 2000' },
  ];

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const toggleFilter = (
    value: string,
    selectedArray: string[],
    setSelectedArray: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    const newArray = selectedArray.includes(value)
      ? selectedArray.filter(item => item !== value)
      : [...selectedArray, value];
    setSelectedArray(newArray);
    
    // Notify parent of filter changes
    onFiltersChange({
      date: selectedDate,
      languages: selectedLanguages,
      categories: selectedCategories,
      moreFilters: selectedMoreFilters,
      priceRange,
    });
  };

  const clearFilters = () => {
    setSelectedDate([]);
    setSelectedLanguages([]);
    setSelectedCategories([]);
    setSelectedMoreFilters([]);
    setPriceRange('');
    onFiltersChange({});
  };

  const activeFilterCount = 
    selectedDate.length +
    selectedLanguages.length +
    selectedCategories.length +
    selectedMoreFilters.length +
    (priceRange ? 1 : 0);

  const SectionHeader = ({ 
    title, 
    section 
  }: { 
    title: string; 
    section: keyof typeof expandedSections 
  }) => (
    <button
      onClick={() => toggleSection(section)}
      className="flex items-center justify-between w-full py-3 text-left"
    >
      <h3 className="font-semibold text-foreground">{title}</h3>
      {expandedSections[section] ? (
        <ChevronUp className="h-4 w-4 text-muted-foreground" />
      ) : (
        <ChevronDown className="h-4 w-4 text-muted-foreground" />
      )}
    </button>
  );

  return (
    <div className="space-y-1">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-semibold text-foreground">Filters</h2>
          {activeFilterCount > 0 && (
            <Badge variant="secondary" className="rounded-full">
              {activeFilterCount}
            </Badge>
          )}
        </div>
        {activeFilterCount > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearFilters}
            className="text-primary hover:text-primary/80 h-auto p-0"
          >
            Clear
          </Button>
        )}
      </div>

      {/* Date Section */}
      <div className="border-b border-border pb-2">
        <SectionHeader title="Date" section="date" />
        {expandedSections.date && (
          <div className="space-y-2 pb-3">
            {dateOptions.map((option) => (
              <div key={option.value} className="flex items-center space-x-2">
                <Checkbox
                  id={`date-${option.value}`}
                  checked={selectedDate.includes(option.value)}
                  onCheckedChange={() =>
                    toggleFilter(option.value, selectedDate, setSelectedDate)
                  }
                />
                <Label
                  htmlFor={`date-${option.value}`}
                  className="text-sm font-normal cursor-pointer"
                >
                  {option.label}
                </Label>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Price Section */}
      <div className="border-b border-border pb-2">
        <SectionHeader title="Price" section="price" />
        {expandedSections.price && (
          <RadioGroup value={priceRange} onValueChange={setPriceRange} className="space-y-2 pb-3">
            {priceOptions.map((option) => (
              <div key={option.value} className="flex items-center space-x-2">
                <RadioGroupItem value={option.value} id={`price-${option.value}`} />
                <Label
                  htmlFor={`price-${option.value}`}
                  className="text-sm font-normal cursor-pointer"
                >
                  {option.label}
                </Label>
              </div>
            ))}
          </RadioGroup>
        )}
      </div>

      {/* Language Section */}
      <div className="border-b border-border pb-2">
        <SectionHeader title="Language" section="language" />
        {expandedSections.language && (
          <div className="space-y-2 pb-3 max-h-64 overflow-y-auto">
            {languageOptions.map((lang) => (
              <div key={lang} className="flex items-center space-x-2">
                <Checkbox
                  id={`lang-${lang}`}
                  checked={selectedLanguages.includes(lang)}
                  onCheckedChange={() =>
                    toggleFilter(lang, selectedLanguages, setSelectedLanguages)
                  }
                />
                <Label
                  htmlFor={`lang-${lang}`}
                  className="text-sm font-normal cursor-pointer"
                >
                  {lang}
                </Label>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Categories Section */}
      <div className="border-b border-border pb-2">
        <SectionHeader title="Categories" section="categories" />
        {expandedSections.categories && (
          <div className="space-y-2 pb-3">
            {categoryOptions.map((category) => (
              <div key={category} className="flex items-center space-x-2">
                <Checkbox
                  id={`cat-${category}`}
                  checked={selectedCategories.includes(category)}
                  onCheckedChange={() =>
                    toggleFilter(category, selectedCategories, setSelectedCategories)
                  }
                />
                <Label
                  htmlFor={`cat-${category}`}
                  className="text-sm font-normal cursor-pointer"
                >
                  {category}
                </Label>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* More Filters Section */}
      <div className="pb-2">
        <SectionHeader title="More Filters" section="moreFilters" />
        {expandedSections.moreFilters && (
          <div className="space-y-2 pb-3">
            {moreFilterOptions.map((filter) => (
              <div key={filter} className="flex items-center space-x-2">
                <Checkbox
                  id={`more-${filter}`}
                  checked={selectedMoreFilters.includes(filter)}
                  onCheckedChange={() =>
                    toggleFilter(filter, selectedMoreFilters, setSelectedMoreFilters)
                  }
                />
                <Label
                  htmlFor={`more-${filter}`}
                  className="text-sm font-normal cursor-pointer"
                >
                  {filter}
                </Label>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Browse by Venues */}
      <div className="pt-4">
        <Button variant="outline" className="w-full justify-center">
          Browse by Venues
        </Button>
      </div>
    </div>
  );
}

