export interface SourceEvidence {
  platform: "linkedin" | "instagram";
  url: string;
  capturedAt: string;
  status: "VERIFIED_PUBLIC" | "UNVERIFIED_REQUIRES_REVIEW";
  evidenceText: string;
  accountHandle: string;
}

export interface ExtractedTrait {
  label: string;
  category: "interest" | "hobby" | "passion" | "work_ethos";
  evidence: string;
  source: "linkedin" | "instagram" | "cross_verified";
  confidence: "high" | "moderate";
}

export interface CandidatePerson {
  id: string; // url-friendly slug
  name: string;
  headline: string;
  bio: string;
  location: string;
  industry: string;
  avatarFallback: string; // 2-letter uppercase initials
  linkedinUrl: string;
  instagramUrl: string;
  verificationStatus: "VERIFIED" | "PENDING";
  verificationDetails: string;
  sources: {
    linkedin: SourceEvidence;
    instagram: SourceEvidence;
  };
  traits: {
    passions: ExtractedTrait[];
    hobbies: ExtractedTrait[];
    workEthos: string;
    weekendVibe: string;
    communicationStyle: "direct" | "analytical" | "expressive" | "reserved";
    intellectualTempo: "hyper_active" | "deep_contemplative" | "pragmatic_builder" | "high_energy_catalyst";
    honestUnknowns: string[]; // explicit unknown relationship intentions, ungrounded private preferences
  };
  mcpData: {
    education: string[];
    currentRoles: string[];
    creativeOutlets: string[];
    favoriteAesthetics: string[];
    culturalDiet: {
      books: string[];
      music: string[];
      podcasts: string[];
    };
    coreValues: string[];
    dealbreakers: string[];
    conflictResolutionPreference: string;
    longTermAspirations: string;
    targetCity: string;
    travelTolerance: "homebody" | "frequent_traveler" | "digital_nomad";
  };
}

export interface MCPToolCallReceipt {
  tool: "getProfile" | "getInterestsAndHobbies" | "getValuesAndDealbreakers" | "askCandidateQuestion" | "checkLogistics";
  invokedBy: string; // candidate id
  targetCandidate: string; // candidate id
  params?: Record<string, unknown>;
  response: Record<string, unknown>;
  timestamp: string;
}

export interface DateTurn {
  turnNumber: number; // 1 to 8
  phase: "introduction" | "activity_exploration" | "concrete_tradeoff" | "reflection";
  speakerId: string;
  speakerName: string;
  content: string;
  toolCall?: MCPToolCallReceipt;
}

export interface JevEvaluationResult {
  lifestyle_harmony: {
    value: "dissonant" | "manageable_friction" | "harmonic" | "synergistic";
    label: string;
    confidence: number;
    receipt: string;
  };
  dealbreaker_status: {
    value: "critical_clash" | "minor_friction" | "uncompromised_alignment";
    label: string;
    confidence: number;
    receipt: string;
  };
  intellectual_pace: {
    scoreIndex: number; // 0 to 3
    label: string;
    receipt: string;
  };
  coexistence_feasibility: {
    viable: boolean;
    receipt: string;
  };
  chemistry_grade: {
    scoreIndex: number; // 0 to 3
    label: string;
    receipt: string;
  };
  compositeScore: number; // 0 to 100
  reciprocalBalanceScore: number; // 0 to 100
  directionalScores: {
    personA_to_personB: number; // 0 to 100
    personB_to_personA: number; // 0 to 100
  };
  verdictSummary: string;
  evaluatedAt: string;
  jevModel: string;
  isDeterministic: boolean;
}

export interface DateTranscript {
  id: string; // e.g. "date-harshdip-saha-ali-abdaal"
  candidateA: CandidatePerson;
  candidateB: CandidatePerson;
  createdAt: string;
  activityProposed: string;
  turns: DateTurn[];
  reflections: {
    candidateA_reflection: string;
    candidateB_reflection: string;
  };
  jevEvaluation: JevEvaluationResult;
}

export interface RankedMatch {
  candidateId: string;
  candidateName: string;
  headline: string;
  avatarFallback: string;
  compositeScore: number; // 0 to 100
  reciprocalBalanceScore: number;
  directionalScore: number; // Subject's rating of Counterpart
  reverseScore: number; // Counterpart's rating of Subject
  lifestyleHarmonyLabel: string;
  intellectualPaceLabel: string;
  dealbreakerStatus: string;
  topSharedInterest: string;
  primaryFrictionPoint: string;
  dateTranscriptId: string;
}

export interface PersonRankings {
  subjectId: string;
  subjectName: string;
  updatedAt: string;
  rankedMatches: RankedMatch[];
}
