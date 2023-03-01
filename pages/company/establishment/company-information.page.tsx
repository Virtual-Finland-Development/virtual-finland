import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { Block } from 'suomifi-ui-components';
import type { Registrant } from '@/types';
import type { Step } from '@/context/company-context';
import {
  CompanyContextProvider,
  useCompanyContext,
} from '@/context/company-context';
import CompanyRegistrant from '../components/company-form-1-registrant-copy';
import CompanyDetails from '../components/company-form-2-details-copy';
import CompanyAddress from '../components/company-form-3-address';
import CompanyShares from '../components/company-form-4-shares';
import CompanyDirectors from '../components/company-form-5-directors';
import CompanyMembers from '../components/company-form-6-members';
import CompanyAuditor from '../components/company-form-7-auditor';
import CompanyPagesWrapper from '../components/company-pages-wrapper';
import CompanyWizardNav from '../components/company-wizard-nav';
import FormActionButtons from '../components/form-action-buttons';
import 'twin.macro';

interface FormProps {
  registrant: Registrant;
}

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
  const {
    values: { company },
    setValues,
    companyStep,
  } = useCompanyContext();
  console.log(companyStep);
  if (companyStep) {
    window.scrollTo(0, 0);
  }

  const formMethods = useForm<FormProps>({
    mode: 'onSubmit',
    defaultValues: company?.registrant && { registrant: company.registrant },
  });

  const {
    formState: { dirtyFields },
  } = formMethods;
  console.log(dirtyFields);

  const onSubmit: SubmitHandler<FormProps> = values => {
    console.log('haloo1!!');
    console.log(values);
    setValues({ company: values }, 'company.registrant');
  };

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
            <FormProvider {...formMethods}>
              <form onSubmit={formMethods.handleSubmit(onSubmit)}>
                {companyWizardSteps[companyStep]}

                <div className="flex flex-row gap-4 mt-6 w-full">
                  <FormActionButtons formType="company" />
                </div>
              </form>
            </FormProvider>
          </div>
        </div>
      </Block>
    </CompanyPagesWrapper>
  );
}

CompanyInfo.provider = CompanyContextProvider;
