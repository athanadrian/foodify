import { Card, Followers, Following, Social } from '.';
import Wrapper from 'wrappers/public-profile/User';
import { useEffect } from 'react';
import { useProfileContext } from 'context/contexts/profileContext';
import { Loading } from 'components';

const User = () => {
  const {
    profile,
    isLoadingProfile,
    getUserFollowers,
    getUserFollowing,
    isFollowing,
  } = useProfileContext();

  const profileUserId = profile?.user?._id;

  useEffect(() => {
    if (profileUserId) {
      getUserFollowing(profileUserId);
      getUserFollowers(profileUserId);
    }
    // eslint-disable-next-line
  }, [profile, profileUserId, !isFollowing]);

  if (isLoadingProfile) return <Loading max center />;
  return (
    <Wrapper>
      <Card />
      <Social />
      <Followers />
      <Following />
    </Wrapper>
  );
};

export default User;
