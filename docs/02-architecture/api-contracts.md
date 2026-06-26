# 🔌 API Contracts (Frontend View)

The frontend application communicates with the backend via REST endpoints. Conversational responses are streamed to the client using Server-Sent Events (SSE).

---

## 1. Authentication Endpoints

All auth endpoints utilize JSON headers. Authenticated routes require an authorization bearer header: `Authorization: Bearer <token>`.

### Register / Login
* `POST /api/auth/register` — Creates a new account.
  * *Request Body:* `{ "email": "user@example.com", "password": "password123" }`
  * *Response:* `{ "token": "jwt...", "user": { ... } }`
* `POST /api/auth/login` — Log in using credentials.
  * *Request Body:* `{ "email": "user@example.com", "password": "password123" }`
  * *Response:* `{ "token": "jwt...", "user": { ... } }`

### Social Authentication
* `POST /api/auth/google` — Sign in with Google provider token.
  * *Request Body:* `{ "token": "google_id_token..." }`
* `POST /api/auth/apple` — Sign in with Apple provider token.
  * *Request Body:* `{ "token": "apple_id_token..." }`
* `POST /api/auth/phone` — Sends OTP code to cellular phone.
  * *Request Body:* `{ "phoneNumber": "+1234567890" }`

### Verification & Setup
* `POST /api/auth/verify-otp` — Confirms registration/reset OTP.
  * *Request Body:* `{ "email": "user@example.com", "code": "123456" }`
* `POST /api/auth/resend-otp` — Resends a verification OTP code.
  * *Request Body:* `{ "email": "user@example.com" }`
* `GET /api/auth/me` — Fetches current user profile based on active bearer token.
  * *Response:* `{ "id": "...", "name": "...", "email": "..." }`
* `PATCH /api/auth/profile` — Saves display preferences.
  * *Request Body:* `{ "name": "Alex", "preferences": { "theme": "dark", "useCase": ["Dev"] } }`

---

## 2. Chat / Conversation Endpoints

### CRUD Operations
* `GET /api/conversations` — Retrieves full conversation histories list.
  * *Response:* `Conversation[]` (without messages payloads to keep transfer lightweight)
* `POST /api/conversations` — Initiates a blank thread.
  * *Request Body:* `{ "title": "New Conversation", "model": "neo-gpt-v1" }`
  * *Response:* `Conversation`
* `GET /api/conversations/:id` — Fetches full messages thread details.
  * *Response:* `Conversation` (includes complete `Message[]` array)
* `PATCH /api/conversations/:id` — Renames thread title.
  * *Request Body:* `{ "title": "Updated Title" }`
* `DELETE /api/conversations/:id` — Destroys thread context.

---

## 3. Streaming Chat Engine (SSE)

To simulate streaming chat characters, the client queries:
`POST /api/chat/stream`

### Request Parameters
* *Headers:* `Accept: text/event-stream`
* *Body:*
```json
{
  "conversationId": "chat-uuid...",
  "message": "Explain quantum physics",
  "model": "neo-gpt-v1",
  "history": [
    { "role": "user", "content": "Hi" },
    { "role": "assistant", "content": "Hello! How can I help you?" }
  ]
}
```

### Response Format (Server-Sent Events)

Responses are delivered in real time chunks utilizing the standard SSE protocol.

```
data: {"delta": "Quantum"}

data: {"delta": " physics"}

data: {"delta": " is"}

data: {"delta": " a"}

data: {"delta": " branch"}

data: {"delta": " of"}

data: {"delta": " science."}

data: [DONE]
```

* **Chunk properties:** Each line is prefixed with `data: `, containing JSON delta keys.
* **Stream termination:** The stream closes when the `data: [DONE]` signal is parsed.
