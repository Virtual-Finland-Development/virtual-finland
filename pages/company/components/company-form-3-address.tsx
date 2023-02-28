import { SubmitHandler, useForm } from 'react-hook-form';
import { Button } from 'suomifi-ui-components';
import type { CompanyAddress } from '@/types';
import { useCompanyContext } from '@/context/company-context';
import FormInput from '@/components/form/form-input';
import CustomHeading from '@/components/ui/custom-heading';

interface FormProps {
  companyAddress: CompanyAddress;
}

export default function CompanyAddress() {
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
    defaultValues: company?.companyAddress && {
      companyAddress: company.companyAddress,
    },
  });

  const onSubmit: SubmitHandler<FormProps> = values => {
    setValues(
      { company: { companyAddress: values.companyAddress } },
      'company.companyAddress'
    );
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-4 items-start">
        <CustomHeading variant="h3">Company address</CustomHeading>
        <FormInput
          name={`companyAddress.fullAddress`}
          control={control}
          rules={{ required: 'Company address is required.' }}
          labelText="Full address"
        />
        <FormInput
          name={`companyAddress.thoroughfare`}
          control={control}
          labelText="Thoroughfare"
          optionalText="optional"
        />
        <FormInput
          name={`companyAddress.locatorDesignator`}
          control={control}
          labelText="Locator designator"
          optionalText="optional"
        />
        <FormInput
          name={`companyAddress.locatorName`}
          control={control}
          labelText="Locator name"
          optionalText="optional"
        />
        <FormInput
          name={`companyAddress.addressArea`}
          control={control}
          labelText="Address area"
          optionalText="optional"
        />
        <FormInput
          name={`companyAddress.postCode`}
          control={control}
          labelText="Post code"
          optionalText="optional"
        />
        <FormInput
          name={`companyAddress.postName`}
          control={control}
          labelText="Post name"
          optionalText="optional"
        />
        <FormInput
          name={`companyAddress.poBox`}
          control={control}
          labelText="Post box"
          optionalText="optional"
        />
        <FormInput
          name={`companyAddress.adminUnitLevel1`}
          control={control}
          labelText="Admin unit level 1"
          optionalText="optional"
        />
        <FormInput
          name={`companyAddress.adminUnitLevel2`}
          control={control}
          labelText="Admin unit level 2"
          optionalText="optional"
        />
        <Button type="submit">Next</Button>
      </div>
    </form>
  );
}
