import { forwardRef } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { isValidPhoneNumber } from 'react-phone-number-input';
import { format } from 'date-fns';
import {
  Button,
  DateInput,
  SingleSelect,
  TextInput,
  TextInputProps,
} from 'suomifi-ui-components';
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
  companyDetails: {
    name: string;
    alternativeName: string;
    foundingDate: string;
    industrySector: string;
    shareCapital: number;
    settlementDeposit: number;
    settlementDate: number;
    countryOfResidence: string;
  };
}

export default function CompanyFormStep2() {
  const { values, setValues } = useCompanyForm();

  const {
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<FormProps>({
    mode: 'onSubmit',
    defaultValues: values?.companyDetails && {
      companyDetails: values.companyDetails,
    },
  });

  const onSubmit: SubmitHandler<FormProps> = values => {
    console.log(values);
    setValues(values);
  };

  const phoneFieldValidation = (value: any) => {
    if (!value) return true;
    const isValid = isValidPhoneNumber(value);
    return isValid || 'Invalid phone number form';
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-4 items-start">
        <CustomHeading variant="h3">Company details</CustomHeading>
        <Controller
          name={`companyDetails.name`}
          control={control}
          defaultValue=""
          rules={{ required: 'Company name is required.' }}
          render={({ field, fieldState: { error } }) => (
            <TextInput
              labelText="Company name"
              status={error && 'error'}
              statusText={error && error.message}
              {...field}
            />
          )}
        />
        <Controller
          name={`companyDetails.alternativeName`}
          control={control}
          defaultValue=""
          render={({ field, fieldState: { error } }) => (
            <TextInput
              labelText="Alternative name"
              optionalText="optional"
              status={error && 'error'}
              statusText={error && error.message}
              {...field}
            />
          )}
        />
        <Controller
          name={`companyDetails.foundingDate`}
          control={control}
          rules={{ required: 'Founding date is required.' }}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <DateInput
              labelText="Founding date"
              hintText="Select from date picker"
              datePickerEnabled
              className="!w-suomifi-input-default"
              status={error && 'error'}
              statusText={error && error.message}
              value={value ? format(new Date(value), 'dd.MM.yyyy') : ''}
              onChange={({ date, value }) => {
                if (date instanceof Date && !isNaN(date.getTime())) {
                  onChange(format(date, 'yyyy-MM-dd'));
                }
              }}
            />
          )}
        />
        <Controller
          name={`companyDetails.industrySector`}
          control={control}
          defaultValue=""
          rules={{ required: 'Company name is required.' }}
          render={({ field, fieldState: { error } }) => (
            <TextInput
              labelText="Industry sectors"
              status={error && 'error'}
              statusText={error && error.message}
              {...field}
            />
          )}
        />
        <Controller
          name={`companyDetails.shareCapital`}
          control={control}
          rules={{ required: 'Company name is required.' }}
          render={({ field, fieldState: { error } }) => (
            <TextInput
              type="number"
              labelText="Share capital (€)"
              status={error && 'error'}
              statusText={error && error.message}
              {...field}
            />
          )}
        />
        <Controller
          name={`companyDetails.settlementDeposit`}
          control={control}
          render={({ field, fieldState: { error } }) => (
            <TextInput
              type="number"
              labelText="Settlement deposit (€)"
              optionalText="optional"
              status={error && 'error'}
              statusText={error && error.message}
              {...field}
            />
          )}
        />
        <Controller
          name={`companyDetails.settlementDate`}
          control={control}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <DateInput
              labelText="Settlement date"
              hintText="Select from date picker"
              optionalText="optional"
              datePickerEnabled
              className="!w-suomifi-input-default"
              status={error && 'error'}
              statusText={error && error.message}
              value={value ? format(new Date(value), 'dd.MM.yyyy') : ''}
              onChange={({ date, value }) => {
                if (date instanceof Date && !isNaN(date.getTime())) {
                  onChange(format(date, 'yyyy-MM-dd'));
                }
              }}
            />
          )}
        />
        <Controller
          name={`companyDetails.countryOfResidence`}
          control={control}
          defaultValue=""
          render={({ field: { onChange }, fieldState: { error } }) => (
            <SingleSelect
              labelText="Country of residence"
              hintText="Filter by typing or select from dropdown"
              noItemsText={undefined}
              visualPlaceholder="Type to search"
              ariaOptionsAvailableText="Options available"
              clearButtonLabel="clear"
              itemAdditionHelpText=""
              status={error && 'error'}
              statusText={error && error.message}
              items={[
                {
                  labelText: 'Finland',
                  uniqueItemId: 'jh2435626',
                },
                {
                  labelText: 'Sweden',
                  uniqueItemId: 'h9823523',
                },
                {
                  labelText: 'Norway',
                  uniqueItemId: 'sh908293482',
                },
              ]}
              onItemSelect={selected => {
                onChange(selected);
              }}
            />
          )}
        />
        <Button type="submit">Next</Button>
      </div>
    </form>
  );
}
