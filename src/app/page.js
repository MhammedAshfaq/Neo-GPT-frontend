'use client';

import { useApp } from "../context/AppContext";
import { useChat } from "../context/ChatContext";
import { useAuth } from "../context/AuthContext";
import WelcomeScreen from "../components/chat/WelcomeScreen";
import ChatThread from "../components/chat/ChatThread";
import ChatInputArea from "../components/input/ChatInputArea";
import ModelDropdown from "../components/chat/ModelDropdown";
import styles from "./page.module.css";

export default function Home() {
  const { toggleSidebar, sidebarOpen, addToast, openPricing } = useApp();
  const { activeConversation, createNewConversation } = useChat();
  const { openAuth, isAuthenticated } = useAuth();

  const hasMessages = activeConversation?.messages?.length > 0;

  const handleShare = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      addToast('Conversation link copied to clipboard!', 'success');
    }
  };

  const handleUpgrade = () => {
    openPricing();
  };

  return (
    <div className={styles.page}>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.headerLeft}>
          {/* Logo and Toggle sidebar button — visible when sidebar is closed */}
          {!sidebarOpen && (
            <>
              <div className={styles.headerLogo} title="Neo GPT logo">
                <svg viewBox="0 0 24 24" fill="none" width="20" height="20" stroke="currentColor" strokeWidth="1.8">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                  <path d="M2 12h20" />
                </svg>
              </div>
              <button id="sidebar-toggle" className={styles.headerBtn} onClick={toggleSidebar} title="Open sidebar">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect width="18" height="18" x="3" y="3" rx="2" />
                  <path d="M9 3v18" />
                </svg>
              </button>
            </>
          )}

          <ModelDropdown />
        </div>

        {/* Center active conversation title */}
        {hasMessages && activeConversation && (
          <div className={styles.headerCenter}>
            <span className={styles.conversationTitle}>{activeConversation.title}</span>
          </div>
        )}

        <div className={styles.headerRight}>
          {!isAuthenticated && (
            <>
              <button id="login-btn" className={styles.loginBtn} onClick={openAuth}>Log in</button>
              <button id="signup-btn" className={styles.signupBtn} onClick={openAuth}>Sign up for free</button>
            </>
          )}
          {isAuthenticated && (
            <div className={styles.headerActionsWrap}>
              {/* Premium Upgrade Button */}
              <button
                id="upgrade-header-btn"
                className={styles.upgradeHeaderBtn}
                onClick={handleUpgrade}
                title="Upgrade to Neo GPT Plus"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
                <span>Upgrade</span>
              </button>

              {/* Share Button */}
              <button
                id="share-header-btn"
                className={styles.shareHeaderBtn}
                onClick={handleShare}
                title="Share conversation"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
                  <polyline points="16 6 12 2 8 6" />
                  <line x1="12" y1="2" x2="12" y2="15" />
                </svg>
                <span>Share</span>
              </button>
            </div>
          )}
        </div>
      </header>

      {/* Chat Area */}
      <div className={styles.chatArea}>
        {hasMessages ? <ChatThread /> : <WelcomeScreen />}
      </div>

      {/* Input — Only render bottom input when active chat starts */}
      {hasMessages && <ChatInputArea />}
    </div>
  );
}
