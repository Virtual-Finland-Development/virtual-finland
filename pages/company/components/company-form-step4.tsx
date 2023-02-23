import {
  Controller,
  SubmitHandler,
  useFieldArray,
  useForm,
} from 'react-hook-form';
import { Button, SingleSelect, TextInput } from 'suomifi-ui-components';
import CustomHeading from '@/components/ui/custom-heading';
import { useCompanyForm } from '../../../context/company-form-context';

interface FormProps {
  shareSeries: {
    shareSeriesClass: 'A' | 'B' | 'C' | 'D' | 'E';
    numberOfShares: number;
    shareValue: number;
  }[];
}

const SHARE_SERIES_CLASS_OPTIONS = [
  {
    labelText: 'A',
    uniqueItemId: 'A',
  },
  {
    labelText: 'B',
    uniqueItemId: 'B',
  },
  {
    labelText: 'C',
    uniqueItemId: 'C',
  },
  {
    labelText: 'D',
    uniqueItemId: 'D',
  },
  {
    labelText: 'E',
    uniqueItemId: 'E',
  },
];

export default function CompanyFormStep3() {
  const { values, setValues } = useCompanyForm();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormProps>({
    mode: 'onSubmit',
    defaultValues: values?.shareSeries
      ? { shareSeries: values.shareSeries }
      : {
          shareSeries: [
            {
              shareSeriesClass: 'A',
              numberOfShares: 0,
              shareValue: 0,
            },
          ],
        },
  });

  const { fields, append, remove } = useFieldArray<FormProps>({
    control,
    name: 'shareSeries',
  });

  const onSubmit: SubmitHandler<FormProps> = values => {
    console.log(values);
    setValues(values);
  };

  const appendShareSeries = () => {
    append({ shareSeriesClass: 'A', numberOfShares: 0, shareValue: 0 });
  };

  const removeShareSeries = (index: number) => {
    remove(index);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-4 items-start">
        <CustomHeading variant="h3">Share series</CustomHeading>

        {fields.map((field, index) => (
          <div
            key={field.id}
            className="flex flex-col items-start gap-3 border-b border-b-gray-300 pb-6 w-full"
          >
            <div className="flex flex-col gap-4">
              <Controller
                name={`shareSeries.${index}.shareSeriesClass`}
                control={control}
                rules={{ required: 'Share value is required.' }}
                render={({ field: { onChange }, fieldState: { error } }) => (
                  <SingleSelect
                    labelText="Share series class"
                    noItemsText={undefined}
                    visualPlaceholder="Select class"
                    ariaOptionsAvailableText="Options available"
                    clearButtonLabel="clear"
                    itemAdditionHelpText=""
                    status={error && 'error'}
                    statusText={error && error.message}
                    items={SHARE_SERIES_CLASS_OPTIONS}
                    defaultSelectedItem={
                      field.shareSeriesClass && {
                        labelText: field.shareSeriesClass,
                        uniqueItemId: field.shareSeriesClass,
                      }
                    }
                    onItemSelect={selected => {
                      onChange(selected);
                    }}
                  />
                )}
              />
              <Controller
                name={`shareSeries.${index}.numberOfShares`}
                control={control}
                rules={{ required: 'Number of shares is required.' }}
                render={({ field, fieldState: { error } }) => (
                  <TextInput
                    type="number"
                    labelText="Number of shares"
                    status={error && 'error'}
                    statusText={error && error.message}
                    {...field}
                  />
                )}
              />
              <Controller
                name={`shareSeries.${index}.shareValue`}
                control={control}
                rules={{ required: 'Share value is required.' }}
                render={({ field, fieldState: { error } }) => (
                  <TextInput
                    type="number"
                    labelText="Share value (€)"
                    status={error && 'error'}
                    statusText={error && error.message}
                    {...field}
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
