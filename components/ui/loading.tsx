import { LoadingSpinner } from 'suomifi-ui-components';

interface Props {
  status?: 'failed' | 'loading' | 'success';
  text?: string;
}

export default function Loading(props: Props) {
  const { status = 'loading', text = 'Loading' } = props;

  return (
    <LoadingSpinner
      status={status}
      text={text}
      textAlign="bottom"
      variant="normal"
    />
  );
}
