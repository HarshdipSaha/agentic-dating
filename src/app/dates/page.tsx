import Link from "next/link";
import { PRECOMPUTED_DATES } from "@/data/precomputedDates";
import { CANDIDATES } from "@/data/candidates";
import { FileText, ArrowRight, Sparkles, CheckCircle2, Cpu, Calendar } from "lucide-react";

export default function DatesLibraryPage() {
  return (
    <div className="space-y-8 pb-16">
      {/* Header */}
      <div className="pb-6 border-b border-[#e7e2d7] flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#f4efe6] text-[10px] uppercase font-mono tracking-wider text-[#1c1917] border border-[#e7e2d7] mb-3">
            <FileText className="w-3 h-3 text-[#991b1b]" />
            <span>Auditable Date Archive</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#1c1917]">
            Completed Date Transcripts
          </h1>
          <p className="text-xs sm:text-sm text-[#57534e] mt-2 max-w-2xl leading-relaxed">
            Every date records all 8 conversation turns, counterparty MCP tool invocations,
            independent reflections, and deterministic JEV System 1 scoring receipts.
          </p>
        </div>

        <Link
          href="/simulate"
          className="editorial-button editorial-button-primary text-xs uppercase tracking-wider py-2 px-4 flex items-center gap-1.5"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Launch Fresh Date</span>
        </Link>
      </div>

      {/* Date Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {PRECOMPUTED_DATES.map((date) => (
          <div
            key={date.id}
            className="editorial-card rounded-lg p-5 flex flex-col justify-between hover:border-[#1c1917]/30 transition-all"
          >
            <div>
              {/* Top Row: Candidates Pair */}
              <div className="flex items-center justify-between pb-3 border-b border-[#e7e2d7]">
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    <span className="w-8 h-8 rounded-full bg-[#1c1917] text-[#ffffff] flex items-center justify-center font-serif text-xs font-bold ring-2 ring-[#ffffff]">
                      {date.candidateA.avatarFallback}
                    </span>
                    <span className="w-8 h-8 rounded-full bg-[#991b1b] text-[#ffffff] flex items-center justify-center font-serif text-xs font-bold ring-2 ring-[#ffffff]">
                      {date.candidateB.avatarFallback}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-serif text-sm font-bold text-[#1c1917]">
                      {date.candidateA.name} & {date.candidateB.name}
                    </h3>
                  </div>
                </div>

                <div className="text-right">
                  <span className="font-serif text-lg font-bold text-[#991b1b]">
                    {date.jevEvaluation.compositeScore}
                  </span>
                  <span className="text-[10px] text-[#78716c]">/100</span>
                </div>
              </div>

              {/* Activity */}
              <div className="my-3">
                <span className="text-[10px] uppercase font-mono tracking-wider text-[#78716c] block">
                  Simulated Activity
                </span>
                <p className="text-xs text-[#44403c] line-clamp-2 mt-0.5 font-medium leading-relaxed">
                  {date.activityProposed}
                </p>
              </div>

              {/* JEV Badges */}
              <div className="flex flex-wrap gap-1.5 pt-2 border-t border-[#e7e2d7]">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#f4efe6] text-[#1c1917]">
                  {date.jevEvaluation.lifestyle_harmony.label}
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#f4efe6] text-[#1c1917]">
                  {date.jevEvaluation.intellectual_pace.label}
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#ecfdf5] text-[#065f46]">
                  Balance: {date.jevEvaluation.reciprocalBalanceScore}%
                </span>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-4 mt-4 border-t border-[#e7e2d7] flex items-center justify-between">
              <span className="text-[10px] font-mono text-[#78716c] flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {new Date(date.createdAt).toLocaleDateString()}
              </span>

              <Link
                href={`/dates/${date.id}`}
                className="inline-flex items-center gap-1 text-xs font-semibold text-[#991b1b] hover:text-[#1c1917] transition-colors"
              >
                <span>Read Transcript</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
