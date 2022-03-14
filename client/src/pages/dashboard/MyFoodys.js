import { useFoodyContext } from 'context/contexts/foodyContext';
import {
  FoodyModal,
  FoodysContainer,
  Modal,
  SearchContainer,
} from 'components';

const MyFoodys = () => {
  const { showModal, toggleModal } = useFoodyContext();

  return (
    <div className='dashboard-page'>
      <SearchContainer />
      <FoodysContainer my />
      <Modal open={showModal} onClose={toggleModal} center>
        <FoodyModal />
      </Modal>
    </div>
  );
};

export default MyFoodys;
