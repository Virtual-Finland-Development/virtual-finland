import { ReactNode } from 'react';
// import styled from 'styled-components';
import { Heading, HeadingProps } from 'suomifi-ui-components';
import tw, { styled } from 'twin.macro';

type SuomiFiBlue = 'light' | 'dark';

const colorVariant = (color: SuomiFiBlue) =>
  color === 'light' ? tw`text-suomifi-light` : tw`text-suomifi-dark`;

/* const StyledHeading = styled(Heading)<
  HeadingProps & { suomiFiBlue?: SuomiFiBlue }
>`
  ${({ suomiFiBlue }) => suomiFiBlue && colorVariant(suomiFiBlue)}
`; */

/* const RedContainer = styled(Container)(({ hasBorder }) => [
  tw`bg-red-500 text-black`,
  hasBorder && tw`border`,
]) */
const StyledHeading = styled(Heading)<{ suomiFiBlue?: SuomiFiBlue }>(
  ({ suomiFiBlue }) => [suomiFiBlue && colorVariant(suomiFiBlue)]
);

interface Props extends HeadingProps {
  children: ReactNode;
  suomiFiBlue?: SuomiFiBlue;
}

export default function CustomHeading(props: Props) {
  const { children, variant, suomiFiBlue } = props;

  return (
    <StyledHeading variant={variant} suomiFiBlue={suomiFiBlue}>
      {children}
    </StyledHeading>
  );
}
