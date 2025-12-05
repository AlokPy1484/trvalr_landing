
'use server';

/**
 * @fileOverview A server function to check visa requirements.
 *
 * This file defines the function for determining visa requirements based on
 * a user's nationality, destination, and traveler type, using mock data.
 */

import type { TimelineStep } from '@/components/visascan/SmartTimeline';

// Define the input type for the visa check
export interface VisaCheckInput {
  nationality: string;
  destination: string;
  travelerType?: string;
}

// Define the output type for the visa check, now with added data for new modules
export interface VisaCheckOutput {
  visaStatus: 'REQUIRED' | 'NOT_REQUIRED' | 'ON_ARRIVAL';
  summary: string;
  requiredDocuments: string[];
  processingTime: string;
  cost: string;
  aiTip?: string;
  approvalChance: number; // For ApprovalGauge
  riskFactors: string[]; // For ApprovalGauge
  timeline: TimelineStep[]; // For SmartTimeline
}

// Mock data function to simulate API/AI responses
function getMockVisaData(input: VisaCheckInput): VisaCheckOutput {
  const { nationality, destination, travelerType } = input;
  const lowerDest = destination.toLowerCase();
  const lowerNat = nationality.toLowerCase();
  const lowerTraveler = travelerType?.toLowerCase();

  if (lowerDest.includes('united kingdom') && lowerNat.includes('india') && lowerTraveler === 'business') {
    return {
      visaStatus: 'REQUIRED',
      summary: 'A Standard Visitor visa is required for Indian nationals traveling to the UK for business purposes.',
      requiredDocuments: [
        'Valid Passport',
        'Proof of funds (bank statements)',
        'Details of accommodation and travel plans',
        'Invitation letter from UK-based company',
        'Biometric information (fingerprints and photo)',
      ],
      processingTime: 'Typically 3 weeks',
      cost: 'Approx. £115',
      aiTip: 'Apply well in advance and ensure your financial documents are clear and comprehensive to avoid delays.',
      approvalChance: 75,
      riskFactors: ['Invitation letter is crucial', 'Provide clear proof of funds'],
      timeline: [
        { day: 'Day 1', description: 'Submit Application Online', status: 'completed' },
        { day: 'Day 2', description: 'Biometrics Appointment', status: 'completed' },
        { day: 'Day 4', description: 'Application received at embassy', status: 'in_progress' },
        { day: 'Day 15', description: 'Expected Visa Decision', status: 'upcoming' },
      ],
    };
  }
  
  if (lowerDest.includes('vietnam')) {
    return {
      visaStatus: 'REQUIRED',
      summary: 'A visa is required for Indian nationals traveling to Vietnam as tourists.',
      requiredDocuments: [
        'Valid Passport (6 months validity)',
        'Completed Application Form',
        'Passport-sized Photos (2)',
        'Proof of Accommodation',
        'Return Flight Ticket Confirmation',
      ],
      processingTime: '5-7 business days',
      cost: 'Approx. $25 USD for e-visa',
      aiTip: 'Apply for the e-visa at least 2 weeks before your travel date to avoid any last-minute delays.',
      approvalChance: 90,
      riskFactors: ['Ensure passport has 6 months validity'],
      timeline: [
        { day: 'Day 1', description: 'Submit E-Visa Application', status: 'in_progress' },
        { day: 'Day 5', description: 'Expected E-Visa Grant', status: 'upcoming' },
      ],
    };
  }
  
  if (lowerDest.includes('japan')) {
    return {
        visaStatus: 'NOT_REQUIRED',
        summary: 'US nationals do not need a visa for short tourist stays up to 90 days.',
        requiredDocuments: ['Valid Passport'],
        processingTime: 'N/A',
        cost: 'Free',
        aiTip: 'Ensure your passport is valid for the duration of your stay. No need for a visa application!',
        approvalChance: 99,
        riskFactors: [],
        timeline: [
          { day: 'Day 1', description: 'Travel to Japan', status: 'upcoming' }
        ],
    };
  }

  // Default fallback data
  return {
    visaStatus: 'ON_ARRIVAL',
    summary: 'Visa on arrival is available for your destination.',
    requiredDocuments: [
      'Valid Passport',
      'Return Ticket',
      'Hotel Booking Confirmation',
    ],
    processingTime: 'Approx. 30-60 minutes at airport',
    cost: 'Approx. $50 USD',
    aiTip: 'Have crisp USD bills ready for payment at the visa-on-arrival counter to speed up the process.',
    approvalChance: 95,
    riskFactors: ['Ensure you have return ticket proof'],
    timeline: [
        { day: 'Day 1', description: 'Arrive at Destination', status: 'in_progress' },
        { day: 'Day 1', description: 'Receive Visa on Arrival', status: 'upcoming' },
    ],
  };
}


// Exported function to be called from the client-side component
export async function checkVisaRequirements(input: VisaCheckInput): Promise<VisaCheckOutput> {
  console.log("Using mock data for input:", input);
  return getMockVisaData(input);
}
