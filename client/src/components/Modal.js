import { CgCloseO } from 'react-icons/cg';
import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';

const ModalComponent = ({ open, onClose, children }) => {
  return (
    <div>
      <Modal
        open={open}
        onClose={onClose}
        closeIcon={<CgCloseO size={20} />}
        center
      >
        {children}
      </Modal>
    </div>
  );
};

export default ModalComponent;
