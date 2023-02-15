import type { AppProps } from 'next/app';
import Head from 'next/head';
import { LoadingSpinner } from 'suomifi-ui-components';
import { AuthConsumer, AuthProvider } from '@/context/auth-context';
import MainLayout from '@/components/main-layout';
import RouteSentry from '@/components/route-sentry';
import '@/styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Head>
        <title>Living in Finland</title>
        <meta name="description" content="Living in Finland demo app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MainLayout>
        <AuthConsumer>
          {provider => {
            if (!provider) {
              return null;
            }

            if (provider.isLoading) {
              return (
                <LoadingSpinner
                  status="loading"
                  text="Loading"
                  textAlign="right"
                  variant="normal"
                />
              );
            }

            return (
              <main>
                <RouteSentry>
                  <Component {...pageProps} />
                </RouteSentry>
              </main>
            );
          }}
        </AuthConsumer>
      </MainLayout>
    </AuthProvider>
  );
}
