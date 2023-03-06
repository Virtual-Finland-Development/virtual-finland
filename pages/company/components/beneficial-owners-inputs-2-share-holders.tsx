import { useEffect, useMemo } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import lodash_get from 'lodash.get';
import { Button } from 'suomifi-ui-components';
import type { Shareholder } from '@/types';
import { useCompanyContext } from '@/context/company-context';
import FormInput from '@/components/form/form-input';
import FormSingleSelect from '@/components/form/form-single-select';
import CustomHeading from '@/components/ui/custom-heading';

interface FieldProps {
  beneficialOwners: {
    shareholders: Shareholder[];
  };
}

const REQUIRED_FIELDS = ['name'];

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

export default function BeneficialOwnersShareholders() {
  const {
    values: { beneficialOwners },
    setIsCurrentStepDone,
  } = useCompanyContext();
  const { control, formState, getFieldState } = useFormContext<FieldProps>();
  const { invalid } = getFieldState('beneficialOwners.shareholders', formState);
  const { fields, append, remove } = useFieldArray<FieldProps>({
    control,
    name: 'beneficialOwners.shareholders',
  });

  const appendShareSeries = () => {
    append({
      name: '',
      ownerships: [
        {
          shareSeriesClass: 'A',
          quantity: 0,
        },
      ],
    });
  };

  const removeShareSeries = (index: number) => {
    remove(index);
  };

  const isStepDone = useMemo(() => {
    const hasContextValues = (() => {
      const shareSeriesArr = lodash_get(beneficialOwners, 'shareholders');

      if (Array.isArray(shareSeriesArr)) {
        return shareSeriesArr.every(i => {
          REQUIRED_FIELDS.every(field => i[field as keyof Shareholder]);
        });
      }

      return false;
    })();

    return hasContextValues ? !invalid : formState.isValid;
  }, [beneficialOwners, formState.isValid, invalid]);

  useEffect(() => {
    setIsCurrentStepDone('beneficialOwners.shareholders', isStepDone);
  }, [isStepDone, setIsCurrentStepDone]);

  return (
    <div className="flex flex-col gap-4 items-start">
      <CustomHeading variant="h3">Shareholders</CustomHeading>

      {fields.map((field, index) => (
        <div
          key={field.id}
          className="flex flex-col items-start gap-3 border-b border-b-gray-300 pb-4 w-full"
        >
          <div className="flex flex-col gap-4">
            <FormInput
              name={`beneficialOwners.shareholders.${index}.name`}
              control={control}
              rules={{ required: 'Shareholder name is required.' }}
              labelText={`${index + 1}. Shareholder name`}
            />
            <Ownerships index={index} />
          </div>
          {index > 0 && (
            <Button
              variant="link"
              iconRight="remove"
              onClick={() => removeShareSeries(index)}
            >
              Remove shareholder
            </Button>
          )}
        </div>
      ))}

      <Button
        variant="secondaryNoBorder"
        iconRight="plus"
        onClick={appendShareSeries}
      >
        Add sharelholder
      </Button>
    </div>
  );
}

function Ownerships({ index }: { index: number }) {
  const { control } = useFormContext<FieldProps>();

  const { fields, append, remove } = useFieldArray<FieldProps>({
    control,
    name: `beneficialOwners.shareholders.${index}.ownerships`,
  });

  const appendOwnership = () => {
    append({ shareSeriesClass: 'A', quantity: 0 });
  };

  const removeOwnership = (index: number) => {
    remove(index);
  };

  return (
    <div className="ml-2 md:ml-6 border border-gray-300 rounded-md p-4">
      {fields.map((field, i) => (
        <div
          key={field.id}
          className="grid grid-cols-1 md:grid-cols-3 gap-3 items-end justify-start border-b-gray-300 mb-6"
        >
          <FormSingleSelect
            name={`beneficialOwners.shareholders.${index}.ownerships.${i}.shareSeriesClass`}
            control={control}
            rules={{ required: true }}
            items={SHARE_SERIES_CLASS_OPTIONS}
            labelText="Share series class"
            showStatusText={false}
          />
          <FormInput
            type="number"
            name={`beneficialOwners.shareholders.${index}.ownerships.${i}.quantity`}
            control={control}
            rules={{ required: true, validate: value => value > -1 }}
            labelText="Quantity"
            showStatusText={false}
          />
          <div>
            <Button
              variant="link"
              iconRight="remove"
              onClick={() => removeOwnership(i)}
            >
              Remove
            </Button>
          </div>
        </div>
      ))}
      <div className="flex justify-start">
        <Button
          variant="secondaryNoBorder"
          iconRight="plus"
          tw="min-h-0 p-0"
          onClick={appendOwnership}
        >
          Add ownership
        </Button>
      </div>
    </div>
  );
}
