"use client";

import dynamic from "next/dynamic";
import { Loader2, Map as MapIcon } from "lucide-react";
import { useDashboardMetrics } from "@/hooks/use-dashboard-metrics";
import { DashboardHeader } from "@/components/dashboard/header";
import { KpiGrid } from "@/components/dashboard/kpi-grid";
import { IncidentList } from "@/components/dashboard/incident-list";

const IncidentMap = dynamic(
  () => import("@/components/dashboard/incident-map"),
  {
    loading: () => (
      <div className="h-full w-full flex items-center justify-center bg-muted/20 animate-pulse rounded-xl">
        <div className="flex flex-col items-center gap-2 text-muted-foreground">
          <Loader2 className="h-8 w-8 animate-spin" />
          <p className="text-xs">Cargando cartografía...</p>
        </div>
      </div>
    ),
    ssr: false,
  }
);

export default function DashboardPage() {
  const { metrics, incidents, loading, filters } = useDashboardMetrics();

  if (loading) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <DashboardHeader
        district={filters.district}
        setDistrict={filters.setDistrict}
        timeRange={filters.timeRange}
        setTimeRange={filters.setTimeRange}
      />

      <KpiGrid
        metrics={metrics}
        incidents={incidents}
        districtName={filters.district}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[600px]">
        <div className="lg:col-span-2 rounded-xl border border-border bg-card relative overflow-hidden flex flex-col h-full shadow-sm">
          <div className="absolute top-4 left-14 z-[400] bg-background/90 backdrop-blur-sm border border-border/50 px-3 py-1.5 rounded-full shadow-lg flex items-center gap-2 pointer-events-none">
            <div className="flex items-center gap-1.5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              <span className="text-[10px] font-semibold text-foreground uppercase tracking-wider">
                En Vivo
              </span>
            </div>
          </div>

          <div className="flex-1 relative z-0">
            <IncidentMap incidents={incidents} />
          </div>
        </div>

        <IncidentList incidents={incidents} />
      </div>
    </div>
  );
}
