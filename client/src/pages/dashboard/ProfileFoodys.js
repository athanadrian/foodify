import { useParams, useLocation } from 'react-router-dom';
import { useFoodyContext } from 'context/contexts/foodyContext';
import { FoodyModal, FoodysContainer, Modal } from 'components';

const ProfileFoodys = () => {
  const { showModal, toggleModal } = useFoodyContext();
  const { username } = useParams();
  const {
    state: { action, label, hexColor, profileUserId },
  } = useLocation();

  return (
    <div className='dashboard-page'>
      <FoodysContainer
        profile
        username={username}
        label={label}
        action={action}
        color={hexColor}
        profileUserId={profileUserId}
      />
      <Modal open={showModal} onClose={toggleModal} center>
        <FoodyModal />
      </Modal>
    </div>
  );
};

export default ProfileFoodys;
