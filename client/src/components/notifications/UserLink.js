import { Link } from 'react-router-dom';

export const UserLink = ({ isOwnAccount, username }) => {
  return (
    <>
      {!isOwnAccount ? (
        <Link to={`/profile/${username}`} className='user-link'>
          {' '}
          @{username}
        </Link>
      ) : (
        <span className='user-link-own'>@{username}</span>
      )}
    </>
  );
};
