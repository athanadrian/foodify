import Wrapper from 'wrappers/public-profile/UserHeader';
import { UserLink } from './notifications/UserLink';

const UserHeader = ({ link, src, alt, name, username }) => {
  return (
    <Wrapper>
      <header>
        <img src={src} alt={alt} />
        <div>
          {link ? (
            <UserLink name={name} username={username} />
          ) : (
            <h5>{name}</h5>
          )}
          <p>{username}</p>
        </div>
        <button href={`/${username}`}>follow</button>
      </header>
    </Wrapper>
  );
};

export default UserHeader;
