import { useState } from 'react';
import { useChat } from '../../context/ChatContext';
import { useApp } from '../../context/AppContext';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import ConversationList from '../sidebar/ConversationList';
import styles from './Sidebar.module.css';

export default function Sidebar() {
  const { createNewConversation } = useChat();
  const { toggleSidebar } = useApp();
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [search, setSearch] = useState('');

  return (
    <div className={styles.sidebar}>
      {/* Top */}
      <div className={styles.top}>
        {/* Logo */}
        <div className={styles.logo}>
          <div className={styles.logoOrb}>
            <svg viewBox="0 0 32 32" fill="none" width="22" height="22">
              <circle cx="16" cy="16" r="14" fill="url(#sidebarGrad)"/>
              <circle cx="16" cy="16" r="5" fill="white" opacity="0.9"/>
              <defs>
                <radialGradient id="sidebarGrad" cx="30%" cy="30%">
                  <stop offset="0%" stopColor="#b4a4ff"/>
                  <stop offset="100%" stopColor="#5b21b6"/>
                </radialGradient>
              </defs>
            </svg>
          </div>
          <span className={styles.logoText}>Neo GPT</span>
        </div>

        {/* New Chat */}
        <button
          id="new-chat-btn"
          className={styles.newChatBtn}
          onClick={createNewConversation}
          title="New Chat"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
            <path d="M12 5v14M5 12h14"/>
          </svg>
          <span>New chat</span>
        </button>
      </div>

      {/* Search */}
      <div className={styles.searchWrap}>
        <svg className={styles.searchIcon} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
        </svg>
        <input
          id="sidebar-search"
          className={styles.searchInput}
          type="text"
          placeholder="Search chats"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      {/* Conversations */}
      <div className={styles.convList}>
        <ConversationList filter={search} />
      </div>

      {/* Bottom */}
      <div className={styles.bottom}>
        <button
          id="theme-toggle-btn"
          className={styles.bottomBtn}
          onClick={toggleTheme}
          title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
        >
          {theme === 'dark'
            ? <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>
            : <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
          }
          <span>{theme === 'dark' ? 'Light mode' : 'Dark mode'}</span>
        </button>

        {user && (
          <div className={styles.userRow}>
            <div className={styles.avatar}>
              {user.avatar
                ? <img src={user.avatar} alt={user.name} />
                : <span>{user.name?.[0]?.toUpperCase() || 'U'}</span>
              }
            </div>
            <div className={styles.userInfo}>
              <span className={styles.userName}>{user.name}</span>
              <span className={styles.userEmail}>{user.email}</span>
            </div>
            <button
              id="logout-btn"
              className={styles.logoutBtn}
              onClick={logout}
              title="Log out"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"/>
              </svg>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
