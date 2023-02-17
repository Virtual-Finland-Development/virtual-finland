import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import { Paragraph } from 'suomifi-ui-components';
import { AuthProvider } from '@/types';
import api from '@/lib/api';
import { generateAppContextHash } from '@/lib/utils';
import { useAuth } from '@/context/auth-context';
import Alert from '@/components/ui/alert';
import Loading from '@/components/ui/loading';

export default function AuthPage() {
  const { logIn, logOut } = useAuth();
  const [isLoading, setLoading] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const router = useRouter();
  const { provider, loginCode, logout, intent, error, type } = router.query;

  const handleAuth = useCallback(async () => {
    try {
      const loggedInState = await api.auth.logIn({
        loginCode: loginCode as string,
        appContext: generateAppContextHash(),
      });

      logIn(loggedInState);
    } catch (error: any) {
      console.log(error);
      setLoading(false);
      setAuthError(error ? (error as string) : 'Logging out failed.');
    }
  }, [logIn, loginCode]);

  useEffect(() => {
    if (provider && loginCode) {
      setLoading(true);

      if (provider === AuthProvider.TESTBED) {
        handleAuth();
      } else {
        router.push('/');
      }
    }
  }, [handleAuth, loginCode, provider, router]);

  useEffect(() => {
    if (logout || intent === 'LogoutRequest') {
      if (
        logout === 'success' ||
        (type === 'info' && error === 'Already logged out')
      ) {
        logOut();
      } else {
        setLoading(false);
        setAuthError(error ? (error as string) : 'Logging out failed.');
      }
    }
  }, [error, intent, logOut, logout, type]);

  if (isLoading) {
    return <Loading />;
  }

  if (authError) {
    return (
      <Alert status="error" labelText="Error error!">
        <div className="w-96">
          <Paragraph>{authError}</Paragraph>
        </div>
      </Alert>
    );
  }

  return null;
}
