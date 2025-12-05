
'use client';

import type { ReactNode } from 'react';
import React, { createContext, useContext, useState, useMemo } from 'react';

export interface Language {
  code: string;
  name: string;
  nativeName?: string;
}

interface LanguageContextType {
  availableLanguages: Language[];
  selectedLanguage: Language;
  setSelectedLanguage: (language: Language) => void;
  getTranslation: (key: string, fallback: string | any) => string;
}

const defaultLanguage: Language = { code: 'en', name: 'English', nativeName: 'English' };

const translations: Record<string, Record<string, string>> = {
  en: {
    // Common terms
    search: "Search",
    learnMore: 'Learn More',
    viewProfileButton: 'View Profile',
    formButtonCancel: 'Cancel',
    tips: "Tips",
    readMore: "Read more",
    addActivity: "Add",

    // Header & Navigation
    mapper: 'Mapper',
    driftin: 'Driftin',
    companions: 'Companions',
    connect: 'Connect',
    orbit: 'Orbit',
    smartTrails: 'SmartTrails',
    login: 'Login',
    settings: 'Settings',
    logout: 'Logout',
    myChats: 'My Chats',
    myTripsMenu: 'My Trips',
    saved: 'Saved',
    manageSubscription: 'Manage Subscription',
    about: 'About',
    contact: 'Contact',
    termsOfService: 'Terms of service',
    privacyPolicy: 'Privacy',
    selectLanguage: 'Select Language',
    selectCurrency: 'Select Currency',
    userProfile: 'User Profile',
    headerSearchPlaceholder: "Search trvalr...",
    howItWorks: "How it works",
    faq: "FAQ",

    // SubNav
    subNavHosts: 'HOSTS',
    subNavTravelers: 'TRAVELERS',
    subNavCompanions: 'COMPANIONS',

    // Home Page
    heroHeadlinePart1: "Hey, I'm ",
    heroHeadlinePart2: " your personal trip planner",
    heroSubheadline: "Tell me what you want, and I'll handle the rest: flights, hotels, itineraries, in seconds.",
    heroCtaPlaceholder: "Create a 7-day Paris itinerary for a birthday getaway",
    heroSuggestionNewTrip: "Create a new trip",
    heroSuggestionInspire: "Inspire me where to go",
    heroSuggestionWeekend: "Weekend getaways",
    heroSuggestionHowItWorks: "How it works",
    heroImageHeadline: "Plan your next trip",
    heroImageSubheadline: "\"Create a 7 days luxury family trip in the french riviera for 2 people with 3 kids that includes beach exploration, visit to the main cities, fun water sport activities to do with kids and transport within the area with a car, for next month\"",
    heroImageCtaButton: "Ask",

    featuresSectionMainTitle: 'Everything You Need for Your Next Adventure',
    featuresSectionSubtitle: 'From 3D maps to AI-powered itineraries, trvalr is your ultimate travel co-pilot. Discover our suite of tools designed to make your travel seamless and unforgettable.',
    featureMapperTitle: 'Mapper',
    featureMapperDesc: 'Bring your journeys to life with our interactive 3D map. Visualize routes, animate flights, and explore your next destination from every angle.',
    featureConnectTitle: 'Connect',
    featureConnectDesc: 'Find your people. Connect with fellow travelers, local hosts, and friendly companions to enrich your journey and share experiences.',
    featureOrbitTitle: 'Orbit',
    featureOrbitDesc: 'Join our social hub, Orbit. Share your travel stories, discover inspiration from others, and build your global network of friends.',
    featureSmartTrailsTitle: 'SmartTrails',
    featureSmartTrailsDesc: 'Let our AI craft the perfect one-day itinerary for any city. Discover top landmarks, hidden gems, and the best food spots, all optimized for you.',
    
    everyStepMainTitle: 'I will be there for you in every step',
    everyStepSubtitle: 'Curate, save and get notified about your trips on the go.',
    everyStepTailorMadeTitle: 'Tailor-made',
    everyStepTailorMadeDesc: "Get a personalized itinerary tailored to your unique travel style and interests, ensuring a journey that's perfectly you.",
    everyStepCheaperTitle: 'Cheaper',
    everyStepCheaperDesc: "Find the best deals on flights and hotels. trvalr helps you save money, so you can focus on the experience.",
    everyStepHiddenGemsTitle: 'Hidden Gems',
    everyStepHiddenGemsDesc: "Go beyond the usual tourist spots. trvalr uncovers local secrets and unique destinations for a truly authentic trip.",
    everyStepNoSurprisesTitle: 'No Surprises',
    everyStepNoSurprisesDesc: "Travel with confidence. trvalr handles all the details, ensuring your trip is smooth and stress-free from start to finish.",

    // Footer
    footerNewsletterTitle: "Sign up to my newsletter",
    footerNewsletterDescription1: "A newsletter about traveling and using AI to make finding, planning and booking your vacations really easy. Don't search, just ask.",
    footerNewsletterDescription2: "Over 73,000 subscribers",
    footerNewsletterButtonSubscribe: "Subscribe",
    footerNewsletterTitleV2: "Join the Journey",
    footerNewsletterDescriptionV2: "Receive travel inspiration, stories, and exclusive planning tips directly in your inbox.",
    footerNewsletterEmailPlaceholder: "your.email@example.com",


    // Trip Details Page
    tripDetailsTitle: "7-Day Luxury Couple Escape French Riviera",
    tripDetailsTagLuxuryCouple: "Luxury couple",
    tripDetailsTagRomanticGetaway: "Romantic getaway",
    tripDetailsTagFrenchRiviera: "French riviera",
    tripDetailsDateRange: "Jul 15 – 22",
    tripDetailsTravelers: "{count} travellers",
    tripDetailsOverviewTitle: "Trip Overview",
    tripDetailsOverviewText: "This 7-day luxury couple escape along the stunning French Riviera offers the perfect blend of romantic seaside strolls, luxurious accommodations, and exciting water adventures in iconic destinations like Nice, Cannes, and Saint-Tropez. Experience unforgettable moments of relaxation and connection while exploring vibrant old towns, pristine beaches, and breathtaking coastal views.",
    tripDetailsHighlightsTitle: "Highlights",
    tripDetailsHighlight1: "Stay at the iconic Hotel Le Negresco in Nice with elegant period decor",
    tripDetailsHighlight2: "Explore Nice's charming Old Town and vibrant Cours Saleya Flower Market",
    tripDetailsHighlight3: "Enjoy a scenic 2-hour drive along the French Riviera in a unique 3-wheel vehicle",
    tripDetailsHighlight4: "Private boat trip to Lerins Islands and Cap d'Antibes in Cannes",
    tripDetailsActionDownload: "Download",
    tripDetailsActionEdit: "Edit",
    tripDetailsActionShare: "Share",
    tripDetailsActionSave: "Save",
    itinerarySectionTitle: "Itinerary",
    locationNice: "Nice",
    locationCannes: "Cannes",
    locationStTropez: "Saint-Tropez",
    niceFranceLocation: "Nice, France",
    niceDurationDays: "1 - 3 Days",
    daysSuffix: "Days",
    niceDescriptionIntro: "Nice is a stunning city on the French Riviera known for its beautiful beaches, vibrant old town, and luxury shopping. It’s perfect for couples looking to explore cultural sites and en...",
    itineraryDay1NiceTitle: "Day 1: Arrival and Relaxing Evening in Nice",
    itineraryDay1NiceDesc: "Arrive in Nice after your long drive from Berlin and check in at Hotel Le Negresco. Spend a relaxing evening strolling along the iconic Promenade des Anglais, enjoying the sea breeze and beautiful sunset. For dinner, indulge in exquisite French cuisine at Le Chantecler, the Michelin-starred restaurant inside your hotel, perfect for a luxurious yet restful first night.",
    hotelLeNegresco: "Hotel Le Negresco",
    promenadeDesAnglais: "Promenade des Anglais",
    leChantecler: "Le Chantecler",
    itineraryDay1NiceTips: "After a long drive, keep activities light and enjoy the calming sea views to unwind and adjust to the local time.",
    activityTypeTravel: "Travel",
    activityTravelBerlinNiceTitle: "Drive from Berlin → Nice",
    activityTravelBerlinNiceDuration: "12h 30 min",
    activityTypeAccommodation: "Accommodation",
    hotelReviews: "Wonderful (1719 Reviews)",
    hotelPrice: "₹139,796 per night • 2 guests",
    activityTypeAttraction: "Attraction",
    attractionCategorySight: "Sightseeing Spot",
    attractionCategoryCultural: "Cultural Exploration",
    attractionCategoryMarket: "Market Visit",
    attractionCategoryMuseum: "Museum",
    attractionCategoryGeneral: "Attraction",
    itineraryDay2NiceTitleNew: "Day 2: Vibrant Markets, Old Town Charm & Scenic Drive",
    itineraryDay2NiceDescNew: "Start your day with a visit to the vibrant Cours Saleya Flower Market to experience local colors and flavors. Then explore the charming Nice Old Town (Vieux Nice) with its narrow streets and lively atmosphere. Enjoy lunch at La Petite Maison, known for its refined Niçoise cuisine. In the afternoon, embark on the exciting From Nice: 2-Hour Scenic Drive by 3-Wheel Vehicle tour, a fun and unique way to discover the French Riviera's highlights. End the day with a casual dinner at Bistrot d'Antoine, a local favorite with a cozy ambiance.",
    vieuxNice: "Nice Old Town (Vieux Nice)",
    coursSaleya: "Cours Saleya Flower Market",
    laPetiteMaison: "La Petite Maison",
    fromNice2HourScenicDrive: "From Nice: 2-Hour Scenic Drive by 3-Wheel Vehicle",
    bistrotDAntoine: "Bistrot d'Antoine",
    itineraryDay2NiceTipsNew: "Book the 3-wheel vehicle tour in advance to secure your preferred time and enjoy a memorable adventure.",
    activityCoursSaleyaTitle: "Cours Saleya Flower Market",
    activityNiceOldTownTitle: "Nice Old Town (Vieux Nice)",
    activityTypeActivity: "Activity",
    activityScenicDrive3WheelTitle: "From Nice: 2-Hour Scenic Drive by 3-Wheel Vehicle",
    activityScenicDrive3WheelDuration: "2 hours",
    activityScenicDrive3WheelPersons: "2 person",
    itineraryDay3NiceNewTitle: "Day 3: Art, Views & Departure to Cannes",
    itineraryDay3NiceNewDesc: "After checking out from Hotel Le Negresco, visit the Marc Chagall National Museum to immerse in beautiful art. Then take a leisurely walk through Massena Square (Place Masséna) and nearby Castle Hill (Colline du Château) for panoramic views of Nice and the coastline. Have a light lunch at Café de Turin, famous for its seafood. Depart for Cannes by car in the early afternoon, a short 1-hour drive, ready for the next leg of your luxury trip.",
    marcChagallMuseum: "Marc Chagall National Museum",
    massenaSquare: "Massena Square (Place Masséna)",
    castleHill: "Castle Hill (Colline du Château)",
    cafeDeTurin: "Café de Turin",
    itineraryDay3NiceNewTips: "Morning visits are best to avoid crowds and enjoy cooler temperatures before your drive to Cannes.",
    marcChagallMuseumActivityTitle: "Marc Chagall National Museum",
    massenaSquareActivityTitle: "Massena Square (Place Masséna)",
    castleHillActivityTitle: "Castle Hill (Colline du Château)",
    activityTravelNiceCannesDurationNew: "1 hour",
    cannesFranceLocation: "Cannes, France",
    cannesFranceDurationSuffix: "(3 - 5 Days)",
    cannesDescriptionIntro: "Cannes is a glamorous city on the French Riviera, famous for its luxurious beaches, the prestigious Cannes Film Festival, and its charming old town. It's perfect for couples...",
    itineraryDay3CannesTitle: "Day 3: Arrival and Leisurely Exploration of Cannes",
    itineraryDay3CannesDesc: "Arrive in Cannes by car from Nice (1 hour) and check in at MOB HOTEL Cannes. Spend a relaxed morning settling in and enjoying the unique vibe of your hotel. In the afternoon, explore the charming old town by visiting Le Suquet, the historic quarter with narrow streets and stunning views over the city and sea. Then stroll along the famous La Croisette Boulevard, soaking in the luxury shops and vibrant atmosphere. For dinner, enjoy a meal at Bobo Bistro, known for its fresh Mediterranean cuisine and welcoming ambiance.",
    mobHotelCannes: "MOB HOTEL Cannes",
    leSuquet: "Le Suquet",
    laCroisetteBoulevard: "La Croisette Boulevard",
    boboBistro: "Bobo Bistro",
    itineraryDay3CannesTips: "Cannes can get quite warm in July, so plan outdoor activities for the cooler parts of the day and stay hydrated.",
    activityTravelNiceCannesTitle: "Drive from Nice → Cannes",
    activityTravelNiceCannesDurationShort: "42 min",
    mobHotelCannesActivityTitle: "MOB HOTEL Cannes",
    mobHotelReviewsCannes: "Very Good (198 Reviews)",
    mobHotelDiscount: "15% off",
    mobHotelPriceCannes: "₹24,108 per night • 2 guests",
    leSuquetAttractionTitleCannes: "Le Suquet",
    itineraryDay4CannesTitle: "Day 4: Private Boat Adventure and Beach Relaxation",
    itineraryDay4CannesDesc: "Start your day with the exciting Cannes: Private Boat Trip to Lerins Islands & Cap d'Antibes, a 3-hour private boat cruise perfect for a romantic and relaxing experience. Swim, snorkel, and explore the beautiful islands at your own pace with a local skipper. After returning, spend the afternoon relaxing at one of Cannes' pristine beaches, such as Plage de la Croisette. For dinner, indulge in exquisite seafood at Astoux et Brun, a renowned spot loved by locals and visitors alike.",
    cannesPrivateBoatTrip: "Cannes: Private Boat Trip to Lerins Islands & Cap d'Antibes",
    plageDeLaCroisette: "Plage de la Croisette",
    astouxEtBrun: "Astoux et Brun",
    itineraryDay4CannesTips: "Book the boat trip early in the morning to avoid the midday heat and crowds, and bring sun protection.",
    cannesPrivateBoatTripDuration: "3 hours",
    cannesPrivateBoatTripPersons: "2 person",
    itineraryDay5CannesTitle: "Day 5: Market Visit and Scenic Departure",
    itineraryDay5CannesDesc: "On your last morning, check out from MOB HOTEL Cannes and visit the vibrant Marché Forville, a traditional market offering fresh local produce, flowers, and delicacies — a great spot for breakfast or to pick up gourmet souvenirs. Then take a leisurely walk around the Port of Cannes to admire luxury yachts and soak in the Riviera ambiance before driving to Saint-Tropez (1 hour).",
    marcheForville: "Marché Forville",
    portOfCannes: "Port of Cannes",
    itineraryDay5CannesTips: "Markets in Cannes are lively in the morning; arriving early ensures the best selection and a more relaxed experience.",
    marcheForvilleActivityTitle: "Marché Forville",
    portOfCannesActivityTitle: "Port of Cannes",
    stTropezFranceLocation: "Saint-Tropez, France",
    stTropezFranceDurationSuffix: "(5 - 8 Days)",
    stTropezDescriptionIntro: "Saint-Tropez is a glamorous and iconic destination on the French Riviera, famous for its luxurious beaches, its vibrant nightlife, and its charming old town. It's perfect for couples seeking beautiful sandy shores and engaging water sports in a sophisticated setting. The town also offers exclusive shopping and exquisite dining experiences that will delight both adults and kids alike.",
    itineraryDay5StTropezTitle: "Day 5: Arrival and Leisure in Saint-Tropez",
    itineraryDay5StTropezDesc: "Arrive from Cannes by car (1 hour) and check in at Villa Cosy, hotel & spa. Spend a relaxing afternoon exploring the charming St-Tropez Market (Marché Place des Lices), perfect for a leisurely stroll and sampling local delicacies. Enjoy dinner at La Vague d'Or, a Michelin-starred restaurant offering exquisite Mediterranean cuisine in a luxurious setting.",
    villaCosyHotelSpa: "Villa Cosy, hotel & spa",
    stTropezMarketPlaceDesLices: "St-Tropez Market (Marché Place des Lices)",
    laVagueDOr: "La Vague d'Or",
    itineraryDay5StTropezTips: "Take it easy on arrival day to adjust to the new surroundings and enjoy the local market's vibrant atmosphere.",
    activityTravelCannesStTropezTitle: "Drive from Cannes → Saint-Tropez",
    activityTravelCannesStTropezDuration: "1h 28 min",
    villaCosyHotelSpaActivityTitle: "Villa Cosy, hotel & spa",
    villaCosyHotelSpaReviews: "Wonderful (231 Reviews)",
    villaCosyHotelSpaPrice: "₹365,789 per night • 2 guests",
    stTropezMarketActivityTitle: "St-Tropez Market (Marché Place des Lices)",
    itineraryDay6StTropezTitle: "Day 6: Sailing and Beach Relaxation",
    itineraryDay6StTropezDesc: "Embark on the Côte d'Azur: Half-Day Coastline Catamaran Sailing Tour for a 3-hour romantic sailing adventure along the stunning coastline. Enjoy swimming, kayaking, and paddleboarding stops to fully immerse in the beauty of the Mediterranean. After the tour, relax at the iconic Pampelonne Beach, known for its beautiful sandy shores and crystal-clear waters. Dine at Le Club 55, a legendary beachside restaurant famous for its fresh seafood and elegant atmosphere.",
    coteDAzurSailingTour: "Côte d'Azur: Half-Day Coastline Catamaran Sailing Tour",
    pampelonneBeach: "Pampelonne Beach",
    leClub55: "Le Club 55",
    itineraryDay6StTropezTips: "Bring swimwear and sun protection for a day on the water and beach.",
    coteDAzurSailingTourActivityTitle: "Côte d'Azur: Half-Day Coastline Catamaran Sailing Tour",
    coteDAzurSailingTourDuration: "3 hours",
    coteDAzurSailingTourPersons: "2 person",
    pampelonneBeachActivityTitle: "Pampelonne Beach",
    itineraryDay7StTropezTitle: "Day 7: Kayaking and Cultural Exploration",
    itineraryDay7StTropezDesc: "Start the day with the exciting Saint-Tropez: Kayak Experience in Ramatuelle Reserve, where you can snorkel and explore vibrant marine life in the Mediterranean. In the afternoon, visit the historic St-Tropez Citadel (Citadelle de Saint-Tropez) for panoramic views and a touch of local history. Follow this with a visit to the Annonciade Museum to admire impressionist and post-impressionist art. Enjoy dinner at L'Opera Saint-Tropez, a chic spot with a lively atmosphere and diverse menu.",
    stTropezKayakExperience: "Saint-Tropez: Kayak Experience in Ramatuelle Reserve",
    stTropezCitadel: "St-Tropez Citadel (Citadelle de Saint-Tropez)",
    annonciadeMuseum: "Annonciade Museum",
    lOperaSaintTropez: "L'Opera Saint-Tropez",
    itineraryDay7StTropezTips: "Wear comfortable shoes for walking and bring snorkeling gear if you have it.",
    stTropezKayakExperienceActivityTitle: "Saint-Tropez: Kayak Experience in Ramatuelle Reserve",
    stTropezKayakExperienceDuration: "3 hours",
    stTropezKayakExperiencePersons: "2 person",
    stTropezCitadelActivityTitle: "St-Tropez Citadel (Citadelle de Saint-Tropez)",
    annonciadeMuseumActivityTitle: "Annonciade Museum",
    itineraryDay8StTropezTitle: "Day 8: Departure Day and Relaxation",
    itineraryDay8StTropezDesc: "Spend the morning packing and enjoying the amenities at Villa Cosy, hotel & spa. Take a leisurely breakfast at Sénéquier, a classic Saint-Tropez café known for its pastries and sea views. Prepare for your departure by car to Berlin, ensuring a smooth and relaxed start to your next travel leg.",
    senequier: "Sénéquier",
    itineraryDay8StTropezTips: "Keep the day light to avoid stress before the long drive ahead.",
    activityTravelStTropezBerlinTitle: "Drive from Saint-Tropez → Berlin",
    activityTravelStTropezBerlinDuration: "13h 45 min",
    mapAltText: "Map of French Riviera",
    modifyRoute: "Modify Route",
    shareViaWhatsApp: "Share via WhatsApp",
    checkout: "Check out",

    // Order Summary Page
    orderSummaryTitle: "Order summary",
    reserveButton: "Reserve",
    deleteItem: "Delete item",
    orderSummaryNiceLocation: "Nice, France (Days 1-3)",
    orderSummaryHotelLeNegrescoDate: "Jul 15 - Jul 17, 2025",
    orderSummaryHotelLeNegrescoDetails: "1 rooms, 2 people",
    orderSummaryScenicDriveDate: "Jul 15 - Jul 17, 2025",
    orderSummaryScenicDriveDetails: "2 people",
    orderSummaryCannesLocation: "Cannes, France (Days 3-5)",
    orderSummaryMobHotelDate: "Jul 17 - Jul 19, 2025",
    orderSummaryMobHotelDetails: "1 rooms, 2 people",
    orderSummaryCannesBoatTripDate: "Jul 17 - Jul 19, 2025",
    orderSummaryCannesBoatTripDetails: "2 people",
    orderSummaryStTropezLocation: "Saint-Tropez, France (Days 5-8)",
    orderSummaryVillaCosyDate: "Jul 19 - Jul 22, 2025",
    orderSummaryVillaCosyDetails: "1 rooms, 2 people",
    orderSummarySailingTourDate: "Jul 19 - Jul 22, 2025",
    orderSummarySailingTourDetails: "2 people",
    orderSummaryKayakExperienceDate: "Jul 19 - Jul 22, 2025",
    orderSummaryKayakExperienceDetails: "2 people",

    // How It Works Page
    howItWorksPageTitle: "How trvalr works",
    howItWorksPageSubtitle: "Transforming your travel ideas into reality in just a few simple steps.",
    howItWorksStep1Title: "1. Tell Us Your Dream Trip",
    howItWorksStep1Desc: "Start with a simple prompt in your own words. The more detail you provide, the better. For example, 'A 10-day romantic trip to Italy focusing on food and history' or 'A budget-friendly solo backpacking adventure through Southeast Asia for a month'.",
    howItWorksStep2Title: "2. Review Your AI-Crafted Itinerary",
    howItWorksStep2Desc: "In seconds, trvalr's AI analyzes your request and generates a complete, day-by-day itinerary. This includes recommendations for flights, hotels, restaurants, and activities, all tailored to your preferences.",
    howItWorksStep3Title: "3. Customize and Refine",
    howItWorksStep3Desc: "Your journey, your rules. The AI-generated plan is a flexible starting point. Easily swap hotels, change activities, adjust timings, or ask the AI for alternative suggestions until the plan is perfect for you.",
    howItWorksStep4Title: "4. Book With Confidence",
    howItWorksStep4Desc: "Once you are happy with your personalized itinerary, you can proceed to book your flights, accommodations, and activities directly through our trusted partners, all in one seamless experience.",
    howItWorksStep5Title: "5. Enjoy More, Plan Less",
    howItWorksStep5Desc: "No more hassle spending hours building the perfect itinerary. With trvalr, that time is saved. Spend it where it matters most — at your desired destination, creating unforgettable memories.",
    howItWorksReadyTitle: "Ready to Plan Your Adventure?",
    howItWorksReadySubtitle: "Let trvalr take the stress out of travel planning.",
    startPlanningButton: "Start Planning Now",

    // FAQ Page
    faqPageTitle: "Frequently Asked Questions",
    faqPageSubtitle: "Have questions? We have answers. Find everything you need to know about trvalr.",
    faqQ1: "What is trvalr?",
    faqA1: "trvalr is a next-generation travel platform that uses artificial intelligence to help you plan, book, and experience your perfect trip. Simply tell us what you're looking for in natural language, and our AI will create a personalized itinerary complete with flights, accommodations, and activities.",
    faqQ2: "How does the AI itinerary generation work?",
    faqA2: "You provide a natural language prompt (e.g., 'a 5-day foodie trip to Tokyo for two'). Our AI analyzes your request, understands your intent, and searches through millions of data points to build a customized itinerary that matches your style, budget, and interests.",
    faqQ3: "Can I customize the generated itinerary?",
    faqA3: "Absolutely! The AI-generated plan is just a starting point. You have full control to edit every aspect of your trip, from swapping hotels and activities to adjusting your daily schedule. You can collaborate with the AI to refine your plan until it's perfect.",
    faqQ4: "Is trvalr free to use?",
    faqA4: "trvalr offers a free plan that allows you to generate a limited number of trip plans per month. For unlimited planning, advanced AI features, and exclusive deals, we offer a Pro subscription. You can learn more on our subscription page.",
    faqQ5: "How is my data handled?",
    faqA5: "We take your privacy very seriously. All your personal information and travel plans are securely stored. We only use your data to personalize your experience and improve our services. For more details, please read our full ",
  },
  ja: {
    // Common terms
    search: "検索",
    learnMore: '詳しく見る',
    viewProfileButton: 'プロフィールを見る',
    formButtonCancel: 'キャンセル',
    tips: "ヒント",
    readMore: "もっと読む",
    addActivity: "追加",
  
    // Header & Navigation
    mapper: 'マッパー',
    driftin: 'ドリフティン',
    companions: 'コンパニオン',
    connect: '接続',
    orbit: 'オービット',
    smartTrails: 'スマートトレイル',
    login: 'ログイン',
    settings: '設定',
    logout: 'ログアウト',
    myChats: 'マイチャット',
    myTripsMenu: 'マイトリップ',
    saved: '保存済み',
    manageSubscription: 'サブスクリプションの管理',
    about: '概要',
    contact: 'お問い合わせ',
    termsOfService: '利用規約',
    privacyPolicy: 'プライバシーポリシー',
    selectLanguage: '言語を選択',
    selectCurrency: '通貨を選択',
    userProfile: 'プロフィール',
    headerSearchPlaceholder: "trvalrで検索...",
    howItWorks: "仕組み",
    faq: "よくある質問",
  
    // SubNav
    subNavHosts: 'ホスト',
    subNavTravelers: '旅行者',
    subNavCompanions: 'コンパニオン',
  
    // Home Page
    heroHeadlinePart1: "こんにちは、私は",
    heroHeadlinePart2: "、あなたのパーソナル旅行プランナーです",
    heroSubheadline: "ご希望をお聞かせください。フライト、ホテル、旅程など、すべて数秒で手配します。",
    heroCtaPlaceholder: "誕生日の旅行に、7日間のパリの旅程を作成",
    heroSuggestionNewTrip: "新しい旅行を作成",
    heroSuggestionInspire: "どこへ行くかインスピレーションを",
    heroSuggestionWeekend: "週末の小旅行",
    heroSuggestionHowItWorks: "仕組み",
    heroImageHeadline: "次の旅行を計画する",
    heroImageSubheadline: "「来月、フランスのリビエラで2人と子供3人のための7日間の豪華な家族旅行を作成してください。ビーチ探索、主要都市への訪問、子供と楽しめるウォータースポーツ、車での地域内交通を含めてください」",
    heroImageCtaButton: "尋ねる",
  
    featuresSectionMainTitle: '次の冒険に必要なすべて',
    featuresSectionSubtitle: '3DマップからAIによる旅程まで、trvalrはあなたの究極の旅行副操縦士です。',
    featureMapperTitle: 'マッパー',
    featureMapperDesc: 'インタラクティブな3Dマップで旅を生き生きとさせましょう。ルートを視覚化し、フライトをアニメーション化し、次の目的地をあらゆる角度から探検します。',
    featureConnectTitle: '接続',
    featureConnectDesc: '仲間を見つけましょう。他の旅行者、地元のホスト、フレンドリーなコンパニオンとつながり、旅を豊かにし、経験を共有します。',
    featureOrbitTitle: 'オービット',
    featureOrbitDesc: '私たちのソーシャルハブ、オービットに参加しましょう。旅の物語を共有し、他の人からインスピレーションを得て、グローバルな友達のネットワークを築きましょう。',
    featureSmartTrailsTitle: 'スマートトレイル',
    featureSmartTrailsDesc: 'AIに任せて、どんな都市でも完璧な1日の旅程を作成しましょう。最高のランドマーク、隠れた名所、最高の食事スポットをあなたのために最適化して発見します。',
      
    everyStepMainTitle: 'あらゆる段階であなたのために',
    everyStepSubtitle: '旅をキュレーションし、保存し、外出先で通知を受け取ります。',
    everyStepTailorMadeTitle: 'オーダーメイド',
    everyStepTailorMadeDesc: "あなたのユニークな旅行スタイルと興味に合わせたパーソナライズされた旅程を手に入れ、あなたにぴったりの旅を保証します。",
    everyStepCheaperTitle: 'より安く',
    everyStepCheaperDesc: "フライトとホテルの最安値を見つけます。trvalrは節約を助けるので、あなたは体験に集中できます。",
    everyStepHiddenGemsTitle: '隠れた名所',
    everyStepHiddenGemsDesc: "通常の観光地を超えましょう。trvalrは地元の秘密とユニークな目的地を明らかにし、真に本格的な旅を実現します。",
    everyStepNoSurprisesTitle: 'サプライズなし',
    everyStepNoSurprisesDesc: "自信を持って旅行しましょう。trvalrがすべての詳細を処理し、最初から最後までスムーズでストレスのない旅を保証します。",
  
    // Footer
    footerNewsletterTitle: "ニュースレターに登録",
    footerNewsletterDescription1: "旅行とAIを使って休暇の検索、計画、予約を本当に簡単にするニュースレター。検索するのではなく、ただ尋ねるだけ。",
    footerNewsletterDescription2: "73,000人以上の購読者",
    footerNewsletterButtonSubscribe: "購読する",
    footerNewsletterTitleV2: "旅に参加する",
    footerNewsletterDescriptionV2: "旅行のインスピレーション、ストーリー、限定の計画のヒントを直接受信トレイで受け取ります。",
    footerNewsletterEmailPlaceholder: "your.email@example.com",
  
    // How It Works Page
    howItWorksPageTitle: "trvalrの仕組み",
    howItWorksPageSubtitle: "ほんの数ステップで旅行のアイデアを現実に変えます。",
    howItWorksStep1Title: "1. 夢の旅行を教えてください",
    howItWorksStep1Desc: "自分の言葉で簡単なプロンプトから始めます。詳細を提供するほど良くなります。例：「食べ物と歴史に焦点を当てた10日間のロマンチックなイタリア旅行」または「1か月の東南アジアでの予算にやさしい一人旅の冒険」。",
    howItWorksStep2Title: "2. AIが作成した旅程を確認する",
    howItWorksStep2Desc: "数秒で、trvalrのAIがリクエストを分析し、完全な日ごとの旅程を生成します。これには、フライト、ホテル、レストラン、アクティビティのおすすめが含まれ、すべてあなたの好みに合わせて調整されます。",
    howItWorksStep3Title: "3. カスタマイズと改良",
    howItWorksStep3Desc: "あなたの旅、あなたのルール。AIが生成した計画は柔軟な出発点です。ホテルを交換したり、アクティビティを変更したり、タイミングを調整したり、AIに代替案を尋ねたりして、計画が完璧になるまで改良できます。",
    howItWorksStep4Title: "4. 自信を持って予約する",
    howItWorksStep4Desc: "パーソナライズされた旅程に満足したら、信頼できるパートナーを通じてフライト、宿泊施設、アクティビティを直接予約できます。すべてがシームレスな体験です。",
    howItWorksStep5Title: "5. 計画は少なく、楽しみは多く",
    howItWorksStep5Desc: "完璧な旅程を作成するために何時間も費やす手間はもうありません。trvalrを使えば、その時間が節約できます。最も重要な場所、つまり思い出に残る思い出を作る目的の目的地でその時間をお過ごしください。",
    howItWorksReadyTitle: "冒険を計画する準備はできましたか？",
    howItWorksReadySubtitle: "trvalrに旅行計画のストレスを任せましょう。",
    startPlanningButton: "今すぐ計画を始める",

    // FAQ Page
    faqPageTitle: "よくある質問",
    faqPageSubtitle: "質問がありますか？答えがあります。trvalrについて知る必要があるすべてを見つけてください。",
    faqQ1: "trvalrとは何ですか？",
    faqA1: "trvalrは、人工知能を使用して完璧な旅行を計画、予約、体験するのに役立つ次世代の旅行プラットフォームです。自然言語で探しているものを伝えるだけで、当社のAIがフライト、宿泊施設、アクティビティを含むパーソナライズされた旅程を作成します。",
    faqQ2: "AIの旅程生成はどのように機能しますか？",
    faqA2: "自然言語プロンプト（例：「2人での5日間の東京美食旅行」）を提供します。当社のAIがリクエストを分析し、意図を理解し、何百万ものデータポイントを検索して、あなたのスタイル、予算、興味に合ったカスタマイズされた旅程を構築します。",
    faqQ3: "生成された旅程をカスタマイズできますか？",
    faqA3: "もちろんです！AIが生成した計画は単なる出発点です。ホテルの交換やアクティビティの変更から、毎日のスケジュールの調整まで、旅行のあらゆる側面を完全に制御できます。AIと協力して計画が完璧になるまで改良できます。",
    faqQ4: "trvalrは無料ですか？",
    faqA4: "trvalrは、毎月限られた数の旅行計画を生成できる無料プランを提供しています。無制限の計画、高度なAI機能、限定セールについては、Proサブスクリプションを提供しています。詳細はサブスクリプションページで確認できます。",
    faqQ5: "私のデータはどのように扱われますか？",
    faqA5: "私たちはあなたのプライバシーを非常に真剣に受け止めています。すべての個人情報と旅行計画は安全に保管されます。あなたのデータは、あなたの体験をパーソナライズし、サービスを改善するためにのみ使用します。詳細については、完全な",
  },
};

const initialLanguages: Language[] = [
  defaultLanguage,
  { code: 'ja', name: 'Japanese', nativeName: '日本語' },
  { code: 'ko', name: 'Korean', nativeName: '한국어' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी' },
  { code: 'zh', name: 'Chinese', nativeName: '中文' },
  { code: 'it', name: 'Italian', nativeName: 'Italiano' },
  { code: 'pt', name: 'Portuguese', nativeName: 'Português' },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية' },
  { code: 'de', name: 'German', nativeName: 'Deutsch' },
  { code: 'tr', name: 'Turkish', nativeName: 'Türkçe' },
  { code: 'ru', name: 'Russian', nativeName: 'Русский' },
  { code: 'nl', name: 'Dutch', nativeName: 'Nederlands' },
  { code: 'he', name: 'Hebrew', nativeName: 'עברית' },
  { code: 'bg', name: 'Bulgarian', nativeName: 'Български' },
  { code: 'fil', name: 'Filipino', nativeName: 'Filipino' },
  { code: 'es', name: 'Spanish', nativeName: 'Español' },
];

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [currentLanguage, setCurrentLanguage] = useState<Language>(defaultLanguage);

  const sortedLanguages = useMemo(() => {
    return [...initialLanguages].sort((a, b) => a.name.localeCompare(b.name));
  }, []);

  const getTranslation = (key: string, fallback: string | any): string => {
    const langCode = currentLanguage.code;
    
    let translation = translations[langCode]?.[key] 
                     ?? translations[defaultLanguage.code]?.[key] 
                     ?? (typeof fallback === 'string' ? fallback : key);

    if (typeof fallback === 'object' && fallback !== null) {
      Object.entries(fallback).forEach(([placeholder, value]) => {
        if (typeof translation === 'string') {
            const regex = new RegExp(`{${placeholder}}`, 'g');
            translation = translation.replace(regex, String(value));
        }
      });
    } else if (typeof fallback === 'number') { 
      translation = translation.replace('{count}', String(fallback));
    } else if (typeof fallback === 'string' && key.includes('{')) {
        // Fallback for dynamic keys that might not be in the map
        const placeholder = key.substring(key.indexOf('{') + 1, key.indexOf('}'));
        translation = translation.replace(`{${placeholder}}`, String(fallback));
    }
    
    return translation;
  };

  const value = {
    availableLanguages: sortedLanguages,
    selectedLanguage: currentLanguage,
    setSelectedLanguage: setCurrentLanguage,
    getTranslation,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
