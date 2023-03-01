import { useEffect } from 'react';
import { SubmitHandler, useForm, useFormContext } from 'react-hook-form';
import type { CompanyDetails } from '@/types';
import { useCompanyContext } from '@/context/company-context';
import FormInput from '@/components/form/form-input';
import FormSingleSelect from '@/components/form/form-single-select';
import CustomHeading from '@/components/ui/custom-heading';
import FormActionButtons from './form-action-buttons';

interface FormProps {
  companyDetails: CompanyDetails;
}

export default function CompanyDetails() {
  const { setCurrentStepDone } = useCompanyContext();
  const {
    control,
    formState: { isValid, errors, isSubmitted },
  } = useFormContext<FormProps>();

  useEffect(() => {
    const fieldsValid =
      (!isSubmitted && isValid) || (isSubmitted && !errors.companyDetails);
    setCurrentStepDone('company.companyDetails', Boolean(fieldsValid));
  }, [errors.companyDetails, isSubmitted, isValid, setCurrentStepDone]);

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
        rules={{ required: 'Company name is required.' }}
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
