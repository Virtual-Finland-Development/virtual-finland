import { useEffect, useMemo } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import lodash_get from 'lodash.get';
import { Button } from 'suomifi-ui-components';
import type { ManagingDirector } from '@/types';
import { useCompanyContext } from '@/context/company-context';
import FormInput from '@/components/form/form-input';
import FormSingleSelect from '@/components/form/form-single-select';
import CustomHeading from '@/components/ui/custom-heading';

interface FieldProps {
  managingDirectors: ManagingDirector[];
}

const REQUIRED_FIELDS = [
  'role',
  'givenName',
  'lastName',
  'middleNames',
  'dateOfBirth',
  'nationality',
];

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
    setIsCurrentStepDone,
  } = useCompanyContext();
  const { control, formState, getFieldState } = useFormContext<FieldProps>();
  const { invalid, isDirty } = getFieldState('managingDirectors', formState);
  const { fields, append, remove } = useFieldArray<FieldProps>({
    control,
    name: 'managingDirectors',
  });

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

  const hasContextValues = useMemo(() => {
    const directorsArr = lodash_get(company, 'managingDirectors');

    if (Array.isArray(directorsArr)) {
      return directorsArr.every(i => {
        REQUIRED_FIELDS.every(field => i[field as keyof ManagingDirector]);
      });
    }

    return false;
  }, [company]);

  useEffect(() => {
    setIsCurrentStepDone(
      'company.managingDirectors',
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
              rules={{ required: 'Nationality is required.' }}
              items={COUNTRY_OPTIONS}
              labelText="Nationality"
              hintText="Filter by typing or select from dropdown"
            />
          </div>
          {index > 0 && (
            <Button
              variant="link"
              iconRight="remove"
              onClick={() => removeShareSeries(index)}
            >
              Remove
            </Button>
          )}
        </div>
      ))}

      <Button variant="secondary" onClick={appendShareSeries}>
        Add new
      </Button>
    </div>
  );
}
