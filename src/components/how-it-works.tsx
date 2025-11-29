import { MessageSquareText, ScanSearch, Map, ArrowRight } from "lucide-react";

export function HowItWorksSection() {
  const steps = [
    {
      id: "01",
      title: "Reporte Ciudadano Instantáneo",
      description:
        "Cualquier persona reporta un incidente (robo, accidente, incendio) enviando una foto o audio vía WhatsApp o nuestra App. Sin formularios complejos.",
      icon: MessageSquareText,
    },
    {
      id: "02",
      title: "Verificación y Triaje con IA",
      description:
        "Nuestros algoritmos analizan el reporte en milisegundos: validan la ubicación, filtran noticias falsas (fake news) y clasifican la gravedad.",
      icon: ScanSearch,
    },
    {
      id: "03",
      title: "Inteligencia Accionable",
      description:
        "La información validada aparece en tu Dashboard en tiempo real. Se generan alertas automáticas y se actualizan los mapas de calor de riesgo.",
      icon: Map,
    },
  ];

  return (
    <section
      id="how-it-works"
      className="py-24 bg-background relative overflow-hidden"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center mb-20">
          <h2 className="text-base font-semibold text-primary tracking-wide uppercase">
            Flujo de Datos
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Del reporte a la acción en segundos
          </p>
          <p className="mt-4 text-lg text-muted-foreground">
            Convertimos el caos de la información urbana en datos estructurados
            y confiables para tu organización.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Connecting Line (Desktop only) */}
          <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-gradient-to-r from-border via-primary/50 to-border z-0" />

          {steps.map((step, index) => (
            <div
              key={step.id}
              className="relative flex flex-col items-center text-center z-10 group"
            >
              {/* Icon Bubble */}
              <div className="w-24 h-24 rounded-2xl bg-background border-2 border-border shadow-lg flex items-center justify-center mb-8 group-hover:border-primary/50 group-hover:shadow-primary/20 transition-all duration-300 relative">
                <div className="absolute inset-0 bg-primary/5 rounded-2xl scale-0 group-hover:scale-100 transition-transform duration-300" />
                <step.icon className="h-10 w-10 text-muted-foreground group-hover:text-primary transition-colors duration-300" />

                {/* Step Number Badge */}
                <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold shadow-md">
                  {step.id}
                </div>
              </div>

              {/* Content */}
              <h3 className="text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
                {step.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed max-w-sm">
                {step.description}
              </p>

              {/* Mobile Arrow (Visual cue for flow) */}
              {index < steps.length - 1 && (
                <div className="md:hidden mt-8 text-muted-foreground/30">
                  <ArrowRight className="h-6 w-6 rotate-90" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
