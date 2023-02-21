import Head from 'next/head';
import { ReactNode } from 'react';
import { Block } from 'suomifi-ui-components';

interface Props {
  title: string;
  children: ReactNode;
}

export default function Page(props: Props) {
  const { title, children } = props;

  return (
    <>
      <Head>
        <title>{title} - Living in Finland</title>
      </Head>
      <Block variant="main">{children}</Block>
    </>
  );
}
