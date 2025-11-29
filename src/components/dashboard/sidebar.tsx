"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Map, 
  ShieldAlert, 
  FileText, 
  Settings, 
  LogOut,
  Activity
} from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useAuth } from "@/lib/auth/auth-context";

const sidebarItems = [
  {
    title: "Resumen",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Mapa en Vivo",
    href: "/dashboard/map",
    icon: Map,
  },
  {
    title: "Incidentes",
    href: "/dashboard/incidents",
    icon: ShieldAlert,
  },
  {
    title: "Analítica & Reportes",
    href: "/dashboard/analytics",
    icon: FileText,
  },
  {
    title: "Configuración",
    href: "/dashboard/settings",
    icon: Settings,
  },
];

export function Sidebar() {
  const pathname = usePathname();

  const { logout } = useAuth()

  const handleLogout = async () => {
    await logout();
  }

  return (
    <aside className="fixed inset-y-0 left-0 z-50 w-64 border-r border-border bg-card/50 backdrop-blur-xl hidden md:flex flex-col">
      {/* Logo Area */}
      <div className="h-16 flex items-center px-6 border-b border-border">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="relative overflow-hidden rounded-md">
             <Image 
              src="/harkai.png" 
              alt="Harkai Logo" 
              width={80} 
              height={80} 
             />
          </div>
          {/* <span className="text-lg font-bold tracking-tight text-foreground">
            HARKAI <span className="text-[10px] font-normal text-muted-foreground ml-1">v1.0</span>
          </span> */}
        </Link>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto py-6 px-4">
        <nav className="space-y-1.5">
          {sidebarItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 group",
                  isActive
                    ? "bg-primary/10 text-primary shadow-sm"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                )}
              >
                <item.icon
                  className={cn(
                    "h-4 w-4 transition-colors",
                    isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground"
                  )}
                />
                {item.title}
                {isActive && (
                  <div className="ml-auto w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Status & Footer */}
      <div className="p-4 border-t border-border">
        <div className="bg-secondary/30 rounded-lg p-3 mb-4 border border-border/50">
            <div className="flex items-center gap-2 mb-1">
                <Activity className="h-3 w-3 text-green-500" />
                <span className="text-xs font-semibold text-foreground">Sistema Operativo</span>
            </div>
            <p className="text-[10px] text-muted-foreground">Última sinc: Hace 2s</p>
        </div>

        <button className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-muted-foreground hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-colors w-full" onClick={handleLogout}>
          <LogOut className="h-4 w-4" />
          Cerrar Sesión
        </button>
      </div>
    </aside>
  );
} 