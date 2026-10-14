import { JevEvaluationResult } from "@/types";
import { Cpu, CheckCircle, Scale, ShieldCheck, Zap, Compass, MapPin } from "lucide-react";

interface JevRubricDisplayProps {
  evaluation: JevEvaluationResult;
  personAName: string;
  personBName: string;
}

export function JevRubricDisplay({ evaluation, personAName, personBName }: JevRubricDisplayProps) {
  return (
    <div className="editorial-card rounded-lg p-6 bg-[#ffffff]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-[#e7e2d7]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1 rounded bg-[#1c1917] text-[#ffffff]">
              <Cpu className="w-3.5 h-3.5" />
            </span>
            <span className="text-[11px] uppercase tracking-widest font-mono text-[#78716c]">
              System 1 Cortex Evaluation
            </span>
            <span className="editorial-badge text-[10px] bg-[#f4efe6] text-[#1c1917]">
              {evaluation.jevModel}
            </span>
          </div>
          <h3 className="font-serif text-lg font-bold text-[#1c1917]">
            Deterministic Compatibility Rubric
          </h3>
        </div>

        {/* Big Composite & Reciprocal Scores */}
        <div className="flex items-center gap-4">
          <div className="text-right">
            <div className="text-[10px] uppercase tracking-wider text-[#78716c] font-mono">
              Composite Fit
            </div>
            <div className="font-serif text-3xl font-bold text-[#991b1b] leading-tight">
              {evaluation.compositeScore}
              <span className="text-sm font-normal text-[#78716c]">/100</span>
            </div>
          </div>

          <div className="h-9 w-px bg-[#e7e2d7]" />

          <div className="text-right">
            <div className="text-[10px] uppercase tracking-wider text-[#78716c] font-mono">
              Reciprocal Balance
            </div>
            <div className="font-serif text-3xl font-bold text-[#1c1917] leading-tight">
              {evaluation.reciprocalBalanceScore}
              <span className="text-sm font-normal text-[#78716c]">/100</span>
            </div>
          </div>
        </div>
      </div>

      {/* Directional Comparison */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-5 p-4 rounded bg-[#fbf9f5] border border-[#e7e2d7]">
        <div className="flex items-center justify-between">
          <span className="text-xs text-[#57534e]">
            {personAName} &rarr; {personBName}:
          </span>
          <span className="font-mono text-sm font-semibold text-[#1c1917]">
            {evaluation.directionalScores.personA_to_personB}/100
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-xs text-[#57534e]">
            {personBName} &rarr; {personAName}:
          </span>
          <span className="font-mono text-sm font-semibold text-[#1c1917]">
            {evaluation.directionalScores.personB_to_personA}/100
          </span>
        </div>
      </div>

      {/* Concrete JEV Rubric Criteria */}
      <div className="space-y-4 pt-1">
        {/* 1. Lifestyle Harmony */}
        <div className="p-3.5 rounded border border-[#e7e2d7] bg-[#ffffff] hover:border-[#1c1917]/20 transition-all">
          <div className="flex items-center justify-between mb-1.5">
            <div className="flex items-center gap-2">
              <Compass className="w-4 h-4 text-[#c2410c]" />
              <span className="text-xs font-semibold text-[#1c1917] uppercase tracking-wider font-mono">
                Lifestyle Harmony (choice)
              </span>
            </div>
            <span className="px-2 py-0.5 rounded text-[11px] font-mono font-medium bg-[#f5f2eb] text-[#1c1917] border border-[#e7e2d7]">
              {evaluation.lifestyle_harmony.label}
            </span>
          </div>
          <p className="text-xs text-[#57534e] leading-relaxed">
            {evaluation.lifestyle_harmony.receipt}
          </p>
        </div>

        {/* 2. Dealbreaker Status */}
        <div className="p-3.5 rounded border border-[#e7e2d7] bg-[#ffffff] hover:border-[#1c1917]/20 transition-all">
          <div className="flex items-center justify-between mb-1.5">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#15803d]" />
              <span className="text-xs font-semibold text-[#1c1917] uppercase tracking-wider font-mono">
                Dealbreaker Status (choice)
              </span>
            </div>
            <span className="px-2 py-0.5 rounded text-[11px] font-mono font-medium bg-[#f5f2eb] text-[#1c1917] border border-[#e7e2d7]">
              {evaluation.dealbreaker_status.label}
            </span>
          </div>
          <p className="text-xs text-[#57534e] leading-relaxed">
            {evaluation.dealbreaker_status.receipt}
          </p>
        </div>

        {/* 3. Intellectual & Ambition Pace */}
        <div className="p-3.5 rounded border border-[#e7e2d7] bg-[#ffffff] hover:border-[#1c1917]/20 transition-all">
          <div className="flex items-center justify-between mb-1.5">
            <div className="flex items-center gap-2">
              <Scale className="w-4 h-4 text-[#1c1917]" />
              <span className="text-xs font-semibold text-[#1c1917] uppercase tracking-wider font-mono">
                Intellectual & Ambition Pace (score)
              </span>
            </div>
            <span className="px-2 py-0.5 rounded text-[11px] font-mono font-medium bg-[#f5f2eb] text-[#1c1917] border border-[#e7e2d7]">
              Level {evaluation.intellectual_pace.scoreIndex + 1}/4: {evaluation.intellectual_pace.label}
            </span>
          </div>
          <p className="text-xs text-[#57534e] leading-relaxed">
            {evaluation.intellectual_pace.receipt}
          </p>
        </div>

        {/* 4. Coexistence Feasibility */}
        <div className="p-3.5 rounded border border-[#e7e2d7] bg-[#ffffff] hover:border-[#1c1917]/20 transition-all">
          <div className="flex items-center justify-between mb-1.5">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#0284c7]" />
              <span className="text-xs font-semibold text-[#1c1917] uppercase tracking-wider font-mono">
                Coexistence Feasibility (noul)
              </span>
            </div>
            <span
              className={`px-2 py-0.5 rounded text-[11px] font-mono font-medium border ${
                evaluation.coexistence_feasibility.viable
                  ? "bg-[#ecfdf5] text-[#065f46] border-[#a7f3d0]"
                  : "bg-[#fef2f2] text-[#991b1b] border-[#fecaca]"
              }`}
            >
              {evaluation.coexistence_feasibility.viable ? "VIABLE" : "GEOGRAPHIC FRICTION"}
            </span>
          </div>
          <p className="text-xs text-[#57534e] leading-relaxed">
            {evaluation.coexistence_feasibility.receipt}
          </p>
        </div>

        {/* 5. Date Chemistry */}
        <div className="p-3.5 rounded border border-[#e7e2d7] bg-[#ffffff] hover:border-[#1c1917]/20 transition-all">
          <div className="flex items-center justify-between mb-1.5">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-[#eab308]" />
              <span className="text-xs font-semibold text-[#1c1917] uppercase tracking-wider font-mono">
                Observed Conversational Chemistry (score)
              </span>
            </div>
            <span className="px-2 py-0.5 rounded text-[11px] font-mono font-medium bg-[#f5f2eb] text-[#1c1917] border border-[#e7e2d7]">
              {evaluation.chemistry_grade.label}
            </span>
          </div>
          <p className="text-xs text-[#57534e] leading-relaxed">
            {evaluation.chemistry_grade.receipt}
          </p>
        </div>
      </div>

      {/* Verdict Summary */}
      <div className="mt-5 p-4 rounded bg-[#f4efe6] border border-[#e7e2d7] flex items-start gap-3">
        <CheckCircle className="w-4 h-4 text-[#15803d] flex-shrink-0 mt-0.5" />
        <div>
          <div className="text-[11px] uppercase tracking-wider font-mono font-semibold text-[#1c1917]">
            Cortex Verdict Summary
          </div>
          <p className="text-xs text-[#44403c] mt-0.5 leading-relaxed">
            {evaluation.verdictSummary}
          </p>
        </div>
      </div>
    </div>
  );
}
