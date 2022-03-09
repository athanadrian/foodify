import React from 'react';
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
          {profileSocial(profile?.social).map((icon) => {
            return <SocialItem key={icon.id} {...icon} />;
          })}
        </div>
      </div>
    </Wrapper>
  );
};

const SocialItem = ({ Icon, url, iconClass }) => {
  return (
    <div>
      <a href={url}>
        <Icon className={`social-icon ${iconClass}`} />
      </a>
    </div>
  );
};

export default Social;
