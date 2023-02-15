import { ReactNode } from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';

const Container = styled.div.attrs({
  className: 'container mx-auto px-4 py-4 flex justify-center h-full',
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
  return <Container>{children}</Container>;
}
