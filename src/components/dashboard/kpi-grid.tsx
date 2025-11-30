"use client";

import {
  AlertTriangle,
  Clock,
  TrendingUp,
  TrendingDown,
  Minus,
  Map as MapIcon,
} from "lucide-react";
import { HeatPoints } from "@/lib/types";
import { useConfig } from "@/lib/config/config-context";

interface KpiGridProps {
  metrics: {
    frequency: number;
    recency: string;
    risk: number;
    trend: string;
  };
  incidents: HeatPoints[];
  districtName: string;
}

export function KpiGrid({ metrics, incidents, districtName }: KpiGridProps) {
  const { incidentMap } = useConfig();

  const TrendIcon =
    metrics.trend === "up"
      ? TrendingUp
      : metrics.trend === "down"
      ? TrendingDown
      : Minus;

  const trendColor =
    metrics.trend === "up"
      ? "text-red-500"
      : metrics.trend === "down"
      ? "text-green-500"
      : "text-yellow-500";

  const recentIncident = incidents[0];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* KPI 1: Frecuencia */}
      <div className="p-5 rounded-xl border border-border bg-card shadow-sm hover:border-primary/50 transition-colors group">
        <div className="flex justify-between items-start mb-2">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            Frecuencia (F)
          </p>
          <AlertTriangle className="h-4 w-4 text-orange-500" />
        </div>
        <div className="flex items-baseline gap-2">
          <h3 className="text-2xl font-bold text-foreground">
            {metrics.frequency}
          </h3>
          <span
            className={`text-xs font-medium ${trendColor} flex items-center`}
          >
            <TrendIcon className="h-3 w-3 ml-0.5" />
          </span>
        </div>
        <p className="text-xs text-muted-foreground mt-1">
          Incidentes en {districtName === "all" ? "Lima" : districtName}
        </p>
      </div>

      {/* KPI 2: Recencia */}
      <div className="p-5 rounded-xl border border-border bg-card shadow-sm hover:border-primary/50 transition-colors group">
        <div className="flex justify-between items-start mb-2">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            Recencia (R)
          </p>
          <Clock className="h-4 w-4 text-blue-500" />
        </div>
        <div className="flex items-baseline gap-2">
          <h3 className="text-2xl font-bold text-foreground">
            {metrics.recency}
          </h3>
          <span className="text-xs font-medium text-muted-foreground">
            Score (0-1.0)
          </span>
        </div>
        <p className="text-xs text-muted-foreground mt-1">
          Ponderado por antigüedad
        </p>
      </div>

      {/* KPI 3: Riesgo Global */}
      <div className="p-5 rounded-xl border border-primary/20 bg-primary/5 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 p-3 opacity-10">
          <AlertTriangle className="h-12 w-12 text-primary" />
        </div>
        <div className="flex justify-between items-start mb-2 relative z-10">
          <p className="text-xs font-bold text-primary uppercase tracking-wider">
            Riesgo Global
          </p>
        </div>
        <div className="flex items-baseline gap-2 relative z-10">
          <h3 className="text-3xl font-extrabold text-foreground">
            {metrics.risk}/100
          </h3>
        </div>
        <p className="text-[10px] text-muted-foreground mt-2 relative z-10 font-mono">
          R = (0.6 x F) + (0.4 x R)
        </p>
      </div>

      {/* KPI 4: Último Incidente */}
      <div className="p-5 rounded-xl border border-border bg-card shadow-sm hover:border-primary/50 transition-colors group">
        <div className="flex justify-between items-start mb-2">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            Reciente
          </p>
          <MapIcon className="h-4 w-4 text-purple-500" />
        </div>
        {recentIncident ? (
          <div>
            <div className="flex justify-between items-start">
              <h3 className="text-sm font-bold text-foreground truncate">
                {incidentMap[recentIncident.type] ||
                  `Tipo ${recentIncident.type}`}
              </h3>
            </div>

            <p className="text-[10px] text-muted-foreground mt-1 line-clamp-2">
              {recentIncident.description}
            </p>

            {recentIncident.district && (
              <div className="mt-2">
                <span className="text-[9px] bg-secondary px-1.5 py-0.5 rounded text-muted-foreground border border-border">
                  {recentIncident.district}
                </span>
              </div>
            )}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">
            Sin reportes recientes
          </p>
        )}
      </div>
    </div>
  );
}
