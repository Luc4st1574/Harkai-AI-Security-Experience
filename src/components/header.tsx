"use client"

import { Shield } from "lucide-react";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { Menu } from "lucide-react";
import { X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/harkai.png" alt="Logo" width={75} height={75} />
          </Link>
        </div>

        <div className="hidden md:flex items-center gap-8">
          <Link href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Features
          </Link>
          <Link href="#how-it-works" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            How It Works
          </Link>
          <Link href="#stats" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Impact
          </Link>
          <Link href="#contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Contact
          </Link>
        </div>

        <div className="hidden md:flex items-center gap-4">
          <Button variant="ghost" className="text-foreground">
            Sign In
          </Button>
          <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
            Get Started
          </Button>
        </div>

        <button
          className="md:hidden text-foreground"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {mobileMenuOpen && (
        <div className="md:hidden bg-background border-b border-border px-6 py-4">
          <div className="flex flex-col gap-4">
            <Link href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Features
            </Link>
            <Link href="#how-it-works" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              How It Works
            </Link>
            <Link href="#stats" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Impact
            </Link>
            <Link href="#contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Contact
            </Link>
            <div className="flex flex-col gap-2 pt-4 border-t border-border">
              <Button variant="ghost" className="text-foreground justify-start">
                Sign In
              </Button>
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                Get Started
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
