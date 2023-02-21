import { ReactNode } from 'react';
import {
  ModalContent,
  ModalFooter,
  ModalTitle,
  Modal as SuomiFiModal,
} from 'suomifi-ui-components';

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

  return (
    <SuomiFiModal
      appElementId="__next"
      visible
      // variant="smallScreen"
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
