import { NextRequest, NextResponse } from "next/server";
import { analyzeCandidateUrls } from "@/lib/profileEngine";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, linkedinUrl, instagramUrl } = body;

    if (!linkedinUrl || !instagramUrl) {
      return NextResponse.json(
        { error: "Both official LinkedIn URL and public Instagram URL are required." },
        { status: 400 }
      );
    }

    const result = analyzeCandidateUrls({
      name,
      linkedinUrl,
      instagramUrl,
    });

    if (!result.success || !result.candidate) {
      return NextResponse.json(
        { error: "Validation and ingestion failed", errors: result.errors },
        { status: 422 }
      );
    }

    return NextResponse.json({
      success: true,
      candidate: result.candidate,
      mcpEndpoint: `/api/mcp/${result.candidate.id}`,
    });
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to import profile", details: String(err) },
      { status: 500 }
    );
  }
}
