# 🔒 Auth & Onboarding Screen (Screen 1)

This screen manages user authentication and onboarding wizard parameters.

---

## 1. Auth Modal Layout

```
╔═════════════════════════════════════════════════════════╗
║  [Blurred Home Screen in background]                    ║
║                                                         ║
║      ┌─────────────────────────────────┐                ║
║      │  ✕                        (top-right close btn) │
║      │                                                  │
║      │   🔮  Neo GPT                                   │
║      │                                                  │
║      │   Log in or sign up                             │
║      │                                                  │
║      │   You'll get smarter responses, save your       │
║      │   chats, upload files and images, and more.     │
║      │                                                  │
║      │   ┌──────────────────────────────────────┐      │
║      │   │  G  Continue with Google             │      │
║      │   └──────────────────────────────────────┘      │
║      │   ┌──────────────────────────────────────┐      │
║      │   │  🍎  Continue with Apple             │      │
║      │   └──────────────────────────────────────┘      │
║      │   ┌──────────────────────────────────────┐      │
║      │   │  📱  Continue with phone             │      │
║      │   └──────────────────────────────────────┘      │
║      │                                                  │
║      │   ──────────────── OR ────────────────          │
║      │                                                  │
║      │   ┌──────────────────────────────────────┐      │
║      │   │  Email address                       │      │
║      │   └──────────────────────────────────────┘      │
║      │                                                  │
║      │   ┌──────────────────────────────────────┐      │
║      │   │            Continue                  │      │
║      │   └──────────────────────────────────────┘      │
║      │                                                  │
║      │   Don't have an account?  Sign up               │
║      └─────────────────────────────────────────┘        ║
╚═════════════════════════════════════════════════════════╝
```

---

## 2. Step-by-Step Auth Flow

### Step A — Initial Entry (Email + Social)
* **Social buttons:** Google, Apple, and Phone. Pill-shaped buttons with hover lift values.
* **Email input:** Full-width container converting to active purple borders upon focus.
* **Divider line:** Light border elements surrounding the label "OR".

### Step B — Password Entry
* **Read-only Badge:** Shows the email entered in the previous step.
* **Eye Toggle:** Clickable eye icon to reveal the password input in plaintext.

```
┌──────────────────────────────────┐
│  ← Back                          │
│                                  │
│  ✉ user@example.com  (read-only) │
│                                  │
│  Enter your password             │
│                                  │
│  ┌────────────────────────────┐  │
│  │  ••••••••           👁     │  │
│  └────────────────────────────┘  │
│                                  │
│  Forgot password?                │
│                                  │
│  ┌────────────────────────────┐  │
│  │          Log in            │  │
│  └────────────────────────────┘  │
└──────────────────────────────────┘
```

### Step C — OTP Verification (New Registrations)
* **Numeric Fields:** 6 monospace boxes. Focus automatically shifts to the next input box as characters are entered.
* **Autofill Support:** Clipboard paste events parse the first 6 digits into the respective fields.

```
┌──────────────────────────────────┐
│                                  │
│      ○  (envelope animation)     │
│                                  │
│   Check your email               │
│                                  │
│   Enter the 6-digit code sent    │
│   to user@example.com            │
│                                  │
│   ┌──┐ ┌──┐ ┌──┐ ┌──┐ ┌──┐ ┌──┐ │
│   │  │ │  │ │  │ │  │ │  │ │  │ │
│   └──┘ └──┘ └──┘ └──┘ └──┘ └──┘ │
│                                  │
│   Didn't receive it? Resend      │
│   │                              │
│   ┌────────────────────────────┐ │
│   │          Verify            │ │
│   └────────────────────────────┘ │
└──────────────────────────────────┘
```

### Step D — Onboarding Wizard
1. **Name & Identity:** Gathers display name.
2. **Use Case Grid:** Multi-select layout identifying interests (e.g., Work, Education, Dev).
3. **Preferences Setup:** Sets theme defaults and primary AI models.

---

## 3. Specifications Summary

* **Modal Container:** `width: 480px`, `padding: 40px`, backdrop filter blur set to `24px`.
* **Social Buttons:** Transparent base background (`rgba(255, 255, 255, 0.04)`), scale transitions, and hover translations (`translateY(-1px)`).
* **CTA Buttons:** Purple background gradient (`linear-gradient(135deg, #7c3aed, #6d28d9)`) with box-shadow glows.
* **OTP Digit Container:** Dimensions `48px x 56px`, center-aligned monospace text.
