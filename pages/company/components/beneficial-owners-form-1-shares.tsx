import { useEffect } from 'react';
import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form';
import { Button } from 'suomifi-ui-components';
import type { ShareSeries2 } from '@/types';
import { useCompanyContext } from '@/context/company-context';
import FormInput from '@/components/form/form-input';
import FormSingleSelect from '@/components/form/form-single-select';
import CustomHeading from '@/components/ui/custom-heading';
import FormActionButtons from './form-action-buttons';

interface FormProps {
  shareSeries: ShareSeries2[];
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

export default function BeneficialOwnersShareSeries() {
  const {
    values: { beneficialOwners },
    setValues,
    setCurrentStepDone,
  } = useCompanyContext();

  const {
    handleSubmit,
    control,
    formState: { errors, isValid },
  } = useForm<FormProps>({
    mode: 'onSubmit',
    defaultValues: beneficialOwners?.shareSeries
      ? { shareSeries: beneficialOwners.shareSeries }
      : {
          shareSeries: [
            {
              shareSeriesClass: 'A',
              numberOfShares: 0,
              shareValue: 0,
              votesPerShare: 0,
            },
          ],
        },
  });

  useEffect(() => {
    setCurrentStepDone('beneficialOwners.shareSeries', isValid);
  }, [isValid, setCurrentStepDone]);

  const { fields, append, remove } = useFieldArray<FormProps>({
    control,
    name: 'shareSeries',
  });

  const onSubmit: SubmitHandler<FormProps> = values => {
    setValues(
      { beneficialOwners: { shareSeries: values.shareSeries } },
      'beneficialOwners.shareSeries'
    );
  };

  const appendShareSeries = () => {
    append({
      shareSeriesClass: 'A',
      numberOfShares: 0,
      shareValue: 0,
      votesPerShare: 0,
    });
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
              <FormInput
                type="number"
                name={`shareSeries.${index}.votesPerShare`}
                control={control}
                rules={{ required: 'Votes per share is required.' }}
                labelText="Votes per share"
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
          <FormActionButtons formType="beneficialOwners" />
        </div>
      </div>
    </form>
  );
}