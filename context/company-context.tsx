import { useRouter } from 'next/router';
import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useState,
} from 'react';
import type { NonListedCompany } from '@/types';

type Step =
  | 'registrant'
  | 'companyDetails'
  | 'companyAddress'
  | 'shareSeries'
  | 'managingDirectors'
  | 'boardMembers';

const steps = [
  'registrant' as Step,
  'companyDetails' as Step,
  'companyAddress' as Step,
  'shareSeries' as Step,
  'managingDirectors' as Step,
  'boardMembers' as Step,
];

interface CompanyContextProps {
  steps: Step[];
  step: number;
  setStep: (stepNumber: number) => void;
  values: Partial<NonListedCompany>;
  setValues: (values: Partial<NonListedCompany>, currentStep: Step) => void;
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
  const [values, setValues] = useState<Partial<NonListedCompany>>({});
  const router = useRouter();

  const isStepDone = useCallback(
    (step: Step) => {
      return Boolean(values[step]);
    },
    [values]
  );

  const isPrevStepDone = useCallback(
    (currentStep: Step) => {
      switch (currentStep) {
        case 'registrant':
          return true;
        case 'companyDetails':
          return isStepDone('registrant');
        case 'companyAddress':
          return isStepDone('companyDetails');
        case 'shareSeries':
          return isStepDone('companyAddress');
        case 'managingDirectors':
          return isStepDone('shareSeries');
        case 'boardMembers':
          return isStepDone('managingDirectors');
        default:
          return false;
      }
    },
    [isStepDone]
  );

  const setValuesAndNextStep = useCallback(
    (values: Partial<NonListedCompany>, currentStep: Step) => {
      setValues(prev => ({ ...prev, ...values }));
      setStep(steps.indexOf(currentStep) + 1);
    },
    []
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
