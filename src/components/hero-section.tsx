import { Button } from "@/components/ui/button"
import { ArrowRight, Play } from 'lucide-react'

export function HeroSection() {
  return (
    <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden">
      {/* Background glow effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[150px] pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold text-primary tracking-wider uppercase mb-4">
            Seguridad Urbana Inteligente
          </p>

          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl lg:text-7xl text-balance">
            Protege tu ciudad con{" "}
            <span className="text-primary">verificación IA</span>
          </h1>

          <p className="mt-6 text-lg leading-relaxed text-muted-foreground max-w-2xl mx-auto">
            HARKAI es la plataforma de seguridad ciudadana que utiliza inteligencia artificial
            para verificar, clasificar y gestionar incidentes urbanos en tiempo real.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 px-8">
              Solicitar Demo
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline" className="border-border text-foreground hover:bg-secondary">
              <Play className="mr-2 h-4 w-4" />
              Ver Video
            </Button>
          </div>
        </div>

        {/* Dashboard preview */}
        <div className="mt-16 sm:mt-20">
          <div className="relative rounded-xl border border-border bg-card p-2 shadow-2xl">
            <div className="rounded-lg bg-secondary/50 aspect-video flex items-center justify-center">
              <div className="text-center p-8">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/20 mb-4">
                  <Play className="h-8 w-8 text-primary" />
                </div>
                <p className="text-muted-foreground">Vista previa del dashboard</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
