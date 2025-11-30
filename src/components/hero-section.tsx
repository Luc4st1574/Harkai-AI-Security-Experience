"use client";

import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

function RotatingText({ words }: { words: string[] }) {
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);

      setTimeout(() => {
        setIndex((prevIndex) => (prevIndex + 1) % words.length);
        setFade(true);
      }, 500);

    }, 3000);

    return () => clearInterval(interval);
  }, [words.length]);

  return (
    <span
      className={`inline-block transition-all duration-500 ease-in-out transform ${fade ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
        } text-foreground font-medium`}
    >
      {words[index]}
    </span>
  );
}

export function HeroSection() {
  return (
    <section className="relative pt-24 pb-20 lg:pt-48 lg:pb-32 overflow-hidden min-h-screen flex items-center">
      <div className="absolute inset-0 -z-10 h-full w-full bg-background bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px]"></div>

      <div className="absolute inset-0 -z-10 bg-background [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>

      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/10 rounded-full blur-[120px] pointer-events-none opacity-50 dark:opacity-30" />

      <div className="relative mx-auto w-full max-w-7xl px-6 lg:px-8 z-10">
        <div className="mx-auto max-w-4xl text-center">
          {/* Headline */}
          <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-5xl lg:text-7xl text-balance animate-in fade-in slide-in-from-bottom-8 duration-1000 fill-mode-backwards delay-150">
            Obtén analíticas en tiempo real <br className="hidden sm:block" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-emerald-400">
              de todo lo que pasa en la ciudad
            </span>
          </h1>

          <p className="mt-6 text-lg leading-relaxed text-muted-foreground max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-1000 fill-mode-backwards delay-300">
            Convierte información generada por los usuarios en información relevante para {" "}
            <RotatingText
              words={["Aseguradoras", "Municipios", "Consultoras"]}
            />
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 animate-in fade-in slide-in-from-bottom-8 duration-1000 fill-mode-backwards delay-500">
            <Link href="/login">
              <Button
                size="lg"
                className="h-12 px-8 text-base shadow-xl shadow-primary/20 hover:shadow-primary/40 transition-all rounded-full group"
              >
                Iniciar Sesión
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
