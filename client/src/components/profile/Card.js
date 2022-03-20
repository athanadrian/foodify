import { FaPhoneAlt } from 'react-icons/fa';
import { MdBusiness, MdLink, MdLocationOn } from 'react-icons/md';
import { Loading } from 'components';
import UserHeader from 'components/UserHeader';
import { useAppContext } from 'context/contexts/appContext';
import { useProfileContext } from 'context/contexts/profileContext';
import Wrapper from 'wrappers/public-profile/Card';
import DefaultAvatar from 'assets/images/avatar.png';

const Card = () => {
  const { user } = useAppContext();
  const { profile, isLoadingProfile } = useProfileContext();
  const [company, mobile, website, bio] = [
    'My Company',
    'My mobile',
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
      <UserHeader
        src={profile?.user?.profilePicUrl || DefaultAvatar}
        name={profile?.user?.name}
        alt={profile?.user?.name}
        username={profile?.user?.username}
        lastName={profile?.user?.lastName}
        email={profile?.user?.email}
        pageId={profile?.user?._id}
        loggedUserId={user?._id}
        profile
      />
      <p className='bio'>{profile?.bio || bio}</p>
      <div className='links space-between'>
        <div>
          <p>
            <MdBusiness /> {profile?.company || company}
          </p>
          <p>
            <MdLocationOn /> {profile?.user?.home}
          </p>
        </div>
        <div>
          <p>
            <FaPhoneAlt size={18} /> {profile?.mobile || mobile}
          </p>
          <a
            href={`https://${profile?.website || website}`}
            target='_blank'
            rel='noreferrer noopener'
          >
            <MdLink />
            website
          </a>
        </div>
      </div>
    </Wrapper>
  );
};

export default Card;
