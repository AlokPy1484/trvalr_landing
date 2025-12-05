export const devPrompt = {
  promptInput: "getaway for 5 days Prayagraj",
  checkoutHotels: [],
  itineraryData: {
    status: "SUCCESS",
    message: "SUCCESS",
    title: "Triveni Tranquil Escape",
    destination: "Prayagraj",
    destination_city_code: "ALL",
    budget_type: "Mid-range",
    duration_days: 5,
    start_date: "2025-09-21",
    end_date: "2025-09-26",
    travellers: 2,
    trip_type: ["Romantic getaway", "Cultural exploration"],
    description:
      "Explore the confluence of the Ganga, Yamuna, and mythical Saraswati at Prayagraj, a city steeped in spiritual heritage and colonial charm. Over five days, immerse yourself in ancient temples, vibrant bazaars, and serene river walks. Indulge in local delicacies, witness the famed Triveni Sangam, and visit the historic Sarnath ruins. A blend of romance, culture, and natural beauty, this getaway offers a tranquil retreat while uncovering the city’s rich tapestry of history and spirituality. Perfect for couples seeking serenity and adventure alike.",
    highlights: [
      "Triveni Sangam sunrise river rituals",
      "Sarnath ancient Buddhist ruins tour",
      "Gurudwara Bangla Sahib golden dome",
      "Old city colonial architecture walk",
      "Local street food culinary adventure",
    ],
    itinerary: [
      {
        location: "Triveni Sangam Area",
        description:
          "The heart of Prayagraj where the Ganga, Yamuna, and mythical Saraswati converge, offering spiritual and scenic experiences.",
        latitude: "25.4471",
        longitude: "81.8467",
        hotel_recommendations: [
          {
            hotel_id: "hotel-ganga-view",
            hotel_name: "Hotel Ganga View",
            hotel_category: "Mid-range",
            hotel_location: {
              street_name: "Shahjahan Street",
              area: "Triveni",
              city: "Prayagraj",
              state: "Uttar Pradesh",
              country: "India",
              postal_code: "211003",
            },
            hotel_latitude: 25.4475,
            hotel_longitude: 81.8465,
            hotel_ratings: 4.2,
            review_count: 350,
            rating_source: "TripAdvisor",
            amenities: ["Free WiFi", "Breakfast included", "River view"],
            price_per_night: 2800,
            currency: "INR",
            why_recommended: "Cozy riverside stay with great service",
          },
          {
            hotel_id: "ritz-city",
            hotel_name: "Ritz City Hotel",
            hotel_category: "Luxury",
            hotel_location: {
              street_name: "Maharaja Street",
              area: "Triveni",
              city: "Prayagraj",
              state: "Uttar Pradesh",
              country: "India",
              postal_code: "211004",
            },
            hotel_latitude: 25.447,
            hotel_longitude: 81.847,
            hotel_ratings: 4.6,
            review_count: 520,
            rating_source: "Booking.com",
            amenities: ["Pool", "Spa", "Fine dining"],
            price_per_night: 7500,
            currency: "INR",
            why_recommended: "Luxury comfort with panoramic river views",
          },
          {
            hotel_id: "budget-inn-prayagraj",
            hotel_name: "Budget Inn",
            hotel_category: "Budget",
            hotel_location: {
              street_name: "Kumarkhand Road",
              area: "Triveni",
              city: "Prayagraj",
              state: "Uttar Pradesh",
              country: "India",
              postal_code: "211005",
            },
            hotel_latitude: 25.448,
            hotel_longitude: 81.845,
            hotel_ratings: 3.8,
            review_count: 120,
            rating_source: "Google",
            amenities: ["Free WiFi", "Breakfast", "24h reception"],
            price_per_night: 1200,
            currency: "INR",
            why_recommended: "Affordable stay near Triveni Sangam",
          },
        ],
        days: [
          {
            day: 1,
            date: "2025-09-21",
            title: "Arrival & Triveni Sangam Dawn",
            activities: {
              morning:
                "Arrive in Prayagraj, check‑in, then enjoy breakfast at [Café Ganga](https://maps.google.com/?q=Café+Ganga,+Prayagraj) before heading to [Triveni Sangam](https://maps.google.com/?q=Triveni+Sangam,+Prayagraj) for sunrise rituals.",
              afternoon:
                "Lunch at a local dhaba, then explore the nearby bazaar for souvenirs.",
              evening:
                "Stroll along the river promenade at [Maharaja Street](https://maps.google.com/?q=Maharaja+Street,+Prayagraj) and watch the sunset.",
              night:
                "Dinner at [Raja’s Kitchen](https://maps.google.com/?q=Raja's+Kitchen,+Prayagraj) and relax at the hotel lounge.",
            },
            tips: "Carry a scarf for evening breezes.",
          },
          {
            day: 2,
            date: "2025-09-22",
            title: "Gurudwara Bangla Sahib & Old City",
            activities: {
              morning:
                "Breakfast at the hotel, then visit [Gurudwara Bangla Sahib](https://maps.google.com/?q=Gurudwara+Bangla+Sahib,+Prayagraj) for morning prayers.",
              afternoon:
                "Lunch at [Punjabi Tadka](https://maps.google.com/?q=Punjabi+Tadka,+Prayagraj), then explore [Allahabad Fort](https://maps.google.com/?q=Allahabad+Fort,+Prayagraj).",
              evening:
                "Evening walk through [Old City Market](https://maps.google.com/?q=Old+City+Market,+Prayagraj), enjoy local music.",
              night:
                "Dinner at [The Grand Eatery](https://maps.google.com/?q=The+Grand+Eatery,+Prayagraj) and unwind at the hotel.",
            },
            tips: "Wear comfortable shoes for walking.",
          },
        ],
      },
      {
        location: "Sarnath Heritage Zone",
        description:
          "A UNESCO heritage site where Buddhist monks once taught the world’s first enlightened path.",
        latitude: "25.5740",
        longitude: "81.8776",
        hotel_recommendations: [
          {
            hotel_id: "sarnath-heritage",
            hotel_name: "Sarnath Heritage Hotel",
            hotel_category: "Mid-range",
            hotel_location: {
              street_name: "Sarnath Road",
              area: "Sarnath",
              city: "Prayagraj",
              state: "Uttar Pradesh",
              country: "India",
              postal_code: "211013",
            },
            hotel_latitude: 25.5742,
            hotel_longitude: 81.8778,
            hotel_ratings: 4,
            review_count: 200,
            rating_source: "TripAdvisor",
            amenities: ["Free WiFi", "Breakfast", "Garden"],
            price_per_night: 2600,
            currency: "INR",
            why_recommended: "Proximity to Sarnath ruins, comfortable stay",
          },
          {
            hotel_id: "sarnath-guest-house",
            hotel_name: "Sarnath Guest House",
            hotel_category: "Budget",
            hotel_location: {
              street_name: "Sarnath Lane",
              area: "Sarnath",
              city: "Prayagraj",
              state: "Uttar Pradesh",
              country: "India",
              postal_code: "211014",
            },
            hotel_latitude: 25.574,
            hotel_longitude: 81.8765,
            hotel_ratings: 3.9,
            review_count: 80,
            rating_source: "Google",
            amenities: ["Free WiFi", "Breakfast", "Shuttle service"],
            price_per_night: 1100,
            currency: "INR",
            why_recommended: "Economical option close to temples",
          },
          {
            hotel_id: "sarnath-suites",
            hotel_name: "Sarnath Suites",
            hotel_category: "Luxury",
            hotel_location: {
              street_name: "Sarnath Plaza",
              area: "Sarnath",
              city: "Prayagraj",
              state: "Uttar Pradesh",
              country: "India",
              postal_code: "211015",
            },
            hotel_latitude: 25.575,
            hotel_longitude: 81.879,
            hotel_ratings: 4.5,
            review_count: 300,
            rating_source: "Booking.com",
            amenities: ["Pool", "Spa", "Fine dining"],
            price_per_night: 8000,
            currency: "INR",
            why_recommended: "Premium stay with historic ambience",
          },
        ],
        days: [
          {
            day: 3,
            date: "2025-09-23",
            title: "Sarnath Heritage Day",
            activities: {
              morning:
                "Breakfast at the hotel, then early drive to [Sarnath](https://maps.google.com/?q=Sarnath,+Prayagraj) and visit the archaeological site.",
              afternoon:
                "Explore the Buddha Vihar, walk through the ancient stupas, and lunch at [Buddha Bistro](https://maps.google.com/?q=Buddha+Bistro,+Prayagraj).",
              evening:
                "Return to city, dinner at [Sarnath Café](https://maps.google.com/?q=Sarnath+Café,+Prayagraj).",
              night: "Relax at the hotel.",
            },
            tips: "Carry sunscreen and water.",
          },
          {
            day: 4,
            date: "2025-09-24",
            title: "Cultural Immersion",
            activities: {
              morning:
                "Breakfast, then visit the [Allahabad Museum](https://maps.google.com/?q=Allahabad+Museum,+Prayagraj).",
              afternoon:
                "Lunch at [Chandra Bhavan](https://maps.google.com/?q=Chandra+Bhavan,+Prayagraj), then explore the historic Chandra Bhavan palace.",
              evening:
                "Attend a local cultural show at [Sangeet Hall](https://maps.google.com/?q=Sangeet+Hall,+Prayagraj).",
              night:
                "Dinner at [Heritage Restaurant](https://maps.google.com/?q=Heritage+Restaurant,+Prayagraj).",
            },
            tips: "Check for local festival events.",
          },
        ],
      },
      {
        location: "Gurudwara Bangla Sahib & Old City",
        description:
          "The spiritual hub of Prayagraj with the magnificent golden dome of Gurudwara Bangla Sahib and the bustling streets of Old City.",
        latitude: "25.4459",
        longitude: "81.8412",
        hotel_recommendations: [
          {
            hotel_id: "the-grand-prayagraj",
            hotel_name: "The Grand Prayagraj",
            hotel_category: "Luxury",
            hotel_location: {
              street_name: "Old City Road",
              area: "Old City",
              city: "Prayagraj",
              state: "Uttar Pradesh",
              country: "India",
              postal_code: "211001",
            },
            hotel_latitude: 25.4459,
            hotel_longitude: 81.8412,
            hotel_ratings: 4.7,
            review_count: 450,
            rating_source: "TripAdvisor",
            amenities: ["Pool", "Spa", "Fine dining"],
            price_per_night: 8500,
            currency: "INR",
            why_recommended: "Elegant heritage hotel, central location",
          },
          {
            hotel_id: "riverview-hostel",
            hotel_name: "Riverview Hostel",
            hotel_category: "Hostel",
            hotel_location: {
              street_name: "Old City Lane",
              area: "Old City",
              city: "Prayagraj",
              state: "Uttar Pradesh",
              country: "India",
              postal_code: "211002",
            },
            hotel_latitude: 25.446,
            hotel_longitude: 81.8425,
            hotel_ratings: 4.1,
            review_count: 200,
            rating_source: "Booking.com",
            amenities: ["Free WiFi", "Shared kitchen", "Social lounge"],
            price_per_night: 600,
            currency: "INR",
            why_recommended: "Budget-friendly and social environment",
          },
          {
            hotel_id: "old-city-inn",
            hotel_name: "Old City Inn",
            hotel_category: "Mid-range",
            hotel_location: {
              street_name: "Old City Street",
              area: "Old City",
              city: "Prayagraj",
              state: "Uttar Pradesh",
              country: "India",
              postal_code: "211003",
            },
            hotel_latitude: 25.447,
            hotel_longitude: 81.8405,
            hotel_ratings: 4,
            review_count: 150,
            rating_source: "Google",
            amenities: ["Free WiFi", "Breakfast", "Café"],
            price_per_night: 2500,
            currency: "INR",
            why_recommended: "Comfortable stay near Gurudwara Bangla Sahib",
          },
        ],
        days: [
          {
            day: 5,
            date: "2025-09-25",
            title: "Departure & Reflection",
            activities: {
              morning:
                "Check out, quick visit to the [Local Market](https://maps.google.com/?q=Local+Market,+Prayagraj) for souvenirs.",
              afternoon:
                "Lunch at [City Bistro](https://maps.google.com/?q=City+Bistro,+Prayagraj) before heading to the airport.",
              evening: "Departure from Prayagraj.",
              night: "N/A",
            },
            tips: "Pack souvenirs before leaving.",
          },
        ],
      },
    ],
    images: [
      {
        raw: "https://images.unsplash.com/photo-1645344273898-7fd1e33803c2?ixid=M3w3OTE5NTd8MHwxfHNlYXJjaHwxfHxQcmF5YWdyYWp8ZW58MHx8fHwxNzU4NDUyMTc3fDA&ixlib=rb-4.1.0",
        full: "https://images.unsplash.com/photo-1645344273898-7fd1e33803c2?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3OTE5NTd8MHwxfHNlYXJjaHwxfHxQcmF5YWdyYWp8ZW58MHx8fHwxNzU4NDUyMTc3fDA&ixlib=rb-4.1.0&q=85",
        regular:
          "https://images.unsplash.com/photo-1645344273898-7fd1e33803c2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3OTE5NTd8MHwxfHNlYXJjaHwxfHxQcmF5YWdyYWp8ZW58MHx8fHwxNzU4NDUyMTc3fDA&ixlib=rb-4.1.0&q=80&w=1080",
        small:
          "https://images.unsplash.com/photo-1645344273898-7fd1e33803c2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3OTE5NTd8MHwxfHNlYXJjaHwxfHxQcmF5YWdyYWp8ZW58MHx8fHwxNzU4NDUyMTc3fDA&ixlib=rb-4.1.0&q=80&w=400",
        thumb:
          "https://images.unsplash.com/photo-1645344273898-7fd1e33803c2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3OTE5NTd8MHwxfHNlYXJjaHwxfHxQcmF5YWdyYWp8ZW58MHx8fHwxNzU4NDUyMTc3fDA&ixlib=rb-4.1.0&q=80&w=200",
        small_s3:
          "https://s3.us-west-2.amazonaws.com/images.unsplash.com/small/photo-1645344273898-7fd1e33803c2",
      },
      {
        raw: "https://images.unsplash.com/photo-1674358596018-5b768ca9cfd1?ixid=M3w3OTE5NTd8MHwxfHNlYXJjaHwyfHxQcmF5YWdyYWp8ZW58MHx8fHwxNzU4NDUyMTc3fDA&ixlib=rb-4.1.0",
        full: "https://images.unsplash.com/photo-1674358596018-5b768ca9cfd1?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3OTE5NTd8MHwxfHNlYXJjaHwyfHxQcmF5YWdyYWp8ZW58MHx8fHwxNzU4NDUyMTc3fDA&ixlib=rb-4.1.0&q=85",
        regular:
          "https://images.unsplash.com/photo-1674358596018-5b768ca9cfd1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3OTE5NTd8MHwxfHNlYXJjaHwyfHxQcmF5YWdyYWp8ZW58MHx8fHwxNzU4NDUyMTc3fDA&ixlib=rb-4.1.0&q=80&w=1080",
        small:
          "https://images.unsplash.com/photo-1674358596018-5b768ca9cfd1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3OTE5NTd8MHwxfHNlYXJjaHwyfHxQcmF5YWdyYWp8ZW58MHx8fHwxNzU4NDUyMTc3fDA&ixlib=rb-4.1.0&q=80&w=400",
        thumb:
          "https://images.unsplash.com/photo-1674358596018-5b768ca9cfd1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3OTE5NTd8MHwxfHNlYXJjaHwyfHxQcmF5YWdyYWp8ZW58MHx8fHwxNzU4NDUyMTc3fDA&ixlib=rb-4.1.0&q=80&w=200",
        small_s3:
          "https://s3.us-west-2.amazonaws.com/images.unsplash.com/small/photo-1674358596018-5b768ca9cfd1",
      },
      {
        raw: "https://images.unsplash.com/photo-1601750059072-b0faf504853e?ixid=M3w3OTE5NTd8MHwxfHNlYXJjaHwzfHxQcmF5YWdyYWp8ZW58MHx8fHwxNzU4NDUyMTc3fDA&ixlib=rb-4.1.0",
        full: "https://images.unsplash.com/photo-1601750059072-b0faf504853e?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3OTE5NTd8MHwxfHNlYXJjaHwzfHxQcmF5YWdyYWp8ZW58MHx8fHwxNzU4NDUyMTc3fDA&ixlib=rb-4.1.0&q=85",
        regular:
          "https://images.unsplash.com/photo-1601750059072-b0faf504853e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3OTE5NTd8MHwxfHNlYXJjaHwzfHxQcmF5YWdyYWp8ZW58MHx8fHwxNzU4NDUyMTc3fDA&ixlib=rb-4.1.0&q=80&w=1080",
        small:
          "https://images.unsplash.com/photo-1601750059072-b0faf504853e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3OTE5NTd8MHwxfHNlYXJjaHwzfHxQcmF5YWdyYWp8ZW58MHx8fHwxNzU4NDUyMTc3fDA&ixlib=rb-4.1.0&q=80&w=400",
        thumb:
          "https://images.unsplash.com/photo-1601750059072-b0faf504853e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3OTE5NTd8MHwxfHNlYXJjaHwzfHxQcmF5YWdyYWp8ZW58MHx8fHwxNzU4NDUyMTc3fDA&ixlib=rb-4.1.0&q=80&w=200",
        small_s3:
          "https://s3.us-west-2.amazonaws.com/images.unsplash.com/small/photo-1601750059072-b0faf504853e",
      },
      {
        raw: "https://images.unsplash.com/photo-1612981889051-27be7c2d52ec?ixid=M3w3OTE5NTd8MHwxfHNlYXJjaHw0fHxQcmF5YWdyYWp8ZW58MHx8fHwxNzU4NDUyMTc3fDA&ixlib=rb-4.1.0",
        full: "https://images.unsplash.com/photo-1612981889051-27be7c2d52ec?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3OTE5NTd8MHwxfHNlYXJjaHw0fHxQcmF5YWdyYWp8ZW58MHx8fHwxNzU4NDUyMTc3fDA&ixlib=rb-4.1.0&q=85",
        regular:
          "https://images.unsplash.com/photo-1612981889051-27be7c2d52ec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3OTE5NTd8MHwxfHNlYXJjaHw0fHxQcmF5YWdyYWp8ZW58MHx8fHwxNzU4NDUyMTc3fDA&ixlib=rb-4.1.0&q=80&w=1080",
        small:
          "https://images.unsplash.com/photo-1612981889051-27be7c2d52ec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3OTE5NTd8MHwxfHNlYXJjaHw0fHxQcmF5YWdyYWp8ZW58MHx8fHwxNzU4NDUyMTc3fDA&ixlib=rb-4.1.0&q=80&w=400",
        thumb:
          "https://images.unsplash.com/photo-1612981889051-27be7c2d52ec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3OTE5NTd8MHwxfHNlYXJjaHw0fHxQcmF5YWdyYWp8ZW58MHx8fHwxNzU4NDUyMTc3fDA&ixlib=rb-4.1.0&q=80&w=200",
        small_s3:
          "https://s3.us-west-2.amazonaws.com/images.unsplash.com/small/photo-1612981889051-27be7c2d52ec",
      },
      {
        raw: "https://images.unsplash.com/photo-1720755433896-d7fee36cd607?ixid=M3w3OTE5NTd8MHwxfHNlYXJjaHw1fHxQcmF5YWdyYWp8ZW58MHx8fHwxNzU4NDUyMTc3fDA&ixlib=rb-4.1.0",
        full: "https://images.unsplash.com/photo-1720755433896-d7fee36cd607?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3OTE5NTd8MHwxfHNlYXJjaHw1fHxQcmF5YWdyYWp8ZW58MHx8fHwxNzU4NDUyMTc3fDA&ixlib=rb-4.1.0&q=85",
        regular:
          "https://images.unsplash.com/photo-1720755433896-d7fee36cd607?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3OTE5NTd8MHwxfHNlYXJjaHw1fHxQcmF5YWdyYWp8ZW58MHx8fHwxNzU4NDUyMTc3fDA&ixlib=rb-4.1.0&q=80&w=1080",
        small:
          "https://images.unsplash.com/photo-1720755433896-d7fee36cd607?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3OTE5NTd8MHwxfHNlYXJjaHw1fHxQcmF5YWdyYWp8ZW58MHx8fHwxNzU4NDUyMTc3fDA&ixlib=rb-4.1.0&q=80&w=400",
        thumb:
          "https://images.unsplash.com/photo-1720755433896-d7fee36cd607?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3OTE5NTd8MHwxfHNlYXJjaHw1fHxQcmF5YWdyYWp8ZW58MHx8fHwxNzU4NDUyMTc3fDA&ixlib=rb-4.1.0&q=80&w=200",
        small_s3:
          "https://s3.us-west-2.amazonaws.com/images.unsplash.com/small/photo-1720755433896-d7fee36cd607",
      },
    ],
  },
};
