import { Text } from 'suomifi-ui-components';
import tw, { styled } from 'twin.macro';

interface StyledProps {
  $base?: boolean;
  $bold?: boolean;
  $center?: boolean;
}

const StyledText = styled(Text)<StyledProps>`
  ${({ $base }) => $base && tw`text-base`}
  ${({ $bold }) => $bold && tw`font-bold`}
  ${({ $center }) => $center && tw`text-center`}
  color: inherit;
`;

interface Props extends StyledProps {
  children: string;
}

export default function CustomText(props: Props) {
  const { children, $bold, $base, $center, ...rest } = props;

  return (
    <StyledText {...rest} $bold={$bold} $base={$base} $center={$center}>
      {children}
    </StyledText>
  );
}
