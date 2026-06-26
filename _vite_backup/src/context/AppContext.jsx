import { createContext, useContext, useState } from 'react';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedModel, setSelectedModel] = useState(
    () => localStorage.getItem('neo-gpt-model') || 'neo-gpt-v1'
  );
  const [toasts, setToasts] = useState([]);

  const toggleSidebar = () => setSidebarOpen(p => !p);

  const changeModel = (model) => {
    setSelectedModel(model);
    localStorage.setItem('neo-gpt-model', model);
  };

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
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}
