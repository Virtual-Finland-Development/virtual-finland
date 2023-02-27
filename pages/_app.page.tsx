import type { AppProps } from 'next/app';
import Head from 'next/head';
import { useRouter } from 'next/router';
import tw from 'twin.macro';
import { AuthConsumer, AuthProvider } from '@/context/auth-context';
import { ModalProvider } from '@/context/modal-context';
import MainLayout from '@/components/layout/main-layout';
import Loading from '@/components/ui/loading';
import 'suomifi-ui-components/dist/main.css';
import '@/styles/globals.css';
import 'react-phone-number-input/style.css';

const Container = tw.div`container flex items-center justify-center h-screen`;

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  return (
    <AuthProvider>
      <Head>
        <title>Living in Finland</title>
        <meta name="description" content="Living in Finland demo app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AuthConsumer>
        {provider => {
          if (!provider) {
            return null;
          }

          if (provider.isLoading) {
            return (
              <Container>
                <Loading />
              </Container>
            );
          }

          if (router.pathname === '/auth') {
            return (
              <Container>
                <Component {...pageProps} />
              </Container>
            );
          }

          return (
            <ModalProvider>
              <MainLayout>
                <Component {...pageProps} />
              </MainLayout>
            </ModalProvider>
          );
        }}
      </AuthConsumer>
    </AuthProvider>
  );
}
