import { createContext, useContext, useState, useCallback, useEffect } from 'react';

const ChatContext = createContext(null);
const STORAGE_KEY = 'neo-gpt-conversations';

function generateId() {
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

function generateTitle(text) {
  return text.length > 42 ? text.slice(0, 42) + '…' : text;
}

export function ChatProvider({ children }) {
  const [conversations, setConversations] = useState(() => {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || []; }
    catch { return []; }
  });
  const [activeConversationId, setActiveConversationId] = useState(null);
  const [isLoading, setIsLoading]   = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const [error, setError]           = useState(null);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(conversations));
  }, [conversations]);

  const activeConversation = conversations.find(c => c.id === activeConversationId) || null;

  /* ── Create new conversation ── */
  const createNewConversation = useCallback(() => {
    const id = generateId();
    const newConv = {
      id, title: 'New Chat', messages: [],
      model: localStorage.getItem('neo-gpt-model') || 'neo-gpt-v1',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setConversations(prev => [newConv, ...prev]);
    setActiveConversationId(id);
    setError(null);
    return id;
  }, []);

  /* ── Send message ── */
  const sendMessage = useCallback(async (text) => {
    if (!text.trim()) return;

    let convId = activeConversationId;
    let isNew  = false;
    if (!convId) { convId = generateId(); isNew = true; }

    const userMsg = {
      id: generateId(), role: 'user',
      content: text.trim(), timestamp: new Date().toISOString(),
    };
    const asstMsg = {
      id: generateId(), role: 'assistant',
      content: '', timestamp: new Date().toISOString(), isStreaming: true,
    };

    setConversations(prev => {
      if (isNew) {
        return [{ id: convId, title: generateTitle(text), messages: [userMsg, asstMsg],
          model: localStorage.getItem('neo-gpt-model') || 'neo-gpt-v1',
          createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(),
        }, ...prev];
      }
      return prev.map(c => c.id !== convId ? c : {
        ...c,
        title: c.messages.length === 0 ? generateTitle(text) : c.title,
        messages: [...c.messages, userMsg, asstMsg],
        updatedAt: new Date().toISOString(),
      });
    });

    if (isNew) setActiveConversationId(convId);
    setIsLoading(true); setIsStreaming(true); setError(null);

    /* Demo fallback responses */
    const demos = [
      `I'm **Neo GPT**, your AI assistant! 🚀\n\nI'm running in **demo mode** right now. To connect a real backend:\n\n\`\`\`bash\n# Start your API server\npython main.py\n# or\nnpm run backend\n\`\`\`\n\nOnce connected, I'll answer every question with full AI power!`,
      `Great question! Here's what I can help you with:\n\n- 💡 **Brainstorm** — Creative ideas on any topic\n- 📝 **Write** — Emails, essays, code comments\n- 💻 **Code** — Debug, explain, or write code\n- 📊 **Analyze** — Break down complex information\n\nWhat would you like to explore?`,
      `Here's a quick code example:\n\n\`\`\`javascript\n// Connecting to Neo GPT API\nconst response = await fetch('/api/chat', {\n  method: 'POST',\n  headers: { 'Content-Type': 'application/json' },\n  body: JSON.stringify({\n    message: userInput,\n    model: 'neo-gpt-v1'\n  })\n});\n\nconst { content } = await response.json();\nconsole.log('AI:', content);\n\`\`\`\n\nSimple, clean, and ready to use. 🎯`,
    ];
    const reply = demos[Math.floor(Math.random() * demos.length)];

    /* Simulate word-by-word streaming */
    const words = reply.split(' ');
    let built = '';
    for (let i = 0; i < words.length; i++) {
      await new Promise(r => setTimeout(r, 22));
      built += (i === 0 ? '' : ' ') + words[i];
      const snap = built;
      setConversations(prev => prev.map(c => c.id !== convId ? c : {
        ...c,
        messages: c.messages.map(m =>
          m.id === asstMsg.id ? { ...m, content: snap, isStreaming: i < words.length - 1 } : m
        ),
      }));
    }

    setIsLoading(false); setIsStreaming(false);
    setConversations(prev => prev.map(c => c.id !== convId ? c : {
      ...c, messages: c.messages.map(m =>
        m.id === asstMsg.id ? { ...m, isStreaming: false } : m
      ),
    }));
  }, [activeConversationId]);

  const deleteConversation = useCallback((id) => {
    setConversations(prev => prev.filter(c => c.id !== id));
    if (activeConversationId === id) setActiveConversationId(null);
  }, [activeConversationId]);

  const renameConversation = useCallback((id, title) => {
    setConversations(prev => prev.map(c => c.id === id ? { ...c, title } : c));
  }, []);

  const selectConversation = useCallback((id) => {
    setActiveConversationId(id); setError(null);
  }, []);

  const clearActive = useCallback(() => setActiveConversationId(null), []);

  return (
    <ChatContext.Provider value={{
      conversations, activeConversation, activeConversationId,
      isLoading, isStreaming, error,
      sendMessage, createNewConversation, deleteConversation,
      renameConversation, selectConversation, clearActive,
    }}>
      {children}
    </ChatContext.Provider>
  );
}

export function useChat() {
  const ctx = useContext(ChatContext);
  if (!ctx) throw new Error('useChat must be inside ChatProvider');
  return ctx;
}
