import {
  FoodyModal,
  FoodysContainer,
  Modal,
  SearchContainer,
} from '../../components';
import { useAppContext } from '../../context/appContext';

const AllFoodies = () => {
  const { showModal, toggleModal } = useAppContext();
  return (
    <div className='dashboard-page'>
      <SearchContainer all />
      <FoodysContainer all />
      <Modal open={showModal} onClose={toggleModal} center>
        <FoodyModal />
      </Modal>
    </div>
  );
};

export default AllFoodies;
