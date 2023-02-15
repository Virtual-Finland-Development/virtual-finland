import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Button, Heading } from 'suomifi-ui-components';
import api from '@/lib/api';
import { useAuth } from '@/context/auth-context';
import Loading from '@/components/loading';

export default function LoginPage() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const [isLoading, setLoading] = useState(false);

  const logInHandler = () => {
    setLoading(true);
    api.auth.directToAuthGwLogin();
  };

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/');
    }
  }, [isAuthenticated, router]);

  return (
    <div className="flex flex-col justify-center items-center gap-6">
      <Heading variant="h1">Living in Finland - logged out</Heading>
      <Button onClick={logInHandler} disabled={isLoading}>
        Log in
      </Button>
      {isLoading && <Loading text="Redirecting..." />}
    </div>
  );
}
