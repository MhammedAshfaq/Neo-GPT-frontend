import { useChat } from '../../context/ChatContext';
import { useAuth } from '../../context/AuthContext';
import styles from './WelcomeScreen.module.css';

const SUGGESTIONS = [
  { icon: '💡', label: 'Brainstorm ideas', prompt: 'Give me 5 creative ideas for a side project I can build this weekend.' },
  { icon: '📝', label: 'Help me write', prompt: 'Help me write a professional email to follow up after a job interview.' },
  { icon: '💻', label: 'Explain code', prompt: 'Explain how async/await works in JavaScript with a simple example.' },
  { icon: '📊', label: 'Analyze data', prompt: 'What are the key metrics I should track for a SaaS startup?' },
];

export default function WelcomeScreen() {
  const { sendMessage } = useChat();
  const { user } = useAuth();

  const greeting = user?.name ? `Hello, ${user.name.split(' ')[0]}! 👋` : 'Welcome to Neo GPT';

  return (
    <div className={styles.wrap}>
      {/* Animated orb logo */}
      <div className={styles.orb}>
        <div className={styles.orbRing} />
        <div className={styles.orbCore}>
          <svg viewBox="0 0 48 48" fill="none" width="32" height="32">
            <circle cx="24" cy="24" r="22" fill="url(#welcomeGrad)"/>
            <circle cx="24" cy="24" r="10" fill="white" opacity="0.15"/>
            <circle cx="24" cy="24" r="5"  fill="white" opacity="0.9"/>
            <defs>
              <radialGradient id="welcomeGrad" cx="30%" cy="25%">
                <stop offset="0%"   stopColor="#c4b0ff"/>
                <stop offset="60%"  stopColor="#7c3aed"/>
                <stop offset="100%" stopColor="#3b1a7a"/>
              </radialGradient>
            </defs>
          </svg>
        </div>
      </div>

      <h1 className={styles.greeting}>{greeting}</h1>
      <p className={styles.sub}>What would you like to explore today?</p>

      {/* Suggestion cards */}
      <div className={styles.grid}>
        {SUGGESTIONS.map((s, i) => (
          <button
            key={i}
            id={`suggestion-${i}`}
            className={styles.card}
            onClick={() => sendMessage(s.prompt)}
            style={{ animationDelay: `${i * 60}ms` }}
          >
            <span className={styles.cardIcon}>{s.icon}</span>
            <span className={styles.cardLabel}>{s.label}</span>
            <svg className={styles.cardArrow} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </button>
        ))}
      </div>
    </div>
  );
}
