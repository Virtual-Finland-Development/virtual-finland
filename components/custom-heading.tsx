import { ReactNode } from 'react';
import styled from 'styled-components';
import { Heading, HeadingProps } from 'suomifi-ui-components';
import tw from 'twin.macro';

type SuomiFiBlue = 'light' | 'dark';

const colorVariant = (color: SuomiFiBlue) =>
  color === 'light' ? tw`text-suomifi-light` : tw`text-suomifi-dark`;

const StyledHeading = styled(Heading)<
  HeadingProps & { suomiFiBlue?: SuomiFiBlue }
>`
  ${({ suomiFiBlue }) => suomiFiBlue && colorVariant(suomiFiBlue)}
`;

interface Props extends HeadingProps {
  children: ReactNode;
  suomiFiBlue?: SuomiFiBlue;
}

export default function CustomHeading(props: Props) {
  const { children, ...rest } = props;
  return <StyledHeading {...rest}>{children}</StyledHeading>;
}