import { ReactNode } from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';
import MainNavigation from './main-navigation';

const Container = styled.div.attrs({
  className: 'container mx-auto flex h-full', //  px-4 py-8
})`
  /* button {
      &:hover {
        ${tw`text-red-900`}
      }
    } */
`;

interface Props {
  children: ReactNode;
}

export default function MainLayout({ children }: Props) {
  return (
    <>
      <MainNavigation />
      <Container>{children}</Container>
    </>
  );
}
