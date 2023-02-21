import { ReactNode } from 'react';
import {
  ModalContent,
  ModalFooter,
  ModalTitle,
  Modal as SuomiFiModal,
} from 'suomifi-ui-components';
import useDimensions from '@/hooks/use-dimensions';

interface Props {
  title: string;
  content: ReactNode;
  footerContent?: ReactNode;
  closeOnEsc?: boolean;
  closeModal: () => void;
}

export default function Modal(props: Props) {
  const {
    title,
    content,
    footerContent,
    closeOnEsc = true,
    closeModal,
  } = props;

  const { width } = useDimensions();

  return (
    <SuomiFiModal
      appElementId="__next"
      visible
      variant={width > 640 ? 'default' : 'smallScreen'}
      onEscKeyDown={() => closeOnEsc && closeModal()}
    >
      <ModalContent>
        <ModalTitle>{title}</ModalTitle>
        {content}
      </ModalContent>
      {footerContent && <ModalFooter>{footerContent}</ModalFooter>}
    </SuomiFiModal>
  );
}
