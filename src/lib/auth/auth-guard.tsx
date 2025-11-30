"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth/auth-context";
import { Loader2, LogOut, ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const { user, profile, loading, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-background mt-8">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-xs text-muted-foreground animate-pulse">
            Verificando permisos...
          </p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  if (profile?.role !== "company" && profile?.role !== "admin") {
    return (
      <div className="flex h-screen w-full flex-col items-center justify-center bg-background p-6 text-center animate-in fade-in zoom-in duration-300 mt-8">
        <div className="rounded-full bg-destructive/10 p-4 mb-6 ring-1 ring-destructive/20">
          <ShieldAlert className="h-12 w-12 text-destructive" />
        </div>

        <h1 className="text-2xl font-bold tracking-tight mb-2">
          Acceso Restringido
        </h1>

        <p className="text-muted-foreground max-w-md mb-8 text-sm leading-relaxed">
          Hola{" "}
          <span className="font-semibold text-foreground">
            {user.displayName}
          </span>
          , tu cuenta ha sido creada exitosamente con el rol de{" "}
          <span className="font-mono bg-muted px-1 py-0.5 rounded text-xs">
            Usuario
          </span>
          .
          <br />
          <br />
          Esta sección es exclusiva para{" "}
          <strong>Empresas y Administradores</strong>. Por favor, contacta a
          soporte para activar tu plan empresarial.
        </p>

        <div className="flex items-center gap-3">
          <Button variant="outline" onClick={() => logout()} className="gap-2">
            <LogOut className="h-4 w-4" />
            Cerrar Sesión
          </Button>
          <Button
            onClick={() => (window.location.href = "mailto:ventas@harkai.com")}
          >
            Solicitar Acceso Empresa
          </Button>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
