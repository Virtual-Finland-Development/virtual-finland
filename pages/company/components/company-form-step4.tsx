import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form';
import { Button } from 'suomifi-ui-components';
import { useCompanyForm } from '@/context/company-form-context';
import FormInput from '@/components/form/form-input';
import FormSingleSelect from '@/components/form/form-single-select';
import CustomHeading from '@/components/ui/custom-heading';

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
    setValues(values, 'shareSeries');
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
              <FormSingleSelect
                name={`shareSeries.${index}.shareSeriesClass`}
                control={control}
                rules={{ required: 'Share value is required.' }}
                items={SHARE_SERIES_CLASS_OPTIONS}
                labelText="Share series class"
              />
              <FormInput
                type="number"
                name={`shareSeries.${index}.numberOfShares`}
                control={control}
                rules={{ required: 'Number of shares is required.' }}
                labelText="Number of shares"
              />
              <FormInput
                type="number"
                name={`shareSeries.${index}.shareValue`}
                control={control}
                rules={{ required: 'Share value is required.' }}
                labelText="Share value (€)"
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
