import styled from 'styled-components';
import { Text } from 'suomifi-ui-components';
import tw from 'twin.macro';

interface StyledProps {
  base?: boolean;
  bold?: boolean;
}

const StyledText = styled(Text)<StyledProps>`
  ${({ base }) => base && tw`text-base`}
  ${({ bold }) => bold && tw`font-bold`}
  color: inherit;
`;

interface Props extends StyledProps {
  children: string;
}

export default function CustomText(props: Props) {
  const { children, ...rest } = props;
  return <StyledText {...rest}>{children}</StyledText>;
}
