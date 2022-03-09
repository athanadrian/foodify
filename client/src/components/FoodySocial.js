import { useAppContext } from '../context/appContext';
import Wrapper from '../wrappers/FoodySocial';
import CommentsModal from './CommentsModal';
import LikeButton from './social-buttons/LikeButton';
import VisitButton from './social-buttons/VisitButton';
import UserHeader from './UserHeader';

const FoodySocial = () => {
  const { user, foodyDetail } = useAppContext();
  const { _id, likes, visits, comments } = foodyDetail;

  const isLiked = likes.filter((like) => like.user._id === user._id).length > 0;
  const isVisited =
    visits.filter((visit) => visit.user._id === user._id).length > 0;

  return (
    <Wrapper>
      <UserHeader
        src={user?.profilePicUrl}
        name={user?.name}
        alt={user?.name}
        username={user?.username}
        link
      />
      <div className='space-between'>
        <LikeButton isLiked={isLiked} foodyId={_id} userId={user._id}>
          <span>Like</span>
        </LikeButton>
        <VisitButton isVisited={isVisited} foodyId={_id} userId={user._id}>
          <span>Visit</span>
        </VisitButton>
      </div>
      <CommentsModal foodyId={_id} comments={comments} />
    </Wrapper>
  );
};
export default FoodySocial;
