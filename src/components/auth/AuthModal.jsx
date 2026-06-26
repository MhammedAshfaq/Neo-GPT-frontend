'use client';

import { useAuth } from '../../context/AuthContext';
import styles from './AuthModal.module.css';
import EmailAuthForm from './EmailAuthForm';
import OTPVerifyForm from './OTPVerifyForm';
import OnboardingSteps from './OnboardingSteps';
import SocialAuthButton from './SocialAuthButton';

export default function AuthModal() {
  const { showAuthModal, authStep, closeAuth, error } = useAuth();

  if (!showAuthModal) return null;

  return (
    <div className={styles.overlay} onClick={(e) => e.target === e.currentTarget && closeAuth()}>
      <div className={styles.card} role="dialog" aria-modal="true" aria-label="Login or Sign Up">

        {/* Close button */}
        {authStep !== 'onboarding' && (
          <button className={styles.closeBtn} onClick={closeAuth} aria-label="Close">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M14 4L4 14M4 4l10 10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
            </svg>
          </button>
        )}

        {/* — Email step — */}
        {authStep === 'email' && (
          <>
            <h2 className={styles.title}>Log in or sign up</h2>
            <p className={styles.subtitle}>
              You'll get smarter responses and can upload files, images, and more.
            </p>

            {/* Social Buttons */}
            <div className={styles.socialGroup}>
              <SocialAuthButton provider="google" />
              <SocialAuthButton provider="apple"  />
              <SocialAuthButton provider="phone"  />
            </div>

            <div className={styles.divider}><span>OR</span></div>

            <EmailAuthForm step="email" />
          </>
        )}

        {/* — Password step — */}
        {authStep === 'password' && <EmailAuthForm step="password" />}

        {/* — OTP step — */}
        {authStep === 'otp' && <OTPVerifyForm />}

        {/* — Onboarding — */}
        {authStep === 'onboarding' && <OnboardingSteps />}

        {/* Global error */}
        {error && authStep !== 'onboarding' && (
          <p className={styles.errorMsg}>{error}</p>
        )}
      </div>
    </div>
  );
}
