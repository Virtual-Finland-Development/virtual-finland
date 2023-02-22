import Link, { LinkProps } from 'next/link';
import { useRouter } from 'next/router';
import { forwardRef } from 'react';
import {
  Breadcrumb,
  BreadcrumbLink,
  BreadcrumbLinkProps,
} from 'suomifi-ui-components';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Profile', href: '/profile' },
  { name: 'Company', href: '/company' },
];

type CustomLinkProps = LinkProps & BreadcrumbLinkProps;

const BreadcrumbCustomLink = forwardRef<HTMLAnchorElement, CustomLinkProps>(
  (props, ref) => {
    const { onClick, href, current, children } = props;

    return (
      <BreadcrumbLink href={href} onClick={onClick} current={current}>
        {children}
      </BreadcrumbLink>
    );
  }
);

BreadcrumbCustomLink.displayName = 'BreadcrumbCustomLink';

export default function BreadCrumbs() {
  const router = useRouter();

  if (['/', '/404'].includes(router.pathname)) {
    return null;
  }

  return (
    <div className="hidden md:block pt-4 -mb-4">
      <Breadcrumb aria-label="Breadcrumb">
        {navigation
          .filter(
            item =>
              item.href === '/' ||
              (router.pathname !== '/' && item.href.includes(router.pathname))
          )
          .map(item => (
            <Link key={item.href} href={item.href} passHref legacyBehavior>
              <BreadcrumbCustomLink
                href=""
                current={router.pathname === item.href}
              >
                {item.name}
              </BreadcrumbCustomLink>
            </Link>
          ))}
      </Breadcrumb>
    </div>
  );
}
