# Twofold — Evidence-First Agentic Dating Platform

Twofold transforms public professional and social profiles (official LinkedIn and public Instagram) into sovereign **Personal Model Context Protocol (MCP) digital doubles**. Agents conduct multi-phase autonomous simulated dates with real-time counterparty tool calls, evaluated deterministically by the **TypeSafe JEV System 1 Cortex** to produce explainable compatibility rankings with auditable receipts.

- **Live Website**: [https://agentic-dating-theta.vercel.app](https://agentic-dating-theta.vercel.app)
- **Demo Link (Completed 26-Person Cohort Rankings)**: [https://agentic-dating-theta.vercel.app/rankings](https://agentic-dating-theta.vercel.app/rankings)
- **GitHub Repository**: [https://github.com/HarshdipSaha/agentic-dating](https://github.com/HarshdipSaha/agentic-dating)

---

## Architecture Overview

```
                      +-----------------------------+
                      |  LinkedIn + Public IG Data  |
                      +--------------+--------------+
                                     |
                                     v
                      +-----------------------------+
                      |     Personal MCP Server     |
                      |  (Standard Tool Interface)  |
                      +--------------+--------------+
                                     |
           +-------------------------+-------------------------+
           |                                                   |
           v                                                   v
+-----------------------------------+       +-----------------------------------+
|     System 2 Narrative Engine     |       |       System 1 JEV Cortex         |
|    (Groq Multi-Key / Gemini)      |       |      (@typesafe-ai/sdk client)    |
+-----------------------------------+       +-----------------------------------+
| * Autonomous Multi-Round Dates    |       | * Deterministic Rubric Choice     |
| * Real-time Persona Banter        |       | * Dealbreaker Verification        |
| * Tool calls to counterparty MCP  |       | * Calibrated Compatibility Math   |
| * Full Transcript Generation      |       | * Zero-Hallucination Grade        |
+-----------------+-----------------+       +-----------------+-----------------+
                  |                                           |
                  +---------------------+---------------------+
                                        |
                                        v
                      +-------------------------------------+
                      |     Ranked Match Board & Matrix     |
                      |    (Explainable Scores + Receipts)  |
                      +-------------------------------------+
```

### 1. Personal MCP Digital Doubles
Every candidate in the 26-person verified cohort hosts a sovereign Model Context Protocol interface exposing 5 standard endpoints:
- `getProfile()`: Name, headline, bio, education, current roles, and verified source links.
- `getInterestsAndHobbies()`: Passions, weekend vibe, creative outlets, aesthetic tastes, and cultural diet.
- `getValuesAndDealbreakers()`: Core values, non-negotiables, communication style, and conflict resolution philosophy.
- `askCandidateQuestion(question, inquiryTopic)`: Interactive in-date inquiries with dynamic comfort-level filtering.
- `checkLogistics(targetCity, travelTolerance)`: Geographical and mobility compatibility scoring.

*Reference Implementation:* Modeled after Harshdip Saha's open-source MCP server ([`HarshdipSaha/harshdipsaha-mcp`](https://github.com/HarshdipSaha/harshdipsaha-mcp)).

### 2. Dual-Brain System 1 + System 2 Calibration
Unconstrained LLMs suffer from "politeness inflation" (defaulting to 85-95/100 on romantic chemistry). Twofold decouples generation from evaluation:
- **System 2 (Groq Llama-3.3-70B Multi-Key Rotation)**: Generates 8-turn dates across Introduction, Activity Exploration, Concrete Trade-off, and Reflection phases.
- **System 1 Cortex (TypeSafe AI JEV SDK)**: Runs deterministic classification using:
  - `choice`: Lifestyle Harmony (`dissonant`, `manageable_friction`, `harmonic`, `synergistic`)
  - `choice`: Dealbreaker Status (`critical_clash`, `minor_friction`, `uncompromised_alignment`)
  - `score`: Intellectual & Ambition Pace (Levels 1 to 4)
  - `noul`: Coexistence Feasibility (Viable vs Geographic Friction)
  - `score`: Observed Conversational Chemistry

---

## 26 Verified Candidate Cohort

All 26 individuals have their official LinkedIn and public Instagram accounts verified:
1. **Harshdip Saha** — UG ML Researcher in Medical Brain Imaging & LLM Safety Alignment (NexGenLab NSUT, IIT Madras, BraTS 2025 3rd place, ETH Zurich alignment collaboration)
2. **Ali Abdaal** — Doctor, Author of *Feel-Good Productivity* & YouTube Educator (Cambridge Medicine)
3. **Ankur Warikoo** — Entrepreneur, Author of *Do Epic Shit* & Public Mentor (ISB)
4. **Ranveer Allahbadia** — Host of *The Ranveer Show* (TRS), Co-founder Monk-E
5. **Sharan Hegde** — Founder *The 1% Club*, Ex-Consultant (KPMG/PwC)
6. **Ishan Sharma** — Founder MarkitUp, Tech & Career Creator, Author
7. **Varun Mayya** — Founder of Aeos & God Mode, AI Author & Builder
8. **Raj Shamani** — Host *Figuring Out Podcast*, Founder House of X, Investor
9. **Gary Vaynerchuk** — Chairman VaynerX, CEO VaynerMedia, Creator VeeFriends
10. **Mel Robbins** — Author of *The 5 Second Rule* & *The Let Them Theory*
11. **Simon Sinek** — Author of *Start With Why* & *The Infinite Game*, Ethnographer
12. **Steven Bartlett** — Host *The Diary of a CEO*, Founder Flight Story & Thirdweb
13. **Marie Forleo** — Author of *Everything is Figureoutable*, Host MarieTV
14. **Amy Porterfield** — Author of *Two Weeks Notice*, Host *Online Marketing Made Easy*
15. **Vanessa Van Edwards** — Founder Science of People, Author of *Captivate* and *Cues*
16. **Chris Do** — Founder The Futur, Emmy Award-Winning Director & Business Coach
17. **Sahil Bloom** — Author of *The 5 Types of Wealth*, Creator of The Curiosity Chronicle
18. **Codie Sanchez** — Founder Contrarian Thinking, Main Street Business Investor
19. **Alex Hormozi** — Founder Acquisition.com, Author of *$100M Offers* & *$100M Leads*
20. **Leila Hormozi** — CEO Acquisition.com, Organizational Architect
21. **Tori Dunlap** — Founder Her First $100K, Author of *Financial Feminist*
22. **Dan Koe** — Author of *The Art of Focus*, Creator of Modern Renaissance
23. **CA Rachana Ranade** — Chartered Accountant, Capital Markets Educator
24. **Anushka Rathod** — Fintech Creator, Ex-Investment Banker, Forbes 30 Under 30
25. **Neha Nagar** — CEO TaxationHelp, Fintech Influencer & Business Consultant
26. **Masoom Minawala** — Global Luxury Fashion Creator, Empowher Investor

---

## Key Platform Routes

- `/`: Editorial landing page with architecture diagram, cohort metrics, and interactive launchpad.
- `/profiles`: Full directory of all 26 verified profiles with search, filter, and official source links.
- `/profiles/[id]`: Deep profile inspection displaying source captures, extracted traits, explicit honest unknowns, and embedded MCP test console.
- `/mcp-inspector`: Interactive MCP Workbench for querying any candidate's MCP tools in real-time.
- `/simulate`: Live 8-turn date simulator with real-time MCP tool invocations and JEV System 1 scoring.
- `/dates`: Archive of completed date transcripts with turn-by-turn dialogue and receipts.
- `/dates/[id]`: Auditable transcript view with full tool call parameters, responses, and JEV rubric.
- `/rankings`: Full 26x25 ranking matrix showing reciprocal scores, directional comparisons, and top match leaderboard.
- `/import`: Real-time ingestion sandbox to paste any LinkedIn + Instagram URL pair, instantiate an MCP double, and date against the cohort.

---

## WebAttack Layout & Functional Verification

Twofold was rigorously verified using a Playwright WebAttack test suite (`scripts/webattack.cjs`) across both Desktop (1440x900) and Mobile (390x844 iPhone viewport):

- **Routes Crawled:** 10 core routes (`/`, `/profiles`, `/profiles/harshdip-saha`, `/profiles/ali-abdaal`, `/mcp-inspector`, `/simulate`, `/dates`, `/dates/date-harshdip-saha-ali-abdaal`, `/rankings`, `/import`)
- **Horizontal Overflow Check:** `document.documentElement.scrollWidth <= document.documentElement.clientWidth` across all pages (0 overflow errors detected).
- **Interactive Probes:**
  - Real-time MCP tool invocation verified on `/mcp-inspector`.
  - 8-turn dating simulation and JEV rubric evaluation verified on `/simulate`.
  - Candidate profile ingestion and MCP double deployment verified on `/import`.
- **Test Artifacts:** 22 full-page high-DPI screenshots saved in `test-artifacts/` alongside `test-artifacts/webattack-report.json`.

---

## Getting Started

### Prerequisites
- Node.js v20+ or v22+
- npm v10+

### Installation & Execution

```powershell
# 1. Install dependencies
npm install

# 2. Build production assets
npm run build

# 3. Start production server on port 3000
npm start

# 4. Run WebAttack layout & functional verification
npm run test:webattack
```

### Environment Configuration (`.env.local`)
```env
# TypeSafe JEV System 1 Cortex
TYPESAFE_API_KEY=your_typesafe_key
JEV_API_KEY=your_typesafe_key
JEV_MODEL=jev-latest

# Groq System 2 Multi-Key Rotation Pool
GROQ_API_KEY=gsk_key1,gsk_key2,gsk_key3

# App URL
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

---

## Design System & Privacy Boundaries
- **Strict Zero-Emoji Policy**: All UI elements and code use elegant SVG icons from Lucide React (`lucide-react`).
- **Warm Editorial Aesthetic**: Warm ivory canvas (`#faf8f5`), rich slate/ink typography (`#1c1917`), and terracotta/crimson accents (`#991b1b`).
- **Honest Unknowns**: The platform strictly preserves unknown relationship intentions and refrains from inferring private personal preferences from public professional data.
