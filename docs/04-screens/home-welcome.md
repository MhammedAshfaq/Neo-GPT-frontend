# 🏠 Home Screen (Screen 2)

This layout displays when a user is authenticated but has not selected an active conversation.

---

## 1. Page Layout Overview

```
╔═════════════════════════════════════════════════════════════╗
║  ┌────────────┐  ┌──────────────────────────────────────┐  ║
║  │            │  │           TOP HEADER BAR              │  ║
║  │  SIDEBAR   │  │  [☰]  Neo GPT ▼  [Model Selector]    │  ║
║  │  (260px)   │  ├──────────────────────────────────────┤  ║
║  │            │  │                                       │  ║
║  │  🔮 Neo    │  │                                       │  ║
║  │            │  │        ┌──────────────┐               │  ║
║  │  + New     │  │        │ 🔮 (Orb      │               │  ║
║  │    Chat    │  │        │   animated)  │               │  ║
║  │            │  │        └──────────────┘               │  ║
║  │  Search    │  │                                       │  ║
║  │            │  │    Hello, Alex! 👋                    │  ║
║  │  ─ Today   │  │    What would you like to explore?    │  ║
║  │  Chat 1    │  │                                       │  ║
║  │  Chat 2    │  │  ┌──────────────┐ ┌──────────────┐   │  ║
║  │            │  │  │  💡 Brainstorm│ │  📝 Write    │   │  ║
║  │  ─ Earlier │  │  └──────────────┘ └──────────────┘   │  ║
║  │  Chat 3    │  │  ┌──────────────┐ ┌──────────────┐   │  ║
║  │            │  │  │  💻 Code     │ │  📊 Analyze  │   │  ║
║  │            │  │  └──────────────┘ └──────────────┘   │  ║
║  │  ─────────  │  ├──────────────────────────────────────┤  ║
║  │  ☀️ Theme  │  │                                       │  ║
║  │  [Avatar]  │  │  ┌──────────────────────────────────┐ │  ║
║  │  └────────────┘  │  │  [+] Message Neo GPT...    [🎤][▶]│ │  ║
║                  │  └──────────────────────────────────┘ │  ║
║                  └──────────────────────────────────────┘  ║
╚═════════════════════════════════════════════════════════════╝
```

---

## 2. Component Breakdowns

### Sidebar Navigation Drawer
* **Fixed Width:** 260px.
* **Colors:** Background `#0e0e16` with a border line separated at the right.
* **Groups:** Conversations are categorized dynamically by date (Today, Yesterday, Last 7 Days).
* **Hover Settings:** Floating icons (pencil to rename and trash bin to delete) appear on hovered list items.

### Top Header Bar
* **Hamburger Icon:** Accessible toggle trigger that displays/hides the sidebar on smaller views.
* **Model Dropdown:** Interactive header dropdown allowing switching of model versions.

### Welcome Core Orb
* **Core Orb Dimensions:** `96px x 96px` purple gradient shape.
* **Animations:** Pulse transition (`logoPulse`) paired with a rotating outer dot border ring.
* **Personalized Greeting:** Greets the user dynamically by retrieving the name configured in onboarding.

### Suggested Query Cards
* **Grid Format:** 2 columns, centered, max-width 540px.
* **Interaction:** Cards float upward when hovered. Clicking a card auto-submits the prompt delta into the active message list.

### Bottom Entry Input
* **Auto-resize:** Expands heights from 1 row up to 6 rows.
* **Submit Action:** Shift+Enter appends vertical breaks, while the Enter key triggers message dispatch actions.
