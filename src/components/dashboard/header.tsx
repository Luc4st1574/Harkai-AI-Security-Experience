"use client";

import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";

// Definimos la interfaz de props para tipado estricto
interface DashboardHeaderProps {
  district: string;
  setDistrict: (value: string) => void;
  timeRange: string;
  setTimeRange: (value: "24h" | "7d" | "30d" | "all") => void;
}

const DISTRICTS = [
  { value: "all", label: "Todo Lima" },
  { value: "La Molina", label: "La Molina" },
  { value: "Miraflores", label: "Miraflores" },
  { value: "San Isidro", label: "San Isidro" },
  { value: "Lima", label: "Cercado de Lima" },
  { value: "Lince", label: "Lince" },
];

export function DashboardHeader({
  district,
  setDistrict,
  timeRange,
  setTimeRange,
}: DashboardHeaderProps) {
  return (
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
        {/* Selector de Distrito */}
        <div className="relative">
          <MapPin className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <select
            value={district}
            onChange={(e) => setDistrict(e.target.value)}
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
          {(["24h", "7d", "30d"] as const).map((range) => (
            <Button
              key={range}
              variant={timeRange === range ? "secondary" : "ghost"}
              size="sm"
              onClick={() => setTimeRange(range)}
              className="h-8 text-xs font-medium capitalize"
            >
              {range}
            </Button>
          ))}
        </div>

        <Button
          size="sm"
          className="h-9 bg-primary text-primary-foreground shadow-lg shadow-primary/20"
        >
          Exportar Reporte
        </Button>
      </div>
    </div>
  );
}
