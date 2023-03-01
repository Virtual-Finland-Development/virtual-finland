import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import type { Auditor } from '@/types';
import { useCompanyContext } from '@/context/company-context';
import FormInput from '@/components/form/form-input';
import CustomHeading from '@/components/ui/custom-heading';
import FormActionButtons from './form-action-buttons';

interface FormProps {
  auditor: Auditor;
}

export default function CompanyAuditor() {
  const {
    values: { company },
    setValues,
    setCurrentStepDone,
  } = useCompanyContext();

  const {
    handleSubmit,
    control,
    formState: { errors, isValid },
  } = useForm<FormProps>({
    mode: 'onSubmit',
    defaultValues: company?.auditor && {
      auditor: company.auditor,
    },
  });

  useEffect(() => {
    setCurrentStepDone('company.auditor', isValid);
  }, [isValid, setCurrentStepDone]);

  const onSubmit: SubmitHandler<FormProps> = values => {
    setValues({ company: { auditor: values.auditor } }, 'company.auditor');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
        <div className="flex flex-row gap-4 mt-6 w-full">
          <FormActionButtons formType="company" />
        </div>
      </div>
    </form>
  );
}
