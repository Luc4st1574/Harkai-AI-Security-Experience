import { Button } from "@/components/ui/button";
import {
  Filter,
  Map as MapIcon,
  AlertTriangle,
  TrendingUp,
  Clock,
  MoreHorizontal,
} from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
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
          {/* Filtros de Tiempo (PDF: Última hora / 24h / 7 días) */}
          <div className="flex items-center p-1 bg-muted/50 rounded-lg border border-border">
            <Button
              variant="ghost"
              size="sm"
              className="h-8 text-xs font-medium hover:bg-background shadow-sm"
            >
              1h
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 text-xs font-medium text-muted-foreground hover:text-foreground"
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
            Tipo de Incidente
          </Button>

          <Button variant="outline" size="sm" className="h-9 gap-2 text-xs">
            <MapIcon className="h-3.5 w-3.5" />
            Distrito / Barrio
          </Button>

          <div className="h-6 w-px bg-border mx-1" />

          <Button
            size="sm"
            className="h-9 bg-primary text-primary-foreground shadow-lg shadow-primary/20"
          >
            Exportar Reporte
          </Button>
        </div>
      </div>

      {/* --- KPIs basados en Lógica de Negocio (PDF Pag 2 - Riesgo) --- */}
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
            <h3 className="text-2xl font-bold text-foreground">127</h3>
            <span className="text-xs font-medium text-red-500 flex items-center">
              +12% <TrendingUp className="h-3 w-3 ml-0.5" />
            </span>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Incidentes reportados (Radio 500m)
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
            <h3 className="text-2xl font-bold text-foreground">0.85</h3>
            <span className="text-xs font-medium text-muted-foreground">
              Score (0-1.0)
            </span>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Peso ponderado (últimas 24h dominantes)
          </p>
        </div>

        {/* KPI 3: Riesgo Normalizado (La Fórmula) */}
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
            <h3 className="text-3xl font-extrabold text-foreground">72/100</h3>
          </div>
          <p className="text-[10px] text-muted-foreground mt-2 relative z-10 font-mono">
            R = (0.6 × F) + (0.4 × R)
          </p>
        </div>

        {/* KPI 4: Zonas Calientes */}
        <div className="p-5 rounded-xl border border-border bg-card shadow-sm hover:border-primary/50 transition-colors group">
          <div className="flex justify-between items-start mb-2">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Zonas Heatmap
            </p>
            <MapIcon className="h-4 w-4 text-purple-500" />
          </div>
          <div className="flex items-baseline gap-2">
            <h3 className="text-2xl font-bold text-foreground">3</h3>
            <span className="text-xs font-medium text-muted-foreground">
              Concentraciones Altas
            </span>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Requieren atención inmediata
          </p>
        </div>
      </div>

      {/* --- Main Content Split: Mapa & Ranking --- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[600px]">
        {/* Columna Izquierda: Mapa Interactivo (2/3) */}
        <div className="lg:col-span-2 rounded-xl border border-border bg-card relative overflow-hidden flex flex-col">
          <div className="p-4 border-b border-border flex justify-between items-center bg-muted/20">
            <h3 className="font-semibold text-sm flex items-center gap-2">
              <MapIcon className="h-4 w-4 text-primary" />
              Mapa de Calor en Tiempo Real
            </h3>
            <div className="flex gap-2">
              <span className="flex items-center gap-1.5 text-[10px] uppercase font-bold text-red-500 bg-red-500/10 px-2 py-1 rounded-full">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                </span>
                Live Updates
              </span>
            </div>
          </div>

          {/* Placeholder del Mapa */}
          <div className="flex-1 bg-secondary/20 relative group cursor-crosshair">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-2">
                  Visualización del Mapa (Google Maps / Mapbox)
                </p>
                <Button variant="outline" size="sm" className="text-xs">
                  Activar Capa de Riesgo
                </Button>
              </div>
            </div>
            {/* Simulación de un punto caliente */}
            <div className="absolute top-1/3 left-1/4 w-24 h-24 bg-red-500/20 rounded-full blur-xl animate-pulse"></div>
            <div className="absolute top-1/3 left-1/4 w-4 h-4 bg-red-500 border-2 border-white rounded-full shadow-lg"></div>
          </div>
        </div>

        {/* Columna Derecha: Ranking y Timeline (1/3) */}
        <div className="flex flex-col gap-6">
          {/* Ranking de Zonas Críticas (PDF Pag 1) */}
          <div className="rounded-xl border border-border bg-card flex-1 flex flex-col">
            <div className="p-4 border-b border-border flex justify-between items-center">
              <h3 className="font-semibold text-sm">
                Ranking de Zonas Críticas
              </h3>
              <MoreHorizontal className="h-4 w-4 text-muted-foreground cursor-pointer" />
            </div>
            <div className="p-2 flex-1 overflow-y-auto">
              {[
                { name: "Av. Arequipa, Lince", score: 92, trend: "up" },
                { name: "Jr. de la Unión, Centro", score: 88, trend: "up" },
                { name: "Ovalo Monitor, Surco", score: 65, trend: "down" },
                { name: "Calle Capón, Centro", score: 54, trend: "stable" },
              ].map((zone, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-3 hover:bg-muted/50 rounded-lg transition-colors group cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`w-6 h-6 flex items-center justify-center rounded-full text-xs font-bold ${
                        i === 0
                          ? "bg-red-500 text-white"
                          : "bg-secondary text-muted-foreground"
                      }`}
                    >
                      {i + 1}
                    </span>
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        {zone.name}
                      </p>
                      <p className="text-[10px] text-muted-foreground">
                        Riesgo Alto • Robos
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-foreground">
                      {zone.score}
                    </p>
                    <p className="text-[10px] text-red-500 flex items-center justify-end">
                      Alto <TrendingUp className="h-3 w-3 ml-1" />
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Gráfico Simple (Timeline) */}
          <div className="rounded-xl border border-border bg-card h-48 flex flex-col">
            <div className="p-4 border-b border-border">
              <h3 className="font-semibold text-sm">Tendencia Semanal</h3>
            </div>
            <div className="flex-1 p-4 flex items-end justify-between gap-2">
              {/* Barras simuladas */}
              {[40, 65, 30, 80, 55, 90, 45].map((h, i) => (
                <div
                  key={i}
                  className="w-full bg-primary/20 rounded-t-sm hover:bg-primary/40 transition-all relative group"
                  style={{ height: `${h}%` }}
                >
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-popover text-popover-foreground text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none border border-border">
                    {h}
                  </div>
                </div>
              ))}
            </div>
            <div className="px-4 pb-2 flex justify-between text-[10px] text-muted-foreground">
              <span>Lun</span>
              <span>Dom</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
