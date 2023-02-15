import { ReactNode, useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '@/context/auth-context';

const LOGIN_ROUTE = '/login';
const AUTH_ROUTE = '/auth';
const PUBLIC_ROUTES = [LOGIN_ROUTE, AUTH_ROUTE];

interface Props {
  children: ReactNode;
}

export default function RouteSentry(props: Props) {
  const { children } = props;
  const { isAuthenticated, isLoading } = useAuth();
  const [showContent, setShowContent] = useState(false);
  const router = useRouter();

  const sentryCheck = useCallback(
    (url: string, isAuthenticated: boolean) => {
      console.log('run sentry check!');
      const path = url.split('?')[0];

      if (!isAuthenticated && !PUBLIC_ROUTES.includes(path)) {
        setShowContent(false);

        router.push('/login');
      } else {
        setShowContent(true);
      }
    },
    [router]
  );

  useEffect(() => {
    sentryCheck(router.asPath, isAuthenticated);
  }, [isAuthenticated, router.asPath, sentryCheck]);

  /* useEffect(() => {
    // run check on initial render
    sentryCheck(router.asPath);

    // on route change start - hide content
    const hideContent = () => setShowContent(false);
    router.events.on('routeChangeStart', hideContent);

    // on route change complete - run sentry check
    router.events.on('routeChangeComplete', sentryCheck);

    // unsubscribe from router events
    return () => {
      router.events.off('routeChangeStart', hideContent);
      router.events.off('routeChangeComplete', sentryCheck);
    };
    //  eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); */

  return <>{showContent && children}</>;
}
