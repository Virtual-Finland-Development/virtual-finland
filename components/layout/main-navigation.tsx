import Link, { LinkProps } from 'next/link';
import { useRouter } from 'next/router';
import { ReactNode } from 'react';
import { Disclosure, Popover } from '@headlessui/react';
import {
  Button,
  Icon,
  LanguageMenu,
  LanguageMenuItem,
  RouterLink,
  ServiceNavigation,
  ServiceNavigationItem,
  StaticIcon,
  Text,
} from 'suomifi-ui-components';
import tw, { styled } from 'twin.macro';
import api from '@/lib/api';
import { useAuth } from '@/context/auth-context';
import CustomHeading from '../ui/custom-heading';
import CustomLink from '../ui/custom-link';

const navigation = [
  { name: 'Home', href: '/', current: true },
  { name: 'Profile', href: '/profile', current: false },
];

const MobileMenuToggleButton = styled(Button).attrs({
  variant: 'secondaryNoBorder',
})`
  ${tw`p-0 px-2`}
`;

interface MobileLink extends LinkProps {
  children: ReactNode;
}

function MobileLink({ onClick, children, href }: MobileLink) {
  return (
    <Link href={href} passHref legacyBehavior>
      <RouterLink onClick={onClick}>{children}</RouterLink>
    </Link>
  );
}

const DesktopNavItem = styled.li<{ $active: boolean }>(({ $active }) => [
  tw`border-b-4 py-2 px-4 mx-7 border-b-transparent hover:border-b-suomifi-light`,
  $active && tw`border-b-suomifi-light`,
  `a {
    font-weight: 700;
  }`,
]);

function DesktopMenuPopover() {
  return (
    <Popover as="div" className="hidden md:block ml-3">
      {({ open, close }) => (
        <>
          <Popover.Button as={MobileMenuToggleButton}>
            {open ? (
              <Icon icon="close" className="block h-6 w-6" aria-hidden="true" />
            ) : (
              <Icon icon="menu" className="block h-6 w-6" aria-hidden="true" />
            )}
          </Popover.Button>
          <Popover.Panel className="absolute right-0 z-10 mt-3 origin-top-right bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none flex flex-col px-4">
            {navigation.map(item => (
              <div
                key={item.href}
                className="flex flex-row items-center justify-start gap-4 w-80 odd:border-b border-b-gray-300 p-4"
              >
                <>
                  <StaticIcon
                    icon="archive"
                    className="flex-shrink-0 h-12 w-12"
                  />
                  <div className="flex flex-col">
                    <div onClick={() => close()}>
                      <CustomLink href={item.href} $bold>
                        {item.name}
                      </CustomLink>
                    </div>
                    <Text>Page info here.</Text>
                  </div>
                </>
              </div>
            ))}
          </Popover.Panel>
        </>
      )}
    </Popover>
  );
}

export default function MainNavigation() {
  const { isAuthenticated, userEmail, setLoading } = useAuth();
  const router = useRouter();

  const logoutHandler = () => {
    setLoading();
    api.auth.directToAuthGwLogout();
  };

  return (
    <header>
      <Disclosure
        as="nav"
        className="bg-white border-b border-t-4 border-solid border-t-suomifi-dark border-b-suomifi-light"
      >
        {({ open }) => (
          <>
            <div className="container px-4 lg:px-0">
              <div className="relative flex h-14 items-center justify-between">
                {/* Main heading */}
                <Link href="/">
                  <CustomHeading variant="h4" suomiFiBlue="light">
                    LIVING IN FINLAND
                  </CustomHeading>
                </Link>

                {/* Controls */}
                <div className="flex flex-row items-center gap-6">
                  {/* Language menu */}
                  <LanguageMenu name="EN" tw="font-bold">
                    <LanguageMenuItem onSelect={() => {}}>
                      Suomeksi (FI)
                    </LanguageMenuItem>
                    <LanguageMenuItem onSelect={() => {}}>
                      På Svenska (SV)
                    </LanguageMenuItem>
                    <LanguageMenuItem onSelect={() => {}} selected>
                      In English (EN)
                    </LanguageMenuItem>
                  </LanguageMenu>

                  {/* Mobile menu toggle button */}
                  <div className="md:hidden">
                    <Disclosure.Button as={MobileMenuToggleButton}>
                      {open ? (
                        <Icon
                          icon="close"
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      ) : (
                        <Icon
                          icon="menu"
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      )}
                    </Disclosure.Button>
                  </div>

                  {/* Desktop user info / log out */}
                  {isAuthenticated && (
                    <div className="hidden md:flex flex-col items-end">
                      <Text tw="text-base font-bold">{userEmail}</Text>
                      <Button
                        variant="secondaryNoBorder"
                        tw="text-xs min-h-0 p-0"
                        onClick={logoutHandler}
                      >
                        LOG OUT
                      </Button>
                    </div>
                  )}

                  {/* Desktop menu popover */}
                  <DesktopMenuPopover />
                </div>
              </div>

              {/* Mobile user info / log out */}
              {isAuthenticated && (
                <div className="md:hidden flex flex-row items-center justify-between pb-1 -mt-1">
                  <Text tw="text-sm font-bold">{userEmail}</Text>
                  <Button
                    variant="secondaryNoBorder"
                    tw="text-xs min-h-0 p-0"
                    onClick={logoutHandler}
                  >
                    LOG OUT
                  </Button>
                </div>
              )}
            </div>

            {/* Desktop navigation */}
            <div className="hidden lg:block border-t border-t-gray-300">
              <div className="container">
                <ul className="hidden md:flex flex-wrap gap-4 -mx-7">
                  {navigation.map(item => (
                    <DesktopNavItem
                      key={item.name}
                      $active={router.pathname === item.href}
                    >
                      <Link href={item.href}>
                        <Text>{item.name}</Text>
                      </Link>
                    </DesktopNavItem>
                  ))}
                </ul>
              </div>
            </div>

            {/* Mobile navigation disclosure panel */}
            <Disclosure.Panel className="md:hidden border-t border-solid border-gray-300 absolute bg-white w-full border-b border-b-suomifi-light">
              {({ close }) => (
                <ServiceNavigation aria-label="Mobile navigation">
                  {navigation.map(item => (
                    <ServiceNavigationItem
                      key={item.name}
                      selected={router.pathname === item.href}
                    >
                      <MobileLink href={item.href} onClick={() => close()}>
                        {item.name}
                      </MobileLink>
                    </ServiceNavigationItem>
                  ))}
                </ServiceNavigation>
              )}
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </header>
  );
}
