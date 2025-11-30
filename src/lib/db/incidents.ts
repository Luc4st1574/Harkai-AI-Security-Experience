import {
  collection,
  query,
  orderBy,
  onSnapshot,
  addDoc,
  Timestamp,
  QueryConstraint,
  where,
} from "firebase/firestore";
import { db } from "@/lib/firebase/config";
import { HeatPoints, IncidentType } from "@/lib/types";

const COLLECTION_NAME = "HeatPoints";

export interface IncidentFilters {
  startDate?: Date;
  types?: number[];
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

    const newPoint: Omit<HeatPoints, "id"> = {
      userId,
      type: randomType,
      description: "Reporte de prueba generado automáticamente",
      imageUrl: "",
      isVisible: true,
      latitude: lat,
      longitude: lng,
      timestamp: Timestamp.now(),
    };

    await addDoc(collection(db, COLLECTION_NAME), newPoint);
    console.log(`Incidente tipo '${randomType}' creado correctamente.`);
  } catch (error) {
    console.error("Error creando mock:", error);
  }
}
