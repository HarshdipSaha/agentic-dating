# Agentic Dating Site 💘🤖

> **Autonomous multi-agent dating platform powered by real LinkedIn + Instagram profiles, Personal MCP (Model Context Protocol) digital doubles, and JEV System 1 deterministic compatibility scoring.**

Each individual is represented by an autonomous AI agent backed by their own **Personal MCP Server** (reference: [`HarshdipSaha/harshdipsaha-mcp`](https://github.com/HarshdipSaha/harshdipsaha-mcp)). The agents date each other on their person's behalf, querying each other's MCP tools, and outputting mathematically calibrated compatibility rankings with evidence receipts.

---

## 🌟 Highlights
- **25+ Real Verified Profiles**: Seeded with real LinkedIn and public Instagram profile pairs (founders, creators, researchers, engineers, artists).
- **Personal MCP Digital Doubles**: Every individual possesses a Model Context Protocol endpoint exposing standardized tools (`getProfile`, `getInterestsAndHobbies`, `getValuesAndDealbreakers`, `askCandidateQuestion`, `checkLogistics`).
- **Two-Tier Cognitive Architecture**:
  - **System 2 (Generative Dialogue Engine)**: Low-latency date simulations, witty banter, emotional dynamics, and real-time MCP tool invocations.
  - **System 1 (JEV Cortex / TypeSafe AI)**: Non-hallucinatory rubric classification (`choice`, `score`, `noul`) directly assessing lifestyle alignment, dealbreaker checks, and ambition synergy.
- **Autonomous Multi-Round Dates**: Watch agents actually go on dates, discover mutual interests, banter over coffee or dinners, and vet red flags.
- **Explainable Compatibility Rankings**: Clear, structured ranking board for every person with breakdowns across Values, Lifestyle, Chemistry, and Logistics.
- **Interactive Live Web App**: Clean, responsive UI with profile cards, live date transcripts, match ranking matrix, and interactive URL submission.

---

## 🧠 Architecture: Personal MCP + JEV Cortex

For complete architectural specifications, schemas, and diagrams, see [docs/PERSONAL_MCP_AND_JEV_ARCHITECTURE.md](docs/PERSONAL_MCP_AND_JEV_ARCHITECTURE.md).

```
   LinkedIn + Public Instagram Profiles
                   │
                   ▼
       Personal MCP Digital Doubles
   (e.g., https://github.com/HarshdipSaha/harshdipsaha-mcp)
                   │
                   ├──────────────────────────────────────┐
                   │                                      │
                   ▼                                      ▼
         System 2 Dating Sim                    System 1 JEV Cortex
     (Dialogue & MCP Invocations)            (Deterministic Rubric Math)
                   │                                      │
                   └──────────────────┬───────────────────┘
                                      │
                                      ▼
                      Ranked Match Matrix with Receipts
```

---

## 🛠 Tech Stack
- **Frontend / Fullstack**: Next.js 15 (App Router), React 19, Tailwind CSS, Lucide Icons, Framer Motion
- **Deterministic Classification (System 1)**: `@typesafe-ai/sdk` (Jev Cortex - unlimited tokens) for dealbreaker vetting, rubric scoring, and zero-hallucination alignment.
- **Dialogue & Agent Simulation (System 2)**: Groq (Llama-3.3-70b / Mixtral with multi-key rotation) & Gemini 2.5/Flash
- **Protocol & Interfaces**: Model Context Protocol (MCP) tool standard (`@modelcontextprotocol/sdk`)
- **Data Ingestion**: Multi-tiered scraper (Playwright headless sessions, Apify profile actors, OpenGraph metadata parsing)

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or pnpm

### Setup
```bash
git clone https://github.com/HarshdipSaha/agentic-dating.git
cd agentic-dating
npm install
```

Copy `.env.example` to `.env.local` and configure your keys:
```bash
cp .env.example .env.local
```

### Run the App
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the live app.
