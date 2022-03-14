import React from 'react';
import ContainerWrapper from 'wrappers/public-profile/InfoContainer';
import ItemWrapper from 'wrappers/public-profile/InfoItem';

import { profileInfo } from 'utils/lookup-data';
import { useProfileContext } from 'context/contexts/profileContext';
import { Link } from 'react-router-dom';

const Info = () => {
  const {
    totalCreations,
    totalComments,
    totalLikes,
    totalVisits,
    totalFollowers,
    totalFollowing,
    profile,
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
    <ContainerWrapper>
      {profileInfo(data).map((item) => {
        return (
          <InfoItem
            key={item.id}
            {...item}
            username={profile?.user?.username}
            profileUserId={profile?.user?._id}
          />
        );
      })}
    </ContainerWrapper>
  );
};

const InfoItem = ({
  icon,
  label,
  value,
  hexColor,
  color,
  username,
  profileUserId,
  action,
}) => {
  const noLink = label === 'followers' || label === 'following';

  const renderInfoItem = () => (
    <article className='item'>
      <span className={color}>{icon}</span>
      <div>
        <h3>{value}</h3>
        <p>{label}</p>
      </div>
    </article>
  );
  const stateData = { label, action, hexColor, profileUserId };
  return (
    <ItemWrapper color={hexColor}>
      {noLink ? (
        renderInfoItem()
      ) : (
        <Link to={`/profile-foodys/${username}`} state={stateData}>
          {renderInfoItem()}
        </Link>
      )}
    </ItemWrapper>
  );
};

export default Info;
