'use client';

import { useState, useRef, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import styles from './ModelDropdown.module.css';

const MODELS = [
  {
    id: 'neo-gpt-plus',
    label: 'Neo GPT Plus',
    desc: 'Our smartest model & more',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m11.314 11.314l.707.707M12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10z" />
      </svg>
    ),
    isPremium: true
  },
  {
    id: 'neo-gpt-turbo',
    label: 'Neo GPT Turbo',
    desc: 'Speed-optimized for fast responses',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
    isPremium: false
  },
  {
    id: 'neo-gpt-v1',
    label: 'Neo GPT',
    desc: 'Great for everyday tasks',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        <path d="M2 12h20" />
      </svg>
    ),
    isPremium: false
  }
];

export default function ModelDropdown() {
  const { selectedModel, changeModel, addToast, openPricing } = useApp();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const activeModel = MODELS.find(m => m.id === selectedModel) || MODELS[2];

  const handleSelect = (modelId) => {
    changeModel(modelId);
    setIsOpen(false);
  };

  const handleUpgrade = (e) => {
    e.stopPropagation();
    openPricing();
    setIsOpen(false);
  };

  return (
    <div className={styles.dropdownContainer} ref={containerRef}>
      {/* Trigger Button */}
      <button
        id="model-select-trigger"
        className={styles.trigger}
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span className={styles.triggerLabel}>{activeModel.label}</span>
        <svg
          className={`${styles.chevron} ${isOpen ? styles.chevronOpen : ''}`}
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {/* Menu Overlay */}
      {isOpen && (
        <div className={styles.menu} role="listbox">
          {MODELS.map((model) => {
            const isSelected = model.id === selectedModel;
            return (
              <div
                key={model.id}
                className={`${styles.optionRow} ${isSelected ? styles.selectedRow : ''}`}
                onClick={() => handleSelect(model.id)}
                role="option"
                aria-selected={isSelected}
              >
                <div className={styles.optionLeft}>
                  <div className={`${styles.iconWrap} ${model.isPremium ? styles.premiumIcon : ''}`}>
                    {model.icon}
                  </div>
                  <div className={styles.textWrap}>
                    <div className={styles.modelName}>{model.label}</div>
                    <div className={styles.modelDesc}>{model.desc}</div>
                  </div>
                </div>
                
                <div className={styles.optionRight}>
                  {model.isPremium ? (
                    <button
                      className={styles.upgradeBtn}
                      onClick={handleUpgrade}
                    >
                      Upgrade
                    </button>
                  ) : (
                    isSelected && (
                      <svg
                        className={styles.checkmark}
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    )
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
