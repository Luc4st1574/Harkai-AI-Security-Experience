"use client";

import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, Circle } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { HeatPoints } from "@/lib/types";
import { useConfig } from "@/lib/config/config-context";

const iconUrl = "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png";
const iconRetinaUrl =
  "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png";
const shadowUrl =
  "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png";

const DefaultIcon = L.icon({
  iconUrl,
  iconRetinaUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

const LIMA_COORDS: [number, number] = [-12.046374, -77.042793];
const DEFAULT_ZOOM = 13;

const INCIDENT_COLORS: Record<number, string> = {
  1: "#2196f3",
  2: "#795547",
  4: "#b61c1c",
};

interface IncidentMapProps {
  incidents: HeatPoints[];
}

export default function IncidentMap({ incidents }: IncidentMapProps) {
  const { incidentMap } = useConfig();

  useEffect(() => {
    // Aquí podrías agregar lógica para auto-centrar el mapa en el nuevo promedio de puntos
    // si quisieras un enfoque más dinámico.
  }, [incidents]);

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
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        />

        {incidents.map((incident) => {
          if (!incident.latitude || !incident.longitude) return null;

          return (
            <div key={incident.id}>
              <Marker position={[incident.latitude, incident.longitude]}>
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

              <Circle
                center={[incident.latitude, incident.longitude]}
                pathOptions={{
                  color: INCIDENT_COLORS[incident.type] || "#64748b",
                  fillColor: INCIDENT_COLORS[incident.type] || "#64748b",
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
