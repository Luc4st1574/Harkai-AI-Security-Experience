"use client";

import { useDashboardMetrics } from "@/hooks/use-dashboard-metrics";
import { Loader2, Download, CalendarDays } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnalyticsCharts } from "@/components/dashboard/analytics-charts";
import { cn } from "@/lib/utils";
import { useConfig } from "@/lib/config/config-context";
import { downloadIncidentsExcel } from "@/lib/excel-export";

export default function AnalyticsPage() {
  const { incidents, loading, filters } = useDashboardMetrics();
  const { timeRange, setTimeRange } = filters;
  const { incidentMap } = useConfig();

  const handleExport = () => {
    if (incidents.length === 0) return;
    downloadIncidentsExcel(incidents, incidentMap, `Reporte_Harkai_${timeRange}`);
  };

  if (loading) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-4 border-b border-border pb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Reportes Avanzados
          </h1>
          <p className="text-muted-foreground mt-2">
            Análisis detallado de incidentes, tendencias y zonas de riesgo.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 items-center w-full xl:w-auto">
          <div className="flex items-center p-1 bg-muted/50 rounded-lg border border-border">
            <CalendarDays className="w-4 h-4 ml-3 mr-2 text-muted-foreground" />
            {(["24h", "7d", "30d", "all"] as const).map((range) => (
              <Button
                key={range}
                variant={timeRange === range ? "secondary" : "ghost"}
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

          <div className="h-4 w-px bg-border hidden sm:block" />

          <Button
            variant="outline"
            className="gap-2 w-full sm:w-auto hover:bg-green-50 hover:text-green-700 hover:border-green-200 dark:hover:bg-green-900/20 dark:hover:text-green-400 transition-all"
            onClick={handleExport}
            disabled={incidents.length === 0}
          >
            <Download className="h-4 w-4" />
            Exportar a Excel
          </Button>
        </div>
      </div>

      <AnalyticsCharts incidents={incidents} />

      <div className="rounded-xl border border-border bg-card p-6">
        <h3 className="font-semibold mb-4">Resumen de Datos Cargados</h3>
        <p className="text-sm text-muted-foreground">
          Total de incidentes analizados en el periodo
          <span className="font-bold text-primary mx-1">
            {timeRange === "all" ? "Histórico" : timeRange}
          </span>:
          <span className="font-mono text-foreground font-medium ml-1 text-lg">
            {incidents.length}
          </span>
        </p>
      </div>
    </div>
  );
}