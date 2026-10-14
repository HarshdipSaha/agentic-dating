import { CANDIDATES } from "@/data/candidates";
import { CandidatePerson, MCPToolCallReceipt } from "@/types";

export interface MCPToolDefinition {
  name: string;
  description: string;
  parameters: Record<string, unknown>;
}

export const STANDARD_MCP_TOOLS: MCPToolDefinition[] = [
  {
    name: "getProfile",
    description: "Returns foundational persona: name, headline, bio, education, current roles, and verified public source links.",
    parameters: { type: "object", properties: {} },
  },
  {
    name: "getInterestsAndHobbies",
    description: "Returns lifestyle and leisure profile: passions, weekend vibe, creative outlets, aesthetic tastes, and cultural diet (books, music, podcasts).",
    parameters: { type: "object", properties: {} },
  },
  {
    name: "getValuesAndDealbreakers",
    description: "Returns relationship and ethical philosophy: core values, non-negotiable dealbreakers, communication style, conflict resolution approach, and long-term aspirations.",
    parameters: { type: "object", properties: {} },
  },
  {
    name: "askCandidateQuestion",
    description: "Submit a direct interactive inquiry to the candidate's digital double regarding career, lifestyle, philosophical hypothetical, or quirks.",
    parameters: {
      type: "object",
      properties: {
        question: { type: "string", description: "The specific question to ask the candidate" },
        inquiryTopic: {
          type: "string",
          enum: ["lifestyle", "career", "quirks", "hypothetical"],
          description: "Category of the question",
        },
      },
      required: ["question"],
    },
  },
  {
    name: "checkLogistics",
    description: "Evaluate geographical trajectory, city alignment, and travel tolerance compatibility.",
    parameters: {
      type: "object",
      properties: {
        targetCity: { type: "string", description: "Proposed base city or meeting location" },
        travelTolerance: {
          type: "string",
          enum: ["homebody", "frequent_traveler", "digital_nomad"],
          description: "Expected travel rhythm",
        },
      },
      required: ["targetCity"],
    },
  },
];

export function getCandidateById(candidateId: string, customList?: CandidatePerson[]): CandidatePerson | undefined {
  const pool = customList ? [...CANDIDATES, ...customList] : CANDIDATES;
  return pool.find((c) => c.id.toLowerCase() === candidateId.toLowerCase() || c.name.toLowerCase() === candidateId.toLowerCase());
}

export function executeCandidateMCPTool(
  candidate: CandidatePerson,
  toolName: string,
  params: Record<string, unknown> = {},
  invokedById?: string
): { response: Record<string, unknown>; receipt: MCPToolCallReceipt } {
  let response: Record<string, unknown> = {};

  switch (toolName) {
    case "getProfile": {
      response = {
        name: candidate.name,
        headline: candidate.headline,
        bio: candidate.bio,
        location: candidate.location,
        industry: candidate.industry,
        education: candidate.mcpData.education,
        currentRoles: candidate.mcpData.currentRoles,
        publicLinks: {
          linkedin: candidate.linkedinUrl,
          instagram: candidate.instagramUrl,
        },
        verificationStatus: candidate.verificationStatus,
        verificationEvidence: candidate.verificationDetails,
      };
      break;
    }

    case "getInterestsAndHobbies": {
      response = {
        passions: candidate.traits.passions.map((p) => p.label),
        hobbies: candidate.traits.hobbies.map((h) => h.label),
        weekendVibe: candidate.traits.weekendVibe,
        creativeOutlets: candidate.mcpData.creativeOutlets,
        favoriteAesthetics: candidate.mcpData.favoriteAesthetics,
        culturalDiet: candidate.mcpData.culturalDiet,
      };
      break;
    }

    case "getValuesAndDealbreakers": {
      response = {
        coreValues: candidate.mcpData.coreValues,
        dealbreakers: candidate.mcpData.dealbreakers,
        communicationStyle: candidate.traits.communicationStyle,
        conflictResolutionPreference: candidate.mcpData.conflictResolutionPreference,
        longTermAspirations: candidate.mcpData.longTermAspirations,
        honestUnknowns: candidate.traits.honestUnknowns,
      };
      break;
    }

    case "askCandidateQuestion": {
      const q = String(params.question || "").toLowerCase();
      const topic = String(params.inquiryTopic || "general");

      // Check if question asks about ungrounded private preferences
      const isProbingUngrounded =
        q.includes("sexual") ||
        q.includes("religion") ||
        q.includes("marriage timeline") ||
        q.includes("kids immediately") ||
        q.includes("private bedroom");

      if (isProbingUngrounded) {
        response = {
          answer: `As an evidence-grounded agent for ${candidate.name}, I respect private boundaries. This area is not disclosed in official public sources and remains an honest unknown.`,
          comfortLevel: "deflected",
          boundaryNote: "Platform privacy contract strictly enforces absence of unverified private inferences.",
        };
      } else {
        // High-fidelity persona calibrated answer
        let answerText = "";
        if (q.includes("weekend") || q.includes("free time") || q.includes("saturday") || q.includes("sunday")) {
          answerText = `On a typical weekend, you will find me engaged in: ${candidate.traits.weekendVibe}. I also love ${candidate.mcpData.creativeOutlets.join(", ")}.`;
        } else if (q.includes("work") || q.includes("ambition") || q.includes("career") || q.includes("project")) {
          answerText = `My work ethos centers on: ${candidate.traits.workEthos}. Right now my main focus is ${candidate.mcpData.longTermAspirations}.`;
        } else if (q.includes("value") || q.includes("dealbreaker") || q.includes("conflict")) {
          answerText = `I hold strongly to ${candidate.mcpData.coreValues.join(", ")}. When friction arises, my approach is: ${candidate.mcpData.conflictResolutionPreference}.`;
        } else {
          answerText = `From ${candidate.name}'s perspective: I am deeply driven by ${candidate.traits.passions.map((p) => p.label).join(", ")}. In conversations, I value ${candidate.traits.communicationStyle} clarity and shared intellectual resonance.`;
        }

        response = {
          answer: answerText,
          comfortLevel: "enthusiastic",
          inquiryTopic: topic,
          groundedEvidenceSource: "official_profile_mcp",
        };
      }
      break;
    }

    case "checkLogistics": {
      const targetCity = String(params.targetCity || candidate.location);
      const tolerance = String(params.travelTolerance || candidate.mcpData.travelTolerance);

      const candidateBase = candidate.mcpData.targetCity.toLowerCase();
      const queryCity = targetCity.toLowerCase();
      const isCityMatch =
        candidateBase.includes(queryCity) ||
        queryCity.includes(candidateBase.split(",")[0].trim().toLowerCase()) ||
        candidate.mcpData.travelTolerance === "frequent_traveler" ||
        candidate.mcpData.travelTolerance === "digital_nomad";

      response = {
        compatible: isCityMatch,
        candidateCity: candidate.mcpData.targetCity,
        candidateTravelTolerance: candidate.mcpData.travelTolerance,
        notes: isCityMatch
          ? `High geographic flexibility. ${candidate.name} is based in ${candidate.mcpData.targetCity} with ${candidate.mcpData.travelTolerance} rhythm.`
          : `Potential geographic friction between ${candidate.mcpData.targetCity} and ${targetCity}. Requires intentional travel coordination.`,
      };
      break;
    }

    default: {
      response = {
        error: `Unknown tool "${toolName}". Available tools: getProfile, getInterestsAndHobbies, getValuesAndDealbreakers, askCandidateQuestion, checkLogistics`,
      };
    }
  }

  const receipt: MCPToolCallReceipt = {
    tool: toolName as MCPToolCallReceipt["tool"],
    invokedBy: invokedById || "reviewer_console",
    targetCandidate: candidate.id,
    params,
    response,
    timestamp: new Date().toISOString(),
  };

  return { response, receipt };
}
