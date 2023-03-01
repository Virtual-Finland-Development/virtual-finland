import { useEffect } from 'react';
import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form';
import { Button } from 'suomifi-ui-components';
import type { BoardMembers } from '@/types';
import { useCompanyContext } from '@/context/company-context';
import FormInput from '@/components/form/form-input';
import FormSingleSelect from '@/components/form/form-single-select';
import CustomHeading from '@/components/ui/custom-heading';
import FormActionButtons from './form-action-buttons';

interface FormProps {
  boardMembers: BoardMembers[];
}

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
    setValues,
    setCurrentStepDone,
  } = useCompanyContext();

  const {
    handleSubmit,
    control,
    formState: { errors, isValid },
  } = useForm<FormProps>({
    mode: 'onSubmit',
    defaultValues: company?.boardMembers
      ? { boardMembers: company.boardMembers }
      : {
          boardMembers: [
            {
              role: 'chairperson',
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
    setCurrentStepDone('company.boardMembers', isValid);
  }, [isValid, setCurrentStepDone]);

  const { fields, append, remove } = useFieldArray<FormProps>({
    control,
    name: 'boardMembers',
  });

  const onSubmit: SubmitHandler<FormProps> = values => {
    setValues(
      { company: { boardMembers: values.boardMembers } },
      'company.boardMembers'
    );
  };

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

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
          <FormActionButtons formType="company" saveDisabled={!isValid} />
        </div>
      </div>
    </form>
  );
}
