# 🎨 Color System & Design Tokens

Neo GPT defines a structured color palette converted to reusable CSS variables.

---

## 1. Color Palette

```
╔══════════════════════════════════════════════════════════╗
║   BACKGROUNDS                                            ║
║   ████  #0a0a0f  Base (deepest bg)                      ║
║   ████  #0e0e16  Sidebar bg                             ║
║   ████  #13131c  Surface (cards, modals)                ║
║   ████  #1a1a28  Elevated (inputs, hovers)              ║
║   ████  #22223a  Hover state                            ║
║                                                          ║
║   PRIMARY ACCENT — Neo Purple                            ║
║   ████  #b4a4ff  Light (primary-300)                    ║
║   ████  #9070ff  Mid (primary-400)                      ║
║   ████  #7c3aed  Brand (primary-500) ← Main Accent      ║
║   ████  #6d28d9  Dark (primary-600)                     ║
║   ████  #5b21b6  Darker (primary-700)                   ║
║                                                          ║
║   SECONDARY ACCENT — Cyan Glow                           ║
║   ████  #22d3ee  Cyan-400                               ║
║   ████  #06b6d4  Cyan-500                               ║
║                                                          ║
║   TEXT                                                   ║
║   ████  #f0eeff  Primary text                           ║
║   ████  #a09abf  Secondary text                         ║
║   ████  #6b6490  Muted text                             ║
║   ████  #4a4568  Placeholder text                       ║
║                                                          ║
║   SEMANTIC                                               ║
║   ████  #10b981  Success (green)                        ║
║   ████  #f59e0b  Warning (amber)                        ║
║   ████  #ef4444  Error (red)                            ║
╚══════════════════════════════════════════════════════════╝
```

---

## 2. Design Token Mapping

These tokens are configured in the root `src/styles/index.css` file as CSS variables.

| Variable Name | Assigned Color | UI Element Target |
|---|---|---|
| `--bg-base` | `#0a0a0f` | Main chat layout, root body background. |
| `--bg-sidebar` | `#0e0e16` | Left side navigation drawer/panel background. |
| `--bg-surface` | `#13131c` | Onboarding card, popups, model dropdown lists. |
| `--bg-elevated` | `#1a1a28` | Text areas, input fields, code container shells. |
| `--primary-500` | `#7c3aed` | Main buttons, focus highlights, loading dots. |
| `--primary-glow` | `rgba(124, 58, 237, 0.35)` | Box shadows, logo borders, card overlays. |
| `--border-default` | `rgba(255, 255, 255, 0.09)` | Borders on unselected text boxes and cards. |
| `--border-accent` | `#7c3aed` | Border applied to focused text areas or active items. |
| `--text-primary` | `#f0eeff` | High-contrast title labels and active outputs. |
| `--text-secondary` | `#a09abf` | General descriptions and assistant chat text. |
| `--text-muted` | `#6b6490` | Timestamps, micro-descriptions, settings text. |
