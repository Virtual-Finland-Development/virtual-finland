import NextLink, { LinkProps as NextLinkProps } from 'next/link';
import { forwardRef } from 'react';
import styled from 'styled-components';
import {
  Link as SuomiFiLink,
  LinkProps as SuomiFiLinkProps,
} from 'suomifi-ui-components';
import tw from 'twin.macro';

interface StyledProps {
  bold?: boolean;
  base?: boolean;
}

const StyledLink = styled(SuomiFiLink)<StyledProps>`
  ${props => props.bold && tw`font-bold`}
  ${props => props.base && tw`text-base`}
`;

type CustomLinkProps = Omit<SuomiFiLinkProps, 'href'> &
  Omit<NextLinkProps, 'as' | 'passHref' | 'children'> &
  StyledProps;

const CustomLink = forwardRef<HTMLAnchorElement, CustomLinkProps>(
  ({ href, prefetch, replace, scroll, shallow, locale, ...rest }, ref) => {
    return (
      <NextLink
        href={href}
        replace={replace}
        scroll={scroll}
        shallow={shallow}
        locale={locale}
        passHref
        legacyBehavior
      >
        <StyledLink href="" ref={ref} {...rest} />
      </NextLink>
    );
  }
);

CustomLink.displayName = 'CustomLink';

export default CustomLink;
