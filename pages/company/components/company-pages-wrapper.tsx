import { ReactNode } from 'react';
import AuthSentry from '@/components/auth-sentry';
import Page from '@/components/layout/page';
import CompanySideNav from './company-side-nav';

interface Props {
  children: ReactNode;
}

export default function CompanyPagesWrapper({ children }: Props) {
  return (
    <AuthSentry redirectPath="/company">
      <Page title="Company Establishment" withBorder={false}>
        <div className="block lg:hidden py-4 px-4 md:px-0 mt-0 md:-mt-8">
          <div className="border">
            <CompanySideNav />
          </div>
        </div>
        <div className="flex flex-row w-full">
          <div className="hidden lg:block bg-white flex-shrink-0 border-r mr-8 h-full border">
            <CompanySideNav />
          </div>
          <div className="flex flex-col w-full">{children}</div>
        </div>
      </Page>
    </AuthSentry>
  );
}
