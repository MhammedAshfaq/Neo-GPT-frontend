'use client';

import { useState, useRef } from 'react';
import { useAuth } from '../../context/AuthContext';
import styles from './OTPVerifyForm.module.css';

export default function OTPVerifyForm() {
  const { verifyOtp, isLoading, pendingEmail, error } = useAuth();
  const [digits, setDigits] = useState(Array(6).fill(''));
  const inputRefs = useRef([]);

  const handleChange = (i, val) => {
    if (!/^\d?$/.test(val)) return;
    const next = [...digits];
    next[i] = val;
    setDigits(next);
    if (val && i < 5) inputRefs.current[i + 1]?.focus();
    if (next.every(d => d !== '')) {
      setTimeout(() => verifyOtp(next.join('')), 100);
    }
  };

  const handleKeyDown = (i, e) => {
    if (e.key === 'Backspace' && !digits[i] && i > 0) {
      inputRefs.current[i - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    if (pasted.length === 6) {
      setDigits(pasted.split(''));
      setTimeout(() => verifyOtp(pasted), 100);
    }
    e.preventDefault();
  };

  return (
    <div className={styles.wrap}>
      <div className={styles.icon}>
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
          <circle cx="20" cy="20" r="20" fill="rgba(124,58,237,0.15)"/>
          <path d="M12 20l6 6 10-12" stroke="#9070ff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
      <h2 className={styles.title}>Check your email</h2>
      <p className={styles.sub}>
        We sent a 6-digit code to <strong>{pendingEmail}</strong>
      </p>

      <div className={styles.otpRow} onPaste={handlePaste}>
        {digits.map((d, i) => (
          <input
            key={i}
            id={`otp-digit-${i}`}
            ref={el => inputRefs.current[i] = el}
            className={styles.otpBox}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={d}
            autoFocus={i === 0}
            onChange={e => handleChange(i, e.target.value)}
            onKeyDown={e => handleKeyDown(i, e)}
          />
        ))}
      </div>

      {error && <p className={styles.error}>{error}</p>}

      <button
        id="otp-verify-btn"
        className={styles.verifyBtn}
        onClick={() => verifyOtp(digits.join(''))}
        disabled={isLoading || digits.some(d => !d)}
      >
        {isLoading ? 'Verifying…' : 'Verify'}
      </button>

      <p className={styles.resend}>
        Didn't receive it?{' '}
        <button className={styles.resendLink} onClick={() => setDigits(Array(6).fill(''))}>
          Resend code
        </button>
      </p>
    </div>
  );
}
