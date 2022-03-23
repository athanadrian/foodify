import Wrapper from 'wrappers/public-profile/Social';

import { profileSocial } from 'utils/lookup-data';
import { useProfileContext } from 'context/contexts/profileContext';

const Social = () => {
  const { profile } = useProfileContext();
  return (
    <Wrapper>
      <div className='underline' />
      <div className='hero-info'>
        <div className='social-icons'>
          {profileSocial(profile?.social, profile?.mobile)
            .slice(0, 4)
            .map((icon) => {
              return <SocialItem key={icon.id} {...icon} />;
            })}
        </div>
        <div className='social-icons message'>
          {profileSocial(profile?.social, profile?.mobile)
            .slice(4, 8)
            .map((icon) => {
              return <SocialItem key={icon.id} {...icon} />;
            })}
        </div>
      </div>
    </Wrapper>
  );
};

const SocialItem = ({ Icon, url, className, iconClass, size }) => {
  return (
    <div className={className}>
      <a href={url} target='_blank' rel='noreferrer noopener'>
        <Icon className={`social-icon ${iconClass}`} size={size} />
      </a>
    </div>
  );
};

export default Social;
