import { useAppContext } from 'context/appContext';
import { FaHeart } from 'react-icons/fa';
import Loading from './Loading';

const LikeButton = ({ foodyId, userId, children, isLiked, size = 18 }) => {
  const { isLiking, likeUnlikeFoody } = useAppContext();

  const handleLike = () => {
    likeUnlikeFoody({
      like: true,
      foodyId: foodyId,
      userId: userId,
    });
  };
  const handleUnlike = () => {
    likeUnlikeFoody({
      like: false,
      foodyId: foodyId,
      userId: userId,
    });
  };
  const toggleLIke = () => {
    return isLiked ? handleUnlike() : handleLike();
  };
  return (
    <div className={`${isLiked ? 'like-container liked' : 'like-container'}`}>
      <div className='center'>
        {isLiking ? (
          <span className='center'>
            <Loading min />
          </span>
        ) : (
          <span className='center' onClick={toggleLIke}>
            <FaHeart size={size} />
          </span>
        )}
        {children}
      </div>
    </div>
  );
};

export default LikeButton;
