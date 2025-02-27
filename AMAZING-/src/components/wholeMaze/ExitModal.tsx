import Modal from '../common/modal/Modal';
import * as S from './ExitModal.Style';

interface ExitModalProps {
  onClose: () => void;
}

const ExitModal = ({ onClose }: ExitModalProps) => {
  return (
    <Modal onClose={onClose}>
      <S.ModalPart>축하해요요</S.ModalPart>
    </Modal>
  );
};

export default ExitModal;
