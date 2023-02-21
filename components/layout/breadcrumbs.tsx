import Link, { LinkProps } from 'next/link';
import { useRouter } from 'next/router';
import { ReactNode } from 'react';
import { Breadcrumb, BreadcrumbLink } from 'suomifi-ui-components';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Profile', href: '/profile' },
  { name: 'Company', href: '/company' },
];

interface BreadcrumbCustomLinkProps extends LinkProps {
  children: ReactNode;
  current: boolean;
}

function BreadcrumbCustomLink({
  children,
  href,
  current,
}: BreadcrumbCustomLinkProps) {
  return (
    <Link href={href} passHref legacyBehavior>
      <BreadcrumbLink current={current}>{children}</BreadcrumbLink>
    </Link>
  );
}

export default function BreadCrumbs() {
  const router = useRouter();

  if (router.pathname === '/') {
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
            <BreadcrumbCustomLink
              key={item.href}
              href={item.href}
              current={router.pathname === item.href}
            >
              {item.name}
            </BreadcrumbCustomLink>
          ))}
      </Breadcrumb>
    </div>
  );
}
