/**
 * App Blacklist Configuration
 * 
 * Add app names here that you don't want to display in the AppScout frontend.
 * The app names should match exactly as they appear in the API response.
 * 
 * Usage:
 * - Simply add a new line with the app name in quotes
 * - App names are case-sensitive
 * - One app name per line for easy management
 */

export const BLACKLISTED_APPS: string[] = [
  // Add app names below (one per line):
  // Example:
  // 'Uber',
  // 'Lyft',
  // 'DoorDash',
];

/**
 * Helper function to check if an app is blacklisted
 */
export function isAppBlacklisted(appName: string): boolean {
  return BLACKLISTED_APPS.some(
    blacklistedName => blacklistedName.toLowerCase() === appName.toLowerCase()
  );
}

