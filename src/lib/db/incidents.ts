import {
  collection,
  query,
  orderBy,
  onSnapshot,
  addDoc,
  Timestamp,
  QueryConstraint,
  where,
  doc,
  getDoc,
} from "firebase/firestore";
import { db } from "@/lib/firebase/config";
import { HeatPoints } from "@/lib/types";

const COLLECTION_NAME = "HeatPoints";

export interface IncidentFilters {
  startDate?: Date;
  types?: number[];
  district?: string;
}

export function subscribeToHeatPoints(
  callback: (data: HeatPoints[]) => void,
  filters?: IncidentFilters
) {
  const collectionRef = collection(db, COLLECTION_NAME);

  const constraints: QueryConstraint[] = [];

  if (filters?.startDate) {
    constraints.push(
      where("timestamp", ">=", Timestamp.fromDate(filters.startDate))
    );
  }

  if (filters?.types && filters.types.length > 0) {
    constraints.push(where("type", "in", filters.types));
  }

  if (filters?.district && filters.district !== "all") {
    constraints.push(where("district", "==", filters.district));
  }

  constraints.push(orderBy("timestamp", "desc"));

  const q = query(collectionRef, ...constraints);

  const unsubscribe = onSnapshot(
    q,
    (snapshot) => {
      const points: HeatPoints[] = [];

      snapshot.forEach((doc) => {
        points.push({
          id: doc.id,
          ...doc.data(),
        } as HeatPoints);
      });

      callback(points);
    },
    (error) => {
      console.error("Error escuchando HeatPoints:", error);
    }
  );

  return unsubscribe;
}

/**
 * Función auxiliar para crear datos de prueba (Mocking)
 * Úsala solo para poblar tu base de datos inicialmente.
 */
export async function createMockIncident(userId: string) {
  try {
    const lat = -12.0464 + (Math.random() - 0.5) * 0.02;
    const lng = -77.0428 + (Math.random() - 0.5) * 0.02;

    const types: number[] = [1, 2, 4];
    const randomType = types[Math.floor(Math.random() * types.length)];

    const districts = [
      "La Molina",
      "Miraflores",
      "San Isidro",
      "Lima",
      "Lince",
    ];
    const randomDistrict =
      districts[Math.floor(Math.random() * districts.length)];

    const newPoint: Omit<HeatPoints, "id"> = {
      userId,
      type: randomType,
      description: "Reporte de prueba generado automáticamente",
      imageUrl: "",
      isVisible: true,
      latitude: lat,
      longitude: lng,
      timestamp: Timestamp.now(),
      district: randomDistrict,
      city: "Lima",
      country: "Peru",
    };

    await addDoc(collection(db, COLLECTION_NAME), newPoint);
    console.log(`Incidente tipo '${randomType}' creado en ${randomDistrict}.`);
  } catch (error) {
    console.error("Error creando mock:", error);
  }
}

export async function getIncidentById(id: string): Promise<HeatPoints | null> {
  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return {
        id: docSnap.id,
        ...docSnap.data(),
      } as HeatPoints;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error obteniendo incidente:", error);
    return null;
  }
}
