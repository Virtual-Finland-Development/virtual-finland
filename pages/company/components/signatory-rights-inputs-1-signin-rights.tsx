import { useFieldArray, useFormContext } from 'react-hook-form';
import { Button } from 'suomifi-ui-components';
import type { SigningRight } from '@/types';
import { useCompanyContext } from '@/context/company-context';
import FormInput from '@/components/form/form-input';
import FormSingleSelect from '@/components/form/form-single-select';
import CustomHeading from '@/components/ui/custom-heading';

interface FieldProps {
  signatoryRights: {
    signinRights: SigningRight[];
  };
}

const DEFAULT_RIGHT = {
  personalID: '',
  givenName: '',
  middleNames: '',
  lastName: '',
  dateOfBirth: '',
  nationality: '',
  fullAddress: '',
  thoroughfare: '',
  locatorDesignator: '',
  locatorName: '',
  addressArea: '',
  postCode: '',
  postName: '',
  poBox: '',
  adminUnitLevel1: '',
  adminUnitLevel2: '',
};

export default function SignatoryRightsSigninRights() {
  const {
    values: { company },
    setIsCurrentStepDone,
  } = useCompanyContext();
  const { control, formState, getFieldState } = useFormContext<FieldProps>();
  const { invalid } = getFieldState('signatoryRights.signinRights', formState);
  const { fields, append, remove } = useFieldArray<FieldProps>({
    control,
    name: 'signatoryRights.signinRights',
  });

  const appendShareSeries = () => {
    append(DEFAULT_RIGHT);
  };

  const removeShareSeries = (index: number) => {
    remove(index);
  };

  return (
    <div className="flex flex-col gap-4 items-start">
      <CustomHeading variant="h3">Signin rights</CustomHeading>

      {fields.map((field, index) => (
        <div
          key={field.id}
          className="flex flex-col items-start gap-3 border-b border-b-gray-300 pb-6 w-full"
        >
          <div className="grid sm:grid-cols-2 gap-6">
            {/* flex flex-col gap-4 */}
            <FormInput
              name={`signatoryRights.signinRights.${index}.personalID`}
              control={control}
              optionalText="optional"
              labelText="Personal ID"
            />
            <FormInput
              name={`signatoryRights.signinRights.${index}.givenName`}
              control={control}
              rules={{ required: 'Given name is required.' }}
              labelText="Given name"
            />
            <FormInput
              name={`signatoryRights.signinRights.${index}.middleNames`}
              control={control}
              rules={{ required: 'Middle names are required.' }}
              labelText="Middle names"
            />
            <FormInput
              name={`signatoryRights.signinRights.${index}.lastName`}
              control={control}
              rules={{ required: 'Last name is required.' }}
              labelText="Last name"
            />
            <FormInput
              type="date"
              name={`signatoryRights.signinRights.${index}.dateOfBirth`}
              control={control}
              rules={{ required: 'Given name is required.' }}
              labelText="Date of birth"
              hintText="Select from date picker"
            />
            <FormSingleSelect
              name={`signatoryRights.signinRights.${index}.nationality`}
              control={control}
              labelText="Nationality"
              hintText="Filter by typing or select from dropdown"
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
            />
            <FormInput
              name={`signatoryRights.signinRights.${index}.fullAddress`}
              control={control}
              rules={{ required: 'Address is required.' }}
              labelText="Full address"
            />
            <FormInput
              name={`signatoryRights.signinRights.${index}.thoroughfare`}
              control={control}
              optionalText="optional"
              labelText="Thoroughfare"
            />
            <FormInput
              name={`signatoryRights.signinRights.${index}.locatorName`}
              control={control}
              optionalText="optional"
              labelText="Locator name"
            />
            <FormInput
              name={`signatoryRights.signinRights.${index}.addressArea`}
              control={control}
              optionalText="optional"
              labelText="Address area"
            />
            <FormInput
              name={`signatoryRights.signinRights.${index}.postCode`}
              control={control}
              optionalText="optional"
              labelText="Post code"
            />
            <FormInput
              name={`signatoryRights.signinRights.${index}.postName`}
              control={control}
              optionalText="optional"
              labelText="Post name"
            />
            <FormInput
              name={`signatoryRights.signinRights.${index}.poBox`}
              control={control}
              optionalText="optional"
              labelText="Post box"
            />
            <FormInput
              name={`signatoryRights.signinRights.${index}.adminUnitLevel1`}
              control={control}
              optionalText="optional"
              labelText="Admin unit level 1"
            />
            <FormInput
              name={`signatoryRights.signinRights.${index}.adminUnitLevel2`}
              control={control}
              optionalText="optional"
              labelText="Admin unit level 2"
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
