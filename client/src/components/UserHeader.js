import Wrapper from 'wrappers/public-profile/UserHeader';
import { UserLink } from './notifications/UserLink';
import { FollowButton } from './social-buttons';

const UserHeader = ({
  src,
  alt,
  name,
  email,
  lastName,
  username,
  loggedUserId,
  pageId,
}) => {
  const isOwnAccount = pageId === loggedUserId;
  return (
    <Wrapper>
      <header>
        <img src={src} alt={alt} />
        <div className='user-data-container'>
          <div className='user-data'>
            <UserLink isOwnAccount={isOwnAccount} username={username} />
            <span className='full-name'>
              {name} {lastName}
            </span>
            <div>
              <a className='email' href={username}>
                {email}
              </a>
            </div>
          </div>
          <FollowButton isOwnAccount={isOwnAccount} id={pageId} />
        </div>
      </header>
    </Wrapper>
  );
};

export default UserHeader;
