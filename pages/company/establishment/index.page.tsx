import { useState } from 'react';
import { Block } from 'suomifi-ui-components';
import { Button } from 'suomifi-ui-components';
import {
  CompanyFormConsumer,
  CompanyFormProvider,
} from '@/context/company-form-context';
import Page from '@/components/layout/page';
import CompanyFormStep1 from '../components/company-form-step1';
import CompanyFormStep2 from '../components/company-form-step2';
import CompanyFormStep3 from '../components/company-form-step3';
import CompanyFormStep4 from '../components/company-form-step4';
import CompanyFormStep5 from '../components/company-form-step5';
import CompanyFormStep6 from '../components/company-form-step6';
import CompanyWizardNav from '../components/company-wizard-nav';

const companyFormSteps = [
  <CompanyFormStep1 key="step1" />,
  <CompanyFormStep2 key="step2" />,
  <CompanyFormStep3 key="step3" />,
  <CompanyFormStep4 key="step4" />,
  <CompanyFormStep5 key="step5" />,
  <CompanyFormStep6 key="step6" />,
];

export default function Establishment() {
  return (
    <CompanyFormProvider>
      <CompanyFormConsumer>
        {provider => {
          if (!provider) {
            return null;
          }

          const { step, setStep } = provider;

          return (
            <Page title="Company Establishment">
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
                  <div className="px-4 py-6 w-full">
                    <Button
                      variant="secondary"
                      onClick={() => setStep(step - 1)}
                    >
                      Back
                    </Button>
                    {companyFormSteps[step]}
                  </div>
                </div>
              </Block>
            </Page>
          );
        }}
      </CompanyFormConsumer>
    </CompanyFormProvider>
  );
}
