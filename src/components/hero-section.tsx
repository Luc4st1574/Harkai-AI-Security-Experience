import { Button } from "@/components/ui/button";
import { ArrowRight, Play, ShieldCheck, Activity, Map } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative pt-24 pb-20 lg:pt-48 lg:pb-32 overflow-hidden min-h-screen flex items-center">
      <div className="absolute inset-0 -z-10 h-full w-full bg-background bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px]"></div>

      <div className="absolute inset-0 -z-10 bg-background [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>

      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/10 rounded-full blur-[120px] pointer-events-none opacity-50 dark:opacity-30" />

      <div className="relative mx-auto w-full max-w-7xl px-6 lg:px-8 z-10">
        <div className="mx-auto max-w-4xl text-center">
          {/* Badge */}
          <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-sm font-medium text-primary mb-8 backdrop-blur-sm animate-in fade-in slide-in-from-bottom-4 duration-1000">
            <ShieldCheck className="mr-2 h-3.5 w-3.5" />
            <span className="mr-2">Seguridad Urbana Inteligente</span>
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-5xl lg:text-7xl text-balance animate-in fade-in slide-in-from-bottom-8 duration-1000 fill-mode-backwards delay-150">
            Protege tu ciudad con <br className="hidden sm:block" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-emerald-400">
              verificación IA en tiempo real
            </span>
          </h1>

          {/* Subheadline basado en tu PDF */}
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-1000 fill-mode-backwards delay-300">
            Convierte reportes ciudadanos en inteligencia accionable. HARKAI
            unifica datos urbanos, geolocalización y validación automática para
            <span className="text-foreground font-medium">
              {" "}
              Aseguradoras, Municipios y Consultoras
            </span>
            .
          </p>

          {/* CTA Buttons */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 animate-in fade-in slide-in-from-bottom-8 duration-1000 fill-mode-backwards delay-500">
            <Button
              size="lg"
              className="h-12 px-8 text-base shadow-xl shadow-primary/20 hover:shadow-primary/40 transition-all rounded-full group"
            >
              Solicitar Demo
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="h-12 px-8 text-base border-primary/20 hover:bg-primary/5 rounded-full backdrop-blur-sm"
            >
              <Play className="mr-2 h-4 w-4" />
              Ver Video Explicativo
            </Button>
          </div>
        </div>

        {/* Dashboard Preview Mockup */}
        <div className="mt-20 relative animate-in fade-in slide-in-from-bottom-12 duration-1000 fill-mode-backwards delay-700">
          {/* Glow effect behind the image */}
          <div className="absolute -inset-1 bg-gradient-to-r from-primary/30 to-emerald-500/30 rounded-2xl blur-2xl opacity-30"></div>

          <div className="relative rounded-xl border border-border/50 bg-card/50 backdrop-blur-xl shadow-2xl overflow-hidden ring-1 ring-white/10">
            {/* Fake UI Header */}
            <div className="border-b border-border/50 px-4 py-3 flex items-center gap-2 bg-muted/20">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
              </div>
              <div className="ml-4 h-6 w-64 rounded-full bg-muted/40 text-[10px] flex items-center px-3 text-muted-foreground">
                harkai.app/dashboard/security-map
              </div>
            </div>

            {/* Placeholder for the Dashboard Content */}
            <div className="aspect-[16/9] bg-gradient-to-br from-background via-muted/10 to-muted/30 flex items-center justify-center relative">
              {/* Abstraction of a map interface */}
              <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#333_1px,transparent_1px)] [background-size:16px_16px] dark:bg-[radial-gradient(#fff_1px,transparent_1px)]"></div>

              <div className="text-center p-8 z-10">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 border border-primary/20 mb-6 backdrop-blur-md shadow-lg shadow-primary/10 animate-pulse">
                  <Map className="h-10 w-10 text-primary" />
                </div>
                <p className="text-muted-foreground font-medium">
                  Aquí irá la visualización del Mapa de Calor en Tiempo Real
                </p>
                <div className="mt-4 flex justify-center gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center">
                    <Activity className="w-3 h-3 mr-1 text-green-500" /> 98%
                    Precisión
                  </span>
                  <span className="flex items-center">
                    <ShieldCheck className="w-3 h-3 mr-1 text-primary" /> Datos
                    Validados
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
