import 'react-responsive-modal/styles.css';
import { CgCloseO } from 'react-icons/cg';
import { Modal } from 'react-responsive-modal';
import Wrapper from 'wrappers/Modal';

const ModalComponent = ({ open, onClose, children, classNames }) => {
  return (
    <Wrapper>
      <Modal
        open={open}
        onClose={onClose}
        closeIcon={<CgCloseO size={20} />}
        center
        showCloseIcon={false}
        classNames={classNames}
      >
        {children}
      </Modal>
    </Wrapper>
  );
};

export default ModalComponent;
