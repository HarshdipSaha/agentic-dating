# Research and feasibility findings

Research date: 14 October 2026. Method: targeted web searches, primary provider/API documentation, and Playwright browser probes. This document distinguishes documented capabilities from observed behavior and proposed implementation decisions.

## What was observed

1. The T3 collaborative preview reported unavailable, then failed two initialization attempts: one timeout and one client initialization error. The user expressly requested Playwright, so the subsequent browser probes used the local Playwright installation.
2. Node v22.23.2 and Playwright were available. The default browser cache path was missing; setting `PLAYWRIGHT_BROWSERS_PATH=H:\playwright-browsers` selected an existing installation successfully. No private browser session or stored cookies were reused.
3. Both tested LinkedIn profiles (`warikoo` and `ali-abdaal`) returned HTTP 999 and a sign-up page in the logged-out browser. The browser did not read a full LinkedIn profile from those responses. See the corresponding files in `research/browser-artifacts`.
4. Both tested Instagram profile headers loaded with HTTP 200. They exposed public header text but that alone did not verify that the accounts' posts are public.
5. After targeted discovery searches, the candidate browser script opened 25 Instagram URLs. One initial handle, `varunmayya`, had an unrelated sparse header. An additional search located `thevarunmayya`; its header matched the intended person's name. The candidate manifest was corrected and the corrected URL was checked. The old probe remains as evidence of the rejected lead.
6. The final 25 candidate Instagram URLs returned recognizable headers in this run. The probe deliberately leaves `publicStatus` unverified and `identityStatus` requiring review. HTTP status/title matching is not a public-account or ownership certification.
7. The LinkedIn Actor input page exposed `profileScraperMode`, `urls`, `queries`, `publicIdentifiers`, and `profileIds`. The first Instagram input-page browser capture loaded navigation before the schema rendered; it is incomplete as schema evidence. Its actual documented fields were checked through web retrieval rather than treating that screenshot as a successful schema read.
8. No authenticated Actor execution was performed. No source-backed personal profiles, model dates, rankings, live deployment, public repository, or submission video were produced by this research pass.

## Provider findings and implementation implications

| Finding | Primary source | Implication |
| --- | --- | --- |
| Instagram profile collection supports profile metadata and recent posts, including a private-status field in its output example | [Apify Instagram Profile Scraper](https://apify.com/apify/instagram-profile-scraper) | Start with this maintained actor; validate the actual returned private-field shape and reject unknown status |
| Instagram input requires `usernames`; `includeAboutSection` is optional | [Instagram input schema](https://apify.com/apify/instagram-profile-scraper/input-schema) | Extract the handle from an approved profile URL; keep optional account enrichment off initially |
| The LinkedIn actor accepts profile URLs and separates ordinary profile details from email-search mode | [LinkedIn input schema](https://apify.com/harvestapi/linkedin-profile-scraper/input-schema) | Use the actual documented URL field and profile-only mode, not a guessed generic `profileUrls` field |
| LinkedIn email search is independent of the public profile | [LinkedIn actor documentation](https://apify.com/harvestapi/linkedin-profile-scraper) | Disable it to preserve the two-source requirement |
| Some other LinkedIn actors advertise company enrichment | [Alternative provider example](https://apify.com/atomus/linkedin-profile-scraper) | Do not forward all provider fields to the model; allowlist the person's own profile content |
| Another actor offers archive fallback and similar-profile extraction | [Alternative provider with fallback](https://apify.com/socialdataapi/linkedin-profile-scraper) | Avoid automatic expansion of source scope; provenance must still identify the two admitted accounts |
| The JavaScript client runs actors and retrieves their default datasets; an API token is required | [Apify JavaScript quick start](https://docs.apify.com/api/client/js/docs/introduction/quick-start) | Server-side adapter plus durable worker; provider capability is not equivalent to a successful trial |
| The API exposes an asynchronous Actor run endpoint | [Run Actor](https://docs.apify.com/api/v2/actors-runs-post) | Keep run IDs and let the worker poll; do not hold the user's page request open for the entire scrape |
| Completion/failure events are available for webhooks | [Webhook events](https://docs.apify.com/integrations/webhooks/events) | Webhooks can accelerate progress updates, but dataset validation and idempotency still belong to the application |
| Browser video is finalized by closing the context | [Playwright videos](https://playwright.dev/docs/videos) | Close the context before trimming/uploading a recording |

Vendor claims about no-login collection, volume, availability, price, or timing were not independently benchmarked. Actor listings and input/output schemas change; preserve tested build identifiers and capture the trial outputs. The specification chooses an initial integration path, not an uptime guarantee.

## Why the identity gate matters

The first search for Sharan Hegde returned a Seattle McKinsey profile at `sharanhegde`, while a more specific search located the finance creator at `sharanhegde95`. Both are real name matches; only one is the intended candidate. [Namesake profile](https://www.linkedin.com/in/sharanhegde), [intended candidate profile](https://www.linkedin.com/in/sharanhegde95).

The same problem occurred with Rachana Ranade: a broad search found a Google research profile, while the finance educator appeared under `carachanaranade`. [Namesake profile](https://www.linkedin.com/in/rachanaranade), [intended candidate profile](https://www.linkedin.com/in/carachanaranade).

The browser then caught the Varun Mayya Instagram handle mismatch. This is a concrete reason to treat search results as discovery leads and require verification before using a pair. An external page can help locate links, but its biographical content must not enter the agent's profile. The official LinkedIn and Instagram remain the only two permitted personal evidence sources.

## Candidate research artifacts

- `research/candidates.json`: 25 corrected URL pairs, explicitly marked as candidates.
- `research/CANDIDATES.md`: browsable pair list and verification status.
- `research/check-candidates.cjs`: repeatable Instagram header probes, optionally limited to one candidate by name.
- `research/candidate-browser-checks/summary.json`: final per-candidate observations.
- `research/candidate-browser-checks/*.json` and `*.png`: individual browser observations and screenshots, including the rejected handle probe.
- `research/browser-research.cjs`: initial provider and source feasibility probes.
- `research/browser-artifacts/summary.json`: initial seven-page research summary.

These are research records. They must not be imported as fictional ready profiles or counted as proof that 25 people have dated. No candidate's needs, personality, or romantic preferences were analyzed during discovery.

## Required live feasibility experiment

Before implementation scales:

1. Run the two selected Actors with valid server-side credentials on two official candidate pairs.
2. Confirm input fields and the exact profile-only enum for the LinkedIn adapter.
3. Confirm two matching identities per person and an explicitly false Instagram private flag.
4. Inspect whether the selected adapter's content provenance is confined to the two accounts. Strip or reject independent enrichment.
5. Save source timestamps, Actor build/run IDs, normalized fields, and evidence locators.
6. Generate two analyzed profiles with every displayed claim supported by those snapshots.
7. Run eight alternating model turns and two independent reflections. Verify that each subsequent speaker receives the committed preceding turn.
8. Open the profile, transcript, and rank in a fresh browser session; reload during execution and confirm recovery.
9. Measure latency, token usage, failure rate, and acquisition cost. Use the measurements to size the 25-person run.

If this experiment fails, do not describe the live-import path as functional. The browser observations already demonstrate that a hand-written public-page scraper needs more than URL fetching.

## Proposed choices versus established facts

Established: the supplied brief demands at least 25 real people, two allowed source accounts per person, actual agent dates, rankings for each person, functioning new-link imports, and a ≤3-minute video.

Observed: the candidate headers and logged-out access failures summarized above.

Documented: the cited provider fields and API mechanisms.

Proposed: Twofold's stack, round-robin coverage, eight-turn dates, rubric weights, durable job design, UI style, and deployment platform. These need implementation and live testing. The brief does not explicitly require every possible pair to date, but an all-pairs run is the clearest way to support a complete ranking without silently substituting unevaluated profile similarity.

Unknown: candidate ownership verification, explicit Instagram public status, access reliability and costs under authenticated Actor execution, actual model throughput, live site hosting, publication permissions, and whether the grader accepts transparent interest-based simulation without inferred private romantic preferences.
