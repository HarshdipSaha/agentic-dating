"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Users, Sparkles, Terminal, Trophy, PlusCircle, Compass, FileText } from "lucide-react";

export function Navbar() {
  const pathname = usePathname();

  const navLinks = [
    { href: "/profiles", label: "Cohort", icon: Users },
    { href: "/simulate", label: "Simulate Date", icon: Sparkles },
    { href: "/mcp-inspector", label: "MCP Workbench", icon: Terminal },
    { href: "/rankings", label: "Rankings", icon: Trophy },
    { href: "/dates", label: "Transcripts", icon: FileText },
    { href: "/import", label: "Import Pair", icon: PlusCircle },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#faf8f5]/90 backdrop-blur-md border-b border-[#e7e2d7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-8 h-8 rounded-sm bg-[#1c1917] text-[#faf8f5] flex items-center justify-center font-serif text-lg font-bold group-hover:bg-[#991b1b] transition-colors">
            T
          </div>
          <div>
            <span className="font-serif text-xl tracking-tight font-semibold text-[#1c1917] block leading-none">
              Twofold
            </span>
            <span className="text-[10px] uppercase tracking-widest text-[#78716c] font-mono block mt-0.5">
              Agentic Dating Lab
            </span>
          </div>
        </Link>

        {/* Navigation items */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-md text-xs uppercase tracking-wider font-medium transition-all ${
                  isActive
                    ? "bg-[#1c1917] text-[#faf8f5]"
                    : "text-[#57534e] hover:text-[#1c1917] hover:bg-[#f4efe6]"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Action Button */}
        <div className="flex items-center gap-3">
          <Link
            href="/simulate"
            className="editorial-button editorial-button-primary text-xs uppercase tracking-wider py-1.5 px-3.5"
          >
            <Compass className="w-3.5 h-3.5" />
            <span>Launch Simulation</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
