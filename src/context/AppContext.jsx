'use client';

import { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedModel, setSelectedModel] = useState('neo-gpt-v1');
  const [toasts, setToasts] = useState([]);
  const [pricingModalOpen, setPricingModalOpen] = useState(false);
  const [webSearchActive, setWebSearchActive] = useState(false);
  const [deepResearchActive, setDeepResearchActive] = useState(false);
  const [createImageActive, setCreateImageActive] = useState(false);
  const [thinkingActive, setThinkingActive] = useState(false);
  const [voiceSessionActive, setVoiceSessionActive] = useState(false);
  const [activeTool, setActiveTool] = useState('none'); // 'none' | 'openai' | 'github'
  const [imageAspectRatio, setImageAspectRatio] = useState('auto');
  const [attachedFiles, setAttachedFiles] = useState([]);

  // Load model from localStorage on client-side mount
  useEffect(() => {
    const savedModel = localStorage.getItem('neo-gpt-model') || 'neo-gpt-v1';
    setSelectedModel(savedModel);
  }, []);

  const toggleSidebar = () => setSidebarOpen(p => !p);

  const changeModel = (model) => {
    setSelectedModel(model);
    localStorage.setItem('neo-gpt-model', model);
  };

  const openPricing = () => setPricingModalOpen(true);
  const closePricing = () => setPricingModalOpen(false);

  const toggleWebSearch = () => setWebSearchActive(p => !p);
  const toggleDeepResearch = () => setDeepResearchActive(p => !p);
  const toggleCreateImage = () => setCreateImageActive(p => !p);
  const toggleThinking = () => setThinkingActive(p => !p);
  const openVoiceSession = () => setVoiceSessionActive(true);
  const closeVoiceSession = () => setVoiceSessionActive(false);

  const addToast = (message, type = 'info', duration = 3000) => {
    const id = Math.random().toString(36).slice(2);
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), duration);
  };

  const removeToast = (id) => setToasts(prev => prev.filter(t => t.id !== id));

  return (
    <AppContext.Provider value={{
      sidebarOpen, setSidebarOpen, toggleSidebar,
      selectedModel, changeModel,
      toasts, addToast, removeToast,
      pricingModalOpen, openPricing, closePricing,
      webSearchActive, setWebSearchActive, toggleWebSearch,
      deepResearchActive, setDeepResearchActive, toggleDeepResearch,
      createImageActive, setCreateImageActive, toggleCreateImage,
      thinkingActive, setThinkingActive, toggleThinking,
      voiceSessionActive, setVoiceSessionActive, openVoiceSession, closeVoiceSession,
      activeTool, setActiveTool,
      imageAspectRatio, setImageAspectRatio,
      attachedFiles, setAttachedFiles,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}
