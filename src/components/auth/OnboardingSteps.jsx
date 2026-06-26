'use client';

import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import styles from './OnboardingSteps.module.css';

const USE_CASES = [
  { id: 'personal',   label: 'Personal',    emoji: '🌟' },
  { id: 'work',       label: 'Work',         emoji: '💼' },
  { id: 'education',  label: 'Education',    emoji: '🎓' },
  { id: 'development',label: 'Development',  emoji: '💻' },
];

const MODELS = [
  { id: 'neo-gpt-v1',    label: 'Neo GPT',        desc: 'Fast & versatile' },
  { id: 'neo-gpt-plus',  label: 'Neo GPT Plus',   desc: 'More powerful' },
  { id: 'neo-gpt-turbo', label: 'Neo GPT Turbo',  desc: 'Lightning fast' },
];

export default function OnboardingSteps() {
  const { completeOnboarding, isLoading } = useAuth();
  const [step, setStep]         = useState(1);
  const [name, setName]         = useState('');
  const [useCases, setUseCases] = useState([]);
  const [theme, setTheme]       = useState('dark');
  const [model, setModel]       = useState('neo-gpt-v1');

  const toggleUseCase = (id) =>
    setUseCases(p => p.includes(id) ? p.filter(x => x !== id) : [...p, id]);

  const progress = (step / 3) * 100;

  return (
    <div className={styles.wrap}>
      {/* Progress bar */}
      <div className={styles.progressBar}>
        <div className={styles.progressFill} style={{ width: `${progress}%` }} />
      </div>
      <p className={styles.stepLabel}>Step {step} of 3</p>

      {/* Step 1: Name */}
      {step === 1 && (
        <div className={styles.stepContent}>
          <div className={styles.stepIcon}>👋</div>
          <h2 className={styles.title}>What's your name?</h2>
          <p className={styles.sub}>Personalise your Neo GPT experience.</p>
          <input
            id="onboard-name-input"
            className={styles.input}
            type="text"
            placeholder="Your display name"
            value={name}
            onChange={e => setName(e.target.value)}
            autoFocus
            maxLength={40}
          />
          <button
            className={styles.nextBtn}
            disabled={!name.trim()}
            onClick={() => setStep(2)}
          >
            Continue →
          </button>
        </div>
      )}

      {/* Step 2: Use cases */}
      {step === 2 && (
        <div className={styles.stepContent}>
          <div className={styles.stepIcon}>🎯</div>
          <h2 className={styles.title}>How will you use Neo GPT?</h2>
          <p className={styles.sub}>Select all that apply — we'll tailor your experience.</p>
          <div className={styles.useCaseGrid}>
            {USE_CASES.map(uc => (
              <button
                key={uc.id}
                id={`usecase-${uc.id}`}
                className={`${styles.useCaseCard} ${useCases.includes(uc.id) ? styles.selected : ''}`}
                onClick={() => toggleUseCase(uc.id)}
              >
                <span className={styles.useCaseEmoji}>{uc.emoji}</span>
                <span className={styles.useCaseLabel}>{uc.label}</span>
                {useCases.includes(uc.id) && (
                  <span className={styles.checkMark}>✓</span>
                )}
              </button>
            ))}
          </div>
          <div className={styles.btnRow}>
            <button className={styles.backBtn2} onClick={() => setStep(1)}>← Back</button>
            <button className={styles.nextBtn} onClick={() => setStep(3)}>Continue →</button>
          </div>
        </div>
      )}

      {/* Step 3: Preferences */}
      {step === 3 && (
        <div className={styles.stepContent}>
          <div className={styles.stepIcon}>✨</div>
          <h2 className={styles.title}>Choose your experience</h2>
          <p className={styles.sub}>Pick defaults you can always change later.</p>

          <label className={styles.sectionLabel}>Default Model</label>
          <div className={styles.modelList}>
            {MODELS.map(m => (
              <button
                key={m.id}
                id={`model-${m.id}`}
                className={`${styles.modelCard} ${model === m.id ? styles.selectedModel : ''}`}
                onClick={() => setModel(m.id)}
              >
                <span className={styles.modelName}>{m.label}</span>
                <span className={styles.modelDesc}>{m.desc}</span>
              </button>
            ))}
          </div>

          <label className={styles.sectionLabel}>Theme</label>
          <div className={styles.themeRow}>
            {['dark', 'light'].map(t => (
              <button
                key={t}
                id={`theme-${t}`}
                className={`${styles.themeBtn} ${theme === t ? styles.selectedTheme : ''}`}
                onClick={() => setTheme(t)}
              >
                {t === 'dark' ? '🌙 Dark' : '☀️ Light'}
              </button>
            ))}
          </div>

          <div className={styles.btnRow}>
            <button className={styles.backBtn2} onClick={() => setStep(2)}>← Back</button>
            <button
              id="onboard-finish-btn"
              className={styles.finishBtn}
              disabled={isLoading}
              onClick={() => completeOnboarding({ name, useCase: useCases, theme, model })}
            >
              {isLoading ? 'Setting up…' : '🚀 Start Chatting'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
