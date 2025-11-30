"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, Circle } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { HeatPoints } from "@/lib/types";
import { useConfig } from "@/lib/config/config-context";
import { useTheme } from "next-themes";

const LIMA_COORDS: [number, number] = [-12.046374, -77.042793];
const DEFAULT_ZOOM = 13;

const MAP_STYLES = {
  light: "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", // Positron
  dark: "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", // Dark Matter
};

const INCIDENT_COLORS: Record<number, string> = {
  1: "#2196f3",
  2: "#9929af",
  4: "#b61c1c",
};

const createCustomIcon = (color: string) => {
  return L.divIcon({
    className: "bg-transparent", // Clase vacía para evitar estilos default cuadrados
    html: `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="${color}" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="filter: drop-shadow(0 2px 2px rgba(0,0,0,0.3)); width: 100%; height: 100%;">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
        <circle cx="12" cy="10" r="3" fill="white"></circle>
      </svg>
    `,
    iconSize: [35, 35],
    iconAnchor: [17.5, 35],
    popupAnchor: [0, -35],
  });
};

interface IncidentMapProps {
  incidents: HeatPoints[];
}

export default function IncidentMap({ incidents }: IncidentMapProps) {
  const { incidentMap } = useConfig();
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const tileUrl = resolvedTheme === "dark" ? MAP_STYLES.dark : MAP_STYLES.light;

  return (
    <div className="h-full w-full relative z-0">
      <MapContainer
        center={LIMA_COORDS}
        zoom={DEFAULT_ZOOM}
        scrollWheelZoom={true}
        style={{ height: "100%", width: "100%", borderRadius: "0.75rem" }}
        className="z-0"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url={tileUrl}
        />

        {incidents.map((incident) => {
          if (!incident.latitude || !incident.longitude) return null;

          // 1. Determinamos el color basado en el tipo (o gris por defecto)
          const color = INCIDENT_COLORS[incident.type] || "#64748b";

          return (
            <div key={incident.id}>
              {/* 2. Usamos createCustomIcon pasando el color dinámico */}
              <Marker
                position={[incident.latitude, incident.longitude]}
                icon={createCustomIcon(color)}
              >
                <Popup>
                  <div className="text-sm">
                    <strong className="block text-foreground mb-1">
                      {incidentMap[incident.type] || "Incidente"}
                    </strong>
                    <p className="text-muted-foreground m-0 leading-tight">
                      {incident.description}
                    </p>
                    <span className="text-[10px] text-primary mt-2 block">
                      {incident.timestamp?.toDate().toLocaleString()}
                    </span>
                  </div>
                </Popup>
              </Marker>

              {/* 3. El círculo usa la misma variable 'color' para mantener consistencia */}
              <Circle
                center={[incident.latitude, incident.longitude]}
                pathOptions={{
                  color: color,
                  fillColor: color,
                  fillOpacity: 0.2,
                }}
                radius={300}
              />
            </div>
          );
        })}
      </MapContainer>
    </div>
  );
}
