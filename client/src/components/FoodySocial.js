import { useAppContext } from 'context/appContext';
import Wrapper from 'wrappers/FoodySocial';
import CommentsModal from './social-modals/CommentsModal';
import LikeButton from './social-buttons/LikeButton';
import VisitButton from './social-buttons/VisitButton';
import UserHeader from './UserHeader';
import { useFoodyContext } from 'context/contexts/foodyContext';

const FoodySocial = () => {
  const { user } = useAppContext();
  const { foodyDetail } = useFoodyContext();
  const { _id, likes, visits, comments } = foodyDetail;
  const isLiked = likes.filter((like) => like.user._id === user._id).length > 0;
  const isVisited =
    visits.filter((visit) => visit.user._id === user._id).length > 0;

  return (
    <Wrapper>
      <UserHeader
        src={foodyDetail?.createdBy?.profilePicUrl}
        name={foodyDetail?.createdBy?.name}
        alt={foodyDetail?.createdBy?.name}
        username={foodyDetail?.createdBy?.username}
        pageId={foodyDetail?.createdBy?._id}
        loggedUserId={user?._id}
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
