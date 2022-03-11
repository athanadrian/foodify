import { Link } from 'react-router-dom';

export const UserLink = ({ username }) => {
  return (
    <Link to={`/profile/${username}`} className='user-link'>
      {' '}
      @{username}
    </Link>
  );
};
