import { useEffect, useMemo } from 'react';
import { useFormContext } from 'react-hook-form';
import lodash_get from 'lodash.get';
import type { Auditor } from '@/types';
import { useCompanyContext } from '@/context/company-context';
import FormInput from '@/components/form/form-input';
import CustomHeading from '@/components/ui/custom-heading';

interface FieldProps {
  company: {
    auditor: Auditor;
  };
}

const REQUIRED_FIELDS = ['companyName', 'nationalIdentifier'];

export default function CompanyAuditor() {
  const {
    values: { company },
    setIsCurrentStepDone,
  } = useCompanyContext();
  const { control, formState, getFieldState } = useFormContext<FieldProps>();
  const { invalid } = getFieldState('company.auditor', formState);

  const isStepDone = useMemo(() => {
    const hasContextValues = REQUIRED_FIELDS.every(field =>
      lodash_get(company?.auditor, field)
    );
    return hasContextValues ? !invalid : formState.isValid;
  }, [company?.auditor, formState.isValid, invalid]);

  useEffect(() => {
    setIsCurrentStepDone('company.auditor', isStepDone);
  }, [isStepDone, setIsCurrentStepDone]);

  return (
    <div className="flex flex-col gap-4 items-start">
      <div>
        <CustomHeading variant="h4">Stage 1.7</CustomHeading>
        <CustomHeading variant="h2">Auditor</CustomHeading>
      </div>
      <FormInput
        name={`company.auditor.companyName`}
        control={control}
        rules={{ required: 'Auditor company name is required.' }}
        labelText="Auditor company name"
      />
      <FormInput
        name={`company.auditor.nationalIdentifier`}
        control={control}
        rules={{ required: 'National identifier is required.' }}
        labelText="National identifier"
        hintText="The national identifier of the non-listed company issued by the trade register"
      />
    </div>
  );
}
