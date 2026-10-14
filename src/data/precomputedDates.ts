import { CANDIDATES } from "./candidates";
import { DateTranscript } from "@/types";
import { getCandidateById } from "@/lib/mcp";
import { computeDeterministicHeuristic } from "@/lib/jev";

export const PRECOMPUTED_DATES: DateTranscript[] = [
  {
    id: "date-harshdip-saha-ali-abdaal",
    candidateA: getCandidateById("harshdip-saha")!,
    candidateB: getCandidateById("ali-abdaal")!,
    createdAt: "2026-10-14T17:15:00Z",
    activityProposed: "Exploring an artisanal pour-over specialty coffee roastery followed by a stroll through an independent scientific bookstore",
    turns: [
      {
        turnNumber: 1,
        phase: "introduction",
        speakerId: "harshdip-saha",
        speakerName: "Harshdip Saha",
        content:
          "Hello Ali. It is great to connect. I have followed your work bridging clinical medicine and structured productivity systems. Coming from medical imaging research and LLM alignment, I appreciate how you dissect human motivation without losing scientific grounding.",
      },
      {
        turnNumber: 2,
        phase: "introduction",
        speakerId: "ali-abdaal",
        speakerName: "Ali Abdaal",
        content:
          "Thank you, Harshdip! The pleasure is mine. Seeing your work on brain registration and mechanistically dissecting model safety reminds me of the rigor in early clinical trials. It is rare to meet someone who balances deep engineering with big-picture curiosity.",
      },
      {
        turnNumber: 3,
        phase: "activity_exploration",
        speakerId: "harshdip-saha",
        speakerName: "Harshdip Saha",
        content:
          "I was thinking for our afternoon, why don't we try exploring an artisanal pour-over roastery and grab a quiet corner to unpack our favorite ideas? Before we head over, I wanted to query your agent regarding how you balance relentless creative output with actual presence.",
        toolCall: {
          tool: "askCandidateQuestion",
          invokedBy: "harshdip-saha",
          targetCandidate: "ali-abdaal",
          params: { question: "What does your ideal weekend look like between creative flow and rest?", inquiryTopic: "lifestyle" },
          response: {
            answer: "On a typical weekend, you will find me engaged in: Browsing London bookshops, playing board games with friends, and experimenting with audio gear. I also love Audio Storytelling, Guitar Jamming, Long-form Writing.",
            comfortLevel: "enthusiastic",
            inquiryTopic: "lifestyle",
            groundedEvidenceSource: "official_profile_mcp",
          },
          timestamp: "2026-10-14T17:15:12Z",
        },
      },
      {
        turnNumber: 4,
        phase: "activity_exploration",
        speakerId: "ali-abdaal",
        speakerName: "Ali Abdaal",
        content:
          "That pour-over roastery sounds delightful—I am a huge fan of deliberate coffee rituals. To your question, my weekends are sacred: browsing London bookshops, playing board games with close friends, and jamming on the acoustic guitar. I think productivity only matters if the process itself feels energizing.",
      },
      {
        turnNumber: 5,
        phase: "concrete_tradeoff",
        speakerId: "ali-abdaal",
        speakerName: "Ali Abdaal",
        content:
          "Speaking of process, both of us navigate intense research and creative schedules. When friction arises or when deadlines mount, how do you handle boundaries and geographical distance between London, Zurich, and Delhi?",
        toolCall: {
          tool: "checkLogistics",
          invokedBy: "ali-abdaal",
          targetCandidate: "harshdip-saha",
          params: { targetCity: "London, UK", travelTolerance: "frequent_traveler" },
          response: {
            compatible: true,
            candidateCity: "San Francisco, Zurich, or New Delhi",
            candidateTravelTolerance: "frequent_traveler",
            notes: "High geographic flexibility. Harshdip Saha is based in San Francisco, Zurich, or New Delhi with frequent_traveler rhythm.",
          },
          timestamp: "2026-10-14T17:15:28Z",
        },
      },
      {
        turnNumber: 6,
        phase: "concrete_tradeoff",
        speakerId: "harshdip-saha",
        speakerName: "Harshdip Saha",
        content:
          "For me, geographical mobility is natural since I already collaborate across continents. In relationships, my approach to friction is: direct, dispassionate root-cause analysis followed by pragmatic consensus. What I cannot stand is performative signaling or intellectual apathy. If two people share high agency and radical honesty, pacing compromises become exciting puzzles rather than burdens.",
      },
      {
        turnNumber: 7,
        phase: "reflection",
        speakerId: "harshdip-saha",
        speakerName: "Harshdip Saha",
        content:
          "Sitting across from you today has been deeply refreshing, Ali. You bring genuine intellectual humility paired with warmth. It feels rare to have an exchange where ambitious vision and emotional lightness coexist so effortlessly.",
      },
      {
        turnNumber: 8,
        phase: "reflection",
        speakerId: "ali-abdaal",
        speakerName: "Ali Abdaal",
        content:
          "I couldn't agree more, Harshdip. There was zero conversational friction, and your dedication to frontier science is genuinely inspiring. Let's make that specialty roastery visit a regular habit whenever you are next in London.",
      },
    ],
    reflections: {
      candidateA_reflection:
        "Ali embodies genuine warmth, high intellectual curiosity, and balanced pacing. His medical background provides a grounded foundation for his educational mission. Reciprocal chemistry felt natural and energizing.",
      candidateB_reflection:
        "Harshdip has rare technical depth and extraordinary agency without ego. His clear communication style makes complex topics effortless to explore. High mutual respect and strong lifestyle harmony.",
    },
    jevEvaluation: {
      lifestyle_harmony: {
        value: "synergistic",
        label: "SYNERGISTIC",
        confidence: 0.95,
        receipt: "Pacing alignment between deep work blocks / quiet contemplation and unhurried bookstore / creative flow evaluated as synergistic.",
      },
      dealbreaker_status: {
        value: "uncompromised_alignment",
        label: "UNCOMPROMISED ALIGNMENT",
        confidence: 0.98,
        receipt: "Scanned core values: Intellectual Honesty and Curiosity; zero conflicting non-negotiables observed.",
      },
      intellectual_pace: {
        scoreIndex: 3,
        label: "Catalytic power-duo",
        receipt: "Ambition tempo: Hyper-active clinical researcher with high-energy educational builder.",
      },
      coexistence_feasibility: {
        viable: true,
        receipt: "Coexistence confirmed: London and New Delhi / Zurich bridged via frequent traveler rhythms.",
      },
      chemistry_grade: {
        scoreIndex: 3,
        label: "Electric spark and undeniable rapport",
        receipt: "Effortless 8-turn exchange with mutual active listening and reciprocal MCP inquiries.",
      },
      compositeScore: 94,
      reciprocalBalanceScore: 97,
      directionalScores: {
        personA_to_personB: 95,
        personB_to_personA: 93,
      },
      verdictSummary: "Exceptional mutual synergy with strong lifestyle and intellectual alignment.",
      evaluatedAt: "2026-10-14T17:15:35Z",
      jevModel: "jev-latest",
      isDeterministic: true,
    },
  },
  {
    id: "date-ankur-warikoo-sharan-hegde",
    candidateA: getCandidateById("ankur-warikoo")!,
    candidateB: getCandidateById("sharan-hegde")!,
    createdAt: "2026-10-14T17:20:00Z",
    activityProposed: "Morning distance run followed by an entrepreneurial strategy brainstorm at a quiet cafe",
    turns: [
      {
        turnNumber: 1,
        phase: "introduction",
        speakerId: "ankur-warikoo",
        speakerName: "Ankur Warikoo",
        content:
          "Sharan, it is great to see you. I have admired how you took what used to be dull corporate finance and made it theatrical and accessible for millions of young Indians.",
      },
      {
        turnNumber: 2,
        phase: "introduction",
        speakerId: "sharan-hegde",
        speakerName: "Sharan Hegde",
        content:
          "Ankur! You paved the road for creators like me who wanted to talk about compounding and career honesty. Being able to banter about business and life with you is an absolute treat.",
      },
      {
        turnNumber: 3,
        phase: "activity_exploration",
        speakerId: "ankur-warikoo",
        speakerName: "Ankur Warikoo",
        content:
          "I was thinking we could start our day with a 5k jog around the park and then grab breakfast to unpack our habit systems. Before that, let's see how our weekend pacings match up.",
        toolCall: {
          tool: "getInterestsAndHobbies",
          invokedBy: "ankur-warikoo",
          targetCandidate: "sharan-hegde",
          params: {},
          response: {
            passions: ["Venture Building & Scaled Communities", "Humor in Education"],
            hobbies: ["Stand-up Comedy & Sketch Writing", "Global Architectural Travel"],
            weekendVibe: "Brainstorming new video concepts, meeting angel founders, and hosting close friends for dinner.",
          },
          timestamp: "2026-10-14T17:20:10Z",
        },
      },
      {
        turnNumber: 4,
        phase: "activity_exploration",
        speakerId: "sharan-hegde",
        speakerName: "Sharan Hegde",
        content:
          "I am definitely down for the run, although I may crack a few jokes at kilometer three if the pacing gets too intense! My weekends lean toward social dinners and creative brainstorming, which fits your disciplined routines surprisingly well.",
      },
      {
        turnNumber: 5,
        phase: "concrete_tradeoff",
        speakerId: "sharan-hegde",
        speakerName: "Sharan Hegde",
        content:
          "You are famous for extreme habit tracking and logging failures. How do you respond when a partner or friend prefers spontaneity and messy improvisation?",
        toolCall: {
          tool: "getValuesAndDealbreakers",
          invokedBy: "sharan-hegde",
          targetCandidate: "ankur-warikoo",
          params: {},
          response: {
            coreValues: ["Self-awareness", "Financial Sovereignty", "Discipline", "Radical Truth"],
            dealbreakers: ["Unchecked consumer debt habits", "Emotional avoidance", "Lack of ownership"],
            conflictResolutionPreference: "Objective retrospective discussion with written clarity on next steps.",
          },
          timestamp: "2026-10-14T17:20:25Z",
        },
      },
      {
        turnNumber: 6,
        phase: "concrete_tradeoff",
        speakerId: "ankur-warikoo",
        speakerName: "Ankur Warikoo",
        content:
          "My view is that discipline is what creates true spontaneity. When finances and health are dialed in, you can take huge creative risks without anxiety. If friction happens, I favor objective retrospective talks with clear next steps. No emotional drama.",
      },
      {
        turnNumber: 7,
        phase: "reflection",
        speakerId: "ankur-warikoo",
        speakerName: "Ankur Warikoo",
        content:
          "You bring so much levity and quick wit, Sharan. It balances my more introspective, structured tendencies in a very healthy way.",
      },
      {
        turnNumber: 8,
        phase: "reflection",
        speakerId: "sharan-hegde",
        speakerName: "Sharan Hegde",
        content:
          "And you give me the grounding and analytical perspective that keeps big ambitions anchored. Truly enjoyed this date—let's keep the compounding going!",
      },
    ],
    reflections: {
      candidateA_reflection:
        "Sharan combines sharp commercial intellect with infectious humor. He lightens the room while holding deep respect for financial prudence.",
      candidateB_reflection:
        "Ankur provides steady mentorship energy with radical transparency. His structured discipline is deeply reassuring.",
    },
    jevEvaluation: {
      lifestyle_harmony: {
        value: "harmonic",
        label: "HARMONIC",
        confidence: 0.93,
        receipt: "Pacing between structured morning runs and creative social dinners operates with harmonic balance.",
      },
      dealbreaker_status: {
        value: "uncompromised_alignment",
        label: "UNCOMPROMISED ALIGNMENT",
        confidence: 0.97,
        receipt: "Both candidates prioritize financial sovereignty, ownership, and zero debt illusions.",
      },
      intellectual_pace: {
        scoreIndex: 2,
        label: "Balanced peer respect",
        receipt: "Pragmatic builder paired with high-energy community builder.",
      },
      coexistence_feasibility: {
        viable: true,
        receipt: "Delhi and Bengaluru/Mumbai easily bridged with frequent domestic routes.",
      },
      chemistry_grade: {
        scoreIndex: 2,
        label: "Warm banter with mutual interest",
        receipt: "Brisk conversational cadence blending comedy with balance-sheet principles.",
      },
      compositeScore: 88,
      reciprocalBalanceScore: 94,
      directionalScores: {
        personA_to_personB: 89,
        personB_to_personA: 87,
      },
      verdictSummary: "Exceptional mutual synergy with strong lifestyle and intellectual alignment.",
      evaluatedAt: "2026-10-14T17:20:30Z",
      jevModel: "jev-latest",
      isDeterministic: true,
    },
  },
  {
    id: "date-varun-mayya-ishan-sharma",
    candidateA: getCandidateById("varun-mayya")!,
    candidateB: getCandidateById("ishan-sharma")!,
    createdAt: "2026-10-14T17:25:00Z",
    activityProposed: "Visiting an autonomous robotics workshop followed by late-night espresso in Koramangala",
    turns: [
      {
        turnNumber: 1,
        phase: "introduction",
        speakerId: "varun-mayya",
        speakerName: "Varun Mayya",
        content:
          "Ishan, good to catch up in person. You represent the new guard of builder-creators who don't wait for permission from legacy institutions.",
      },
      {
        turnNumber: 2,
        phase: "introduction",
        speakerId: "ishan-sharma",
        speakerName: "Ishan Sharma",
        content:
          "Varun, thanks man. You were building web apps and writing books before most of us even knew what venture capital was. Super excited to talk about where AI agents and autonomous labor are heading.",
      },
      {
        turnNumber: 3,
        phase: "activity_exploration",
        speakerId: "varun-mayya",
        speakerName: "Varun Mayya",
        content:
          "Let's check out this robotics lab in Indiranagar, then grab a late espresso. I want to query your agent regarding how you prioritize speed of shipping against long-term research.",
        toolCall: {
          tool: "askCandidateQuestion",
          invokedBy: "varun-mayya",
          targetCandidate: "ishan-sharma",
          params: { question: "How do you manage hyper-rapid execution with deep craft?", inquiryTopic: "career" },
          response: {
            answer: "My work ethos centers on: Relentless hustle, rapid iteration, Gen Z digital fluency, and continuous experiment execution. Right now my main focus is Scale MarkitUp into a global creative conglomerate.",
            comfortLevel: "enthusiastic",
            inquiryTopic: "career",
            groundedEvidenceSource: "official_profile_mcp",
          },
          timestamp: "2026-10-14T17:25:12Z",
        },
      },
      {
        turnNumber: 4,
        phase: "activity_exploration",
        speakerId: "ishan-sharma",
        speakerName: "Ishan Sharma",
        content:
          "Speed of shipping is my lifeblood. When you ship fast, the market gives you real-time feedback that no theoretical armchair strategy can beat. That robotics lab idea sounds electric.",
      },
      {
        turnNumber: 5,
        phase: "concrete_tradeoff",
        speakerId: "ishan-sharma",
        speakerName: "Ishan Sharma",
        content:
          "You think on 50-year civilizational horizons with AGI and simulation theory. Do you ever find yourself disconnected from everyday small talk or feeling impatient with people who move slowly?",
        toolCall: {
          tool: "getValuesAndDealbreakers",
          invokedBy: "ishan-sharma",
          targetCandidate: "varun-mayya",
          params: {},
          response: {
            coreValues: ["Frontier Thinking", "Unbounded Ambition", "First Principles", "Technical Sovereignty"],
            dealbreakers: ["Luddite thinking", "Pessimism about human potential", "Mental stagnation"],
            conflictResolutionPreference: "Intellectual debate dissecting the underlying assumption tree with radical openness.",
          },
          timestamp: "2026-10-14T17:25:20Z",
        },
      },
      {
        turnNumber: 6,
        phase: "concrete_tradeoff",
        speakerId: "varun-mayya",
        speakerName: "Varun Mayya",
        content:
          "Constantly. Mental stagnation and pessimism about the future are my biggest dealbreakers. But when I am with someone who has authentic speed and curiosity, I love breaking down the assumption tree together. No time wasted on small grievances.",
      },
      {
        turnNumber: 7,
        phase: "reflection",
        speakerId: "varun-mayya",
        speakerName: "Varun Mayya",
        content:
          "You have great momentum, Ishan. In a city like Bengaluru, staying hungry without turning cynical is an art form, and you nail it.",
      },
      {
        turnNumber: 8,
        phase: "reflection",
        speakerId: "ishan-sharma",
        speakerName: "Ishan Sharma",
        content:
          "Loved every minute, Varun. It is rare to find someone who pushes your mental boundaries that hard in a single conversation.",
      },
    ],
    reflections: {
      candidateA_reflection:
        "Ishan has palpable raw energy and an exceptional shipping cadence. High intellectual resonance on technology and media evolution.",
      candidateB_reflection:
        "Varun operates on an expansive frontier plane. Challenging, fast-paced, and thought-provoking date.",
    },
    jevEvaluation: {
      lifestyle_harmony: {
        value: "synergistic",
        label: "SYNERGISTIC",
        confidence: 0.94,
        receipt: "Both operate on hyper-active tempos and tech-forward builder schedules in Bengaluru.",
      },
      dealbreaker_status: {
        value: "uncompromised_alignment",
        label: "UNCOMPROMISED ALIGNMENT",
        confidence: 0.96,
        receipt: "Mutual contempt for cynicism and stagnation; shared passion for frontier technology.",
      },
      intellectual_pace: {
        scoreIndex: 3,
        label: "Catalytic power-duo",
        receipt: "Hyper-active tech founder paired with hyper-active Gen Z digital builder.",
      },
      coexistence_feasibility: {
        viable: true,
        receipt: "Both reside in Bengaluru with frequent tech conference travel.",
      },
      chemistry_grade: {
        scoreIndex: 3,
        label: "Electric spark and undeniable rapport",
        receipt: "High conversational velocity with zero awkward lags.",
      },
      compositeScore: 91,
      reciprocalBalanceScore: 96,
      directionalScores: {
        personA_to_personB: 92,
        personB_to_personA: 90,
      },
      verdictSummary: "Exceptional mutual synergy with strong lifestyle and intellectual alignment.",
      evaluatedAt: "2026-10-14T17:25:30Z",
      jevModel: "jev-latest",
      isDeterministic: true,
    },
  },
];

export function getTranscriptById(id: string): DateTranscript | undefined {
  const found = PRECOMPUTED_DATES.find((d) => d.id === id);
  if (found) return found;

  // Check if id matches pattern date-personA-personB
  const match = id.match(/^date-([a-z0-9-]+)-([a-z0-9-]+)$/);
  if (match) {
    const pA = getCandidateById(match[1]);
    const pB = getCandidateById(match[2]);
    if (pA && pB) {
      // Return on-demand deterministic transcript
      const jevEval = computeDeterministicHeuristic(pA, pB, "");
      return {
        id,
        candidateA: pA,
        candidateB: pB,
        createdAt: "2026-10-14T17:30:00Z",
        activityProposed: `A quiet conversation at an artisanal cafe discussing ${pA.traits.passions[0]?.label || "creative craft"} and ${pB.traits.passions[0]?.label || "shared values"}`,
        turns: [
          {
            turnNumber: 1,
            phase: "introduction",
            speakerId: pA.id,
            speakerName: pA.name,
            content: `Hello ${pB.name}. It is great to meet you in person. I have followed your career in ${pB.industry} with immense respect.`,
          },
          {
            turnNumber: 2,
            phase: "introduction",
            speakerId: pB.id,
            speakerName: pB.name,
            content: `Thank you, ${pA.name}. The feeling is mutual. Your dedication to ${pA.headline} really stood out in your profile evidence.`,
          },
          {
            turnNumber: 3,
            phase: "activity_exploration",
            speakerId: pA.id,
            speakerName: pA.name,
            content: `I was thinking we could grab coffee and explore our creative routines. How do you structure your weekends between work and downtime?`,
            toolCall: {
              tool: "getInterestsAndHobbies",
              invokedBy: pA.id,
              targetCandidate: pB.id,
              params: {},
              response: {
                weekendVibe: pB.traits.weekendVibe,
                passions: pB.traits.passions.map((p) => p.label),
              },
              timestamp: "2026-10-14T17:30:10Z",
            },
          },
          {
            turnNumber: 4,
            phase: "activity_exploration",
            speakerId: pB.id,
            speakerName: pB.name,
            content: `For me: ${pB.traits.weekendVibe}. Having that balance allows me to bring full energy to my creative projects.`,
          },
          {
            turnNumber: 5,
            phase: "concrete_tradeoff",
            speakerId: pB.id,
            speakerName: pB.name,
            content: `When friction arises in a partnership or when schedules clash, what is your conflict resolution approach?`,
            toolCall: {
              tool: "getValuesAndDealbreakers",
              invokedBy: pB.id,
              targetCandidate: pA.id,
              params: {},
              response: {
                coreValues: pA.mcpData.coreValues,
                dealbreakers: pA.mcpData.dealbreakers,
                conflictResolutionPreference: pA.mcpData.conflictResolutionPreference,
              },
              timestamp: "2026-10-14T17:30:20Z",
            },
          },
          {
            turnNumber: 6,
            phase: "concrete_tradeoff",
            speakerId: pA.id,
            speakerName: pA.name,
            content: `My approach is: ${pA.mcpData.conflictResolutionPreference}. As long as we share high agency and clear values, we can navigate any logistical challenge.`,
          },
          {
            turnNumber: 7,
            phase: "reflection",
            speakerId: pA.id,
            speakerName: pA.name,
            content: `I have thoroughly enjoyed our dialogue today, ${pB.name}. You bring both substance and composure to the table.`,
          },
          {
            turnNumber: 8,
            phase: "reflection",
            speakerId: pB.id,
            speakerName: pB.name,
            content: `Likewise, ${pA.name}. It was an engaging and authentic conversation with real depth.`,
          },
        ],
        reflections: {
          candidateA_reflection: `${pB.name} demonstrated impressive composure, authenticity, and clear values. Engaging conversational flow.`,
          candidateB_reflection: `${pA.name} brought strong intellectual rigor and articulate presence. High mutual respect.`,
        },
        jevEvaluation: jevEval,
      };
    }
  }

  return undefined;
}
