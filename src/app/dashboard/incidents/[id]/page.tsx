"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { getIncidentById } from "@/lib/db/incidents";
import { HeatPoints } from "@/lib/types";
import { useConfig } from "@/lib/config/config-context";
import { Loader2, Clock, ShieldAlert, Lock, Download, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const APK_DOWNLOAD_URL = process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET + "/app-release.apk";

export default function IncidentPublicPage() {
  const params = useParams();
  const { incidentMap } = useConfig();
  const [incident, setIncident] = useState<HeatPoints | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [isAndroid, setIsAndroid] = useState(false);

  useEffect(() => {
    const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera;
    if (/android/i.test(userAgent)) {
      setIsAndroid(true);
    }
  }, []);

  useEffect(() => {
    const fetchIncident = async () => {
      try {
        if (!params.id) return;
        const data = await getIncidentById(params.id as string);
        if (data) {
          setIncident(data);
        } else {
          setError(true);
        }
      } catch (err) {
        console.error(err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchIncident();
  }, [params.id]);

  const handleDownload = () => {
    if (isAndroid) {
      const link = document.createElement('a');
      link.href = APK_DOWNLOAD_URL;
      link.download = 'harkai-app.apk';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      toast("⚠️ La versión beta solo está disponible para dispositivos Android por el momento.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-950 text-white">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error || !incident) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-zinc-950 text-white p-6 text-center">
        <ShieldAlert className="h-12 w-12 text-red-500 mb-4" />
        <h1 className="text-xl font-bold mb-2">Contenido no disponible</h1>
        <p className="text-zinc-400">El reporte ha expirado o no tienes permisos para verlo.</p>
      </div>
    );
  }

  const typeLabel = incidentMap[incident.type] || "Incidente";
  const dateStr = incident.timestamp?.toDate().toLocaleDateString("es-PE", {
    day: "numeric",
    month: "long",
  });

  const shortDesc = incident.description.slice(0, 25);

  return (
    <div className="min-h-screen bg-zinc-950 text-white relative overflow-hidden font-sans">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />

      <header className="relative z-10 p-6 flex justify-center border-b border-white/5">
        <div className="flex items-center gap-2">
          <ShieldAlert className="w-5 h-5 text-primary" />
          <span className="font-bold tracking-tight">HARKAI MONITOR</span>
        </div>
      </header>

      <main className="relative z-10 max-w-md mx-auto p-6 pb-32">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wider mb-6 border border-primary/20">
          <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
          {typeLabel} Detectado
        </div>

        <div className="relative rounded-2xl overflow-hidden bg-zinc-900/50 border border-white/10 shadow-2xl mb-8">
          <div className="relative aspect-square w-full bg-zinc-800">
            {incident.imageUrl ? (
              <Image
                src={incident.imageUrl}
                alt="Evidencia oculta"
                fill
                className="object-cover blur-xl scale-110 opacity-60"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center bg-zinc-800">
                <Lock className="w-12 h-12 text-zinc-600" />
              </div>
            )}

            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/20 backdrop-blur-sm p-6 text-center">
              <div className="w-16 h-16 bg-zinc-950/80 rounded-full flex items-center justify-center mb-4 ring-1 ring-white/20 shadow-lg">
                <Lock className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bold text-lg mb-1">Evidencia Protegida</h3>
              <p className="text-sm text-zinc-300">
                Descarga la app para ver la información completa.
              </p>
            </div>
          </div>

          <div className="p-6 space-y-4">
            <div>
              <h2 className="text-2xl font-bold leading-tight mb-2">
                Reporte en {incident.district || "Lima"}
              </h2>
              <div className="flex items-center gap-4 text-sm text-zinc-400">
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{dateStr}</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <p className="text-zinc-300 leading-relaxed text-lg">
                &quot;{shortDesc}...
                <span className="blur-sm select-none text-zinc-500">
                  se observó a dos sujetos sospechosos corriendo hacia la avenida principal...
                </span>
                &quot;
              </p>
              <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-zinc-900/50 to-transparent" />
            </div>
          </div>
        </div>
      </main>

      <div className="fixed bottom-0 left-0 right-0 p-4 bg-zinc-950/80 backdrop-blur-xl border-t border-white/10 z-50">
        <div className="max-w-md mx-auto flex flex-col gap-3">
          <Button
            size="lg"
            onClick={handleDownload}
            className={`w-full h-14 text-base font-bold rounded-xl shadow-[0_0_20px_-5px_rgba(34,197,94,0.4)] animate-pulse ${!isAndroid ? 'opacity-90' : ''}`}
          >
            {isAndroid ? (
              <>
                <Download className="mr-2 h-5 w-5" />
                Descargar APK (Android)
              </>
            ) : (
              <>
                <AlertTriangle className="mr-2 h-5 w-5" />
                Descargar App (Solo Android)
              </>
            )}
          </Button>

          <p className="text-center text-[10px] text-zinc-500 uppercase tracking-widest">
            {isAndroid ? "Archivo seguro verificado" : "Detectamos que no usas Android"}
          </p>
        </div>
      </div>
    </div>
  );
}