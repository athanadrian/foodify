import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useProfileContext } from 'context/contexts/profileContext';
import {
  ChartsContainer,
  Header,
  Info,
  StatsContainer,
  User,
} from 'components';
import { useFoodyContext } from 'context/contexts/foodyContext';
import StatsWrapper from 'wrappers/StatsContainer';
import { UserLink } from 'components/notifications/UserLink';

const Profile = () => {
  const { monthlyCreations } = useFoodyContext();
  const { getUserProfile, isFollow, isUnFollow } = useProfileContext();

  const { username } = useParams();
  useEffect(() => {
    getUserProfile(username);
    // eslint-disable-next-line
  }, [username, isFollow, isUnFollow]);
  return (
    <>
      <div className='dashboard-page'>
        <Header />
        <Info />
        <User />
      </div>

      <div className='dashboard-page'>
        <StatsWrapper>
          <h2 className='user-statistics'>
            <UserLink username={username} isOwnAccount={true} /> Creations
          </h2>
          <StatsContainer profile />
          {monthlyCreations.length > 0 && <ChartsContainer />}
        </StatsWrapper>
      </div>
    </>
  );
};

export default Profile;
