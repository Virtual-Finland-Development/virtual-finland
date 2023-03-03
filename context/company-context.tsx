import { useRouter } from 'next/router';
import { useEffect } from 'react';
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

type StepType = 'company' | 'beneficialOwners' | 'signatoryRights';

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
  'signatoryRights.signinRights' as Step,
];

interface CompanyContextProps {
  steps: Step[];
  values: Partial<CompanyContextValues>;
  setValues: (values: Partial<CompanyContextValues>) => void;
  isStepDone: (step: Step) => boolean;
  isPrevStepDone: (currentStep: Step) => boolean;
  doneSteps: any;
  setIsCurrentStepDone: (step: Step, done: boolean) => void;
  step: number;
  setStep: (step: number) => void;
}

interface CompanyProviderProps {
  children: ReactNode;
}

const LAST_STEP_COMPANY = 7;
const LAST_STEP_BENEFICIAL_OWNERS = 3;

const CompanyContext = createContext<CompanyContextProps | undefined>(
  undefined
);
const CompanyContextConsumer = CompanyContext.Consumer;

function CompanyContextProvider(props: CompanyProviderProps) {
  const { children } = props;
  const [step, setStep] = useState(0);
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
      return isStepDone(step) /*  && Boolean(lodash_get(values, step)) */;
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
          return isStepDoneAndHasValues('company.auditor');
        case 'beneficialOwners.shareholders':
          return isStepDoneAndHasValues('beneficialOwners.shareSeries');
        case 'signatoryRights.signinRights':
          return isStepDoneAndHasValues('beneficialOwners.shareholders');
        default:
          return false;
      }
    },
    [isStepDoneAndHasValues]
  );

  const setValuesAndNextStep = useCallback(
    async (newValues: Partial<CompanyContextValues>) => {
      const mergedValues = lodash_merge(values, newValues);
      setValues(mergedValues);
      /**
       * TODO: on very last step data should be saved via productizers (review section?)
       * TODO: if editing existing data, each step should save data directly without changing the step
       */
    },
    [values]
  );

  const setIsCurrentStepDone = useCallback((step: Step, done: boolean) => {
    setStepDone(prev => ({ ...prev, [step]: done }));
  }, []);

  return (
    <CompanyContext.Provider
      value={{
        steps,
        values,
        setValues: setValuesAndNextStep,
        isStepDone,
        isPrevStepDone,
        doneSteps,
        setIsCurrentStepDone,
        step,
        setStep,
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
