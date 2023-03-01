import { useEffect } from 'react';
import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form';
import { Button } from 'suomifi-ui-components';
import type { ManagingDirectors } from '@/types';
import { useCompanyContext } from '@/context/company-context';
import FormInput from '@/components/form/form-input';
import FormSingleSelect from '@/components/form/form-single-select';
import CustomHeading from '@/components/ui/custom-heading';
import FormActionButtons from './form-action-buttons';

interface FormProps {
  managingDirectors: ManagingDirectors[];
}

const ROLE_OPTIONS = [
  { labelText: 'Director', uniqueItemId: 'director' },
  { labelText: 'Debuty director', uniqueItemId: 'debuty director' },
];

const COUNTRY_OPTIONS = [
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
];

export default function CompanyManagingDirectors() {
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
    defaultValues: company?.managingDirectors
      ? { managingDirectors: company.managingDirectors }
      : {
          managingDirectors: [
            {
              role: 'director',
              givenName: '',
              middleNames: '',
              lastName: '',
              dateOfBirth: '',
              nationality: '',
            },
          ],
        },
  });

  useEffect(() => {
    setCurrentStepDone('company.managingDirectors', isValid);
  }, [isValid, setCurrentStepDone]);

  const { fields, append, remove } = useFieldArray<FormProps>({
    control,
    name: 'managingDirectors',
  });

  const onSubmit: SubmitHandler<FormProps> = values => {
    setValues(
      { company: { managingDirectors: values.managingDirectors } },
      'company.managingDirectors'
    );
  };

  const appendShareSeries = () => {
    append({
      role: 'director',
      givenName: '',
      middleNames: '',
      lastName: '',
      dateOfBirth: '',
      nationality: '',
    });
  };

  const removeShareSeries = (index: number) => {
    remove(index);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-4 items-start">
        <CustomHeading variant="h3">Managing directors</CustomHeading>

        {fields.map((field, index) => (
          <div
            key={field.id}
            className="flex flex-col items-start gap-3 border-b border-b-gray-300 pb-6 w-full"
          >
            <div className="flex flex-col gap-4">
              <FormSingleSelect
                name={`managingDirectors.${index}.role`}
                control={control}
                rules={{ required: 'Role is required.' }}
                items={ROLE_OPTIONS}
                labelText="Role"
              />
              <FormInput
                name={`managingDirectors.${index}.givenName`}
                control={control}
                rules={{ required: 'Given name is required.' }}
                labelText="Given name"
              />
              <FormInput
                name={`managingDirectors.${index}.lastName`}
                control={control}
                rules={{ required: 'Last name is required.' }}
                labelText="Last name"
              />
              <FormInput
                name={`managingDirectors.${index}.middleNames`}
                control={control}
                rules={{ required: 'Given name is required.' }}
                labelText="Middle names"
              />
              <FormInput
                type="date"
                name={`managingDirectors.${index}.dateOfBirth`}
                control={control}
                rules={{ required: 'Date of birth is required.' }}
                labelText="Date of birth"
                hintText="Select from date picker"
              />
              <FormSingleSelect
                name={`managingDirectors.${index}.nationality`}
                control={control}
                items={COUNTRY_OPTIONS}
                labelText="Nationality"
                hintText="Filter by typing or select from dropdown"
              />
            </div>
            <Button
              variant="link"
              iconRight="remove"
              onClick={() => removeShareSeries(index)}
            >
              Remove
            </Button>
          </div>
        ))}

        <Button variant="secondary" onClick={appendShareSeries}>
          Add new
        </Button>

        <div className="flex flex-row gap-4 mt-6 w-full">
          <FormActionButtons formType="company" />
        </div>
      </div>
    </form>
  );
}
