# 🎬 Animation & Micro-interaction Catalogue

Animations are managed inside `src/styles/animations.css`. Below is the catalog listing the 12 primary transitions.

---

## Animation Catalog

| Animation Name | Targets | Transition Keyframe | Duration | Easing |
|---|---|---|---|---|
| `logoPulse` | Core Welcome Orb | Scale `1` to `1.04` and expands outer radial glow | 3s | ease-in-out, infinite |
| `ringRotate` | Orb Outer Ring | Rotates a single dot border `0deg` to `360deg` | 8s | linear, infinite |
| `messageIn` | Chat Message Bubbles | Moves vertical offset `12px` to `0px` + fades opacity `0` to `1` | 300ms | ease |
| `typingBounce` | Loading Indicators | Oscillates dots vertically `0` to `-8px` to `0` | 600ms | ease, infinite (staggered) |
| `scaleIn` | Modal Overlay Cards | Pops scale `0.92` to `1.0` and fades opacity `0` to `1` | 280ms | cubic-bezier (spring feel) |
| `fadeIn` | Modal Backdrops | Translates opacity `0` to `1` | 200ms | ease |
| `slideInLeft` | Mobile Sidebar Menu | Slides drawer `translateX(-100%)` to `0%` | 250ms | cubic-bezier |
| `slideInRight` | Toast Alerts | Slides indicator `translateX(110%)` to `0%` | 300ms | ease |
| `welcomeEntry` | Welcome Screen | Pops scale `0.96` to `1.0` and fades opacity | 500ms | ease |
| `cardFloat` | Suggestion Cards | floats elements upward `translateY(-3px)` | 200ms | ease (hover triggered) |
| `cursorBlink` | Streaming Texts | alternates cursor opacity `1` to `0` to `1` | 800ms | step-end, infinite |
| `shimmer` | Skeleton Placeholders| Shifts background gradient positions | 1.5s | linear, infinite |

---

## Implementation Sample

```css
@keyframes messageIn {
  from {
    opacity: 0;
    transform: translateY(12px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.userMessageBubble {
  animation: messageIn 300ms cubic-bezier(0.16, 1, 0.3, 1) forwards;
}
```
