# Twofold

Twofold is an early-stage agentic dating project. It explores how separate agents can build source-backed profiles, hold simulated dates, and produce explainable rankings.

The repository contains a product specification, architecture notes, and early TypeScript project scaffolding. It does not yet contain a complete website, a live scraper, or a finished 25-person demo. The candidate list is research material: its entries have not passed identity and Instagram public-status verification.

## Project structure

```text
docs/       Architecture and integration notes
research/   Candidate links and browser research artifacts
scripts/    Local project and research scripts
src/        TypeScript source and shared types
SPEC.md     Product and implementation specification
DELIVERY-PLAN.md
            Build schedule and video storyboard
RESEARCH.md Findings and feasibility notes
```

The shared data types are in `src/types`. The architecture proposal in `docs/PERSONAL_MCP_AND_JEV_ARCHITECTURE.md` describes a Personal MCP interface and a two-part agent design: Groq for conversation generation and JEV through `@typesafe-ai/sdk` for structured scoring. These are proposed integrations; the current codebase does not yet implement that complete flow.

## Get started

Requires Node.js and npm.

```powershell
npm install
Copy-Item .env.example .env.local
npm run dev
```

`npm run dev` starts the Next.js development server at `http://localhost:3000`. The application routes and full UI are still to be implemented, so this currently runs the project scaffold. Configure provider keys in `.env.local` before adding provider-backed features. Keep that file private; `.env.local` is excluded from Git.

Available package scripts:

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the Next.js development server on port 3000 |
| `npm run build` | Build the Next.js application |
| `npm start` | Start the production server on port 3000 |
| `npm run typecheck` | Check TypeScript types |

## Proposed data flow

1. A person submits one LinkedIn profile URL and one Instagram profile URL.
2. The server collects and validates data from those accounts.
3. The app creates a profile with links back to its supporting evidence.
4. An agent uses that profile in a clearly labeled simulated date with another agent.
5. The agents assess the conversation independently, and the app presents ranked results with transcript links.

The specification requires both sources to pass identity checks and Instagram public-status checks before analysis. The application must show unknowns when the sources do not support a claim. Public profile information does not establish a person's romantic preferences or real-world interest in another person.

## Research and specifications

- [Product and technical specification](SPEC.md): user stories, architecture, data and API contracts, agent behavior, ranking rules, and acceptance criteria.
- [Delivery plan](DELIVERY-PLAN.md): three-hour schedule, workload estimates, video storyboard, and draft submission text.
- [Research notes](RESEARCH.md): Apify provider research, browser observations, and the live feasibility checks still required.
- [Architecture notes](docs/PERSONAL_MCP_AND_JEV_ARCHITECTURE.md): proposed MCP and scoring architecture.
- [Candidate links](research/CANDIDATES.md): 25 discovery candidates and their current verification status.
- [Candidate manifest](research/candidates.json): candidate LinkedIn and Instagram URLs in JSON format.
- [Browser check results](research/candidate-browser-checks/summary.json): Instagram header observations. These checks do not certify account ownership or public post access.

The research scripts in `research/` use Playwright to inspect public pages in a fresh browser context. They are research utilities, not the application's scraping implementation. The documented Apify actors were evaluated but have not been run with credentials; no successful Apify scrape is represented in this repository.

## Current status

| Deliverable | Status |
| --- | --- |
| Specification and research | Written locally |
| Next.js and TypeScript scaffolding | Present |
| Apify-backed import flow | Not implemented or live-tested |
| Verified 25-person cohort | Not available |
| Complete agent dating run and rankings | Not available |
| Public website, demo, and GitHub submission | Not published |
| Three-minute YouTube video | Not recorded |

The `/to-spec` skill calls for publishing the specification to a configured issue tracker with the `ready-for-agent` label. No tracker was configured for this task, so the specification is saved in the repository instead.
