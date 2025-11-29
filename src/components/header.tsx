"use client";

import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Menu } from "lucide-react";
import { X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { ModeToggle } from "./mode-toggle";
import { cn } from "@/lib/utils";

export const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Soluciones", href: "#features" },
    { name: "Cómo funciona", href: "#how-it-works" },
    { name: "Impacto", href: "#stats" },
    { name: "Contacto", href: "#contact" },
  ];

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b",
        scrolled
          ? "bg-background/80 backdrop-blur-lg border-border shadow-sm py-3"
          : "bg-transparent border-transparent py-5"
      )}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 lg:px-8">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="relative overflow-hidden rounded-lg">
              <Image
                src="/harkai.png"
                alt="Harkai Logo"
                width={80}
                height={80}
                className="transition-transform duration-300 group-hover:scale-110"
              />
            </div>
            {/* <span className="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
              HARKAI
            </span> */}
          </Link>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors relative group"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </div>

        {/* Actions */}
        <div className="hidden md:flex items-center gap-4">
          <ModeToggle />
          <div className="h-6 w-px bg-border" /> {/* Separador */}
          <Link href="/login">
            <Button
              variant="ghost"
              className="hover:bg-primary/10 hover:text-primary"
            >
              Iniciar Sesión
            </Button>
          </Link>
          <Button className="shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all duration-300">
            Solicitar Demo
          </Button>
        </div>

        {/* Mobile Toggle */}
        <div className="flex md:hidden items-center gap-4">
          <ModeToggle />
          <button
            className="text-foreground p-2 hover:bg-accent rounded-md transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-background/95 backdrop-blur-xl border-b border-border px-6 py-6 animate-in slide-in-from-top-5">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-base font-medium text-muted-foreground hover:text-primary transition-colors p-2 rounded-md hover:bg-accent"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <div className="h-px bg-border my-2" />
            <Link href={"/login"}>
              <Button variant="ghost" className="justify-start w-full">
                Iniciar Sesión
              </Button>
            </Link>
            <Button className="w-full bg-primary text-primary-foreground">
              Solicitar Demo
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};
