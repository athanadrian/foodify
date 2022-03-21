import { useProfileContext } from 'context/contexts/profileContext';
import { useEffect } from 'react';
import { MapModal, Modal, ProfileForm, UserForm } from 'components';
import Wrapper from 'wrappers/DashboardFormPage';
import { useAppContext } from 'context/contexts/appContext';

const EditUser = () => {
  const { showModal, toggleModal } = useAppContext();
  const { getMyProfile } = useProfileContext();

  useEffect(() => {
    getMyProfile();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <div className='dashboard-page'>
        <Wrapper>
          <UserForm />
        </Wrapper>
      </div>
      <div className='dashboard-page'>
        <Wrapper>
          <ProfileForm />
        </Wrapper>
      </div>
      <div>
        <Modal open={showModal} onClose={toggleModal} center>
          <MapModal profile />
        </Modal>
      </div>
    </>
  );
};

export default EditUser;
