'use client';

import { createContext, useContext, useState, useCallback, useEffect } from 'react';

const AuthContext = createContext(null);

const TOKEN_KEY = 'neo-gpt-token';
const USER_KEY  = 'neo-gpt-user';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading]       = useState(false);

  useEffect(() => {
    try {
      const savedUser = localStorage.getItem(USER_KEY);
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
    } catch (e) {
      console.error('Failed to restore auth user', e);
    }
  }, []);
  const [authStep, setAuthStep]         = useState('idle'); // idle|email|password|otp|onboarding
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [pendingEmail, setPendingEmail] = useState('');
  const [error, setError]               = useState(null);

  const isAuthenticated = !!user;

  /* ── helpers ── */
  const saveUser = (u) => { setUser(u); localStorage.setItem(USER_KEY, JSON.stringify(u)); };
  const clearUser = ()  => { setUser(null); localStorage.removeItem(USER_KEY); localStorage.removeItem(TOKEN_KEY); };

  /* ── open / close modal ── */
  const openAuth  = useCallback(() => { setShowAuthModal(true);  setAuthStep('email'); setError(null); }, []);
  const closeAuth = useCallback(() => { setShowAuthModal(false); setAuthStep('idle');  setError(null); }, []);

  /* ── Step: submit email ── */
  const submitEmail = useCallback(async (email) => {
    setIsLoading(true); setError(null);
    try {
      // In real app: POST /api/auth/check-email
      await new Promise(r => setTimeout(r, 600));
      setPendingEmail(email);
      setAuthStep('password');
    } catch (e) { setError(e.message); }
    finally { setIsLoading(false); }
  }, []);

  /* ── Step: login with password ── */
  const login = useCallback(async (email, password) => {
    setIsLoading(true); setError(null);
    try {
      await new Promise(r => setTimeout(r, 800));
      // Demo mode — accept any credentials
      const demoUser = {
        id: 'user_' + Math.random().toString(36).slice(2),
        name: email.split('@')[0],
        email,
        avatar: null,
        preferences: { theme: 'dark', defaultModel: 'neo-gpt-v1', useCase: [] },
        createdAt: new Date().toISOString(),
        isNew: false,
      };
      localStorage.setItem(TOKEN_KEY, 'demo_token_' + Date.now());
      saveUser(demoUser);
      closeAuth();
    } catch (e) { setError(e.message || 'Login failed'); }
    finally { setIsLoading(false); }
  }, [closeAuth]);

  /* ── Step: register new user ── */
  const register = useCallback(async (email, password) => {
    setIsLoading(true); setError(null);
    try {
      await new Promise(r => setTimeout(r, 800));
      setPendingEmail(email);
      setAuthStep('otp');
    } catch (e) { setError(e.message || 'Registration failed'); }
    finally { setIsLoading(false); }
  }, []);

  /* ── Step: verify OTP ── */
  const verifyOtp = useCallback(async (code) => {
    setIsLoading(true); setError(null);
    try {
      await new Promise(r => setTimeout(r, 700));
      // Demo: any 6-digit code works
      if (code.length === 6) {
        setAuthStep('onboarding');
      } else {
        setError('Invalid code. Please try again.');
      }
    } catch (e) { setError(e.message); }
    finally { setIsLoading(false); }
  }, []);

  /* ── Step: complete onboarding ── */
  const completeOnboarding = useCallback(async ({ name, useCase, theme, model }) => {
    setIsLoading(true);
    try {
      await new Promise(r => setTimeout(r, 400));
      const newUser = {
        id: 'user_' + Math.random().toString(36).slice(2),
        name,
        email: pendingEmail,
        avatar: null,
        preferences: { theme, defaultModel: model, useCase },
        createdAt: new Date().toISOString(),
        isNew: true,
      };
      localStorage.setItem(TOKEN_KEY, 'demo_token_' + Date.now());
      saveUser(newUser);
      closeAuth();
    } finally { setIsLoading(false); }
  }, [pendingEmail, closeAuth]);

  /* ── Social auth (Google / Apple / Phone) ── */
  const socialLogin = useCallback(async (provider) => {
    setIsLoading(true); setError(null);
    try {
      await new Promise(r => setTimeout(r, 900));
      const demoUser = {
        id: 'user_' + Math.random().toString(36).slice(2),
        name: provider === 'google' ? 'Google User' : provider === 'apple' ? 'Apple User' : 'Phone User',
        email: `user@${provider}.com`,
        avatar: null,
        preferences: { theme: 'dark', defaultModel: 'neo-gpt-v1', useCase: [] },
        createdAt: new Date().toISOString(),
        isNew: false,
      };
      localStorage.setItem(TOKEN_KEY, 'demo_token_' + Date.now());
      saveUser(demoUser);
      closeAuth();
    } catch (e) { setError(e.message); }
    finally { setIsLoading(false); }
  }, [closeAuth]);

  /* ── Logout ── */
  const logout = useCallback(() => { clearUser(); }, []);

  /* ── Back step ── */
  const goBack = useCallback(() => {
    if (authStep === 'password') setAuthStep('email');
    else if (authStep === 'otp')  setAuthStep('password');
    setError(null);
  }, [authStep]);

  return (
    <AuthContext.Provider value={{
      user, isAuthenticated, isLoading, authStep,
      showAuthModal, pendingEmail, error,
      openAuth, closeAuth, submitEmail,
      login, register, verifyOtp, completeOnboarding,
      socialLogin, logout, goBack,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
