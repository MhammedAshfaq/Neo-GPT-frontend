# 🗺 Screen Flow Map

This document maps the page transitions and conditional modals triggering user session changes in the Next.js App Router.

---

## Next.js Routing Map

```
  ┌─────────────┐
  │   App Load  │  (Mounts at / app route)
  └──────┬──────┘
         │
         ▼
  ┌─────────────────────────┐       ┌────────────────────────┐
  │  Is User Authenticated? │──No──▶│  SCREEN 1: AUTH MODAL  │  (Renders as root overlay)
  └─────────────────────────┘       └──────────┬─────────────┘
         │ Yes                                  │
         │                    ┌─────────────────┼──────────────────┐
         │                    ▼                 ▼                  ▼
         │             [Social Auth]     [Email Flow]        [Phone Auth]
         │                    │                 │
         │                    │          ┌──────▼──────┐
         │                    │          │  Password   │
         │                    │          │   Entry     │
         │                    │          └──────┬──────┘
         │                    │                 │
         │                    │    ┌────────────▼──────────┐
         │                    │    │  OTP Verification     │ (new users)
         │                    │    └────────────┬──────────┘
         │                    │                 │
         │                    │    ┌────────────▼──────────┐
         │                    │    │  Onboarding Wizard    │ (new users only)
         │                    │    │  Step 1: Name/Avatar  │
         │                    │    │  Step 2: Use Cases    │
         │                    │    │  Step 3: Preferences  │
         │                    │    └────────────┬──────────┘
         │                    │                 │
         └────────────────────┴─────────────────┘
                               │
                               ▼
               ┌───────────────────────────────┐
               │   SCREEN 2: HOME SCREEN       │  (Path: /)
               │   (Welcome State — no chats)  │
               └───────────────┬───────────────┘
                               │ User sends first message
                               ▼
               ┌───────────────────────────────┐
               │   SCREEN 3: ACTIVE CHAT       │  (Path: /?c=uuid or URL parameters)
               │   (Chat thread in progress)   │
               └───────────────┬───────────────┘
                               │ User clicks Settings
                               ▼
               ┌───────────────────────────────┐
               │   SCREEN 4: SETTINGS PAGE     │  (Path: /settings)
               └───────────────────────────────┘
```

---

## App Router Transition Rules

1. **Authentication Guard:** The app root layout renders global wrappers. If credentials are missing in local storage cache elements, client-side route guards intercept and render **Screen 1: Auth Modal** as an overlay blocking the page.
2. **Dynamic Chat Parameter Routing:** Active conversations modify URL parameters (`/?c=<id>`) or search parameters. The home page Client Component reads this parameter, loads matching conversation records, and transitions to **Screen 3: Active Chat**.
3. **Settings Navigation:** Clicking the settings icon triggers a Next.js client transition using `next/link` or `useRouter().push('/settings')`, loading the **Screen 4: Settings Page** layout.
