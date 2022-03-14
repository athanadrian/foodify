import { useFoodyContext } from 'context/contexts/foodyContext';
import {
  FoodyModal,
  FoodysContainer,
  Modal,
  SearchContainer,
} from 'components';

const AllFoodies = () => {
  const { showModal, toggleModal } = useFoodyContext();
  return (
    <div className='dashboard-page'>
      <SearchContainer />
      <FoodysContainer all />
      <Modal open={showModal} onClose={toggleModal} center>
        <FoodyModal />
      </Modal>
    </div>
  );
};

export default AllFoodies;
