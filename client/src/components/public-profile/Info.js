import React from 'react';
import Wrapper from 'wrappers/public-profile/Info';

import { profileInfo } from 'utils/lookup-data';
import { useProfileContext } from 'context/contexts/profileContext';

const Info = () => {
  const {
    totalCreations,
    totalComments,
    totalLikes,
    totalVisits,
    totalFollowers,
    totalFollowing,
  } = useProfileContext();
  const data = {
    totalCreations,
    totalComments,
    totalLikes,
    totalVisits,
    totalFollowers,
    totalFollowing,
  };
  return (
    <Wrapper>
      {profileInfo(data).map((item) => {
        return <InfoItem key={item.id} {...item} />;
      })}
    </Wrapper>
  );
};

const InfoItem = ({ icon, label, value, color }) => {
  return (
    <article className='item'>
      <span className={color}>{icon}</span>
      <div>
        <h3>{value}</h3>
        <p>{label}</p>
      </div>
    </article>
  );
};

export default Info;
