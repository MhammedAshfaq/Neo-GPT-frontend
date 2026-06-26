'use client';

import { useChat } from '../../context/ChatContext';
import ChatInputArea from '../input/ChatInputArea';
import styles from './WelcomeScreen.module.css';

const SUGGESTIONS = [
  {
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
        <polyline points="10 9 9 9 8 9" />
      </svg>
    ),
    label: "Explain this news headline",
    prompt: "Here is a mock news headline: 'Scientists discover new particle that defies gravity.' Can you explain what this headline implies in simple terms?"
  },
  {
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 20h9" />
        <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
      </svg>
    ),
    label: "Message my child's school",
    prompt: "Write a polite note to my child's teacher explaining that they will be late tomorrow due to a doctor appointment."
  },
  {
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
        <polyline points="10 9 9 9 8 9" />
      </svg>
    ),
    label: "Explain today's news simply",
    prompt: "Summarize today's general global news highlights in a short, simple paragraph for quick reading."
  }
];

export default function WelcomeScreen() {
  const { sendMessage } = useChat();

  return (
    <div className={styles.wrap}>
      {/* Title */}
      <h1 className={styles.greeting}>What's on the agenda today?</h1>

      <div className={styles.inputContainer}>
        {/* Render consolidated ChatInputArea component here */}
        <ChatInputArea isCentered={true} />
      </div>

      {/* Suggestions List */}
      <div className={styles.suggestionsList}>
        {SUGGESTIONS.map((s, i) => (
          <button
            key={i}
            className={styles.suggestionItem}
            onClick={() => sendMessage(s.prompt)}
          >
            <span className={styles.suggestionIcon}>{s.icon}</span>
            <span className={styles.suggestionLabel}>{s.label}</span>
          </button>
        ))}
      </div>

      {/* Disclaimer */}
      <div className={styles.disclaimer}>
        ChatGPT can make mistakes. Check important info.
      </div>
    </div>
  );
}
