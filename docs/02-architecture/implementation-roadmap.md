# 🗓 Implementation Roadmap

The Next.js App Router migration is mapped across 7 execution phases.

---

## Phase 0 — Next.js Setup (Day 1)
- [ ] Initialize Next.js project using `create-next-app` under JS and App Router configurations.
- [ ] Clean up redundant folders (`app/` boilerplate files) and verify dependencies in `package.json`.
- [ ] Configure Tailwind configurations if needed, or import global Vanilla CSS files (`index.css`, `animations.css`) inside the Next.js layout configuration.
- [ ] Update public directory metadata (favicon, manifest, robots configuration).

## Phase 1 — Route Architecture (Day 2)
- [ ] Implement Next.js Root Layout (`src/app/layout.js`) containing HTML/Body tags, Google Font setups, global stylesheet targets, and App Providers.
- [ ] Setup Context Providers (`AuthContext`, `ChatContext`, etc.) beginning with `'use client'`.
- [ ] Set up Next.js pages:
  - `src/app/page.js` — Client Component rendering welcome screen, chat thread, and input area.
  - `src/app/settings/page.js` — Client Component containing account settings.

## Phase 2 — Components Porting (Day 3–4)
- [ ] Move interactive authentication components (`components/auth/*`) to the Next.js directory, adding `'use client'` tags where hook APIs are invoked.
- [ ] Port layouts (`components/layout/*`) and sidebar lists (`components/sidebar/*`).
- [ ] Move active chat templates (`components/chat/*`) and input areas (`components/input/*`).

## Phase 3 — Next.js API Routes & SSE Streaming (Day 5)
- [ ] Build Next.js API route handler: `src/app/api/chat/stream/route.js`.
- [ ] Implement simulated Server-Sent Events (SSE) responses inside Next.js routes to stream assistant chunks.
- [ ] Bind SSE browser events on the client side using the Fetch API or standard EventSource.

## Phase 4 — Layout Polish & Keyframes (Day 6)
- [ ] Import global custom transitions, ensuring modal animations (`scaleIn`) and message cascades (`messageIn`) execute on state changes.
- [ ] Ensure mobile navigation drawers check breakpoint parameters via custom Hooks.
- [ ] Confirm local storage caches sync user sessions across reloads.

## Phase 5 — Verification & Production Build (Day 7)
- [ ] Run Next.js production compilers:
  ```bash
  npm run build
  ```
- [ ] Ensure Server Components are compiled and Client boundary scripts do not raise errors during static generation.
- [ ] Launch production server locally:
  ```bash
  npm run start
  ```
- [ ] Verify onboarding steps, message dispatching, theme toggles, and streaming outputs.
