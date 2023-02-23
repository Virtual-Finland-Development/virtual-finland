import {
  Controller,
  SubmitHandler,
  useFieldArray,
  useForm,
} from 'react-hook-form';
import { format } from 'date-fns';
import {
  Button,
  DateInput,
  SingleSelect,
  TextInput,
} from 'suomifi-ui-components';
import CustomHeading from '@/components/ui/custom-heading';
import { useCompanyForm } from '../../../context/company-form-context';

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

export default function CompanyFormStep3() {
  const { values, setValues } = useCompanyForm();

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
    console.log(values);
    setValues(values);
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
              <Controller
                name={`managingDirectors.${index}.role`}
                control={control}
                rules={{ required: 'Role is required.' }}
                render={({ field: { onChange }, fieldState: { error } }) => (
                  <SingleSelect
                    labelText="Role"
                    noItemsText={undefined}
                    visualPlaceholder="Select role"
                    ariaOptionsAvailableText="Options available"
                    clearButtonLabel="clear"
                    itemAdditionHelpText=""
                    status={error && 'error'}
                    statusText={error && error.message}
                    items={ROLE_OPTIONS}
                    defaultSelectedItem={
                      field.role && {
                        labelText: field.role,
                        uniqueItemId: field.role,
                      }
                    }
                    onItemSelect={selected => {
                      onChange(selected);
                    }}
                  />
                )}
              />
              <Controller
                name={`managingDirectors.${index}.givenName`}
                control={control}
                rules={{ required: 'Given name is required.' }}
                render={({ field, fieldState: { error } }) => (
                  <TextInput
                    labelText="Given name"
                    status={error && 'error'}
                    statusText={error && error.message}
                    {...field}
                  />
                )}
              />
              <Controller
                name={`managingDirectors.${index}.middleNames`}
                control={control}
                rules={{ required: 'Middle names are required.' }}
                render={({ field, fieldState: { error } }) => (
                  <TextInput
                    labelText="Middle names"
                    status={error && 'error'}
                    statusText={error && error.message}
                    {...field}
                  />
                )}
              />
              <Controller
                name={`managingDirectors.${index}.lastName`}
                control={control}
                rules={{ required: 'Last name is required.' }}
                render={({ field, fieldState: { error } }) => (
                  <TextInput
                    labelText="Middle names"
                    status={error && 'error'}
                    statusText={error && error.message}
                    {...field}
                  />
                )}
              />
              <Controller
                name={`managingDirectors.${index}.dateOfBirth`}
                control={control}
                rules={{ required: 'Middle names are required.' }}
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <DateInput
                    labelText="Settlement date"
                    optionalText="optional"
                    datePickerEnabled
                    className="!w-suomifi-input-default"
                    status={error && 'error'}
                    statusText={error && error.message}
                    value={value ? format(new Date(value), 'dd.MM.yyyy') : ''}
                    onChange={({ date }) => {
                      onChange(format(date, 'yyyy-MM-dd'));
                    }}
                  />
                )}
              />
              <Controller
                name={`managingDirectors.${index}.nationality`}
                control={control}
                defaultValue=""
                render={({ field: { onChange }, fieldState: { error } }) => (
                  <SingleSelect
                    labelText="Nationality"
                    hintText="Filter by typing or select from dropdown"
                    noItemsText={undefined}
                    visualPlaceholder="Type to search"
                    ariaOptionsAvailableText="Options available"
                    clearButtonLabel="clear"
                    itemAdditionHelpText=""
                    status={error && 'error'}
                    statusText={error && error.message}
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
                    onItemSelect={selected => {
                      onChange(selected);
                    }}
                  />
                )}
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
