'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Upload, Calendar as CalendarIcon } from 'lucide-react';
import type { Activity } from './ActivityCard';
import { CalendarEvent } from './CalendarEvent';
import { ItineraryData } from '@/app/trip-details/trips-types';
import { addMultipleEventsToCalendar, type CalendarEvent as GoogleCalendarEvent } from '@/lib/googleCalendar';
import { useToast } from '@/hooks/use-toast';

export interface TripDay {
  day: number;
  date: string; // e.g., 'Jul 15'
  activities: Activity[];
}

interface CalendarViewProps {
  tripDays: TripDay[];
  tripDetails: ItineraryData;
}

const timeLabels = [
  '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm', '8pm', '9pm', '10pm', '11pm', '12am'
];

export function CalendarView({ tripDays, tripDetails }: CalendarViewProps) {
  const { toast } = useToast();
  
  const handleExport = () => {
    if (!tripDetails) {
      toast({
        variant: "destructive",
        title: "No Data Available",
        description: "No trip data available to export.",
      });
      return;
    }

    try {
      const calendarEvents: GoogleCalendarEvent[] = [];

      // Convert trip itinerary to calendar events
      tripDetails.itinerary?.forEach((location) => {
        location.days?.forEach((day) => {
          const dayDate = new Date(day.date);
          
          // Add morning activity
          if (day.activities?.morning) {
            const startTime = new Date(dayDate);
            startTime.setHours(8, 0, 0, 0); // 8:00 AM
            const endTime = new Date(startTime);
            endTime.setHours(12, 0, 0, 0); // 12:00 PM
            
            calendarEvents.push({
              title: `${day.title} - Morning`,
              description: day.activities.morning.description || '',
              location: location.location,
              startTime,
              endTime,
            });
          }

          // Add afternoon activity
          if (day.activities?.afternoon) {
            const startTime = new Date(dayDate);
            startTime.setHours(12, 0, 0, 0); // 12:00 PM
            const endTime = new Date(startTime);
            endTime.setHours(17, 0, 0, 0); // 5:00 PM
            
            calendarEvents.push({
              title: `${day.title} - Afternoon`,
              description: day.activities.afternoon.description || '',
              location: location.location,
              startTime,
              endTime,
            });
          }

          // Add evening activity
          if (day.activities?.evening) {
            const startTime = new Date(dayDate);
            startTime.setHours(17, 0, 0, 0); // 5:00 PM
            const endTime = new Date(startTime);
            endTime.setHours(21, 0, 0, 0); // 9:00 PM
            
            calendarEvents.push({
              title: `${day.title} - Evening`,
              description: day.activities.evening.description || '',
              location: location.location,
              startTime,
              endTime,
            });
          }

          // Add night activity
          if (day.activities?.night) {
            const startTime = new Date(dayDate);
            startTime.setHours(21, 0, 0, 0); // 9:00 PM
            const endTime = new Date(startTime);
            endTime.setHours(23, 59, 0, 0); // 11:59 PM
            
            calendarEvents.push({
              title: `${day.title} - Night`,
              description: day.activities.night.description || '',
              location: location.location,
              startTime,
              endTime,
            });
          }
        });
      });

      if (calendarEvents.length === 0) {
        toast({
          variant: "destructive",
          title: "No Activities Found",
          description: "No activities found to add to calendar.",
        });
        return;
      }

      // Generate and download iCal file
      addMultipleEventsToCalendar(calendarEvents, tripDetails.title || 'My Trip');
      
      // Show success message
      toast({
        title: "Calendar File Created! 📅",
        description: `Successfully created calendar file with ${calendarEvents.length} events. Import the downloaded .ics file to Google Calendar.`,
        duration: 8000,
      });
      
    } catch (error) {
      console.error('Error exporting to calendar:', error);
      toast({
        variant: "destructive",
        title: "Export Failed",
        description: "Failed to export calendar. Please try again.",
      });
    }
  };

  return (
    <div className="bg-card p-4 rounded-lg shadow border">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">
          Calendar <span className="text-muted-foreground font-normal">{tripDetails?.duration_days || tripDays.length} days</span>
        </h3>
        <div className="flex items-center gap-2">
           <Button variant="outline" size="sm" onClick={handleExport} className="h-8">
            <Upload className="h-4 w-4 mr-2"/>
            Add to Google Calendar
          </Button>
          <div className="flex items-center">
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <div 
        className={`grid gap-x-1`}
        style={{ 
          height: '75vh',
          gridTemplateColumns: `40px repeat(${Math.min(tripDays.length, 7)}, 1fr)`,
          gridTemplateRows: 'auto repeat(90, minmax(0, 1fr))'
        }}
      >
        {/* Empty top-left cell */}
        <div className="col-start-1 row-start-1"></div>

        {/* Day headers */}
        {tripDays.map((dayData, index) => (
          <div key={`header-${dayData.day}`} className="col-start-[var(--col-start)] row-start-1 text-center py-2" style={{ '--col-start': index + 2 } as React.CSSProperties}>
            <p className="text-xs text-muted-foreground">{dayData.date}</p>
            <p className="text-lg font-semibold">Day {dayData.day}</p>
          </div>
        ))}

        {/* Time labels and grid lines */}
        {timeLabels.map((label, index) => {
          // Each hour is 5 rows. Start row is 2 (no all-day row).
          const rowStart = 2 + index * 5;
          return (
            <React.Fragment key={label}>
              <div 
                className="row-start-[var(--row-start)] col-start-1 text-xs text-muted-foreground text-right pr-2 -mt-2"
                style={{ gridRowStart: rowStart }}
              >
                {label}
              </div>
              <div 
                className="row-start-[var(--row-start)] border-t border-border/50"
                style={{ 
                  gridRowStart: rowStart,
                  gridColumn: `2 / span ${Math.min(tripDays.length, 7)}`
                }}
              ></div>
            </React.Fragment>
          );
        })}
        
        {/* Calendar Events */}
        {tripDays.map((dayData) => (
          dayData.activities
            ?.filter(activity => !!activity.time) // Render only activities with a specific time
            .map((activity, activityIndex) => (
              <CalendarEvent
                key={`${dayData.day}-${activityIndex}`}
                event={activity}
                day={dayData.day}
              />
            ))
        ))}
      </div>
    </div>
  );
}
