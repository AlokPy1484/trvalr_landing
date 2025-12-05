/**
 * Google Calendar Integration Utilities
 * 
 * Generates URLs to add events to Google Calendar
 * Documentation: https://github.com/InteractionDesignFoundation/add-event-to-calendar-docs/blob/main/services/google.md
 */

export interface CalendarEvent {
  title: string;
  description?: string;
  location?: string;
  startTime: Date;
  endTime: Date;
}

/**
 * Format date for Google Calendar (YYYYMMDDTHHmmssZ format)
 */
function formatDateForGoogle(date: Date): string {
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, '0');
  const day = String(date.getUTCDate()).padStart(2, '0');
  const hours = String(date.getUTCHours()).padStart(2, '0');
  const minutes = String(date.getUTCMinutes()).padStart(2, '0');
  const seconds = String(date.getUTCSeconds()).padStart(2, '0');
  
  return `${year}${month}${day}T${hours}${minutes}${seconds}Z`;
}

/**
 * Generate a Google Calendar URL for a single event
 */
export function createGoogleCalendarUrl(event: CalendarEvent): string {
  const baseUrl = 'https://calendar.google.com/calendar/render';
  
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: event.title,
    dates: `${formatDateForGoogle(event.startTime)}/${formatDateForGoogle(event.endTime)}`,
  });
  
  if (event.description) {
    params.append('details', event.description);
  }
  
  if (event.location) {
    params.append('location', event.location);
  }
  
  // Add source and trigger parameters for better tracking
  params.append('sf', 'true'); // Show event details in calendar
  params.append('output', 'xml'); // Force calendar view
  
  return `${baseUrl}?${params.toString()}`;
}

/**
 * Generate an iCal file content for multiple events
 * This can be used to add all trip events at once
 */
export function generateICalFile(events: CalendarEvent[], tripTitle: string): string {
  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Trvalr//Trip Planner//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    `X-WR-CALNAME:${tripTitle}`,
    'X-WR-TIMEZONE:UTC',
  ];
  
  events.forEach((event, index) => {
    const uid = `${Date.now()}-${index}@trvalr.app`;
    const dtstamp = formatDateForGoogle(new Date());
    
    lines.push(
      'BEGIN:VEVENT',
      `UID:${uid}`,
      `DTSTAMP:${dtstamp}`,
      `DTSTART:${formatDateForGoogle(event.startTime)}`,
      `DTEND:${formatDateForGoogle(event.endTime)}`,
      `SUMMARY:${event.title}`,
    );
    
    if (event.description) {
      // Escape special characters in description
      const escapedDescription = event.description
        .replace(/\\/g, '\\\\')
        .replace(/;/g, '\\;')
        .replace(/,/g, '\\,')
        .replace(/\n/g, '\\n');
      lines.push(`DESCRIPTION:${escapedDescription}`);
    }
    
    if (event.location) {
      lines.push(`LOCATION:${event.location}`);
    }
    
    lines.push(
      'STATUS:CONFIRMED',
      'SEQUENCE:0',
      'END:VEVENT'
    );
  });
  
  lines.push('END:VCALENDAR');
  
  return lines.join('\r\n');
}

/**
 * Download an iCal file
 */
export function downloadICalFile(content: string, filename: string = 'trip.ics'): void {
  const blob = new Blob([content], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Open Google Calendar with pre-filled event
 */
export function addToGoogleCalendar(event: CalendarEvent): void {
  const url = createGoogleCalendarUrl(event);
  window.open(url, '_blank', 'noopener,noreferrer');
}

/**
 * Add multiple events to Google Calendar via iCal file
 * This allows users to add all trip events at once
 */
export function addMultipleEventsToCalendar(events: CalendarEvent[], tripTitle: string): void {
  const icalContent = generateICalFile(events, tripTitle);
  downloadICalFile(icalContent, `${tripTitle.replace(/\s+/g, '-').toLowerCase()}.ics`);
}

