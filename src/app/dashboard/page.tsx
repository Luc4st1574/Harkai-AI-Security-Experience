"use client";

import { Button } from "@/components/ui/button";
import {
  Map as MapIcon,
  AlertTriangle,
  TrendingUp,
  Clock,
  MoreHorizontal,
  Loader2,
  TrendingDown,
  Minus,
  MapPin, // Nuevo icono para el distrito
} from "lucide-react";
import { useDashboardMetrics } from "@/hooks/use-dashboard-metrics";
import { useConfig } from "@/lib/config/config-context";

// Distritos disponibles (Idealmente esto vendría de una colección 'districts' en Firebase)
const DISTRICTS = [
  { value: "all", label: "Todo Lima" },
  { value: "La Molina", label: "La Molina" },
  { value: "Miraflores", label: "Miraflores" },
  { value: "San Isidro", label: "San Isidro" },
  { value: "Lima", label: "Cercado de Lima" },
  { value: "Lince", label: "Lince" },
];

export default function DashboardPage() {
  const { metrics, incidents, loading, filters } = useDashboardMetrics();
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
          {/* Selector de Distrito (NUEVO) */}
          <div className="relative">
            <MapPin className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <select
              value={filters.district}
              onChange={(e) => filters.setDistrict(e.target.value)}
              className="h-9 pl-9 pr-4 rounded-md border border-input bg-background text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 w-[180px] appearance-none cursor-pointer"
            >
              {DISTRICTS.map((d) => (
                <option key={d.value} value={d.value}>
                  {d.label}
                </option>
              ))}
            </select>
          </div>

          {/* Filtros de Tiempo */}
          <div className="flex items-center p-1 bg-muted/50 rounded-lg border border-border">
            <Button
              variant={filters.timeRange === "24h" ? "secondary" : "ghost"}
              size="sm"
              onClick={() => filters.setTimeRange("24h")}
              className="h-8 text-xs font-medium shadow-sm"
            >
              24h
            </Button>
            <Button
              variant={filters.timeRange === "7d" ? "secondary" : "ghost"}
              size="sm"
              onClick={() => filters.setTimeRange("7d")}
              className="h-8 text-xs font-medium"
            >
              7d
            </Button>
            <Button
              variant={filters.timeRange === "30d" ? "secondary" : "ghost"}
              size="sm"
              onClick={() => filters.setTimeRange("30d")}
              className="h-8 text-xs font-medium"
            >
              30d
            </Button>
          </div>

          <Button
            size="sm"
            className="h-9 bg-primary text-primary-foreground shadow-lg shadow-primary/20"
          >
            Exportar Reporte
          </Button>
        </div>
      </div>

      {/* --- KPIs --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* KPI 1 */}
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
            Incidentes activos en{" "}
            {filters.district === "all" ? "Lima" : filters.district}
          </p>
        </div>

        {/* KPI 2 */}
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

        {/* KPI 3 */}
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
          {incidents.length > 0 ? (
            <div>
              <h3 className="text-sm font-bold text-foreground truncate">
                {incidentMap[incidents[0].type] || `Tipo ${incidents[0].type}`}
              </h3>
              <p className="text-[10px] text-muted-foreground mt-1 line-clamp-2">
                {incidents[0].description}
              </p>
              <div className="flex justify-between items-center mt-1">
                {incidents[0].district && (
                  <span className="text-[9px] bg-secondary px-1.5 py-0.5 rounded text-muted-foreground">
                    {incidents[0].district}
                  </span>
                )}
              </div>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">
              Sin reportes recientes
            </p>
          )}
        </div>
      </div>

      {/* --- Main Content --- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[600px]">
        {/* Mapa */}
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

        {/* Lista de Incidentes */}
        <div className="flex flex-col gap-6">
          <div className="rounded-xl border border-border bg-card flex-1 flex flex-col overflow-hidden">
            <div className="p-4 border-b border-border flex justify-between items-center">
              <h3 className="font-semibold text-sm">Incidentes del periodo</h3>
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
                      {/* Letra inicial desde el mapa o ID */}
                      {(incidentMap[incident.type] || "?").charAt(0)}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">
                        {incidentMap[incident.type] || "Desconocido"}
                      </p>
                      <p className="text-[10px] text-muted-foreground truncate">
                        {incident.description}
                      </p>
                      {incident.district && (
                        <p className="text-[9px] text-muted-foreground mt-0.5">
                          📍 {incident.district}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-[10px] text-muted-foreground">
                      {incident.timestamp?.toDate().toLocaleDateString([], {
                        day: "2-digit",
                        month: "2-digit",
                        year: "2-digit",
                      })}
                      {" "}
                      {incident.timestamp?.toDate().toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </div>
              ))}
              {incidents.length === 0 && (
                <div className="flex flex-col items-center justify-center h-full text-center p-4 space-y-2">
                  <p className="text-sm text-muted-foreground">
                    No hay incidentes reportados en esta zona.
                  </p>
                  <p className="text-xs text-muted-foreground/50">
                    Intenta cambiar el filtro de distrito o tiempo.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
