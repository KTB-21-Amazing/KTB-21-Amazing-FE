import Modal from '../common/modal/Modal';
import * as S from './ExitModal.Style';

interface ExitModalProps {
  onClose: () => void;
}

const ExitModal = ({ onClose }: ExitModalProps) => {
  return (
    <Modal onClose={onClose}>
      <S.ModalPart>탈출을 축하합니다!!!!!</S.ModalPart>
    </Modal>
  );
};

export default ExitModal;
