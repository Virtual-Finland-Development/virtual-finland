import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import type { Registrant } from '@/types';
import { useCompanyContext } from '@/context/company-context';
import FormInput from '@/components/form/form-input';
import FormPhoneInput from '@/components/form/form-phone-input';
import CustomHeading from '@/components/ui/custom-heading';
import FormActionButtons from './form-action-buttons';

interface FormProps {
  registrant: Registrant;
}

export default function CompanyRegistrant() {
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
    defaultValues: company?.registrant && { registrant: company.registrant },
  });

  useEffect(() => {
    setCurrentStepDone('company.registrant', isValid);
  }, [isValid, setCurrentStepDone]);

  const onSubmit: SubmitHandler<FormProps> = values => {
    setValues(
      { company: { registrant: values.registrant } },
      'company.registrant'
    );
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-4 items-start">
        <CustomHeading variant="h3">Registrant</CustomHeading>
        <FormInput
          name={`registrant.givenName`}
          labelText="Given name"
          control={control}
          rules={{ required: 'Given name is required.' }}
        />
        <FormInput
          name={`registrant.lastName`}
          labelText="Last name"
          control={control}
          rules={{ required: 'Last name is required.' }}
        />
        <FormInput
          type="email"
          name={`registrant.email`}
          labelText="Email"
          control={control}
          rules={{ required: 'Email is required.' }}
        />
        <FormPhoneInput
          name={`registrant.phoneNumber`}
          control={control}
          rules={{ required: 'Phone nuber is required.' }}
          labelText="Phone number"
          hintText="Use international format (+358xxx)"
          error={errors?.registrant?.phoneNumber}
        />
        <div className="flex flex-row gap-4 mt-6 w-full">
          <FormActionButtons formType="company" saveDisabled={!isValid} />
        </div>
      </div>
    </form>
  );
}
