export type AIVoice = "male" | "female";

export interface ClinicSettings {
  clinicName: string;
  services: string;
  phone: string;
  address: string;
  city: string;
  country: string;
  website: string;
  about: string;

  workingDays: string[];
  openingTime: string;
  closingTime: string;

  aiVoice: AIVoice;
}
