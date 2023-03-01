import { Button } from 'suomifi-ui-components';
import { useCompanyContext } from '@/context/company-context';

interface Props {
  formType: 'company' | 'beneficialOwners' | 'signatoryRights';
}

export default function FormActionButtons(props: Props) {
  const { formType } = props;
  const {
    companyStep,
    setCompanyStep,
    beneficialOwnersStep,
    setBeneficialOwnersStep,
  } = useCompanyContext();

  const step =
    formType === 'company'
      ? companyStep
      : formType === 'beneficialOwners'
      ? beneficialOwnersStep
      : undefined;

  const stepFunc =
    formType === 'company' ? setCompanyStep : setBeneficialOwnersStep;

  return (
    <>
      {step && step > 0 ? (
        <Button
          variant="secondary"
          icon="arrowLeft"
          onClick={() => stepFunc(step - 1)}
        >
          Previous
        </Button>
      ) : null}
      <Button type="submit" iconRight="arrowRight">
        Next
      </Button>
    </>
  );
}
