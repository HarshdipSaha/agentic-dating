import { NextRequest, NextResponse } from "next/server";
import { CANDIDATES } from "@/data/candidates";
import { getCandidateById } from "@/lib/mcp";
import { simulateFullDate } from "@/lib/simulation";
import { CandidatePerson } from "@/types";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      candidateAId,
      candidateBId,
      customCandidateA,
      customCandidateB,
      activity,
    } = body;

    let personA: CandidatePerson | undefined = customCandidateA;
    if (!personA && candidateAId) {
      personA = getCandidateById(candidateAId);
    }

    let personB: CandidatePerson | undefined = customCandidateB;
    if (!personB && candidateBId) {
      personB = getCandidateById(candidateBId);
    }

    if (!personA || !personB) {
      return NextResponse.json(
        {
          error: "Two valid candidates are required to simulate a date.",
          received: { candidateAId, candidateBId },
        },
        { status: 400 }
      );
    }

    if (personA.id === personB.id) {
      return NextResponse.json(
        { error: "Cannot simulate a date between the same person." },
        { status: 400 }
      );
    }

    const transcript = await simulateFullDate(personA, personB, activity);

    return NextResponse.json({
      success: true,
      transcript,
    });
  } catch (err) {
    console.error("Simulation error:", err);
    return NextResponse.json(
      { error: "Simulation failed", details: String(err) },
      { status: 500 }
    );
  }
}
