import { UserLink } from 'components/notifications/UserLink';
import Wrapper from 'wrappers/public-profile/Following';

const mock_followers = [
  {
    email: 'test1@gmail.com',
    home: 'my home',
    lastName: 'lastName',
    name: 'test1',
    profilePicUrl:
      'https://res.cloudinary.com/indersingh/image/upload/v1593464618/App/user_mklcpl.png',
    username: 'test1',
  },
  {
    email: 'test2@gmail.com',
    home: 'my home',
    lastName: 'lastName',
    name: 'test2',
    profilePicUrl:
      'https://res.cloudinary.com/indersingh/image/upload/v1593464618/App/user_mklcpl.png',
    username: 'test2',
  },
];
const Following = () => {
  const [website] = ''; // ['my-website'];
  return (
    <Wrapper>
      <div className='following'>
        {mock_followers.map((follower, index) => {
          const { profilePicUrl: img, name, lastName, username } = follower;
          return (
            <article key={index}>
              <img src={img} alt={username} />
              <div>
                <h4>
                  <span className='username'>@{username}</span>,
                  <span className='full-name'>
                    {' '}
                    {name} {lastName}
                  </span>
                </h4>
                {website ? (
                  <a href={website}>{website}</a>
                ) : (
                  <UserLink name={name} username={username} />
                )}
              </div>
            </article>
          );
        })}
      </div>
    </Wrapper>
  );
};

export default Following;
