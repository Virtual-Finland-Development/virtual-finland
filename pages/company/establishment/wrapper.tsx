import { ReactNode } from 'react';
import { Block } from 'suomifi-ui-components';
import Page from '@/components/layout/page';
import CompanyWizardNav from '../components/company-wizard-nav';

interface Props {
  children: ReactNode;
}

export default function Wrapper(props: Props) {
  const { children } = props;

  return (
    <Page title="Establish a company">
      <div className="block md:hidden px-4 py-6">
        <div className="border">
          <CompanyWizardNav />
        </div>
      </div>

      <Block variant="section" className="bg-white">
        <div className="flex flex-col md:flex-row">
          <div className="hidden md:block border-r px-4 py-6 flex-shrink-0">
            <CompanyWizardNav />
          </div>
          <div className="px-4 py-6 w-full">{children}</div>
        </div>
      </Block>
    </Page>
  );
}
