'use client';

import styles from './UserMessage.module.css';

export default function UserMessage({ message }) {
  return (
    <div className={styles.wrap} style={{ animation: 'messageIn 300ms ease' }}>
      <div className={styles.bubble}>
        <p className={styles.text}>{message.content}</p>
      </div>
      <div className={styles.avatar}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
          <circle cx="12" cy="7" r="4"/>
        </svg>
      </div>
    </div>
  );
}
