# 📐 Component Architecture

The Neo GPT user interface is structured modularly. Components are nested within functional modules under `src/components/`.

---

## Component Tree Structure

```
src/components/
│
├── auth/                           # All authentication UI ('use client')
│   ├── AuthModal.jsx               # Main modal wrapper & overlay card
│   ├── SocialAuthButton.jsx        # Unified button for Google/Apple/Phone login
│   ├── EmailAuthForm.jsx           # Handles email entry and password states
│   ├── OTPVerifyForm.jsx           # Monospace boxes with autofill & automatic focus shifts
│   └── OnboardingSteps.jsx         # 3-step first-use setup wizard (personalization details)
│
├── layout/                         # Structural layout views
│   ├── AppShell.jsx                # Flex containment matching side nav with center details ('use client')
│   └── Sidebar.jsx                 # Global sidebar containment layer ('use client')
│
├── sidebar/                        # Sidebar content components ('use client')
│   ├── ConversationList.jsx        # Grouped by date ranges with edit/delete buttons
│   └── SearchBar.jsx               # Filters list matching typed values
│
├── chat/                           # Chat output components ('use client')
│   ├── WelcomeScreen.jsx           # Shown when chat is empty; contains the Core animated orb
│   ├── ChatThread.jsx              # Virtual scroll container for messages list
│   ├── UserMessage.jsx             # User text bubble (right-aligned, solid accent bg)
│   ├── AssistantMessage.jsx        # AI rich-text bubble with markdown parsing
│   └── TypingIndicator.jsx         # Bouncing purple dots loading placeholder
│
├── input/                          # User entry area (at bottom) ('use client')
│   ├── ChatInputArea.jsx           # Wraps textarea, send triggers, disclaimer info
│   ├── AttachButton.jsx            # "+" attachments trigger
│   └── VoiceButton.jsx             # Microphone icon triggering voice inputs
│
└── ui/                             # Global reusable primitives ('use client')
    ├── Toast.jsx                   # Slide-in notifications manager
    └── Modal.jsx                   # Standard responsive dialogue container
```

---

## Server vs. Client Component Boundaries

Next.js separates components into Server Components (rendered on the server by default) and Client Components (rendered in the browser).

### 🖥 Server Components (Default)
Page routes under `src/app/` load layout definitions on the server:
- `src/app/layout.js` parses head tags, loads static layout classes, and renders standard HTML.
- `src/app/settings/page.js` pre-populates static structures on the server before client-side hydration.

### 🌐 Client Components (`'use client'`)
Since Neo GPT is highly interactive (handling live streaming state, markdown transcription, local storage caching, voice APIs, and user onboarding steps), the primary page components use the `'use client'` directive:
- **State Providers:** `src/context/` files must begin with `'use client'` to initialize React Context APIs in the browser.
- **Interactive Leaf Components:** Forms, text inputs, message lists, and copy action buttons are client-rendered to support hooks (`useState`, `useEffect`, `useContext`).
- **Styles & Animations:** Client Components automatically hydrate CSS classes and trigger CSS transitions on browser events.
