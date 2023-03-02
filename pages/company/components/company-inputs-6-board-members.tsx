import { useEffect, useMemo } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import lodash_get from 'lodash.get';
import { Button } from 'suomifi-ui-components';
import type { BoardMember } from '@/types';
import { useCompanyContext } from '@/context/company-context';
import FormInput from '@/components/form/form-input';
import FormSingleSelect from '@/components/form/form-single-select';
import CustomHeading from '@/components/ui/custom-heading';

interface FieldProps {
  boardMembers: BoardMember[];
}

const REQUIRED_FIELDS = [
  'role',
  'givenName',
  'middleNames',
  'lastName',
  'dateOfBirth',
  'nationality',
];

const ROLE_OPTIONS = [
  { labelText: 'Chair person', uniqueItemId: 'chairperson' },
  { labelText: 'Member', uniqueItemId: 'member' },
  { labelText: 'Debuty member', uniqueItemId: 'debuty member' },
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

export default function CompanyBoardMembers() {
  const {
    values: { company },
    setIsCurrentStepDone,
  } = useCompanyContext();
  const { control, formState, getFieldState } = useFormContext<FieldProps>();
  const { invalid, isDirty } = getFieldState('boardMembers', formState);
  const { fields, append, remove } = useFieldArray<FieldProps>({
    control,
    name: 'boardMembers',
  });

  const appendShareSeries = () => {
    append({
      role: 'chairperson',
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
    const membersArr = lodash_get(company, 'boardMembers');

    if (Array.isArray(membersArr)) {
      return membersArr.every(i => {
        REQUIRED_FIELDS.every(field => i[field as keyof BoardMember]);
      });
    }

    return false;
  }, [company]);

  useEffect(() => {
    setIsCurrentStepDone(
      'company.boardMembers',
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
      <CustomHeading variant="h3">Board members</CustomHeading>

      {fields.map((field, index) => (
        <div
          key={field.id}
          className="flex flex-col items-start gap-3 border-b border-b-gray-300 pb-6 w-full"
        >
          <div className="flex flex-col gap-4">
            <FormSingleSelect
              name={`boardMembers.${index}.role`}
              control={control}
              rules={{ required: 'Role is required.' }}
              items={ROLE_OPTIONS}
              labelText="Role"
            />
            <FormInput
              name={`boardMembers.${index}.givenName`}
              control={control}
              rules={{ required: 'Given name is required.' }}
              labelText="Given name"
            />
            <FormInput
              name={`boardMembers.${index}.lastName`}
              control={control}
              rules={{ required: 'Last name is required.' }}
              labelText="Last name"
            />
            <FormInput
              name={`boardMembers.${index}.middleNames`}
              control={control}
              rules={{ required: 'Given name is required.' }}
              labelText="Middle names"
            />
            <FormInput
              type="date"
              name={`boardMembers.${index}.dateOfBirth`}
              control={control}
              rules={{ required: 'Date of birth is required.' }}
              labelText="Date of birth"
              hintText="Select from date picker"
            />
            <FormSingleSelect
              name={`boardMembers.${index}.nationality`}
              control={control}
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