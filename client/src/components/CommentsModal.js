import { relativeDate } from 'utils/functions';
import Wrapper from '../wrappers/SocialModal';

const CommentsModal = ({ comments }) => {
  return (
    <Wrapper>
      <div className='socials-container'>
        <div className='socials-container-center'>
          {comments.length > 0 &&
            comments.map((comment) => (
              <ListItem key={comment._id} comment={comment} />
            ))}
        </div>
      </div>
    </Wrapper>
  );
};

export default CommentsModal;

const ListItem = ({ comment }) => {
  const {
    user: { name },
    date,
    text,
  } = comment;
  return (
    <div className='social-container'>
      <div className='profile-icon'>{name.charAt(0)}</div>
      <div className='profile-info'>
        <div className='info-container'>
          <h5>{name}</h5>
          <p>{text}</p>
        </div>
        <p>
          <span className='social-text'>Added: </span>
          <span className='social-date'>{relativeDate(date)}</span>
        </p>
      </div>
    </div>
  );
};
