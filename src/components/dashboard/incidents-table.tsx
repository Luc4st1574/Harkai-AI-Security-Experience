"use client";

import Image from "next/image";
import {
  MapPin,
  Calendar,
  Clock,
  ImageIcon,
  ExternalLink
} from "lucide-react";
import { HeatPoints } from "@/lib/types";
import { useConfig } from "@/lib/config/config-context";
import { Button } from "@/components/ui/button";

interface IncidentsTableProps {
  incidents: HeatPoints[];
  searchTerm: string;
}

export function IncidentsTable({ incidents, searchTerm }: IncidentsTableProps) {
  const { incidentMap } = useConfig();

  const filteredIncidents = incidents.filter((incident) => {
    if (!searchTerm) return true;

    const searchLower = searchTerm.toLowerCase();
    const typeName = (incidentMap[incident.type] || "").toLowerCase();
    const description = (incident.description || "").toLowerCase();
    const district = (incident.district || "").toLowerCase();

    return (
      typeName.includes(searchLower) ||
      description.includes(searchLower) ||
      district.includes(searchLower)
    );
  });

  if (filteredIncidents.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center border rounded-xl border-dashed bg-muted/10">
        <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-3">
          <SearchXIcon className="h-6 w-6 text-muted-foreground" />
        </div>
        <h3 className="font-semibold text-lg">No se encontraron incidentes</h3>
        <p className="text-muted-foreground text-sm max-w-xs mt-1">
          Intenta ajustar los filtros o el término de búsqueda.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="bg-muted/50 text-muted-foreground font-medium border-b border-border">
            <tr>
              <th className="px-4 py-3 w-[80px]">Evidencia</th>
              <th className="px-4 py-3">Tipo / Descripción</th>
              <th className="px-4 py-3">Ubicación</th>
              <th className="px-4 py-3">Fecha y Hora</th>
              <th className="px-4 py-3 text-right">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {filteredIncidents.map((incident) => {
              const dateObj = incident.timestamp?.toDate();
              const dateStr = dateObj?.toLocaleDateString("es-PE", { day: '2-digit', month: 'short' });
              const timeStr = dateObj?.toLocaleTimeString("es-PE", { hour: '2-digit', minute: '2-digit' });

              return (
                <tr key={incident.id} className="group hover:bg-muted/30 transition-colors">
                  {/* Columna 1: Evidencia */}
                  <td className="px-4 py-3 align-top">
                    <div className="relative h-12 w-12 rounded-lg overflow-hidden bg-secondary border border-border group-hover:border-primary/30 transition-colors">
                      {incident.imageUrl ? (
                        <Image
                          src={incident.imageUrl}
                          alt="Evidencia"
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="h-full w-full flex items-center justify-center text-muted-foreground">
                          <ImageIcon className="h-5 w-5" />
                        </div>
                      )}
                    </div>
                  </td>

                  <td className="px-4 py-3 align-top max-w-[300px]">
                    <div className="flex flex-col gap-1">
                      <span className="font-semibold text-foreground flex items-center gap-2">
                        {incidentMap[incident.type] || `Tipo ${incident.type}`}
                        <span className={`w-2 h-2 rounded-full ${getSeverityColor(incident.type)}`} />
                      </span>
                      <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                        {incident.description}
                      </p>
                    </div>
                  </td>

                  <td className="px-4 py-3 align-top">
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-1.5 text-foreground font-medium">
                        <MapPin className="h-3.5 w-3.5 text-primary" />
                        {incident.district || "Sin distrito"}
                      </div>
                      <span className="text-[10px] text-muted-foreground font-mono pl-5">
                        {incident.latitude.toFixed(4)}, {incident.longitude.toFixed(4)}
                      </span>
                    </div>
                  </td>

                  <td className="px-4 py-3 align-top">
                    <div className="flex flex-col gap-1 text-xs">
                      <div className="flex items-center gap-1.5 text-muted-foreground">
                        <Calendar className="h-3.5 w-3.5" />
                        {dateStr}
                      </div>
                      <div className="flex items-center gap-1.5 text-muted-foreground">
                        <Clock className="h-3.5 w-3.5" />
                        {timeStr}
                      </div>
                    </div>
                  </td>

                  <td className="px-4 py-3 align-top text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                      title="Ver ubicación en Google Maps" // Tooltip nativo simple
                      onClick={() => window.open(
                        `https://www.google.com/maps?q=${incident.latitude},${incident.longitude}`,
                        '_blank'
                      )}
                    >
                      <ExternalLink className="h-4 w-4" />
                      <span className="sr-only">Ver en Google Maps</span>
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="bg-muted/20 border-t border-border p-3 text-xs text-center text-muted-foreground">
        Mostrando {filteredIncidents.length} registros
      </div>
    </div>
  );
}

function getSeverityColor(type: number) {
  switch (type) {
    case 0: return "bg-red-500";
    case 1: return "bg-orange-500";
    case 2: return "bg-yellow-500";
    case 4: return "bg-blue-500";
    default: return "bg-gray-400";
  }
}

function SearchXIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="m13.5 8.5-5 5" />
      <path d="m8.5 8.5 5 5" />
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  )
}