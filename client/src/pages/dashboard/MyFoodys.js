import {
  FoodyModal,
  FoodysContainer,
  Modal,
  SearchContainer,
} from '../../components';
import { useAppContext } from '../../context/appContext';

const MyFoodys = () => {
  const { showModal, toggleModal } = useAppContext();

  return (
    <div className='dashboard-page'>
      <SearchContainer />
      <FoodysContainer />
      <Modal open={showModal} onClose={toggleModal} center>
        <FoodyModal />
      </Modal>
    </div>
  );
};

export default MyFoodys;
