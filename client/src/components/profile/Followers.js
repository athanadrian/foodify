import { FollowButton, Loading, NoFollowData } from 'components';
import { UserLink } from 'components/notifications/UserLink';
import { useAppContext } from 'context/appContext';
import { useProfileContext } from 'context/contexts/profileContext';
import Wrapper from 'wrappers/public-profile/Followers';

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
          const {
            _id,
            profilePicUrl: img,
            name,
            lastName,
            username,
            email,
          } = follower?.user;
          return (
            <article key={_id}>
              <img src={img} alt={username} />
              <div className='follow-container'>
                <div className='user-data'>
                  <UserLink username={username} />,
                  <span className='full-name'>
                    {name} {lastName}
                  </span>
                  <div>
                    <a className='email' href={username}>
                      {email}
                    </a>
                  </div>
                </div>
                <FollowButton isOwnAccount={_id === user._id} id={_id} />
              </div>
            </article>
          );
        })}
      </div>
    </Wrapper>
  );
};

export default Followers;
