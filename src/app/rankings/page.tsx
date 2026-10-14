"use client";

import { useState, use } from "react";
import Link from "next/link";
import { CANDIDATES } from "@/data/candidates";
import { getAllCohortRankings, getRankingsForPerson } from "@/data/rankings";
import {
  Trophy,
  ArrowRight,
  ShieldCheck,
  Scale,
  Sparkles,
  ExternalLink,
  User,
  HeartHandshake,
  Compass,
} from "lucide-react";

export default function RankingsPage({
  searchParams,
}: {
  searchParams?: Promise<{ subject?: string }>;
}) {
  const resolvedParams = searchParams ? use(searchParams) : {};
  const [selectedSubjectId, setSelectedSubjectId] = useState(
    resolvedParams.subject || "harshdip-saha"
  );

  const cohortRankings = getAllCohortRankings();
  const currentRankings = getRankingsForPerson(selectedSubjectId) || cohortRankings[0];
  const subjectPerson = CANDIDATES.find((c) => c.id === selectedSubjectId) || CANDIDATES[0];

  // Top overall pairings across the whole cohort for the global leaderboard
  const topOverallPairs = [
    { a: "harshdip-saha", b: "ali-abdaal", score: 94, balance: 97, reason: "Clinical rigor, high agency, and research curiosity" },
    { a: "ankur-warikoo", b: "sharan-hegde", score: 88, balance: 94, reason: "Compounding financial transparency and structured discipline" },
    { a: "alex-hormozi", b: "leila-hormozi", score: 96, balance: 99, reason: "Executive scaling powerhouse and shared high-tempo operational grit" },
    { a: "simon-sinek", b: "sahil-bloom", score: 92, balance: 95, reason: "Infinite mindset leadership paired with holistic 5 Types of Wealth" },
    { a: "varun-mayya", b: "ishan-sharma", score: 91, balance: 96, reason: "Frontier autonomous AI systems and rapid shipping velocity" },
  ];

  return (
    <div className="space-y-10 pb-16">
      {/* Header */}
      <div className="pb-6 border-b border-[#e7e2d7] flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#f4efe6] text-[10px] uppercase font-mono tracking-wider text-[#1c1917] border border-[#e7e2d7] mb-3">
            <Trophy className="w-3 h-3 text-[#991b1b]" />
            <span>Deterministic Matrix</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#1c1917]">
            Cohort Ranking Engine
          </h1>
          <p className="text-xs sm:text-sm text-[#57534e] mt-2 max-w-2xl leading-relaxed">
            Full pairwise compatibility rankings across all 26 admitted individuals.
            Evaluated by TypeSafe JEV System 1 Cortex with reciprocal balance and directional scores.
          </p>
        </div>

        <Link
          href="/simulate"
          className="editorial-button editorial-button-primary text-xs uppercase tracking-wider py-2 px-4 flex items-center gap-1.5"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Simulate Pair</span>
        </Link>
      </div>

      {/* Global Top Reciprocal Power Pairs */}
      <div className="p-6 rounded-xl bg-[#ffffff] border border-[#e7e2d7] space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-[#e7e2d7]">
          <div className="flex items-center gap-2">
            <HeartHandshake className="w-4 h-4 text-[#991b1b]" />
            <h2 className="font-serif text-lg font-bold text-[#1c1917]">
              Cohort Top Reciprocal Power Matches
            </h2>
          </div>
          <span className="text-[11px] font-mono text-[#78716c]">
            325 Unique Pairings Evaluated
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-3">
          {topOverallPairs.map((pair, idx) => {
            const pA = CANDIDATES.find((c) => c.id === pair.a);
            const pB = CANDIDATES.find((c) => c.id === pair.b);
            if (!pA || !pB) return null;
            return (
              <div
                key={idx}
                className="p-3 rounded-lg bg-[#faf8f5] border border-[#e7e2d7] flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono uppercase text-[#78716c]">#{idx + 1} Match</span>
                    <span className="font-serif text-sm font-bold text-[#991b1b]">{pair.score}/100</span>
                  </div>
                  <div className="font-serif text-xs font-bold text-[#1c1917] leading-tight">
                    {pA.name} & {pB.name}
                  </div>
                  <p className="text-[10px] text-[#57534e] mt-1 line-clamp-2 leading-relaxed">
                    {pair.reason}
                  </p>
                </div>

                <div className="mt-3 pt-2 border-t border-[#e7e2d7] flex items-center justify-between text-[10px]">
                  <span className="text-[#15803d] font-mono font-medium">Bal: {pair.balance}%</span>
                  <Link
                    href={`/dates/date-${pair.a}-${pair.b}`}
                    className="text-[#991b1b] font-semibold hover:underline"
                  >
                    Transcript &rarr;
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Subject Person Selector */}
      <div className="p-6 rounded-xl bg-[#ffffff] border border-[#e7e2d7] space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-[#57534e] mb-1">
              Select Individual to View Their 25 Evaluated Matches:
            </label>
            <select
              value={selectedSubjectId}
              onChange={(e) => setSelectedSubjectId(e.target.value)}
              className="w-full sm:w-auto px-3 py-2 text-sm font-serif font-bold rounded border border-[#e7e2d7] bg-[#faf8f5] text-[#1c1917] focus:outline-none max-w-full sm:min-w-[280px]"
            >
              {CANDIDATES.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name} ({c.headline.slice(0, 35)}...)
                </option>
              ))}
            </select>
          </div>

          <div className="text-left sm:text-right">
            <span className="text-[10px] font-mono uppercase text-[#78716c] block">
              Evaluated Partners
            </span>
            <span className="font-serif text-xl font-bold text-[#1c1917]">
              {currentRankings.rankedMatches.length} / 25 Candidates
            </span>
          </div>
        </div>

        {/* Selected Subject Summary Card */}
        <div className="p-4 rounded-lg bg-[#faf8f5] border border-[#e7e2d7] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-[#1c1917] text-[#faf8f5] flex items-center justify-center font-serif text-base font-bold">
              {subjectPerson.avatarFallback}
            </div>
            <div>
              <h3 className="font-serif text-base font-bold text-[#1c1917]">
                {subjectPerson.name}
              </h3>
              <p className="text-xs text-[#78716c] line-clamp-1">
                {subjectPerson.headline}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Link
              href={`/profiles/${subjectPerson.id}`}
              className="editorial-button editorial-button-secondary text-xs uppercase tracking-wider py-1.5 px-3"
            >
              <User className="w-3 h-3" />
              <span>Inspect Profile</span>
            </Link>
            <Link
              href={`/mcp-inspector?candidate=${subjectPerson.id}`}
              className="editorial-button editorial-button-secondary text-xs uppercase tracking-wider py-1.5 px-3"
            >
              <span>Inspect MCP</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Full 25 Ranked Matches List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-[#e7e2d7]">
          <h2 className="font-serif text-2xl font-bold text-[#1c1917]">
            Ranked Matches for {subjectPerson.name}
          </h2>
          <span className="text-xs font-mono text-[#78716c]">
            Sorted by JEV Composite Score Descending
          </span>
        </div>

        <div className="space-y-3">
          {currentRankings.rankedMatches.map((match, rankIndex) => (
            <div
              key={match.candidateId}
              className="editorial-card rounded-lg p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-[#1c1917]/30 transition-all overflow-hidden"
            >
              {/* Left: Rank #, Avatar, Info */}
              <div className="flex items-start gap-3 sm:gap-4 flex-1 min-w-0">
                <div className="font-serif text-xl sm:text-2xl font-bold text-[#78716c] w-6 sm:w-8 text-right flex-shrink-0 pt-1">
                  #{rankIndex + 1}
                </div>

                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#1c1917] text-[#faf8f5] flex items-center justify-center font-serif text-xs sm:text-sm font-bold flex-shrink-0">
                  {match.avatarFallback}
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <Link
                      href={`/profiles/${match.candidateId}`}
                      className="font-serif text-base font-bold text-[#1c1917] hover:text-[#991b1b] transition-colors truncate block"
                    >
                      {match.candidateName}
                    </Link>
                  </div>

                  <p className="text-xs text-[#57534e] truncate mt-0.5">
                    {match.headline}
                  </p>

                  <div className="flex flex-wrap items-center gap-2 text-[11px] text-[#78716c] mt-2">
                    <span className="font-medium text-[#1c1917]">Shared: {match.topSharedInterest}</span>
                    <span>•</span>
                    <span className="italic text-[#78716c]">Friction: {match.primaryFrictionPoint}</span>
                  </div>
                </div>
              </div>

              {/* Middle: Badges */}
              <div className="flex flex-wrap md:flex-col gap-1.5 md:items-end justify-start">
                <span className="editorial-badge text-[10px] bg-[#f4efe6] text-[#1c1917]">
                  {match.lifestyleHarmonyLabel}
                </span>
                <span className="editorial-badge text-[10px] bg-[#f4efe6] text-[#1c1917]">
                  {match.intellectualPaceLabel}
                </span>
              </div>

              {/* Right: Scores & Action */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between md:justify-end gap-3 sm:gap-6 pt-3 md:pt-0 border-t md:border-t-0 border-[#e7e2d7]">
                <div className="text-left sm:text-right">
                  <div className="font-serif text-2xl font-bold text-[#991b1b] leading-none">
                    {match.compositeScore}
                    <span className="text-xs font-normal text-[#78716c]">/100</span>
                  </div>
                  <div className="text-[10px] font-mono text-[#78716c] mt-1">
                    Dir: {match.directionalScore} &bull; Rev: {match.reverseScore}
                  </div>
                  <div className="text-[10px] font-mono text-[#15803d]">
                    Balance: {match.reciprocalBalanceScore}%
                  </div>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <Link
                    href={`/dates/${match.dateTranscriptId}`}
                    className="editorial-button editorial-button-secondary text-xs uppercase tracking-wider py-1.5 px-3 flex items-center justify-center gap-1 flex-1 sm:flex-initial"
                  >
                    <span>Transcript</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>

                  <Link
                    href={`/simulate?candidateA=${subjectPerson.id}&candidateB=${match.candidateId}`}
                    className="editorial-button editorial-button-primary text-xs uppercase tracking-wider py-1.5 px-3 flex items-center justify-center gap-1 flex-1 sm:flex-initial"
                  >
                    <Sparkles className="w-3 h-3" />
                    <span>Re-Date</span>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
