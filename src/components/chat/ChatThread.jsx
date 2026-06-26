'use client';

import { useEffect, useRef } from 'react';
import { useChat } from '../../context/ChatContext';
import UserMessage from './UserMessage';
import AssistantMessage from './AssistantMessage';
import TypingIndicator from './TypingIndicator';
import styles from './ChatThread.module.css';

export default function ChatThread() {
  const { activeConversation, isLoading } = useChat();
  const bottomRef = useRef(null);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeConversation?.messages]);

  if (!activeConversation) return null;

  const messages = activeConversation.messages;

  return (
    <div className={styles.thread} id="chat-thread">
      <div className={styles.inner}>
        {messages.map((msg) =>
          msg.role === 'user'
            ? <UserMessage key={msg.id} message={msg} />
            : <AssistantMessage key={msg.id} message={msg} />
        )}

        {/* Typing indicator when loading and last message is user's */}
        {isLoading && messages[messages.length - 1]?.role === 'user' && (
          <TypingIndicator />
        )}

        <div ref={bottomRef} />
      </div>
    </div>
  );
}
