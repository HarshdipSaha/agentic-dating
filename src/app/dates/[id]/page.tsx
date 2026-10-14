import Link from "next/link";
import { notFound } from "next/navigation";
import { PRECOMPUTED_DATES, getTranscriptById } from "@/data/precomputedDates";
import { JevRubricDisplay } from "@/components/JevRubricDisplay";
import { ArrowLeft, Compass, Terminal, Calendar, Share2, Sparkles, User } from "lucide-react";

export async function generateStaticParams() {
  return PRECOMPUTED_DATES.map((d) => ({ id: d.id }));
}

export default async function DateDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const transcript = getTranscriptById(id);

  if (!transcript) {
    notFound();
  }

  return (
    <div className="space-y-10 pb-16">
      {/* Back navigation */}
      <div>
        <Link
          href="/dates"
          className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wider text-[#78716c] hover:text-[#1c1917] transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Transcripts</span>
        </Link>
      </div>

      {/* Transcript Header */}
      <div className="p-8 rounded-xl bg-[#ffffff] border border-[#e7e2d7]">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-[#e7e2d7]">
          {/* Candidates */}
          <div className="flex items-center gap-4">
            <div className="flex -space-x-3">
              <div className="w-14 h-14 rounded-full bg-[#1c1917] text-[#ffffff] flex items-center justify-center font-serif text-lg font-bold ring-4 ring-[#ffffff]">
                {transcript.candidateA.avatarFallback}
              </div>
              <div className="w-14 h-14 rounded-full bg-[#991b1b] text-[#ffffff] flex items-center justify-center font-serif text-lg font-bold ring-4 ring-[#ffffff]">
                {transcript.candidateB.avatarFallback}
              </div>
            </div>

            <div>
              <div className="text-[11px] font-mono uppercase tracking-widest text-[#78716c]">
                Simulated 8-Turn Date
              </div>
              <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#1c1917] mt-0.5">
                {transcript.candidateA.name} & {transcript.candidateB.name}
              </h1>
              <div className="flex items-center gap-2 text-xs text-[#78716c] mt-1">
                <Calendar className="w-3 h-3" />
                <span>Executed: {new Date(transcript.createdAt).toLocaleDateString()}</span>
                <span>•</span>
                <span>{transcript.turns.length} turns recorded</span>
              </div>
            </div>
          </div>

          {/* Quick Score */}
          <div className="text-right">
            <div className="text-[10px] uppercase font-mono tracking-wider text-[#78716c]">
              JEV Composite Grade
            </div>
            <div className="font-serif text-4xl font-bold text-[#991b1b] leading-tight">
              {transcript.jevEvaluation.compositeScore}
              <span className="text-base font-normal text-[#78716c]">/100</span>
            </div>
            <div className="text-[11px] font-mono text-[#15803d]">
              Reciprocal Balance: {transcript.jevEvaluation.reciprocalBalanceScore}%
            </div>
          </div>
        </div>

        {/* Activity Proposed */}
        <div className="mt-6 flex items-start gap-3 p-4 rounded bg-[#faf8f5] border border-[#e7e2d7]">
          <Compass className="w-4 h-4 text-[#991b1b] flex-shrink-0 mt-0.5" />
          <div>
            <span className="text-[11px] font-mono uppercase tracking-wider text-[#78716c] block">
              Negotiated Shared Activity
            </span>
            <p className="text-xs font-semibold text-[#1c1917] mt-0.5">
              {transcript.activityProposed}
            </p>
          </div>
        </div>
      </div>

      {/* 8-Turn Dialogue Stream */}
      <div className="space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-[#e7e2d7]">
          <h2 className="font-serif text-2xl font-bold text-[#1c1917]">
            Full Dialogue Transcript
          </h2>
          <span className="text-xs font-mono text-[#78716c]">
            Sequential turns with counterparty tool calls
          </span>
        </div>

        <div className="space-y-3">
          {transcript.turns.map((turn) => {
            const isSpeakerA = turn.speakerId === transcript.candidateA.id;
            return (
              <div
                key={turn.turnNumber}
                className={`p-4 rounded-lg border ${
                  isSpeakerA
                    ? "bg-[#ffffff] border-[#e7e2d7] ml-0 mr-4 sm:mr-12"
                    : "bg-[#fbf9f5] border-[#dfd7c8] ml-4 sm:ml-12 mr-0"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-[#1c1917] text-[#ffffff] flex items-center justify-center text-[10px] font-serif font-bold">
                      {turn.speakerName.charAt(0)}
                    </span>
                    <span className="font-serif text-xs font-bold text-[#1c1917]">
                      {turn.speakerName}
                    </span>
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#f4efe6] text-[#78716c]">
                      Turn {turn.turnNumber} • {turn.phase.replace("_", " ")}
                    </span>
                  </div>
                </div>

                <p className="text-xs text-[#332f2c] leading-relaxed">
                  {turn.content}
                </p>

                {/* Tool Call Receipt if present */}
                {turn.toolCall && (
                  <div className="mt-3 p-3 rounded bg-[#1c1917] text-[#fed7aa] font-mono text-[11px] space-y-1.5">
                    <div className="flex items-center gap-1.5 text-[#fed7aa] font-semibold">
                      <Terminal className="w-3.5 h-3.5" />
                      <span>MCP Counterparty Query: {turn.toolCall.tool}()</span>
                    </div>
                    <div className="text-[10px] text-[#a8a29e]">
                      Invoked by: {turn.toolCall.invokedBy} &rarr; Target: {turn.toolCall.targetCandidate}
                    </div>
                    <pre className="text-[10px] text-[#f5f2eb] overflow-x-auto bg-[#292524] p-2 rounded max-h-36">
                      {JSON.stringify(turn.toolCall.response, null, 2)}
                    </pre>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Independent Post-Date Reflections */}
      <div className="p-6 rounded-xl bg-[#ffffff] border border-[#e7e2d7] space-y-4">
        <h3 className="font-serif text-lg font-bold text-[#1c1917]">
          Independent Agent Reflections
        </h3>
        <p className="text-xs text-[#57534e]">
          Each agent recorded an isolated post-date assessment grounded in the conversation.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded bg-[#faf8f5] border border-[#e7e2d7] space-y-1.5">
            <span className="text-[11px] font-mono uppercase tracking-wider font-semibold text-[#1c1917]">
              {transcript.candidateA.name}&apos;s Private Reflection
            </span>
            <p className="text-xs text-[#44403c] italic leading-relaxed">
              &ldquo;{transcript.reflections.candidateA_reflection}&rdquo;
            </p>
          </div>

          <div className="p-4 rounded bg-[#faf8f5] border border-[#e7e2d7] space-y-1.5">
            <span className="text-[11px] font-mono uppercase tracking-wider font-semibold text-[#1c1917]">
              {transcript.candidateB.name}&apos;s Private Reflection
            </span>
            <p className="text-xs text-[#44403c] italic leading-relaxed">
              &ldquo;{transcript.reflections.candidateB_reflection}&rdquo;
            </p>
          </div>
        </div>
      </div>

      {/* TypeSafe JEV System 1 Evaluation Display */}
      <JevRubricDisplay
        evaluation={transcript.jevEvaluation}
        personAName={transcript.candidateA.name}
        personBName={transcript.candidateB.name}
      />
    </div>
  );
}
