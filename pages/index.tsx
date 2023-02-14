import Head from 'next/head';
import Image from 'next/image';
import { Inter } from '@next/font/google';
import styled from 'styled-components';
import { Heading, Button } from 'suomifi-ui-components';
import tw from 'twin.macro';

const Container = styled.div.attrs({
  className: 'container mx-auto px-4 py-4 flex justify-center',
})`
  /*  button {
    &:hover {
      ${tw`text-red-900`}
    }
  } */
`;

export default function Home() {
  return (
    <>
      <Head>
        <title>Living in Finland</title>
        <meta name="description" content="Living in Finland demo app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Container>
          <div className="flex flex-col justify-center items-center gap-4">
            <Heading variant="h1">Living in Finland</Heading>
            <Button>Log in</Button>
          </div>
        </Container>
      </main>
    </>
  );
}
