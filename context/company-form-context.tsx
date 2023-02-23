import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

interface CompanyFormContextProps {
  steps: { label: string; isDone: boolean }[];
  values: any;
  setValues: (values: any) => void;
}

interface CompanyFormProviderProps {
  children: ReactNode;
}

const CompanyFormContext = createContext<CompanyFormContextProps | undefined>(
  undefined
);
const CompanyFormConsumer = CompanyFormContext.Consumer;

function CompanyFormProvider(props: CompanyFormProviderProps) {
  const { children } = props;
  const [steps, setSteps] = useState([{ label: 'Step 1', isDone: false }]);
  const [values, setValues] = useState<any>({});

  return (
    <CompanyFormContext.Provider
      value={{
        steps,
        values,
        setValues: newValues =>
          setValues((prev: any) => ({ ...prev, ...newValues })),
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

export { CompanyFormProvider, CompanyFormConsumer, useCompanyForm };
