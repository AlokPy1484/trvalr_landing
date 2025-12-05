const fs = require('fs');
const path = require('path');

// Read the CSV file
const csvPath = path.join(__dirname, '..', 'worldcities.csv');
const csvContent = fs.readFileSync(csvPath, 'utf-8');

// Parse CSV
const lines = csvContent.split('\n');
const headers = lines[0].split(',').map(h => h.replace(/"/g, ''));

const cities = new Map();
const countries = new Map();

// Skip header and process data
for (let i = 1; i < lines.length; i++) {
  if (!lines[i].trim()) continue;
  
  // Simple CSV parser (handles quoted fields)
  const matches = lines[i].match(/(".*?"|[^,]+)(?=\s*,|\s*$)/g);
  if (!matches || matches.length < 6) continue;
  
  const city = matches[0].replace(/"/g, '').trim();
  const cityAscii = matches[1].replace(/"/g, '').trim();
  const country = matches[4].replace(/"/g, '').trim();
  const iso2 = matches[5].replace(/"/g, '').trim();
  const population = matches[9] ? parseInt(matches[9].replace(/"/g, '')) : 0;
  
  if (!city || !country || !iso2) continue;
  
  // Store cities (use ASCII version for better matching, limit to significant cities)
  if (population > 50000 || !population) { // Include cities with pop > 50k or unknown
    const cityKey = `${cityAscii.toLowerCase()}-${iso2}`;
    if (!cities.has(cityKey)) {
      cities.set(cityKey, {
        name: cityAscii,
        country: country,
        countryCode: iso2.toUpperCase(),
      });
    }
  }
  
  // Store countries
  if (!countries.has(iso2)) {
    countries.set(iso2, {
      name: country,
      countryCode: iso2.toUpperCase(),
    });
  }
}

// Convert to arrays and sort
const cityArray = Array.from(cities.values())
  .sort((a, b) => a.name.localeCompare(b.name));

const countryArray = Array.from(countries.values())
  .sort((a, b) => a.name.localeCompare(b.name));

// Generate TypeScript file
const tsContent = `// Auto-generated from worldcities.csv
// This file contains city and country data for autocomplete

export interface CityData {
  name: string;
  country: string;
  countryCode: string;
}

export interface CountryData {
  name: string;
  countryCode: string;
}

// ${cityArray.length} cities with population > 50,000
export const CITIES: CityData[] = ${JSON.stringify(cityArray, null, 2)};

// ${countryArray.length} countries
export const COUNTRIES: CountryData[] = ${JSON.stringify(countryArray, null, 2)};

// Helper function to search cities and countries
export function searchLocations(query: string, limit: number = 10): Array<CityData | CountryData> {
  const lowerQuery = query.toLowerCase().trim();
  if (!lowerQuery) return [];
  
  const results: Array<CityData | CountryData> = [];
  
  // Search cities
  for (const city of CITIES) {
    if (city.name.toLowerCase().startsWith(lowerQuery)) {
      results.push(city);
      if (results.length >= limit) break;
    }
  }
  
  // Search countries if we need more results
  if (results.length < limit) {
    for (const country of COUNTRIES) {
      if (country.name.toLowerCase().startsWith(lowerQuery)) {
        results.push(country);
        if (results.length >= limit) break;
      }
    }
  }
  
  // If still need more, search for contains (not just starts with)
  if (results.length < limit) {
    for (const city of CITIES) {
      if (!city.name.toLowerCase().startsWith(lowerQuery) && 
          city.name.toLowerCase().includes(lowerQuery)) {
        results.push(city);
        if (results.length >= limit) break;
      }
    }
  }
  
  return results;
}

// Type guard to check if result is a city
export function isCity(item: CityData | CountryData): item is CityData {
  return 'country' in item;
}
`;

// Write to src/data directory
const dataDir = path.join(__dirname, '..', 'src', 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const outputPath = path.join(dataDir, 'cities.ts');
fs.writeFileSync(outputPath, tsContent);

console.log(`✅ Processed ${cityArray.length} cities and ${countryArray.length} countries`);
console.log(`📝 Generated file: ${outputPath}`);

