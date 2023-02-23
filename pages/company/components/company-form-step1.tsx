import { forwardRef } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { isValidPhoneNumber } from 'react-phone-number-input';
import PhoneInput from 'react-phone-number-input/react-hook-form-input';
import { Button, TextInput, TextInputProps } from 'suomifi-ui-components';
import CustomHeading from '@/components/ui/custom-heading';
import { useCompanyForm } from '../../../context/company-form-context';

const PhoneInputComponent = forwardRef<
  HTMLInputElement,
  Pick<TextInputProps, 'labelText' | 'hintText' | 'status' | 'statusText'>
>((props, ref) => {
  return <TextInput ref={ref} {...props} autoComplete="off" />;
});

PhoneInputComponent.displayName = 'PhoneInputComponent';

interface FormProps {
  registrant: {
    givenName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
  };
}

export default function CompanyFormStep1() {
  const { values, setValues } = useCompanyForm();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormProps>({
    mode: 'onSubmit',
    defaultValues: values?.registrant && { registrant: values.registrant },
  });

  const onSubmit: SubmitHandler<FormProps> = values => {
    console.log(values);
    setValues(values);
  };

  const phoneFieldValidation = (value: any) => {
    if (!value) return true;
    const isValid = isValidPhoneNumber(value);
    return isValid || 'Invalid phone number form.';
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-4 items-start">
        <CustomHeading variant="h3">Registrant</CustomHeading>
        <Controller
          name={`registrant.givenName`}
          control={control}
          defaultValue=""
          rules={{ required: 'Given name is required.' }}
          render={({ field, fieldState: { error } }) => (
            <TextInput
              labelText="Given name"
              status={error && 'error'}
              statusText={error && error.message}
              {...field}
            />
          )}
        />
        <Controller
          name={`registrant.lastName`}
          control={control}
          defaultValue=""
          rules={{ required: 'Last name is required.' }}
          render={({ field, fieldState: { error } }) => (
            <TextInput
              labelText="Last name"
              status={error && 'error'}
              statusText={error && error.message}
              {...field}
            />
          )}
        />
        <Controller
          name={`registrant.email`}
          control={control}
          defaultValue=""
          rules={{ required: 'Email is required.' }}
          render={({ field, fieldState: { error } }) => (
            <TextInput
              type="email"
              labelText="Email"
              status={error && 'error'}
              statusText={error && error.message}
              {...field}
            />
          )}
        />
        <PhoneInput
          name={`registrant.phoneNumber`}
          control={control}
          rules={{
            required: 'Phone number is required.',
            validate: phoneFieldValidation,
          }}
          inputComponent={PhoneInputComponent}
          labelText="Phone number"
          hintText="Use international format (+358xxx)"
          status={errors?.registrant?.phoneNumber && 'error'}
          statusText={
            errors?.registrant?.phoneNumber &&
            errors.registrant.phoneNumber.message
          }
        />
        <Button type="submit">Next</Button>
      </div>
    </form>
  );
}
