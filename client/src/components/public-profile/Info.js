import React from 'react';
import Wrapper from 'wrappers/public-profile/Info';

import { publicProfileItems } from 'utils/lookup-data/public-profile-items';
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
      {publicProfileItems(data).map((item) => {
        return <Item key={item.id} {...item} />;
      })}
    </Wrapper>
  );
};

const Item = ({ icon, label, value, color }) => {
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
