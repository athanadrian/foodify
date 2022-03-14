import { AiFillNotification } from 'react-icons/ai';
import { FiUserPlus, FiUsers } from 'react-icons/fi';
import FollowWrapper from 'wrappers/no-data/NoFollows';
import NoDataWrapper from 'wrappers/no-data/NoData';
import { SiJusteat } from 'react-icons/si';
import { UserLink } from './notifications/UserLink';

const NoFoodys = ({
  all,
  my,
  profile,
  color,
  isOwnAccount,
  action,
  username,
  totalFoodys,
}) => {
  const renderNoFoodys = (status) => {
    return (
      <div className='no-data-container'>
        <span className='icon'>
          <SiJusteat />
        </span>
        {(status === all || status === my) && (
          <h4> No foodys {all ? 'to display' : 'created'}...</h4>
        )}
        {status === profile && (
          <h4>
            <UserLink isOwnAccount={isOwnAccount} username={username} />{' '}
            <span className='action'>{action}</span> : 0 Foodys!
          </h4>
        )}
      </div>
    );
  };

  if (totalFoodys === 0 && (all || my))
    return <NoDataWrapper>{renderNoFoodys(all || my)}</NoDataWrapper>;
  if (totalFoodys === 0 && profile)
    return (
      <NoDataWrapper color={color}>{renderNoFoodys(profile)}</NoDataWrapper>
    );
};

const NoNotifications = () => (
  <NoDataWrapper>
    <div className='no-data-container'>
      <span className='icon'>
        <AiFillNotification />
      </span>
      <h4>No Notifications to display</h4>
    </div>
  </NoDataWrapper>
);

const NoFollowData = ({ followersComponent, followingComponent }) => (
  <FollowWrapper>
    <div className='no-follow'>
      {followersComponent && (
        <div className='no-follow-container'>
          <span className='icon icon-followers'>
            <FiUsers />
          </span>
          <h4>User does not have followers</h4>
        </div>
      )}

      {followingComponent && (
        <div className='no-follow-container'>
          <span className='icon icon-following'>
            <FiUserPlus />
          </span>
          <h4>User does not follow any users</h4>
        </div>
      )}
    </div>
  </FollowWrapper>
);

export { NoFollowData, NoFoodys, NoNotifications };
