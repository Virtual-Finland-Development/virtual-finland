import Link, { LinkProps } from 'next/link';
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
} from 'suomifi-ui-components';
import tw, { styled } from 'twin.macro';
import CustomHeading from '../ui/custom-heading';

const navigation = [
  { name: 'Home', href: '#', current: true },
  { name: 'Page 1', href: '#', current: false },
  { name: 'Page 2', href: '#', current: false },
];

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ');
}

const MobileMenuToggleButton = styled(Button).attrs({
  variant: 'secondaryNoBorder',
})``;

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

export default function MainNavigation() {
  return (
    <header>
      <Disclosure
        as="nav"
        className="bg-white border-b border-t-4 border-solid border-t-suomifi-dark border-b-suomifi-light"
      >
        {({ open }) => (
          <>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="relative flex h-14 items-center justify-between">
                <Link href="/">
                  <CustomHeading variant="h4" suomiFiBlue="light">
                    LIVING IN FINLAND
                  </CustomHeading>
                </Link>
                <ul className="hidden md:flex gap-4">
                  {navigation.map(item => (
                    <li key={item.name}>
                      <Link href={item.href}>{item.name}</Link>
                    </li>
                  ))}
                </ul>
                <div className="hidden md:block">
                  <Button className="hidden" icon="login">
                    Log in
                  </Button>
                </div>
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
            <Disclosure.Panel className="sm:hidden border-t border-solid border-gray-300 absolute bg-white w-full border-b border-b-suomifi-light">
              <ServiceNavigation aria-label="Mobile navigation">
                {navigation.map(item => (
                  <ServiceNavigationItem
                    key={item.name}
                    selected={item.name === 'Home'}
                  >
                    <MobileLink href={item.href}>{item.name}</MobileLink>
                  </ServiceNavigationItem>
                ))}
              </ServiceNavigation>
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
