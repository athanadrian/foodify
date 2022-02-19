import { useAppContext } from 'context/appContext';
import { FaHeart } from 'react-icons/fa';
import Alert from './Alert';

const LikeButton = ({ foodyId, userId, children, isLiked, size = 18 }) => {
  const { showAlert, likeUnlikeFoody } = useAppContext();

  const handleLike = () => {
    likeUnlikeFoody({
      like: true,
      foodyId: foodyId,
      userId: userId,
      alertText: 'LIKED',
    });
  };
  const handleUnlike = () => {
    likeUnlikeFoody({
      like: false,
      foodyId: foodyId,
      userId: userId,
      alertText: 'UNLIKED',
    });
  };
  return (
    <div className={`${isLiked ? 'like-container liked' : 'like-container'}`}>
      <div className='center'>
        <span className='center' onClick={isLiked ? handleUnlike : handleLike}>
          <FaHeart size={size} />
        </span>
        {children}
      </div>
      <div>{showAlert && <Alert />}</div>
    </div>
  );
};

export default LikeButton;
