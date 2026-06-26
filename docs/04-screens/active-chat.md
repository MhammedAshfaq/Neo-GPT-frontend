# 💬 Active Chat Screen (Screen 3)

This layout displays once a conversation has messages.

---

## 1. Screen Layout Overview

```
╔═══════════════════════════════════════════════════════════╗
║  SIDEBAR  │         HEADER BAR                            ║
║           ├───────────────────────────────────────────────║
║           │                                               ║
║           │   [User Avatar]                               ║
║           │   How do I center a div in CSS?     [USER]    ║
║           │                                               ║
║           │   [Neo Orb]  Neo GPT                          ║
║           │   There are several ways to center a div...   ║
║           │                                               ║
║           │   ```css                                      ║
║           │   .container {                                ║
║           │     display: flex;                           ║
║           │     justify-content: center;                 ║
║           │   }                                           ║
║           │   ```              [Copy]                     ║
║           │                                               ║
║           │   [Copy] [👍] [👎]   ← Message actions       ║
║           │                                               ║
║           │   ● ● ●  (typing indicator)                  ║
║           ├───────────────────────────────────────────────║
║           │  [+]  Message Neo GPT...            [🎤] [▶] ║
╚═══════════════════════════════════════════════════════════╝
```

---

## 2. Message Primitives

### User Bubble Spec
* **Alignment:** Right-aligned.
* **Background:** `linear-gradient(135deg, #6d28d9, #5b21b6)` (Brand Purple).
* **Border-radius:** `18px 18px 4px 18px` (flat bottom-right corner).
* **Max-width:** Maxed at 75% of chat viewport container width.

### AI Bubble Spec
* **Alignment:** Left-aligned.
* **Background:** Transparent (no enclosing border bubble).
* **Avatar:** 30px Neo Orb icon alignment left-of-message.
* **Text Formatting:** Decoded via React Markdown supporting standard tables, bold formats, and link tags.
* **Streaming Cursor:** Blinking vertical cursor element (`|`) appended to the final string when streaming.

### Code Highlighting Containers
* **Themes:** Rendered on a dark slate background (`#0d0d18`).
* **Header Bar:** Displays current language title on the left and a "Copy Code" button on the right.
* **Copy Feedback:** Tapping the copy button copies the code block to the clipboard and changes the button text to "Copied!" for 2 seconds.

### Bouncing Dot Typing Indicator
* **Layout:** 3 staggered purple circles (8px) bounce rhythmically during streaming queries.
* **Timing:** Bounce duration set to 600ms.
