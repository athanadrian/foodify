import { Loading } from 'components';
import { useProfileContext } from 'context/contexts/profileContext';
import Wrapper from 'wrappers/public-profile/Header';
import DefaultAvatar from 'assets/images/avatar.png';

const Header = () => {
  const { profile, isLoadingProfile } = useProfileContext();

  if (isLoadingProfile)
    return (
      <Wrapper>
        <Loading center mid text='loading user profile' />
      </Wrapper>
    );
  return (
    <Wrapper>
      <img
        src={profile?.user?.profilePicUrl || DefaultAvatar}
        alt={profile?.user?.name}
      />
      {profile?.user?.name && (
        <>
          <h4>
            <strong>
              <span>{profile?.user?.name.toUpperCase()}</span>
            </strong>
          </h4>
          {<span className='username'>@{profile?.user?.username}</span>}
        </>
      )}
    </Wrapper>
  );
};

export default Header;
