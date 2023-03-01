import { Block } from 'suomifi-ui-components';
import {
  CompanyContextProvider,
  useCompanyContext,
} from '@/context/company-context';
import CompanyRegistrant from '../components/company-form-1-registrant';
import CompanyDetails from '../components/company-form-2-details';
import CompanyAddress from '../components/company-form-3-address';
import CompanyShares from '../components/company-form-4-shares';
import CompanyDirectors from '../components/company-form-5-directors';
import CompanyMembers from '../components/company-form-6-members';
import CompanyAuditor from '../components/company-form-7-auditor';
import CompanyPagesWrapper from '../components/company-pages-wrapper';
import CompanyWizardNav from '../components/company-wizard-nav';
import 'twin.macro';

const companyWizardSteps = [
  <CompanyRegistrant key="registrant" />,
  <CompanyDetails key="details" />,
  <CompanyAddress key="address" />,
  <CompanyShares key="shares" />,
  <CompanyDirectors key="directors" />,
  <CompanyMembers key="members" />,
  <CompanyAuditor key="auditor" />,
];

export default function CompanyInfo() {
  const { companyStep } = useCompanyContext();

  if (companyStep) {
    window.scrollTo(0, 0);
  }

  return (
    <CompanyPagesWrapper>
      <div className="block lg:hidden pb-4 px-4 md:px-0">
        <div className="border">
          <CompanyWizardNav
            heading="Company information"
            wizardType="company"
          />
        </div>
      </div>

      <Block variant="section" className="bg-white md:border">
        <div className="flex flex-col md:flex-row">
          <div className="hidden lg:block border-r py-6 flex-shrink-0">
            <CompanyWizardNav
              heading="Company information"
              wizardType="company"
            />
          </div>
          <div className="px-4 py-6 w-full">
            {companyWizardSteps[companyStep]}
          </div>
        </div>
      </Block>
    </CompanyPagesWrapper>
  );
}

CompanyInfo.provider = CompanyContextProvider;
