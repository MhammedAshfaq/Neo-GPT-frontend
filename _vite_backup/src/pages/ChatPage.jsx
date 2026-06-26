import { useApp } from '../context/AppContext';
import { useChat } from '../context/ChatContext';
import { useAuth } from '../context/AuthContext';
import WelcomeScreen from '../components/chat/WelcomeScreen';
import ChatThread from '../components/chat/ChatThread';
import ChatInputArea from '../components/input/ChatInputArea';
import styles from './ChatPage.module.css';

const MODELS = ['Neo GPT v1', 'Neo GPT Plus', 'Neo GPT Turbo'];

export default function ChatPage() {
  const { toggleSidebar, selectedModel, changeModel } = useApp();
  const { activeConversation, createNewConversation } = useChat();
  const { openAuth, isAuthenticated } = useAuth();

  const hasMessages = activeConversation?.messages?.length > 0;

  return (
    <div className={styles.page}>
      {/* Header */}
      <header className={styles.header}>
        <button id="sidebar-toggle" className={styles.headerBtn} onClick={toggleSidebar} title="Toggle sidebar">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
          </svg>
        </button>

        <div className={styles.headerCenter}>
          <div className={styles.logoSmall}>
            <svg viewBox="0 0 20 20" fill="none" width="16" height="16">
              <circle cx="10" cy="10" r="9" fill="url(#hGrad)"/>
              <circle cx="10" cy="10" r="3.5" fill="white" opacity="0.9"/>
              <defs><radialGradient id="hGrad" cx="30%" cy="25%"><stop offset="0%" stopColor="#b4a4ff"/><stop offset="100%" stopColor="#5b21b6"/></radialGradient></defs>
            </svg>
          </div>
          <span className={styles.headerTitle}>Neo GPT</span>

          <select
            id="model-select"
            className={styles.modelSelect}
            value={selectedModel}
            onChange={e => changeModel(e.target.value)}
          >
            <option value="neo-gpt-v1">Neo GPT v1</option>
            <option value="neo-gpt-plus">Neo GPT Plus</option>
            <option value="neo-gpt-turbo">Neo GPT Turbo</option>
          </select>
        </div>

        <div className={styles.headerRight}>
          {!isAuthenticated && (
            <>
              <button id="login-btn" className={styles.loginBtn} onClick={openAuth}>Log in</button>
              <button id="signup-btn" className={styles.signupBtn} onClick={openAuth}>Sign up</button>
            </>
          )}
          {isAuthenticated && (
            <button
              id="new-chat-header-btn"
              className={styles.headerBtn}
              onClick={createNewConversation}
              title="New chat"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
              </svg>
            </button>
          )}
        </div>
      </header>

      {/* Chat Area */}
      <div className={styles.chatArea}>
        {hasMessages ? <ChatThread /> : <WelcomeScreen />}
      </div>

      {/* Input */}
      <ChatInputArea />
    </div>
  );
}
