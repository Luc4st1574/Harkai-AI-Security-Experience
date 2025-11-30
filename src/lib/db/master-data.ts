// src/lib/db/master-data.ts
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "@/lib/firebase/config";

export interface IncidentTypeDoc {
  id: string;
  name: string;
  label: string;
}

export type IncidentTypeMap = Record<string, string>;

export async function getIncidentTypes() {
  try {
    const q = query(collection(db, "incident_types"), orderBy("id"));
    const snapshot = await getDocs(q);

    const list: IncidentTypeDoc[] = [];
    const map: IncidentTypeMap = {};

    snapshot.forEach((doc) => {
      const data = doc.data();
      const id = doc.id;
      const name = data.name as string;

      const label = data.label || name.charAt(0).toUpperCase() + name.slice(1);

      list.push({ id, name, label });

      map[id] = label;
    });

    return { list, map };
  } catch (error) {
    console.error("Error obteniendo tipos de incidentes:", error);
    return { list: [], map: {} };
  }
}
