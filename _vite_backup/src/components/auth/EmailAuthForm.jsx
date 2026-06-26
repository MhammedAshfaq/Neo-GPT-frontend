import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import styles from './EmailAuthForm.module.css';

export default function EmailAuthForm({ step }) {
  const { submitEmail, login, register, goBack, isLoading, pendingEmail } = useAuth();
  const [email, setEmail]       = useState(pendingEmail || '');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [isSignup, setIsSignup] = useState(false);

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    if (email.trim()) submitEmail(email.trim());
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (isSignup) register(pendingEmail, password);
    else          login(pendingEmail, password);
  };

  /* ── Email Step ── */
  if (step === 'email') {
    return (
      <form onSubmit={handleEmailSubmit} className={styles.form}>
        <div className={styles.inputWrap}>
          <input
            id="auth-email-input"
            className={styles.input}
            type="email"
            placeholder="Email address"
            value={email}
            onChange={e => setEmail(e.target.value)}
            autoFocus
            autoComplete="email"
            required
          />
        </div>
        <button
          id="auth-continue-btn"
          type="submit"
          className={styles.continueBtn}
          disabled={isLoading || !email.trim()}
        >
          {isLoading ? <Spinner /> : 'Continue'}
        </button>
        <p className={styles.footer}>
          {isSignup ? 'Already have an account? ' : "Don't have an account? "}
          <button
            type="button"
            className={styles.switchLink}
            onClick={() => setIsSignup(p => !p)}
          >
            {isSignup ? 'Log in' : 'Sign up'}
          </button>
        </p>
      </form>
    );
  }

  /* ── Password Step ── */
  return (
    <form onSubmit={handlePasswordSubmit} className={styles.form}>
      <button type="button" className={styles.backBtn} onClick={goBack}>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M10 12L6 8l4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        Back
      </button>

      <div className={styles.emailDisplay}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2z"/><polyline points="20,6 12,13 4,6"/>
        </svg>
        {pendingEmail}
      </div>

      <h2 className={styles.passTitle}>{isSignup ? 'Create a password' : 'Enter your password'}</h2>

      <div className={styles.inputWrap}>
        <input
          id="auth-password-input"
          className={styles.input}
          type={showPass ? 'text' : 'password'}
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          autoFocus
          required
          minLength={8}
        />
        <button
          type="button"
          className={styles.showPassBtn}
          onClick={() => setShowPass(p => !p)}
          tabIndex={-1}
          aria-label={showPass ? 'Hide password' : 'Show password'}
        >
          {showPass
            ? <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
            : <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
          }
        </button>
      </div>

      {!isSignup && (
        <a href="#" className={styles.forgotLink} onClick={e => e.preventDefault()}>Forgot password?</a>
      )}

      <button
        id="auth-login-btn"
        type="submit"
        className={styles.continueBtn}
        disabled={isLoading || password.length < 8}
      >
        {isLoading ? <Spinner /> : isSignup ? 'Create account' : 'Log in'}
      </button>
    </form>
  );
}

function Spinner() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
      style={{ animation: 'spin 0.8s linear infinite' }}>
      <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
    </svg>
  );
}
