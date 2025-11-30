import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
// import { Header } from "@/components/header";
import { ThemeProvider } from "@/components/theme-provider";
import { AuthProvider } from "@/lib/auth/auth-context";
import { ConfigProvider } from "@/lib/config/config-context";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "HARKAI - Seguridad Urbana con IA",
  description:
    "Plataforma de seguridad ciudadana basada en incidentes con verificación de inteligencia artificial",
  authors: [
    {
      name: "Lucas Santillán",
      url: "https://github.com/Luc4st1574",
    },
  ],
  keywords: [
    "Harkai",
    "Seguridad Urbana",
    "Inteligencia Artificial",
    "Incidentes",
    "Verificación",
    "Plataforma",
    "Ciudadana",
    "Hackathon",
    "AI",
    "Security",
    "Experience",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            <ConfigProvider>
              {/* <Header /> */}
              {children}
            </ConfigProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
