import { Loading, NoFollowData } from 'components';
import { useAppContext } from 'context/contexts/appContext';
import { useProfileContext } from 'context/contexts/profileContext';
import Wrapper from 'wrappers/public-profile/Following';
import { FollowUser } from '.';
import DefaultAvatar from 'assets/images/avatar.png';

const Following = () => {
  const { user } = useAppContext();
  const { following, isLoadingFollowing } = useProfileContext();

  if (isLoadingFollowing)
    return (
      <Wrapper>
        <Loading max center />
      </Wrapper>
    );
  if (following.length === 0)
    return (
      <Wrapper className='center'>
        <NoFollowData followingComponent />
      </Wrapper>
    );
  return (
    <Wrapper>
      <div className='following'>
        {following.map((following) => {
          const { _id, profilePicUrl, name, lastName, username, email } =
            following?.user;
          return (
            <FollowUser
              key={_id}
              username={username}
              img={profilePicUrl || DefaultAvatar}
              name={name}
              lastName={lastName}
              email={email}
              profileUserId={_id}
              loggedUserId={user._id}
            />
          );
        })}
      </div>
    </Wrapper>
  );
};

export default Following;
