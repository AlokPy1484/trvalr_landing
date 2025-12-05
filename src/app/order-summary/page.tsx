
'use client';

import React from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { OrderItemCard, type OrderSummaryItemProps } from '@/components/order/OrderItemCard';
import { useLanguage } from '@/contexts/LanguageContext';
import { useCurrency } from '@/contexts/CurrencyContext';
import { Separator } from '@/components/ui/separator';

interface OrderLocationGroup {
  locationTitleKey: string;
  locationTitleFallback: string;
  items: OrderSummaryItemProps[];
}

// Placeholder data inspired by the reference image
// priceValue is now the base INR numeric string value
const orderSummaryData: OrderLocationGroup[] = [
  {
    locationTitleKey: 'orderSummaryNiceLocation',
    locationTitleFallback: 'Nice, France (Days 1-3)',
    items: [
      {
        id: 'nice-hotel',
        imageUrl: 'https://placehold.co/100x80.png',
        imageAlt: 'Hotel Le Negresco exterior',
        aiHint: 'hotel exterior classic',
        titleKey: 'hotelLeNegresco',
        titleFallback: 'Hotel Le Negresco',
        dateRangeKey: 'orderSummaryHotelLeNegrescoDate',
        dateRangeFallback: 'Jul 15 - Jul 17, 2025',
        typeBadgeKey: 'activityTypeAccommodation',
        typeBadgeFallback: 'Accommodation',
        itemDetailsKey: 'orderSummaryHotelLeNegrescoDetails',
        itemDetailsFallback: '1 rooms, 2 people',
        priceKey: 'orderSummaryHotelLeNegrescoPriceKey', // Contextual key if needed
        priceValue: '279592', // Base INR value
      },
      {
        id: 'nice-activity',
        imageUrl: 'https://placehold.co/100x80.png',
        imageAlt: '3-Wheel Vehicle tour in Nice',
        aiHint: '3 wheel vehicle coast',
        titleKey: 'activityScenicDrive3WheelTitle',
        titleFallback: 'From Nice: 2-Hour Scenic Drive by 3-Wheel Vehicle',
        dateRangeKey: 'orderSummaryScenicDriveDate',
        dateRangeFallback: 'Jul 15 - Jul 17, 2025',
        typeBadgeKey: 'activityTypeActivity',
        typeBadgeFallback: 'Activity',
        itemDetailsKey: 'orderSummaryScenicDriveDetails',
        itemDetailsFallback: '2 people',
        priceKey: 'orderSummaryScenicDrivePriceKey',
        priceValue: '9919', // Base INR value
      },
    ],
  },
  {
    locationTitleKey: 'orderSummaryCannesLocation',
    locationTitleFallback: 'Cannes, France (Days 3-5)',
    items: [
      {
        id: 'cannes-hotel',
        imageUrl: 'https://placehold.co/100x80.png',
        imageAlt: 'MOB HOTEL Cannes pool area',
        aiHint: 'hotel pool lounge modern',
        titleKey: 'mobHotelCannesActivityTitle',
        titleFallback: 'MOB HOTEL Cannes',
        dateRangeKey: 'orderSummaryMobHotelDate',
        dateRangeFallback: 'Jul 17 - Jul 19, 2025',
        typeBadgeKey: 'activityTypeAccommodation',
        typeBadgeFallback: 'Accommodation',
        itemDetailsKey: 'orderSummaryMobHotelDetails',
        itemDetailsFallback: '1 rooms, 2 people',
        priceKey: 'orderSummaryMobHotelPriceKey',
        priceValue: '48216', // Base INR value
      },
      {
        id: 'cannes-activity',
        imageUrl: 'https://placehold.co/100x80.png',
        imageAlt: 'Boat trip to Lerins Islands',
        aiHint: 'boat islands cannes',
        titleKey: 'cannesPrivateBoatTrip',
        titleFallback: "Cannes: Private Boat Trip to Lerins Islands & Cap d'Antibes",
        dateRangeKey: 'orderSummaryCannesBoatTripDate',
        dateRangeFallback: 'Jul 17 - Jul 19, 2025',
        typeBadgeKey: 'activityTypeActivity',
        typeBadgeFallback: 'Activity',
        itemDetailsKey: 'orderSummaryCannesBoatTripDetails',
        itemDetailsFallback: '2 people',
        priceKey: 'orderSummaryCannesBoatTripPriceKey',
        priceValue: '57530', // Base INR value
      },
    ],
  },
  {
    locationTitleKey: 'orderSummaryStTropezLocation',
    locationTitleFallback: 'Saint-Tropez, France (Days 5-8)',
    items: [
      {
        id: 'sttropez-hotel',
        imageUrl: 'https://placehold.co/100x80.png',
        imageAlt: 'Villa Cosy, hotel & spa exterior',
        aiHint: 'hotel luxury spa villa',
        titleKey: 'villaCosyHotelSpaActivityTitle',
        titleFallback: 'Villa Cosy, hotel & spa',
        dateRangeKey: 'orderSummaryVillaCosyDate',
        dateRangeFallback: 'Jul 19 - Jul 22, 2025',
        typeBadgeKey: 'activityTypeAccommodation',
        typeBadgeFallback: 'Accommodation',
        itemDetailsKey: 'orderSummaryVillaCosyDetails',
        itemDetailsFallback: '1 rooms, 2 people',
        priceKey: 'orderSummaryVillaCosyPriceKey',
        priceValue: '1097368', // Base INR value
      },
      {
        id: 'sttropez-activity-1',
        imageUrl: 'https://placehold.co/100x80.png',
        imageAlt: 'Catamaran sailing tour',
        aiHint: 'catamaran sailing coast',
        titleKey: 'coteDAzurSailingTourActivityTitle',
        titleFallback: "Côte d'Azur: Half-Day Coastline Catamaran Sailing Tour",
        dateRangeKey: 'orderSummarySailingTourDate',
        dateRangeFallback: 'Jul 19 - Jul 22, 2025',
        typeBadgeKey: 'activityTypeActivity',
        typeBadgeFallback: 'Activity',
        itemDetailsKey: 'orderSummarySailingTourDetails',
        itemDetailsFallback: '2 people',
        priceKey: 'orderSummarySailingTourPriceKey',
        priceValue: '11903', // Base INR value
      },
      {
        id: 'sttropez-activity-2',
        imageUrl: 'https://placehold.co/100x80.png',
        imageAlt: 'Kayaking in Ramatuelle Reserve',
        aiHint: 'kayak sea reserve clear',
        titleKey: 'stTropezKayakExperienceActivityTitle',
        titleFallback: 'Saint-Tropez: Kayak Experience in Ramatuelle Reserve',
        dateRangeKey: 'orderSummaryKayakExperienceDate',
        dateRangeFallback: 'Jul 19 - Jul 22, 2025',
        typeBadgeKey: 'activityTypeActivity',
        typeBadgeFallback: 'Activity',
        itemDetailsKey: 'orderSummaryKayakExperienceDetails',
        itemDetailsFallback: '2 people',
        priceKey: 'orderSummaryKayakExperiencePriceKey',
        priceValue: '11903', // Base INR value
      },
    ],
  },
];

export default function OrderSummaryPage() {
  const { getTranslation } = useLanguage();
  const { selectedCurrency, currencyRates, baseCurrencyCode } = useCurrency();
  const [searchQuery, setSearchQuery] = React.useState('');
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [checkoutHotels,setCheckoutHotels]=React.useState<any>([])

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll(); 
    if(typeof window!=="undefined"){
    const checkout=localStorage.getItem("checkoutHotels")
    if(checkout)
    setCheckoutHotels(JSON.parse(checkout))
    }
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleHeaderSearchSubmit = () => {
    console.log('Header search submitted on Order Summary page:', searchQuery);
  };

  const handleReserveItem = (itemId: string, itemTitle: string) => {
    console.log(`Reserve button clicked for item ID: ${itemId}, Title: ${itemTitle}`);
    alert(`Reserving: ${itemTitle}`);
  };

  const handleDeleteItem = (itemId: string, itemTitle: string) => {
    console.log(`Delete button clicked for item ID: ${itemId}, Title: ${itemTitle}`);
    alert(`Deleting: ${itemTitle}`);
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header
        isScrolled={isScrolled}
        searchQuery={searchQuery}
        onSearchQueryChange={setSearchQuery}
        onSearchSubmit={handleHeaderSearchSubmit}
        showCurrencySelector={true}
      />
      <main className="flex-grow py-8 md:py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
          <h1 className="font-headline text-3xl sm:text-4xl font-bold text-foreground mb-8 text-center">
            {getTranslation('orderSummaryTitle', 'Order summary')}
          </h1>

          {checkoutHotels?.map((hotel, groupIndex) => (
            <section key={groupIndex} className="mb-10">
              <h2 className="text-xl font-semibold text-foreground mb-4">
                {/* {getTranslation(group.locationTitleKey, group.locationTitleFallback)} */}
                {hotel?.location}
              </h2>
              <div className="space-y-4">
                 <OrderItemCard 
                    // key={item.id}
                    // {...hotel}
                    hotel={hotel}
                    // Pass props for currency conversion
                    targetCurrencyCode={selectedCurrency.code}
                    baseCurrencyCode={baseCurrencyCode}
                    currencyRates={currencyRates}
                    // onReserve={() => handleReserveItem(item.id, getTranslation(item.titleKey, item.titleFallback))}
                    // onDelete={() => handleDeleteItem(item.id, getTranslation(item.titleKey, item.titleFallback))}
                  />
                {/* {group.items.map((item) => (
                  <OrderItemCard
                    key={item.id}
                    {...item}
                    // Pass props for currency conversion
                    targetCurrencyCode={selectedCurrency.code}
                    baseCurrencyCode={baseCurrencyCode}
                    currencyRates={currencyRates}
                    onReserve={() => handleReserveItem(item.id, getTranslation(item.titleKey, item.titleFallback))}
                    onDelete={() => handleDeleteItem(item.id, getTranslation(item.titleKey, item.titleFallback))}
                  />
                ))} */}
              </div>
              {/* {groupIndex < orderSummaryData.length - 1 && <Separator className="my-8" />} */}
            </section>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
