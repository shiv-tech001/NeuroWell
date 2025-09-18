export interface Counselor {
  id: string;
  name: string;
  specialty: string;
  rating: number;
  reviewCount: number;
  quote: string;
  avatarUrl: string;
  hourlyRate: number;
  nextAvailable: string;
  experience?: number; // in years
  languages?: string[];
  availableSlots?: string[];
  education?: {
    degree: string;
    university: string;
    year: number;
  }[];
  about?: string;
  treatmentApproach?: string;
  specialties?: string[];
}
