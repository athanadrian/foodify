import { Loading } from 'components';
import { useProfileContext } from 'context/contexts/profileContext';
import { MdBusiness, MdLink, MdLocationOn } from 'react-icons/md';
import Wrapper from 'wrappers/public-profile/Card';

const Card = () => {
  const { profile, isLoadingProfile } = useProfileContext();
  const [company, website, bio] = [
    'My Company',
    'atana.site',
    'my bio bla blabla',
  ];

  if (isLoadingProfile)
    return (
      <Wrapper>
        <Loading center max text='loading user profile' />
      </Wrapper>
    );

  return (
    <Wrapper>
      <header>
        <img src={profile?.user?.profilePicUrl} alt={profile?.user?.name} />
        <div>
          <h4>{profile?.user?.name}</h4>
          <p>@{profile?.user?.username}</p>
        </div>
        <a href={`/${profile?.user?.username}`}>follow</a>
      </header>
      <p className='bio'>{profile?.bio || bio}</p>
      <div className='links space-between'>
        <div>
          <p>
            <MdBusiness /> {company}
          </p>
          <p>
            <MdLocationOn /> {profile?.user?.home}
          </p>
        </div>
        <a
          href={`https://${website}`}
          target='_blank'
          rel='noreferrer noopener'
        >
          <MdLink />
          This my website
        </a>
      </div>
    </Wrapper>
  );
};

export default Card;
