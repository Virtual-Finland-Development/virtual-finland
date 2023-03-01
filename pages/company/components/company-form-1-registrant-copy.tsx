import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import type { Registrant } from '@/types';
import { useCompanyContext } from '@/context/company-context';
import FormInput from '@/components/form/form-input';
import FormPhoneInput from '@/components/form/form-phone-input';
import CustomHeading from '@/components/ui/custom-heading';

interface FormProps {
  registrant: Registrant;
}

export default function CompanyRegistrant() {
  const { setCurrentStepDone } = useCompanyContext();
  const {
    control,
    formState: { isValid, errors, isSubmitted },
  } = useFormContext<FormProps>();

  useEffect(() => {
    const fieldsValid =
      (!isSubmitted && isValid) || (isSubmitted && !errors.registrant);
    setCurrentStepDone('company.registrant', Boolean(fieldsValid));
  }, [errors.registrant, isSubmitted, isValid, setCurrentStepDone]);

  return (
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
    </div>
  );
}
