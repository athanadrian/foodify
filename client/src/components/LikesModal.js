import { useAppContext } from 'context/appContext';
import { relativeDate } from 'utils/functions';
import Wrapper from '../wrappers/LikesModal';

const LikesModal = ({ likes }) => {
  const { getFoodyLikes, foodyLikes } = useAppContext();

  console.log('likesModal', likes);

  return (
    <Wrapper>
      <div className='likes-container'>
        <div className='likes-container-center'>
          {likes.length > 0 &&
            likes.map((like) => <ListItem key={like._id} user={like.user} />)}
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
      <div className='profile-info space-between'>
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
