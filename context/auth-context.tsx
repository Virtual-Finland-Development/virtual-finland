import { useRouter } from 'next/router';
import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { getUnixTime, parseISO } from 'date-fns';
import Cookies from 'js-cookie';
import jwt_decode from 'jwt-decode';
import { LoggedInState } from '@/types';
import api from '@/lib/api';

interface AuthContextProps {
  isAuthenticated: boolean;
  isLoading: boolean;
  userEmail: string | null;
  setLoading: () => void;
  logIn: (loggedInState: LoggedInState) => void;
  logOut: () => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);
const AuthConsumer = AuthContext.Consumer;

function AuthProvider(props: AuthProviderProps) {
  const { children } = props;
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [isLoading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const loadTokenFromCookie = () => {
      const token = Cookies.get('idToken');

      if (token) {
        // api.client.defaults.headers.Authorization = `Bearer ${token}`;
        const { email }: { email: string | undefined } = jwt_decode(token);
        setUserEmail(email || null);
        setIsAuthenticated(true);
      }

      setLoading(false);
    };

    loadTokenFromCookie();
  }, []);

  const logIn = useCallback(
    async (loggedInState: LoggedInState) => {
      if (loggedInState) {
        Cookies.set('idToken', loggedInState.idToken, {
          expires: getUnixTime(parseISO(loggedInState.expiresAt)),
        });
        const { email }: { email: string | undefined } = jwt_decode(
          loggedInState.idToken
        );
        // api.defaults.headers.Authorization = `Bearer ${token.token}`;
        setUserEmail(email || null);
        setIsAuthenticated(true);
        const redirectPath = localStorage.getItem('redirectPath');
        router.push(redirectPath || '/');
      }
    },
    [router]
  );

  const logOut = useCallback(() => {
    Cookies.remove('idToken');
    // delete api.client.defaults.headers.Authorization;
    setUserEmail(null);
    setIsAuthenticated(false);
    router.push('/');
  }, [router]);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isLoading,
        userEmail,
        setLoading: () => setLoading(true),
        logIn,
        logOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext) as AuthContextProps;

  if (!context) {
    throw new Error('useAuth must be used within AuthProvider.');
  }

  return context;
}

export { AuthProvider, AuthConsumer, useAuth };
