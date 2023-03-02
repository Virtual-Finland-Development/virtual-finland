import { useEffect, useMemo } from 'react';
import { useFormContext } from 'react-hook-form';
import lodash_get from 'lodash.get';
import type { CompanyDetails } from '@/types';
import { useCompanyContext } from '@/context/company-context';
import FormInput from '@/components/form/form-input';
import FormSingleSelect from '@/components/form/form-single-select';
import CustomHeading from '@/components/ui/custom-heading';

interface FieldProps {
  companyDetails: CompanyDetails;
}

const REQUIRED_FIELDS = [
  'name',
  'foundingDate',
  'industrySector',
  'shareCapital',
];

export default function CompanyDetails() {
  const {
    values: { company },
    setIsCurrentStepDone,
  } = useCompanyContext();
  const { control, formState, getFieldState } = useFormContext<FieldProps>();
  const { invalid, isDirty } = getFieldState('companyDetails', formState);

  const hasContextValues = useMemo(() => {
    return REQUIRED_FIELDS.every(field =>
      lodash_get(company?.companyDetails, field)
    );
  }, [company]);

  useEffect(() => {
    setIsCurrentStepDone(
      'company.companyDetails',
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
      <CustomHeading variant="h3">Company details</CustomHeading>
      <FormInput
        name={`companyDetails.name`}
        control={control}
        rules={{ required: 'Company name is required.' }}
        labelText="Company name"
      />
      <FormInput
        name={`companyDetails.alternativeName`}
        control={control}
        labelText="Alternative name"
        optionalText="optional"
      />
      <FormInput
        type="date"
        name={`companyDetails.foundingDate`}
        control={control}
        rules={{ required: 'Founding date is required.' }}
        labelText="Founding date"
        hintText="Select from date picker"
      />
      <FormInput
        name={`companyDetails.industrySector`}
        control={control}
        rules={{ required: 'Industry sector is required.' }}
        labelText="Industry sector"
      />
      <FormInput
        type="number"
        name={`companyDetails.shareCapital`}
        control={control}
        rules={{ required: 'Share capital is required.' }}
        labelText="Share capital (€)"
      />
      <FormInput
        type="number"
        name={`companyDetails.settlementDeposit`}
        control={control}
        labelText="Settlement deposit (€)"
        optionalText="optional"
      />
      <FormInput
        type="date"
        name={`companyDetails.settlementDate`}
        control={control}
        labelText="Settlement date"
        hintText="Select from date picker"
        optionalText="optional"
      />
      <FormSingleSelect
        name={`companyDetails.countryOfResidence`}
        control={control}
        labelText="Country of residence"
        hintText="Filter by typing or select from dropdown"
        optionalText="optional"
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
      />
    </div>
  );
}
