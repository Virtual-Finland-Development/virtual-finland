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
      {step && step > 0 && step < 10 ? (
        <Button
          variant="secondary"
          icon="arrowLeft"
          onClick={() => onFormActionClick()}
        >
          Previous
        </Button>
      ) : null}
      <Button
        {...(step < 10 && { iconRight: 'arrowRight' })}
        onClick={() => onFormActionClick(true)}
        disabled={buttonsDisabled}
      >
        {step < 10 ? 'Next' : 'Submit'}
      </Button>
    </>
  );
}
