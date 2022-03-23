import { FoodyModal, MapFoodys, Modal } from 'components';
import { useFoodyContext } from 'context/contexts/foodyContext';
const Map = () => {
  const { showModal, toggleModal } = useFoodyContext();

  return (
    <>
      <div className='map-page'>
        <MapFoodys />
      </div>
      <Modal open={showModal} onClose={toggleModal} center>
        <FoodyModal />
      </Modal>
    </>
  );
};

export default Map;
