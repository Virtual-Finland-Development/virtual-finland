import { Text } from 'suomifi-ui-components';
import tw, { styled } from 'twin.macro';

interface StyledProps {
  $base?: boolean;
  $bold?: boolean;
}

const StyledText = styled(Text)<StyledProps>`
  ${({ $base }) => $base && tw`text-base`}
  ${({ $bold }) => $bold && tw`font-bold`}
  color: inherit;
`;

interface Props extends StyledProps {
  children: string;
}

export default function CustomText(props: Props) {
  const { children, $bold, $base, ...rest } = props;

  return (
    <StyledText {...rest} $bold={$bold} $base={$base}>
      {children}
    </StyledText>
  );
}
