# Agentic Dating Site 💘🤖

> **Autonomous multi-agent dating simulation driven by real LinkedIn & Instagram profiles.**
> Each person is represented by an AI agent that analyzes their public persona, goes on simulated multi-round dates with other agents, and outputs ranked matches with compatibility breakdowns.

---

## 🌟 Highlights
- **25+ Real Verified Profiles**: Seeded with real LinkedIn and public Instagram profile pairs.
- **Deep Persona Synthesis**: Extracts needs, hobbies, interests, values, and quirks from public LinkedIn & Instagram data.
- **Agent-on-Agent Dating Sim**: Autonomous date conversations where persona agents interact, banter, evaluate chemistry, red flags, and shared passions.
- **Personalized Compatibility Rankings**: Detailed match matrix & ranking for each individual with explainable compatibility scores and dating summaries.
- **Interactive Live Web App**: Clean, modern UI allowing users to inspect profiles, watch live dates unfold, and input new LinkedIn + Instagram links.

---

## 🛠 Tech Stack
- **Frontend / Fullstack**: Next.js / React, Tailwind CSS, Lucide Icons, Framer Motion
- **Agent Intelligence**: LLM persona reasoning & conversation synthesis (Gemini 2.5/Flash / OpenAI)
- **Data Ingestion**: Multi-tiered scraper (Apify Actors, Puppeteer/Playwright headless sessions, public OpenGraph/Meta scrapers) for LinkedIn and Instagram
- **Evaluation & Matchmaking Engine**: Multi-dimensional compatibility matrix (Values, Lifestyle, Communication, Ambition)

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
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the live app.
