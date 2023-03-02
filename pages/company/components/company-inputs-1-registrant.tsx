import { useEffect, useMemo } from 'react';
import { useFormContext } from 'react-hook-form';
import lodash_get from 'lodash.get';
import type { Registrant } from '@/types';
import { useCompanyContext } from '@/context/company-context';
import FormInput from '@/components/form/form-input';
import FormPhoneInput from '@/components/form/form-phone-input';
import CustomHeading from '@/components/ui/custom-heading';

interface FieldProps {
  registrant: Registrant;
}

const REQUIRED_FIELDS = ['givenName', 'lastName', 'email', 'phoneNumber'];

export default function CompanyRegistrant() {
  const {
    values: { company },
    setIsCurrentStepDone,
  } = useCompanyContext();
  const { control, formState, getFieldState } = useFormContext<FieldProps>();
  const { invalid, isDirty } = getFieldState('registrant', formState);

  const hasContextValues = useMemo(() => {
    return REQUIRED_FIELDS.every(field =>
      lodash_get(company?.registrant, field)
    );
  }, [company]);

  useEffect(() => {
    setIsCurrentStepDone(
      'company.registrant',
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
        error={formState.errors?.registrant?.phoneNumber}
      />
    </div>
  );
}
