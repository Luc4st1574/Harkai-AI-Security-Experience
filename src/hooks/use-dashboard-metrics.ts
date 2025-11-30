// src/hooks/use-dashboard-metrics.ts
import { useEffect, useState } from "react";
import { subscribeToHeatPoints } from "@/lib/db/incidents";
import { HeatPoints } from "@/lib/types";

export function useDashboardMetrics() {
  const [incidents, setIncidents] = useState<HeatPoints[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = subscribeToHeatPoints((data) => {
      setIncidents(data);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const frequency = incidents.length;

  const calculateRecencyScore = () => {
    if (frequency === 0) return 0;

    const now = new Date().getTime();
    let totalWeight = 0;

    incidents.forEach((inc) => {
      const incidentTime = inc.timestamp.toDate().getTime();
      const diffHours = (now - incidentTime) / (1000 * 60 * 60);

      if (diffHours <= 24) {
        totalWeight += 1.0;
      } else if (diffHours <= 24 * 7) {
        totalWeight += 0.7;
      } else {
        totalWeight += 0.4;
      }
    });

    return totalWeight / frequency;
  };

  const recencyScore = calculateRecencyScore();

  // 3. Riesgo Global (Risk Score)
  // Fórmula base: R = (0.6 * F) + (0.4 * R_score)
  // Ajuste para Dashboard: Normalizamos para tener un puntaje sobre 100.
  // Asumimos un "Techo de Frecuencia" de 50 incidentes para el 100% (ajustable)
  const MAX_EXPECTED_INCIDENTS = 20; 
  
  // Normalizamos Frecuencia (0 a 100)
  const normalizedFrequency = Math.min((frequency / MAX_EXPECTED_INCIDENTS) * 100, 100);
  
  // Normalizamos Recencia (ya viene 0-1, lo pasamos a 0-100)
  const normalizedRecency = recencyScore * 100;

  // Aplicamos los pesos de la fórmula: 60% Frecuencia + 40% Recencia
  const riskScore = Math.round((0.6 * normalizedFrequency) + (0.4 * normalizedRecency));

  // 4. Cálculo de Tendencia (Comparativa simple con un "ayer" simulado)
  // En producción real, esto requeriría consultar datos históricos. 
  // Por ahora, simulamos si el riesgo es alto (>50).
  const trend = riskScore > 50 ? "up" : "stable";

  return {
    incidents, // Data cruda para listas o mapas
    metrics: {
      frequency,
      recency: recencyScore.toFixed(2), // Formato "0.85"
      risk: riskScore, // Formato entero "72"
      trend,
    },
    loading,
  };
}