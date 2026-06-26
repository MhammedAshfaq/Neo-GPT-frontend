'use client';

import { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import styles from './PricingModal.module.css';

// Outline SVG components matching the reference design
const SparkleIcon = () => (
  <svg className={styles.bulletIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>
  </svg>
);

const MessageIcon = () => (
  <svg className={styles.bulletIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
  </svg>
);

const ImageIcon = () => (
  <svg className={styles.bulletIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
    <circle cx="8.5" cy="8.5" r="1.5"/>
    <polyline points="21 15 16 10 5 21"/>
  </svg>
);

const MemoryIcon = () => (
  <svg className={styles.bulletIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

const VoiceIcon = () => (
  <svg className={styles.bulletIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
    <path d="M19 10v1a7 7 0 0 1-14 0v-1" />
    <line x1="12" x2="12" y1="19" y2="22" />
  </svg>
);

const CodexIcon = () => (
  <svg className={styles.bulletIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="16 18 22 12 16 6" />
    <polyline points="8 6 2 12 8 18" />
  </svg>
);

const SearchIcon = () => (
  <svg className={styles.bulletIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

const ProjectsIcon = () => (
  <svg className={styles.bulletIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="7" height="7" />
    <rect x="14" y="3" width="7" height="7" />
    <rect x="14" y="14" width="7" height="7" />
    <rect x="3" y="14" width="7" height="7" />
  </svg>
);

const UsageIcon = () => (
  <svg className={styles.bulletIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
    <polyline points="17 6 23 6 23 12" />
  </svg>
);

const FrontierIcon = () => (
  <svg className={styles.bulletIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 2 7 12 12 22 7 12 2" />
    <polyline points="2 17 12 22 22 17" />
    <polyline points="2 12 12 17 22 12" />
  </svg>
);

const ShieldIcon = () => (
  <svg className={styles.bulletIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);

export default function PricingModal() {
  const { pricingModalOpen, closePricing, addToast } = useApp();
  const [activeTab, setActiveTab] = useState('personal'); // 'personal' | 'business'

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (pricingModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [pricingModalOpen]);

  if (!pricingModalOpen) return null;

  const handleSubscribe = (tierName) => {
    addToast(`Successfully upgraded to the Neo GPT ${tierName} plan!`, 'success');
    closePricing();
  };

  return (
    <div className={styles.overlay} onClick={(e) => e.target === e.currentTarget && closePricing()}>
      
      {/* Close button */}
      <button className={styles.closeBtn} onClick={closePricing} aria-label="Close modal">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>

      <div className={styles.modal} role="dialog" aria-modal="true" aria-label="Upgrade your plan">
        
        {/* Title */}
        <h2 className={styles.title}>Upgrade your plan</h2>

        {/* Tab Selector */}
        <div className={styles.tabsWrap}>
          <div className={styles.tabsContainer}>
            <button
              className={`${styles.tabBtn} ${activeTab === 'personal' ? styles.activeTab : ''}`}
              onClick={() => setActiveTab('personal')}
            >
              Personal
            </button>
            <button
              className={`${styles.tabBtn} ${activeTab === 'business' ? styles.activeTab : ''}`}
              onClick={() => setActiveTab('business')}
            >
              Business
            </button>
          </div>
        </div>

        {/* Cards Grid */}
        <div className={styles.grid}>
          
          {/* Card 1: Free */}
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <h3 className={styles.tierName}>Free</h3>
              <div className={styles.priceWrap}>
                <span className={styles.currency}>₹</span>
                <span className={styles.amount}>0</span>
                <div className={styles.periodWrap}>
                  <span className={styles.periodLine}>INR / month</span>
                </div>
              </div>
              <p className={styles.subtitle}>See what AI can do</p>
            </div>

            <button className={`${styles.ctaBtn} ${styles.disabledBtn}`} disabled>
              Your current plan
            </button>

            <ul className={styles.featureList}>
              <li>
                <SparkleIcon />
                <span>Core model</span>
              </li>
              <li>
                <MessageIcon />
                <span>Limited messages and uploads</span>
              </li>
              <li>
                <ImageIcon />
                <span>Limited image creation</span>
              </li>
              <li>
                <MemoryIcon />
                <span>Limited memory</span>
              </li>
            </ul>

            <div className={styles.cardFooter}>
              <a href="#" onClick={(e) => { e.preventDefault(); addToast('Billing details...', 'info'); }}>Have an existing plan? See billing help</a>
            </div>
          </div>

          {/* Card 2: Go */}
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <h3 className={styles.tierName}>Go</h3>
              <div className={styles.priceWrap}>
                <span className={styles.currency}>₹</span>
                <span className={styles.amount}>{activeTab === 'personal' ? '399' : '699'}</span>
                <div className={styles.periodWrap}>
                  <span className={styles.periodLine}>INR / month</span>
                  <span className={styles.periodTax}>(inclusive of GST)</span>
                </div>
              </div>
              <p className={styles.subtitle}>Keep chatting with expanded access</p>
            </div>

            <button className={`${styles.ctaBtn} ${styles.whiteBtn}`} onClick={() => handleSubscribe('Go')}>
              Upgrade to Go
            </button>

            <ul className={styles.featureList}>
              <li>
                <SparkleIcon />
                <span>Core model</span>
              </li>
              <li>
                <MessageIcon />
                <span>More messages and uploads</span>
              </li>
              <li>
                <ImageIcon />
                <span>More image creation</span>
              </li>
              <li>
                <MemoryIcon />
                <span>Longer memory</span>
              </li>
              <li>
                <VoiceIcon />
                <span>Expanded voice mode</span>
              </li>
            </ul>

            <div className={styles.cardFooter}>
              <span>This plan may include ads. </span>
              <a href="#" onClick={(e) => { e.preventDefault(); addToast('Ad usage limits...', 'info'); }}>Learn more</a>
            </div>
          </div>

          {/* Card 3: Plus */}
          <div className={`${styles.card} ${styles.highlightedCard}`}>
            <div className={styles.cardHeader}>
              <div className={styles.tierHeaderRow}>
                <h3 className={styles.tierName}>Plus</h3>
                <span className={styles.popularBadge}>POPULAR</span>
              </div>
              <div className={styles.priceWrap}>
                <span className={styles.currency}>₹</span>
                <span className={styles.amount}>{activeTab === 'personal' ? '1,999' : '3,499'}</span>
                <div className={styles.periodWrap}>
                  <span className={styles.periodLine}>INR / month</span>
                  <span className={styles.periodTax}>(inclusive of GST)</span>
                </div>
              </div>
              <p className={styles.subtitle}>Unlock the full experience</p>
            </div>

            <button className={`${styles.ctaBtn} ${styles.blueBtn}`} onClick={() => handleSubscribe('Plus')}>
              Upgrade to Plus
            </button>

            <ul className={styles.featureList}>
              <li>
                <SparkleIcon />
                <span>Advanced models</span>
              </li>
              <li>
                <ImageIcon />
                <span>Advanced image creation with Thinking</span>
              </li>
              <li>
                <MemoryIcon />
                <span>Expanded memory across chats</span>
              </li>
              <li>
                <CodexIcon />
                <span>Codex coding agent</span>
              </li>
              <li>
                <SearchIcon />
                <span>Expanded deep research</span>
              </li>
              <li>
                <ProjectsIcon />
                <span>Projects and custom GPTs</span>
              </li>
            </ul>
          </div>

          {/* Card 4: Pro */}
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <h3 className={styles.tierName}>Pro</h3>
              <div className={styles.priceWrapPro}>
                <span className={styles.fromLabel}>From</span>
                <div className={styles.priceWrap}>
                  <span className={styles.currency}>₹</span>
                  <span className={styles.amount}>{activeTab === 'personal' ? '10,699' : '19,999'}</span>
                  <div className={styles.periodWrap}>
                    <span className={styles.periodLine}>INR / month</span>
                    <span className={styles.periodTax}>(inclusive of GST)</span>
                  </div>
                </div>
              </div>
              <p className={styles.subtitle}>Maximize your productivity</p>
            </div>

            <button className={`${styles.ctaBtn} ${styles.whiteBtn}`} onClick={() => handleSubscribe('Pro')}>
              Upgrade to Pro
            </button>

            <ul className={styles.featureList}>
              <li className={styles.featureHeader}>Everything in Plus and:</li>
              <li>
                <UsageIcon />
                <span>5x or 20x more usage than Plus</span>
              </li>
              <li>
                <FrontierIcon />
                <span>Frontier Pro model</span>
              </li>
              <li>
                <CodexIcon />
                <span>Maximum access to Codex</span>
              </li>
              <li>
                <SearchIcon />
                <span>Maximum deep research</span>
              </li>
              <li>
                <MessageIcon />
                <span>Unlimited core chat</span>
              </li>
              <li>
                <ImageIcon />
                <span>Unlimited and faster image creation</span>
              </li>
              <li>
                <MemoryIcon />
                <span>Maximum memory and context</span>
              </li>
              <li>
                <ShieldIcon />
                <span>Early access to experimental features</span>
              </li>
            </ul>

            <div className={styles.cardFooter}>
              <span>Unlimited subject to abuse guardrails. </span>
              <a href="#" onClick={(e) => { e.preventDefault(); addToast('Subscription limits document...', 'info'); }}>Learn about limits and promos on both tiers.</a>
              <a href="#" onClick={(e) => { e.preventDefault(); addToast('Billing support ticket opened!', 'success'); }} className={styles.blockLink}>I need help with a billing issue</a>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
