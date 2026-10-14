import Link from "next/link";
import { notFound } from "next/navigation";
import { CANDIDATES } from "@/data/candidates";
import { getCandidateById } from "@/lib/mcp";
import { MCPConsole } from "@/components/MCPConsole";
import {
  CheckCircle2,
  Linkedin,
  Instagram,
  ExternalLink,
  ShieldAlert,
  Terminal,
  Sparkles,
  Trophy,
  ArrowLeft,
  Calendar,
  Building,
  MapPin,
  Compass,
} from "lucide-react";

export async function generateStaticParams() {
  return CANDIDATES.map((c) => ({ id: c.id }));
}

export default async function ProfileDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const person = getCandidateById(id);

  if (!person) {
    notFound();
  }

  return (
    <div className="space-y-10 pb-16">
      {/* Back button */}
      <div>
        <Link
          href="/profiles"
          className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wider text-[#78716c] hover:text-[#1c1917] transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Cohort</span>
        </Link>
      </div>

      {/* Hero Header */}
      <div className="p-8 rounded-xl bg-[#ffffff] border border-[#e7e2d7]">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
          <div className="flex items-start gap-5">
            <div className="w-16 h-16 rounded-full bg-[#1c1917] text-[#faf8f5] flex items-center justify-center font-serif text-2xl font-bold tracking-wider flex-shrink-0">
              {person.avatarFallback}
            </div>
            <div>
              <div className="flex items-center gap-3">
                <h1 className="font-serif text-3xl font-bold text-[#1c1917]">
                  {person.name}
                </h1>
                <span className="editorial-badge bg-[#ecfdf5] text-[#065f46] border-[#a7f3d0]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#15803d]" />
                  <span>{person.verificationStatus}</span>
                </span>
              </div>

              <p className="text-sm font-medium text-[#78716c] mt-1">
                {person.headline}
              </p>

              <div className="flex flex-wrap items-center gap-4 text-xs text-[#57534e] mt-3">
                <span className="inline-flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#78716c]" />
                  {person.location}
                </span>
                <span>•</span>
                <span className="inline-flex items-center gap-1.5">
                  <Building className="w-3.5 h-3.5 text-[#78716c]" />
                  {person.industry}
                </span>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-3">
            <Link
              href={`/simulate?candidateA=${person.id}`}
              className="editorial-button editorial-button-primary text-xs uppercase tracking-wider py-2 px-4 flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Simulate Date</span>
            </Link>
            <Link
              href={`/rankings?subject=${person.id}`}
              className="editorial-button editorial-button-secondary text-xs uppercase tracking-wider py-2 px-4 flex items-center gap-1.5"
            >
              <Trophy className="w-3.5 h-3.5" />
              <span>View Matches</span>
            </Link>
          </div>
        </div>

        {/* Bio */}
        <div className="mt-6 pt-6 border-t border-[#e7e2d7]">
          <h3 className="text-xs font-mono uppercase tracking-wider text-[#78716c] font-semibold mb-2">
            Biographical Summary
          </h3>
          <p className="text-sm text-[#44403c] leading-relaxed max-w-3xl">
            {person.bio}
          </p>
        </div>

        {/* Identity Verification Details */}
        <div className="mt-4 p-3.5 rounded bg-[#faf8f5] border border-[#e7e2d7] text-xs text-[#57534e]">
          <strong className="text-[#1c1917]">Identity Verification Evidence:</strong> {person.verificationDetails}
        </div>
      </div>

      {/* Two Source Accounts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Source 1: LinkedIn */}
        <div className="p-6 rounded-lg bg-[#ffffff] border border-[#e7e2d7] space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded bg-[#f4efe6] text-[#1c1917]">
                <Linkedin className="w-4 h-4" />
              </span>
              <h3 className="font-serif text-base font-bold text-[#1c1917]">
                Official LinkedIn Record
              </h3>
            </div>
            <a
              href={person.sources.linkedin.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs text-[#991b1b] hover:underline"
            >
              <span>Inspect Account</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          <div className="text-xs text-[#57534e] space-y-1">
            <div>Handle: <span className="font-mono text-[#1c1917]">@{person.sources.linkedin.accountHandle}</span></div>
            <div className="flex items-center gap-1">
              <Calendar className="w-3 h-3 text-[#78716c]" />
              <span>Captured: {new Date(person.sources.linkedin.capturedAt).toLocaleDateString()}</span>
            </div>
          </div>

          <div className="p-3 rounded bg-[#faf8f5] border border-[#e7e2d7] text-xs text-[#44403c] italic leading-relaxed">
            &ldquo;{person.sources.linkedin.evidenceText}&rdquo;
          </div>
        </div>

        {/* Source 2: Instagram */}
        <div className="p-6 rounded-lg bg-[#ffffff] border border-[#e7e2d7] space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded bg-[#f4efe6] text-[#1c1917]">
                <Instagram className="w-4 h-4" />
              </span>
              <h3 className="font-serif text-base font-bold text-[#1c1917]">
                Public Instagram Record
              </h3>
            </div>
            <a
              href={person.sources.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs text-[#991b1b] hover:underline"
            >
              <span>Inspect Account</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          <div className="text-xs text-[#57534e] space-y-1">
            <div>Handle: <span className="font-mono text-[#1c1917]">@{person.sources.instagram.accountHandle}</span></div>
            <div className="flex items-center gap-1">
              <Calendar className="w-3 h-3 text-[#78716c]" />
              <span>Captured: {new Date(person.sources.instagram.capturedAt).toLocaleDateString()}</span>
            </div>
          </div>

          <div className="p-3 rounded bg-[#faf8f5] border border-[#e7e2d7] text-xs text-[#44403c] italic leading-relaxed">
            &ldquo;{person.sources.instagram.evidenceText}&rdquo;
          </div>
        </div>
      </div>

      {/* Structured Profile Analysis & Honest Unknowns */}
      <div className="p-8 rounded-xl bg-[#ffffff] border border-[#e7e2d7] space-y-6">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-[#78716c] font-semibold">
            Profile Analysis Engine
          </span>
          <h2 className="font-serif text-2xl font-bold text-[#1c1917] mt-1">
            Extracted Traits & Grounded Evidence
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Column 1: Passions & Hobbies */}
          <div className="space-y-4">
            <div>
              <h4 className="text-xs font-mono uppercase tracking-wider text-[#1c1917] font-semibold mb-2">
                Core Passions (with evidence)
              </h4>
              <div className="space-y-2">
                {person.traits.passions.map((p, idx) => (
                  <div key={idx} className="p-3 rounded bg-[#faf8f5] border border-[#e7e2d7]">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-semibold text-[#1c1917]">{p.label}</span>
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#f4efe6] text-[#78716c]">
                        {p.source}
                      </span>
                    </div>
                    <p className="text-[11px] text-[#57534e] leading-snug">{p.evidence}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-xs font-mono uppercase tracking-wider text-[#1c1917] font-semibold mb-2">
                Observed Hobbies
              </h4>
              <div className="space-y-2">
                {person.traits.hobbies.map((h, idx) => (
                  <div key={idx} className="p-3 rounded bg-[#fff7ed] border border-[#fed7aa]">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-semibold text-[#c2410c]">{h.label}</span>
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#ffedd5] text-[#9a3412]">
                        {h.source}
                      </span>
                    </div>
                    <p className="text-[11px] text-[#78716c] leading-snug">{h.evidence}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Column 2: Ethos, Weekend Vibe, & Honest Unknowns */}
          <div className="space-y-4">
            <div className="p-4 rounded bg-[#faf8f5] border border-[#e7e2d7] space-y-3">
              <div>
                <span className="text-[11px] uppercase tracking-wider font-mono text-[#78716c] block">
                  Work Ethos
                </span>
                <p className="text-xs font-medium text-[#1c1917] mt-0.5">
                  {person.traits.workEthos}
                </p>
              </div>

              <div>
                <span className="text-[11px] uppercase tracking-wider font-mono text-[#78716c] block">
                  Weekend Rhythm
                </span>
                <p className="text-xs font-medium text-[#1c1917] mt-0.5">
                  {person.traits.weekendVibe}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#e7e2d7]">
                <div>
                  <span className="text-[10px] uppercase font-mono text-[#78716c]">Communication</span>
                  <p className="text-xs font-mono font-semibold text-[#1c1917] capitalize">
                    {person.traits.communicationStyle}
                  </p>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-mono text-[#78716c]">Intellectual Tempo</span>
                  <p className="text-xs font-mono font-semibold text-[#1c1917] capitalize">
                    {person.traits.intellectualTempo.replace("_", " ")}
                  </p>
                </div>
              </div>
            </div>

            {/* Honest Unknowns Box */}
            <div className="p-4 rounded-lg bg-[#fef2f2] border border-[#fecaca] space-y-2">
              <div className="flex items-center gap-2 text-[#991b1b]">
                <ShieldAlert className="w-4 h-4 flex-shrink-0" />
                <h4 className="text-xs font-mono uppercase tracking-wider font-bold">
                  Honest Unknowns (Privacy Contract)
                </h4>
              </div>
              <p className="text-[11px] text-[#7f1d1d] leading-relaxed">
                Twofold strictly refrains from inferring sexuality, private romantic expectations,
                or domestic preferences from social media photos or occupation.
              </p>
              <ul className="space-y-1 pt-1">
                {person.traits.honestUnknowns.map((u, idx) => (
                  <li key={idx} className="text-xs text-[#991b1b] flex items-start gap-1.5">
                    <span className="font-bold">•</span>
                    <span>{u}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Embedded Personal MCP Test Workbench */}
      <div className="space-y-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#f4efe6] text-[10px] uppercase font-mono tracking-wider text-[#1c1917] border border-[#e7e2d7] mb-1">
            <Terminal className="w-3 h-3 text-[#991b1b]" />
            <span>Living Digital Double</span>
          </div>
          <h2 className="font-serif text-2xl font-bold text-[#1c1917]">
            Interactive Personal MCP Console
          </h2>
          <p className="text-xs text-[#57534e]">
            Reviewers can query {person.name}&apos;s Model Context Protocol server directly.
            Tool invocations execute against verified profile parameters.
          </p>
        </div>

        <MCPConsole
          candidates={CANDIDATES}
          initialCandidateId={person.id}
          initialTool="getProfile"
        />
      </div>
    </div>
  );
}
