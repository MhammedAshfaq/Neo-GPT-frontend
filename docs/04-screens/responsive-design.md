# 📱 Responsive Design Strategy

The Neo GPT frontend is optimized for multiple devices using CSS media queries.

---

## 1. Viewport Breakpoints

| Device Category | Width Breakpoint | Layout Adaptations |
|---|---|---|
| **Mobile** | `< 768px` | Sidebar hidden. Input extends to screen edges. Welcome suggestions change to a single vertical column. |
| **Tablet** | `768px – 1023px` | Sidebar transitions into a drawer modal overlay toggleable via a hamburger button. |
| **Desktop** | `1024px – 1279px` | Left sidebar remains fixed at 260px. Chat containers dynamically adjust widths. |
| **Wide Screen** | `1280px+` | Center chat contents are constrained to a maximum width of 720px and centered. |

---

## 2. Mobile Layout Specifications

### Header Hamburger Toggle
The hamburger menu button `[☰]` becomes visible on mobile headers, triggering translation transitions to slide the sidebar drawer in or out.

### Slide-in Drawer Menu
On mobile viewports, the sidebar uses `position: fixed`, `height: 100vh`, `width: 280px`, and slides in from the left (`transform: translateX(-100%)` to `0`).

### Dimmed Overlay Backdrop
Opening the mobile drawer overlays a semi-transparent dark layer behind the sidebar, dimming the chat content. Tapping anywhere on this background dismisses the active drawer.

### Simplified Inputs
The voice input and attachment buttons can collapse into an options menu `[...]` on narrow screens to maximize space for the typing text area.
