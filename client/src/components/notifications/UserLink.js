import React from 'react';
import { Link } from 'react-router-dom';

export const UserLink = ({ name, username }) => {
  return (
    <Link to={`/profile/${username}`} className='user'>
      {' '}
      {name}
    </Link>
  );
};
