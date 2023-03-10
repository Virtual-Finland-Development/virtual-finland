import { useEffect, useMemo } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import lodash_get from 'lodash.get';
import { Button } from 'suomifi-ui-components';
import type { SigningRight } from '@/types';
import { pickRandomDateString, pickRandomName } from '@/lib/utils';
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
  role: 'director' as const,
  personalID: '',
  givenName: pickRandomName('firstName'),
  middleNames: pickRandomName('firstName'),
  lastName: pickRandomName('lastName'),
  dateOfBirth: pickRandomDateString(),
  nationality: 'FIN',
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

const REQUIRED_FIELDS = [
  'givenName',
  'middleNames',
  'lastName',
  'dateOfBirth',
  'nationality',
];

const ROLE_OPTIONS = [
  { labelText: 'Director', uniqueItemId: 'director' },
  { labelText: 'Debuty director', uniqueItemId: 'debuty director' },
  { labelText: 'Board member', uniqueItemId: 'board member' },
  { labelText: 'Debuty board member', uniqueItemId: 'deputy board member' },
  { labelText: 'Other', uniqueItemId: 'other' },
];

export default function SignatoryRightsSigninRights() {
  const {
    values: { signatoryRights },
    setIsCurrentStepDone,
    codesets: { countries },
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

  const isStepDone = useMemo(() => {
    const hasContextValues = (() => {
      const signatoryRightsArr = lodash_get(signatoryRights, 'signinRights');

      if (Array.isArray(signatoryRightsArr)) {
        return signatoryRightsArr.every(i => {
          REQUIRED_FIELDS.every(field => i[field as keyof SigningRight]);
        });
      }

      return false;
    })();

    return hasContextValues ? !invalid : formState.isValid;
  }, [signatoryRights, formState.isValid, invalid]);

  useEffect(() => {
    setIsCurrentStepDone('signatoryRights.signinRights', isStepDone);
  }, [isStepDone, setIsCurrentStepDone]);

  return (
    <div className="flex flex-col gap-4 items-start">
      <div>
        <CustomHeading variant="h4">Stage 3.1</CustomHeading>
        <CustomHeading variant="h2">
          Signatory rights - Signin rights
        </CustomHeading>
      </div>

      {fields.map((field, index) => (
        <div
          key={field.id}
          className="flex flex-col items-start gap-3 border-b border-b-gray-300 pb-6 w-full"
        >
          <div className="grid sm:grid-cols-2 gap-6">
            <FormSingleSelect
              name={`signatoryRights.signinRights.${index}.role`}
              control={control}
              rules={{ required: 'Role is required.' }}
              labelText="Nationality"
              hintText="Filter by typing or select from dropdown"
              items={ROLE_OPTIONS}
            />
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
              rules={{ required: 'Nationality is required.' }}
              labelText="Nationality"
              hintText="Filter by typing or select from dropdown"
              items={
                countries
                  ? countries.map(c => ({
                      labelText: c.englishName,
                      uniqueItemId: c.threeLetterISORegionName,
                    }))
                  : []
              }
            />
            <FormInput
              name={`signatoryRights.signinRights.${index}.fullAddress`}
              control={control}
              labelText="Full address"
              optionalText="optional"
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
