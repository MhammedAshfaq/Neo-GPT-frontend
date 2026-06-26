# 📁 File & Folder Structure

Below is the directory design representing the file structure of the Next.js App Router frontend codebase:

```
frontend/
├── docs/                       # Project documentation folder
│
├── public/
│   ├── favicon.ico             # Page icon
│   └── robots.txt              # SEO crawling guidance
│
├── src/
│   ├── app/                    # Next.js App Router directory
│   │   ├── layout.js           # Root layout wrapping HTML, global fonts, & Providers
│   │   ├── page.js             # Main page container (welcome screen & chat threads)
│   │   ├── settings/           
│   │   │   └── page.js         # Settings screen page container
│   │   └── api/                
│   │       └── chat/           
│   │           └── stream/     
│   │               └── route.js# SSE server streaming route handler
│   │
│   ├── components/             # Reusable Client & Server components
│   │   ├── auth/               # Login modal, OTP form, and onboarding wizard
│   │   ├── chat/               # Main welcome screen, orb logo, and message bubbles
│   │   ├── input/              # Growable textarea, attachments, and voice mic inputs
│   │   ├── layout/             # Structure wrapper, navigation sidebar
│   │   └── ui/                 # Custom modal, toasts, buttons
│   │
│   ├── context/                # Client State Providers ('use client')
│   │   ├── AuthContext.jsx     # User authentication status & setup wizard steps
│   │   ├── ChatContext.jsx     # Active threads loading states, localStorage cache sync
│   │   ├── ThemeContext.jsx    # User preference toggle state
│   │   └── AppContext.jsx      # Navigation flags and toast queues
│   │
│   ├── hooks/                  # Client-side custom React Hooks
│   │   ├── useAuth.js          # Consumes AuthContext
│   │   ├── useChat.js          # Consumes ChatContext
│   │   ├── useTheme.js         # Consumes ThemeContext
│   │   └── useMediaQuery.js    # Window breakpoint checks
│   │
│   ├── services/               # Client-side API query managers
│   │   ├── api.js              # Interceptors setup
│   │   ├── authService.js      # User setup requests
│   │   └── chatService.js      # CRUD list modifications
│   │
│   ├── utils/                  # Miscellaneous scripts
│   │   ├── dateFormat.js       # Date sorting helpers
│   │   └── constants.js        # Constant parameters (models, layout configs)
│   │
│   └── styles/                 # Theme styling files
│       ├── globals.css         # Import configurations mapping globals
│       ├── index.css           # Token maps and theme resets
│       └── animations.css      # Keyframes definitions
│
├── next.config.mjs             # Next.js configurations
├── tailwind.config.mjs         # Tailwind configuration (optional / unused fallback)
├── jsconfig.json               # Path alias configs (@/*)
└── package.json                # Project configurations & npm dependency lists
```
