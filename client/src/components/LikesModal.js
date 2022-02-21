import { relativeDate } from 'utils/functions';
import Wrapper from '../wrappers/LikesModal';

const LikesModal = ({ list }) => {
  return (
    <Wrapper>
      <div className='likes-container'>
        <div className='likes-container-center'>
          {list.length > 0 &&
            list.map((item) => <ListItem key={item._id} user={item.user} />)}
        </div>
      </div>
    </Wrapper>
  );
};

export default LikesModal;

const ListItem = ({ user }) => {
  const { name, email, liked } = user;
  return (
    <div className='like-container'>
      <div className='profile-icon'>{name.charAt(0)}</div>
      <div className='profile-info'>
        <div className='info-container'>
          <h5>{name}</h5>
          <p>{email}</p>
        </div>
        <p>
          <span className='like-text'>Liked: </span>
          <span className='like-date'>{relativeDate(liked)}</span>
        </p>
      </div>
    </div>
  );
};
