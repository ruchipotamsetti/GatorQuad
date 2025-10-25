
export interface Specialist {
  id: number;
  name: string;
  specialty: string;
  location: {
    latitude: number;
    longitude: number;
    address: string;
  };
  acceptedInsurance: string[];
  expertise: string[];
  urgentAvailability: string | null; // ISO date string "YYYY-MM-DD"
}

export interface Message {
  sender: 'user' | 'ai';
  text: string;
}

export interface UrgentCareCenter {
  id: number;
  name: string;
  location: {
    latitude: number;
    longitude: number;
    address: string;
  };
  hours: string;
}

export enum Urgency {
  EMERGENCY = "EMERGENCY",
  URGENT = "URGENT",
  ROUTINE = "ROUTINE",
}

export interface TriageResult {
  urgency: Urgency;
  specialist: string | null;
  keywords: string[];
}

export interface RankedSpecialist extends Specialist {
  distance: number;
  matchScore: number;
}
