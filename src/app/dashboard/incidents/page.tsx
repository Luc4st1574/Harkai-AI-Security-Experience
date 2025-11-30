"use client";

import { useState } from "react";
import { useDashboardMetrics } from "@/hooks/use-dashboard-metrics";
import { Loader2, Search, MapPin, CalendarDays, FilterX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { IncidentsTable } from "@/components/dashboard/incidents-table";

const DISTRICTS = [
  { value: "all", label: "Todo Lima" },
  { value: "La Molina", label: "La Molina" },
  { value: "Miraflores", label: "Miraflores" },
  { value: "San Isidro", label: "San Isidro" },
  { value: "Lima", label: "Cercado de Lima" },
  { value: "Lince", label: "Lince" },
];

export default function IncidentsPage() {
  const { incidents, loading, filters } = useDashboardMetrics();
  const { district, setDistrict, timeRange, setTimeRange } = filters;

  const [searchTerm, setSearchTerm] = useState("");

  const clearFilters = () => {
    setDistrict("all");
    setTimeRange("24h");
    setSearchTerm("");
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Encabezado */}
      <div className="flex flex-col gap-4 border-b border-border pb-6">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">
              Gestión de Incidentes
            </h1>
            <p className="text-muted-foreground mt-2">
              Explora, filtra y audita los reportes ciudadanos con detalle de evidencia.
            </p>
          </div>

          {(district !== "all" || timeRange !== "24h" || searchTerm) && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearFilters}
              className="text-muted-foreground hover:text-destructive transition-colors"
            >
              <FilterX className="h-4 w-4 mr-2" />
              Limpiar filtros
            </Button>
          )}
        </div>

        {/* Barra de Herramientas */}
        <div className="flex flex-col xl:flex-row gap-4 bg-card p-4 rounded-xl border border-border shadow-sm">

          {/* Buscador */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Buscar por descripción, calle o referencia..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full h-10 pl-9 pr-4 rounded-md border border-input bg-background text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 placeholder:text-muted-foreground transition-all"
            />
          </div>

          <div className="flex flex-wrap gap-3">
            {/* Distrito */}
            <div className="relative min-w-[180px]">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
              <select
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                className="h-10 w-full pl-9 pr-4 rounded-md border border-input bg-background text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring appearance-none cursor-pointer"
              >
                {DISTRICTS.map((d) => (
                  <option key={d.value} value={d.value}>
                    {d.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Tiempo */}
            <div className="flex items-center p-1 bg-muted rounded-lg border border-border">
              <CalendarDays className="w-4 h-4 ml-3 mr-2 text-muted-foreground" />
              {(["24h", "7d", "30d", "all"] as const).map((range) => (
                <Button
                  key={range}
                  variant={timeRange === range ? "default" : "outline"}
                  size="sm"
                  onClick={() => setTimeRange(range)}
                  className={cn(
                    "h-8 text-xs font-medium capitalize transition-all",
                    timeRange === range && "bg-background shadow-sm text-foreground"
                  )}
                >
                  {range === "all" ? "Histórico" : range}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Contenido Principal */}
      {loading ? (
        <div className="flex h-[400px] items-center justify-center border border-dashed rounded-xl border-border bg-muted/5">
          <div className="flex flex-col items-center gap-3">
            <Loader2 className="h-10 w-10 animate-spin text-primary" />
            <p className="text-sm text-muted-foreground animate-pulse">Obteniendo reportes...</p>
          </div>
        </div>
      ) : (
        // <--- Aquí es donde se conecta la magia
        <IncidentsTable incidents={incidents} searchTerm={searchTerm} />
      )}
    </div>
  );
}