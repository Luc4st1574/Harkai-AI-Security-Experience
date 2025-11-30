import { type Timestamp } from "firebase/firestore";

export type HeatPoints = {
  id?: string;
  description: string;
  imageUrl: string;
  isVisible: boolean;
  latitude: number;
  longitude: number;
  timestamp: Timestamp;
  type: number;
  userId: string;
  city?: string;
  country?: string;
  district?: string;
};

export type IncidentType = {
  id: string;
  name: string;
  label: string;
}

export type Numbers = {
  City: string;
  FireFighters: string;
  Police: string;
  Serenity: string;
  Shelter: string;
};
