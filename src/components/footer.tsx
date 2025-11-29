import Link from "next/link";
import Image from "next/image";
import { Github, Twitter, Linkedin, ShieldCheck, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-background border-t border-border relative overflow-hidden">
      {/* Glow Effect Bottom */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8 relative z-10">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-8">
            <Link href="/" className="flex items-center gap-2">
              <div className="relative overflow-hidden rounded-lg">
                <Image
                  src="/harkai.png"
                  alt="Harkai Logo"
                  width={80}
                  height={80}
                />
              </div>
              {/* <span className="text-xl font-bold tracking-tight text-foreground">
                HARKAI
              </span> */}
            </Link>
            <p className="text-sm leading-6 text-muted-foreground max-w-xs">
              Inteligencia urbana en tiempo real. Transformamos reportes
              ciudadanos en datos verificados para ciudades más seguras.
            </p>
            <div className="flex space-x-6">
              <Link
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <span className="sr-only">Twitter</span>
                <Twitter className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <span className="sr-only">GitHub</span>
                <Github className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <span className="sr-only">LinkedIn</span>
                <Linkedin className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Links Grid */}
          <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold leading-6 text-foreground">
                  Soluciones
                </h3>
                <ul role="list" className="mt-6 space-y-4">
                  <li>
                    <Link
                      href="#"
                      className="text-sm leading-6 text-muted-foreground hover:text-primary transition-colors"
                    >
                      Para Aseguradoras
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="text-sm leading-6 text-muted-foreground hover:text-primary transition-colors"
                    >
                      Para Municipios
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="text-sm leading-6 text-muted-foreground hover:text-primary transition-colors"
                    >
                      Para Consultoras
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="text-sm leading-6 text-muted-foreground hover:text-primary transition-colors"
                    >
                      Comercios Locales
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-semibold leading-6 text-foreground">
                  Plataforma
                </h3>
                <ul role="list" className="mt-6 space-y-4">
                  <li>
                    <Link
                      href="#"
                      className="text-sm leading-6 text-muted-foreground hover:text-primary transition-colors flex items-center gap-2"
                    >
                      Mapa en Vivo{" "}
                      <span className="text-[10px] bg-red-500/10 text-red-500 px-1.5 py-0.5 rounded-full font-medium">
                        LIVE
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="text-sm leading-6 text-muted-foreground hover:text-primary transition-colors"
                    >
                      Validación IA
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="text-sm leading-6 text-muted-foreground hover:text-primary transition-colors"
                    >
                      API para Desarrolladores
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold leading-6 text-foreground">
                  Compañía
                </h3>
                <ul role="list" className="mt-6 space-y-4">
                  <li>
                    <Link
                      href="#"
                      className="text-sm leading-6 text-muted-foreground hover:text-primary transition-colors"
                    >
                      Sobre Nosotros
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="text-sm leading-6 text-muted-foreground hover:text-primary transition-colors"
                    >
                      Blog
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="text-sm leading-6 text-muted-foreground hover:text-primary transition-colors"
                    >
                      Contacto
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-semibold leading-6 text-foreground">
                  Legal
                </h3>
                <ul role="list" className="mt-6 space-y-4">
                  <li>
                    <Link
                      href="#"
                      className="text-sm leading-6 text-muted-foreground hover:text-primary transition-colors"
                    >
                      Privacidad
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="text-sm leading-6 text-muted-foreground hover:text-primary transition-colors"
                    >
                      Términos de Uso
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 border-t border-border pt-8 sm:mt-20 lg:mt-24 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs leading-5 text-muted-foreground">
            &copy; {new Date().getFullYear()} Harkai Technologies. Todos los
            derechos reservados.
          </p>
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <ShieldCheck className="w-3 h-3" />
              <span>Datos Encriptados</span>
            </div>
            <div className="w-px h-3 bg-border" />
            <div className="flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              <span>Hecho en Perú</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
