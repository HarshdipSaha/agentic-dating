"use client";

import Link from "next/link";
import { CandidatePerson } from "@/types";
import { CheckCircle2, Linkedin, Instagram, ExternalLink, Terminal, Sparkles, User, AlertCircle } from "lucide-react";

interface PersonCardProps {
  person: CandidatePerson;
}

export function PersonCard({ person }: PersonCardProps) {
  return (
    <div className="editorial-card rounded-lg p-5 flex flex-col justify-between h-full group hover:border-[#1c1917]/30 transition-all">
      <div>
        {/* Header: Avatar / Initials & Verification Badge */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full bg-[#1c1917] text-[#faf8f5] flex items-center justify-center font-serif text-sm font-semibold tracking-wider flex-shrink-0">
              {person.avatarFallback}
            </div>
            <div>
              <Link href={`/profiles/${person.id}`} className="hover:text-[#991b1b] transition-colors">
                <h3 className="font-serif text-base font-bold text-[#1c1917] tracking-tight leading-snug">
                  {person.name}
                </h3>
              </Link>
              <p className="text-[11px] text-[#78716c] font-medium leading-tight mt-0.5">
                {person.location}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#f4efe6] text-[10px] uppercase tracking-wider font-mono text-[#1c1917] border border-[#e7e2d7]">
            <CheckCircle2 className="w-3 h-3 text-[#15803d]" />
            <span>Verified</span>
          </div>
        </div>

        {/* Headline */}
        <p className="text-xs text-[#44403c] line-clamp-2 leading-relaxed mb-3">
          {person.headline}
        </p>

        {/* Official Sources Links */}
        <div className="flex items-center gap-2 mb-4 pb-3 border-b border-[#e7e2d7]">
          <a
            href={person.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-2 py-1 rounded bg-[#f4efe6] text-[11px] text-[#44403c] hover:bg-[#1c1917] hover:text-[#ffffff] transition-colors"
            title="Inspect Official LinkedIn"
          >
            <Linkedin className="w-3 h-3" />
            <span>LinkedIn</span>
            <ExternalLink className="w-2.5 h-2.5 opacity-60" />
          </a>

          <a
            href={person.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-2 py-1 rounded bg-[#f4efe6] text-[11px] text-[#44403c] hover:bg-[#1c1917] hover:text-[#ffffff] transition-colors"
            title="Inspect Public Instagram"
          >
            <Instagram className="w-3 h-3" />
            <span>Instagram</span>
            <ExternalLink className="w-2.5 h-2.5 opacity-60" />
          </a>
        </div>

        {/* Extracted Traits Tags */}
        <div className="space-y-2 mb-4">
          <div className="flex flex-wrap gap-1.5">
            {person.traits.passions.slice(0, 2).map((t, idx) => (
              <span
                key={idx}
                className="text-[11px] px-2 py-0.5 rounded bg-[#f5f2eb] text-[#57534e] border border-[#e7e2d7]"
              >
                {t.label}
              </span>
            ))}
            {person.traits.hobbies.slice(0, 1).map((h, idx) => (
              <span
                key={`h-${idx}`}
                className="text-[11px] px-2 py-0.5 rounded bg-[#fff7ed] text-[#c2410c] border border-[#fed7aa]"
              >
                {h.label}
              </span>
            ))}
          </div>

          {/* Honest Unknowns note */}
          <div className="flex items-center gap-1.5 text-[10px] text-[#78716c] italic">
            <AlertCircle className="w-3 h-3 text-[#78716c] flex-shrink-0" />
            <span>Honest unknowns explicitly preserved</span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-3 gap-1.5 pt-3 border-t border-[#e7e2d7]">
        <Link
          href={`/profiles/${person.id}`}
          className="editorial-button editorial-button-secondary text-[11px] py-1 px-1.5 flex items-center justify-center gap-1"
        >
          <User className="w-3 h-3" />
          <span>Profile</span>
        </Link>

        <Link
          href={`/mcp-inspector?candidate=${person.id}`}
          className="editorial-button editorial-button-secondary text-[11px] py-1 px-1.5 flex items-center justify-center gap-1"
        >
          <Terminal className="w-3 h-3" />
          <span>MCP</span>
        </Link>

        <Link
          href={`/simulate?candidateA=${person.id}`}
          className="editorial-button editorial-button-primary text-[11px] py-1 px-1.5 flex items-center justify-center gap-1"
        >
          <Sparkles className="w-3 h-3" />
          <span>Date</span>
        </Link>
      </div>
    </div>
  );
}
