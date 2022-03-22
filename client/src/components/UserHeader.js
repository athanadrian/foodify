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
  profile,
}) => {
  const isOwnAccount = pageId === loggedUserId;
  return (
    <Wrapper>
      <header>
        <img src={src} alt={alt} />
        <div className='user-data'>
          <UserLink isOwnAccount={isOwnAccount} username={username} />
          {profile && (
            <>
              <span className='full-name'>
                {name} {lastName}
              </span>
              <div>
                {!isOwnAccount ? (
                  <a
                    className='email'
                    href={`mailto:${email}`}
                    target='_blank'
                    rel='noreferrer noopener'
                  >
                    {email}
                  </a>
                ) : (
                  <span className='email'>{email}</span>
                )}
              </div>
            </>
          )}
        </div>
        <div className='user-data-container'>
          <FollowButton isOwnAccount={isOwnAccount} id={pageId} />
        </div>
      </header>
    </Wrapper>
  );
};

export default UserHeader;
