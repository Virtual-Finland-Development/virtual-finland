import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import lodash_get from 'lodash.get';
import lodash_merge from 'lodash.merge';
import type {
  BenecifialOwners,
  NonListedCompany,
  SignatoryRights,
} from '@/types';
import api from '@/lib/api';
import {
  useBeneficialOwners,
  useCompany,
  useSaveBeneficialOwners,
  useSaveCompany,
  useSignatoryRights,
} from '@/lib/hooks/companies';
import Loading from '@/components/ui/loading';

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

interface CompanyContextProps {
  values: Partial<CompanyContextValues>;
  setValues: (values: Partial<CompanyContextValues>) => void;
  isStepDone: (step: Step) => boolean;
  isPrevStepDone: (currentStep: Step) => boolean;
  doneSteps: any;
  setIsCurrentStepDone: (step: Step, done: boolean) => void;
  step: number;
  setStep: (step: number) => void;
  isLoading: boolean;
  businessId?: string;
}

interface CompanyProviderProps {
  businessId?: string;
  children: ReactNode;
}

const LAST_STEP = 11;

const CompanyContext = createContext<CompanyContextProps | undefined>(
  undefined
);
const CompanyContextConsumer = CompanyContext.Consumer;

function CompanyContextProvider(props: CompanyProviderProps) {
  const { businessId, children } = props;
  const [step, setStep] = useState(0);
  const [values, setValues] = useState<Partial<CompanyContextValues>>({});
  const [doneSteps, setStepDone] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  /**
   * [hooks] Fetch company related data, if businessId was provided.
   */
  const { data: companyData, isFetching: companyLoading } = useCompany(
    businessId || undefined
  );
  const { data: beneficialOwnersData, isFetching: beneficialOwnersLoading } =
    useBeneficialOwners(businessId || undefined);
  const { data: signatoryRightsData, isFetching: signatoryRightsLoading } =
    useSignatoryRights(businessId || undefined);

  /**
   * [hooks] Save company related data.
   */

  const companyDataLoading =
    companyLoading || beneficialOwnersLoading || signatoryRightsLoading;

  /**
   * Set fetched company related to state, if businessId was provided and if data exists.
   */
  useEffect(() => {
    if (businessId && !companyDataLoading) {
      setValues({
        ...(companyData && { company: companyData }),
        ...(beneficialOwnersData && { beneficialOwners: beneficialOwnersData }),
        ...(signatoryRightsData && { signatoryRights: signatoryRightsData }),
      });
    }
  }, [
    beneficialOwnersData,
    businessId,
    companyData,
    companyDataLoading,
    signatoryRightsData,
  ]);

  const isStepDone = useCallback(
    (step: Step) => {
      return Boolean(lodash_get(doneSteps, step) || businessId);
    },
    [businessId, doneSteps]
  );

  /* const isStepDoneAndHasValues = useCallback(
    (step: Step) => {
      return isStepDone(step)  && Boolean(lodash_get(values, step));
    },
    [isStepDone, values]
  ); */

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
          return isStepDone('company.auditor');
        case 'beneficialOwners.shareholders':
          return isStepDone('beneficialOwners.shareSeries');
        case 'signatoryRights.signinRights':
          return isStepDone('beneficialOwners.shareholders');
        default:
          return false;
      }
    },
    [isStepDone]
  );

  const setContextValues = useCallback(
    async (newValues: Partial<CompanyContextValues>) => {
      const mergedValues = lodash_merge(values, newValues);
      setValues(mergedValues);
      /**
       * TODO: on very last step data should be saved via productizers (review section?)
       * TODO: if editing existing data, each step should save data directly without changing the step
       */
      if (step + 1 === LAST_STEP) {
        const { company, beneficialOwners, signatoryRights } = mergedValues;
        setIsLoading(true);

        let payloadBusinessId: string = '';

        try {
          if (!businessId) {
            await api.company.saveCompany(company as Partial<NonListedCompany>);
            const companiesResponse = await api.company.getCompanies();
            payloadBusinessId = companiesResponse[0].businessId;
          } else {
            payloadBusinessId = businessId;
            await api.company.saveCompanyDirectlyToPRH(
              businessId,
              company as Partial<NonListedCompany>
            );
          }

          await api.company.saveBeneficialOwners(
            payloadBusinessId,
            beneficialOwners as Partial<BenecifialOwners>
          );
          await api.company.saveSignatoryRights(
            payloadBusinessId,
            signatoryRights as Partial<SignatoryRights>
          );
        } catch (error) {
          console.log(error);
        } finally {
          setIsLoading(false);
        }
      }
    },
    [businessId, step, values]
  );

  const setIsCurrentStepDone = useCallback((step: Step, done: boolean) => {
    setStepDone(prev => ({ ...prev, [step]: done }));
  }, []);

  if (companyDataLoading) {
    return <Loading />;
  }

  return (
    <CompanyContext.Provider
      value={{
        values,
        setValues: setContextValues,
        isStepDone,
        isPrevStepDone,
        doneSteps,
        setIsCurrentStepDone,
        step,
        setStep,
        isLoading: isLoading,
        businessId,
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
export {
  CompanyContextProvider,
  CompanyContextConsumer,
  useCompanyContext,
  LAST_STEP,
};
