import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form';
import { Button } from 'suomifi-ui-components';
import { useCompanyContext } from '@/context/company-context';
import FormInput from '@/components/form/form-input';
import FormSingleSelect from '@/components/form/form-single-select';
import CustomHeading from '@/components/ui/custom-heading';

interface FormProps {
  managingDirectors: {
    role: 'director' | 'deputy director';
    givenName: string;
    middleNames: string;
    lastName: string;
    dateOfBirth: string;
    nationality: string;
  }[];
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

export default function CompanyFormStep5() {
  const { values, setValues } = useCompanyContext();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormProps>({
    mode: 'onSubmit',
    defaultValues: values?.managingDirectors
      ? { managingDirectors: values.managingDirectors }
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

  const { fields, append, remove } = useFieldArray<FormProps>({
    control,
    name: 'managingDirectors',
  });

  const onSubmit: SubmitHandler<FormProps> = values => {
    setValues(values, 'managingDirectors');
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

        <Button type="submit">Next</Button>
      </div>
    </form>
  );
}
