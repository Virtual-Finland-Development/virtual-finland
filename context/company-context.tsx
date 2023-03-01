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
  companyStep: number;
  setCompanyStep: (stepNum: number) => void;
  beneficialOwnersStep: number;
  setBeneficialOwnersStep: (stepNum: number) => void;
  values: Partial<CompanyContextValues>;
  setValues: (values: Partial<CompanyContextValues>, currentStep: Step) => void;
  isStepDone: (step: Step) => boolean;
  isPrevStepDone: (currentStep: Step) => boolean;
  doneSteps: any;
  setCurrentStepDone: (step: Step, done: boolean) => void;
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
  const [companyStep, setCompanyStep] = useState(0);
  const [beneficialOwnersStep, setBeneficialOwnersStep] = useState(0);
  const [values, setValues] = useState<Partial<CompanyContextValues>>({});
  const [doneSteps, setStepDone] = useState({});
  const router = useRouter();

  const isStepDone = useCallback(
    (step: Step) => {
      return Boolean(lodash_get(doneSteps, step));
    },
    [doneSteps]
  );

  const isStepDoneAndHasValues = useCallback(
    (step: Step) => {
      return isStepDone(step) && Boolean(lodash_get(values, step));
    },
    [isStepDone, values]
  );

  const isPrevStepDone = useCallback(
    (currentStep: Step) => {
      switch (currentStep) {
        case 'company.registrant':
          return true;
        case 'company.companyDetails':
          return isStepDoneAndHasValues('company.registrant');
        case 'company.companyAddress':
          return isStepDoneAndHasValues('company.companyDetails');
        case 'company.shareSeries':
          return isStepDoneAndHasValues('company.companyAddress');
        case 'company.managingDirectors':
          return isStepDoneAndHasValues('company.shareSeries');
        case 'company.boardMembers':
          return isStepDoneAndHasValues('company.managingDirectors');
        case 'company.auditor':
          return isStepDoneAndHasValues('company.boardMembers');
        case 'beneficialOwners.shareSeries':
          return true;
        case 'beneficialOwners.shareholders':
          return isStepDoneAndHasValues('beneficialOwners.shareSeries');
        default:
          return false;
      }
    },
    [isStepDoneAndHasValues]
  );

  const setValuesAndNextStep = useCallback(
    (values: Partial<CompanyContextValues>, currentStep: Step) => {
      setValues(prev => lodash_merge(prev, values));

      const stepFunc = currentStep.includes('company.')
        ? setCompanyStep
        : setBeneficialOwnersStep;

      if (currentStep === 'company.auditor') {
        router.push('/company/establishment/beneficial-owners');
      } else if (currentStep === 'beneficialOwners.shareholders') {
        router.push('/company/establishment/signatory-rights');
      } else {
        stepFunc(prevStep => prevStep + 1);
      }
    },
    [router]
  );

  const setCurrentStepDone = useCallback((step: Step, done: boolean) => {
    setStepDone(prev => ({ ...prev, [step]: done }));
  }, []);

  return (
    <CompanyContext.Provider
      value={{
        steps,
        companyStep,
        setCompanyStep: stepNum => setCompanyStep(stepNum),
        beneficialOwnersStep,
        setBeneficialOwnersStep: stepNum => setBeneficialOwnersStep(stepNum),
        values,
        setValues: setValuesAndNextStep,
        isStepDone,
        isPrevStepDone,
        doneSteps,
        setCurrentStepDone,
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
