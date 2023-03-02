import { useEffect, useMemo } from 'react';
import { useFormContext } from 'react-hook-form';
import lodash_get from 'lodash.get';
import type { CompanyAddress } from '@/types';
import { useCompanyContext } from '@/context/company-context';
import FormInput from '@/components/form/form-input';
import CustomHeading from '@/components/ui/custom-heading';

interface FieldProps {
  companyAddress: CompanyAddress;
}

const REQUIRED_FIELDS = ['fullAddress'];

export default function CompanyAddress() {
  const {
    values: { company },
    setIsCurrentStepDone,
  } = useCompanyContext();
  const { control, formState, getFieldState } = useFormContext<FieldProps>();
  const { invalid, isDirty } = getFieldState('companyAddress', formState);

  const hasContextValues = useMemo(() => {
    return REQUIRED_FIELDS.every(field =>
      lodash_get(company?.companyAddress, field)
    );
  }, [company]);

  useEffect(() => {
    setIsCurrentStepDone(
      'company.companyAddress',
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
    </div>
  );
}
