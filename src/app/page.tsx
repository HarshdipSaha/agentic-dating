import Link from "next/link";
import { CANDIDATES } from "@/data/candidates";
import { PersonCard } from "@/components/PersonCard";
import {
  Sparkles,
  ShieldCheck,
  Cpu,
  Terminal,
  Trophy,
  ArrowRight,
  GitBranch,
  Layers,
  Scale,
  Compass,
} from "lucide-react";

export default function HomePage() {
  const featuredCandidates = CANDIDATES.slice(0, 6);

  return (
    <div className="space-y-20 pb-12">
      {/* Hero Section */}
      <section className="pt-6 sm:pt-12 pb-8 border-b border-[#e7e2d7]">
        <div className="max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#f4efe6] text-[11px] uppercase tracking-wider font-mono text-[#1c1917] border border-[#e7e2d7] mb-6">
            <span className="w-2 h-2 rounded-full bg-[#991b1b]" />
            Dual-Brain Neuro-Agentic Architecture
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl font-bold tracking-tight text-[#1c1917] leading-[1.08] mb-6">
            Twofold: Agentic Dating from Two Public Profiles.
          </h1>

          <p className="text-base sm:text-lg text-[#57534e] leading-relaxed mb-8 max-w-3xl">
            Static dating apps flatten complex human beings into 5 curated photos and 200 characters.
            Twofold grounds autonomous <strong>Personal MCP digital doubles</strong> in verified LinkedIn
            and public Instagram accounts, lets agents conduct multi-turn simulated dates with live counterparty tool inquiries,
            and calculates mathematically robust compatibility via the <strong>TypeSafe JEV System 1 Cortex</strong>.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <Link
              href="/simulate"
              className="editorial-button editorial-button-primary text-sm uppercase tracking-wider py-3 px-6 flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>Simulate an Agent Date</span>
            </Link>

            <Link
              href="/profiles"
              className="editorial-button editorial-button-secondary text-sm uppercase tracking-wider py-3 px-6 flex items-center gap-2"
            >
              <Compass className="w-4 h-4" />
              <span>Explore 26 Verified Cohort</span>
            </Link>

            <Link
              href="/mcp-inspector"
              className="editorial-button editorial-button-secondary text-sm uppercase tracking-wider py-3 px-6 flex items-center gap-2"
            >
              <Terminal className="w-4 h-4" />
              <span>Open MCP Workbench</span>
            </Link>
          </div>
        </div>

        {/* High-Level Metrics Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 pt-8 border-t border-[#e7e2d7]">
          <div>
            <div className="font-serif text-2xl sm:text-3xl font-bold text-[#1c1917]">
              26 Verified
            </div>
            <div className="text-xs uppercase tracking-wider text-[#78716c] font-mono mt-1">
              Real Candidate Cohort
            </div>
          </div>

          <div>
            <div className="font-serif text-2xl sm:text-3xl font-bold text-[#991b1b]">
              2 Sources Only
            </div>
            <div className="text-xs uppercase tracking-wider text-[#78716c] font-mono mt-1">
              LinkedIn + Public Instagram
            </div>
          </div>

          <div>
            <div className="font-serif text-2xl sm:text-3xl font-bold text-[#1c1917]">
              5 MCP Tools
            </div>
            <div className="text-xs uppercase tracking-wider text-[#78716c] font-mono mt-1">
              Per Digital Double
            </div>
          </div>

          <div>
            <div className="font-serif text-2xl sm:text-3xl font-bold text-[#15803d]">
              Zero Emojis
            </div>
            <div className="text-xs uppercase tracking-wider text-[#78716c] font-mono mt-1">
              100% Deterministic JEV
            </div>
          </div>
        </div>
      </section>

      {/* Architecture Visualizer Section */}
      <section className="p-8 sm:p-10 rounded-xl bg-[#ffffff] border border-[#e7e2d7]">
        <div className="max-w-3xl mb-8">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#991b1b] font-semibold mb-2">
            <Layers className="w-4 h-4" />
            <span>Dual-Brain Architecture</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1c1917]">
            How Twofold Solves the Politeness Inflation Trap
          </h2>
          <p className="text-xs sm:text-sm text-[#57534e] mt-2 leading-relaxed">
            Unconstrained LLMs suffer from agreeableness bias: when asked to rate romantic chemistry,
            they invariably output 85–95. Twofold separates conversational roleplay from evaluation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Personal MCP */}
          <div className="p-6 rounded-lg bg-[#faf8f5] border border-[#e7e2d7] space-y-3">
            <div className="w-8 h-8 rounded bg-[#1c1917] text-[#fed7aa] flex items-center justify-center font-mono">
              <Terminal className="w-4 h-4" />
            </div>
            <h3 className="font-serif text-base font-bold text-[#1c1917]">
              1. Personal MCP Server
            </h3>
            <p className="text-xs text-[#57534e] leading-relaxed">
              Every person hosts their own Model Context Protocol server exposing endpoints:
              <code className="block mt-1 font-mono text-[11px] text-[#991b1b]">
                getProfile, getInterestsAndHobbies, getValuesAndDealbreakers, askCandidateQuestion, checkLogistics
              </code>
            </p>
            <div className="text-[11px] text-[#78716c] pt-2">
              Reference: <a href="https://github.com/HarshdipSaha/harshdipsaha-mcp" target="_blank" rel="noreferrer" className="underline hover:text-[#1c1917]">harshdipsaha-mcp</a>
            </div>
          </div>

          {/* Card 2: System 2 Narrative */}
          <div className="p-6 rounded-lg bg-[#faf8f5] border border-[#e7e2d7] space-y-3">
            <div className="w-8 h-8 rounded bg-[#991b1b] text-[#ffffff] flex items-center justify-center font-mono">
              <Sparkles className="w-4 h-4" />
            </div>
            <h3 className="font-serif text-base font-bold text-[#1c1917]">
              2. System 2 Dialogue
            </h3>
            <p className="text-xs text-[#57534e] leading-relaxed">
              Autonomous 8-turn date simulation across four distinct phases: introductions,
              shared activity discovery, concrete friction trade-offs, and reflections.
              During dates, agents invoke counterparty MCP endpoints in real-time.
            </p>
            <div className="text-[11px] font-mono text-[#78716c] pt-2">
              Groq Llama-3.3-70B • Multi-key rotation
            </div>
          </div>

          {/* Card 3: System 1 JEV Cortex */}
          <div className="p-6 rounded-lg bg-[#faf8f5] border border-[#e7e2d7] space-y-3">
            <div className="w-8 h-8 rounded bg-[#15803d] text-[#ffffff] flex items-center justify-center font-mono">
              <Cpu className="w-4 h-4" />
            </div>
            <h3 className="font-serif text-base font-bold text-[#1c1917]">
              3. System 1 JEV Cortex
            </h3>
            <p className="text-xs text-[#57534e] leading-relaxed">
              TypeSafe AI SDK deterministic rubric grading using
              <code className="block mt-1 font-mono text-[11px] text-[#15803d]">
                choice (harmony), score (intellectual pace), noul (coexistence)
              </code>
              Guarantees zero-hallucination compatibility scoring with auditable receipts.
            </p>
            <div className="text-[11px] font-mono text-[#78716c] pt-2">
              @typesafe-ai/sdk • JEV Model
            </div>
          </div>
        </div>
      </section>

      {/* Featured Cohort Preview */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-[#e7e2d7]">
          <div>
            <span className="text-xs uppercase tracking-widest font-mono text-[#78716c] font-semibold">
              Admitted Candidate Pool
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1c1917] mt-1">
              26 Real Verified Individuals
            </h2>
            <p className="text-xs text-[#57534e] mt-1">
              Each profile includes official LinkedIn and public Instagram sources, extracted traits, and honest unknowns.
            </p>
          </div>

          <Link
            href="/profiles"
            className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wider font-semibold text-[#991b1b] hover:text-[#1c1917] transition-colors"
          >
            <span>View All 26 Profiles</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredCandidates.map((c) => (
            <PersonCard key={c.id} person={c} />
          ))}
        </div>
      </section>

      {/* Interactive Reviewer Callout */}
      <section className="p-8 rounded-xl bg-[#1c1917] text-[#faf8f5] flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-[10px] uppercase font-mono tracking-wider bg-[#322e2b] text-[#fed7aa]">
            <ShieldCheck className="w-3 h-3 text-[#15803d]" />
            Live Ingestion Sandbox
          </div>
          <h3 className="font-serif text-2xl font-bold">
            Test with Any Public LinkedIn + Instagram Pair
          </h3>
          <p className="text-xs text-[#a8a29e] leading-relaxed">
            Paste any two official public profile links. Twofold validates public status,
            extracts traits with explicit honest unknowns, instantiates an MCP digital double,
            and dates against our verified cohort.
          </p>
        </div>

        <div className="flex items-center gap-3 flex-shrink-0">
          <Link
            href="/import"
            className="editorial-button bg-[#faf8f5] text-[#1c1917] hover:bg-[#fed7aa] text-xs uppercase tracking-wider py-2.5 px-5"
          >
            Import New Candidate
          </Link>
          <Link
            href="/rankings"
            className="editorial-button bg-transparent border border-[#78716c] text-[#faf8f5] hover:border-[#faf8f5] text-xs uppercase tracking-wider py-2.5 px-5"
          >
            View Full Matrix
          </Link>
        </div>
      </section>
    </div>
  );
}
