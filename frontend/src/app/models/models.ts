export interface ContactForm {
  name: string;
  company: string;
  email: string;
  service: string;
  message: string;
}

export interface ContactResponse {
  success: boolean;
  message?: string;
  error?: string;
}

export interface Service {
  icon: string;
  titleEs: string;
  titleEn: string;
  descEs: string;
  descEn: string;
}

export interface WhyItem {
  icon: string;
  titleEs: string;
  titleEn: string;
  descEs: string;
  descEn: string;
}

export interface Location {
  flag: string;
  country: string;
  city: string;
  timezone: string;
  descEs: string;
  descEn: string;
}
