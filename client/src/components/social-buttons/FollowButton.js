import { Alert, Loading } from 'components';
import { useAppContext } from 'context/contexts/appContext';
import { useProfileContext } from 'context/contexts/profileContext';
import Wrapper from 'wrappers/public-profile/FollowButton';

const FollowButton = ({ id, isOwnAccount }) => {
  const { userFollowStats } = useAppContext();
  const {
    followUser,
    unFollowUser,
    isFollowing,
    showProfileAlert,
    alertText,
    alertType,
    markedElementId,
    clickedElement,
  } = useProfileContext();

  const alreadyFollowing =
    userFollowStats?.following.length > 0 &&
    userFollowStats?.following.filter((following) => following?.user === id)
      .length > 0;
  const text = alreadyFollowing ? 'un-following' : 'following';
  if (isFollowing && markedElementId === id)
    return <Loading min center text={text} />;

  if (showProfileAlert) return <Alert type={alertType} text={alertText} />;

  const handleFollow = () => {
    clickedElement(id);
    if (!alreadyFollowing) {
      followUser(id);
    } else {
      unFollowUser(id);
    }
  };
  return (
    <>
      {!isOwnAccount ? (
        <Wrapper>
          {!alreadyFollowing ? (
            <button onClick={handleFollow} className='follow-btn follow'>
              follow
            </button>
          ) : (
            <button onClick={handleFollow} className='follow-btn following-btn'>
              following
            </button>
          )}
        </Wrapper>
      ) : null}
    </>
  );
};
export default FollowButton;
