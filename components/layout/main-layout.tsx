import { ReactNode } from 'react';
import { Block } from 'suomifi-ui-components';
import { styled } from 'twin.macro';
import Footer from './footer';
import MainNavigation from './main-navigation';

const Container = styled.div.attrs({
  className: 'container flex flex-col h-full',
})``;

interface Props {
  children: ReactNode;
}

export default function MainLayout({ children }: Props) {
  return (
    <>
      <MainNavigation />
      <Container>
        <Block variant="main">{children}</Block>
      </Container>
      <Footer />
    </>
  );
}
