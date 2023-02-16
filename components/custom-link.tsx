import { forwardRef } from 'react';
import NextLink, { LinkProps as NextLinkProps } from 'next/link';
import styled from 'styled-components';
import {
  Link as SuomiFiLink,
  LinkProps as SuomiFiLinkProps,
} from 'suomifi-ui-components';
import tw from 'twin.macro';

type LinkProps = Omit<SuomiFiLinkProps, 'href'> &
  Omit<NextLinkProps, 'as' | 'passHref' | 'children'> & { bold?: boolean };

const StyledLink = styled(SuomiFiLink)<{ bold?: boolean }>`
  ${props => props.bold && tw`font-bold`}
`;

const CustomLink = forwardRef<HTMLAnchorElement, LinkProps>(
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
