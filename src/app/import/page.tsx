"use client";

import { useState } from "react";
import Link from "next/link";
import { CandidatePerson } from "@/types";
import {
  PlusCircle,
  Linkedin,
  Instagram,
  ArrowRight,
  ShieldCheck,
  Terminal,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
} from "lucide-react";

export default function ImportPairPage() {
  const [name, setName] = useState("");
  const [linkedinUrl, setLinkedinUrl] = useState("");
  const [instagramUrl, setInstagramUrl] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [importedCandidate, setImportedCandidate] = useState<CandidatePerson | null>(null);

  const handleQuickFill = (candidateName: string, lUrl: string, igUrl: string) => {
    setName(candidateName);
    setLinkedinUrl(lUrl);
    setInstagramUrl(igUrl);
    setErrors([]);
    setImportedCandidate(null);
  };

  const handleImport = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors([]);
    setImportedCandidate(null);

    try {
      const res = await fetch("/api/import-profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim() || undefined,
          linkedinUrl: linkedinUrl.trim(),
          instagramUrl: instagramUrl.trim(),
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setErrors(data.errors || [data.error || "Ingestion failed."]);
      } else {
        setImportedCandidate(data.candidate);
      }
    } catch (err: unknown) {
      setErrors([err instanceof Error ? err.message : "Network error during profile ingestion."]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-10 pb-16 max-w-4xl mx-auto">
      {/* Header */}
      <div className="pb-6 border-b border-[#e7e2d7]">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#f4efe6] text-[10px] uppercase font-mono tracking-wider text-[#1c1917] border border-[#e7e2d7] mb-3">
          <PlusCircle className="w-3 h-3 text-[#991b1b]" />
          <span>Real-Time Ingestion Engine</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#1c1917]">
          Import & Create a Personal MCP Agent
        </h1>
        <p className="text-xs sm:text-sm text-[#57534e] mt-2 leading-relaxed">
          Paste any official LinkedIn URL and public Instagram URL. Twofold normalizes handles,
          validates public accessibility, extracts traits with explicit honest unknowns,
          and initializes a living Personal MCP digital double ready to date against the cohort.
        </p>
      </div>

      {/* Quick Fill Suggestions for Reviewers */}
      <div className="p-4 rounded-lg bg-[#ffffff] border border-[#e7e2d7] space-y-2">
        <span className="text-[11px] font-mono uppercase tracking-wider text-[#78716c] block">
          Reviewer Quick Test Presets:
        </span>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() =>
              handleQuickFill(
                "Satya Nadella",
                "https://www.linkedin.com/in/satyanadella/",
                "https://www.instagram.com/satyanadella/"
              )
            }
            className="text-xs px-2.5 py-1 rounded bg-[#faf8f5] border border-[#e7e2d7] text-[#1c1917] hover:bg-[#f4efe6] transition-colors"
          >
            Satya Nadella
          </button>

          <button
            type="button"
            onClick={() =>
              handleQuickFill(
                "Jensen Huang",
                "https://www.linkedin.com/in/jenhsunhuang/",
                "https://www.instagram.com/nvidia/"
              )
            }
            className="text-xs px-2.5 py-1 rounded bg-[#faf8f5] border border-[#e7e2d7] text-[#1c1917] hover:bg-[#f4efe6] transition-colors"
          >
            Jensen Huang
          </button>

          <button
            type="button"
            onClick={() =>
              handleQuickFill(
                "Sam Altman",
                "https://www.linkedin.com/in/samaltman/",
                "https://www.instagram.com/sama/"
              )
            }
            className="text-xs px-2.5 py-1 rounded bg-[#faf8f5] border border-[#e7e2d7] text-[#1c1917] hover:bg-[#f4efe6] transition-colors"
          >
            Sam Altman
          </button>
        </div>
      </div>

      {/* Ingestion Form */}
      <form onSubmit={handleImport} className="editorial-card rounded-xl p-6 sm:p-8 space-y-6">
        <div>
          <label className="block text-xs font-mono uppercase tracking-wider text-[#57534e] mb-1.5">
            Full Display Name (Optional)
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Satya Nadella (auto-derived if blank)"
            className="w-full px-3.5 py-2 text-xs rounded border border-[#e7e2d7] bg-[#faf8f5] text-[#1c1917] focus:outline-none focus:border-[#1c1917]"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-[#57534e] mb-1.5 flex items-center gap-1.5">
              <Linkedin className="w-3.5 h-3.5 text-[#0077b5]" />
              <span>1. Official LinkedIn Profile URL *</span>
            </label>
            <input
              type="text"
              required
              value={linkedinUrl}
              onChange={(e) => setLinkedinUrl(e.target.value)}
              placeholder="https://www.linkedin.com/in/username/"
              className="w-full px-3.5 py-2 text-xs rounded border border-[#e7e2d7] bg-[#faf8f5] text-[#1c1917] focus:outline-none focus:border-[#1c1917]"
            />
          </div>

          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-[#57534e] mb-1.5 flex items-center gap-1.5">
              <Instagram className="w-3.5 h-3.5 text-[#e1306c]" />
              <span>2. Public Instagram Profile URL *</span>
            </label>
            <input
              type="text"
              required
              value={instagramUrl}
              onChange={(e) => setInstagramUrl(e.target.value)}
              placeholder="https://www.instagram.com/username/"
              className="w-full px-3.5 py-2 text-xs rounded border border-[#e7e2d7] bg-[#faf8f5] text-[#1c1917] focus:outline-none focus:border-[#1c1917]"
            />
          </div>
        </div>

        {/* Errors list */}
        {errors.length > 0 && (
          <div className="p-4 rounded-lg bg-[#fef2f2] border border-[#fecaca] space-y-1">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#991b1b]">
              <AlertCircle className="w-4 h-4" />
              <span>Ingestion Validation Notice</span>
            </div>
            {errors.map((err, idx) => (
              <p key={idx} className="text-xs text-[#991b1b]">
                • {err}
              </p>
            ))}
          </div>
        )}

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            disabled={isLoading}
            className="editorial-button editorial-button-primary text-xs uppercase tracking-wider py-2.5 px-6 flex items-center gap-2"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>{isLoading ? "Analyzing & Deploying Agent..." : "Ingest & Create Personal MCP"}</span>
          </button>
        </div>
      </form>

      {/* Successful Ingestion Result */}
      {importedCandidate && (
        <div className="editorial-card rounded-xl p-8 space-y-6 border-2 border-[#15803d]">
          <div className="flex items-center gap-3 pb-4 border-b border-[#e7e2d7]">
            <span className="p-2 rounded-full bg-[#ecfdf5] text-[#15803d]">
              <CheckCircle2 className="w-5 h-5" />
            </span>
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#15803d] font-bold">
                Agent Created & Deployed
              </span>
              <h2 className="font-serif text-2xl font-bold text-[#1c1917]">
                {importedCandidate.name}
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-3 rounded bg-[#faf8f5] border border-[#e7e2d7]">
              <span className="font-mono text-[#78716c] block text-[10px]">Assigned MCP Identifier</span>
              <span className="font-mono font-bold text-[#1c1917]">{importedCandidate.id}</span>
            </div>

            <div className="p-3 rounded bg-[#faf8f5] border border-[#e7e2d7]">
              <span className="font-mono text-[#78716c] block text-[10px]">MCP Server Protocol Endpoint</span>
              <span className="font-mono font-bold text-[#991b1b]">/api/mcp/{importedCandidate.id}</span>
            </div>
          </div>

          {/* Honest Unknowns callout */}
          <div className="p-4 rounded bg-[#fef2f2] border border-[#fecaca] text-xs space-y-1">
            <div className="font-mono font-bold text-[#991b1b] flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4" />
              <span>Honest Unknowns Preserved:</span>
            </div>
            {importedCandidate.traits.honestUnknowns.map((u, i) => (
              <p key={i} className="text-[#7f1d1d]">• {u}</p>
            ))}
          </div>

          {/* Direct CTA: Simulate date right away */}
          <div className="pt-4 border-t border-[#e7e2d7] flex flex-wrap items-center gap-3">
            <Link
              href={`/simulate?candidateA=${importedCandidate.id}&candidateB=harshdip-saha`}
              className="editorial-button editorial-button-primary text-xs uppercase tracking-wider py-2 px-4 flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Date Against Harshdip Saha</span>
            </Link>

            <Link
              href={`/simulate?candidateA=${importedCandidate.id}&candidateB=ali-abdaal`}
              className="editorial-button editorial-button-primary text-xs uppercase tracking-wider py-2 px-4 flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Date Against Ali Abdaal</span>
            </Link>

            <Link
              href={`/mcp-inspector?candidate=${importedCandidate.id}`}
              className="editorial-button editorial-button-secondary text-xs uppercase tracking-wider py-2 px-4 flex items-center gap-1.5"
            >
              <Terminal className="w-3.5 h-3.5" />
              <span>Inspect MCP Tools</span>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
