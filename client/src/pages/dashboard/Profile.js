import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useProfileContext } from 'context/contexts/profileContext';
import {
  //ChartsContainer,
  //StatsContainer,
  Header,
  Info,
  User,
} from 'components';
// import { useAppContext } from 'context/appContext';
// import StatsWrapper from 'wrappers/StatsContainer';

const Profile = () => {
  //const { showModal, monthlyCreations, toggleModal } = useAppContext();
  const { getUserProfile } = useProfileContext();

  const { username } = useParams();
  useEffect(() => {
    getUserProfile(username);
    // eslint-disable-next-line
  }, [username]);
  return (
    <>
      <div className='dashboard-page'>
        <Header />
        <Info />
        <User />
      </div>

      {/* <div className='dashboard-page'>
        <StatsWrapper>
          <h2 className='user-statistics'>My Creations</h2>
          <StatsContainer />
          {monthlyCreations.length > 0 && <ChartsContainer />}
        </StatsWrapper>
      </div>*/}
    </>
  );
};

export default Profile;
