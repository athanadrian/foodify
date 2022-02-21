import { useAppContext } from 'context/appContext';
import { AiOutlineComment } from 'react-icons/ai';
import Loading from './Loading';

const CommentButton = ({ foodyId, userId, children, isLiked, size = 18 }) => {
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
    // return isLiked ? handleUnlike() : handleLike();
  };
  return (
    <div className='comment-container'>
      <div className='center'>
        <span className='center' onClick={toggleLIke}>
          <AiOutlineComment size={size} />
        </span>
        {children}
      </div>
    </div>
  );
};

export default CommentButton;
