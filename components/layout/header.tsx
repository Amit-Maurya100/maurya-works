"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, Factory } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/products", label: "Products" },
  { href: "/industries", label: "Industries" },
  { href: "/projects", label: "Projects" },
  { href: "/quality", label: "Quality" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export function Header({ companyName }: { companyName: string }) {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2 font-bold text-slate-900">
          <Factory className="h-7 w-7 text-amber-500" />
          <span className="hidden sm:inline">{companyName}</span>
          <span className="sm:hidden">Maurya</span>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-slate-600 transition-colors hover:text-slate-900"
            >
              {link.label}
            </Link>
          ))}
          <Button asChild variant="accent" size="sm">
            <Link href="/contact">Request a Quote</Link>
          </Button>
        </nav>

        <button
          type="button"
          className="lg:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      <div
        className={cn(
          "border-t border-slate-200 bg-white lg:hidden",
          open ? "block" : "hidden"
        )}
      >
        <nav className="flex flex-col gap-1 px-4 py-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-md px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Button asChild variant="accent" className="mt-2">
            <Link href="/contact" onClick={() => setOpen(false)}>
              Request a Quote
            </Link>
          </Button>
        </nav>
      </div>
    </header>
  );
}
