'use client';

import { useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { useAuth } from '../../context/AuthContext';
import Sidebar from './Sidebar';
import styles from './AppShell.module.css';

export default function AppShell({ children }) {
  const { sidebarOpen, setSidebarOpen } = useApp();
  const { isAuthenticated, authChecked } = useAuth();

  // Close sidebar on small screens when route changes
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 1023px)');
    if (mq.matches) setSidebarOpen(false);
  }, []);

  if (!authChecked) {
    return (
      <div className={styles.shell} style={{ justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ color: 'var(--text-secondary)', fontSize: '14.5px', opacity: 0.6 }}>
          Loading assistant…
        </div>
      </div>
    );
  }

  return (
    <div className={`${styles.shell} ${sidebarOpen ? styles.sidebarVisible : ''}`}>
      {/* Sidebar */}
      {isAuthenticated && (
        <>
          {/* Mobile overlay */}
          {sidebarOpen && (
            <div
              className={styles.mobileOverlay}
              onClick={() => setSidebarOpen(false)}
            />
          )}
          <aside className={`${styles.sidebar} ${sidebarOpen ? styles.open : ''}`}>
            <Sidebar />
          </aside>
        </>
      )}

      {/* Main content */}
      <main className={styles.main}>
        {children}
      </main>
    </div>
  );
}
