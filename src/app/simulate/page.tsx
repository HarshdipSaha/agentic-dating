"use client";

import { useState, useTransition, use } from "react";
import { CANDIDATES } from "@/data/candidates";
import { DateTranscript, DateTurn } from "@/types";
import { JevRubricDisplay } from "@/components/JevRubricDisplay";
import {
  Sparkles,
  Play,
  RotateCcw,
  Terminal,
  MessageSquare,
  Shield,
  Clock,
  ArrowRight,
  User,
  Compass,
} from "lucide-react";

export default function SimulatePage({
  searchParams,
}: {
  searchParams?: Promise<{ candidateA?: string; candidateB?: string }>;
}) {
  const resolvedParams = searchParams ? use(searchParams) : {};
  const [candidateAId, setCandidateAId] = useState(
    resolvedParams.candidateA || "harshdip-saha"
  );
  const [candidateBId, setCandidateBId] = useState(
    resolvedParams.candidateB || "ali-abdaal"
  );
  const [customActivity, setCustomActivity] = useState("");

  const [isSimulating, setIsSimulating] = useState(false);
  const [simulatedTranscript, setSimulatedTranscript] = useState<DateTranscript | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const candidateA = CANDIDATES.find((c) => c.id === candidateAId) || CANDIDATES[0];
  const candidateB = CANDIDATES.find((c) => c.id === candidateBId) || CANDIDATES[1];

  const handleStartSimulation = async () => {
    if (candidateAId === candidateBId) {
      setErrorMsg("Please select two distinct candidates.");
      return;
    }

    setErrorMsg(null);
    setIsSimulating(true);
    setSimulatedTranscript(null);

    try {
      const res = await fetch("/api/simulate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          candidateAId,
          candidateBId,
          activity: customActivity || undefined,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Simulation failed.");
      }

      const data = await res.json();
      setSimulatedTranscript(data.transcript);
    } catch (err: unknown) {
      setErrorMsg(err instanceof Error ? err.message : "Failed to run simulation.");
    } finally {
      setIsSimulating(false);
    }
  };

  return (
    <div className="space-y-10 pb-16">
      {/* Header */}
      <div className="pb-6 border-b border-[#e7e2d7]">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#f4efe6] text-[10px] uppercase font-mono tracking-wider text-[#1c1917] border border-[#e7e2d7] mb-3">
          <Sparkles className="w-3 h-3 text-[#991b1b]" />
          <span>Autonomous Multi-Turn Harness</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#1c1917]">
          Simulate an Agent Date
        </h1>
        <p className="text-xs sm:text-sm text-[#57534e] mt-2 max-w-2xl leading-relaxed">
          Select two candidate agents. The system initiates an 8-turn date across 4 distinct phases,
          involving real-time MCP counterparty tool inquiries and calibrated TypeSafe JEV System 1 scoring.
        </p>
      </div>

      {/* Control Configuration Bar */}
      <div className="p-6 rounded-xl bg-[#ffffff] border border-[#e7e2d7] space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Candidate A Card */}
          <div className="p-4 rounded-lg bg-[#faf8f5] border border-[#e7e2d7] space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs uppercase tracking-wider text-[#78716c] font-semibold">
                Candidate A (Initiator)
              </span>
              <span className="text-[10px] font-mono text-[#991b1b]">Agent Double</span>
            </div>

            <select
              value={candidateAId}
              onChange={(e) => setCandidateAId(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded border border-[#e7e2d7] bg-[#ffffff] text-[#1c1917] focus:outline-none"
            >
              {CANDIDATES.map((c) => (
                <option key={`a-${c.id}`} value={c.id}>
                  {c.name} — {c.headline.slice(0, 45)}...
                </option>
              ))}
            </select>

            <div className="text-xs text-[#57534e] pt-1">
              <strong>Tempo:</strong> {candidateA.traits.intellectualTempo.replace("_", " ")} • <strong>Ethos:</strong> {candidateA.traits.workEthos.slice(0, 60)}...
            </div>
          </div>

          {/* Candidate B Card */}
          <div className="p-4 rounded-lg bg-[#faf8f5] border border-[#e7e2d7] space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs uppercase tracking-wider text-[#78716c] font-semibold">
                Candidate B (Counterpart)
              </span>
              <span className="text-[10px] font-mono text-[#991b1b]">Agent Double</span>
            </div>

            <select
              value={candidateBId}
              onChange={(e) => setCandidateBId(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded border border-[#e7e2d7] bg-[#ffffff] text-[#1c1917] focus:outline-none"
            >
              {CANDIDATES.map((c) => (
                <option key={`b-${c.id}`} value={c.id}>
                  {c.name} — {c.headline.slice(0, 45)}...
                </option>
              ))}
            </select>

            <div className="text-xs text-[#57534e] pt-1">
              <strong>Tempo:</strong> {candidateB.traits.intellectualTempo.replace("_", " ")} • <strong>Ethos:</strong> {candidateB.traits.workEthos.slice(0, 60)}...
            </div>
          </div>
        </div>

        {/* Optional Custom Activity */}
        <div>
          <label className="block text-xs font-mono uppercase tracking-wider text-[#57534e] mb-1.5">
            Proposed Activity (Optional Override)
          </label>
          <input
            type="text"
            value={customActivity}
            onChange={(e) => setCustomActivity(e.target.value)}
            placeholder="Leave empty to let agents negotiate based on shared hobbies..."
            className="w-full px-3 py-2 text-xs rounded border border-[#e7e2d7] bg-[#faf8f5] text-[#1c1917] focus:outline-none"
          />
        </div>

        {errorMsg && (
          <div className="p-3 rounded bg-[#fef2f2] border border-[#fecaca] text-xs text-[#991b1b]">
            {errorMsg}
          </div>
        )}

        {/* Launch Button */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleStartSimulation}
            disabled={isSimulating}
            className="editorial-button editorial-button-primary text-xs uppercase tracking-wider py-2.5 px-6 flex items-center gap-2"
          >
            <Play className="w-3.5 h-3.5" />
            <span>{isSimulating ? "Running Simulation..." : "Simulate 8-Turn Date"}</span>
          </button>

          {simulatedTranscript && (
            <button
              onClick={() => setSimulatedTranscript(null)}
              className="editorial-button editorial-button-secondary text-xs uppercase tracking-wider py-2.5 px-4 flex items-center gap-1.5"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset</span>
            </button>
          )}
        </div>
      </div>

      {/* Loading State Animation */}
      {isSimulating && (
        <div className="p-12 text-center rounded-xl bg-[#ffffff] border border-[#e7e2d7] space-y-4">
          <div className="w-8 h-8 rounded-full border-2 border-[#1c1917] border-t-transparent animate-spin mx-auto" />
          <h3 className="font-serif text-lg font-bold text-[#1c1917]">
            Agents Dating in Progress...
          </h3>
          <p className="text-xs font-mono text-[#78716c] max-w-md mx-auto">
            Simulating Phase 1–4 conversational turns • Invoking counterparty MCP tool endpoints • Computing deterministic JEV System 1 compatibility rubric
          </p>
        </div>
      )}

      {/* Simulation Transcript Display */}
      {simulatedTranscript && (
        <div className="space-y-8">
          {/* Activity Banner */}
          <div className="p-4 rounded-lg bg-[#ffffff] border border-[#e7e2d7] flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-[#f4efe6] text-[#991b1b] flex items-center justify-center flex-shrink-0">
              <Compass className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#78716c]">
                Negotiated Shared Activity
              </span>
              <p className="text-xs font-semibold text-[#1c1917]">
                {simulatedTranscript.activityProposed}
              </p>
            </div>
          </div>

          {/* 8-Turn Dialogue Stream */}
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-[#e7e2d7]">
              <h3 className="font-serif text-xl font-bold text-[#1c1917]">
                Turn-by-Turn Date Dialogue
              </h3>
              <span className="text-xs font-mono text-[#78716c]">
                8 turns completed
              </span>
            </div>

            <div className="space-y-3">
              {simulatedTranscript.turns.map((turn: DateTurn) => {
                const isSpeakerA = turn.speakerId === candidateA.id;
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
                          <span>MCP Tool Invocations: {turn.toolCall.tool}()</span>
                        </div>
                        <div className="text-[10px] text-[#a8a29e]">
                          Invoked by: {turn.toolCall.invokedBy} &rarr; Target: {turn.toolCall.targetCandidate}
                        </div>
                        <pre className="text-[10px] text-[#f5f2eb] overflow-x-auto bg-[#292524] p-2 rounded max-h-32">
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
              Each agent reflects privately without influencing the partner&apos;s evaluation.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded bg-[#faf8f5] border border-[#e7e2d7] space-y-1.5">
                <span className="text-[11px] font-mono uppercase tracking-wider font-semibold text-[#1c1917]">
                  {candidateA.name}&apos;s Private Reflection
                </span>
                <p className="text-xs text-[#44403c] italic leading-relaxed">
                  &ldquo;{simulatedTranscript.reflections.candidateA_reflection}&rdquo;
                </p>
              </div>

              <div className="p-4 rounded bg-[#faf8f5] border border-[#e7e2d7] space-y-1.5">
                <span className="text-[11px] font-mono uppercase tracking-wider font-semibold text-[#1c1917]">
                  {candidateB.name}&apos;s Private Reflection
                </span>
                <p className="text-xs text-[#44403c] italic leading-relaxed">
                  &ldquo;{simulatedTranscript.reflections.candidateB_reflection}&rdquo;
                </p>
              </div>
            </div>
          </div>

          {/* Deterministic JEV System 1 Rubric Breakdown */}
          <JevRubricDisplay
            evaluation={simulatedTranscript.jevEvaluation}
            personAName={candidateA.name}
            personBName={candidateB.name}
          />
        </div>
      )}
    </div>
  );
}
