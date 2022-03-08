import { Loading } from 'components';
import { useProfileContext } from 'context/contexts/profileContext';
import Wrapper from 'wrappers/public-profile/Header';

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
      {profile?.user?.profilePicUrl && (
        <img src={profile?.user?.profilePicUrl} alt={profile?.user?.name} />
      )}
      {profile?.user?.name && (
        <>
          <h4>
            Profile:{' '}
            <strong>
              <span> {profile?.user?.name.toUpperCase()}</span>,{' '}
            </strong>
          </h4>
          {<span className='username'>#{profile?.user?.username}</span>}
        </>
      )}
    </Wrapper>
  );
};

export default Header;
