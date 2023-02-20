import Link, { LinkProps } from 'next/link';
import { useRouter } from 'next/router';
import { ReactNode } from 'react';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import {
  Button,
  Icon,
  LanguageMenu,
  LanguageMenuItem,
  RouterLink,
  ServiceNavigation,
  ServiceNavigationItem,
  Text,
} from 'suomifi-ui-components';
import tw, { styled } from 'twin.macro';
import api from '@/lib/api';
import { useAuth } from '@/context/auth-context';
import CustomHeading from '../ui/custom-heading';

const navigation = [
  { name: 'Home', href: '/', current: true },
  { name: 'Profile', href: '/profile', current: false },
];

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ');
}

const MobileMenuToggleButton = styled(Button).attrs({
  variant: 'secondaryNoBorder',
})`
  ${tw`p-0`}
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

const NavItem = styled.li<{ $active: boolean }>(({ $active }) => [
  tw`border-b-4 py-2 px-4 mx-7 border-b-transparent hover:border-b-suomifi-light`,
  $active && tw`border-b-suomifi-light`,
  `a {
    font-weight: 700;
  }`,
]);

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
            <div className="mx-auto container px-4 lg:px-0">
              {/* max-w-7xl */}
              {/* sm:px-6 lg:px-8 */}
              <div className="relative flex h-14 items-center justify-between">
                <Link href="/">
                  <CustomHeading variant="h4" suomiFiBlue="light">
                    LIVING IN FINLAND
                  </CustomHeading>
                </Link>
                <div className="flex flex-row gap-6">
                  <LanguageMenu name="In English (EN)" tw="font-bold">
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
                  <div className="sm:hidden">
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
                </div>
              </div>
              {isAuthenticated && (
                <div className="sm:hidden flex flex-row items-center justify-between pb-1 -mt-1">
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
            <div className="hidden lg:block border-t border-t-gray-300">
              <div className="container">
                <ul className="hidden md:flex flex-wrap gap-4 -mx-7">
                  {navigation.map(item => (
                    <NavItem
                      key={item.name}
                      $active={router.pathname === item.href}
                    >
                      <Link href={item.href}>
                        <Text>{item.name}</Text>
                      </Link>
                    </NavItem>
                  ))}
                </ul>
              </div>
            </div>
            <Disclosure.Panel className="sm:hidden border-t border-solid border-gray-300 absolute bg-white w-full border-b border-b-suomifi-light">
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

  /* return (
    <header>
      <Disclosure
        as="nav"
        className="bg-white border-b border-solid border-gray-400"
      >
        {({ open }) => (
          <>
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 ">
              <div className="relative flex h-16 items-center justify-between">
                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                  <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                    <span className="sr-only">Open main menu</span>
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
                <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                  <div className="flex flex-shrink-0 items-center">
                    <Link href="/">
                      <Heading variant="h3">Living in Finland</Heading>
                    </Link>
                  </div>
                  <div className="hidden sm:ml-6 sm:block">
                    <div className="flex space-x-4">
                      {navigation.map(item => (
                        <a
                          key={item.name}
                          href={item.href}
                          className={classNames(
                            item.current
                              ? 'bg-gray-900 text-white'
                              : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                            'px-3 py-2 rounded-md text-sm font-medium'
                          )}
                          aria-current={item.current ? 'page' : undefined}
                        >
                          {item.name}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                  <button
                    type="button"
                    className="rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                  >
                    <span className="sr-only">View notifications</span>
                    <Icon icon="alert" className="h-6 w-6" aria-hidden="true" />
                  </button>

                  <Menu as="div" className="relative ml-3">
                    <div>
                      <Menu.Button className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                        <span className="sr-only">Open user menu</span>
                        <Image
                          className="h-8 w-8 rounded-full"
                          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                          alt=""
                          width={100}
                          height={100}
                        />
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <Menu.Item>
                          {({ active }) => (
                            <a
                              href="#"
                              className={classNames(
                                active ? 'bg-gray-100' : '',
                                'block px-4 py-2 text-sm text-gray-700'
                              )}
                            >
                              Your Profile
                            </a>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <a
                              href="#"
                              className={classNames(
                                active ? 'bg-gray-100' : '',
                                'block px-4 py-2 text-sm text-gray-700'
                              )}
                            >
                              Settings
                            </a>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <a
                              href="#"
                              className={classNames(
                                active ? 'bg-gray-100' : '',
                                'block px-4 py-2 text-sm text-gray-700'
                              )}
                            >
                              Sign out
                            </a>
                          )}
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
              </div>
            </div>

            <Disclosure.Panel className="sm:hidden">
              <div className="space-y-1 px-2 pt-2 pb-3">
                {navigation.map(item => (
                  <Disclosure.Button
                    key={item.name}
                    as="a"
                    href={item.href}
                    className={classNames(
                      item.current
                        ? 'bg-gray-900 text-white'
                        : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                      'block px-3 py-2 rounded-md text-base font-medium'
                    )}
                    aria-current={item.current ? 'page' : undefined}
                  >
                    {item.name}
                  </Disclosure.Button>
                ))}
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </header>
  ); */
}
