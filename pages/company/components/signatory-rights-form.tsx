import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form';
import { Button } from 'suomifi-ui-components';
import type { SigningRight } from '@/types';
import { useCompanyContext } from '@/context/company-context';
import FormInput from '@/components/form/form-input';
import FormPhoneInput from '@/components/form/form-phone-input';
import FormSingleSelect from '@/components/form/form-single-select';
import CustomHeading from '@/components/ui/custom-heading';

interface FormProps {
  signatoryRights: SigningRight[];
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

export default function SignatoryRightsForm() {
  const {
    values: { signatoryRights },
    setValues,
  } = useCompanyContext();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormProps>({
    mode: 'onSubmit',
    defaultValues: signatoryRights?.signinRights
      ? {
          signatoryRights: signatoryRights.signinRights,
        }
      : {
          signatoryRights: [DEFAULT_RIGHT],
        },
  });

  const { fields, append, remove } = useFieldArray<FormProps>({
    control,
    name: 'signatoryRights',
  });

  const onSubmit: SubmitHandler<FormProps> = values => {
    setValues(
      { signatoryRights: { signinRights: values.signatoryRights } },
      'signatoryRights.signinRights'
    );
  };

  const appendShareSeries = () => {
    append(DEFAULT_RIGHT);
  };

  const removeShareSeries = (index: number) => {
    remove(index);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
                name={`signatoryRights.${index}.personalID`}
                control={control}
                optionalText="optional"
                labelText="Personal ID"
              />
              <FormInput
                name={`signatoryRights.${index}.givenName`}
                control={control}
                rules={{ required: 'Given name is required.' }}
                labelText="Given name"
              />
              <FormInput
                name={`signatoryRights.${index}.middleNames`}
                control={control}
                rules={{ required: 'Middle names are required.' }}
                labelText="Middle names"
              />
              <FormInput
                name={`signatoryRights.${index}.lastName`}
                control={control}
                rules={{ required: 'Last name is required.' }}
                labelText="Last name"
              />
              <FormInput
                type="date"
                name={`signatoryRights.${index}.dateOfBirth`}
                control={control}
                rules={{ required: 'Given name is required.' }}
                labelText="Date of birth"
                hintText="Select from date picker"
              />
              <FormSingleSelect
                name={`signatoryRights.${index}.nationality`}
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
                name={`signatoryRights.${index}.fullAddress`}
                control={control}
                rules={{ required: 'Address is required.' }}
                labelText="Full address"
              />
              <FormInput
                name={`signatoryRights.${index}.thoroughfare`}
                control={control}
                optionalText="optional"
                labelText="Thoroughfare"
              />
              <FormInput
                name={`signatoryRights.${index}.locatorName`}
                control={control}
                optionalText="optional"
                labelText="Locator name"
              />
              <FormInput
                name={`signatoryRights.${index}.addressArea`}
                control={control}
                optionalText="optional"
                labelText="Address area"
              />
              <FormInput
                name={`signatoryRights.${index}.postCode`}
                control={control}
                optionalText="optional"
                labelText="Post code"
              />
              <FormInput
                name={`signatoryRights.${index}.postName`}
                control={control}
                optionalText="optional"
                labelText="Post name"
              />
              <FormInput
                name={`signatoryRights.${index}.poBox`}
                control={control}
                optionalText="optional"
                labelText="Post box"
              />
              <FormInput
                name={`signatoryRights.${index}.adminUnitLevel1`}
                control={control}
                optionalText="optional"
                labelText="Admin unit level 1"
              />
              <FormInput
                name={`signatoryRights.${index}.adminUnitLevel2`}
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

        <Button variant="secondary" onClick={appendShareSeries}>
          Add new
        </Button>

        <Button type="submit">Next</Button>
      </div>
    </form>
  );
}
