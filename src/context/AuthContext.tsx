import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile } from '../types/resume';

interface AuthContextType {
  user: UserProfile | null;
  isAuthenticated: boolean;
  login: (email: string, name?: string) => void;
  signup: (email: string, name: string) => void;
  demoLogin: () => void;
  logout: () => void;
  upgradeToPro: () => Promise<void>;
  simulateProUpgrade: () => void;
  downgradeToFree: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const STORAGE_KEY = 'rezicv_user_profile';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      // Ignore
    }
    // Default demo user so the app is immediately usable
    return {
      email: 'alex.dev@example.com',
      name: 'Alexander Mitchell',
      isPro: false,
      plan: 'free',
    };
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, [user]);

  const login = (email: string, name?: string) => {
    setUser({
      email,
      name: name || email.split('@')[0],
      isPro: user?.isPro || false,
      plan: user?.plan || 'free',
    });
  };

  const signup = (email: string, name: string) => {
    setUser({
      email,
      name,
      isPro: false,
      plan: 'free',
    });
  };

  const demoLogin = () => {
    setUser({
      email: 'demo.engineer@rezicv.com',
      name: 'Demo Tech Lead',
      isPro: true,
      plan: 'pro',
    });
  };

  const logout = () => {
    setUser(null);
  };

  const upgradeToPro = async () => {
    // Attempt real Stripe checkout API in test mode
    try {
      const response = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: user?.email || 'customer@example.com',
          planId: 'price_pro_monthly',
        }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.url) {
          window.location.href = data.url;
          return;
        }
      }
    } catch (err) {
      // Fallback
    }

    // Instant local test mode upgrade fallback
    simulateProUpgrade();
  };

  const simulateProUpgrade = () => {
    if (user) {
      setUser({ ...user, isPro: true, plan: 'pro' });
    } else {
      setUser({
        email: 'pro.user@rezicv.com',
        name: 'Pro Member',
        isPro: true,
        plan: 'pro',
      });
    }
  };

  const downgradeToFree = () => {
    if (user) {
      setUser({ ...user, isPro: false, plan: 'free' });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        signup,
        demoLogin,
        logout,
        upgradeToPro,
        simulateProUpgrade,
        downgradeToFree,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
