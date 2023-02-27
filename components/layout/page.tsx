import Head from 'next/head';
import { ReactNode } from 'react';
import { Block } from 'suomifi-ui-components';
import Breadcrumbs from './breadcrumbs';

interface Props {
  title: string;
  withBorder?: boolean;
  children: ReactNode;
}

export default function Page(props: Props) {
  const { title, withBorder = true, children } = props;

  return (
    <>
      <Head>
        <title>{title} - Living in Finland</title>
      </Head>
      <Block variant="main">
        <Breadcrumbs />
        <div className={`md:my-8 ${withBorder ? 'md:border' : ''}`}>
          {children}
        </div>
      </Block>
    </>
  );
}
