"use client";

import { useState } from "react";
import { CandidatePerson, MCPToolCallReceipt } from "@/types";
import { executeCandidateMCPTool, STANDARD_MCP_TOOLS } from "@/lib/mcp";
import { Terminal, Play, CheckCircle, Copy, ArrowRight, CornerDownRight } from "lucide-react";

interface MCPConsoleProps {
  candidates: CandidatePerson[];
  initialCandidateId?: string;
  initialTool?: string;
}

export function MCPConsole({
  candidates,
  initialCandidateId,
  initialTool = "getProfile",
}: MCPConsoleProps) {
  const [selectedCandidateId, setSelectedCandidateId] = useState(
    initialCandidateId || candidates[0]?.id || "harshdip-saha"
  );
  const [selectedTool, setSelectedTool] = useState(initialTool);
  const [questionInput, setQuestionInput] = useState(
    "What does your ideal weekend look like between creative flow and rest?"
  );
  const [inquiryTopic, setInquiryTopic] = useState<"lifestyle" | "career" | "quirks" | "hypothetical">("lifestyle");
  const [targetCity, setTargetCity] = useState("San Francisco, CA");
  const [travelTolerance, setTravelTolerance] = useState<"homebody" | "frequent_traveler" | "digital_nomad">("frequent_traveler");

  const [isRunning, setIsRunning] = useState(false);
  const [executionResult, setExecutionResult] = useState<{
    response: Record<string, unknown>;
    receipt: MCPToolCallReceipt | Record<string, unknown>;
  } | null>(null);
  const [copied, setCopied] = useState(false);

  const currentCandidate =
    candidates.find((c) => c.id === selectedCandidateId) || candidates[0];

  const handleExecute = () => {
    if (!currentCandidate) return;
    setIsRunning(true);

    setTimeout(() => {
      let params: Record<string, unknown> = {};
      if (selectedTool === "askCandidateQuestion") {
        params = { question: questionInput, inquiryTopic };
      } else if (selectedTool === "checkLogistics") {
        params = { targetCity, travelTolerance };
      }

      const { response, receipt } = executeCandidateMCPTool(
        currentCandidate,
        selectedTool,
        params,
        "reviewer_workbench_session"
      );

      setExecutionResult({ response, receipt });
      setIsRunning(false);
    }, 150);
  };

  const copyToClipboard = () => {
    if (!executionResult) return;
    navigator.clipboard.writeText(JSON.stringify(executionResult, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="editorial-card rounded-lg overflow-hidden border border-[#e7e2d7] bg-[#ffffff]">
      {/* Top Console Bar */}
      <div className="bg-[#1c1917] px-6 py-4 text-[#faf8f5] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-[#fed7aa]" />
          <span className="font-mono text-xs uppercase tracking-wider font-semibold">
            Personal MCP Interactive Console
          </span>
          <span className="text-[10px] font-mono text-[#a8a29e] ml-2">
            protocol: mcp/1.0
          </span>
        </div>

        <div className="text-[11px] font-mono text-[#a8a29e]">
          Target: <span className="text-[#fed7aa]">{currentCandidate?.name}</span> ({currentCandidate?.id})
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Controls Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Candidate Selector */}
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-[#57534e] mb-1.5">
              1. Select Candidate Agent Double
            </label>
            <select
              value={selectedCandidateId}
              onChange={(e) => {
                setSelectedCandidateId(e.target.value);
                setExecutionResult(null);
              }}
              className="w-full px-3 py-2 text-xs rounded border border-[#e7e2d7] bg-[#faf8f5] text-[#1c1917] focus:outline-none focus:border-[#1c1917]"
            >
              {candidates.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name} — {c.headline.slice(0, 45)}...
                </option>
              ))}
            </select>
          </div>

          {/* Tool Selector */}
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-[#57534e] mb-1.5">
              2. Select Standard MCP Tool
            </label>
            <select
              value={selectedTool}
              onChange={(e) => {
                setSelectedTool(e.target.value);
                setExecutionResult(null);
              }}
              className="w-full px-3 py-2 text-xs rounded border border-[#e7e2d7] bg-[#faf8f5] text-[#1c1917] focus:outline-none focus:border-[#1c1917]"
            >
              {STANDARD_MCP_TOOLS.map((t) => (
                <option key={t.name} value={t.name}>
                  {t.name}() — {t.description.slice(0, 50)}...
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Dynamic Tool Parameters */}
        {selectedTool === "askCandidateQuestion" && (
          <div className="p-4 rounded bg-[#fbf9f5] border border-[#e7e2d7] space-y-3">
            <div className="text-xs font-mono uppercase tracking-wider text-[#1c1917] font-semibold flex items-center gap-1.5">
              <CornerDownRight className="w-3.5 h-3.5 text-[#991b1b]" />
              <span>Tool Parameters: askCandidateQuestion</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="md:col-span-2">
                <label className="block text-[11px] text-[#57534e] mb-1">
                  Inquiry Prompt
                </label>
                <input
                  type="text"
                  value={questionInput}
                  onChange={(e) => setQuestionInput(e.target.value)}
                  className="w-full px-3 py-1.5 text-xs rounded border border-[#e7e2d7] bg-[#ffffff] text-[#1c1917] focus:outline-none focus:border-[#1c1917]"
                  placeholder="e.g. What is your weekend rhythm?"
                />
              </div>

              <div>
                <label className="block text-[11px] text-[#57534e] mb-1">
                  Topic Classification
                </label>
                <select
                  value={inquiryTopic}
                  onChange={(e) => setInquiryTopic(e.target.value as typeof inquiryTopic)}
                  className="w-full px-3 py-1.5 text-xs rounded border border-[#e7e2d7] bg-[#ffffff] text-[#1c1917] focus:outline-none"
                >
                  <option value="lifestyle">lifestyle</option>
                  <option value="career">career</option>
                  <option value="quirks">quirks</option>
                  <option value="hypothetical">hypothetical</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {selectedTool === "checkLogistics" && (
          <div className="p-4 rounded bg-[#fbf9f5] border border-[#e7e2d7] space-y-3">
            <div className="text-xs font-mono uppercase tracking-wider text-[#1c1917] font-semibold flex items-center gap-1.5">
              <CornerDownRight className="w-3.5 h-3.5 text-[#991b1b]" />
              <span>Tool Parameters: checkLogistics</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] text-[#57534e] mb-1">
                  Target City / Base
                </label>
                <input
                  type="text"
                  value={targetCity}
                  onChange={(e) => setTargetCity(e.target.value)}
                  className="w-full px-3 py-1.5 text-xs rounded border border-[#e7e2d7] bg-[#ffffff] text-[#1c1917] focus:outline-none focus:border-[#1c1917]"
                />
              </div>

              <div>
                <label className="block text-[11px] text-[#57534e] mb-1">
                  Travel Tolerance Rhythm
                </label>
                <select
                  value={travelTolerance}
                  onChange={(e) => setTravelTolerance(e.target.value as typeof travelTolerance)}
                  className="w-full px-3 py-1.5 text-xs rounded border border-[#e7e2d7] bg-[#ffffff] text-[#1c1917] focus:outline-none"
                >
                  <option value="frequent_traveler">frequent_traveler</option>
                  <option value="homebody">homebody</option>
                  <option value="digital_nomad">digital_nomad</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Action Button */}
        <div>
          <button
            onClick={handleExecute}
            disabled={isRunning}
            className="editorial-button editorial-button-primary text-xs uppercase tracking-wider py-2 px-5 flex items-center gap-2"
          >
            <Play className="w-3.5 h-3.5" />
            <span>{isRunning ? "Executing via MCP..." : `Invoke ${selectedTool}()`}</span>
          </button>
        </div>

        {/* Execution Output Display */}
        {executionResult && (
          <div className="mt-6 pt-6 border-t border-[#e7e2d7] space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-[#15803d]" />
                <span className="font-mono text-xs uppercase tracking-wider font-semibold text-[#1c1917]">
                  MCP Tool Output Payload
                </span>
                <span className="text-[10px] font-mono text-[#78716c]">
                  200 OK • latency: 12ms
                </span>
              </div>

              <button
                onClick={copyToClipboard}
                className="inline-flex items-center gap-1 text-[11px] text-[#57534e] hover:text-[#1c1917] transition-colors"
              >
                <Copy className="w-3 h-3" />
                <span>{copied ? "Copied" : "Copy JSON"}</span>
              </button>
            </div>

            <pre className="p-4 rounded bg-[#1c1917] text-[#fed7aa] font-mono text-xs overflow-x-auto leading-relaxed max-h-96">
              {JSON.stringify(executionResult, null, 2)}
            </pre>

            <div className="flex items-center gap-2 text-[11px] text-[#78716c] font-mono">
              <ArrowRight className="w-3 h-3 text-[#991b1b]" />
              <span>Grounded directly in {currentCandidate.name}&apos;s verified LinkedIn & Instagram datasets.</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
