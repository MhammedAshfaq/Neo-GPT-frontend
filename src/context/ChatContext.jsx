'use client';

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
  const [conversations, setConversations] = useState([]);
  const [activeConversationId, setActiveConversationId] = useState(null);
  const [isLoading, setIsLoading]   = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const [error, setError]           = useState(null);
  const [isLoaded, setIsLoaded]     = useState(false);

  // Lazy-load conversations from localStorage once mounted
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        setConversations(JSON.parse(saved));
      }
    } catch (e) {
      console.error('Failed to load conversations', e);
    }
    setIsLoaded(true);
  }, []);

  // Save changes to localStorage only after loaded to prevent wiping store on empty initial state
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(conversations));
    }
  }, [conversations, isLoaded]);

  const activeConversation = conversations.find(c => c.id === activeConversationId) || null;

  /* ── Create new conversation ── */
  const createNewConversation = useCallback(() => {
    const id = generateId();
    const newConv = {
      id, title: 'New Chat', messages: [],
      model: (typeof window !== 'undefined' && localStorage.getItem('neo-gpt-model')) || 'neo-gpt-v1',
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
      const activeModel = (typeof window !== 'undefined' && localStorage.getItem('neo-gpt-model')) || 'neo-gpt-v1';
      if (isNew) {
        return [{ id: convId, title: generateTitle(text), messages: [userMsg, asstMsg],
          model: activeModel,
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

    /* Stream from Next.js local API route if available, fallback to mock simulation */
    try {
      const activeModel = (typeof window !== 'undefined' && localStorage.getItem('neo-gpt-model')) || 'neo-gpt-v1';
      const response = await fetch('/api/chat/stream', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          conversationId: convId,
          message: text.trim(),
          model: activeModel,
          history: activeConversation ? activeConversation.messages.filter(m => !m.isStreaming) : [],
        }),
      });

      if (!response.ok) throw new Error('API request failed');

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let done = false;
      let streamedVal = '';

      while (!done) {
        const { value, done: readerDone } = await reader.read();
        done = readerDone;
        if (value) {
          const chunk = decoder.decode(value, { stream: !done });
          const lines = chunk.split('\n');
          for (const line of lines) {
            if (line.startsWith('data: ')) {
              const dataStr = line.slice(6).trim();
              if (dataStr === '[DONE]') {
                done = true;
                break;
              }
              try {
                const parsed = JSON.parse(dataStr);
                if (parsed.delta) {
                  streamedVal += parsed.delta;
                  setConversations(prev => prev.map(c => c.id !== convId ? c : {
                    ...c,
                    messages: c.messages.map(m =>
                      m.id === asstMsg.id ? { ...m, content: streamedVal, isStreaming: true } : m
                    ),
                  }));
                }
              } catch (e) {
                // Ignore chunk parsing errors
              }
            }
          }
        }
      }
    } catch (err) {
      console.warn('Next.js API route stream failed, falling back to local simulation', err);
      // Local demo fallback response simulation
      const demos = [
        `I'm **Neo GPT**, your AI assistant! 🚀\n\nI'm running via **Next.js Client Fallback** right now. This means your local API router route had a hiccup, but I can still respond!`,
        `Great question! Here's what I can help you with:\n\n- 💡 **Brainstorm** — Creative ideas on any topic\n- 📝 **Write** — Emails, essays, code comments\n- 💻 **Code** — Debug, explain, or write code\n- 📊 **Analyze** — Break down complex information\n\nWhat would you like to explore?`,
        `Here's a quick React code example:\n\n\`\`\`jsx\n// Next.js App Router API Route Handler\nexport async function POST(req) {\n  const { message } = await req.json();\n  return NextResponse.json({ reply: \`Response to \${message}\` });\n}\n\`\`\`\n\nClean and fully optimized. 🎯`,
      ];
      const reply = demos[Math.floor(Math.random() * demos.length)];
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
    } finally {
      setIsLoading(false); setIsStreaming(false);
      setConversations(prev => prev.map(c => c.id !== convId ? c : {
        ...c, messages: c.messages.map(m =>
          m.id === asstMsg.id ? { ...m, isStreaming: false } : m
        ),
      }));
    }
  }, [activeConversationId, activeConversation]);

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
