import Link from 'next/link';
import { useRouter } from 'next/router';
import {
  RouterLink,
  SideNavigation,
  SideNavigationItem,
} from 'suomifi-ui-components';
import useDimensions from '@/hooks/use-dimensions';

export default function CompanySideNav() {
  const router = useRouter();
  const { width } = useDimensions();

  return (
    <SideNavigation
      aria-label="Company"
      heading="Company establishment"
      icon="organisation"
      variant={width > 1024 ? 'default' : 'smallScreen'}
      initiallyExpanded={false}
    >
      <SideNavigationItem
        content={
          <Link href="/company/establishment" passHref legacyBehavior>
            <RouterLink className="!rounded-none">
              Company establishment
            </RouterLink>
          </Link>
        }
        selected={router.pathname === '/company/establishment'}
        subLevel={1}
        expanded
        className="!mb-0"
      >
        <SideNavigationItem
          content={
            <Link
              href="/company/establishment/company-info"
              passHref
              legacyBehavior
            >
              <RouterLink className="!rounded-none">
                Company information
              </RouterLink>
            </Link>
          }
          selected={router.pathname === '/company/establishment/company-info'}
          subLevel={3}
        />
        <SideNavigationItem
          content={
            <Link
              href="/company/establishment/beneficial-owners"
              passHref
              legacyBehavior
            >
              <RouterLink className="!rounded-none">
                Beneficial owners
              </RouterLink>
            </Link>
          }
          selected={
            router.pathname === '/company/establishment/beneficial-owners'
          }
          subLevel={3}
        />
        <SideNavigationItem
          content={
            <Link
              href="/company/establishment/signatory-rights"
              passHref
              legacyBehavior
            >
              <RouterLink className="!rounded-none">
                Signatory rights
              </RouterLink>
            </Link>
          }
          selected={
            router.pathname === '/company/establishment/signatory-rights'
          }
          subLevel={3}
        />
      </SideNavigationItem>
    </SideNavigation>
  );
}
