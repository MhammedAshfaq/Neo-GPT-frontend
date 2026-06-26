'use client';

import { useApp } from '../../context/AppContext';
import styles from './Toast.module.css';

export default function Toast() {
  const { toasts, removeToast } = useApp();

  if (toasts.length === 0) return null;

  return (
    <div className={styles.container} aria-live="polite">
      {toasts.map(t => (
        <div key={t.id} className={`${styles.toast} ${styles[t.type]}`}>
          <span>{t.message}</span>
          <button className={styles.closeBtn} onClick={() => removeToast(t.id)}>✕</button>
        </div>
      ))}
    </div>
  );
}
