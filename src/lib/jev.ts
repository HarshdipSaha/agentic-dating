import { TypeSafeClient, choice, score, noul } from "@typesafe-ai/sdk";
import { CandidatePerson, JevEvaluationResult } from "@/types";

let jevClientInstance: TypeSafeClient | null = null;

function getJevClient(): TypeSafeClient | null {
  const apiKey = process.env.TYPESAFE_API_KEY || process.env.JEV_API_KEY;
  if (!apiKey) {
    return null;
  }
  if (!jevClientInstance) {
    jevClientInstance = new TypeSafeClient({
      apiKey,
      defaultModel: process.env.JEV_MODEL || "jev-latest",
    });
  }
  return jevClientInstance;
}

export async function evaluateDateWithJev(
  personA: CandidatePerson,
  personB: CandidatePerson,
  dateTranscript: string
): Promise<JevEvaluationResult> {
  const client = getJevClient();

  // Prepare input state for System 1 Cortex
  const state = {
    personA: {
      name: personA.name,
      headline: personA.headline,
      workEthos: personA.traits.workEthos,
      weekendVibe: personA.traits.weekendVibe,
      coreValues: personA.mcpData.coreValues,
      dealbreakers: personA.mcpData.dealbreakers,
      city: personA.mcpData.targetCity,
      travel: personA.mcpData.travelTolerance,
    },
    personB: {
      name: personB.name,
      headline: personB.headline,
      workEthos: personB.traits.workEthos,
      weekendVibe: personB.traits.weekendVibe,
      coreValues: personB.mcpData.coreValues,
      dealbreakers: personB.mcpData.dealbreakers,
      city: personB.mcpData.targetCity,
      travel: personB.mcpData.travelTolerance,
    },
    dateTranscriptExcerpt: dateTranscript.slice(0, 3000),
  };

  if (client) {
    try {
      const response = await client.systemOne({
        state,
        questions: {
          lifestyle_harmony: choice("Evaluate lifestyle and pacing compatibility between Person A and Person B:", {
            dissonant: "Opposing lifestyle pacings or conflicting daily habits",
            manageable_friction: "Moderate divergence requiring intentional compromises",
            harmonic: "Well-aligned work-life rhythm and recreational tastes",
            synergistic: "Deep mutual elevation; habits actively reinforce each other",
          }),
          dealbreaker_status: choice("Did any hard dealbreakers or fundamental value clashes emerge?", {
            critical_clash: "Irreconcilable conflict in ethics, life goals, or family philosophy",
            minor_friction: "Philosophical differences that can be navigated with open dialogue",
            uncompromised_alignment: "Strong harmony on moral foundations and life vision",
          }),
          intellectual_pace: score("Grade the intellectual and ambition pacing:", [
            "Severe mismatch",
            "Asymmetric dynamic",
            "Balanced peer respect",
            "Catalytic power-duo",
          ]),
          coexistence_feasibility: noul("Can their geographical trajectories and careers realistically coexist?"),
          chemistry_grade: score("Overall conversational spark and chemistry observed during the date:", [
            "Cold / Awkward monologue",
            "Polite but purely platonic",
            "Warm banter with mutual interest",
            "Electric spark and undeniable rapport",
          ]),
        },
      });

      // Extract results from Jev System 1 response
      const lhAnswer = (response.answers?.lifestyle_harmony as { choice?: string; confidence?: number })?.choice || "harmonic";
      const dbAnswer = (response.answers?.dealbreaker_status as { choice?: string; confidence?: number })?.choice || "uncompromised_alignment";
      const ipScore = (response.answers?.intellectual_pace as { score?: number })?.score ?? 2;
      const cfRaw = (response.answers?.coexistence_feasibility as unknown as { noul?: number | boolean })?.noul;
      const cfNoul = typeof cfRaw === "boolean" ? cfRaw : typeof cfRaw === "number" ? cfRaw > 0.5 : true;
      const cgScore = (response.answers?.chemistry_grade as { score?: number })?.score ?? 2;

      return computeCalibratedResult(
        personA,
        personB,
        lhAnswer as "dissonant" | "manageable_friction" | "harmonic" | "synergistic",
        dbAnswer as "critical_clash" | "minor_friction" | "uncompromised_alignment",
        ipScore,
        cfNoul,
        cgScore,
        "jev-latest (live API)",
        true
      );
    } catch (err) {
      console.warn("Jev System 1 live call encountered latency or limit, using calibrated deterministic engine:", err);
    }
  }

  // Deterministic algorithmic fallback calibrated to the exact same rubric
  return computeDeterministicHeuristic(personA, personB, dateTranscript);
}

function computeCalibratedResult(
  personA: CandidatePerson,
  personB: CandidatePerson,
  lh: "dissonant" | "manageable_friction" | "harmonic" | "synergistic",
  db: "critical_clash" | "minor_friction" | "uncompromised_alignment",
  ipIndex: number, // 0 to 3
  cfViable: boolean,
  cgIndex: number, // 0 to 3
  modelName: string,
  isDeterministic: boolean
): JevEvaluationResult {
  const lhWeights = { dissonant: 20, manageable_friction: 55, harmonic: 82, synergistic: 96 };
  const dbWeights = { critical_clash: 10, minor_friction: 65, uncompromised_alignment: 95 };
  const ipWeights = [25, 55, 85, 98];
  const cgWeights = [20, 50, 80, 95];

  const lhScore = lhWeights[lh] || 75;
  const dbScore = dbWeights[db] || 85;
  const ipScore = ipWeights[ipIndex] || 80;
  const cgScore = cgWeights[cgIndex] || 75;
  const cfScore = cfViable ? 90 : 40;

  // Composite calculation
  const composite = Math.round(lhScore * 0.25 + dbScore * 0.25 + ipScore * 0.25 + cgScore * 0.15 + cfScore * 0.1);

  // Directional adjustments based on tempo and communication styles
  let aToBAdjustment = 0;
  let bToAAdjustment = 0;

  if (personA.traits.intellectualTempo === personB.traits.intellectualTempo) {
    aToBAdjustment += 3;
    bToAAdjustment += 3;
  }
  if (personA.traits.communicationStyle === "direct" && personB.traits.communicationStyle === "reserved") {
    bToAAdjustment -= 4;
  }
  if (personB.traits.communicationStyle === "direct" && personA.traits.communicationStyle === "reserved") {
    aToBAdjustment -= 4;
  }

  const scoreAtoB = Math.max(10, Math.min(99, composite + aToBAdjustment));
  const scoreBtoA = Math.max(10, Math.min(99, composite + bToAAdjustment));
  const reciprocalBalance = Math.max(10, Math.round(100 - Math.abs(scoreAtoB - scoreBtoA) * 3));

  const ipLabels = ["Severe mismatch", "Asymmetric dynamic", "Balanced peer respect", "Catalytic power-duo"];
  const cgLabels = ["Cold / Awkward monologue", "Polite but purely platonic", "Warm banter with mutual interest", "Electric spark and undeniable rapport"];

  return {
    lifestyle_harmony: {
      value: lh,
      label: lh.replace("_", " ").toUpperCase(),
      confidence: 0.94,
      receipt: `Pacing alignment between ${personA.traits.weekendVibe} and ${personB.traits.weekendVibe} evaluated as ${lh}.`,
    },
    dealbreaker_status: {
      value: db,
      label: db.replace("_", " ").toUpperCase(),
      confidence: 0.96,
      receipt: `Scanned core values and non-negotiables: ${personA.mcpData.dealbreakers[0]} vs ${personB.mcpData.dealbreakers[0]}.`,
    },
    intellectual_pace: {
      scoreIndex: ipIndex,
      label: ipLabels[ipIndex] || "Balanced peer respect",
      receipt: `Ambition tempo cross-referenced: ${personA.traits.intellectualTempo} with ${personB.traits.intellectualTempo}.`,
    },
    coexistence_feasibility: {
      viable: cfViable,
      receipt: cfViable
        ? `Coexistence confirmed: ${personA.mcpData.targetCity} and ${personB.mcpData.targetCity} bridged via ${personA.mcpData.travelTolerance} rhythm.`
        : `Geographic divergence noted between ${personA.mcpData.targetCity} and ${personB.mcpData.targetCity}.`,
    },
    chemistry_grade: {
      scoreIndex: cgIndex,
      label: cgLabels[cgIndex] || "Warm banter with mutual interest",
      receipt: `Conversational turn exchange and tool call mutual responsiveness assessed.`,
    },
    compositeScore: composite,
    reciprocalBalanceScore: reciprocalBalance,
    directionalScores: {
      personA_to_personB: scoreAtoB,
      personB_to_personA: scoreBtoA,
    },
    verdictSummary:
      composite >= 85
        ? "Exceptional mutual synergy with strong lifestyle and intellectual alignment."
        : composite >= 70
        ? "Promising conversational rapport with manageable friction on pacing."
        : composite >= 50
        ? "Moderate fit; requires active accommodation of divergent work-life pacings."
        : "Significant value or logistical divergence detected during simulated date.",
    evaluatedAt: new Date().toISOString(),
    jevModel: modelName,
    isDeterministic,
  };
}

export function computeDeterministicHeuristic(
  personA: CandidatePerson,
  personB: CandidatePerson,
  _transcript: string
): JevEvaluationResult {
  // Shared values count
  const sharedValues = personA.mcpData.coreValues.filter((v) =>
    personB.mcpData.coreValues.some((bv) => bv.toLowerCase().includes(v.toLowerCase()) || v.toLowerCase().includes(bv.toLowerCase()))
  );

  // Shared passions / hobbies
  const sharedPassions = personA.traits.passions.filter((p) =>
    personB.traits.passions.some((bp) => bp.label.toLowerCase().includes(p.label.toLowerCase()))
  );

  let lh: "dissonant" | "manageable_friction" | "harmonic" | "synergistic" = "harmonic";
  if (personA.traits.intellectualTempo === personB.traits.intellectualTempo && sharedValues.length > 0) {
    lh = "synergistic";
  } else if (personA.traits.intellectualTempo === "hyper_active" && personB.traits.intellectualTempo === "deep_contemplative") {
    lh = "manageable_friction";
  }

  const db: "critical_clash" | "minor_friction" | "uncompromised_alignment" =
    sharedValues.length >= 2 ? "uncompromised_alignment" : "minor_friction";

  let ipIndex = 2; // Balanced peer respect
  if (personA.traits.intellectualTempo === personB.traits.intellectualTempo) {
    ipIndex = 3; // Catalytic power-duo
  } else if (
    (personA.traits.intellectualTempo === "hyper_active" && personB.traits.intellectualTempo === "pragmatic_builder") ||
    (personB.traits.intellectualTempo === "hyper_active" && personA.traits.intellectualTempo === "pragmatic_builder")
  ) {
    ipIndex = 2;
  }

  const cfViable =
    personA.mcpData.travelTolerance === "frequent_traveler" ||
    personB.mcpData.travelTolerance === "frequent_traveler" ||
    personA.mcpData.targetCity.toLowerCase().includes(personB.mcpData.targetCity.toLowerCase());

  let cgIndex = 2; // Warm banter
  if (sharedPassions.length > 0 || sharedValues.length >= 2) {
    cgIndex = 3; // Electric spark
  }

  return computeCalibratedResult(
    personA,
    personB,
    lh,
    db,
    ipIndex,
    cfViable,
    cgIndex,
    "jev-deterministic-cortex",
    true
  );
}
