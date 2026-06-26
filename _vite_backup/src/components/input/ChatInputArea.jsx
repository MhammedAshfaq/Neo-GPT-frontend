import { useState, useRef, useEffect } from 'react';
import { useChat } from '../../context/ChatContext';
import styles from './ChatInputArea.module.css';

export default function ChatInputArea() {
  const { sendMessage, isLoading } = useChat();
  const [text, setText] = useState('');
  const textareaRef = useRef(null);

  /* Auto-resize textarea */
  useEffect(() => {
    const ta = textareaRef.current;
    if (!ta) return;
    ta.style.height = 'auto';
    ta.style.height = Math.min(ta.scrollHeight, 180) + 'px';
  }, [text]);

  /* Send on Enter (Shift+Enter = newline) */
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey && !isLoading) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleSend = () => {
    if (!text.trim() || isLoading) return;
    sendMessage(text.trim());
    setText('');
    if (textareaRef.current) textareaRef.current.style.height = 'auto';
  };

  const canSend = text.trim().length > 0 && !isLoading;

  return (
    <div className={styles.outerWrap}>
      <div className={styles.inputCard}>
        {/* Attach button */}
        <button id="attach-btn" className={styles.iconBtn} title="Attach file" type="button">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66L9.64 16.34a2 2 0 0 1-2.83-2.83l8.49-8.48"/>
          </svg>
        </button>

        {/* Textarea */}
        <textarea
          id="chat-input"
          ref={textareaRef}
          className={styles.textarea}
          placeholder="Message Neo GPT…"
          value={text}
          rows={1}
          onChange={e => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={isLoading}
        />

        {/* Voice button */}
        <button id="voice-btn" className={styles.iconBtn} title="Voice input" type="button">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/>
            <path d="M19 10v2a7 7 0 0 1-14 0v-2M12 19v4M8 23h8"/>
          </svg>
        </button>

        {/* Send button */}
        <button
          id="send-btn"
          className={`${styles.sendBtn} ${canSend ? styles.active : ''}`}
          onClick={handleSend}
          disabled={!canSend}
          title="Send message"
          type="button"
        >
          {isLoading
            ? <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ animation: 'spin 0.8s linear infinite' }}><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/></svg>
            : <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/></svg>
          }
        </button>
      </div>

      <p className={styles.disclaimer}>
        Neo GPT can make mistakes. Consider checking important information.
      </p>
    </div>
  );
}
