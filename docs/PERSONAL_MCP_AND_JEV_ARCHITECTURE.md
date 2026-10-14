# Personal MCP & JEV Neuro-Agentic Dating Architecture

> **Transforming dating from static profile swiping into living, autonomous Model Context Protocol (MCP) agents calibrated by JEV System 1 deterministic scoring.**

---

## 1. Executive Summary & Vision

In traditional dating platforms, users reduce multidimensional human lives into 5 curated photos and a 200-character bio. The result is endless swiping fatigue, superficial filtering, and low conversational conversion.

This project introduces a **two-tier paradigm shift**:
1. **The Personal MCP (Model Context Protocol)**: Every individual in the real world owns and hosts their own personal MCP server (reference: [`HarshdipSaha/harshdipsaha-mcp`](https://github.com/HarshdipSaha/harshdipsaha-mcp)). Instead of third-party platforms scraping and locking user data, the individual's personal agent and dating counterparts query the person's MCP server under strict privacy tiers.
2. **JEV Dual-Brain Calibration (System 1 + System 2)**: Large language models generate rich, empathetic date conversations (System 2), but suffer from "politeness inflation" and subjective drift. We integrate **JEV (TypeSafe AI System 1 Cortex)** to run fast, deterministic, non-hallucinatory rubric evaluations (`choice`, `score`, `noul`), yielding mathematically robust compatibility rankings with verifiable receipts.

---

## 2. Personal MCP: The Living Digital Double

### 2.1 The Problem with Static Data
LinkedIn captures professional achievements, ambition, and work ethos. Instagram captures aesthetic tastes, weekend lifestyle, hobbies, and social energy. But a static prompt snapshot cannot answer novel questions or respect dynamic boundary consent.

### 2.2 Standard Personal MCP Schema
Each individual's dating agent exposes a standard set of Model Context Protocol endpoints:

```typescript
// Standard Personal MCP Tool Specifications
interface PersonalMCP {
  // 1. Foundational Persona (Public Tier)
  getProfile(): Promise<{
    name: string;
    headline: string;
    bio: string;
    education: string[];
    currentRoles: string[];
    publicLinks: { linkedin: string; instagram: string };
  }>;

  // 2. Lifestyle & Hobbies (Public Tier)
  getInterestsAndHobbies(): Promise<{
    passions: string[];
    weekendVibe: string;
    creativeOutlets: string[];
    favoriteAesthetics: string[];
    culturalDiet: { books: string[]; music: string[]; podcasts: string[] };
  }>;

  // 3. Values & Relationship Philosophy (Date Tier 1 - Mutual Opt-in)
  getValuesAndDealbreakers(): Promise<{
    coreValues: string[];
    dealbreakers: string[];
    communicationStyle: "direct" | "analytical" | "expressive" | "reserved";
    conflictResolutionPreference: string;
    longTermAspirations: string;
  }>;

  // 4. Interactive Inquiry (Date Tier 2 - Dynamic In-Date Query)
  askCandidateQuestion(params: {
    question: string;
    inquiryTopic: "lifestyle" | "career" | "quirks" | "hypothetical";
  }): Promise<{
    answer: string;
    comfortLevel: "enthusiastic" | "open" | "deflected";
  }>;

  // 5. Practical Alignment (Match Tier 3 - Pre-Rank Check)
  checkLogistics(params: {
    targetCity: string;
    travelTolerance: "homebody" | "frequent_traveler" | "digital_nomad";
  }): Promise<{
    compatible: boolean;
    notes: string;
  }>;
}
```

### 2.3 Reference Implementation: `harshdipsaha-mcp`
As demonstrated in Harshdip Saha's open-source MCP server ([`harshdipsaha-mcp`](https://github.com/HarshdipSaha/harshdipsaha-mcp)):
- Native tools: `getProfile`, `searchProjects`.
- Real-time resolution of skills, background, research projects (e.g. medical imaging, LLM safety), and active collaborations.
- In the dating harness, when **Agent B** (representing another candidate) wants to know if Harshdip's intense research schedule conflicts with weekend mountaineering, Agent B calls `askCandidateQuestion` or queries `getInterestsAndHobbies` directly via MCP.

---

## 3. JEV Integration: System 1 Cortex & Deterministic Rubric

### 3.1 The "Politeness Inflation" Trap in LLM Matchmaking
When asking an unconstrained LLM: *"Rate their chemistry from 1 to 100"*, the model almost invariably outputs 80–95. Every couple looks "great" on paper because the LLM tries to be agreeable.

### 3.2 JEV (TypeSafe AI) Architecture
Following the architecture proven in **SAAKSHYA** (`H:\code cubicle`), we use **JEV (`@typesafe-ai/sdk`)** as the **System 1 Cortex**:
- **System 1 (Jev)**: Fast, deterministic, zero-hallucination classification into discrete, pre-calibrated rubrics.
- **System 2 (Groq / Gemini)**: Fluent conversation generation, witty banter, dynamic storytelling, and date scenario simulation.

```
                    ┌────────────────────────────┐
                    │ LinkedIn + Public IG Data  │
                    └─────────────┬──────────────┘
                                  │
                                  ▼
                    ┌────────────────────────────┐
                    │     Personal MCP Server    │
                    │  (Standard Tool Interface) │
                    └─────────────┬──────────────┘
                                  │
         ┌────────────────────────┴────────────────────────┐
         │                                                 │
         ▼                                                 ▼
┌─────────────────────────────────┐       ┌─────────────────────────────────┐
│     System 2 Narrative Engine   │       │      System 1 JEV Cortex        │
│    (Groq Multi-Key / Gemini)    │       │     (@typesafe-ai/sdk client)   │
├─────────────────────────────────┤       ├─────────────────────────────────┤
│ • Autonomous Multi-Round Dates  │       │ • Deterministic Rubric Choice   │
│ • Real-time Persona Banter      │       │ • Dealbreaker Verification      │
│ • Tool calls to counterparty MCP│       │ • Calibrated Compatibility Math │
│ • Transcript Generation         │       │ • Zero-Hallucination Grade      │
└────────────────┬────────────────┘       └────────────────┬────────────────┘
                 │                                         │
                 └────────────────────┬────────────────────┘
                                      │
                                      ▼
                    ┌────────────────────────────────────┐
                    │    Ranked Match Board & Matrix     │
                    │   (Explainable Scores + Receipts)  │
                    └────────────────────────────────────┘
```

### 3.3 Concrete JEV Scoring Rubrics
During and after the simulated date, Jev evaluates the candidate pair across strict typed questions:

```typescript
import { TypeSafeClient, choice, score, noul } from "@typesafe-ai/sdk";

const jevClient = new TypeSafeClient({
  apiKey: process.env.TYPESAFE_API_KEY || process.env.JEV_API_KEY,
  defaultModel: process.env.JEV_MODEL || "jev-latest",
});

// System 1 Compatibility Evaluation
export async function evaluateDateWithJev(state: {
  personA: { name: string; profile: string };
  personB: { name: string; profile: string };
  dateTranscript: string;
}) {
  return await jevClient.systemOne({
    state,
    questions: {
      // 1. Lifestyle Rhythm
      lifestyle_harmony: choice("Evaluate lifestyle and pacing compatibility between Person A and Person B:", {
        dissonant: "Opposing lifestyle pacings or conflicting daily habits",
        manageable_friction: "Moderate divergence requiring intentional compromises",
        harmonic: "Well-aligned work-life rhythm and recreational tastes",
        synergistic: "Deep mutual elevation; habits actively reinforce each other",
      }),

      // 2. Non-negotiable Values & Red Flags
      dealbreaker_status: choice("Did any hard dealbreakers or fundamental value clashes emerge?", {
        critical_clash: "Irreconcilable conflict in ethics, life goals, or family philosophy",
        minor_friction: "Philosophical differences that can be navigated with open dialogue",
        uncompromised_alignment: "Strong harmony on moral foundations and life vision",
      }),

      // 3. Ambition & Intellectual Pace
      intellectual_pace: score("Grade the intellectual and ambition pacing:", [
        "Severe mismatch",
        "Asymmetric dynamic",
        "Balanced peer respect",
        "Catalytic power-duo",
      ]),

      // 4. Practical Feasibility
      coexistence_feasibility: noul("Can their geographical trajectories and careers realistically coexist?"),

      // 5. Date Dynamic Chemistry
      chemistry_grade: score("Overall conversational spark and chemistry observed during the date:", [
        "Cold / Awkward monologue",
        "Polite but purely platonic",
        "Warm banter with mutual interest",
        "Electric spark and undeniable rapport",
      ]),
    },
  });
}
```

---

## 4. Why This Architecture Wins

1. **True Agentic Sovereignty**: Data is not thrown into a centralized database bucket; it is federated behind an MCP tool interface owned by the person.
2. **Extensible in Real Life**: Anyone with an MCP server (like Harshdip's `harshdipsaha-mcp`) can drop their endpoint into the platform. Their agent is immediately ready to date across the agent network.
3. **Rigorous & Verifiable**: By coupling System 2 dialogue with System 1 JEV evaluations, the rankings are explainable, reproducible, and grounded in concrete evidence rather than arbitrary random seeds.
4. **Fast & Infinite Capacity**: Powered by Groq's multi-key rotated inference for low-latency dialogue and Jev's sub-second classification API.
