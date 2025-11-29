import {
  Building2,
  ShieldAlert,
  LineChart,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";

const features = [
  {
    title: "Para Aseguradoras",
    description: "Calcula pólizas con precisión milimétrica.",
    icon: ShieldAlert,
    pain: "Reportes policiales atrasados y datos estáticos por distrito.",
    solution:
      "Riesgo urbano actualizado en tiempo real, granularidad por manzana y validación ciudadana para detectar fraude.",
    color: "text-blue-500",
    bg: "bg-blue-500/10",
    border: "group-hover:border-blue-500/50",
  },
  {
    title: "Para Municipalidades",
    description: "Gestión urbana proactiva, no reactiva.",
    icon: Building2,
    pain: "Decisiones basadas en intuición y llamadas vecinales dispersas.",
    solution:
      "Mapa vivo de incidentes (Waze de seguridad), heatmaps de delito y evaluación de impacto de patrullaje.",
    color: "text-green-500",
    bg: "bg-green-500/10",
    border: "group-hover:border-green-500/50",
  },
  {
    title: "Para Consultoras",
    description: "Estudios de mercado en minutos, no semanas.",
    icon: LineChart,
    pain: "Encuestas manuales costosas y data desactualizada.",
    solution:
      "Datasets listos para análisis, cruce con variables socioeconómicas y reportes de expansión comercial al instante.",
    color: "text-purple-500",
    bg: "bg-purple-500/10",
    border: "group-hover:border-purple-500/50",
  },
];

export function FeaturesSection() {
  return (
    <section
      id="features"
      className="py-24 bg-secondary/20 relative overflow-hidden"
    >
      {/* Background Decorator */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(var(--primary),0.05)_0,transparent_70%)]" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-base font-semibold text-primary tracking-wide uppercase">
            Sectores & Soluciones
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Transformamos la incertidumbre en datos
          </p>
          <p className="mt-4 text-lg text-muted-foreground">
            Dejamos atrás los reportes estáticos. Harkai ofrece inteligencia
            viva para quienes toman decisiones críticas en la ciudad.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className={cn(
                "group relative overflow-hidden rounded-2xl border border-border bg-card p-8 shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-1",
                feature.border
              )}
            >
              <div
                className={cn(
                  "inline-flex h-12 w-12 items-center justify-center rounded-lg mb-6",
                  feature.bg
                )}
              >
                <feature.icon className={cn("h-6 w-6", feature.color)} />
              </div>

              <h3 className="text-xl font-semibold text-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-sm font-medium text-muted-foreground mb-6">
                {feature.description}
              </p>

              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-red-500/5 border border-red-500/10">
                  <div className="flex items-start gap-3">
                    <XCircle className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-semibold text-red-500 uppercase mb-1">
                        El Dolor
                      </p>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {feature.pain}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-primary/5 border border-primary/10">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-semibold text-primary uppercase mb-1">
                        Solución Harkai
                      </p>
                      <p className="text-sm text-foreground leading-relaxed">
                        {feature.solution}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
