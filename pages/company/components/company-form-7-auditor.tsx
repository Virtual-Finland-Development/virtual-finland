import { SubmitHandler, useForm } from 'react-hook-form';
import { Button } from 'suomifi-ui-components';
import type { Auditor } from '@/types';
import { useCompanyContext } from '@/context/company-context';
import FormInput from '@/components/form/form-input';
import CustomHeading from '@/components/ui/custom-heading';

interface FormProps {
  auditor: Auditor;
}

export default function CompanyAuditor() {
  const {
    values: { company },
    setValues,
  } = useCompanyContext();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormProps>({
    mode: 'onSubmit',
    defaultValues: company?.auditor && {
      auditor: company.auditor,
    },
  });

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
          labelText="National identifier"
          hintText="The national identifier of the non-listed company issued by the trade register"
        />
        <Button type="submit">Next</Button>
      </div>
    </form>
  );
}
