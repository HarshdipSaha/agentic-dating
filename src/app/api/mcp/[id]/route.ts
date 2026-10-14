import { NextRequest, NextResponse } from "next/server";
import { CANDIDATES } from "@/data/candidates";
import { executeCandidateMCPTool, STANDARD_MCP_TOOLS, getCandidateById } from "@/lib/mcp";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const candidate = getCandidateById(id);

  if (!candidate) {
    return NextResponse.json(
      {
        error: `Candidate "${id}" not found.`,
        availableCandidates: CANDIDATES.map((c) => ({ id: c.id, name: c.name })),
      },
      { status: 404 }
    );
  }

  return NextResponse.json({
    mcpServer: `Personal MCP Server for ${candidate.name}`,
    version: "2.0.0",
    protocol: "model-context-protocol/1.0",
    candidate: {
      id: candidate.id,
      name: candidate.name,
      headline: candidate.headline,
      sources: {
        linkedin: candidate.linkedinUrl,
        instagram: candidate.instagramUrl,
      },
    },
    tools: STANDARD_MCP_TOOLS,
  });
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const candidate = getCandidateById(id);

  if (!candidate) {
    return NextResponse.json(
      { error: `Candidate "${id}" not found.` },
      { status: 404 }
    );
  }

  try {
    const body = await request.json();
    const { tool, params: toolParams = {}, invokedBy } = body;

    if (!tool) {
      return NextResponse.json(
        { error: "Missing required parameter: tool" },
        { status: 400 }
      );
    }

    const { response, receipt } = executeCandidateMCPTool(
      candidate,
      tool,
      toolParams,
      invokedBy
    );

    return NextResponse.json({
      success: true,
      candidateId: candidate.id,
      candidateName: candidate.name,
      tool,
      result: response,
      receipt,
    });
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to execute tool", details: String(err) },
      { status: 500 }
    );
  }
}
