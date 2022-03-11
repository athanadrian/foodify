import { relativeDate } from 'utils/functions';
import Wrapper from 'wrappers/SocialModal';

const LikesModal = ({ likes }) => {
  return (
    <Wrapper>
      <div className='socials-container'>
        <div className='socials-container-center'>
          {likes.length > 0 &&
            likes.map((like) => <ListItem key={like._id} like={like} />)}
        </div>
      </div>
    </Wrapper>
  );
};

export default LikesModal;

const ListItem = ({ like }) => {
  const {
    user: { name, email },
    date,
  } = like;
  return (
    <div className='social-container'>
      <div className='profile-icon'>{name.charAt(0)}</div>
      <div className='profile-info'>
        <div className='info-container'>
          <h5>{name}</h5>
          <p>{email}</p>
        </div>
        <p>
          <span className='social-text'>Liked: </span>
          <span className='social-date'>{relativeDate(date)}</span>
        </p>
      </div>
    </div>
  );
};
