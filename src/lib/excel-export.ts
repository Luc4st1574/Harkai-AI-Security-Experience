import * as XLSX from "xlsx";
import { HeatPoints } from "@/lib/types";
import { IncidentTypeMap } from "@/lib/db/master-data";

const formatDate = (date: Date) => {
  return date.toLocaleDateString("es-PE", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};

const formatTime = (date: Date) => {
  return date.toLocaleTimeString("es-PE", {
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const downloadIncidentsExcel = (
  incidents: HeatPoints[],
  incidentMap: IncidentTypeMap,
  filename = `Reporte_Harkai_${formatDate(new Date())}`
) => {
  const dataRows = incidents.map((inc) => {
    const dateObj = inc.timestamp.toDate();
    return {
      ID: inc.id,
      Fecha: formatDate(dateObj),
      Hora: formatTime(dateObj),
      Tipo: incidentMap[inc.type] || `Tipo ${inc.type}`,
      Distrito: inc.district || "No registrado",
      Descripción: inc.description,
      Latitud: inc.latitude,
      Longitud: inc.longitude,
      GoogleMaps: `https://www.google.com/maps/search/?api=1&query=${inc.latitude},${inc.longitude}`,
    };
  });

  const total = incidents.length;
  const byDistrict: Record<string, number> = {};
  incidents.forEach((inc) => {
    const d = inc.district || "Otros";
    byDistrict[d] = (byDistrict[d] || 0) + 1;
  });

  const summaryRows = [
    { Métrica: "Generado el", Valor: new Date().toLocaleString() },
    { Métrica: "Total de Incidentes", Valor: total },
    { Métrica: "", Valor: "" },
    { Métrica: "--- DESGLOSE POR DISTRITO ---", Valor: "" },
    ...Object.entries(byDistrict).map(([dist, count]) => ({
      Métrica: dist,
      Valor: count,
    })),
  ];

  const wb = XLSX.utils.book_new();

  const wsSummary = XLSX.utils.json_to_sheet(summaryRows);
  const wsData = XLSX.utils.json_to_sheet(dataRows);

  const wscols = [
    { wch: 20 },
    { wch: 12 },
    { wch: 10 },
    { wch: 20 },
    { wch: 15 },
    { wch: 50 },
    { wch: 15 },
    { wch: 15 },
    { wch: 40 },
  ];
  wsData["!cols"] = wscols;

  XLSX.utils.book_append_sheet(wb, wsSummary, "Resumen Ejecutivo");
  XLSX.utils.book_append_sheet(wb, wsData, "Data Detallada");

  XLSX.writeFile(wb, `${filename}_${Date.now()}.xlsx`);
};