import { Loading, NoFollowData } from 'components';
import { useAppContext } from 'context/contexts/appContext';
import { useProfileContext } from 'context/contexts/profileContext';
import Wrapper from 'wrappers/public-profile/Followers';
import { FollowUser } from '.';

const Followers = () => {
  const { user } = useAppContext();
  const { followers, isLoadingFollowers } = useProfileContext();
  if (isLoadingFollowers)
    return (
      <Wrapper>
        <Loading max center />
      </Wrapper>
    );
  if (followers.length === 0)
    return (
      <Wrapper className='center'>
        <NoFollowData followersComponent />
      </Wrapper>
    );
  return (
    <Wrapper>
      <div className='followers'>
        {followers.map((follower) => {
          const { _id, profilePicUrl, name, lastName, username, email } =
            follower?.user;
          return (
            <FollowUser
              key={_id}
              username={username}
              img={profilePicUrl}
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

export default Followers;
