import styles from './TypingIndicator.module.css';

export default function TypingIndicator() {
  return (
    <div className={styles.wrap}>
      <div className={styles.avatar}>
        <svg viewBox="0 0 32 32" fill="none" width="18" height="18">
          <circle cx="16" cy="16" r="14" fill="url(#typingGrad)"/>
          <circle cx="16" cy="16" r="5" fill="white" opacity="0.9"/>
          <defs>
            <radialGradient id="typingGrad" cx="30%" cy="25%">
              <stop offset="0%" stopColor="#b4a4ff"/>
              <stop offset="100%" stopColor="#5b21b6"/>
            </radialGradient>
          </defs>
        </svg>
      </div>
      <div className={styles.bubble}>
        <span className={styles.dot} style={{ animationDelay: '0ms' }}   />
        <span className={styles.dot} style={{ animationDelay: '150ms' }} />
        <span className={styles.dot} style={{ animationDelay: '300ms' }} />
      </div>
    </div>
  );
}
