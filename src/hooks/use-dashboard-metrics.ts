// src/hooks/use-dashboard-metrics.ts
import { useEffect, useState, useMemo } from "react";
import { subscribeToHeatPoints } from "@/lib/db/incidents";
import { HeatPoints } from "@/lib/types";

export type TimeRange = "24h" | "7d" | "30d" | "all";

const RISK_THRESHOLDS: Record<TimeRange, number> = {
  "24h": 10,
  "7d": 70,
  "30d": 300,
  all: 1000,
};

const DEFAULT_FILTER_IDS = [1, 2, 4];

// Mapa de pesos de riesgo específico
const RISK_WEIGHTS: Record<number, number> = {
  1: 0.4, // Crash vale menos riesgo
};

export function useDashboardMetrics() {
  const [incidents, setIncidents] = useState<HeatPoints[]>([]);
  const [loading, setLoading] = useState(true);

  const [timeRange, setTimeRange] = useState<TimeRange>("24h");
  const [selectedTypes, setSelectedTypes] =
    useState<number[]>(DEFAULT_FILTER_IDS);

  const [district, setDistrict] = useState<string>("all");

  useEffect(() => {
    setLoading(true);

    let startDate: Date | undefined = undefined;
    const now = new Date();

    if (timeRange === "24h") {
      startDate = new Date(now.getTime() - 24 * 60 * 60 * 1000);
    } else if (timeRange === "7d") {
      startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    } else if (timeRange === "30d") {
      startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    }

    const unsubscribe = subscribeToHeatPoints(
      (data) => {
        setIncidents(data);
        setLoading(false);
      },
      {
        startDate,
        types: selectedTypes,
        district,
      }
    );

    return () => unsubscribe();
  }, [timeRange, selectedTypes, district]);

  const metrics = useMemo(() => {
    const frequency = incidents.length;

    if (frequency === 0) {
      return { frequency: 0, recency: "0.00", risk: 0, trend: "stable" };
    }

    const now = new Date().getTime();
    let totalRecencyWeight = 0;
    let weightedFrequency = 0;

    incidents.forEach((inc) => {
      const weight = RISK_WEIGHTS[inc.type] ?? 1.0;
      weightedFrequency += weight;

      const incidentTime = inc.timestamp.toDate().getTime();
      const diffHours = (now - incidentTime) / (1000 * 60 * 60);

      if (diffHours <= 24) totalRecencyWeight += 1.0;
      else if (diffHours <= 168) totalRecencyWeight += 0.7;
      else totalRecencyWeight += 0.4;
    });

    const recencyScore = totalRecencyWeight / frequency;
    const currentMaxThreshold = RISK_THRESHOLDS[timeRange];

    const normalizedFrequency = Math.min(
      (weightedFrequency / currentMaxThreshold) * 100,
      100
    );
    const normalizedRecency = recencyScore * 100;

    const riskScore = Math.round(
      0.6 * normalizedFrequency + 0.4 * normalizedRecency
    );

    const trend = riskScore > 50 ? "up" : "stable";

    return {
      frequency,
      recency: recencyScore.toFixed(2),
      risk: riskScore,
      trend,
    };
  }, [incidents, timeRange]);

  return {
    incidents,
    metrics,
    filters: {
      timeRange,
      setTimeRange,
      selectedTypes,
      setSelectedTypes,
      district,
      setDistrict,
    },
    loading,
  };
}
