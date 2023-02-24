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

interface CompanyFormContextProps {
  step: number;
  setStep: (step: number) => void;
  values: Partial<NonListedCompany>;
  setValues: (values: Partial<NonListedCompany>, currentStep: Step) => void;
  isStepDone: (step: Step) => boolean;
  isPrevStepDone: (currentStep: Step) => boolean;
}

interface CompanyFormProviderProps {
  children: ReactNode;
}

const CompanyFormContext = createContext<CompanyFormContextProps | undefined>(
  undefined
);
const CompanyFormConsumer = CompanyFormContext.Consumer;

function nextRoute(currentStep: Step): string | undefined {
  let nextRoute: string | undefined;
  console.log(currentStep);
  switch (currentStep) {
    case 'registrant':
      nextRoute = 'company-details';
      break;
    case 'companyDetails':
      nextRoute = 'company-address';
      break;
    case 'companyAddress':
      nextRoute = 'share-series';
      break;
    case 'shareSeries':
      nextRoute = 'managing-directors';
      break;
    case 'managingDirectors':
      nextRoute = 'board-members';
      break;
    default:
      nextRoute = undefined;
  }
  console.log(nextRoute);
  return nextRoute;
}

function CompanyFormProvider(props: CompanyFormProviderProps) {
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
      const pathName = `/company/establishment/${nextRoute(currentStep)}`;
      // router.push(pathName);
    },
    [router]
  );

  return (
    <CompanyFormContext.Provider
      value={{
        step,
        setStep: step => setStep(step),
        values,
        setValues: setValuesAndNextStep,
        isStepDone,
        isPrevStepDone,
      }}
    >
      {children}
    </CompanyFormContext.Provider>
  );
}

function useCompanyForm() {
  const context = useContext(CompanyFormContext) as CompanyFormContextProps;

  if (!context) {
    throw new Error('useAuth must be used within AuthProvider.');
  }

  return context;
}

export type { Step };
export { CompanyFormProvider, CompanyFormConsumer, useCompanyForm };
