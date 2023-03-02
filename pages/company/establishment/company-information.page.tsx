import { useCallback } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { Block } from 'suomifi-ui-components';
import type { NonListedCompany } from '@/types';
import {
  CompanyContextProvider,
  useCompanyContext,
} from '@/context/company-context';
import CompanyRegistrant from '../components/company-inputs-1-registrant';
import CompanyDetails from '../components/company-inputs-2-details';
import CompanyAddress from '../components/company-inputs-3-address';
import CompanyShares from '../components/company-inputs-4-share-series';
import CompanyDirectors from '../components/company-inputs-5-managing-directors';
import CompanyMembers from '../components/company-inputs-6-board-members';
import CompanyAuditor from '../components/company-inputs-7-auditor';
import CompanyPagesWrapper from '../components/company-pages-wrapper';
import CompanyWizardNav from '../components/company-wizard-nav';
import FormActionButtons from '../components/form-action-buttons';

const companyWizardSteps = [
  <CompanyRegistrant key="registrant" />,
  <CompanyDetails key="details" />,
  <CompanyAddress key="address" />,
  <CompanyShares key="shares" />,
  <CompanyDirectors key="directors" />,
  <CompanyMembers key="members" />,
  <CompanyAuditor key="auditor" />,
];

const DEFAULT_VALUES = {
  shareSeries: [
    {
      shareSeriesClass: 'A' as const,
    },
  ],
  managingDirectors: [
    {
      role: 'director' as const,
    },
  ],
  boardMembers: [
    {
      role: 'chairperson' as const,
    },
  ],
};

function nullifyUndefinedValues<T extends object>(obj: T) {
  for (const [key, value] of Object.entries(obj)) {
    if (!!value && typeof value === 'object') {
      nullifyUndefinedValues(value);
    } else if (value === undefined) {
      obj[key as keyof T] = null as any;
    }
  }
  return obj;
}

export default function CompanyInfo() {
  const {
    values: { company },
    setValues,
    companyStep,
  } = useCompanyContext();

  /**
   * Form methods, passed to form provider (react-hook-form).
   * Each section of wizard can connect to form context by using 'useFormContext' hook.
   */
  const formMethods = useForm<NonListedCompany>({
    mode: 'onSubmit',
    defaultValues: {
      shareSeries: DEFAULT_VALUES.shareSeries,
      managingDirectors: DEFAULT_VALUES.managingDirectors,
      boardMembers: DEFAULT_VALUES.boardMembers,
      ...company,
    },
  });

  /**
   * Handle form submission, save values to context.
   */
  const onSubmit: SubmitHandler<NonListedCompany> = useCallback(
    values => {
      const companyValues =
        nullifyUndefinedValues<Partial<NonListedCompany>>(values);
      console.log(companyValues);
      setValues({ company: companyValues }, 'company');
      window.scrollTo(0, 0);
    },
    [setValues]
  );

  /**
   * On every wizard nav 'next page' change, execute form submit handler first.
   * This way each page data gets saved to context / inputs gets validated.
   */
  const onWizarNavChange = useCallback(
    async (changeFunc: () => void, clickedStep: number) => {
      if (clickedStep < companyStep) {
        changeFunc();
      } else {
        await formMethods.handleSubmit(values => {
          onSubmit(values);
          changeFunc();
        })();
      }
    },
    [companyStep, formMethods, onSubmit]
  );

  return (
    <CompanyPagesWrapper>
      <FormProvider {...formMethods}>
        <div className="block lg:hidden pb-4 px-4 md:px-0">
          <div className="border">
            <CompanyWizardNav
              heading="Company information"
              wizardType="company"
              onWizardNavChange={onWizarNavChange}
            />
          </div>
        </div>

        <Block variant="section" className="bg-white md:border">
          <div className="flex flex-col md:flex-row">
            <div className="hidden lg:block border-r py-6 flex-shrink-0">
              <CompanyWizardNav
                heading="Company information"
                wizardType="company"
                onWizardNavChange={onWizarNavChange}
              />
            </div>
            <div className="px-4 py-6 w-full">
              <form onSubmit={formMethods.handleSubmit(onSubmit)}>
                {companyWizardSteps[companyStep]}

                <div className="flex flex-row justify-end gap-4 mt-14 w-full">
                  <FormActionButtons formType="company" key={companyStep} />
                </div>
              </form>
            </div>
          </div>
        </Block>
      </FormProvider>
    </CompanyPagesWrapper>
  );
}

CompanyInfo.provider = CompanyContextProvider;
