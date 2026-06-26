# ⚙️ Settings Panel (Screen 4)

This layout displays when the user clicks the Settings (⚙) icon.

---

## 1. Page Layout Spec

```
┌─────────────────────────────────────────────────────────┐
│  SIDEBAR │    ← Settings                                │
│          │   ═══════════════════════════════════        │
│          │                                              │
│          │   General                                    │
│          │   ─────────────────────────────────          │
│          │   Theme           [Dark ●] [Light ○]         │
│          │   Language        [English            ▼]     │
│          │   Font size       [Small] [Medium●] [Large]  │
│          │                                              │
│          │   Model                                      │
│          │   ─────────────────────────────────          │
│          │   Default model   [Neo GPT v1        ▼]     │
│          │   Temperature     [──────●──────] 0.7       │
│          │                                              │
│          │   Account                                    │
│          │   ─────────────────────────────────          │
│          │   Display name    [Alex                ]     │
│          │   Email           user@example.com           │
│          │   API Key         [sk-••••••••     Show]     │
│          │                                              │
│          │   About                                      │
│          │   ─────────────────────────────────          │
│          │   Version         Neo GPT v1.0.0             │
│          │   ───────────────────────────────────        │
│          │   [Log out]                                  │
└─────────────────────────────────────────────────────────┘
```

---

## 2. Option Group Details

### General settings
* **Theme Selector:** Toggle switch changing themes between dark and light variables.
* **Language Select:** Dropdown showing localized languages (default English).
* **Font Size Picker:** Three-button group (Small, Medium, Large) adjusting paragraph sizes.

### Model configurations
* **Default Model:** Dropdown listing options (`Neo GPT v1`, `Neo Plus`, `Neo Turbo`).
* **Temperature Slider:** Slider input (0.0 to 1.0) controlling AI response creativity (default 0.7).

### Account Details
* **Display name:** Input field allowing users to change their name.
* **Email Display:** Read-only label showing the registered email.
* **API Key:** Password-masked input field with a toggle to reveal/hide custom API Keys.
* **Logout Button:** Red highlight button to clear local session variables.
