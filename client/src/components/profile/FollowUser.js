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
  return (
    <article key={profileUserId}>
      <img src={img} alt={username} />
      <div className='follow-container'>
        <div className='user-data'>
          <UserLink
            isOwnAccount={profileUserId === loggedUserId}
            username={username}
          />
          ,
          <span className='full-name'>
            {name} {lastName}
          </span>
          <div>
            <a className='email' href={username}>
              {email}
            </a>
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
