"use client";

import { HeatPoints } from "@/lib/types";
import { useConfig } from "@/lib/config/config-context";

interface IncidentListProps {
  incidents: HeatPoints[];
}

export function IncidentList({ incidents }: IncidentListProps) {
  const { incidentMap } = useConfig();

  return (
    <div className="rounded-xl border border-border bg-card flex-1 flex flex-col overflow-hidden min-h-[400px]">
      <div className="p-4 border-b border-border flex justify-between items-center bg-muted/10">
        <h3 className="font-semibold text-sm">Incidentes del periodo</h3>
      </div>

      <div className="flex-1 overflow-y-auto p-2 space-y-2">
        {incidents.map((incident) => (
          <div
            key={incident.id}
            className="group flex items-start gap-3 p-3 hover:bg-muted/50 rounded-lg transition-all cursor-pointer border border-transparent hover:border-border"
          >
            {/* Icono / Avatar */}
            <div className="w-9 h-9 rounded-full bg-red-500/10 flex items-center justify-center shrink-0 text-red-500 font-bold text-xs border border-red-500/20 group-hover:bg-red-500/20 transition-colors">
              {(incidentMap[incident.type] || "?").charAt(0)}
            </div>

            {/* Contenido Principal (Flex-1 para ocupar el resto) */}
            <div className="flex-1 min-w-0 flex flex-col gap-0.5">
              {/* Fila Superior: Tipo + Hora (Flex justify-between) */}
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-foreground truncate mr-2">
                  {incidentMap[incident.type] || "Desconocido"}
                </p>
                <span className="text-[10px] text-muted-foreground whitespace-nowrap font-medium tabular-nums">
                  {incident.timestamp
                    ?.toDate()
                    .toLocaleDateString([], {
                      day: "2-digit",
                      month: "2-digit",
                    })}{" "}
                  •{" "}
                  {incident.timestamp
                    ?.toDate()
                    .toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                </span>
              </div>

              {/* Descripción */}
              <p className="text-[11px] text-muted-foreground line-clamp-2 leading-relaxed">
                {incident.description}
              </p>

              {/* Distrito / Metadata extra */}
              {incident.district && (
                <div className="mt-1 flex items-center">
                  <span className="text-[9px] text-muted-foreground/80 flex items-center gap-1 bg-secondary/50 px-1.5 py-0.5 rounded-sm">
                    📍 {incident.district}
                  </span>
                </div>
              )}
            </div>
          </div>
        ))}

        {incidents.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-center p-8 space-y-2">
            <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-2">
              <span className="text-xl">🔍</span>
            </div>
            <p className="text-sm font-medium text-foreground">
              Sin incidentes en esta zona
            </p>
            <p className="text-xs text-muted-foreground">
              Prueba cambiando el distrito o el rango de tiempo.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
