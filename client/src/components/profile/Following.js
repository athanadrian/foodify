import { FollowButton, Loading, NoFollowData } from 'components';
import { UserLink } from 'components/notifications/UserLink';
import { useAppContext } from 'context/appContext';
import { useProfileContext } from 'context/contexts/profileContext';
import Wrapper from 'wrappers/public-profile/Following';

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
          const {
            _id,
            profilePicUrl: img,
            name,
            lastName,
            username,
            email,
          } = following?.user;
          return (
            <article key={_id}>
              <img src={img} alt={username} />
              <div className='space-between article-sm'>
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

export default Following;
