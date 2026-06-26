import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AppProvider }   from './context/AppContext';
import { AuthProvider }  from './context/AuthContext';
import { ChatProvider }  from './context/ChatContext';
import AppShell   from './components/layout/AppShell';
import AuthModal  from './components/auth/AuthModal';
import ChatPage   from './pages/ChatPage';
import NotFoundPage from './pages/NotFoundPage';
import Toast from './components/ui/Toast';

export default function App() {
  return (
    <ThemeProvider>
      <AppProvider>
        <AuthProvider>
          <ChatProvider>
            <BrowserRouter>
              {/* Auth modal — rendered at root level so it overlays everything */}
              <AuthModal />

              {/* Toast notifications */}
              <Toast />

              <AppShell>
                <Routes>
                  <Route path="/"  element={<ChatPage />} />
                  <Route path="*"  element={<NotFoundPage />} />
                </Routes>
              </AppShell>
            </BrowserRouter>
          </ChatProvider>
        </AuthProvider>
      </AppProvider>
    </ThemeProvider>
  );
}
