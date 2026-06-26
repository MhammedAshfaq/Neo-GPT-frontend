import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "../context/ThemeContext";
import { AppProvider }   from "../context/AppContext";
import { AuthProvider }  from "../context/AuthContext";
import { ChatProvider }  from "../context/ChatContext";
import AppShell   from "../components/layout/AppShell";
import AuthModal  from "../components/auth/AuthModal";
import PricingModal from "../components/chat/PricingModal";
import VoiceSessionOverlay from "../components/chat/VoiceSessionOverlay";
import Toast from "../components/ui/Toast";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata = {
  title: "Neo GPT — AI Chat Assistant",
  description: "A premium, dark, futuristic AI assistant interface inspired by ChatGPT with advanced onboarding workflows and stream simulated messaging.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="dark" className={inter.variable} suppressHydrationWarning>
      <body suppressHydrationWarning>
        <ThemeProvider>
          <AppProvider>
            <AuthProvider>
              <ChatProvider>
                {/* Auth modal — rendered at root level so it overlays everything */}
                <AuthModal />

                {/* Upgrade plans pricing modal */}
                <PricingModal />

                {/* Voice Call overlay */}
                <VoiceSessionOverlay />

                {/* Toast notifications */}
                <Toast />

                {/* App Layout Shell */}
                <AppShell>
                  {children}
                </AppShell>
              </ChatProvider>
            </AuthProvider>
          </AppProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
