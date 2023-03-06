import { useEffect, useMemo } from 'react';
import { useFormContext } from 'react-hook-form';
import lodash_get from 'lodash.get';
import type { CompanyDetails } from '@/types';
import { useCompanyContext } from '@/context/company-context';
import FormInput from '@/components/form/form-input';
import FormSingleSelect from '@/components/form/form-single-select';
import CustomHeading from '@/components/ui/custom-heading';

interface FieldProps {
  company: {
    companyDetails: CompanyDetails;
  };
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
  const { invalid } = getFieldState('company.companyDetails', formState);

  const isStepDone = useMemo(() => {
    const hasContextValues = REQUIRED_FIELDS.every(field =>
      lodash_get(company?.companyDetails, field)
    );
    return hasContextValues ? !invalid : formState.isValid;
  }, [company?.companyDetails, formState.isValid, invalid]);

  useEffect(() => {
    setIsCurrentStepDone('company.companyDetails', isStepDone);
  }, [isStepDone, setIsCurrentStepDone]);

  return (
    <div className="flex flex-col gap-4 items-start">
      <CustomHeading variant="h3">Company details</CustomHeading>
      <FormInput
        name={`company.companyDetails.name`}
        control={control}
        rules={{ required: 'Company name is required.' }}
        labelText="Company name"
      />
      <FormInput
        name={`company.companyDetails.alternativeName`}
        control={control}
        labelText="Alternative name"
        optionalText="optional"
      />
      <FormInput
        type="date"
        name={`company.companyDetails.foundingDate`}
        control={control}
        rules={{ required: 'Founding date is required.' }}
        labelText="Founding date"
        hintText="Select from date picker"
      />
      <FormInput
        name={`company.companyDetails.industrySector`}
        control={control}
        rules={{ required: 'Industry sector is required.' }}
        labelText="Industry sector"
      />
      <FormInput
        type="number"
        name={`company.companyDetails.shareCapital`}
        control={control}
        rules={{
          required: 'Share capital is required.',
          validate: value => value > -1,
        }}
        labelText="Share capital (€)"
      />
      <FormInput
        type="number"
        name={`company.companyDetails.settlementDeposit`}
        control={control}
        rules={{ validate: value => value > -1 }}
        labelText="Settlement deposit (€)"
        optionalText="optional"
      />
      <FormInput
        type="date"
        name={`company.companyDetails.settlementDate`}
        control={control}
        labelText="Settlement date"
        hintText="Select from date picker"
        optionalText="optional"
      />
      <FormSingleSelect
        name={`company.companyDetails.countryOfResidence`}
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
