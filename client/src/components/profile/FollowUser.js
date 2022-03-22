import { FollowButton } from 'components';
import { UserLink } from '../notifications/UserLink';

const FollowUser = ({
  profileUserId,
  username,
  img,
  name,
  lastName,
  email,
  loggedUserId,
}) => {
  const isOwnAccount = profileUserId === loggedUserId;
  return (
    <article key={profileUserId}>
      <img src={img} alt={username} />
      <div className='follow-container'>
        <div className='user-data'>
          <UserLink isOwnAccount={isOwnAccount} username={username} />,
          <span className='full-name'>
            {name} {lastName}
          </span>
          <div className='email'>
            {!isOwnAccount ? (
              <a
                href={`mailto:${email}`}
                target='_blank'
                rel='noreferrer noopener'
              >
                {email}
              </a>
            ) : (
              <span>{email}</span>
            )}
          </div>
        </div>
        <FollowButton
          isOwnAccount={profileUserId === loggedUserId}
          id={profileUserId}
        />
      </div>
    </article>
  );
};

export default FollowUser;
