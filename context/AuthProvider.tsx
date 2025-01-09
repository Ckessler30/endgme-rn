// src/context/AuthContext.tsx
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
  useMemo,
  useCallback,
} from 'react';
import { Alert, AppState } from 'react-native';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/config/supabase';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signInWithEmail: (email: string, password: string) => Promise<void>;
  signUpWithEmail: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    AppState.addEventListener('change', (state) => {
      if (state === 'active') {
        supabase.auth.startAutoRefresh();
      } else {
        supabase.auth.stopAutoRefresh();
      }
    });
  }, []);

  const signInWithEmail = useCallback(
    async (email: string, password: string) => {
      try {
        setLoading(true);
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        setLoading(false);
        if (error) throw error;
      } catch (error) {
        console.error('Sign in error:', error);
        throw error;
      }
    },
    [],
  );

  const signUpWithEmail = useCallback(
    async (email: string, password: string) => {
      try {
        setLoading(true);
        const {
          data: { session: signUpSession },
          error,
        } = await supabase.auth.signUp({ email, password });
        setLoading(false);
        if (error) throw error;
        if (!signUpSession) {
          Alert.alert(
            'Sign up successful',
            'Please check your email for a verification link',
          );
        }
      } catch (error) {
        console.error('Sign up error:', error);
        throw error;
      }
    },
    [],
  );

  const signOut = useCallback(async () => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signOut();
      setLoading(false);
      if (error) throw error;
    } catch (error) {
      console.error('Sign out error:', error);
      throw error;
    }
  }, []);

  const value = useMemo(
    () => ({
      user,
      loading,
      session,
      signInWithEmail,
      signUpWithEmail,
      signOut,
    }),
    [user, loading, session, signInWithEmail, signUpWithEmail, signOut],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
