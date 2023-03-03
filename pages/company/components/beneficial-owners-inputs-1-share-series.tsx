import { useEffect, useMemo } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import lodash_get from 'lodash.get';
import { Button } from 'suomifi-ui-components';
import type { ShareSeries2 } from '@/types';
import { useCompanyContext } from '@/context/company-context';
import FormInput from '@/components/form/form-input';
import FormSingleSelect from '@/components/form/form-single-select';
import CustomHeading from '@/components/ui/custom-heading';

interface FieldProps {
  beneficialOwners: {
    shareSeries: ShareSeries2[];
  };
}

const REQUIRED_FIELDS = [
  'shareSeriesClass',
  'numberOfShares',
  'shareValue',
  'votesPerShare',
];

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
    setIsCurrentStepDone,
  } = useCompanyContext();
  const { control, formState, getFieldState } = useFormContext<FieldProps>();
  const { invalid } = getFieldState('beneficialOwners.shareSeries', formState);
  const { fields, append, remove } = useFieldArray<FieldProps>({
    control,
    name: 'beneficialOwners.shareSeries',
  });

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

  const isStepDone = useMemo(() => {
    const hasContextValues = (() => {
      const shareSeriesArr = lodash_get(beneficialOwners, 'shareSeries');

      if (Array.isArray(shareSeriesArr)) {
        return shareSeriesArr.every(i => {
          REQUIRED_FIELDS.every(field => i[field as keyof ShareSeries2]);
        });
      }

      return false;
    })();

    return hasContextValues ? !invalid : formState.isValid;
  }, [beneficialOwners, formState.isValid, invalid]);

  useEffect(() => {
    setIsCurrentStepDone('beneficialOwners.shareSeries', isStepDone);
  }, [isStepDone, setIsCurrentStepDone]);

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
              name={`beneficialOwners.shareSeries.${index}.shareSeriesClass`}
              control={control}
              rules={{ required: 'Share value is required.' }}
              items={SHARE_SERIES_CLASS_OPTIONS}
              labelText="Share series class"
            />
            <FormInput
              type="number"
              name={`beneficialOwners.shareSeries.${index}.numberOfShares`}
              control={control}
              rules={{ required: 'Number of shares is required.' }}
              labelText="Number of shares"
            />
            <FormInput
              type="number"
              name={`beneficialOwners.shareSeries.${index}.shareValue`}
              control={control}
              rules={{ required: 'Share value is required.' }}
              labelText="Share value (€)"
            />
            <FormInput
              type="number"
              name={`beneficialOwners.shareSeries.${index}.votesPerShare`}
              control={control}
              rules={{ required: 'Votes per share is required.' }}
              labelText="Votes per share"
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
