import Wrapper from 'wrappers/public-profile/UserHeader';
import { UserLink } from './notifications/UserLink';
import { FollowButton } from './social-buttons';

const UserHeader = ({
  link,
  src,
  alt,
  name,
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
        <div>
          {link ? (
            <UserLink name={name} username={username} />
          ) : (
            <h5>
              {name} {lastName}
            </h5>
          )}
          <p>@{username}</p>
        </div>
        {!isOwnAccount && (
          <FollowButton isOwnAccount={isOwnAccount} id={pageId} />
        )}
      </header>
    </Wrapper>
  );
};

export default UserHeader;
