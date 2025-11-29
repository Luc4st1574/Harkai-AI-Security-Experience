import { type Timestamp } from "firebase/firestore";

export type HeatPoints = {
  description: string;
  imageUrl: string;
  isVisible: boolean;
  latitude: number;
  longitude: number;
  timestamp: Timestamp;
  type: string;
  userId: string;
};

export type Numbers = {
  City: string;
  FireFighters: string;
  Police: string;
  Serenity: string;
  Shelter: string;
}
