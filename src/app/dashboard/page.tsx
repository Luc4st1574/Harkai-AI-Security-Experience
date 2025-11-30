"use client";

import { Button } from "@/components/ui/button";
import {
  Filter,
  Map as MapIcon,
  AlertTriangle,
  TrendingUp,
  Clock,
  MoreHorizontal,
  Loader2,
  TrendingDown,
  Minus,
} from "lucide-react";
import { useDashboardMetrics } from "@/hooks/use-dashboard-metrics";
import { INCIDENT_TYPES, INCIDENT_INDICES } from "@/lib/types";

export default function DashboardPage() {
  const { metrics, incidents, loading } = useDashboardMetrics();

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

  if (loading) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* --- Top Bar --- */}
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4 border-b border-border pb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Monitor Urbano
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            Visualización de incidentes y cálculo de riesgo en tiempo real.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Botones de filtro visuales (sin lógica compleja por ahora) */}
          <div className="flex items-center p-1 bg-muted/50 rounded-lg border border-border">
            <Button
              variant="ghost"
              size="sm"
              className="h-8 text-xs font-medium hover:bg-background shadow-sm"
            >
              24h
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 text-xs font-medium text-muted-foreground hover:text-foreground"
            >
              7d
            </Button>
          </div>
          <Button variant="outline" size="sm" className="h-9 gap-2 text-xs">
            <Filter className="h-3.5 w-3.5" />
            Filtrar
          </Button>
          <Button
            size="sm"
            className="h-9 bg-primary text-primary-foreground shadow-lg shadow-primary/20"
          >
            Exportar Reporte
          </Button>
        </div>
      </div>

      {/* --- KPIs Reales --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* KPI 1: Frecuencia (F) */}
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
            Incidentes totales activos
          </p>
        </div>

        {/* KPI 2: Recencia (R) */}
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
            Peso ponderado por antigüedad
          </p>
        </div>

        {/* KPI 3: Riesgo Calculado */}
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
            R = (0.6 × F) + (0.4 × R)
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
          {incidents.length > 0 ? (
            <div>
              <h3 className="text-sm font-bold text-foreground truncate">
                {/* Traducimos el tipo usando tu diccionario */}
                {INCIDENT_TYPES[incidents[0].type] || incidents[0].type}
              </h3>
              <p className="text-[10px] text-muted-foreground mt-1 line-clamp-2">
                {incidents[0].description}
              </p>
              <p className="text-[10px] text-primary mt-1">
                Hace unos instantes
              </p>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">
              Sin reportes recientes
            </p>
          )}
        </div>
      </div>

      {/* --- Main Content Split --- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[600px]">
        {/* Columna Izquierda: Mapa (Placeholder por ahora) */}
        <div className="lg:col-span-2 rounded-xl border border-border bg-card relative overflow-hidden flex flex-col">
          <div className="p-4 border-b border-border flex justify-between items-center bg-muted/20">
            <h3 className="font-semibold text-sm flex items-center gap-2">
              <MapIcon className="h-4 w-4 text-primary" />
              Mapa de Calor en Tiempo Real
            </h3>
            <span className="flex items-center gap-1.5 text-[10px] uppercase font-bold text-red-500 bg-red-500/10 px-2 py-1 rounded-full">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
              </span>
              Live
            </span>
          </div>
          <div className="flex-1 bg-secondary/20 relative flex items-center justify-center">
            <p className="text-muted-foreground text-sm">
              Aquí integraremos Google Maps / Mapbox
            </p>
          </div>
        </div>

        {/* Columna Derecha: Lista de Incidentes en Vivo */}
        <div className="flex flex-col gap-6">
          <div className="rounded-xl border border-border bg-card flex-1 flex flex-col overflow-hidden">
            <div className="p-4 border-b border-border flex justify-between items-center">
              <h3 className="font-semibold text-sm">Incidentes Recientes</h3>
              <MoreHorizontal className="h-4 w-4 text-muted-foreground cursor-pointer" />
            </div>
            <div className="flex-1 overflow-y-auto p-2 space-y-2">
              {incidents.map((incident) => (
                <div
                  key={incident.id}
                  className="flex items-start justify-between p-3 hover:bg-muted/50 rounded-lg transition-colors cursor-pointer border border-transparent hover:border-border"
                >
                  <div className="flex gap-3 overflow-hidden">
                    <div className="w-8 h-8 rounded-full bg-red-500/10 flex items-center justify-center shrink-0 text-red-500 font-bold text-xs">
                      {/* Primera letra del tipo */}
                      {(INCIDENT_TYPES[incident.type] || "?").charAt(0)}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">
                        {INCIDENT_TYPES[incident.type] || incident.type}
                      </p>
                      <p className="text-[10px] text-muted-foreground truncate">
                        {incident.description}
                      </p>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-[10px] text-muted-foreground">
                      {/* Formateo simple de hora */}
                      {incident.timestamp
                        ?.toDate()
                        .toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                    </p>
                  </div>
                </div>
              ))}
              {incidents.length === 0 && (
                <p className="text-center text-sm text-muted-foreground py-10">
                  No hay incidentes reportados.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
