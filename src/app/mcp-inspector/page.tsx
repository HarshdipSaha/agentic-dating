import { CANDIDATES } from "@/data/candidates";
import { MCPConsole } from "@/components/MCPConsole";
import { STANDARD_MCP_TOOLS } from "@/lib/mcp";
import { Terminal, Shield, ExternalLink, Code2, Cpu } from "lucide-react";

export default function MCPInspectorPage() {
  return (
    <div className="space-y-10 pb-16">
      {/* Page Header */}
      <div className="pb-6 border-b border-[#e7e2d7]">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#f4efe6] text-[10px] uppercase font-mono tracking-wider text-[#1c1917] border border-[#e7e2d7] mb-3">
          <Terminal className="w-3 h-3 text-[#991b1b]" />
          <span>Model Context Protocol</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#1c1917]">
          Personal MCP Server Workbench
        </h1>
        <p className="text-xs sm:text-sm text-[#57534e] mt-2 max-w-3xl leading-relaxed">
          Rather than harvesting personal data into a monolithic database, Twofold treats each individual
          as a sovereign agent hosting their own standard MCP server. Reviewers can test each person&apos;s
          digital double interactively below.
        </p>
      </div>

      {/* Reference Banner */}
      <div className="p-4 rounded-lg bg-[#ffffff] border border-[#e7e2d7] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded bg-[#1c1917] text-[#fed7aa] flex items-center justify-center font-mono">
            <Code2 className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-semibold text-[#1c1917]">
              Open-Source Reference Implementation: harshdipsaha-mcp
            </div>
            <p className="text-[11px] text-[#78716c]">
              Standardized tools for profile retrieval, project search, and privacy-tiered question answering.
            </p>
          </div>
        </div>

        <a
          href="https://github.com/HarshdipSaha/harshdipsaha-mcp"
          target="_blank"
          rel="noopener noreferrer"
          className="editorial-button editorial-button-secondary text-xs uppercase tracking-wider py-1.5 px-3 flex items-center gap-1.5 flex-shrink-0"
        >
          <span>View on GitHub</span>
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>

      {/* Interactive MCP Console Component */}
      <MCPConsole candidates={CANDIDATES} initialTool="getProfile" />

      {/* Tool Specifications Matrix */}
      <div className="p-8 rounded-xl bg-[#ffffff] border border-[#e7e2d7] space-y-6">
        <div>
          <h2 className="font-serif text-2xl font-bold text-[#1c1917]">
            Standardized MCP Tool Specifications
          </h2>
          <p className="text-xs text-[#57534e] mt-1">
            All 26 candidate agents strictly adhere to this uniform interface during dating simulations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {STANDARD_MCP_TOOLS.map((tool) => (
            <div key={tool.name} className="p-4 rounded bg-[#faf8f5] border border-[#e7e2d7] space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-[#991b1b]">
                  {tool.name}()
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#f4efe6] text-[#78716c]">
                  mcp tool
                </span>
              </div>
              <p className="text-xs text-[#57534e] leading-relaxed">
                {tool.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* API Endpoint Documentation */}
      <div className="p-8 rounded-xl bg-[#1c1917] text-[#faf8f5] space-y-4">
        <div className="flex items-center gap-2">
          <Cpu className="w-4 h-4 text-[#fed7aa]" />
          <h3 className="font-mono text-xs uppercase tracking-wider font-semibold text-[#fed7aa]">
            Direct REST API Access for Reviewers
          </h3>
        </div>

        <p className="text-xs text-[#a8a29e] leading-relaxed">
          The Twofold server exposes standard REST endpoints for programmatic curl testing:
        </p>

        <div className="space-y-3 font-mono text-xs">
          <div>
            <div className="text-[11px] text-[#78716c] mb-1"># 1. Inspect Server Schema & Tools</div>
            <pre className="p-3 rounded bg-[#292524] text-[#faf8f5] overflow-x-auto">
              curl -X GET http://localhost:3000/api/mcp/harshdip-saha
            </pre>
          </div>

          <div>
            <div className="text-[11px] text-[#78716c] mb-1"># 2. Invoke Candidate Tool Call</div>
            <pre className="p-3 rounded bg-[#292524] text-[#faf8f5] overflow-x-auto">
{`curl -X POST http://localhost:3000/api/mcp/harshdip-saha \\
  -H "Content-Type: application/json" \\
  -d '{"tool": "askCandidateQuestion", "params": {"question": "What is your weekend rhythm?"}}'`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
