# 💾 State Management Plan

Neo GPT uses React's Context API for global state management. Local state is kept within components, and persistent states are sync'd to local storage.

---

## 1. Context Architecture

### `AuthContext`
Manages user authentication session state, authentication steps, and onboarding details.
* **State Values:**
  * `user: User | null` — The current authenticated user profile object.
  * `isAuthenticated: boolean` — Flag representing whether user is logged in.
  * `isLoading: boolean` — Loading state for login / register / OTP check.
  * `authStep: 'idle' | 'email' | 'password' | 'otp' | 'onboarding'` — Current step in onboarding.
  * `showAuthModal: boolean` — Controls whether the auth modal is visible.
  * `pendingEmail: string` — Email entered in Step A, passed to subsequent steps.
* **Actions:**
  * `openAuth() / closeAuth()` — Controls modal overlay visibility.
  * `submitEmail(email)` — Validates email and proceeds to step B or C.
  * `login(email, password)` — Submits credentials to login endpoint.
  * `register(email, password)` — Registers a user, moves to OTP check.
  * `verifyOtp(code)` — Submits verification code.
  * `completeOnboarding(data)` — Submits wizard preferences and completes signup.
  * `socialLogin(provider)` — Launches Google or Apple oauth flow.
  * `logout()` — Destroys current session token and state.

### `ChatContext`
Manages conversation lists, active thread messages, loading states, and simulated streaming.
* **State Values:**
  * `conversations: Conversation[]` — Array of past active chat metadata.
  * `activeConversationId: string | null` — ID of the active chat thread.
  * `activeConversation: Conversation | null` — The active conversation details.
  * `isLoading: boolean` — Whether the app is waiting for an AI response.
  * `isStreaming: boolean` — Whether the AI response characters are streaming.
* **Actions:**
  * `sendMessage(text)` — appends user bubble, triggers AI response stream.
  * `createNewConversation()` — resets active states to empty welcome screen.
  * `selectConversation(id)` — loads conversation detail by ID.
  * `deleteConversation(id)` — deletes conversation list item.
  * `renameConversation(id, title)` — renames conversation list item.

### `ThemeContext`
Manages dark / light aesthetic parameters.
* **State Values:**
  * `theme: 'dark' | 'light'`
* **Actions:**
  * `toggleTheme()` — updates local preference and changes `data-theme` attribute on the HTML element.

### `AppContext`
Manages global UI states, layout toggles, model configs, and toast queues.
* **State Values:**
  * `sidebarOpen: boolean` — Visibility of side navigation panel.
  * `selectedModel: string` — Name of the currently selected AI model.
  * `toasts: Toast[]` — Queue of active Toast alerts.
* **Actions:**
  * `toggleSidebar()` — opens/closes sidebar.
  * `changeModel(model)` — updates active model badge.
  * `addToast(message, type)` — appends toast message.
  * `removeToast(id)` — drops toast from array.

---

## 2. Data Models (TypeScript Definitions)

```typescript
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  preferences: {
    theme: 'dark' | 'light';
    defaultModel: string;
    useCase: string[];
  };
  createdAt: string;
}

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  isStreaming?: boolean;
}

export interface Conversation {
  id: string;
  title: string;
  messages: Message[];
  model: string;
  createdAt: string;
  updatedAt: string;
}

export interface Toast {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
}
```

---

## 3. Local Storage Schema

| Key | Expected Type | Description |
|---|---|---|
| `neo-gpt-token` | `string` | Auth JWT token sent in bearer headers. |
| `neo-gpt-user` | `string` (JSON Stringify) | Serialized User object cached locally. |
| `neo-gpt-conversations` | `string` (JSON Stringify) | Cache of user's conversations list. |
| `neo-gpt-theme` | `'dark' \| 'light'` | Saved user preference for UI theme. |
| `neo-gpt-model` | `string` | Active model selection string. |
