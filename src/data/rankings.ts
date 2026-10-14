import { CANDIDATES } from "./candidates";
import { CandidatePerson, PersonRankings, RankedMatch } from "@/types";
import { computeDeterministicHeuristic } from "@/lib/jev";

// Cache for generated rankings
let cachedCohortRankings: PersonRankings[] | null = null;

export function generateCohortRankings(extraCandidates?: CandidatePerson[]): PersonRankings[] {
  const cohort = extraCandidates ? [...CANDIDATES, ...extraCandidates] : CANDIDATES;

  return cohort.map((subject) => {
    const matches: RankedMatch[] = [];

    for (const counterpart of cohort) {
      if (counterpart.id === subject.id) continue;

      const jevEval = computeDeterministicHeuristic(subject, counterpart, "");

      // Top shared interest
      const sharedTrait =
        subject.traits.passions.find((p) =>
          counterpart.traits.passions.some((cp) => cp.label.toLowerCase().includes(p.label.toLowerCase()))
        )?.label ||
        subject.traits.hobbies[0]?.label ||
        "Entrepreneurial Agency";

      // Primary friction point
      const friction =
        jevEval.dealbreaker_status.value === "critical_clash"
          ? "Value divergence in life vision"
          : jevEval.lifestyle_harmony.value === "manageable_friction"
          ? "Pacing difference between daily routines"
          : "Demanding travel schedules";

      matches.push({
        candidateId: counterpart.id,
        candidateName: counterpart.name,
        headline: counterpart.headline,
        avatarFallback: counterpart.avatarFallback,
        compositeScore: jevEval.compositeScore,
        reciprocalBalanceScore: jevEval.reciprocalBalanceScore,
        directionalScore: jevEval.directionalScores.personA_to_personB,
        reverseScore: jevEval.directionalScores.personB_to_personA,
        lifestyleHarmonyLabel: jevEval.lifestyle_harmony.label,
        intellectualPaceLabel: jevEval.intellectual_pace.label,
        dealbreakerStatus: jevEval.dealbreaker_status.label,
        topSharedInterest: sharedTrait,
        primaryFrictionPoint: friction,
        dateTranscriptId: `date-${subject.id}-${counterpart.id}`,
      });
    }

    // Sort by composite score descending
    matches.sort((a, b) => b.compositeScore - a.compositeScore);

    return {
      subjectId: subject.id,
      subjectName: subject.name,
      updatedAt: new Date().toISOString(),
      rankedMatches: matches,
    };
  });
}

export function getRankingsForPerson(personId: string): PersonRankings | undefined {
  if (!cachedCohortRankings) {
    cachedCohortRankings = generateCohortRankings();
  }
  return cachedCohortRankings.find(
    (r) => r.subjectId.toLowerCase() === personId.toLowerCase()
  );
}

export function getAllCohortRankings(): PersonRankings[] {
  if (!cachedCohortRankings) {
    cachedCohortRankings = generateCohortRankings();
  }
  return cachedCohortRankings;
}
