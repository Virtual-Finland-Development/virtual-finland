import { useEffect, useMemo } from 'react';
import { useFormContext } from 'react-hook-form';
import lodash_get from 'lodash.get';
import type { Auditor } from '@/types';
import { useCompanyContext } from '@/context/company-context';
import FormInput from '@/components/form/form-input';
import CustomHeading from '@/components/ui/custom-heading';

interface FieldProps {
  auditor: Auditor;
}

const REQUIRED_FIELDS = ['companyName', 'nationalIdentifier'];

export default function CompanyAuditor() {
  const {
    values: { company },
    setIsCurrentStepDone,
  } = useCompanyContext();
  const { control, formState, getFieldState } = useFormContext<FieldProps>();
  const { invalid, isDirty } = getFieldState('auditor', formState);

  const hasContextValues = useMemo(() => {
    return REQUIRED_FIELDS.every(field => lodash_get(company?.auditor, field));
  }, [company]);

  useEffect(() => {
    setIsCurrentStepDone(
      'company.auditor',
      hasContextValues ? !invalid && isDirty : formState.isValid
    );
  }, [
    formState.isValid,
    hasContextValues,
    invalid,
    isDirty,
    setIsCurrentStepDone,
  ]);

  return (
    <div className="flex flex-col gap-4 items-start">
      <CustomHeading variant="h3">Company auditor</CustomHeading>
      <FormInput
        name={`auditor.companyName`}
        control={control}
        rules={{ required: 'Auditor company name is required.' }}
        labelText="Auditor company name"
      />
      <FormInput
        name={`auditor.nationalIdentifier`}
        control={control}
        rules={{ required: 'National identifier is required.' }}
        labelText="National identifier"
        hintText="The national identifier of the non-listed company issued by the trade register"
      />
    </div>
  );
}
