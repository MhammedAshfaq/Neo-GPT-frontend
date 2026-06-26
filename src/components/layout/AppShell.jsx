'use client';

import { useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { useAuth } from '../../context/AuthContext';
import Sidebar from './Sidebar';
import styles from './AppShell.module.css';

export default function AppShell({ children }) {
  const { sidebarOpen, setSidebarOpen } = useApp();
  const { isAuthenticated } = useAuth();

  // Close sidebar on small screens when route changes
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 1023px)');
    if (mq.matches) setSidebarOpen(false);
  }, []);

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
