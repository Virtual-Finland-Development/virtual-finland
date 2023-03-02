import { useEffect, useMemo } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import lodash_get from 'lodash.get';
import { Button } from 'suomifi-ui-components';
import type { ShareSeries } from '@/types';
import { useCompanyContext } from '@/context/company-context';
import FormInput from '@/components/form/form-input';
import FormSingleSelect from '@/components/form/form-single-select';
import CustomHeading from '@/components/ui/custom-heading';

interface FieldProps {
  shareSeries: ShareSeries[];
}

const REQUIRED_FIELDS = ['shareSeriesClass', 'numberOfShares', 'shareValue'];

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

export default function CompanyShareSeries() {
  const {
    values: { company },
    setIsCurrentStepDone,
  } = useCompanyContext();
  const { control, formState, getFieldState } = useFormContext<FieldProps>();
  const { invalid, isDirty } = getFieldState('shareSeries', formState);
  const { fields, append, remove } = useFieldArray<FieldProps>({
    control,
    name: 'shareSeries',
  });

  const appendShareSeries = () => {
    append({ shareSeriesClass: 'A', numberOfShares: 0, shareValue: 0 });
  };

  const removeShareSeries = (index: number) => {
    remove(index);
  };

  const hasContextValues = useMemo(() => {
    const shareSeriesArr = lodash_get(company, 'shareSeries');

    if (Array.isArray(shareSeriesArr)) {
      return shareSeriesArr.every(i => {
        REQUIRED_FIELDS.every(field => i[field as keyof ShareSeries]);
      });
    }

    return false;
  }, [company]);

  useEffect(() => {
    setIsCurrentStepDone(
      'company.shareSeries',
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

      <Button
        variant="secondaryNoBorder"
        iconRight="plus"
        onClick={appendShareSeries}
      >
        Add new
      </Button>
    </div>
  );
}
