import { useRouter } from 'next/router';
import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useState,
} from 'react';
import lodash_get from 'lodash.get';
import lodash_merge from 'lodash.merge';
import type {
  BenecifialOwners,
  NonListedCompany,
  SignatoryRights,
} from '@/types';

interface CompanyContextValues {
  company: Partial<NonListedCompany>;
  beneficialOwners: Partial<BenecifialOwners>;
  signatoryRights: SignatoryRights;
}

type Step =
  | 'company.registrant'
  | 'company.companyDetails'
  | 'company.companyAddress'
  | 'company.shareSeries'
  | 'company.managingDirectors'
  | 'company.boardMembers'
  | 'company.auditor'
  | 'beneficialOwners.shareSeries'
  | 'beneficialOwners.shareholders'
  | 'signatoryRights.signinRights';

const steps = [
  'company.registrant' as Step,
  'company.companyDetails' as Step,
  'company.companyAddress' as Step,
  'company.shareSeries' as Step,
  'company.managingDirectors' as Step,
  'company.boardMembers' as Step,
  'company.auditor' as Step,
  'beneficialOwners.shareSeries' as Step,
  'beneficialOwners.shareholders' as Step,
  'SignatoryRights.signinRights' as Step,
];

interface CompanyContextProps {
  steps: Step[];
  step: number;
  setStep: (stepNumber: number) => void;
  values: Partial<CompanyContextValues>;
  setValues: (values: Partial<CompanyContextValues>, currentStep: Step) => void;
  isStepDone: (step: Step) => boolean;
  isPrevStepDone: (currentStep: Step) => boolean;
}

interface CompanyProviderProps {
  children: ReactNode;
}

const CompanyContext = createContext<CompanyContextProps | undefined>(
  undefined
);
const CompanyContextConsumer = CompanyContext.Consumer;

function CompanyContextProvider(props: CompanyProviderProps) {
  const { children } = props;
  const [step, setStep] = useState(0);
  const [values, setValues] = useState<Partial<CompanyContextValues>>({});
  const router = useRouter();

  const isStepDone = useCallback(
    (step: Step) => {
      return Boolean(lodash_get(values, step));
    },
    [values]
  );

  const isPrevStepDone = useCallback(
    (currentStep: Step) => {
      switch (currentStep) {
        case 'company.registrant':
          return true;
        case 'company.companyDetails':
          return isStepDone('company.registrant');
        case 'company.companyAddress':
          return isStepDone('company.companyDetails');
        case 'company.shareSeries':
          return isStepDone('company.companyAddress');
        case 'company.managingDirectors':
          return isStepDone('company.shareSeries');
        case 'company.boardMembers':
          return isStepDone('company.managingDirectors');
        case 'company.auditor':
          return isStepDone('company.boardMembers');
        case 'beneficialOwners.shareSeries':
          return true;
        case 'beneficialOwners.shareholders':
          return isStepDone('beneficialOwners.shareSeries');
        default:
          return false;
      }
    },
    [isStepDone]
  );

  const setValuesAndNextStep = useCallback(
    (values: Partial<CompanyContextValues>, currentStep: Step) => {
      setValues(prev => lodash_merge(prev, values));

      if (currentStep === 'company.auditor') {
        router.push('/company/establishment/beneficial-owners');
        setStep(0);
      } else {
        // setStep(steps.indexOf(currentStep) + 1);
        setStep(prevStep => prevStep + 1);
      }
    },
    [router]
  );

  return (
    <CompanyContext.Provider
      value={{
        steps,
        step,
        setStep: step => setStep(step),
        values,
        setValues: setValuesAndNextStep,
        isStepDone,
        isPrevStepDone,
      }}
    >
      {children}
    </CompanyContext.Provider>
  );
}

function useCompanyContext() {
  const context = useContext(CompanyContext) as CompanyContextProps;

  if (!context) {
    throw new Error('useCompanyContext must be used within CompanyProvider.');
  }

  return context;
}

export type { Step };
export { CompanyContextProvider, CompanyContextConsumer, useCompanyContext };
