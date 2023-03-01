import { Block } from 'suomifi-ui-components';
import {
  CompanyContextProvider,
  useCompanyContext,
} from '@/context/company-context';
import BeneficialOwnersShareSeries from '../components/beneficial-owners-form-1-shares';
import BeneficialOwnersShareholders from '../components/beneficial-owners-form-2-share-holders';
import CompanyPagesWrapper from '../components/company-pages-wrapper';
import CompanyWizardNav from '../components/company-wizard-nav';

const beneficialOwnersSteps = [
  <BeneficialOwnersShareSeries key="share-series" />,
  <BeneficialOwnersShareholders key="shareholders" />,
];

export default function BeneficialOwners() {
  const { beneficialOwnersStep } = useCompanyContext();

  if (beneficialOwnersStep) {
    window.scrollTo(0, 0);
  }

  return (
    <CompanyPagesWrapper>
      <div className="block lg:hidden pb-4 px-4 md:px-0">
        <div className="border">
          <CompanyWizardNav
            heading="Beneficial owners"
            wizardType="beneficialOwners"
          />
        </div>
      </div>

      <Block variant="section" className="bg-white md:border">
        <div className="flex flex-col md:flex-row">
          <div className="hidden lg:block border-r py-6 flex-shrink-0">
            <CompanyWizardNav
              heading="Beneficial owners"
              wizardType="beneficialOwners"
            />
          </div>
          <div className="px-4 py-6 w-full">
            {beneficialOwnersSteps[beneficialOwnersStep]}
          </div>
        </div>
      </Block>
    </CompanyPagesWrapper>
  );
}

BeneficialOwners.provider = CompanyContextProvider;
