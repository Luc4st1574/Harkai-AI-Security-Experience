// src/hooks/use-dashboard-metrics.ts
import { useEffect, useState, useMemo } from "react";
import { subscribeToHeatPoints } from "@/lib/db/incidents";
import { HeatPoints, IncidentType } from "@/lib/types";

export type TimeRange = "24h" | "7d" | "30d" | "all";

const RISK_THRESHOLDS: Record<TimeRange, number> = {
  "24h": 10,
  "7d": 70,
  "30d": 300,
  all: 1000,
};

export function useDashboardMetrics() {
  const [incidents, setIncidents] = useState<HeatPoints[]>([]);
  const [loading, setLoading] = useState(true);

  const [timeRange, setTimeRange] = useState<TimeRange>("24h");
  const [selectedTypes, setSelectedTypes] = useState<IncidentType[]>([]);

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
      }
    );

    return () => unsubscribe();
  }, [timeRange, selectedTypes]);

  const frequency = incidents.length;

  const calculateRecencyScore = () => {
    if (frequency === 0) return 0;

    const now = new Date().getTime();
    let totalWeight = 0;

    incidents.forEach((inc) => {
      const incidentTime = inc.timestamp.toDate().getTime();
      const diffHours = (now - incidentTime) / (1000 * 60 * 60);

      if (diffHours <= 24) totalWeight += 1.0;
      else if (diffHours <= 168) totalWeight += 0.7;
      else totalWeight += 0.4;
    });

    return totalWeight / frequency;
  };

  const recencyScore = calculateRecencyScore();

  const currentMaxThreshold = RISK_THRESHOLDS[timeRange];

  const normalizedFrequency = Math.min(
    (frequency / currentMaxThreshold) * 100,
    100
  );
  const normalizedRecency = recencyScore * 100;

  const riskScore = Math.round(
    0.6 * normalizedFrequency + 0.4 * normalizedRecency
  );

  const trend = riskScore > 50 ? "up" : "stable";

  return {
    incidents,
    metrics: {
      frequency,
      recency: recencyScore.toFixed(2),
      risk: riskScore,
      trend,
    },
    filters: {
      timeRange,
      setTimeRange,
      selectedTypes,
      setSelectedTypes,
    },
    loading,
  };
}
