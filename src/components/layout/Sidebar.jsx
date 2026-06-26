'use client';

import { useState } from 'react';
import { useChat } from '../../context/ChatContext';
import { useApp } from '../../context/AppContext';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import ConversationList from '../sidebar/ConversationList';
import styles from './Sidebar.module.css';

export default function Sidebar() {
  const { createNewConversation } = useChat();
  const { toggleSidebar, openPricing } = useApp();
  const { user, logout, openAuth } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [search, setSearch] = useState('');

  return (
    <div className={styles.sidebar}>
      {/* Top Header */}
      <div className={styles.topHeader}>
        <div className={styles.logo}>
          <svg viewBox="0 0 24 24" fill="none" width="20" height="20" stroke="currentColor" strokeWidth="1.5" className={styles.logoIcon}>
            <circle cx="12" cy="12" r="10" />
            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
            <path d="M2 12h20" />
          </svg>
          <span className={styles.logoText}>Neo GPT</span>
        </div>
        <button className={styles.panelToggleBtn} onClick={toggleSidebar} title="Close sidebar">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect width="18" height="18" x="3" y="3" rx="2" />
            <path d="M9 3v18" />
          </svg>
        </button>
      </div>

      {/* Main Nav Items */}
      <div className={styles.mainNav}>
        {/* New Chat */}
        <button
          id="new-chat-btn"
          className={styles.newChatBtn}
          onClick={createNewConversation}
          title="New Chat"
        >
          <span>New chat</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M12 20h9" />
            <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
          </svg>
        </button>

        {/* Search */}
        <div className={styles.searchWrap}>
          <svg className={styles.searchIcon} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
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

        {/* Static Links */}
        <div className={styles.staticLinks}>
          <button className={styles.navLink} onClick={createNewConversation}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <path d="M21 15l-5-5L5 21" />
            </svg>
            <span>Images</span>
          </button>

          <button className={styles.navLink} onClick={createNewConversation}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="7" height="7" />
              <rect x="14" y="3" width="7" height="7" />
              <rect x="14" y="14" width="7" height="7" />
              <rect x="3" y="14" width="7" height="7" />
            </svg>
            <span>Explore Apps</span>
          </button>

          <button className={styles.navLink} onClick={createNewConversation}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10Z" />
            </svg>
            <span>Deep research</span>
          </button>
        </div>
      </div>

      {/* Conversations (Scrollable area) */}
      <div className={styles.convList}>
        <ConversationList filter={search} />
      </div>

      {/* Bottom Area */}
      <div className={styles.bottom}>
        {/* Settings, Help & Plans */}
        <div className={styles.bottomNav}>
          <button className={styles.navLink} onClick={openPricing}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2" />
              <line x1="12" y1="22" x2="12" y2="12" />
              <line x1="22" y1="8.5" x2="12" y2="12" />
              <line x1="2" y1="8.5" x2="12" y2="12" />
            </svg>
            <span>See plans and pricing</span>
          </button>

          <button className={styles.navLink} onClick={toggleTheme}>
            {theme === 'dark' ? (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="5" /><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
              </svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            )}
            <span>{theme === 'dark' ? 'Light mode' : 'Dark mode'}</span>
          </button>

          <button className={styles.navLink} onClick={() => window.open('https://help.openai.com', '_blank')}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" /><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" /><line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
            <span>Help & FAQ</span>
          </button>
        </div>

        {/* Dynamic User Profile or Log In Card */}
        {user ? (
          <div className={styles.userRow}>
            <div className={styles.avatar}>
              {user.avatar ? (
                <img src={user.avatar} alt={user.name} />
              ) : (
                <span>{user.name?.[0]?.toUpperCase() || 'U'}</span>
              )}
            </div>
            <div className={styles.userInfo}>
              <span className={styles.userName}>{user.name}</span>
              <span className={styles.userEmail}>{user.email}</span>
            </div>
            <button id="logout-btn" className={styles.logoutBtn} onClick={logout} title="Log out">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9" />
              </svg>
            </button>
          </div>
        ) : (
          <div className={styles.loginCard}>
            <div className={styles.loginCardTitle}>Get responses tailored to you</div>
            <div className={styles.loginCardText}>
              Log in to get answers based on saved chats, plus create images and upload files.
            </div>
            <button className={styles.loginCardBtn} onClick={() => openAuth()}>
              Log in
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
