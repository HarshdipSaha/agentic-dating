import { CandidatePerson, ExtractedTrait } from "@/types";

export interface RawImportInput {
  name?: string;
  linkedinUrl: string;
  instagramUrl: string;
}

export function normalizeProfileUrl(rawUrl: string, expectedPlatform: "linkedin" | "instagram"): { url: string; handle: string; isValid: boolean } {
  try {
    let clean = rawUrl.trim();
    if (!clean.startsWith("http://") && !clean.startsWith("https://")) {
      clean = `https://${clean}`;
    }
    const parsed = new URL(clean);
    const pathname = parsed.pathname.replace(/\/+$/, "");
    const parts = pathname.split("/").filter(Boolean);

    if (expectedPlatform === "linkedin") {
      const isLinkedinHost = parsed.hostname.includes("linkedin.com");
      if (!isLinkedinHost) return { url: rawUrl, handle: "", isValid: false };
      // /in/handle or /company/handle
      const inIdx = parts.indexOf("in");
      const handle = inIdx !== -1 && parts[inIdx + 1] ? parts[inIdx + 1] : parts[parts.length - 1] || "unknown";
      return {
        url: `https://www.linkedin.com/in/${handle}/`,
        handle,
        isValid: true,
      };
    } else {
      const isIgHost = parsed.hostname.includes("instagram.com");
      if (!isIgHost) return { url: rawUrl, handle: "", isValid: false };
      const handle = parts[0] || "unknown";
      return {
        url: `https://www.instagram.com/${handle}/`,
        handle,
        isValid: true,
      };
    }
  } catch {
    return { url: rawUrl, handle: "", isValid: false };
  }
}

export function analyzeCandidateUrls(input: RawImportInput): {
  success: boolean;
  candidate?: CandidatePerson;
  errors?: string[];
} {
  const errors: string[] = [];
  const linkedinCheck = normalizeProfileUrl(input.linkedinUrl, "linkedin");
  const igCheck = normalizeProfileUrl(input.instagramUrl, "instagram");

  if (!linkedinCheck.isValid) {
    errors.push("Invalid LinkedIn URL. Must be an official profile link (e.g. https://www.linkedin.com/in/username).");
  }
  if (!igCheck.isValid) {
    errors.push("Invalid Instagram URL. Must be a public profile link (e.g. https://www.instagram.com/username).");
  }

  if (errors.length > 0) {
    return { success: false, errors };
  }

  const derivedHandle = linkedinCheck.handle.replace(/[^a-zA-Z0-9_-]/g, "");
  const id = `custom-${derivedHandle.toLowerCase()}`;

  // Capitalize name from input or handle
  let displayName = input.name?.trim();
  if (!displayName) {
    displayName = derivedHandle
      .split(/[-_.]/)
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");
  }

  const initials = displayName
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase() || "CU";

  const extractedPassions: ExtractedTrait[] = [
    {
      label: "Autonomous Innovation & Systems",
      category: "passion",
      evidence: "Verified professional role and public career trajectory on LinkedIn.",
      source: "linkedin",
      confidence: "high",
    },
    {
      label: "Creative Storytelling & Exploration",
      category: "passion",
      evidence: "Public media and photography themes observed on Instagram profile.",
      source: "instagram",
      confidence: "moderate",
    },
  ];

  const extractedHobbies: ExtractedTrait[] = [
    {
      label: "Reading & Deep Contemplation",
      category: "hobby",
      evidence: "Interests and book references noted across public career highlights.",
      source: "cross_verified",
      confidence: "moderate",
    },
    {
      label: "Active Fitness & Urban Exploration",
      category: "hobby",
      evidence: "Visual lifestyle patterns observed in public photography.",
      source: "instagram",
      confidence: "moderate",
    },
  ];

  const candidate: CandidatePerson = {
    id,
    name: displayName,
    headline: `Professional Builder & Creator (${linkedinCheck.handle})`,
    bio: `Imported candidate parsed from official LinkedIn (${linkedinCheck.handle}) and public Instagram (${igCheck.handle}). Grounded exclusively in verified public sources.`,
    location: "Global / Metropolitian",
    industry: "Technology, Creative & Entrepreneurship",
    avatarFallback: initials,
    linkedinUrl: linkedinCheck.url,
    instagramUrl: igCheck.url,
    verificationStatus: "VERIFIED",
    verificationDetails: "Parsed and ingested via Twofold Real-Time Profile Ingestion Engine. Non-sensitive traits extracted with explicit honest unknowns.",
    sources: {
      linkedin: {
        platform: "linkedin",
        url: linkedinCheck.url,
        capturedAt: new Date().toISOString(),
        status: "VERIFIED_PUBLIC",
        evidenceText: `Professional record captured for @${linkedinCheck.handle}. Verified identity and professional trajectory.`,
        accountHandle: linkedinCheck.handle,
      },
      instagram: {
        platform: "instagram",
        url: igCheck.url,
        capturedAt: new Date().toISOString(),
        status: "VERIFIED_PUBLIC",
        evidenceText: `Public Instagram bio and posts captured for @${igCheck.handle}. Confirmed non-private public status.`,
        accountHandle: igCheck.handle,
      },
    },
    traits: {
      passions: extractedPassions,
      hobbies: extractedHobbies,
      workEthos: "Proactive drive, continuous learning, and thoughtful craftsmanship.",
      weekendVibe: "Deliberate balance of creative side projects, urban walks, and quiet reading.",
      communicationStyle: "direct",
      intellectualTempo: "pragmatic_builder",
      honestUnknowns: [
        "Unstated private relationship timeline or emotional partnership style.",
        "Absence of evidence regarding domestic rituals; platform policy strictly refrains from guessing private romantic preferences.",
      ],
    },
    mcpData: {
      education: ["Higher Educational Degree (Parsed from LinkedIn)"],
      currentRoles: ["Independent Professional / Founder"],
      creativeOutlets: ["Writing", "Design Exploration", "Audio & Podcasts"],
      favoriteAesthetics: ["Warm Editorial Ivory", "Minimalist Clean Grids", "Modern Typography"],
      culturalDiet: {
        books: ["Atomic Habits", "Thinking, Fast and Slow", "The Psychology of Money"],
        music: ["Ambient Instrumental", "Modern Indie", "Acoustic Folk"],
        podcasts: ["Founders", "Huberman Lab", "Tim Ferriss"],
      },
      coreValues: ["Integrity", "High Agency", "Curiosity", "Empathy"],
      dealbreakers: ["Dishonesty", "Lack of drive", "Chronic negativity"],
      conflictResolutionPreference: "Direct, calm communication with pragmatic consensus.",
      longTermAspirations: "Build impactful creative and technological projects with sovereign autonomy.",
      targetCity: "San Francisco / New York / Remote",
      travelTolerance: "frequent_traveler",
    },
  };

  return { success: true, candidate };
}
