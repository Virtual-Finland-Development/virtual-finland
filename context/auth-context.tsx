import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useRouter } from 'next/router';
import { getUnixTime, parseISO } from 'date-fns';
import Cookies from 'js-cookie';
import { LoggedInState } from '@/types';
import api from '@/lib/api';

interface AuthContextProps {
  isAuthenticated: boolean;
  isLoading: boolean;
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
  const [isLoading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const loadTokenFromCookie = () => {
      const token = Cookies.get('idToken');

      if (token) {
        // api.client.defaults.headers.Authorization = `Bearer ${token}`;
        setIsAuthenticated(true);
      }

      setLoading(false);
    };

    loadTokenFromCookie();
  }, []);

  const logIn = useCallback(
    async (loggedInState: LoggedInState) => {
      console.log(loggedInState);

      if (loggedInState) {
        Cookies.set('idToken', loggedInState.idToken, {
          expires: getUnixTime(parseISO(loggedInState.expiresAt)),
        });
        // api.defaults.headers.Authorization = `Bearer ${token.token}`;
        setIsAuthenticated(true);
        router.push('/');
      }
    },
    [router]
  );

  const logOut = useCallback(() => {
    Cookies.remove('idToken');
    // delete api.client.defaults.headers.Authorization;
    setIsAuthenticated(false);
    router.push('/');
  }, [router]);

  return (
    <AuthContext.Provider value={{ isAuthenticated, isLoading, logIn, logOut }}>
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
