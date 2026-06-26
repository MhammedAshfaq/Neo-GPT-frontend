'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTheme } from '../../context/ThemeContext';
import { useApp } from '../../context/AppContext';
import { useAuth } from '../../context/AuthContext';
import styles from './settings.module.css';

export default function SettingsPage() {
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();
  const { selectedModel, changeModel, addToast } = useApp();
  const { user, logout } = useAuth();

  const [name, setName] = useState(user?.name || 'Alex');
  const [apiKey, setApiKey] = useState('sk-••••••••••••••••••••');
  const [showApiKey, setShowApiKey] = useState(false);
  const [temp, setTemp] = useState(0.7);
  const [fontSize, setFontSize] = useState('medium'); // small|medium|large
  const [lang, setLang] = useState('en');

  const handleSave = () => {
    addToast('Settings saved successfully!', 'success');
    router.push('/');
  };

  const handleLogout = () => {
    logout();
    addToast('Logged out successfully.', 'info');
    router.push('/');
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <button className={styles.backBtn} onClick={() => router.push('/')} title="Back to chat">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>
          </svg>
        </button>
        <h1 className={styles.title}>Settings</h1>
      </header>

      <div className={styles.content}>
        {/* General */}
        <section className={styles.section}>
          <h2 className={styles.secTitle}>General</h2>
          
          <div className={styles.row}>
            <div className={styles.info}>
              <span className={styles.label}>Theme</span>
              <span className={styles.desc}>Switch between dark and light modes</span>
            </div>
            <div className={styles.actions}>
              <button 
                className={`${styles.toggleBtn} ${theme === 'dark' ? styles.active : ''}`}
                onClick={() => theme !== 'dark' && toggleTheme()}
              >
                Dark
              </button>
              <button 
                className={`${styles.toggleBtn} ${theme === 'light' ? styles.active : ''}`}
                onClick={() => theme !== 'light' && toggleTheme()}
              >
                Light
              </button>
            </div>
          </div>

          <div className={styles.row}>
            <div className={styles.info}>
              <span className={styles.label}>Language</span>
              <span className={styles.desc}>Select system display language</span>
            </div>
            <select className={styles.select} value={lang} onChange={e => setLang(e.target.value)}>
              <option value="en">English</option>
              <option value="es">Español</option>
              <option value="fr">Français</option>
              <option value="de">Deutsch</option>
            </select>
          </div>

          <div className={styles.row}>
            <div className={styles.info}>
              <span className={styles.label}>Font Size</span>
              <span className={styles.desc}>Adjust chat message text sizes</span>
            </div>
            <div className={styles.actions}>
              {['small', 'medium', 'large'].map(sz => (
                <button
                  key={sz}
                  className={`${styles.toggleBtn} ${fontSize === sz ? styles.active : ''}`}
                  onClick={() => setFontSize(sz)}
                >
                  {sz.charAt(0).toUpperCase() + sz.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Model */}
        <section className={styles.section}>
          <h2 className={styles.secTitle}>Model Configurations</h2>

          <div className={styles.row}>
            <div className={styles.info}>
              <span className={styles.label}>Default Model</span>
              <span className={styles.desc}>Change active AI response model</span>
            </div>
            <select 
              className={styles.select} 
              value={selectedModel} 
              onChange={e => changeModel(e.target.value)}
            >
              <option value="neo-gpt-v1">Neo GPT v1</option>
              <option value="neo-gpt-plus">Neo GPT Plus</option>
              <option value="neo-gpt-turbo">Neo GPT Turbo</option>
            </select>
          </div>

          <div className={styles.row}>
            <div className={styles.info}>
              <span className={styles.label}>Temperature</span>
              <span className={styles.desc}>Controls creativity (Higher values mean more creative replies)</span>
            </div>
            <div className={styles.sliderContainer}>
              <input 
                type="range" 
                min="0" 
                max="1" 
                step="0.1" 
                value={temp} 
                onChange={e => setTemp(parseFloat(e.target.value))}
                className={styles.slider}
              />
              <span className={styles.sliderVal}>{temp}</span>
            </div>
          </div>
        </section>

        {/* Account */}
        <section className={styles.section}>
          <h2 className={styles.secTitle}>Account Info</h2>

          <div className={styles.row}>
            <div className={styles.info}>
              <span className={styles.label}>Display Name</span>
            </div>
            <input 
              type="text" 
              className={styles.input} 
              value={name} 
              onChange={e => setName(e.target.value)}
            />
          </div>

          <div className={styles.row}>
            <div className={styles.info}>
              <span className={styles.label}>Email Address</span>
            </div>
            <span className={styles.valueText}>{user?.email || 'user@example.com'}</span>
          </div>

          <div className={styles.row}>
            <div className={styles.info}>
              <span className={styles.label}>API Access Key</span>
              <span className={styles.desc}>Custom LLM integration parameters</span>
            </div>
            <div className={styles.inputWrap}>
              <input 
                type={showApiKey ? 'text' : 'password'} 
                className={styles.input} 
                value={apiKey} 
                onChange={e => setApiKey(e.target.value)}
              />
              <button className={styles.showBtn} onClick={() => setShowApiKey(!showApiKey)}>
                {showApiKey ? 'Hide' : 'Show'}
              </button>
            </div>
          </div>
        </section>

        {/* Action Buttons */}
        <div className={styles.btnRow}>
          <button className={styles.logoutBtn} onClick={handleLogout}>
            Log Out
          </button>
          <button className={styles.saveBtn} onClick={handleSave}>
            Save changes
          </button>
        </div>
      </div>
    </div>
  );
}
