import { CandidatePerson, DateTranscript, DateTurn, MCPToolCallReceipt } from "@/types";
import { executeCandidateMCPTool } from "./mcp";
import { evaluateDateWithJev } from "./jev";

// Groq Multi-Key Rotation Pool
const rawGroqKeys = (process.env.GROQ_API_KEY || "")
  .split(",")
  .map((k) => k.trim())
  .filter(Boolean);

let keyIndex = 0;
function getNextGroqKey(): string | null {
  if (rawGroqKeys.length === 0) return null;
  const key = rawGroqKeys[keyIndex % rawGroqKeys.length];
  keyIndex++;
  return key;
}

export async function generateTurnWithGroq(
  prompt: string,
  systemPrompt: string
): Promise<string | null> {
  const apiKey = getNextGroqKey();
  if (!apiKey) return null;

  try {
    const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: prompt },
        ],
        temperature: 0.7,
        max_tokens: 350,
      }),
    });

    if (!res.ok) {
      console.warn(`Groq API returned ${res.status}, falling back to persona engine.`);
      return null;
    }

    const data = await res.json();
    return data.choices?.[0]?.message?.content?.trim() || null;
  } catch (err) {
    console.warn("Groq request failed:", err);
    return null;
  }
}

export async function simulateFullDate(
  candidateA: CandidatePerson,
  candidateB: CandidatePerson,
  customActivity?: string
): Promise<DateTranscript> {
  const turns: DateTurn[] = [];

  // Determine realistic proposed activity based on shared traits
  const sharedActivity =
    customActivity ||
    determineSharedActivity(candidateA, candidateB);

  // Turn 1: Candidate A initiates date
  const turn1Content =
    `Hello ${candidateB.name}. It is great to finally sit down together. I have followed your work in ${candidateB.industry} with genuine respect. When looking over your background, your focus on ${candidateB.traits.workEthos.toLowerCase()} really resonated with how I structure my own weeks.`;
  turns.push({
    turnNumber: 1,
    phase: "introduction",
    speakerId: candidateA.id,
    speakerName: candidateA.name,
    content: turn1Content,
  });

  // Turn 2: Candidate B responds warmly
  const turn2Content =
    `Thank you, ${candidateA.name}. The feeling is very mutual. Your approach to ${candidateA.headline.toLowerCase()} stands out in a world full of noise. I was curious how you balance such intense intellectual focus with everyday presence.`;
  turns.push({
    turnNumber: 2,
    phase: "introduction",
    speakerId: candidateB.id,
    speakerName: candidateB.name,
    content: turn2Content,
  });

  // Turn 3: Candidate A proposes activity & invokes Candidate B's MCP server!
  const mcpCall1 = executeCandidateMCPTool(
    candidateB,
    "askCandidateQuestion",
    {
      question: `What does your ideal weekend look like between creative flow and rest?`,
      inquiryTopic: "lifestyle",
    },
    candidateA.id
  );

  const turn3Content =
    `That question gets right to the core of it. I love deep work blocks, but I find that deliberate restoration is just as critical. I was thinking for our afternoon together, why don't we try ${sharedActivity}? Before we head over, I wanted to understand your weekend rhythm.`;
  turns.push({
    turnNumber: 3,
    phase: "activity_exploration",
    speakerId: candidateA.id,
    speakerName: candidateA.name,
    content: turn3Content,
    toolCall: mcpCall1.receipt,
  });

  // Turn 4: Candidate B responds referencing the activity and MCP inquiry
  const bWeekendVibe = candidateB.traits.weekendVibe;
  const turn4Content =
    `I would love that—${sharedActivity} sounds genuinely refreshing. Regarding my rhythm, ${bWeekendVibe}. I find that having an unhurried space allows ideas to settle naturally rather than forcing them.`;
  turns.push({
    turnNumber: 4,
    phase: "activity_exploration",
    speakerId: candidateB.id,
    speakerName: candidateB.name,
    content: turn4Content,
  });

  // Turn 5: Candidate B checks Candidate A's logistics / values via MCP
  const mcpCall2 = executeCandidateMCPTool(
    candidateA,
    "checkLogistics",
    {
      targetCity: candidateB.mcpData.targetCity,
      travelTolerance: candidateB.mcpData.travelTolerance,
    },
    candidateB.id
  );

  const turn5Content =
    `One thing that matters deeply to me when connecting with someone is understanding pacing and long-term values. We both lead high-velocity lives. How do you navigate intense travel schedules and trade-offs when friction arises?`;
  turns.push({
    turnNumber: 5,
    phase: "concrete_tradeoff",
    speakerId: candidateB.id,
    speakerName: candidateB.name,
    content: turn5Content,
    toolCall: mcpCall2.receipt,
  });

  // Turn 6: Candidate A responds to concrete trade-off
  const aResolution = candidateA.mcpData.conflictResolutionPreference;
  const aDealbreakers = candidateA.mcpData.dealbreakers[0] || "lack of integrity";
  const turn6Content =
    `For me, trade-offs require absolute radical clarity. My approach to friction is: ${aResolution.toLowerCase()}. What I find hardest to navigate is ${aDealbreakers.toLowerCase()}. As long as we share high agency and intellectual honesty, logistics can always be engineered.`;
  turns.push({
    turnNumber: 6,
    phase: "concrete_tradeoff",
    speakerId: candidateA.id,
    speakerName: candidateA.name,
    content: turn6Content,
  });

  // Turn 7: Candidate A reflection & closing impression
  const turn7Content =
    `Sitting across from you today has been illuminating, ${candidateB.name}. You bring both substance and grounded composure to the table. I feel a genuine conversational spark, and I appreciate that you don't shy away from real questions.`;
  turns.push({
    turnNumber: 7,
    phase: "reflection",
    speakerId: candidateA.id,
    speakerName: candidateA.name,
    content: turn7Content,
  });

  // Turn 8: Candidate B reflection & closing impression
  const turn8Content =
    `I feel the exact same way, ${candidateA.name}. Dates can often feel like scripted interviews, but this had real weight and easy banter. Let's definitely follow up on that ${sharedActivity} idea soon.`;
  turns.push({
    turnNumber: 8,
    phase: "reflection",
    speakerId: candidateB.id,
    speakerName: candidateB.name,
    content: turn8Content,
  });

  // Independent Reflections
  const reflectionA = `${candidateB.name} is sharp, authentic, and grounded. Conversational pacing was smooth. The mutual curiosity felt natural, especially around ${candidateB.traits.passions[0]?.label || "work"}.`;
  const reflectionB = `${candidateA.name} brings immense intellectual clarity and serious agency. No superficial fluff. I respect the direct communication style and clear commitment to excellence.`;

  // Build full transcript text for JEV Cortex
  const transcriptText = turns.map((t) => `Turn ${t.turnNumber} [${t.speakerName}]: ${t.content}`).join("\n\n");

  // Run JEV System 1 deterministic rubric evaluation
  const jevResult = await evaluateDateWithJev(candidateA, candidateB, transcriptText);

  return {
    id: `date-${candidateA.id}-${candidateB.id}`,
    candidateA,
    candidateB,
    createdAt: new Date().toISOString(),
    activityProposed: sharedActivity,
    turns,
    reflections: {
      candidateA_reflection: reflectionA,
      candidateB_reflection: reflectionB,
    },
    jevEvaluation: jevResult,
  };
}

function determineSharedActivity(personA: CandidatePerson, personB: CandidatePerson): string {
  // Check common hobbies or passions
  const aText = (personA.traits.hobbies.map((h) => h.label).join(" ") + " " + personA.traits.weekendVibe).toLowerCase();
  const bText = (personB.traits.hobbies.map((h) => h.label).join(" ") + " " + personB.traits.weekendVibe).toLowerCase();

  if (aText.includes("coffee") || bText.includes("coffee")) {
    return "Exploring an artisanal pour-over specialty coffee roastery";
  }
  if (aText.includes("running") || bText.includes("running") || aText.includes("walk") || bText.includes("hiking")) {
    return "A scenic morning walk through a quiet botanical park";
  }
  if (aText.includes("book") || bText.includes("reading") || bText.includes("book")) {
    return "Browsing rare first editions in an independent quiet bookstore";
  }
  if (aText.includes("gallery") || bText.includes("art") || aText.includes("architecture")) {
    return "Visiting a contemporary architectural design exhibition";
  }
  return "An unhurried tea and conversation session at a quiet garden pavilion";
}
