import { type Timestamp } from "firebase/firestore";

export type HeatPoints = {
  id?: string;
  description: string;
  imageUrl: string;
  isVisible: boolean;
  latitude: number;
  longitude: number;
  timestamp: Timestamp;
  type: string;
  userId: string;
};

export const INCIDENT_TYPES = {
  pet: "Mascotas",
  theft: "Robo",
  fire: "Incendio",
  emergency: "Emergencia",
  event: "Evento",
  crash: "Accidente",
  place: "Lugar Pagado",
  other: "Otro",
} as const;

export type IncidentType = keyof typeof INCIDENT_TYPES;

export const INCIDENT_INDICES: Record<number, IncidentType> = {
  0: "pet",
  1: "theft",
  2: "fire",
  3: "emergency",
  4: "event",
  5: "crash",
  6: "place",
};

export type Numbers = {
  City: string;
  FireFighters: string;
  Police: string;
  Serenity: string;
  Shelter: string;
};
