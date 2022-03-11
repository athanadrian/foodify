import { Card, Followers, Following, Social } from '.';
import Wrapper from 'wrappers/public-profile/User';
import { useEffect } from 'react';
import { useProfileContext } from 'context/contexts/profileContext';

const User = () => {
  const { profile, getUserFollowers, getUserFollowing, isFollowing } =
    useProfileContext();
  const profileUserId = profile?.user?._id;

  useEffect(() => {
    if (profile) {
      getUserFollowing(profileUserId);
      getUserFollowers(profileUserId);
    }
    // eslint-disable-next-line
  }, [profile, profileUserId, !isFollowing]);

  return (
    <Wrapper>
      <Card profileUserId={profileUserId} />
      <Social />
      <Followers profileUserId={profileUserId} />
      <Following profileUserId={profileUserId} />
    </Wrapper>
  );
};

export default User;
