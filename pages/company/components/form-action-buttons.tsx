import { useFormContext } from 'react-hook-form';
import { Button } from 'suomifi-ui-components';
import { useCompanyContext } from '@/context/company-context';

interface Props {
  onFormActionClick: (next?: boolean) => void;
}

export default function FormActionButtons(props: Props) {
  const { onFormActionClick } = props;
  const { step } = useCompanyContext();
  const {
    formState: { errors },
  } = useFormContext();

  const buttonsDisabled = Boolean(Object.keys(errors).length);

  return (
    <>
      {step && step > 0 ? (
        <Button
          // type="submit"
          variant="secondary"
          icon="arrowLeft"
          onClick={() => onFormActionClick()}
        >
          Previous
        </Button>
      ) : null}
      <Button
        // type="submit"
        iconRight="arrowRight"
        onClick={() => onFormActionClick(true)}
        disabled={buttonsDisabled}
      >
        Next
      </Button>
    </>
  );
}
