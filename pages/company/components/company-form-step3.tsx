import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { Button, TextInput } from 'suomifi-ui-components';
import CustomHeading from '@/components/ui/custom-heading';
import { useCompanyForm } from '../../../context/company-form-context';

interface FormProps {
  companyAddress: {
    fullAddress: string;
    thoroughfare: string;
    locatorDesignator: string;
    locatorName: string;
    addressArea: string;
    postCode: string;
    postName: string;
    poBox: string;
    adminUnitLevel1: string;
    adminUnitLevel2: string;
  };
}

export default function CompanyFormStep3() {
  const { values, setValues } = useCompanyForm();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormProps>({
    mode: 'onSubmit',
    defaultValues: values?.companyAddress && {
      companyAddress: values.companyAddress,
    },
  });

  const onSubmit: SubmitHandler<FormProps> = values => {
    console.log(values);
    setValues(values);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-4 items-start">
        <CustomHeading variant="h3">Company address</CustomHeading>
        <Controller
          name={`companyAddress.fullAddress`}
          control={control}
          defaultValue=""
          rules={{ required: 'Company address is required.' }}
          render={({ field, fieldState: { error } }) => (
            <TextInput
              labelText="Full address"
              hintText="Use full address, for ex. Tietotie 4 A 7, 00100 Helsinki, Finland"
              status={error && 'error'}
              statusText={error && error.message}
              {...field}
            />
          )}
        />
        <Controller
          name={`companyAddress.thoroughfare`}
          control={control}
          defaultValue=""
          render={({ field, fieldState: { error } }) => (
            <TextInput
              labelText="Thoroughfare"
              optionalText="optional"
              status={error && 'error'}
              statusText={error && error.message}
              {...field}
            />
          )}
        />
        <Controller
          name={`companyAddress.locatorDesignator`}
          control={control}
          defaultValue=""
          render={({ field, fieldState: { error } }) => (
            <TextInput
              labelText="Locator designator"
              optionalText="optional"
              status={error && 'error'}
              statusText={error && error.message}
              {...field}
            />
          )}
        />
        <Controller
          name={`companyAddress.locatorName`}
          control={control}
          defaultValue=""
          render={({ field, fieldState: { error } }) => (
            <TextInput
              labelText="Locator name"
              optionalText="optional"
              status={error && 'error'}
              statusText={error && error.message}
              {...field}
            />
          )}
        />
        <Controller
          name={`companyAddress.addressArea`}
          control={control}
          defaultValue=""
          render={({ field, fieldState: { error } }) => (
            <TextInput
              labelText="Address area"
              optionalText="optional"
              status={error && 'error'}
              statusText={error && error.message}
              {...field}
            />
          )}
        />
        <Controller
          name={`companyAddress.postCode`}
          control={control}
          defaultValue=""
          render={({ field, fieldState: { error } }) => (
            <TextInput
              labelText="Post code"
              optionalText="optional"
              status={error && 'error'}
              statusText={error && error.message}
              {...field}
            />
          )}
        />
        <Controller
          name={`companyAddress.postName`}
          control={control}
          defaultValue=""
          render={({ field, fieldState: { error } }) => (
            <TextInput
              labelText="Post name"
              optionalText="optional"
              status={error && 'error'}
              statusText={error && error.message}
              {...field}
            />
          )}
        />
        <Controller
          name={`companyAddress.poBox`}
          control={control}
          defaultValue=""
          render={({ field, fieldState: { error } }) => (
            <TextInput
              labelText="Post box"
              optionalText="optional"
              status={error && 'error'}
              statusText={error && error.message}
              {...field}
            />
          )}
        />
        <Controller
          name={`companyAddress.adminUnitLevel1`}
          control={control}
          defaultValue=""
          render={({ field, fieldState: { error } }) => (
            <TextInput
              labelText="Admin unit level 1"
              optionalText="optional"
              status={error && 'error'}
              statusText={error && error.message}
              {...field}
            />
          )}
        />
        <Controller
          name={`companyAddress.adminUnitLevel2`}
          control={control}
          defaultValue=""
          render={({ field, fieldState: { error } }) => (
            <TextInput
              labelText="Admin unit level 2"
              optionalText="optional"
              status={error && 'error'}
              statusText={error && error.message}
              {...field}
            />
          )}
        />
        <Button type="submit">Next</Button>
      </div>
    </form>
  );
}
