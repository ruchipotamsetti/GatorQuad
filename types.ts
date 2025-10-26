
export interface Specialist {
  id: number;
  name: string;
  specialty: string;
  photo: string;
  bio: string;
  location: { latitude: number; longitude: number; address: string; };
  acceptedInsurance: string[];
  expertise: string[];
  urgentAvailability: string | null;
}

export interface Message {
  sender: 'user' | 'ai';
  text: string;
}

export interface UrgentCareCenter {

  id: number;

  name: string;

  location: { latitude: number; longitude: number; address: string; };

  hours: string;

}



export interface PatientRequest {

  id: number;

    patient: {

      name: string;

      age: number;

      gender: string;

      insurance: string;

    };

  symptoms: string;

  conversation: Message[];

  triageResult: TriageResult;

  status: 'Pending' | 'Approved';

  requestDate: string;

  doctorId: number;

}



export interface Doctor {

  id: number;

  name: string;

  username: string;

  password; // In a real app, this would be a hash

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
