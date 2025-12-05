# Flight Search Results Component

## Overview
The Flight Search Results page provides a comprehensive flight search experience with advanced filtering, sorting, and responsive design that follows the platform's light/dark theme.

## Features

### 🔍 Search Functionality
- **Trip Type Toggle**: Switch between Round Trip and One Way
- **Location Search**: From/To location inputs with swap functionality
- **Date Selection**: Flexible date picker for departure and return dates
- **Passenger Selection**: Configure number of passengers
- **Class Selection**: Economy, Premium Economy, Business, First Class

### 🎨 Design Features
- **Responsive Layout**: Fully responsive design for mobile, tablet, and desktop
- **Dark/Light Theme**: Automatic theme adaptation across the platform
- **Smooth Animations**: Framer Motion animations for card appearances
- **Modern UI**: Card-based design with hover effects and smooth transitions

### 🔧 Advanced Filters (Sidebar)
1. **Price Range Slider**: Filter flights by maximum price ($50-$500)
2. **Stops Filter**: 
   - Non-Stop
   - 1 Stop
   - 2+ Stops
3. **Airlines Filter**: Multi-select airline filtering
4. **Departure Time Range**: 24-hour time slider
5. **Arrival Time Range**: 24-hour time slider

### 📊 Sort Options
- **Cheapest**: Sort by lowest price first
- **Fastest**: Sort by shortest flight duration
- **Best**: Optimized balance (to be implemented with algorithm)

### ✈️ Flight Cards Display
Each flight card shows:
- Airline logo and name
- Flight class
- Departure/Arrival times and airports
- Flight duration with visual indicator
- Stop information with badge
- Price with original price strikethrough
- "Cheapest" or "Fastest" badge for best deals

### 📱 Expandable Flight Details
Click "Show flight details" to reveal:
- Aircraft type
- Amenities (WiFi, Entertainment, Meals, etc.)
- Baggage allowance

### 🎯 Mobile Optimizations
- **Mobile Filter Drawer**: Slide-in filter panel on mobile devices
- **Touch-friendly Controls**: Large touch targets for mobile
- **Responsive Grid**: Adaptive layout for different screen sizes
- **Stacked Layout**: Vertical stacking on smaller screens

## Files Structure

```
src/
├── app/
│   └── flights/
│       └── page.tsx              # Main flights page route
└── components/
    └── flights/
        ├── FlightSearchResults.tsx   # Main component
        └── README.md                  # This file
```

## How It Works

### Navigation Flow
1. User enters flight details on home page
2. Clicks search button
3. Redirects to `/flights` with URL parameters:
   - `from`: Origin location
   - `to`: Destination location
   - `depart`: Departure date
   - `return`: Return date (round trip only)
   - `passengers`: Number of passengers
   - `class`: Flight class
   - `type`: Trip type (round-trip/one-way)

### URL Parameters Example
```
/flights?from=Jakarta&to=New%20York&depart=Oct%204,%202023&return=Oct%205,%202023&passengers=1&class=Economy&type=round-trip
```

### State Management
- Local state for all filters and UI controls
- URL query parameters for search criteria
- Real-time filter application without page reload

## Integration with Home Page

The flight search on the home page (`src/components/home/TravelExplorerSection.tsx`) is connected to this results page through the `handleFlightSearch` function which:

1. Collects all search parameters
2. Builds URL query string
3. Navigates to `/flights` page with parameters

## Theme Support

The component uses shadcn/ui theme tokens:
- `bg-card`: Card backgrounds
- `text-foreground`: Primary text
- `text-muted-foreground`: Secondary text
- `border-border`: All borders
- `bg-primary`: Primary actions
- `bg-muted`: Subtle backgrounds

This ensures automatic adaptation to light/dark themes.

## Mock Data

Currently uses mock flight data for demonstration. In production, replace with:
- API calls to flight search service
- Real-time pricing data
- Live availability checks
- Booking integration

## Future Enhancements

1. **Real API Integration**: Connect to actual flight booking APIs
2. **Advanced Sorting**: Implement smart "Best" sorting algorithm
3. **Price Alerts**: Allow users to set price notifications
4. **Map View**: Interactive map showing routes
5. **Multi-city Search**: Support for complex itineraries
6. **Fare Calendar**: Visual price comparison across dates
7. **Seat Selection**: Preview available seats
8. **Loyalty Programs**: Integration with airline rewards
9. **Price History**: Show historical pricing trends
10. **Flexible Dates**: ±3 days search option

## Accessibility

- Keyboard navigation support
- ARIA labels on interactive elements
- Screen reader friendly
- Focus management for modals and drawers
- Sufficient color contrast ratios

## Performance

- Lazy loading of flight cards
- Debounced filter updates
- Optimized re-renders with React.memo (can be added)
- Efficient sorting algorithms
- Suspense boundary for loading states

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

