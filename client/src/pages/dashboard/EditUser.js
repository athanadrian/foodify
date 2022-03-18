import { useFoodyContext } from 'context/contexts/foodyContext';
import { useProfileContext } from 'context/contexts/profileContext';
import { useEffect } from 'react';
import {
  ChartsContainer,
  MapModal,
  Modal,
  StatsContainer,
  ProfileForm,
  UserForm,
} from 'components';
import Wrapper from 'wrappers/DashboardFormPage';
import StatsWrapper from 'wrappers/StatsContainer';
import { useAppContext } from 'context/contexts/appContext';

const EditUser = () => {
  const { monthlyCreations } = useFoodyContext();
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
      <div className='dashboard-page'>
        <StatsWrapper>
          <h2 className='user-statistics'>My Creations</h2>
          <StatsContainer />
          {monthlyCreations.length > 0 && <ChartsContainer />}
        </StatsWrapper>
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
